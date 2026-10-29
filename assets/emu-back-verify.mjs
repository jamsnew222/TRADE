// Verify hardware-back: Settings closes (not app exit), lesson exits, root minimizes.
// Requires adb forward already set + app running.
import { execSync } from 'child_process';
const ADB = 'C:\\Users\\brn13\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe';
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
const clickByText = (text) => `(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim().includes(${JSON.stringify(text)})); if (!b) return 'missing'; b.click(); return 'ok'; })()`;
const back = () => { execSync(`"${ADB}" shell input keyevent KEYCODE_BACK`); };
const alive = () => { try { return execSync(`"${ADB}" shell pidof com.tradecub.app`).toString().trim().length > 0; } catch { return false; } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

await new Promise(r => ws.onopen = r);
await sleep(3000);

if (await evalJs(`!!document.querySelector('input[type=email]')`)) {
  await evalJs(setVal('input[type=email]', QA.email));
  await evalJs(setVal('input[type=password]', QA.pass));
  await evalJs(clickByText('Log In'));
  await sleep(8000);
}
for (let i = 0; i < 4; i++) { await evalJs(clickByText('Next')); await sleep(600); }
await evalJs(clickByText('Get Started'));
await evalJs(clickByText('Start trading'));
await sleep(1200);

console.log('--- TEST 1: back closes Settings ---');
await evalJs(`document.querySelector('button[aria-label=Settings]')?.click()`);
await sleep(1000);
console.log('settings open:', await evalJs(`!!document.querySelector('button[aria-label=Close]')`));
back(); await sleep(1000);
console.log('settings closed by back:', await evalJs(`!document.querySelector('button[aria-label=Close]')`));
console.log('app still alive:', alive());

console.log('--- TEST 2: back exits a lesson ---');
// Click lesson cards until one opens (completed/locked ones are inert)
let inLesson = false;
for (let i = 0; i < 20 && !inLesson; i++) {
  await evalJs(`(() => { const h = document.querySelectorAll('h3')[${i}]; if (!h) return false; const c = h.closest('div[class*=cursor-pointer],div[role=button],button') || h.parentElement; c?.click(); return true; })()`);
  await sleep(900);
  inLesson = await evalJs(`!document.querySelector('button[aria-label=Settings]') && !document.querySelector('input[type=email]')`);
}
console.log('in lesson view:', inLesson);
back(); await sleep(1200);
console.log('back at home:', await evalJs(`!!document.querySelector('button[aria-label=Settings]')`));
console.log('app still alive:', alive());

console.log('--- TEST 3: back at root minimizes (app survives) ---');
back(); await sleep(1500);
console.log('process still exists:', alive());
await evalJs(`1`); // reconnect check
console.log('done');
process.exit(0);
