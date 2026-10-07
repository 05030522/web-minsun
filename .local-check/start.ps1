$ErrorActionPreference = 'Stop'
$checkRoot = $PSScriptRoot
$workspaceRoot = Split-Path -Parent $checkRoot
$pythonExe = 'C:\Program Files\Blender Foundation\Blender 5.1\5.1\python\bin\python.exe'
$chromeExe = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$profileRoot = Join-Path $checkRoot 'chrome-profile'
$server = Start-Process -FilePath $pythonExe -ArgumentList @(('"{0}"' -f (Join-Path $checkRoot 'serve.py')), ('"{0}"' -f $workspaceRoot), '8765') -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $checkRoot 'server.out.log') -RedirectStandardError (Join-Path $checkRoot 'server.err.log')
$chrome = Start-Process -FilePath $chromeExe -ArgumentList @('--headless=new', '--disable-gpu', '--no-sandbox', '--disable-software-rasterizer', '--no-first-run', '--no-default-browser-check', '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=9223', ('--user-data-dir="{0}"' -f $profileRoot), '--window-size=1440,1000', 'http://127.0.0.1:8765/index.html') -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $checkRoot 'chrome.out.log') -RedirectStandardError (Join-Path $checkRoot 'chrome.err.log')
@{server = $server.Id; chrome = $chrome.Id; httpPort = 8765; devtoolsPort = 9223} | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $checkRoot 'processes.json') -Encoding UTF8
Get-Content -LiteralPath (Join-Path $checkRoot 'processes.json')
