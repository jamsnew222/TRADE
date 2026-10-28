// Full console + log capture during WebView reload.
const targets = await (await fetch('http://localhost:9222/json')).json();
const page = targets.find(t => t.type === 'page' && t.url.includes('localhost'));
if (!page) { console.error('No WebView target'); process.exit(1); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pend = {};
const send = (m, p = {}) => new Promise(res => { const i = ++id; pend[i] = res; ws.send(JSON.stringify({ id: i, method: m, params: p })); });

const seen = new Set();
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pend[m.id]) { pend[m.id](m.result); delete pend[m.id]; return; }
  let txt = null;
  if (m.method === 'Runtime.consoleAPICalled')
    txt = '[console.' + m.params.type + '] ' + m.params.args.map(a => a.value ?? a.description ?? a.type).join(' ');
  else if (m.method === 'Runtime.exceptionThrown')
    txt = '[EXC] ' + (m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text ?? '');
  else if (m.method === 'Log.entryAdded')
    txt = '[net/' + m.params.entry.level + '] ' + (m.params.entry.text ?? '').slice(0, 300) + ' ' + (m.params.entry.url ?? '').split('/').slice(-1)[0];
  if (txt) { txt = txt.slice(0, 500); if (!seen.has(txt)) { seen.add(txt); console.log(txt); } }
};

await new Promise(r => ws.onopen = r);
await send('Runtime.enable');
await send('Log.enable');
await send('Page.enable');
await send('Page.reload', { ignoreCache: true });
await new Promise(r => setTimeout(r, 20000));
console.log('--- capture done ---');
process.exit(0);
