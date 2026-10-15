import { Lesson } from '@/types';

// Unit 8: long-term investing essentials — ETFs, dividends, macro, earnings.
// Complements the trading-focused units with the buy-and-hold toolkit.
export const investingLessons: Lesson[] = [
  {
    id: 'etf-index-funds',
    title: 'ETFs & Index Funds',
    description: 'Why most investors are better off buying the whole market',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 60,
    content: {
      explanation: 'An ETF (exchange-traded fund) is a basket of stocks you buy in one trade — like buying a slice of the whole market. An index fund does the same thing but tracks a benchmark like the S&P 500. Both give instant diversification at very low cost. The expense ratio is the annual fee — 0.03% vs 1% sounds small but compounds to tens of thousands of dollars over decades. Most professional stock-pickers underperform the index after fees, which is why index investing is the default recommendation for long-term wealth building.',
      quiz: [
        {
          id: 'q1',
          question: 'What does an ETF let you do?',
          options: [
            'Buy a basket of many stocks in a single trade',
            'Trade options without a broker',
            'Avoid all market risk',
            'Get guaranteed returns above the market'
          ],
          correctAnswer: 0,
          explanation: 'One ETF share holds a slice of every company in the fund — instant diversification.'
        },
        {
          id: 'q2',
          question: 'An expense ratio of 0.03% vs 1% matters because…',
          options: [
            'Fees compound and quietly eat a large share of long-term returns',
            'Higher fees mean better managers',
            'It determines whether the ETF trades intraday',
            'The difference is too small to notice'
          ],
          correctAnswer: 0,
          explanation: '1% per year compounds — over 30 years it can consume roughly a quarter of your ending wealth.'
        },
        {
          id: 'q3',
          question: 'What does the S&P 500 index track?',
          options: [
            'About 500 of the largest US companies',
            'The 500 best-performing stocks each year',
            'All US stocks equally',
            'Only technology stocks'
          ],
          correctAnswer: 0,
          explanation: 'The S&P 500 is a market-cap weighted basket of ~500 large US companies — a proxy for the US market.'
        },
        {
          id: 'q4',
          question: 'Why do most active fund managers underperform the index over long periods?',
          options: [
            'Fees plus the difficulty of consistently out-picking the market',
            'They are not allowed to buy the best stocks',
            'Index funds get inside information',
            'The index is manipulated'
          ],
          correctAnswer: 0,
          explanation: 'After fees and trading costs, beating the market consistently is statistically rare.'
        }
      ],
      trueFalse: [
        { id: 'tf1', statement: 'ETFs trade throughout the day like stocks; traditional mutual funds price once at close.', correctAnswer: true, explanation: 'ETFs have intraday liquidity; mutual funds settle at end-of-day NAV.' },
        { id: 'tf2', statement: 'Buying an S&P 500 index fund is making a bet on one company.', correctAnswer: false, explanation: 'It is a bet on ~500 companies — the broad market itself.' },
        { id: 'tf3', statement: 'Higher-fee funds reliably earn better returns.', correctAnswer: false, explanation: 'Fee level is one of the strongest negative predictors of net returns.' }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match the term to its meaning',
        pairs: [
          { left: 'ETF', right: 'A fund that trades intraday like a stock' },
          { left: 'Index fund', right: 'A fund that mirrors a benchmark' },
          { left: 'Expense ratio', right: 'Annual fee as a percent of assets' },
          { left: 'Diversification', right: 'Spreading risk across many holdings' }
        ]
      },
      wordBank: [
        {
          id: 'wb1',
          instruction: 'Complete the sentence',
          sentence: 'Most investors are better off simply buying a low-cost ______ fund and holding it.',
          words: ['index', 'penny-stock', 'options', 'margin'],
          correctWords: ['index'],
          explanation: 'Index funds track the whole market at minimal cost — the evidence-backed default for most savers.'
        }
      ]
    }
  },
  {
    id: 'financial-statements',
    title: 'Reading Financial Statements',
    description: 'Balance sheet, income statement, and cash flow — the three documents that matter',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Fundamental Analysis',
    xpReward: 60,
    content: {
      explanation: 'Every public company publishes three financial statements. The income statement shows revenue minus costs = profit over a period. The balance sheet is a snapshot: what the company owns (assets) versus what it owes (liabilities) — the difference is shareholder equity. The cash flow statement tracks actual cash moving in and out — the hardest one to fake. Together they answer the questions every investor asks: Is it profitable? Can it pay its debts? Is the profit real cash or accounting fiction?',
      quiz: [
        {
          id: 'q1',
          question: 'The income statement tells you…',
          options: [
            'Revenue, expenses, and profit over a period',
            'What the company owns today',
            'How much cash is in the bank',
            'The CEO\'s salary'
          ],
          correctAnswer: 0,
          explanation: 'It runs from revenue down through costs to the bottom line — net income.'
        },
        {
          id: 'q2',
          question: 'On the balance sheet, shareholder equity equals…',
          options: [
            'Assets minus liabilities',
            'Revenue minus expenses',
            'Cash plus inventory',
            'Share price times shares'
          ],
          correctAnswer: 0,
          explanation: 'What\'s left for owners after all debts — the accounting value of the business.'
        },
        {
          id: 'q3',
          question: 'Why do investors scrutinize the cash flow statement most?',
          options: [
            'Cash is the hardest number to manipulate with accounting tricks',
            'It lists upcoming dividends',
            'It predicts the stock price',
            'It is the only audited statement'
          ],
          correctAnswer: 0,
          explanation: 'Earnings can be dressed up with accruals — operating cash flow shows whether real money is coming in.'
        },
        {
          id: 'q4',
          question: 'A company reports rising profit but shrinking operating cash flow. This is…',
          options: [
            'A red flag — profit without cash may be accounting fiction',
            'Impossible',
            'Always a sign of strength',
            'Normal for every company'
          ],
          correctAnswer: 0,
          explanation: 'The classic warning pattern — profit booked on paper that never arrives as cash (think Enron).'
        }
      ],
      trueFalse: [
        { id: 'tf1', statement: 'The balance sheet is a snapshot at a single point in time, not a period.', correctAnswer: true, explanation: 'Unlike the income statement (a quarter/year of activity), the balance sheet freezes one date.' },
        { id: 'tf2', statement: 'High revenue always means high profit.', correctAnswer: false, explanation: 'Costs can exceed revenue — many growing companies run losses for years.' },
        { id: 'tf3', statement: 'US public companies file these statements quarterly (10-Q) and annually (10-K).', correctAnswer: true, explanation: 'SEC filings are public — the same documents professionals read.' }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match the statement to what it answers',
        pairs: [
          { left: 'Income statement', right: 'Is the company profitable?' },
          { left: 'Balance sheet', right: 'Can it pay its debts?' },
          { left: 'Cash flow statement', right: 'Is the profit real cash?' },
          { left: 'Shareholder equity', right: 'Assets minus liabilities' }
        ]
      },
      scenario: [
        {
          id: 's1',
          scenario: 'TechCo reports record net income of $500M — but operating cash flow is negative $200M and receivables doubled.',
          question: 'What is the most reasonable interpretation?',
          options: [
            'Caution — profits may be booked as IOUs rather than collected cash',
            'Buy immediately — earnings beat everything',
            'Sell all stocks — the market is rigged',
            'Ignore it — cash flow never matters'
          ],
          correctAnswer: 0,
          explanation: 'Ballooning receivables + negative operating cash = customers haven\'t actually paid. It can signal aggressive revenue recognition.'
        }
      ]
    }
  },
  {
    id: 'macro-economics',
    title: 'Macro & the Fed',
    description: 'Interest rates, inflation, and why the Fed moves every market',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Fundamental Analysis',
    xpReward: 65,
    content: {
      explanation: 'Macroeconomics is the weather system all assets float in. The Federal Reserve sets the federal funds rate — the base cost of money. Rate hikes make borrowing expensive, cool inflation, and usually pressure stock valuations (future profits are worth less when safe bonds pay more). Rate cuts do the opposite. Inflation erodes purchasing power and forces the Fed to hike; deflation is worse — it freezes spending. Bond yields and stocks compete for the same dollars: when 10-year Treasuries pay 5%, stocks need a strong reason to attract buyers.',
      quiz: [
        {
          id: 'q1',
          question: 'When the Fed raises interest rates, stocks generally…',
          options: [
            'Face headwinds — money costs more and safe bonds get more attractive',
            'Always rally',
            'Are unaffected',
            'Halt trading'
          ],
          correctAnswer: 0,
          explanation: 'Higher rates raise companies\' borrowing costs and give investors a safer alternative — both pressure valuations.'
        },
        {
          id: 'q2',
          question: 'Why does high inflation hurt the stock market?',
          options: [
            'It forces the Fed toward rate hikes and squeezes company margins',
            'It makes share prices look bigger',
            'Companies sell more products',
            'It only affects crypto'
          ],
          correctAnswer: 0,
          explanation: 'Inflation → Fed hikes → higher discount rates + cost pressure on earnings.'
        },
        {
          id: 'q3',
          question: 'The federal funds rate is…',
          options: [
            'The base interest rate the Fed controls, influencing all borrowing costs',
            'The rate citizens pay on taxes',
            'The stock market\'s daily change',
            'The bank deposit rate'
          ],
          correctAnswer: 0,
          explanation: 'It is the rate banks charge each other overnight — the anchor for mortgages, credit cards, and discount rates.'
        },
        {
          id: 'q4',
          question: 'Rising bond yields tend to…',
          options: [
            'Pull money out of stocks — why take equity risk for a smaller return?',
            'Have no market impact',
            'Only affect bond traders',
            'Guarantee a stock rally'
          ],
          correctAnswer: 0,
          explanation: 'Stocks and bonds compete for capital — safer yields rising makes equity risk less compelling.'
        }
      ],
      trueFalse: [
        { id: 'tf1', statement: 'Rate cuts are intended to stimulate borrowing and economic activity.', correctAnswer: true, explanation: 'Cheaper money encourages spending, hiring, and investment.' },
        { id: 'tf2', statement: 'The stock market reacts mainly to what the Fed did, not what it signaled.', correctAnswer: false, explanation: 'Markets price in expectations — the guidance often moves prices more than the decision itself.' },
        { id: 'tf3', statement: 'Growth stocks are especially sensitive to interest rate changes.', correctAnswer: true, explanation: 'Their value sits in distant future earnings — discounted harder when rates rise.' }
      ],
      matching: {
        id: 'm1',
        instruction: 'Match the macro term to its effect',
        pairs: [
          { left: 'Rate hike', right: 'Cools inflation; pressures stock valuations' },
          { left: 'Inflation', right: 'Rising prices eroding purchasing power' },
          { left: 'Quantitative easing', right: 'Fed buying bonds to inject liquidity' },
          { left: 'Recession', right: 'Two quarters of shrinking GDP (roughly)' }
        ]
      },
      scenario: [
        {
          id: 's1',
          scenario: 'Inflation prints at 6% — triple the Fed\'s 2% target. A Fed meeting is next week.',
          question: 'What is the most likely Fed response and market reaction?',
          options: [
            'A rate hike, pressuring growth stocks and lifting bond yields',
            'An emergency cut to zero',
            'No action — the Fed ignores inflation',
            'The Fed buys stocks directly'
          ],
          correctAnswer: 0,
          explanation: 'High inflation forces tightening. Markets often fall in anticipation — then rally if the hike is smaller than feared.'
        }
      ]
    }
  },
  {
    id: 'earnings-season',
    title: 'Earnings Season',
    description: 'EPS, guidance, beats and misses — why stocks move on results',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Fundamental Analysis',
    xpReward: 60,
    content: {
      explanation: 'Four times a year, public companies report earnings — revenue, profit, and guidance for what\'s next. EPS (earnings per share) is profit divided by share count. The market prices in expectations BEFORE the report, so a "beat" (results above analyst estimates) usually lifts the stock while a "miss" drops it. Guidance — management\'s own forecast — often matters more than the quarter itself: great results with weak guidance can tank a stock. Volatility spikes around earnings, which is why options get expensive right before the report.',
      quiz: [
        {
          id: 'q1',
          question: 'EPS stands for…',
          options: [
            'Earnings per share — company profit divided by shares outstanding',
            'Estimated price surges',
            'Equity performance score',
            'Exchange price spread'
          ],
          correctAnswer: 0,
          explanation: 'EPS converts total profit into a per-share number you can compare across companies.'
        },
        {
          id: 'q2',
          question: 'A company beats earnings estimates but cuts next-quarter guidance. The stock most likely…',
          options: [
            'Falls — forward expectations matter more than the past quarter',
            'Rallies hard',
            'Is unaffected',
            'Gets delisted'
          ],
          correctAnswer: 0,
          explanation: 'Markets are forward-looking. Strong past results plus weak guidance = selling the news.'
        },
        {
          id: 'q3',
          question: 'Why do options get more expensive right before earnings?',
          options: [
            'Expected volatility spikes — the report can move the stock violently',
            'Brokers raise fees on earnings weeks',
            'Option supply shrinks',
            'The Fed requires it'
          ],
          correctAnswer: 0,
          explanation: 'Implied volatility inflates when a known catalyst looms — then collapses after (the "vol crush").'
        },
        {
          id: 'q4',
          question: 'A "whisper number" is…',
          options: [
            'The unofficial result traders actually expect — often different from analyst consensus',
            'A secret Fed report',
            'The dividend forecast',
            'Insider trading data'
          ],
          correctAnswer: 0,
          explanation: 'Stocks can "beat" consensus but miss the whisper number and still fall.'
        }
      ],
      trueFalse: [
        { id: 'tf1', statement: 'Beating analyst estimates guarantees a stock rises.', correctAnswer: false, explanation: 'If the beat was already priced in or guidance disappoints, the stock falls anyway — "buy the rumor, sell the news."' },
        { id: 'tf2', statement: 'US companies report earnings roughly every quarter.', correctAnswer: true, explanation: 'Four earnings seasons a year, clustered a few weeks after each quarter ends.' },
        { id: 'tf3', statement: 'Earnings reports include revenue, profit, and usually forward guidance.', correctAnswer: true, explanation: 'Those three together are what analysts model — and what the market prices.' }
      ],
      ordering: [
        {
          id: 'o1',
          instruction: 'Order a typical earnings cycle:',
          items: ['Analysts publish estimates', 'Company reports results', 'Market compares to expectations', 'Stock reprices on guidance'],
          correctOrder: [0, 1, 2, 3],
          explanation: 'Expectations are set first, results are compared to them, and forward guidance drives the final repricing.'
        }
      ],
      wordBank: [
        {
          id: 'wb1',
          instruction: 'Complete the sentence',
          sentence: 'Options traders watch for the post-earnings "______ crush" as implied volatility collapses.',
          words: ['vol', 'price', 'share', 'market'],
          correctWords: ['vol'],
          explanation: 'Once the report lands, uncertainty disappears — options premiums collapse even if the stock barely moves.'
        }
      ]
    }
  }
];
