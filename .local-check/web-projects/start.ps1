$ErrorActionPreference = 'Stop'
$taskRoot = $PSScriptRoot
$env:ELECTRON_RUN_AS_NODE = '1'
$server = Start-Process -FilePath 'C:/Users/Baek kiok/Desktop/Microsoft VS Code/Code.exe' -ArgumentList ('"' + (Join-Path $taskRoot 'server.cjs') + '"') -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $taskRoot 'server.out.log') -RedirectStandardError (Join-Path $taskRoot 'server.err.log')
$profile = Join-Path $taskRoot 'browser-profile'
$browser = Start-Process -FilePath 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe' -ArgumentList @('--headless=new','--remote-debugging-port=9225',('--user-data-dir="' + $profile + '"'),'--disable-gpu','--no-first-run','--no-default-browser-check','--hide-scrollbars','about:blank') -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $taskRoot 'browser.out.log') -RedirectStandardError (Join-Path $taskRoot 'browser.err.log')
@{server=$server.Id;browser=$browser.Id;serverPort=8765;cdpPort=9225} | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $taskRoot 'processes.json')
Get-Content -LiteralPath (Join-Path $taskRoot 'processes.json')
