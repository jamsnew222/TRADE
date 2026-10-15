import { Lesson } from '@/types';

/**
 * Day trading lessons — strategies, chart patterns, and candlesticks.
 * Quiz questions may carry a `chart` array: a stylized price path rendered
 * as a mini chart inside the question card.
 */
export const dayTradingLessons: Lesson[] = [
  {
    id: 'day-trading-basics',
    title: 'Day Trading Basics',
    description: 'What day trading is, when it happens, and the rules that govern it',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 50,
    content: {
      explanation: 'Day trading means buying and selling a stock within the same trading day — you never hold positions overnight. Day traders profit from small intraday price moves, so they need stocks with high liquidity and volatility. In the US, accounts under $25,000 that make 4+ day trades in 5 business days get flagged as "pattern day traders". The first hour after the open and the last hour before the close are usually the busiest and most volatile.',
      quiz: [
        {
          id: 'q1',
          question: 'What defines a day trade?',
          options: [
            'Buying and selling the same stock within one trading day',
            'Holding a stock for exactly 24 hours',
            'Trading any stock on a Monday',
            'Buying a stock at market open'
          ],
          correctAnswer: 0,
          explanation: 'A day trade opens and closes the same position within a single trading session — nothing is held overnight.'
        },
        {
          id: 'q2',
          question: 'Why do day traders prefer highly liquid stocks?',
          options: [
            'Liquid stocks can be bought and sold instantly at predictable prices',
            'Liquid stocks always go up',
            'Liquid stocks have no fees',
            'Liquid stocks are cheaper'
          ],
          correctAnswer: 0,
          explanation: 'Liquidity means tight spreads and instant fills — essential when you are trading small intraday moves.'
        },
        {
          id: 'q3',
          question: 'What is the Pattern Day Trader (PDT) rule?',
          options: [
            'US accounts under $25k making 4+ day trades in 5 days get restricted',
            'You must trade every day to keep your account',
            'You can only day trade stocks under $25',
            'Day traders must wait 25 days between trades'
          ],
          correctAnswer: 0,
          explanation: 'FINRA\'s PDT rule limits small accounts (under $25,000) to 3 day trades per 5 business days.'
        },
        {
          id: 'q4',
          question: 'When is intraday volatility usually highest?',
          options: [
            'The first hour after the open and last hour before the close',
            'Exactly at noon',
            'Overnight when markets are closed',
            'It is constant all day'
          ],
          correctAnswer: 0,
          explanation: 'The open and close concentrate volume — overnight news gets priced in at the open, and institutions rebalance near the close.'
        },
        {
          id: 'q5',
          question: 'Why do day traders avoid holding positions overnight?',
          options: [
            'Overnight gaps can blow past stop-losses and open far from your entry',
            'Brokers charge extra at night',
            'Overnight trades are illegal',
            'Stocks always fall overnight'
          ],
          correctAnswer: 0,
          explanation: 'News breaks overnight and markets can gap up or down at the open — your stop-loss cannot protect you from a gap.'
        }
      ],
      trueFalse: [
        { id: 'q6', statement: 'Day traders rely on volatility — a flat stock offers nothing to trade.', correctAnswer: true, explanation: 'Profit comes from intraday movement; a stock that does not move cannot pay a day trader.' },
        { id: 'q7', statement: 'Day trading is suitable for stocks with thin volume.', correctAnswer: false, explanation: 'Thin volume means wide spreads and slippage — small moves can cost more than they earn.' }
      ],
      ordering: [
        {
          id: 'q8',
          instruction: 'Order a disciplined day trader\'s routine:',
          items: [
            'Review watchlist and mark key levels before the open',
            'Wait for the setup to confirm after the open',
            'Enter the trade with a defined stop-loss',
            'Exit by the close — no overnight positions',
            'Journal the trades and review mistakes'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Preparation, confirmation, execution with risk control, flat by the close, then review — that loop is the discipline.'
        }
      ],
      multipleSelect: [
        {
          id: 'q9',
          question: 'Which characteristics make a stock good for day trading? (Select all that apply)',
          options: ['High trading volume', 'Strong intraday volatility', 'Narrow bid-ask spread', 'No news catalysts ever'],
          correctAnswers: [0, 1, 2],
          explanation: 'Volume, volatility, and tight spreads are the trifecta. News catalysts actually help — they drive movement.'
        }
      ],
      wordBank: [
        {
          id: 'q10',
          instruction: 'Complete the sentence:',
          sentence: 'Day traders profit from _____ intraday price moves',
          words: ['small', 'huge', 'guaranteed', 'overnight'],
          correctWords: ['small'],
          explanation: 'Day trading stacks many small intraday wins rather than chasing big overnight swings.'
        }
      ]
    }
  },
  {
    id: 'day-trading-strategies',
    title: 'Day Trading Strategies',
    description: 'Scalping, momentum, breakout, and pullback trading explained',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 60,
    content: {
      explanation: 'The core intraday playbooks: scalping takes tiny profits dozens of times a day; momentum trading rides stocks moving on news with heavy volume; breakout trading buys when price pushes through resistance; pullback trading enters during a brief dip inside an uptrend; VWAP strategies use the volume-weighted average price as an intraday fair-value line.',
      quiz: [
        {
          id: 'q1',
          question: 'What is scalping?',
          options: [
            'Taking very small profits many times per day',
            'Buying stocks at their all-time high',
            'Selling stocks you do not own',
            'Trading only once per week'
          ],
          correctAnswer: 0,
          explanation: 'Scalpers win tiny amounts repeatedly — seconds to minutes per trade — and need razor-thin spreads to make it work.'
        },
        {
          id: 'q2',
          question: 'A momentum trader buys when:',
          options: [
            'A stock is moving strongly on news with heavy volume',
            'A stock is flat and quiet',
            'A stock just hit a 52-week low',
            'The market is closed'
          ],
          correctAnswer: 0,
          explanation: 'Momentum = riding an existing strong move fueled by volume and news, then exiting before it fades.'
        },
        {
          id: 'q3',
          question: 'What does a breakout trader wait for?',
          options: [
            'Price pushing through a resistance level on volume',
            'Price sitting still at support',
            'A dividend announcement',
            'An earnings miss'
          ],
          correctAnswer: 0,
          explanation: 'A breakout is price clearing a level it previously could not — volume confirms it is real and not a fake-out.',
          chart: [100, 102, 101, 102, 101, 107, 109]
        },
        {
          id: 'q4',
          question: 'What is a pullback entry?',
          options: [
            'Buying a brief dip inside a larger uptrend',
            'Selling after a stock doubles',
            'Buying any stock that dropped today',
            'Closing all positions at noon'
          ],
          correctAnswer: 0,
          explanation: 'Trends move in waves — a pullback buys the dip within an uptrend instead of chasing the top.',
          chart: [100, 105, 107, 103, 104, 109, 112]
        }
      ],
      trueFalse: [
        { id: 'q5', statement: 'Scalping works best on stocks with wide bid-ask spreads.', correctAnswer: false, explanation: 'Wide spreads eat scalpers alive — you need tight spreads so tiny profits are not lost to the spread itself.' },
        { id: 'q6', statement: 'VWAP acts like an intraday fair-value line that institutions watch.', correctAnswer: true, explanation: 'Many algos and institutions benchmark fills against VWAP, so price often reacts around it.' }
      ],
      scenario: [
        {
          id: 'q7',
          scenario: 'A stock gaps up 8% on strong earnings news and volume is 10x normal in the first 30 minutes.',
          question: 'Which strategy best fits this situation?',
          options: ['Momentum trading', 'Range trading', 'Dollar-cost averaging', 'Buy and hold'],
          correctAnswer: 0,
          explanation: 'Gap + news + huge volume is the textbook momentum setup — the move has fuel.'
        },
        {
          id: 'q8',
          scenario: 'A stock has bounced between $50.00 and $50.50 six times today with no trend.',
          question: 'Which strategy fits this chart?',
          options: ['Range trading between support and resistance', 'Momentum trading', 'Scalping the open', 'Waiting for a breakout only'],
          correctAnswer: 0,
          explanation: 'Repeated bounces between two levels = a range. Range traders buy the bottom of the range and sell the top.',
          chart: [100, 103, 100.5, 103, 100, 103, 100.5]
        }
      ],
      ordering: [
        {
          id: 'q9',
          instruction: 'Order the steps of a breakout trade:',
          items: [
            'Identify the resistance level price keeps failing at',
            'Wait for a close above resistance on strong volume',
            'Enter with a stop below the breakout level',
            'Take profits as the move extends'
          ],
          correctOrder: [0, 1, 2, 3],
          explanation: 'Level first, confirmation second, entry with risk defined, then manage the exit.'
        }
      ],
      wordBank: [
        {
          id: 'q10',
          instruction: 'Complete the sentence:',
          sentence: 'A breakout trade enters when price pushes through _____',
          words: ['resistance', 'a dividend', 'the weekend', 'a broker'],
          correctWords: ['resistance'],
          explanation: 'Breakouts are defined by price clearing a resistance level that previously held.'
        }
      ]
    }
  },
  {
    id: 'chart-patterns',
    title: 'Chart Patterns',
    description: 'Head and shoulders, double tops, flags, triangles, and more — identify them on real chart shapes',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Technical Analysis',
    xpReward: 70,
    content: {
      explanation: 'Chart patterns are recurring price shapes that traders use to anticipate the next move. Reversal patterns (head and shoulders, double tops/bottoms) warn a trend is ending. Continuation patterns (flags, triangles) pause a trend before it resumes. No pattern is guaranteed — they shift probabilities, not certainties, and volume usually confirms the move.',
      quiz: [
        {
          id: 'q1',
          question: 'Identify this pattern:',
          options: ['Head and shoulders', 'Bull flag', 'Cup and handle', 'Ascending triangle'],
          correctAnswer: 0,
          explanation: 'Three peaks with the middle peak highest — the classic head-and-shoulders reversal, warning an uptrend may be ending.',
          chart: [100, 105, 101, 110, 101, 105, 99]
        },
        {
          id: 'q2',
          question: 'Identify this pattern:',
          options: ['Double top', 'Double bottom', 'Breakout', 'Momentum surge'],
          correctAnswer: 0,
          explanation: 'Two failed attempts at the same high — a double top means buyers could not push through resistance twice.',
          chart: [100, 107, 102, 107, 99]
        },
        {
          id: 'q3',
          question: 'Identify this pattern:',
          options: ['Bull flag', 'Head and shoulders', 'Double top', 'Death spiral'],
          correctAnswer: 0,
          explanation: 'A sharp rally (the flagpole) followed by a small tight pullback (the flag) — a continuation pattern in an uptrend.',
          chart: [100, 106, 108, 105, 106, 105.5, 110]
        },
        {
          id: 'q4',
          question: 'Identify this pattern:',
          options: ['Cup and handle', 'Double bottom', 'Ascending triangle', 'Head and shoulders'],
          correctAnswer: 0,
          explanation: 'A rounded U-shaped recovery (the cup) followed by a small drift down (the handle) — a bullish continuation pattern.',
          chart: [106, 101, 98, 100, 105, 103, 107]
        },
        {
          id: 'q5',
          question: 'An ascending triangle shows:',
          options: [
            'Flat resistance with rising support — buyers gaining strength',
            'Flat support with falling resistance',
            'Random noise with no structure',
            'Two equal peaks'
          ],
          correctAnswer: 0,
          explanation: 'Price keeps hitting the same ceiling while making higher lows — pressure builds until it usually breaks upward.',
          chart: [100, 106, 102, 106, 104, 106, 108]
        },
        {
          id: 'q6',
          question: 'What typically confirms a chart pattern breakout?',
          options: [
            'Rising volume as price clears the level',
            'Low volume',
            'A holiday',
            'A stock split'
          ],
          correctAnswer: 0,
          explanation: 'Breakouts on heavy volume carry conviction; a breakout on thin volume is often a fake-out.'
        }
      ],
      trueFalse: [
        { id: 'q7', statement: 'A double bottom often signals a downtrend may reverse upward.', correctAnswer: true, explanation: 'Two bounces off the same low mean sellers failed twice — buyers may take control.' },
        { id: 'q8', statement: 'Chart patterns guarantee the future direction of a stock.', correctAnswer: false, explanation: 'Patterns shift probabilities — many fail. That is why stops and volume confirmation matter.' }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match each pattern to its meaning:',
        pairs: [
          { left: 'Head and shoulders', right: 'Reversal — uptrend losing steam' },
          { left: 'Bull flag', right: 'Continuation — pause inside a rally' },
          { left: 'Double bottom', right: 'Reversal — sellers failed twice' },
          { left: 'Ascending triangle', right: 'Pressure building against resistance' }
        ]
      }
    }
  },
  {
    id: 'candlestick-patterns',
    title: 'Candlestick Patterns',
    description: 'Doji, hammer, engulfing, and star patterns — read single-candle psychology',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Technical Analysis',
    xpReward: 60,
    content: {
      explanation: 'Each candlestick shows the open, high, low, and close of one period — the body is the open-to-close range, and the wicks show the extremes. A doji (tiny body) means indecision. A hammer (long lower wick after a drop) means buyers rejected lower prices. An engulfing pattern is a big candle that swallows the previous one — a strong reversal signal. A shooting star (long upper wick after a rally) warns buyers are exhausted.',
      quiz: [
        {
          id: 'q1',
          question: 'What does a doji candle signal?',
          options: [
            'Indecision — open and close were nearly equal',
            'Guaranteed rally',
            'A market halt',
            'Extreme selling pressure'
          ],
          correctAnswer: 0,
          explanation: 'A doji\'s tiny body means price explored both directions and landed back at the open — neither side won.',
          chart: [100, 102, 99, 101.5, 100]
        },
        {
          id: 'q2',
          question: 'A hammer after a downtrend suggests:',
          options: [
            'Buyers rejected lower prices — possible reversal up',
            'Sellers are fully in control',
            'The stock will definitely crash',
            'Nothing — candles are meaningless'
          ],
          correctAnswer: 0,
          explanation: 'Price got pushed down hard but recovered to close near the open — the long lower wick shows demand stepped in.',
          chart: [104, 100, 96, 98, 102]
        },
        {
          id: 'q3',
          question: 'A bullish engulfing pattern is when:',
          options: [
            'A big green candle completely covers the previous red candle',
            'Two candles have the same open',
            'A candle has no wicks',
            'Price gaps overnight'
          ],
          correctAnswer: 0,
          explanation: 'The big green body engulfing the prior red body shows buyers overwhelmed yesterday\'s sellers in one move.',
          chart: [103, 100, 97, 101, 105]
        },
        {
          id: 'q4',
          question: 'A shooting star at the top of a rally warns that:',
          options: [
            'Buyers pushed price up but sellers slammed it back — exhaustion',
            'The trend is accelerating upward',
            'Volume is guaranteed to rise',
            'The market is closed'
          ],
          correctAnswer: 0,
          explanation: 'The long upper wick is a failed rally within the candle — rejection of higher prices after a run-up.',
          chart: [100, 105, 109, 103, 100]
        },
        {
          id: 'q5',
          question: 'What does a candlestick\'s "wick" represent?',
          options: [
            'The highest and lowest prices reached during the period',
            'The trading volume',
            'The bid-ask spread',
            'The dividend yield'
          ],
          correctAnswer: 0,
          explanation: 'Wicks show the extremes price visited; the body shows where it opened and closed.'
        }
      ],
      trueFalse: [
        { id: 'q6', statement: 'A long lower wick means sellers controlled the entire candle.', correctAnswer: false, explanation: 'A long lower wick means sellers pushed down but buyers fought back and recovered — it is usually bullish.' },
        { id: 'q7', statement: 'Candlestick patterns are most reliable right after a strong trend.', correctAnswer: true, explanation: 'Reversal candles matter most at trend extremes — a hammer after a long drop means more than one mid-range.' }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match each candlestick to its signal:',
        pairs: [
          { left: 'Doji', right: 'Indecision between buyers and sellers' },
          { left: 'Hammer', right: 'Bullish reversal after a decline' },
          { left: 'Engulfing', right: 'One side overwhelmed the other' },
          { left: 'Shooting star', right: 'Bearish rejection after a rally' }
        ]
      },
      wordBank: [
        {
          id: 'q8',
          instruction: 'Complete the sentence:',
          sentence: 'A doji shows _____ between buyers and sellers',
          words: ['indecision', 'dominance', 'panic', 'agreement on direction'],
          correctWords: ['indecision'],
          explanation: 'Open ≈ close means neither side made progress — pure indecision.'
        }
      ]
    }
  }
];
