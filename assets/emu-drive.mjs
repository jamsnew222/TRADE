// Drive the TradeCub WebView inside a running emulator via raw CDP.
// Requires: emulator booted + app launched + `adb forward tcp:9222
// localabstract:webview_devtools_remote_<pid>`.
// Usage: node assets/emu-drive.mjs
const QA = { email: 'screenshots@tradecub.dev', pass: 'Screenshot-QA-2026!' };

const targets = await (await fetch('http://localhost:9222/json')).json();
const page = targets.find(t => t.type === 'page' && t.url.includes('localhost'));
if (!page) { console.error('No TradeCub WebView target found'); process.exit(1); }

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pend = {};
const send = (method, params = {}) => new Promise((res, rej) => {
  const i = ++id; pend[i] = res; ws.send(JSON.stringify({ id: i, method, params }));
  setTimeout(() => rej(new Error('timeout ' + method)), 20000);
});
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pend[m.id]) { pend[m.id](m.result); delete pend[m.id]; }
};
const evalJs = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r?.result?.value;
};

const setVal = (sel, val) => `(() => {
  const el = document.querySelector('${sel}');
  if (!el) return 'missing ${sel}';
  const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  s.call(el, ${JSON.stringify(val)});
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  return 'ok';
})()`;

const clickByText = (text) => `(() => {
  const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim().includes(${JSON.stringify(text)}));
  if (!b) return 'missing btn: ${text}';
  b.click(); return 'clicked: ${text}';
})()`;

await new Promise(r => { ws.onopen = r; });

console.log('fill email:', await evalJs(setVal('input[type=email]', QA.email)));
console.log('fill pass:', await evalJs(setVal('input[type=password]', QA.pass)));
console.log(await evalJs(clickByText('Log In')));
await new Promise(r => setTimeout(r, 9000));

const state = await evalJs(`({
  hasAuthForm: !!document.querySelector('input[type=email]'),
  bodyStart: document.body.innerText.slice(0, 160)
})`);
console.log(JSON.stringify(state));
console.log(state.hasAuthForm ? '>>> STILL ON AUTH SCREEN' : '>>> SIGNED IN — inside the app');
process.exit(0);
