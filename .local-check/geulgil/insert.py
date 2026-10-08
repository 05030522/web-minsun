from pathlib import Path

root = Path(__file__).resolve().parents[2]
path = root / 'index.html'
source = path.read_bytes()
assert b'GEULGIL PROJECT START' not in source
section = (Path(__file__).parent / 'section.html').read_text(encoding='utf-8').replace('\r\n', '\n').replace('\n', '\r\n').encode('utf-8')
source = source.replace(b'  <link rel="stylesheet" href="./css/about-rabbit.css">', b'  <link rel="stylesheet" href="./css/about-rabbit.css">\r\n  <link rel="stylesheet" href="./css/geulgil-case.css">', 1)
source = source.replace(b'  <script src="./js/about-rabbit.js" defer></script>', b'  <script src="./js/about-rabbit.js" defer></script>\r\n  <script src="./js/geulgil-case.js" defer></script>', 1)
anchor = b'    <!-- =========================\r\n         LUMORA PERSONAL PROJECT'
assert source.count(anchor) == 1
path.write_bytes(source.replace(anchor, section + anchor, 1))
print('Inserted GEULGIL section and two resource references; original bytes preserved.')
