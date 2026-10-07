"""Dependency-free local Chrome DevTools helper; all connections stay on loopback."""
import argparse
import base64
import json
import os
import socket
import struct
import time
import urllib.parse
import urllib.request


class CDP:
    def __init__(self, port=9223):
        with urllib.request.urlopen(f"http://127.0.0.1:{port}/json/list", timeout=10) as response:
            targets = json.load(response)
        target = next(item for item in targets if item.get("type") == "page")
        address = urllib.parse.urlsplit(target["webSocketDebuggerUrl"])
        self.socket = socket.create_connection((address.hostname, address.port), timeout=15)
        self.socket.settimeout(20)
        key = base64.b64encode(os.urandom(16)).decode()
        request = (f"GET {address.path} HTTP/1.1\r\nHost: {address.netloc}\r\n"
                   f"Upgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\n"
                   "Sec-WebSocket-Version: 13\r\n\r\n")
        self.socket.sendall(request.encode())
        response = b""
        while b"\r\n\r\n" not in response:
            response += self.socket.recv(1)
        if b" 101 " not in response:
            raise RuntimeError(response.decode())
        self.request_id = 0

    def close(self):
        self.socket.close()

    def _read(self, length):
        data = b""
        while len(data) < length:
            chunk = self.socket.recv(length - len(data))
            if not chunk:
                raise RuntimeError("DevTools connection closed")
            data += chunk
        return data

    def _send(self, data, opcode=1):
        if isinstance(data, str):
            data = data.encode()
        length = len(data)
        header = bytes([0x80 | opcode])
        if length < 126:
            header += bytes([0x80 | length])
        elif length < 65536:
            header += bytes([0x80 | 126]) + struct.pack("!H", length)
        else:
            header += bytes([0x80 | 127]) + struct.pack("!Q", length)
        mask = os.urandom(4)
        self.socket.sendall(header + mask + bytes(value ^ mask[index % 4] for index, value in enumerate(data)))

    def _receive(self):
        fragments = b""
        while True:
            first, second = self._read(2)
            opcode = first & 15
            length = second & 127
            if length == 126:
                length = struct.unpack("!H", self._read(2))[0]
            elif length == 127:
                length = struct.unpack("!Q", self._read(8))[0]
            mask = self._read(4) if second & 128 else None
            data = self._read(length)
            if mask:
                data = bytes(value ^ mask[index % 4] for index, value in enumerate(data))
            if opcode == 9:
                self._send(data, 10)
                continue
            if opcode == 8:
                raise RuntimeError("DevTools closed websocket")
            fragments += data
            if first & 128:
                return json.loads(fragments)

    def call(self, method, params=None):
        self.request_id += 1
        self._send(json.dumps({"id": self.request_id, "method": method, "params": params or {}}))
        while True:
            result = self._receive()
            if result.get("id") == self.request_id:
                if "error" in result:
                    raise RuntimeError(result["error"])
                return result.get("result", {})

    def evaluate(self, expression):
        result = self.call("Runtime.evaluate", {"expression": expression, "returnByValue": True, "awaitPromise": True})
        if "exceptionDetails" in result:
            raise RuntimeError(json.dumps(result["exceptionDetails"], ensure_ascii=False))
        return result.get("result", {}).get("value")

    def viewport(self, width, height, mobile=False):
        return self.call("Emulation.setDeviceMetricsOverride", {"width": width, "height": height, "deviceScaleFactor": 1, "mobile": mobile})

    def screenshot(self, path, full=False):
        params = {"format": "png", "captureBeyondViewport": full}
        if full:
            layout = self.call("Page.getLayoutMetrics")
            bounds = layout.get("cssContentSize", layout["contentSize"])
            params["clip"] = {"x": 0, "y": 0, "width": bounds["width"], "height": bounds["height"], "scale": 1}
        result = self.call("Page.captureScreenshot", params)
        with open(path, "wb") as output:
            output.write(base64.b64decode(result["data"]))
        return os.path.abspath(path)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["eval", "eval-file", "navigate", "screenshot", "click", "viewport", "prepare", "audit"])
    parser.add_argument("value", nargs="?")
    parser.add_argument("--port", type=int, default=9223)
    parser.add_argument("--width", type=int, default=1440)
    parser.add_argument("--height", type=int, default=1000)
    parser.add_argument("--mobile", action="store_true")
    parser.add_argument("--full", action="store_true")
    parser.add_argument("--wait", type=float, default=0)
    args = parser.parse_args()
    browser = CDP(args.port)
    try:
        if args.command == "eval":
            result = browser.evaluate(args.value)
        elif args.command == "eval-file":
            with open(args.value, encoding="utf-8-sig") as source:
                result = browser.evaluate(source.read())
        elif args.command == "navigate":
            result = browser.call("Page.navigate", {"url": args.value})
        elif args.command == "viewport":
            result = browser.viewport(args.width, args.height, args.mobile)
        elif args.command == "click":
            result = browser.evaluate(f"(() => {{ const target = document.querySelector({json.dumps(args.value)}); if (!target) throw new Error('Target missing'); target.click(); return true; }})()")
        elif args.command == "screenshot":
            result = browser.screenshot(args.value, args.full)
        elif args.command == "prepare":
            source = "window.__browserErrors = []; addEventListener('error', e => window.__browserErrors.push({type:'error', message:e.message, file:e.filename, line:e.lineno})); addEventListener('unhandledrejection', e => window.__browserErrors.push({type:'promise', message:String(e.reason)}));"
            browser.call("Page.addScriptToEvaluateOnNewDocument", {"source": source})
            result = browser.call("Page.reload", {"ignoreCache": True})
        elif args.command == "audit":
            result = browser.evaluate("""({
                title: document.title,
                ready: document.readyState,
                viewport: {width: innerWidth, height: innerHeight},
                document: {width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight},
                horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
                errors: window.__browserErrors || [],
                brokenImages: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.getAttribute('src')),
                duplicateIds: [...new Set([...document.querySelectorAll('[id]')].map(el => el.id))].filter(id => [...document.querySelectorAll('[id]')].filter(el => el.id === id).length > 1)
            })""")
        if args.wait:
            time.sleep(min(args.wait, 30))
        print(json.dumps(result, ensure_ascii=True))
    finally:
        browser.close()


if __name__ == "__main__":
    main()
