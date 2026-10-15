import { Lesson } from '@/types';

// Unit 9: the trader's toolkit — deeper indicators, non-stock asset classes,
// tax-advantaged accounts, and the process layer (planning + journaling).
export const toolkitLessons: Lesson[] = [
  {
    id: 'macd-bollinger',
    title: 'MACD & Bollinger Bands',
    description: 'Two of the most-used technical indicators, and how traders combine them',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Technical Analysis',
    xpReward: 60,
    content: {
      explanation: 'MACD (Moving Average Convergence Divergence) measures momentum: it subtracts the 26-period EMA from the 12-period EMA to form the MACD line, then plots a 9-period EMA of that line as the signal line. A bullish signal fires when the MACD line crosses above the signal line; the histogram shows the distance between them. Bollinger Bands wrap a 20-period moving average with bands two standard deviations away — they measure volatility, not direction. When the bands pinch together (a "squeeze"), a big move often follows; price riding the upper band signals strength, not necessarily a reversal. Pros use MACD for momentum direction and Bollinger Bands for volatility context together.',
      quiz: [
        {
          id: 'q1',
          question: 'What does the MACD line actually measure?',
          options: [
            'The difference between a fast EMA (12) and a slow EMA (26)',
            'The total volume of a stock',
            'The distance between daily high and low',
            'The number of advancing vs declining stocks'
          ],
          correctAnswer: 0,
          explanation: 'MACD = 12-period EMA minus 26-period EMA — a momentum gauge comparing recent vs older trend.'
        },
        {
          id: 'q2',
          question: 'A MACD bullish crossover means…',
          options: [
            'The MACD line crossed above its signal line',
            'Price crossed above a moving average',
            'Two stock prices crossed',
            'Volume crossed above its average'
          ],
          correctAnswer: 0,
          explanation: 'The signal line is a 9-EMA of the MACD line; MACD crossing above it suggests momentum is turning up.'
        },
        {
          id: 'q3',
          question: 'What is a Bollinger Band "squeeze"?',
          options: [
            'Bands pinch together — low volatility that often precedes a big move',
            'Price touches both bands at once',
            'The bands switch places',
            'A guaranteed buy signal'
          ],
          correctAnswer: 0,
          explanation: 'Tightening bands mean volatility has compressed; breakouts frequently follow a squeeze.'
        },
        {
          id: 'q4',
          question: 'Price continuously "walking" the upper Bollinger Band usually indicates…',
          options: [
            'A strong uptrend — not necessarily a reversal',
            'The stock must fall immediately',
            'Low volatility',
            'The bands are broken'
          ],
          correctAnswer: 0,
          explanation: 'Riding the upper band is a sign of trend strength; strong trends can hug the band for a long time.'
        }
      ],
      trueFalse: [
        {
          id: 'q5',
          statement: 'Bollinger Bands primarily measure volatility.',
          correctAnswer: true,
          explanation: 'The bands sit two standard deviations from the mean — wider bands = more volatility.'
        },
        {
          id: 'q6',
          statement: 'The MACD histogram shows the gap between the MACD line and the signal line.',
          correctAnswer: true,
          explanation: 'The histogram visualizes the distance between the two — growing bars mean strengthening momentum.'
        },
        {
          id: 'q7',
          statement: 'A band squeeze tells you which direction the breakout will go.',
          correctAnswer: false,
          explanation: 'The squeeze predicts a move is coming, not its direction — wait for the breakout itself.'
        }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match the indicator element to what it tells you',
        pairs: [
          { left: 'MACD line', right: 'Momentum: fast vs slow EMA gap' },
          { left: 'Signal line', right: '9-period EMA of the MACD line' },
          { left: 'Histogram', right: 'Distance between MACD and signal' },
          { left: 'Band width', right: 'Current volatility level' }
        ]
      },
      scenario: [
        {
          id: 'q8',
          scenario: 'Bollinger Bands have been squeezing for two weeks. Today price breaks above the upper band on heavy volume and MACD just crossed bullish.',
          question: 'What does this combination suggest?',
          options: [
            'A potential upside breakout — momentum and volatility expansion agree',
            'A guaranteed crash is coming',
            'The stock is now risk-free',
            'Nothing — indicators never work together'
          ],
          correctAnswer: 0,
          explanation: 'Squeeze → expansion plus a bullish MACD cross is a classic multi-signal breakout confirmation.'
        }
      ]
    }
  },
  {
    id: 'bonds-fixed-income',
    title: 'Bonds & Fixed Income',
    description: 'How bonds work, why yields move prices, and why portfolios hold them',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Strategy',
    xpReward: 55,
    content: {
      explanation: 'A bond is a loan you make to a government or company. It pays a fixed coupon (interest) until maturity, when you get the face value back. The key rule: bond prices move opposite to interest rates — when rates rise, existing lower-coupon bonds fall in price, and vice versa. Duration measures how sensitive a bond is to rate changes: longer maturity = bigger swings. Credit rating tells you default risk — Treasuries are safest, "junk" bonds pay more because they might not pay you back. Bonds earn a portfolio slot because they produce income and often zig when stocks zag, cushioning downturns.',
      quiz: [
        {
          id: 'q1',
          question: 'When interest rates rise, existing bond prices…',
          options: [
            'Fall — their lower coupons become less attractive',
            'Rise — bonds become more valuable',
            'Stay exactly the same',
            'Convert into stocks'
          ],
          correctAnswer: 0,
          explanation: 'New bonds pay more, so old bonds must drop in price to offer a competitive yield.'
        },
        {
          id: 'q2',
          question: 'What is a bond coupon?',
          options: [
            'The interest payment the bond pays you',
            'A discount voucher for buying bonds',
            'The bond\'s maturity date',
            'A fee the broker charges'
          ],
          correctAnswer: 0,
          explanation: 'The coupon is the periodic interest payment — named after paper coupons once clipped from bond certificates.'
        },
        {
          id: 'q3',
          question: 'Duration tells you…',
          options: [
            'How sensitive a bond\'s price is to interest-rate changes',
            'How often the coupon pays',
            'The bond\'s credit rating',
            'The bond\'s trading volume'
          ],
          correctAnswer: 0,
          explanation: 'Higher duration = bigger price swings when rates move. Long-maturity bonds have high duration.'
        },
        {
          id: 'q4',
          question: 'Why do portfolios hold bonds alongside stocks?',
          options: [
            'Income plus diversification — bonds often hold up when stocks drop',
            'Bonds always go up',
            'Bonds are required by law',
            'Bonds grow faster than stocks'
          ],
          correctAnswer: 0,
          explanation: 'Bond coupons provide steady income and the asset mix cushions equity drawdowns.'
        }
      ],
      trueFalse: [
        {
          id: 'q5',
          statement: 'Junk bonds pay higher interest because they carry higher default risk.',
          correctAnswer: true,
          explanation: 'Lower-rated issuers must pay more to compensate lenders for the extra risk.'
        },
        {
          id: 'q6',
          statement: 'US Treasury bonds are considered the safest because they\'re backed by the government.',
          correctAnswer: true,
          explanation: 'Treasuries are the benchmark "risk-free" asset — the government can tax and print to repay.'
        }
      ],
      wordBank: [
        {
          id: 'q7',
          instruction: 'Complete the sentence',
          sentence: 'When rates rise, bond ___ fall because new bonds pay ___ coupons.',
          words: ['prices', 'higher', 'yields', 'lower', 'stocks', 'risk'],
          correctWords: ['prices', 'higher'],
          explanation: 'The inverse rate-price relationship is the core mechanic of bond markets.'
        }
      ],
      ordering: [
        {
          id: 'q8',
          instruction: 'Order these bonds by typical risk, safest first',
          items: ['US Treasury bond', 'Investment-grade corporate bond', 'High-yield (junk) bond'],
          correctOrder: [0, 1, 2],
          explanation: 'Government < quality companies < shaky companies — yield rises as risk rises.'
        }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match the bond term to its meaning',
        pairs: [
          { left: 'Coupon', right: 'The interest payment' },
          { left: 'Maturity', right: 'When the loan is repaid' },
          { left: 'Face value', right: 'The amount repaid at maturity' },
          { left: 'Yield', right: 'Effective return at the current price' }
        ]
      }
    }
  },
  {
    id: 'commodities-reits',
    title: 'Commodities & REITs',
    description: 'Gold, oil, real estate trusts — the asset classes beyond stocks and bonds',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Advanced',
    xpReward: 60,
    premiumOnly: true,
    content: {
      explanation: 'Commodities are raw goods — gold, oil, wheat, copper — traded via futures contracts or ETFs. They don\'t generate earnings; prices move on supply, demand, and inflation expectations, which is why gold is called an inflation hedge. REITs (Real Estate Investment Trusts) are companies that own income-producing property and must distribute at least 90% of taxable income to shareholders — that\'s why they yield high dividends. REITs let you own real estate like a stock: liquid, diversified, and no tenants to call. Both asset classes diversify a stock/bond portfolio because they react to different economic forces.',
      quiz: [
        {
          id: 'q1',
          question: 'Why is gold often called an inflation hedge?',
          options: [
            'Its supply grows slowly, so it tends to hold value when currency loses purchasing power',
            'Governments fix its price',
            'It pays high dividends',
            'It never drops in price'
          ],
          correctAnswer: 0,
          explanation: 'Scarcity is the logic: you can\'t print more gold, so it historically holds real value through inflation.'
        },
        {
          id: 'q2',
          question: 'What must a REIT do to keep its special tax status?',
          options: [
            'Distribute at least 90% of taxable income to shareholders',
            'Own property in every state',
            'Never take on any debt',
            'Get approval from the Federal Reserve'
          ],
          correctAnswer: 0,
          explanation: 'The 90% payout rule is the REIT bargain — it\'s why REITs are income machines.'
        },
        {
          id: 'q3',
          question: 'How do most everyday investors buy commodities?',
          options: [
            'ETFs or futures — few store physical barrels of oil',
            'By renting storage tanks',
            'Only through mining stocks',
            'Commodities can\'t be invested in'
          ],
          correctAnswer: 0,
          explanation: 'Commodity ETFs handle the storage/futures complexity so you just buy a ticker.'
        },
        {
          id: 'q4',
          question: 'Compared to buying a rental property, a REIT offers…',
          options: [
            'Liquidity and diversification — sell anytime, own slices of many buildings',
            'Guaranteed rent checks',
            'No market risk',
            'Direct control over the properties'
          ],
          correctAnswer: 0,
          explanation: 'REITs trade like stocks: instant liquidity and instant diversification, minus the landlord duties.'
        }
      ],
      trueFalse: [
        {
          id: 'q5',
          statement: 'Commodity prices are driven by supply and demand, not company earnings.',
          correctAnswer: true,
          explanation: 'A barrel of oil has no earnings report — harvests, OPEC decisions, and demand cycles drive price.'
        },
        {
          id: 'q6',
          statement: 'REIT dividends are usually low because REITs retain most of their income.',
          correctAnswer: false,
          explanation: 'It\'s the opposite — the mandatory 90% payout makes REIT yields relatively high.'
        }
      ],
      multipleSelect: [
        {
          id: 'q7',
          question: 'Which of these are commodities? (Select all)',
          options: ['Gold', 'Crude oil', 'A share of Apple', 'Wheat'],
          correctAnswers: [0, 1, 3],
          explanation: 'Commodities are raw goods — metals, energy, agriculture. A share is equity, not a commodity.'
        }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match the asset to its role in a portfolio',
        pairs: [
          { left: 'Gold', right: 'Inflation hedge / crisis insurance' },
          { left: 'REITs', right: 'Real estate exposure + income' },
          { left: 'Oil', right: 'Energy/economic-cycle exposure' },
          { left: 'Copper', right: 'Industrial demand barometer' }
        ]
      },
      scenario: [
        {
          id: 'q8',
          scenario: 'Inflation is running hot and the Fed is hiking. Your portfolio is 100% stocks.',
          question: 'Why might adding gold and REITs help?',
          options: [
            'They respond to different forces than stocks — inflation hedge plus income diversification',
            'They are guaranteed to rise',
            'Stocks become worthless during inflation',
            'It wouldn\'t help — all assets fall together'
          ],
          correctAnswer: 0,
          explanation: 'Real assets often behave differently from equities during inflation — that\'s the diversification argument.'
        }
      ]
    }
  },
  {
    id: 'retirement-accounts',
    title: 'Retirement Accounts',
    description: '401(k)s, IRAs, Roth vs Traditional — the tax-advantaged wrappers most traders ignore',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 50,
    content: {
      explanation: 'Retirement accounts are wrappers around investments that change when taxes hit. A Traditional 401(k)/IRA takes pre-tax money — you skip tax now, pay it when you withdraw in retirement. A Roth takes after-tax money — you pay now, but every dollar of growth and withdrawal is tax-free forever. The killer feature: employer 401(k) matching — a 100% instant return that no trade can beat. Withdraw early (before ~59½) and you\'ll typically pay a 10% penalty plus taxes. The rule of thumb: contribute enough to get the full match first, then decide Roth vs Traditional by whether your tax rate is higher now or later.',
      quiz: [
        {
          id: 'q1',
          question: 'What\'s the difference between Traditional and Roth accounts?',
          options: [
            'Traditional: taxed on withdrawal. Roth: taxed now, then tax-free forever',
            'Roth is only for rich people',
            'Traditional earns more money',
            'There is no real difference'
          ],
          correctAnswer: 0,
          explanation: 'It\'s about WHEN you pay tax: Traditional defers it, Roth eliminates it on the growth.'
        },
        {
          id: 'q2',
          question: 'Your employer matches 50% of your 401(k) contributions up to 6% of salary. Contributing at least 6% is smart because…',
          options: [
            'The match is an instant 50% return — free money you can\'t get elsewhere',
            'It lowers your credit score requirements',
            'The account earns guaranteed 20%',
            'It\'s required by law'
          ],
          correctAnswer: 0,
          explanation: 'Employer match is the closest thing to free money in all of finance — always capture the full match.'
        },
        {
          id: 'q3',
          question: 'Withdrawing from a retirement account before ~59½ typically costs…',
          options: [
            'Income tax plus a ~10% early-withdrawal penalty',
            'Nothing — it\'s your money',
            'Only a small flat fee',
            'Your employer gets notified'
          ],
          correctAnswer: 0,
          explanation: 'The penalty exists to keep retirement money for retirement — emergencies aside, don\'t touch it.'
        },
        {
          id: 'q4',
          question: 'A 22-year-old in a low tax bracket choosing between Roth and Traditional should probably pick…',
          options: [
            'Roth — pay low taxes now, decades of growth come out tax-free',
            'Traditional — defer everything',
            'Neither — retirement accounts don\'t matter when young',
            'Whichever has higher fees'
          ],
          correctAnswer: 0,
          explanation: 'Low bracket now → pay the small tax today; Roth turns 40+ years of compounding into tax-free money.'
        }
      ],
      trueFalse: [
        {
          id: 'q5',
          statement: 'A Roth IRA lets all of your investment growth come out tax-free in retirement.',
          correctAnswer: true,
          explanation: 'That\'s the Roth deal: tax now, never again — compounding with zero tax drag on exit.'
        },
        {
          id: 'q6',
          statement: 'You can hold stocks, ETFs, and funds inside a retirement account.',
          correctAnswer: true,
          explanation: 'The account is a wrapper — inside it you still pick investments like index funds or stocks.'
        }
      ],
      ordering: [
        {
          id: 'q7',
          instruction: 'Order the smart priority for a paycheck, first step first',
          items: [
            'Contribute enough to get the full employer 401(k) match',
            'Fill a Roth IRA',
            'Invest in a regular taxable account'
          ],
          correctOrder: [0, 1, 2],
          explanation: 'Free match first, tax-free growth second, taxable investing only after advantages are used.'
        }
      ],
      wordBank: [
        {
          id: 'q8',
          instruction: 'Complete the sentence',
          sentence: 'A ___ account taxes you now; a ___ account taxes you at withdrawal.',
          words: ['Roth', 'Traditional', 'margin', 'savings', 'crypto', 'checking'],
          correctWords: ['Roth', 'Traditional'],
          explanation: 'Roth = pay tax today, withdraw tax-free. Traditional = deduct today, pay tax in retirement.'
        }
      ],
      scenario: [
        {
          id: 'q9',
          scenario: 'Your coworker says "I don\'t bother with the 401(k), I just buy stocks in my regular account." They\'re skipping a 4% employer match.',
          question: 'What are they leaving on the table?',
          options: [
            'A guaranteed 4% of salary plus the tax advantages — likely worth thousands a year',
            'Nothing important',
            'Only a small convenience',
            'A prize drawing'
          ],
          correctAnswer: 0,
          explanation: 'Skipping the match is like declining a raise — it\'s compensation they\'re already owed.'
        }
      ]
    }
  },
  {
    id: 'trading-plan',
    title: 'Building a Trading Plan',
    description: 'The written rules that separate traders from gamblers',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Psychology',
    xpReward: 70,
    premiumOnly: true,
    content: {
      explanation: 'A trading plan is a written set of rules you follow BEFORE emotions kick in: which markets you trade, your entry criteria, exit rules for both wins AND losses, position size per trade, and your max daily/weekly loss limit. Professional traders treat it like a pilot\'s checklist — the plan is made calm, executed under stress. A trading journal records every trade with the setup, the reason, the outcome, and what you felt — over months it turns vague impressions into hard data about what actually works for you. The weekly review closes the loop: rules broken are either lessons or rules to rewrite. Trading without a plan means every loss teaches nothing.',
      quiz: [
        {
          id: 'q1',
          question: 'What belongs in a trading plan?',
          options: [
            'Entry rules, exit rules for wins and losses, position sizing, max loss limits',
            'Predictions about tomorrow\'s prices',
            'A list of stocks to buy',
            'Your profit goals only'
          ],
          correctAnswer: 0,
          explanation: 'A plan covers process — when you enter, when you exit, how much you risk — not predictions.'
        },
        {
          id: 'q2',
          question: 'Why write the plan when calm instead of deciding mid-trade?',
          options: [
            'Stress degrades judgment — pre-committed rules beat in-the-moment emotion',
            'It looks more professional',
            'Regulations require it',
            'It makes trades execute faster'
          ],
          correctAnswer: 0,
          explanation: 'Like a pilot\'s checklist — the plan exists precisely for the moments your judgment is compromised.'
        },
        {
          id: 'q3',
          question: 'What should a trading journal entry capture?',
          options: [
            'The setup, your reason for entering, the outcome, and what you felt',
            'Only the profit or loss',
            'Just the ticker symbol',
            'Nothing — memory is enough'
          ],
          correctAnswer: 0,
          explanation: 'Recording reasoning + emotion is what turns mistakes into data you can actually fix.'
        },
        {
          id: 'q4',
          question: 'A "max daily loss" rule exists to…',
          options: [
            'Force you to stop before one bad day wrecks the account',
            'Limit your profits',
            'Satisfy regulators',
            'Make trading boring'
          ],
          correctAnswer: 0,
          explanation: 'Revenge trading after losses is how accounts die — a hard daily stop interrupts the spiral.'
        }
      ],
      trueFalse: [
        {
          id: 'q5',
          statement: 'A good plan includes exit rules for winning trades too, not just losers.',
          correctAnswer: true,
          explanation: 'Knowing when to take profit is half the system — "I\'ll figure it out later" breeds greed and regret.'
        },
        {
          id: 'q6',
          statement: 'Breaking your own rules occasionally is fine as long as the trade wins.',
          correctAnswer: false,
          explanation: 'A profitable rule-break is the most dangerous trade — it rewards bad process and invites a bigger break later.'
        }
      ],
      ordering: [
        {
          id: 'q7',
          instruction: 'Order the trader\'s weekly cycle',
          items: [
            'Write rules and setups into the plan',
            'Execute trades following the plan',
            'Journal every trade with reasons and feelings',
            'Review the week — keep or rewrite rules'
          ],
          correctOrder: [0, 1, 2, 3],
          explanation: 'Plan → execute → record → review. The loop that compounds skill instead of just experience.'
        }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match the plan element to its purpose',
        pairs: [
          { left: 'Entry criteria', right: 'Only take setups you\'ve defined' },
          { left: 'Position sizing', right: 'No single trade can hurt you badly' },
          { left: 'Max daily loss', right: 'Stop before a bad day spirals' },
          { left: 'Journal', right: 'Convert mistakes into data' }
        ]
      },
      scenario: [
        {
          id: 'q8',
          scenario: 'You\'ve hit your -2% daily loss limit by 10am. A setup you love just appeared and you\'re sure it\'ll recover the day.',
          question: 'What does the plan say to do?',
          options: [
            'Stop for the day — the limit exists precisely for this moment',
            'Take the trade since it looks perfect',
            'Double the position to recover faster',
            'Move your limit just this once'
          ],
          correctAnswer: 0,
          explanation: 'Every blown account had a "this time it\'s different" moment. The rule is doing its job right now.'
        }
      ]
    }
  }
];
