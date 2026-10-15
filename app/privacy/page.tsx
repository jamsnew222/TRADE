import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — TradeQuest',
  description: 'How TradeQuest handles your data',
};

const sections: { title: string; body: string[] }[] = [
  {
    title: 'Overview',
    body: [
      'TradeQuest is a trading education app. It is designed to work without an account: your progress, XP, streaks, portfolio positions, and settings are stored locally on your device and are never uploaded to our servers.',
      'This policy explains what data the app touches, what third parties it contacts, and what choices you have.'
    ],
  },
  {
    title: 'Data stored on your device',
    body: [
      'The app stores your learning progress, XP, streaks, daily usage counters, premium status, theme preference, trading style, and simulator portfolio in your device\'s local storage. This data never leaves your device and you can erase it at any time by clearing the app\'s storage or reinstalling.',
    ],
  },
  {
    title: 'Market data providers',
    body: [
      'To show real and near-real stock prices, the app requests quotes from Finnhub (finnhub.io) and stooq.com. These requests include the app\'s public API key and stock symbols — never your personal data. As with any network request, your IP address is visible to those providers.',
      'Currency conversion uses api.exchangerate-api.com on the same basis.',
    ],
  },
  {
    title: 'Purchases',
    body: [
      'Premium subscriptions are processed by Apple App Store or Google Play through RevenueCat (revenuecat.com). We never see or store your card details. RevenueCat receives an anonymous app user ID to manage your subscription entitlement across devices and restores.',
    ],
  },
  {
    title: 'Advertising and analytics',
    body: [
      'TradeQuest contains no advertisements and no advertising SDKs. The app does not use analytics trackers and does not build a profile of you.',
    ],
  },
  {
    title: 'Simulation disclaimer',
    body: [
      'Simulated and delayed prices shown in the app are for education only and are not investment advice or a solicitation to buy or sell securities. Real trading involves risk of loss.',
    ],
  },
  {
    title: 'Children',
    body: [
      'The app does not knowingly collect personal information from children under 13. All learning data stays on the device.',
    ],
  },
  {
    title: 'Changes',
    body: [
      'If this policy changes, the updated version will be posted at this page with a new effective date.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'Questions about privacy can be sent via the support channel listed on the app\'s store page.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-500 p-2 rounded-xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
        <p className="text-gray-500 mb-10">TradeQuest — effective {new Date().toISOString().slice(0, 10)}</p>

        <div className="space-y-6">
          {sections.map((s) => (
            <section key={s.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-2 last:mb-0">{p}</p>
              ))}
            </section>
          ))}
        </div>

        <Link href="/" className="mt-10 inline-block text-green-600 font-semibold hover:underline">
          ← Back to TradeQuest
        </Link>
      </div>
    </div>
  );
}
