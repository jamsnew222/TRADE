// Captures Play/App Store screenshots from the running dev server.
// Usage: node assets/take-screenshots.mjs   (requires `npm run dev` on :3000)
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, 'screenshots');
const BASE = 'http://localhost:3000';

// A believable mid-journey user: some lessons done, streak going, not premium.
const seededProgress = {
  completedLessons: ['intro-stocks', 'buy-sell', 'brokerage-accounts', 'market-hours', 'supply-and-demand'],
  currentStreak: 6,
  longestStreak: 12,
  totalXP: 385,
  level: 3,
  lastActiveDate: new Date().toDateString(),
  tradingStyle: 'balanced',
  totalDaysActive: 9,
  isPremium: false,
  usageDate: new Date().toDateString(),
  dailyLessonsUsed: 1,
  dailyTradesUsed: 3,
};

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
const shot = async (name) => { await page.screenshot({ path: join(out, name) }); console.log('captured', name); };

async function tryClick(locator, label) {
  try {
    if (await locator.count()) {
      await locator.first().scrollIntoViewIfNeeded();
      await locator.first().click({ force: true, timeout: 5000 });
      return true;
    }
  } catch (e) {
    console.log(`click failed: ${label} — ${e.message.split('\n')[0]}`);
  }
  return false;
}

// Seed localStorage before the app boots, so we skip onboarding.
await page.addInitScript((progress) => {
  localStorage.setItem('tradequest-onboarded', '1');
  localStorage.setItem('trading-duolingo-progress', JSON.stringify(progress));
}, seededProgress);

await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
await shot('01-home-grid.png');

// Learning path is the default view — scroll to the units and capture
try {
  const unitTitle = page.locator('h2', { hasText: 'Getting Started' }).first();
  if (await unitTitle.count()) {
    await unitTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await shot('02-learning-path.png');
  } else {
    console.log('path view: unit heading not found');
  }
} catch (e) { console.log('path view skipped:', e.message.split('\n')[0]); }

// Lesson intro — click a lesson card by its title
try {
  const lessonCard = page.locator('h3', { hasText: 'Buying and Selling' }).first();
  if (await tryClick(lessonCard, 'lesson card')) {
    await page.waitForTimeout(800);
    await shot('03-lesson-intro.png');

    if (await tryClick(page.getByRole('button', { name: /start learning|start lesson/i }), 'begin lesson')) {
      await page.waitForTimeout(600);
      // Keep clicking Next until the quiz actually starts (the label changes to
      // "Ready - start the quiz" on the last learn slide)
      for (let i = 0; i < 10; i++) {
        const quizReady = await page.getByRole('button', { name: /ready/i }).count();
        if (quizReady) {
          await tryClick(page.getByRole('button', { name: /ready/i }), 'start quiz');
          break;
        }
        const clicked = await tryClick(page.getByRole('button', { name: /next|continue/i }), `learn slide ${i}`);
        if (!clicked) break;
        await page.waitForTimeout(350);
      }
      await page.waitForTimeout(700);
      await shot('04-lesson-question.png');
      // Answer the first option to show the checked state
      if (await tryClick(page.locator('button').filter({ hasText: /./ }).nth(3), 'answer option')) {
        await page.waitForTimeout(400);
        await tryClick(page.getByRole('button', { name: /check|submit/i }), 'check answer');
        await page.waitForTimeout(600);
        await shot('04b-lesson-result.png');
      }
    }
    await tryClick(page.getByRole('button', { name: /back|exit|quit/i }), 'exit lesson');
    await page.waitForTimeout(500);
  }
} catch (e) { console.log('lesson flow skipped:', e.message.split('\n')[0]); }

// Simulator (already proven working)
try {
  if (await tryClick(page.getByText('Simulator'), 'open simulator')) {
    await page.waitForTimeout(1800);
    await shot('05-simulator.png');
    await tryClick(page.getByLabel('Close'), 'close simulator');
    await page.waitForTimeout(400);
  }
} catch (e) { console.log('simulator skipped:', e.message.split('\n')[0]); }

// Premium paywall
try {
  const ok = await tryClick(page.getByText(/go premium|upgrade|premium/i), 'open premium');
  if (ok) {
    await page.waitForTimeout(800);
    await shot('06-premium.png');
    await tryClick(page.getByText(/maybe later/i), 'close premium');
    await page.waitForTimeout(400);
  }
} catch (e) { console.log('premium skipped:', e.message.split('\n')[0]); }

// Profile modal — the avatar button in the header
try {
  const ok = await tryClick(page.getByLabel('Profile'), 'open profile');
  if (ok) {
    await page.waitForTimeout(700);
    await shot('07-profile.png');
  }
} catch (e) { console.log('profile skipped:', e.message.split('\n')[0]); }

await browser.close();
console.log('done ->', out);
