// Settings-trap regression test: sign in if needed, open Settings,
// verify the Close button is inside the viewport.
const QA = { email: 'screenshots@tradecub.dev', pass: 'Screenshot-QA-2026!' };
const targets = await (await fetch('http://localhost:9222/json')).json();
const page = targets.find(t => t.type === 'page' && t.url.includes('localhost'));
if (!page) { console.error('No WebView target'); process.exit(1); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pend = {};
const send = (m, p = {}) => new Promise(res => { const i = ++id; pend[i] = res; ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) pend[m.id](m.result); };
const evalJs = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r?.result?.value;
};
const setVal = (sel, val) => `(() => { const el = document.querySelector('${sel}'); if (!el) return 'missing'; const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; s.call(el, ${JSON.stringify(val)}); el.dispatchEvent(new Event('input', { bubbles: true })); return 'ok'; })()`;
const clickByText = (text) => `(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim().includes(${JSON.stringify(text)})); if (!b) return 'missing: ${text}'; b.click(); return 'ok'; })()`;
const sleep = ms => new Promise(r => setTimeout(r, ms));

await new Promise(r => ws.onopen = r);
await sleep(4000); // app boot

// Sign in if gated
if (await evalJs(`!!document.querySelector('input[type=email]')`)) {
  await evalJs(setVal('input[type=email]', QA.email));
  await evalJs(setVal('input[type=password]', QA.pass));
  await evalJs(clickByText('Log In'));
  await sleep(8000);
}
// Dismiss onboarding if present
for (let i = 0; i < 4; i++) { await evalJs(clickByText('Next')); await sleep(700); }
await evalJs(clickByText('Get Started'));
await evalJs(clickByText('Start trading'));
await sleep(1500);

// Open Settings via its aria-label
console.log('open settings:', await evalJs(`(() => { const b = document.querySelector('button[aria-label=Settings]'); if (!b) return 'missing settings btn'; b.click(); return 'ok'; })()`));
await sleep(1200);

// Is a Close control reachable within the viewport?
const check = await evalJs(`(() => {
  const closers = [...document.querySelectorAll('button[aria-label=Close]')];
  if (!closers.length) return { closers: 0 };
  return closers.map(b => {
    const r = b.getBoundingClientRect();
    const vh = window.innerHeight;
    const style = getComputedStyle(b);
    return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh,
      inViewport: r.bottom > 0 && r.top < vh, visible: style.visibility !== 'hidden' && r.width > 0 };
  });
})()`);
console.log('close buttons:', JSON.stringify(check));

// Also verify the modal body scrolls (content taller than visible area)
const scrollInfo = await evalJs(`(() => {
  const modal = [...document.querySelectorAll('div')].filter(d => d.className.includes('overflow-y-auto') && d.className.includes('space-y-6'))[0];
  if (!modal) return 'no scrollable region found';
  return { scrollH: modal.scrollHeight, clientH: modal.clientHeight, canScroll: modal.scrollHeight > modal.clientHeight };
})()`);
console.log('modal scroll:', JSON.stringify(scrollInfo));

// Click close and confirm the modal is gone
if (check?.[0]?.inViewport) {
  await evalJs(`document.querySelector('button[aria-label=Close]').click()`);
  await sleep(800);
  console.log('after close, modal gone:', await evalJs(`!document.querySelector('button[aria-label=Close]')`));
}
process.exit(0);
