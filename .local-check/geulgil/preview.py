import base64
import json
import pathlib
import sys
import time

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from cdp import CDP

width = int(sys.argv[1])
browser = CDP(9224)
browser.viewport(width, 1000)
browser.call('Emulation.setEmulatedMedia', {'features': [{'name':'prefers-reduced-motion','value':'reduce'}]})
browser.call('Page.navigate', {'url':'http://127.0.0.1:8766/index.html#geulgil-project'})
time.sleep(2)
browser.evaluate("document.fonts.ready.then(()=>true)")
browser.evaluate("document.querySelectorAll('.geulgil-project img').forEach(i=>i.loading='eager')")
browser.evaluate("Promise.all([...document.querySelectorAll('.geulgil-project img')].map(i=>i.decode().catch(()=>{}))).then(()=>true)")
browser.evaluate("document.getElementById('geulgil-project').scrollIntoView({behavior:'instant'})")
time.sleep(.3)
rect = browser.evaluate("(() => {const r = document.getElementById('geulgil-project').getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1}})()")
result = browser.call('Page.captureScreenshot', {'format':'png','captureBeyondViewport':True,'clip':rect})
path = pathlib.Path(__file__).parent / ('preview-' + str(width) + '.png')
path.write_bytes(base64.b64decode(result['data']))
print(json.dumps({'path':str(path),'rect':rect,'audit':browser.evaluate("({overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.querySelectorAll('.geulgil-project img')].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})),next:document.getElementById('geulgil-project').nextElementSibling.id})")}))
browser.close()
