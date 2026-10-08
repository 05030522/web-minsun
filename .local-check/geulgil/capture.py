import base64
import json
import pathlib
import sys
import time

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from cdp import CDP

root = pathlib.Path(__file__).resolve().parents[2]
browser = CDP(9224)
browser.call('Page.enable')
page = sys.argv[1]
width = int(sys.argv[2]) if len(sys.argv) > 2 else 1440
height = int(sys.argv[3]) if len(sys.argv) > 3 else 1120
browser.viewport(width, height)
browser.call('Page.navigate', {'url': 'https://magellan4746.github.io/geulgil-team_project/' + ('' if page == 'home' else page + '.html')})
time.sleep(3)
browser.evaluate('document.fonts.ready.then(() => true)')
browser.evaluate('Promise.all([...document.images].map(i => i.decode().catch(() => {}))).then(() => true)')
if page == 'home':
    browser.evaluate('showSlide(0); showSlide = () => {};')
    time.sleep(.8)
folder = root / 'img' / 'geulgil'
folder.mkdir(exist_ok=True)
if len(sys.argv) > 4:
    browser.evaluate('scrollTo({top:' + str(int(sys.argv[4])) + ',behavior:"instant"})')
    time.sleep(.2)
result = browser.call('Page.captureScreenshot', {'format': 'jpeg', 'quality': 92, 'captureBeyondViewport': False})
path = folder / (page + ('-mobile' if width < 600 else '') + '.jpg')
path.write_bytes(base64.b64decode(result['data']))
print(json.dumps({'path': str(path), 'viewport': [width,height], 'info': browser.evaluate("({title:document.title, broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)})")}, ensure_ascii=True))
browser.close()
