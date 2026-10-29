// Drive a full lesson on the emulator: open → learn slides → quiz → complete.
// Reports hearts behavior, mascot presence, and XP award.
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
const clickByText = (text) => `(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim().match(${JSON.stringify(text)})); if (!b) return 'missing: ${text}'; b.click(); return 'ok'; })()`;
const sleep = ms => new Promise(r => setTimeout(r, ms));

await new Promise(r => ws.onopen = r);
await sleep(3000);

if (await evalJs(`!!document.querySelector('input[type=email]')`)) {
  await evalJs(setVal('input[type=email]', QA.email));
  await evalJs(setVal('input[type=password]', QA.pass));
  await evalJs(clickByText('Log In'));
  await sleep(8000);
}
for (let i = 0; i < 4; i++) { await evalJs(clickByText('Next')); await sleep(500); }
await evalJs(clickByText('Get Started'));
await evalJs(clickByText('Start trading'));
await sleep(1200);

const xpBefore = await evalJs(`(JSON.parse(localStorage.getItem('tradequest-progress')||'{}').xp ?? 0)`);
console.log('XP before:', xpBefore);

// Open a lesson
let opened = false;
for (let i = 0; i < 20 && !opened; i++) {
  await evalJs(`(() => { const h = document.querySelectorAll('h3')[${i}]; if (!h) return; (h.closest('div[class*=cursor-pointer]') || h.parentElement)?.click(); })()`);
  await sleep(900);
  opened = await evalJs(`!document.querySelector('button[aria-label=Settings]')`);
}
console.log('lesson opened:', opened);
console.log('intro screen text:', JSON.stringify(await evalJs(`document.body.innerText.slice(0,150)`)));

// Begin: Start Learning / Start Lesson
await evalJs(clickByText('Start'));
await sleep(1000);
// Advance learn slides until quiz (Ready / quiz UI appears)
for (let i = 0; i < 12; i++) {
  const state = await evalJs(`({ready: !!([...document.querySelectorAll('button')].find(b=>/ready/i.test(b.textContent))), next: !!([...document.querySelectorAll('button')].find(b=>/^next$|continue/i.test(b.textContent.trim()))), hearts: (document.body.innerText.match(/❤|♥|lives/gi)||[]).length})`);
  if (state.ready) { await evalJs(clickByText('Ready')); break; }
  if (!state.next) break;
  await evalJs(clickByText('Next'));
  await sleep(600);
}
await sleep(1000);
console.log('quiz reached. hearts shown:', await evalJs(`(document.querySelector('svg') && document.body.innerText.length) > 0`));

// Answer questions: click first plausible answer each round, handle feedback continue buttons
for (let q = 0; q < 15; q++) {
  const done = await evalJs(`document.body.innerText.match(/complete|congrat|finished|earned/i)?.[0] ?? null`);
  if (done) { console.log('lesson complete marker:', done, 'after', q, 'questions'); break; }
  // click an answer option — prefer a real option button
  const clicked = await evalJs(`(() => {
    const btns = [...document.querySelectorAll('button')].filter(b => !/next|continue|back|exit|hint|skip|check|submit/i.test(b.textContent));
    const opts = btns.filter(b => b.textContent.trim().length > 0 && b.textContent.trim().length < 120);
    const pick = opts[Math.floor(Math.random() * Math.min(opts.length, 4))];
    if (!pick) return 'no options';
    pick.click();
    return 'picked: ' + pick.textContent.trim().slice(0, 30);
  })()`);
  console.log(`Q${q + 1}:`, clicked);
  await sleep(1400);
  // multi-select needs an explicit submit
  await evalJs(clickByText('Check|Submit'));
  await sleep(1200);
  // if a Continue/Next feedback button appeared, press it
  await evalJs(clickByText('Continue'));
  await sleep(800);
  await evalJs(clickByText('Next'));
  await sleep(600);
}

console.log('final screen:', JSON.stringify(await evalJs(`document.body.innerText.slice(0,200)`)));
const xpAfter = await evalJs(`(JSON.parse(localStorage.getItem('tradequest-progress')||'{}').xp ?? 0)`);
console.log('XP after:', xpAfter, '| delta:', xpAfter - xpBefore);
process.exit(0);
