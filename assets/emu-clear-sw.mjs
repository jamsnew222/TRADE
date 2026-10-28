// Unregister stale service workers + clear caches inside the WebView, then reload.
const targets = await (await fetch('http://localhost:9222/json')).json();
const page = targets.find(t => t.type === 'page' && t.url.includes('localhost'));
if (!page) { console.error('No WebView target'); process.exit(1); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pend = {};
const send = (m, p = {}) => new Promise(res => { const i = ++id; pend[i] = res; ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) pend[m.id](m.result); };
await new Promise(r => ws.onopen = r);

const cleared = await send('Runtime.evaluate', {
  expression: `(async () => {
    const regs = await navigator.serviceWorker.getRegistrations();
    const un = await Promise.all(regs.map(r => r.unregister()));
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    return { regs: regs.length, unregistered: un, cachesDeleted: keys };
  })()`,
  returnByValue: true, awaitPromise: true
});
console.log('cleared:', JSON.stringify(cleared.result?.value));
await send('Page.enable');
await send('Page.reload', { ignoreCache: true });
await new Promise(r => setTimeout(r, 12000));
const state = await send('Runtime.evaluate', {
  expression: `({ hasAuth: !!document.querySelector('input[type=email]'), text: document.body.innerText.slice(0,80) })`,
  returnByValue: true
});
console.log(JSON.stringify(state.result?.value));
process.exit(0);
