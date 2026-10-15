import { Lesson } from '@/types';

/**
 * Advanced track — options strategies, forex, crypto, psychology, and
 * deeper risk management. Quiz questions may carry a `chart` array:
 * a stylized price path rendered as a mini chart inside the question card.
 */
export const advancedLessons: Lesson[] = [
  {
    id: 'options-strategies',
    title: 'Options Strategies',
    description: 'Covered calls, protective puts, spreads, and straddles — how traders combine options',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Options',
    xpReward: 70,
    premiumOnly: true,
    content: {
      explanation: 'Options are contracts that give you the right — not the obligation — to buy (call) or sell (put) a stock at a set price before expiration. A covered call sells a call against stock you own to collect premium income. A protective put is insurance on a stock you hold. A spread buys and sells options at different strikes to cap both cost and risk. A straddle buys a call and a put at the same strike to profit from a big move in either direction. Every option loses value over time — that decay is called theta.',
      quiz: [
        {
          id: 'q1',
          question: 'What does a call option give you?',
          options: [
            'The right to buy a stock at a set price before expiration',
            'The obligation to buy a stock',
            'The right to sell a stock',
            'Ownership of the stock'
          ],
          correctAnswer: 0,
          explanation: 'A call is a right, not an obligation — you choose whether to exercise it before expiry.'
        },
        {
          id: 'q2',
          question: 'A covered call means you:',
          options: [
            'Sell a call against shares you already own to collect premium',
            'Buy a call and a put together',
            'Sell a stock short and hedge it',
            'Buy a call with no shares'
          ],
          correctAnswer: 0,
          explanation: 'You own the stock (the "covered" part) and sell a call on it — premium income in exchange for capping your upside.'
        },
        {
          id: 'q3',
          question: 'Why buy a protective put?',
          options: [
            'To insure a stock you own against a big drop',
            'To increase dividends',
            'To short a stock legally',
            'To guarantee a profit'
          ],
          correctAnswer: 0,
          explanation: 'A put on your holding sets a floor — like an insurance deductible, it costs premium but caps your downside.'
        },
        {
          id: 'q4',
          question: 'A straddle profits when:',
          options: [
            'The stock makes a big move in either direction',
            'The stock stays perfectly flat',
            'Volatility collapses',
            'Interest rates rise'
          ],
          correctAnswer: 0,
          explanation: 'Buying a call and a put at the same strike pays off if the move is bigger than the total premium paid — direction does not matter.',
          chart: [100, 98, 112, 96, 118]
        },
        {
          id: 'q5',
          question: 'What is "theta" in options?',
          options: [
            'The rate at which an option loses value as expiration approaches',
            'The option\'s trading volume',
            'The stock\'s dividend yield',
            'The bid-ask spread'
          ],
          correctAnswer: 0,
          explanation: 'Options are wasting assets — theta is time decay, and it accelerates near expiry.'
        }
      ],
      trueFalse: [
        { id: 'q6', statement: 'A spread caps both your potential profit and your potential loss.', correctAnswer: true, explanation: 'Spreads trade capped upside for capped cost and capped risk — defined risk on both ends.' },
        { id: 'q7', statement: 'Buying a call can lose more than the premium you paid.', correctAnswer: false, explanation: 'Long options can only lose the premium — unlike selling options, which can carry unlimited risk.' }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match each strategy to its goal:',
        pairs: [
          { left: 'Covered call', right: 'Income from shares you own' },
          { left: 'Protective put', right: 'Insurance against a drop' },
          { left: 'Straddle', right: 'Profit from a big move either way' },
          { left: 'Spread', right: 'Defined risk, defined reward' }
        ]
      },
      scenario: [
        {
          id: 'q8',
          scenario: 'You own 100 shares of a stock and think it will trade sideways for a month. You want extra income.',
          question: 'Which strategy fits?',
          options: ['Covered call', 'Straddle', 'Protective put', 'Short selling'],
          correctAnswer: 0,
          explanation: 'Selling a call against your shares collects premium — ideal when you expect the stock to stay flat.'
        }
      ],
      wordBank: [
        {
          id: 'q9',
          instruction: 'Complete the sentence:',
          sentence: 'A straddle bets on _____, not direction',
          words: ['volatility', 'dividends', 'the trend', 'earnings'],
          correctWords: ['volatility'],
          explanation: 'Straddles are pure volatility bets — you win if the move is big, whichever way it goes.'
        }
      ]
    }
  },
  {
    id: 'forex-trading',
    title: 'Forex Trading',
    description: 'Currency pairs, pips, leverage, and the 24-hour market cycle',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Forex',
    xpReward: 60,
    content: {
      explanation: 'Forex is trading one currency against another — EUR/USD rising means the euro strengthened against the dollar. Prices move in pips, the smallest standard price move (usually the 4th decimal). Forex trades in lots and famously uses high leverage — 50:1 or more — which magnifies gains and losses alike. The market runs 24 hours on weekdays through the Sydney, Tokyo, London, and New York sessions; the London–New York overlap is the busiest window.',
      quiz: [
        {
          id: 'q1',
          question: 'In the pair EUR/USD, what does a rising price mean?',
          options: [
            'The euro is strengthening against the US dollar',
            'The dollar is strengthening against the euro',
            'Both currencies are rising',
            'Stocks are going up'
          ],
          correctAnswer: 0,
          explanation: 'The first currency (base) is being bought with the second (quote) — EUR/USD up = euro stronger, dollar weaker.'
        },
        {
          id: 'q2',
          question: 'What is a "pip"?',
          options: [
            'The smallest standard price move in a currency pair',
            'A type of forex broker',
            'A forex trading tax',
            'The spread on exotic pairs'
          ],
          correctAnswer: 0,
          explanation: 'For most pairs a pip is 0.0001 — the unit traders count gains and losses in.'
        },
        {
          id: 'q3',
          question: 'What does 50:1 leverage mean?',
          options: [
            '$1,000 controls a $50,000 position',
            'You need 50 accounts',
            'You can only trade 50 times',
            'Your profit is capped at 50%'
          ],
          correctAnswer: 0,
          explanation: 'Leverage amplifies position size — and risk. A 2% move against you wipes out the entire margin.'
        },
        {
          id: 'q4',
          question: 'When is forex volume highest?',
          options: [
            'During the London–New York session overlap',
            'On weekends',
            'Only during Asian hours',
            'At midnight GMT'
          ],
          correctAnswer: 0,
          explanation: 'The overlap of the two biggest centers concentrates liquidity — the tightest spreads and biggest moves happen there.'
        },
        {
          id: 'q5',
          question: 'Unlike stocks, the forex market:',
          options: [
            'Runs 24 hours a day on weekdays across global sessions',
            'Only opens with the NYSE',
            'Closes every night at 5pm New York time and reopens weekly',
            'Is closed whenever banks sleep'
          ],
          correctAnswer: 0,
          explanation: 'Forex follows the sun — Sydney to Tokyo to London to New York — so it stays open continuously Monday to Friday.'
        }
      ],
      trueFalse: [
        { id: 'q6', statement: 'In forex you always buy one currency and sell another at the same time.', correctAnswer: true, explanation: 'Every forex trade is a pair — going long EUR/USD means buying euros and selling dollars simultaneously.' },
        { id: 'q7', statement: 'High leverage reduces your risk because positions are bigger.', correctAnswer: false, explanation: 'Leverage magnifies risk proportionally — bigger exposure means small price moves can erase your margin.' }
      ],
      ordering: [
        {
          id: 'q8',
          instruction: 'Order the forex sessions as they occur in a day (GMT):',
          items: ['Sydney opens', 'Tokyo opens', 'London opens', 'New York opens', 'New York closes, cycle repeats'],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'The market follows the sun: Asia first, then Europe, then the US — handing off continuously.'
        }
      ],
      wordBank: [
        {
          id: 'q9',
          instruction: 'Complete the sentence:',
          sentence: 'In EUR/USD, the euro is the _____ currency and the dollar is the quote',
          words: ['base', 'minor', 'exotic', 'floating'],
          correctWords: ['base'],
          explanation: 'Base/quote: the price tells you how much quote currency one unit of the base currency buys.'
        }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match the forex term to its meaning:',
        pairs: [
          { left: 'Pip', right: 'Smallest standard price move' },
          { left: 'Leverage', right: 'Trading bigger than your deposit' },
          { left: 'Base currency', right: 'The first currency in a pair' },
          { left: 'Session overlap', right: 'When two markets are open together' }
        ]
      }
    }
  },
  {
    id: 'crypto-essentials',
    title: 'Crypto Essentials',
    description: 'How crypto markets differ from stocks — wallets, 24/7 trading, volatility, and supply',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Crypto',
    xpReward: 60,
    content: {
      explanation: 'Crypto trades 24/7/365 — there is no closing bell and no circuit breakers. Coins live in wallets you control (self-custody) or on exchanges that hold keys for you; "not your keys, not your coins" means exchange-held crypto depends on the exchange\'s survival. Volatility is extreme — 10% daily swings are routine. Market cap matters more than coin price: a $0.10 coin with a trillion supply is bigger than a $60,000 coin with a tiny one. Network ("gas") fees apply when moving coins on-chain.',
      quiz: [
        {
          id: 'q1',
          question: 'How does crypto market hours differ from stock markets?',
          options: [
            'Crypto trades 24/7 with no closing bell',
            'Crypto closes on weekends',
            'Crypto only trades during US hours',
            'Crypto halts overnight'
          ],
          correctAnswer: 0,
          explanation: 'There is no exchange to close — crypto markets run continuously, which means weekend crashes happen while stock traders sleep.'
        },
        {
          id: 'q2',
          question: '"Not your keys, not your coins" means:',
          options: [
            'Crypto on an exchange is controlled by that exchange, not you',
            'You should memorize your password',
            'Hardware wallets are illegal',
            'Coins must be printed'
          ],
          correctAnswer: 0,
          explanation: 'If a platform holds your private keys, you are trusting its solvency and security — self-custody wallets put control in your hands.'
        },
        {
          id: 'q3',
          question: 'Which matters more for a coin\'s size?',
          options: [
            'Market cap (price × circulating supply)',
            'The price of a single coin',
            'The logo',
            'The number of decimal places'
          ],
          correctAnswer: 0,
          explanation: 'A $0.01 coin with 500 billion supply has a $5B market cap — coin price alone tells you nothing about size.'
        },
        {
          id: 'q4',
          question: 'What are "gas fees"?',
          options: [
            'Network fees paid to process transactions on a blockchain',
            'Broker commissions on crypto',
            'Taxes on crypto profits',
            'Fees for storing crypto'
          ],
          correctAnswer: 0,
          explanation: 'On-chain transactions pay validators — fees spike when networks are congested.'
        },
        {
          id: 'q5',
          question: 'A realistic expectation for a major crypto\'s daily move is:',
          options: [
            '5–10% swings are routine',
            'Never more than 1%',
            'Exactly matches the S&P 500',
            'Zero — prices are fixed by supply'
          ],
          correctAnswer: 0,
          explanation: 'Crypto volatility dwarfs stocks — position sizing matters even more than usual.',
          chart: [100, 108, 95, 112, 89, 104]
        }
      ],
      trueFalse: [
        { id: 'q6', statement: 'Bitcoin has a fixed maximum supply of 21 million coins.', correctAnswer: true, explanation: 'Bitcoin\'s hard cap is enforced by code — scarcity is a core part of its value thesis.' },
        { id: 'q7', statement: 'Crypto markets have circuit breakers like stock exchanges.', correctAnswer: false, explanation: 'No circuit breakers — crypto can fall 30% without any halt, which is why stops and sizing matter.' }
      ],
      scenario: [
        {
          id: 'q8',
          scenario: 'Saturday night: a major coin drops 15% while the stock market is closed.',
          question: 'What does this illustrate about crypto?',
          options: [
            'Crypto trades around the clock — risk never sleeps',
            'Crypto prices are manipulated by banks',
            'The coin will definitely recover Monday',
            'Exchanges were hacked'
          ],
          correctAnswer: 0,
          explanation: 'Weekend moves are normal in crypto — the 24/7 market means risk exists outside business hours.'
        }
      ],
      wordBank: [
        {
          id: 'q9',
          instruction: 'Complete the sentence:',
          sentence: 'Self-custody means you hold your own _____ keys',
          words: ['private', 'public', 'exchange', 'mining'],
          correctWords: ['private'],
          explanation: 'The private key is the ownership proof — whoever holds it controls the coins.'
        }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match each crypto concept:',
        pairs: [
          { left: 'Private key', right: 'Proves ownership of coins' },
          { left: 'Gas fee', right: 'Cost of an on-chain transaction' },
          { left: 'Market cap', right: 'Price times circulating supply' },
          { left: 'Self-custody', right: 'Holding your own keys' }
        ]
      }
    }
  },
  {
    id: 'trading-psychology',
    title: 'Trading Psychology',
    description: 'FOMO, revenge trading, loss aversion, and the discipline that separates winners',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Psychology',
    xpReward: 60,
    content: {
      explanation: 'Most trading losses are psychological, not analytical. FOMO makes you chase pumps at the top. Revenge trading doubles down after a loss to "win it back" — and usually doubles the loss. Loss aversion makes traders hold losers too long and sell winners too early (the disposition effect). Overconfidence after a winning streak leads to oversized bets. The counterweights: a written plan before every trade, predefined exits, position sizing you can sleep with, and a trade journal that turns mistakes into data.',
      quiz: [
        {
          id: 'q1',
          question: 'What is FOMO trading?',
          options: [
            'Buying impulsively because a price is running away without you',
            'Trading only on Fridays',
            'Following a strict checklist',
            'Selling at a planned target'
          ],
          correctAnswer: 0,
          explanation: 'Fear of missing out buys the top of a move — the crowd arrives late and pays for it.'
        },
        {
          id: 'q2',
          question: 'Revenge trading is:',
          options: [
            'Taking bigger, angrier trades to win back a loss',
            'Trading against your broker',
            'Shorting stocks you dislike',
            'Selling at break-even'
          ],
          correctAnswer: 0,
          explanation: 'Emotional trades after a loss abandon position sizing — the fastest way to turn a bad day into a blown account.'
        },
        {
          id: 'q3',
          question: 'The "disposition effect" means traders tend to:',
          options: [
            'Hold losers too long and sell winners too early',
            'Always buy the dip',
            'Trade too many pairs at once',
            'Check prices too often'
          ],
          correctAnswer: 0,
          explanation: 'Losses feel unbearable so losers get held hoping for recovery, while winners get sold fast to "lock in" the gain — exactly backwards.'
        },
        {
          id: 'q4',
          question: 'What is the best defense against emotional decisions?',
          options: [
            'A written plan with entry, exit, and size decided before the trade',
            'Trading faster so you do not think',
            'Watching more news',
            'Bigger positions to feel less fear'
          ],
          correctAnswer: 0,
          explanation: 'Decisions made calmly in advance beat decisions made mid-trade with money on the line.'
        },
        {
          id: 'q5',
          question: 'After a big winning streak, the most dangerous impulse is:',
          options: [
            'Increasing size because you feel invincible',
            'Taking a break',
            'Reviewing your journal',
            'Raising cash'
          ],
          correctAnswer: 0,
          explanation: 'Overconfidence inflates size right when variance is due to bite — the classic boom-bust cycle.'
        }
      ],
      trueFalse: [
        { id: 'q6', statement: 'A trade journal turns emotional mistakes into reviewable data.', correctAnswer: true, explanation: 'Logging why you entered lets you spot your own repeat patterns — you cannot fix what you cannot see.' },
        { id: 'q7', statement: 'Moving a stop-loss further away to avoid a loss is good risk management.', correctAnswer: false, explanation: 'Widening a stop mid-trade is loss aversion in action — it turns a planned small loss into an unplanned big one.' }
      ],
      scenario: [
        {
          id: 'q8',
          scenario: 'You lost on three trades this morning. You feel angry and want to place a much bigger trade right now to get it back.',
          question: 'What is the disciplined move?',
          options: [
            'Stop trading for the day and review what went wrong',
            'Double your size on the next trade',
            'Switch to a different account',
            'Trade faster before you think about it'
          ],
          correctAnswer: 0,
          explanation: 'Anger + oversizing is the revenge-trading spiral. Professionals step away — the market will be there tomorrow.'
        },
        {
          id: 'q9',
          scenario: 'A stock you passed on has doubled in a week and social media is celebrating.',
          question: 'What does discipline look like here?',
          options: [
            'Stick to your plan — a runaway move is not your setup',
            'Market-buy immediately before it triples',
            'Short it out of spite',
            'Quit trading'
          ],
          correctAnswer: 0,
          explanation: 'Chasing a move you missed is FOMO. Your edge comes from your setups, not from every move in the market.'
        }
      ],
      wordBank: [
        {
          id: 'q10',
          instruction: 'Complete the sentence:',
          sentence: 'Plan the _____, then trade the plan',
          words: ['trade', 'news', 'chart', 'broker'],
          correctWords: ['trade'],
          explanation: 'The oldest rule in trading: decisions belong on paper before they belong in the market.'
        }
      ]
    }
  },
  {
    id: 'position-sizing-risk',
    title: 'Position Sizing & Risk',
    description: 'The 1-2% rule, R multiples, risk/reward, and surviving drawdowns',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Risk Management',
    xpReward: 70,
    premiumOnly: true,
    content: {
      explanation: 'Position sizing decides how much you can lose before analysis decides what to buy. The 1-2% rule risks at most 1-2% of your account on any single trade — so a string of losses cannot sink you. Your position size = (account × risk%) ÷ distance to stop-loss. R multiples measure every trade in units of initial risk: +2R means you made twice what you risked. Risk/reward of 1:3 means risking $100 to make $300 — at that ratio you can be wrong 60% of the time and still profit. Drawdowns compound: a 50% loss needs a 100% gain just to get back to even.',
      quiz: [
        {
          id: 'q1',
          question: 'With a $10,000 account and 1% risk, the most you should risk per trade is:',
          options: ['$100', '$1,000', '$500', '$10'],
          correctAnswer: 0,
          explanation: '1% of $10,000 = $100 maximum loss if your stop-loss gets hit — not $100 of stock, $100 of risk.'
        },
        {
          id: 'q2',
          question: 'Your account is $20,000, you risk 1% per trade ($200), and your stop is $5 below entry. How many shares?',
          options: ['40 shares', '200 shares', '5 shares', '1,000 shares'],
          correctAnswer: 0,
          explanation: 'Size = risk ÷ stop distance = $200 ÷ $5 = 40 shares. The stop distance, not the stock price, sets the size.'
        },
        {
          id: 'q3',
          question: 'What does a +3R trade mean?',
          options: [
            'You made 3 times your initial risk',
            'You traded 3 stocks',
            'You used 3x leverage',
            'You held for 3 days'
          ],
          correctAnswer: 0,
          explanation: 'R multiples normalize trades — if you risked $100 and made $300, that is +3R regardless of the stock.'
        },
        {
          id: 'q4',
          question: 'At a 1:3 risk/reward ratio, what win rate do you need to break even (ignoring fees)?',
          options: ['25%', '50%', '75%', '90%'],
          correctAnswer: 0,
          explanation: 'Risk $100 to make $300: one win (+$300) covers three losses (−$300) — so even 1 win in 4 breaks even.'
        },
        {
          id: 'q5',
          question: 'Your account drops 50%. What gain do you need to recover?',
          options: ['100%', '50%', '25%', '10%'],
          correctAnswer: 0,
          explanation: 'Drawdowns are asymmetric — $10k to $5k is −50%, but $5k back to $10k is +100%. This is why small losses matter.',
          chart: [100, 85, 70, 50, 65, 80, 100]
        },
        {
          id: 'q6',
          question: 'Why does position sizing come before stock selection?',
          options: [
            'Even great picks fail sometimes — sizing keeps any single loss survivable',
            'Bigger positions always earn more',
            'Brokers require it by law',
            'It predicts which stock will win'
          ],
          correctAnswer: 0,
          explanation: 'No one wins every trade. Sizing turns losing streaks from fatal to manageable — survival is the edge.'
        }
      ],
      trueFalse: [
        { id: 'q7', statement: 'Risking 10% per trade means five losses in a row cut your account nearly in half.', correctAnswer: true, explanation: '10% × 5 compounded leaves you at ~59% — and a −41% hole needs +70% to recover. Small risk survives variance.' },
        { id: 'q8', statement: 'A 1:5 risk/reward setup is always better than 1:2.', correctAnswer: false, explanation: 'Bigger reward ratios usually mean lower win rates — a 1:2 setup you win 50% of the time beats a 1:5 you win 10% of.' }
      ],
      ordering: [
        {
          id: 'q9',
          instruction: 'Order the position-sizing steps:',
          items: [
            'Decide your risk % of the account (e.g. 1%)',
            'Choose your entry and stop-loss distance',
            'Divide dollar risk by stop distance for share count',
            'Enter the trade with the stop in place'
          ],
          correctOrder: [0, 1, 2, 3],
          explanation: 'Risk first, stop second, size third, entry last — never size a trade before knowing where you are wrong.'
        }
      ],
      wordBank: [
        {
          id: 'q10',
          instruction: 'Complete the sentence:',
          sentence: 'A _____ drawdown needs a 100% gain to recover',
          words: ['50%', '10%', '5%', '90%'],
          correctWords: ['50%'],
          explanation: 'Halving your account means doubling to get back — the math of drawdowns punishes oversized losses.'
        }
      ]
    }
  },
  {
    id: 'options-greeks',
    title: 'The Option Greeks',
    description: 'Delta, theta, vega, and IV — how option prices actually move',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Options',
    xpReward: 75,
    premiumOnly: true,
    content: {
      explanation: 'Option prices are driven by five forces, measured by "the Greeks." Delta is sensitivity to the stock: a 0.50 delta call gains ~$0.50 when the stock rises $1, and doubles as a rough probability estimate of expiring in-the-money. Gamma is how fast delta changes — highest near the strike. Theta is time decay — options lose value every day, accelerating into expiration. Vega is sensitivity to implied volatility — rising IV inflates option prices even if the stock is flat. IV itself is the market\'s forecast of how big a move is expected. Buying options fights theta every day; selling options collects it.',
      quiz: [
        {
          id: 'q1',
          question: 'A call option has a delta of 0.40. If the stock rises $2, the option gains roughly…',
          options: ['$0.80 per share', '$2.00 per share', '$0.40 per share', '$4.00 per share'],
          correctAnswer: 0,
          explanation: 'Delta × stock move = option move: 0.40 × $2 = $0.80.'
        },
        {
          id: 'q2',
          question: 'Theta measures…',
          options: [
            'Time decay — value lost each day, accelerating near expiration',
            'Sensitivity to volatility',
            'Sensitivity to interest rates',
            'The option\'s leverage'
          ],
          correctAnswer: 0,
          explanation: 'Theta is the silent killer of long options — the decay speeds up as expiration approaches.'
        },
        {
          id: 'q3',
          question: 'Implied volatility (IV) represents…',
          options: [
            'The market\'s forecast of how big a move the stock will make',
            'How many options changed hands today',
            'The stock\'s historical beta',
            'The option\'s trading volume'
          ],
          correctAnswer: 0,
          explanation: 'IV is derived from option prices — high IV means big moves are expected (and options cost more).'
        },
        {
          id: 'q4',
          question: 'You bought calls the day before earnings. The stock rises slightly but IV collapses after the report. Your calls…',
          options: [
            'Can still lose money — the "vol crush" can outweigh a small favorable move',
            'Always profit since the stock rose',
            'Expire worthless immediately',
            'Convert to shares automatically'
          ],
          correctAnswer: 0,
          explanation: 'The classic earnings trap — delta gains get eaten by collapsing vega. This is why buying earnings options is dangerous.'
        }
      ],
      trueFalse: [
        { id: 'tf1', statement: 'A delta of 0.70 roughly implies a ~70% chance of finishing in-the-money.', correctAnswer: true, explanation: 'Delta doubles as a loose probability estimate — a handy intuition shortcut.' },
        { id: 'tf2', statement: 'Theta decay affects option sellers and buyers identically.', correctAnswer: false, explanation: 'Decay hurts buyers and helps sellers — theta is the seller\'s friend.' },
        { id: 'tf3', statement: 'Gamma risk is highest for options near the strike and close to expiration.', correctAnswer: true, explanation: 'ATM near-expiry options have the most explosive delta changes — where gamma squeezes live.' }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match each Greek to what it measures',
        pairs: [
          { left: 'Delta', right: 'Sensitivity to the stock price' },
          { left: 'Gamma', right: 'How fast delta itself changes' },
          { left: 'Theta', right: 'Time decay per day' },
          { left: 'Vega', right: 'Sensitivity to implied volatility' }
        ]
      },
      scenario: [
        {
          id: 's1',
          scenario: 'You hold a call with delta 0.30, theta -0.05, vega 0.12. The stock is flat for a week and IV drops from 60% to 40%.',
          question: 'What happens to your position?',
          options: [
            'It bleeds — theta eats ~$0.35/week and falling IV deflates the premium',
            'It gains — flat stocks always help calls',
            'Nothing — Greeks only matter at expiration',
            'Delta rises to compensate'
          ],
          correctAnswer: 0,
          explanation: 'Flat stock + dropping IV is the worst combo for a long option: decay and vol contraction hit simultaneously.'
        }
      ]
    }
  }
];
