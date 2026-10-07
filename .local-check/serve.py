import functools
import http.server
import sys

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=sys.argv[1])
server = http.server.ThreadingHTTPServer(("127.0.0.1", int(sys.argv[2])), handler)
server.serve_forever()
