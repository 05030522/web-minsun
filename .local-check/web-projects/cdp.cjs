const fs = require('node:fs');
class CDP {
  constructor(socket){this.socket=socket;this.id=0;this.pending=new Map();this.events=[];socket.addEventListener('message',(e)=>{const msg=JSON.parse(e.data);if(msg.id){const p=this.pending.get(msg.id);if(!p)return;this.pending.delete(msg.id);clearTimeout(p.timer);msg.error?p.reject(new Error(JSON.stringify(msg.error))):p.resolve(msg.result);} else this.events.push(msg);});}
  static async connect(port=9225){const tabs=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();const tab=tabs.find(t=>t.type==='page');if(!tab)throw new Error('No browser page');const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});return new CDP(ws);}
  call(method,params={}){return new Promise((resolve,reject)=>{const id=++this.id;const timer=setTimeout(()=>{this.pending.delete(id);reject(new Error(`Timeout: ${method}`));},45000);this.pending.set(id,{resolve,reject,timer});this.socket.send(JSON.stringify({id,method,params}));});}
  async evaluate(expression){const r=await this.call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
  viewport(width,height=1080){return this.call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});}
  async screenshot(file,clip){const params={format:'png',captureBeyondViewport:!!clip};if(clip)params.clip={...clip,scale:1};const r=await this.call('Page.captureScreenshot',params);fs.writeFileSync(file,Buffer.from(r.data,'base64'));}
  close(){this.socket.close();}
}
module.exports={CDP};
if(require.main===module){(async()=>{const c=await CDP.connect();try {const [command,value]=process.argv.slice(2);let r;if(command==='eval')r=await c.evaluate(value);else if(command==='eval-file')r=await c.evaluate(fs.readFileSync(value,'utf8'));else if(command==='navigate')r=await c.call('Page.navigate',{url:value});else if(command==='viewport')r=await c.viewport(Number(value),Number(process.argv[4]||1080));else if(command==='screenshot')r=await c.screenshot(value);console.log(JSON.stringify(r));}finally{c.close();}})().catch(e=>{console.error(e);process.exitCode=1;});}
