// Test: open Settings, then press hardware back — expect modal close, not app exit.
const targets = await (await fetch('http://localhost:9222/json')).json();
const page = targets.find(t => t.type === 'page' && t.url.includes('localhost'));
if (!page) { console.error('No WebView target'); process.exit(1); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pend = {};
const send = (m, p = {}) => new Promise(res => { const i = ++id; pend[i] = res; ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) pend[m.id](m.result); };
const evalJs = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true });
  return r?.result?.value;
};
const sleep = ms => new Promise(r => setTimeout(r, ms));

await new Promise(r => ws.onopen = r);
await evalJs(`document.querySelector('button[aria-label=Settings]')?.click()`);
await sleep(1200);
console.log('settings open:', await evalJs(`!!document.querySelector('button[aria-label=Close]')`));
console.log('history.length:', await evalJs(`history.length`));
// Simulate what the WebView does on hardware back: history.back()
await evalJs(`history.back()`);
await sleep(1000);
console.log('after back — settings still open:', await evalJs(`!!document.querySelector('button[aria-label=Close]')`));
console.log('body still has app:', await evalJs(`document.body.innerText.slice(0,60)`));
process.exit(0);
