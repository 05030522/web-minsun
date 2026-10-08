import json
import pathlib
import sys
import time

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from cdp import CDP

if sys.argv[1] == 'before':
    folder = pathlib.Path(__file__).parent
    (folder / 'baseline.html').write_bytes((folder / 'index.before.html').read_bytes().replace(b'<head>', b'<head><base href="/">', 1))

browser = CDP(9224)
browser.call('Emulation.setEmulatedMedia', {'features': [{'name': 'prefers-reduced-motion', 'value': 'reduce'}]})
browser.viewport(int(sys.argv[2]), 1000)
page = '.local-check/geulgil/baseline.html' if sys.argv[1] == 'before' else 'index.html'
browser.call('Page.navigate', {'url': 'http://127.0.0.1:8766/' + page})
time.sleep(2)
browser.evaluate('document.fonts.ready.then(() => true)')
browser.evaluate("Promise.race([Promise.all([...document.images].filter(i=>i.complete && i.naturalWidth).map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,2500))]).then(()=>true)")
time.sleep(.5)
snapshot = browser.evaluate("""[...document.querySelectorAll('body *')].filter(e => !e.closest('.geulgil-project') && !['SCRIPT', 'STYLE'].includes(e.tagName)).map(e => {
 const r = e.getBoundingClientRect(), s = getComputedStyle(e);
 return {tag:e.tagName, id:e.id, cls:e.className, width:r.width, height:e.classList.contains('portfolio')?null:r.height, x:r.x,
 styles:Object.fromEntries(['display','position','fontFamily','fontSize','fontWeight','lineHeight','color','backgroundColor','padding','margin','gap','border','borderRadius'].map(k=>[k,s[k]]))};
})""")
path = pathlib.Path(__file__).parent / (sys.argv[1] + '-' + sys.argv[2] + '.json')
path.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'path':str(path),'elements':len(snapshot)}))
browser.close()
