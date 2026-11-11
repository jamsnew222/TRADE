// Quick one-off CDP eval inside the TradeCub WebView.
// Usage: node assets/emu-eval.mjs "<js expression>"
const expression = process.argv[2];
if (!expression) { console.error('usage: node assets/emu-eval.mjs "<expr>"'); process.exit(1); }

const targets = await (await fetch('http://localhost:9222/json')).json();
const page = targets.find(t => t.type === 'page' && t.url.includes('localhost'));
if (!page) { console.error('No TradeCub WebView target found'); process.exit(1); }

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
const r = await new Promise(res => {
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id === 1) res(m.result); };
  ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression, returnByValue: true, awaitPromise: true } }));
});
console.log(JSON.stringify(r?.result?.value ?? r, null, 1));
process.exit(0);
