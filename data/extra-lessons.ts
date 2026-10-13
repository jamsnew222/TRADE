import { Lesson } from '@/types';

export const extraLessons: Lesson[] = [
  {
    id: 'brokerage-accounts',
    title: 'Brokerage Accounts',
    description: 'Learn how brokerage accounts work and which type fits your goals',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 30,
    content: {
      explanation: 'A brokerage account is an account that lets you buy and sell investments like stocks, ETFs, and mutual funds. The type of account you choose affects taxes, fees, and your available investing strategies.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the main purpose of a brokerage account?',
          options: ['To hold your cash only', 'To buy and sell investments', 'To pay taxes', 'To borrow money'],
          correctAnswer: 1,
          explanation: 'A brokerage account lets investors buy and sell securities such as stocks, ETFs, and mutual funds.'
        },
        {
          id: 'q2',
          question: 'Which account type usually offers tax advantages for long-term investing?',
          options: ['Standard brokerage account', 'Retirement account', 'Checking account', 'Savings account'],
          correctAnswer: 1,
          explanation: 'Retirement accounts, such as IRAs or pensions in some countries, often offer tax advantages.'
        },
        {
          id: 'q3',
          question: 'True or False: Brokerage accounts are required to place stock trades.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. You need a brokerage account to place buy and sell orders in most markets.'
        },
        {
          id: 'q4',
          question: 'Which factor should you compare before choosing a broker?',
          options: ['Fees', 'Customer support', 'Platform usability', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Good broker selection depends on fees, features, platform tools, and support quality.'
        },
        {
          id: 'q5',
          question: 'Which are common brokerage account features? (Select all that apply)',
          options: ['Market access', 'Trade execution', 'Cash management', 'Guaranteed profit'],
          correctAnswer: 0,
          explanation: 'Brokerage accounts provide market access and trade execution, while cash management is sometimes included but profits are never guaranteed.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'supply-and-demand',
    title: 'Supply and Demand',
    description: 'Understand how prices move when buyers and sellers disagree',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Basics',
    xpReward: 35,
    content: {
      explanation: 'Supply and demand is the basic economic force behind price movement. If demand rises faster than supply, prices tend to rise. If supply outpaces demand, prices usually fall.',
      quiz: [
        {
          id: 'q1',
          question: 'What happens when demand rises while supply remains the same?',
          options: ['Price usually falls', 'Price usually rises', 'Price stays fixed', 'Demand disappears'],
          correctAnswer: 1,
          explanation: 'More buyers competing for the same supply typically pushes prices higher.'
        },
        {
          id: 'q2',
          question: 'What typically happens when supply grows faster than demand?',
          options: ['Prices rise', 'Prices fall', 'Market closes', 'Volume disappears'],
          correctAnswer: 1,
          explanation: 'Oversupply creates downward pressure as sellers compete to offload inventory.'
        },
        {
          id: 'q3',
          question: 'True or False: Supply and demand can work together to create trend reversals.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Changes in supply and demand often trigger trend shifts as market sentiment changes.'
        },
        {
          id: 'q4',
          question: 'What is a common sign of strong demand?',
          options: ['Falling volume', 'High momentum with increasing price', 'Stable price in a quiet market', 'Lower dividends'],
          correctAnswer: 1,
          explanation: 'Strong buying pressure often shows up as rising price with healthy participation.'
        },
        {
          id: 'q5',
          question: 'Which conditions often support higher prices? (Select all that apply)',
          options: ['Strong demand', 'Limited supply', 'High investor optimism', 'Weak fundamentals'],
          correctAnswer: 0,
          explanation: 'Strong demand, limited supply, and optimistic sentiment can all support higher prices; weak fundamentals generally do not.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'market-participants',
    title: 'Market Participants',
    description: 'Learn who influences stock prices and market activity',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 25,
    content: {
      explanation: 'Markets are driven by many participants, including retail investors, institutions, hedge funds, market makers, and companies themselves. Each group has different objectives and trading behavior.',
      quiz: [
        {
          id: 'q1',
          question: 'Who are retail investors?',
          options: ['Large institutions', 'Individual investors', 'Market makers', 'Government regulators'],
          correctAnswer: 1,
          explanation: 'Retail investors are individual traders and investors buying securities for personal accounts.'
        },
        {
          id: 'q2',
          question: 'What role do market makers play?',
          options: ['They create liquidity by quoting bids and offers', 'They guarantee returns', 'They replace company earnings', 'They set regulations'],
          correctAnswer: 0,
          explanation: 'Market makers provide liquidity and help maintain orderly price discovery.'
        },
        {
          id: 'q3',
          question: 'True or False: Institutional investors usually trade in larger volumes than retail investors.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Institutional investors often trade much larger positions and can strongly influence markets.'
        },
        {
          id: 'q4',
          question: 'Which participant is most likely to affect short-term price swings?',
          options: ['A passive long-term investor', 'A hedge fund using fast trading strategies', 'A company employee with no investments', 'A tax office'],
          correctAnswer: 1,
          explanation: 'High-frequency and hedge-fund strategies can create sharp short-term price moves.'
        },
        {
          id: 'q5',
          question: 'Which groups commonly participate in markets? (Select all that apply)',
          options: ['Retail traders', 'Institutions', 'Market makers', 'Central banks'],
          correctAnswer: 0,
          explanation: 'All of these can influence market activity, though their impact varies by time horizon and strategy.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2, 3]
        }
      ]
    }
  },
  {
    id: 'market-index',
    title: 'Market Indexes',
    description: 'Learn how indexes help track the market and sectors',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 25,
    content: {
      explanation: 'A market index is a statistical measure that tracks a basket of stocks, allowing investors to monitor broad market trends. Examples include the S&P 500, NASDAQ-100, and Dow Jones Industrial Average.',
      quiz: [
        {
          id: 'q1',
          question: 'What does a stock market index do?',
          options: ['Tracks a group of stocks', 'Predicts interest rates', 'Sets company dividends', 'Creates buy orders'],
          correctAnswer: 0,
          explanation: 'Indexes summarize the performance of a selected group of stocks or securities.'
        },
        {
          id: 'q2',
          question: 'Which index is commonly used to represent large US companies?',
          options: ['S&P 500', 'NASDAQ-100', 'Dow Jones', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Several well-known indexes track US market performance, each with a slightly different composition.'
        },
        {
          id: 'q3',
          question: 'True or False: An index is the same as an individual stock.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. An index tracks a collection of stocks rather than a single company.'
        },
        {
          id: 'q4',
          question: 'Why do investors watch indexes?',
          options: ['To gauge broad market sentiment', 'To replace all company research', 'To avoid using stop-losses', 'To set tax rates'],
          correctAnswer: 0,
          explanation: 'Indexes offer a snapshot of market sentiment and overall performance across many stocks.'
        },
        {
          id: 'q5',
          question: 'Which are common index functions? (Select all that apply)',
          options: ['Benchmarks', 'Market sentiment indicators', 'Dividend guarantees', 'Sector tracking'],
          correctAnswer: 0,
          explanation: 'Indexes help benchmark portfolios and indicate broad market conditions; they do not guarantee dividends or returns.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 3]
        }
      ]
    }
  },
  {
    id: 'market-cap-importance',
    title: 'Why Market Cap Matters',
    description: 'Understand how company size influences risk and investment style',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Fundamental Analysis',
    xpReward: 30,
    content: {
      explanation: 'Market cap measures the total market value of a company by multiplying its share price by the number of outstanding shares. It helps categorize businesses by size and often correlates with stability, liquidity, and risk.',
      quiz: [
        {
          id: 'q1',
          question: 'How is market cap calculated?',
          options: ['Stock price × shares outstanding', 'Revenue ÷ expenses', 'Earnings × price', 'Dividend ÷ growth'],
          correctAnswer: 0,
          explanation: 'Market cap is the total value of a company based on its stock price and share count.'
        },
        {
          id: 'q2',
          question: 'Which companies are generally considered large-cap?',
          options: ['Companies with $10B+ market cap', 'Very new startups', 'Crypto-only firms', 'Private companies'],
          correctAnswer: 0,
          explanation: 'Large-cap firms are usually established, financially mature, and widely held.'
        },
        {
          id: 'q3',
          question: 'True or False: Large-cap companies are always safer than small-cap companies.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Large caps tend to be more stable, but all companies carry risk and can still fall sharply.'
        },
        {
          id: 'q4',
          question: 'Which type of company often has more growth potential but higher volatility?',
          options: ['Large-cap', 'Mid-cap', 'Small-cap', 'All are the same'],
          correctAnswer: 2,
          explanation: 'Smaller companies can have stronger growth potential but come with higher volatility and risk.'
        },
        {
          id: 'q5',
          question: 'Which are common market-cap buckets? (Select all that apply)',
          options: ['Large-cap', 'Small-cap', 'Micro-cap', 'Mega-cap'],
          correctAnswer: 0,
          explanation: 'Large-cap, small-cap, and micro-cap are common categories; mega-cap is also used informally, but not always as a formal classification.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'volatility-basics',
    title: 'Volatility Basics',
    description: 'Understand how price swings affect risk and trading strategy',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Technical Analysis',
    xpReward: 30,
    content: {
      explanation: 'Volatility measures how much price changes over time. High volatility means quick, wider price swings; low volatility means steadier movement. It affects risk, position sizing, and strategy choice.',
      quiz: [
        {
          id: 'q1',
          question: 'What does volatility measure?',
          options: ['The speed of earnings releases', 'How much price moves over time', 'The amount of company debt', 'The number of shares outstanding'],
          correctAnswer: 1,
          explanation: 'Volatility describes how much an asset’s price fluctuates.'
        },
        {
          id: 'q2',
          question: 'Which market is usually more volatile?',
          options: ['A stable dividend stock', 'A biotech stock with news-driven moves', 'A government bond', 'A savings account'],
          correctAnswer: 1,
          explanation: 'News-driven or speculative stocks often have higher volatility.'
        },
        {
          id: 'q3',
          question: 'True or False: High volatility always means a bad investment.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. High volatility can create opportunity but also increases risk.'
        },
        {
          id: 'q4',
          question: 'Why do traders care about volatility?',
          options: ['It affects risk and strategy selection', 'It guarantees profits', 'It sets stock price', 'It replaces earnings analysis'],
          correctAnswer: 0,
          explanation: 'Volatility strongly influences risk, stop placement, and trade sizing.'
        },
        {
          id: 'q5',
          question: 'Which factors often increase volatility? (Select all that apply)',
          options: ['Company news', 'Earnings reports', 'Market stress', 'High cash balances'],
          correctAnswer: 0,
          explanation: 'News, earnings events, and stress conditions can all raise volatility.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'liquidity-basics',
    title: 'Liquidity Basics',
    description: 'Learn how easily assets can be bought and sold',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 25,
    content: {
      explanation: 'Liquidity refers to how easily an asset can be bought or sold without moving its price too much. Highly liquid markets are easier to trade and typically have tighter spreads.',
      quiz: [
        {
          id: 'q1',
          question: 'What does liquidity measure?',
          options: ['How easy it is to trade without large price impact', 'How much debt a company has', 'Dividend stability', 'The number of analysts covering a stock'],
          correctAnswer: 0,
          explanation: 'Liquidity refers to the ease of entering and exiting a position.'
        },
        {
          id: 'q2',
          question: 'Which market is usually more liquid?',
          options: ['A large-cap stock with heavy trading volume', 'A speculative microcap with low volume', 'A private company', 'A non-traded asset'],
          correctAnswer: 0,
          explanation: 'Higher volume usually means better liquidity and lower trading friction.'
        },
        {
          id: 'q3',
          question: 'True or False: High liquidity usually means tighter bid-ask spreads.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. More active markets often offer narrower spreads.'
        },
        {
          id: 'q4',
          question: 'Why is liquidity important for traders?',
          options: ['It affects execution quality and price impact', 'It guarantees gains', 'It removes risk', 'It increases dividends'],
          correctAnswer: 0,
          explanation: 'Liquidity affects how easily you can execute and how much cost you may pay in slippage.'
        },
        {
          id: 'q5',
          question: 'Which conditions typically improve liquidity? (Select all that apply)',
          options: ['Higher trading volume', 'More market participants', 'Lower price volatility', 'Reduced market hours'],
          correctAnswer: 0,
          explanation: 'Higher volume and more participants usually improve liquidity, while reduced hours can do the opposite.',
          type: 'multiple-select',
          correctAnswers: [0, 1]
        }
      ]
    }
  },
  {
    id: 'stop-limit-order',
    title: 'Stop-Limit Orders',
    description: 'Understand execution rules that combine stops and limits',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Orders',
    xpReward: 40,
    content: {
      explanation: 'A stop-limit order triggers a limit order once a security reaches a specified stop price. This gives traders more control than a regular stop order, but it may not trigger if the market moves too fast.',
      quiz: [
        {
          id: 'q1',
          question: 'What happens when a stop-limit order reaches its stop price?',
          options: ['It becomes a limit order', 'It instantly closes the trade at any price', 'It cancels the trade', 'It becomes a market order'],
          correctAnswer: 0,
          explanation: 'A stop-limit order turns into a limit order at the trigger price or better.'
        },
        {
          id: 'q2',
          question: 'Why might a stop-limit order fail to execute?',
          options: ['Because the market moves away from the limit price', 'Because the broker cannot process the trade', 'Because the stock is too liquid', 'Because it is a market order'],
          correctAnswer: 0,
          explanation: 'If price gaps past the limit, the order may not fill at the expected level.'
        },
        {
          id: 'q3',
          question: 'True or False: Stop-limit orders guarantee execution at the exact limit price.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. They only execute if the market can fill at or through the limit condition.'
        },
        {
          id: 'q4',
          question: 'When are stop-limit orders often used?',
          options: ['When you want both trigger control and price control', 'Only for buying ETFs', 'Never in volatile markets', 'Only after a trade is closed'],
          correctAnswer: 0,
          explanation: 'They help traders manage risk while controlling execution price.'
        },
        {
          id: 'q5',
          question: 'Which are trade-offs of stop-limit orders? (Select all that apply)',
          options: ['More price control', 'Potential non-execution', 'Guaranteed fill', 'Risk of missing a move'],
          correctAnswer: 0,
          explanation: 'They improve control but can miss fills if price moves too quickly.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 3]
        }
      ]
    }
  },
  {
    id: 'trailing-stop',
    title: 'Trailing Stops',
    description: 'Learn how dynamic stop-loss levels help lock in gains',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Orders',
    xpReward: 35,
    content: {
      explanation: 'A trailing stop is a stop-loss that moves with the stock price. As price rises, the stop moves upward; if the price falls by the chosen trail amount, the order triggers.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the main purpose of a trailing stop?',
          options: ['To lock in gains while limiting losses', 'To guarantee a profit', 'To remove all risk', 'To avoid using a stop-loss'],
          correctAnswer: 0,
          explanation: 'Trailing stops let profits run while still protecting against a reversal.'
        },
        {
          id: 'q2',
          question: 'If a stock rises and the trailing stop moves upward, what happens when the price falls back?',
          options: ['The stop remains unchanged', 'The stop may trigger', 'The trade is guaranteed', 'The share count changes'],
          correctAnswer: 1,
          explanation: 'A trailing stop can trigger when price reverses enough to hit the updated stop level.'
        },
        {
          id: 'q3',
          question: 'True or False: Trailing stops can help protect profits in trending markets.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. They are especially useful when a trend is moving in your favor.'
        },
        {
          id: 'q4',
          question: 'What does the trailing amount determine?',
          options: ['The distance between the stop and current price', 'The dividend yield', 'The company’s market cap', 'The broker fee'],
          correctAnswer: 0,
          explanation: 'The trail amount sets how far the price can move before the stop adjusts.'
        },
        {
          id: 'q5',
          question: 'Which are common uses of trailing stops? (Select all that apply)',
          options: ['Protecting profits', 'Managing risk', 'Guaranteeing a target price', 'Following trends'],
          correctAnswer: 0,
          explanation: 'Trailing stops are mainly used to protect gains and manage risk during a trend.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 3]
        }
      ]
    }
  },
  {
    id: 'dividend-basics',
    title: 'Dividend Basics',
    description: 'Learn how company profits can be shared with shareholders',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Fundamental Analysis',
    xpReward: 25,
    content: {
      explanation: 'A dividend is a portion of a company’s profits distributed to shareholders, usually on a per-share basis. Companies that pay dividends often prioritize mature, cash-generative businesses.',
      quiz: [
        {
          id: 'q1',
          question: 'What is a dividend?',
          options: ['A share of company profits', 'A trading fee', 'A loan payment', 'A tax rate'],
          correctAnswer: 0,
          explanation: 'Dividends are cash or shares paid to shareholders from company profits.'
        },
        {
          id: 'q2',
          question: 'Which type of company is more likely to pay dividends?',
          options: ['A mature cash-generative company', 'An early-stage startup', 'A purely speculative meme stock', 'A charity'],
          correctAnswer: 0,
          explanation: 'Mature businesses with stable cash flows often pay regular dividends.'
        },
        {
          id: 'q3',
          question: 'True or False: Dividends guarantee a positive return.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Dividend payments can change and are not guaranteed.'
        },
        {
          id: 'q4',
          question: 'Why do investors like dividends?',
          options: ['They can provide regular income', 'They always increase value', 'They eliminate risk', 'They are free from taxes'],
          correctAnswer: 0,
          explanation: 'Dividends can provide income and signal financial strength, but they’re not risk-free.'
        },
        {
          id: 'q5',
          question: 'Which are common dividend-related concepts? (Select all that apply)',
          options: ['Dividend yield', 'Payout ratio', 'Ex-dividend date', 'Guaranteed growth'],
          correctAnswer: 0,
          explanation: 'Dividends are often assessed by yield, payout ratio, and the ex-dividend date.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'stock-splits',
    title: 'Stock Splits',
    description: 'Learn how stock splits affect price and share count',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Fundamental Analysis',
    xpReward: 25,
    content: {
      explanation: 'A stock split increases the number of shares outstanding while reducing the share price proportionally. It does not change the total value of the company, but it can make shares more accessible to investors.',
      quiz: [
        {
          id: 'q1',
          question: 'What is a stock split?',
          options: ['A company increases share count and lowers price', 'A company buys back its own stock', 'A government tax change', 'A bond maturity event'],
          correctAnswer: 0,
          explanation: 'A split increases share count while proportionally lowering the price per share.'
        },
        {
          id: 'q2',
          question: 'If a stock splits 2-for-1, what happens to share count?',
          options: ['It halves', 'It doubles', 'It stays the same', 'It becomes worthless'],
          correctAnswer: 1,
          explanation: 'A 2-for-1 split doubles the number of shares while halving the price per share.'
        },
        {
          id: 'q3',
          question: 'True or False: A stock split changes the company’s overall value.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. A split changes the share count and price but not the company’s total value.'
        },
        {
          id: 'q4',
          question: 'Why do companies sometimes do stock splits?',
          options: ['To make shares seem cheaper and more accessible', 'To avoid paying taxes', 'To increase debt', 'To reduce expenses'],
          correctAnswer: 0,
          explanation: 'Splits can make shares more approachable to a broader investor base.'
        },
        {
          id: 'q5',
          question: 'Which are common split ratios? (Select all that apply)',
          options: ['2-for-1', '3-for-1', '10-for-1', '1-for-10'],
          correctAnswer: 0,
          explanation: 'These are common examples of split ratios, although the exact ratio varies by company and event.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2, 3]
        }
      ]
    }
  },
  {
    id: 'eps-basics',
    title: 'Earnings Per Share',
    description: 'Learn how EPS helps judge profit performance',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Fundamental Analysis',
    xpReward: 25,
    content: {
      explanation: 'Earnings per share (EPS) measures how much profit a company makes for each outstanding share. It is a core metric used by investors to compare earnings power across companies.',
      quiz: [
        {
          id: 'q1',
          question: 'What does EPS stand for?',
          options: ['Earnings per Share', 'Equity Price Surcharge', 'Estimated Price Signal', 'Effective Profit Share'],
          correctAnswer: 0,
          explanation: 'EPS is a company’s net earnings divided by its outstanding shares.'
        },
        {
          id: 'q2',
          question: 'Why is EPS useful?',
          options: ['It helps compare profit generation across companies', 'It guarantees dividends', 'It removes volatility', 'It guarantees a buy rating'],
          correctAnswer: 0,
          explanation: 'EPS gives investors a standardized view of earnings power per share.'
        },
        {
          id: 'q3',
          question: 'True or False: Higher EPS always means a better company.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. EPS needs context such as price, industry, and growth expectations.'
        },
        {
          id: 'q4',
          question: 'How is EPS typically calculated?',
          options: ['Net income ÷ shares outstanding', 'Price ÷ dividend', 'Sales ÷ cost', 'Debt ÷ equity'],
          correctAnswer: 0,
          explanation: 'EPS is generally net income divided by the number of shares outstanding.'
        },
        {
          id: 'q5',
          question: 'Which are commonly used EPS concepts? (Select all that apply)',
          options: ['Trailing EPS', 'Forward EPS', 'Diluted EPS', 'Guaranteed EPS'],
          correctAnswer: 0,
          explanation: 'Analysts often compare trailing, forward, and diluted EPS values.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'reading-stock-charts',
    title: 'Reading Stock Charts',
    description: 'Identify important chart patterns and structure',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Technical Analysis',
    xpReward: 35,
    content: {
      explanation: 'Stock charts show price over time and help traders identify trend direction, reversals, and support or resistance. Even beginners can learn to read the basic structure of a chart.',
      quiz: [
        {
          id: 'q1',
          question: 'What does a stock chart usually show?',
          options: ['Price over time', 'Company leadership', 'Interest rates only', 'Coupon payments'],
          correctAnswer: 0,
          explanation: 'Charts visualize price movement over defined time periods.'
        },
        {
          id: 'q2',
          question: 'What is a trend?',
          options: ['A sustained direction of price movement', 'A dividend payment', 'A company’s board structure', 'A broker fee'],
          correctAnswer: 0,
          explanation: 'A trend shows whether price is generally moving up, down, or sideways.'
        },
        {
          id: 'q3',
          question: 'True or False: Price charts can help traders spot support and resistance.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Chart levels often highlight where price may stall or reverse.'
        },
        {
          id: 'q4',
          question: 'What is a candlestick often used to show?',
          options: ['Open, high, low, and close', 'Tax details', 'Bank liquidity', 'Analyst ratings'],
          correctAnswer: 0,
          explanation: 'Candlesticks represent a security’s price action within a set time period.'
        },
        {
          id: 'q5',
          question: 'Which chart features are important to interpret? (Select all that apply)',
          options: ['Trend direction', 'Support and resistance', 'Volume', 'Dividend yield'],
          correctAnswer: 0,
          explanation: 'Trend, levels, and volume are central to chart reading; dividend yield is a fundamental metric.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'volume-basics',
    title: 'Volume Basics',
    description: 'Learn how trading volume confirms market conviction',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Technical Analysis',
    xpReward: 30,
    content: {
      explanation: 'Volume measures how many shares or contracts trade during a period. It helps confirm whether a price move is being supported by strong participation or lacks conviction.',
      quiz: [
        {
          id: 'q1',
          question: 'What does trading volume tell you?',
          options: ['How much activity is occurring in a stock', 'A company’s future earnings', 'Dividend policy', 'Tax laws'],
          correctAnswer: 0,
          explanation: 'Volume reflects how actively a security is being traded.'
        },
        {
          id: 'q2',
          question: 'What can unusually high volume suggest?',
          options: ['Strong interest or urgency in the move', 'Guaranteed profit', 'No price movement', 'A fixed dividend'],
          correctAnswer: 0,
          explanation: 'High volume often indicates stronger participation and conviction behind the current move.'
        },
        {
          id: 'q3',
          question: 'True or False: Low volume can make price moves less reliable.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Low participation can mean less conviction and more erratic price behavior.'
        },
        {
          id: 'q4',
          question: 'Why do traders compare volume to price movement?',
          options: ['To assess whether a move is being confirmed', 'To determine shareholder voting', 'To calculate dividends', 'To set legal compliance'],
          correctAnswer: 0,
          explanation: 'Price without volume can be less informative; volume helps confirm the strength of a move.'
        },
        {
          id: 'q5',
          question: 'Which are common volume interpretations? (Select all that apply)',
          options: ['Rising price + rising volume', 'Falling price + rising volume', 'Low volume breakout', 'High volume reversal'],
          correctAnswer: 0,
          explanation: 'Volume often helps confirm whether a move has strength or is fading.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 3]
        }
      ]
    }
  },
  {
    id: 'sectors-and-industries',
    title: 'Sectors and Industries',
    description: 'Learn how companies are grouped by business type',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 25,
    content: {
      explanation: 'Sectors and industries group companies by business focus, such as technology, healthcare, energy, or financials. This helps investors compare peers and understand macro trends.',
      quiz: [
        {
          id: 'q1',
          question: 'What is a sector?',
          options: ['A broad group of related industries', 'A broker account type', 'A stock split', 'A dividend policy'],
          correctAnswer: 0,
          explanation: 'Sectors are broad business categories like technology or healthcare.'
        },
        {
          id: 'q2',
          question: 'Which sector is typically associated with software and semiconductors?',
          options: ['Technology', 'Utilities', 'Energy', 'Real estate'],
          correctAnswer: 0,
          explanation: 'Technology is broadly associated with software, hardware, semiconductors, and internet businesses.'
        },
        {
          id: 'q3',
          question: 'True or False: Sector performance can strongly influence market trends.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Leadership from sectors like tech or energy can affect the broader market.'
        },
        {
          id: 'q4',
          question: 'Why do investors compare companies within the same sector?',
          options: ['Because they often share similar risks and drivers', 'Because sector labels must match dividends', 'Because all companies issue stock splits', 'Because sector membership removes volatility'],
          correctAnswer: 0,
          explanation: 'Sector peers are useful comparisons because they operate under similar economic conditions.'
        },
        {
          id: 'q5',
          question: 'Which are common sectors? (Select all that apply)',
          options: ['Technology', 'Healthcare', 'Energy', 'Transportation'],
          correctAnswer: 0,
          explanation: 'These are typical sectors used to group businesses by industry and exposure.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2, 3]
        }
      ]
    }
  },
  {
    id: 'regulatory-bodies',
    title: 'Regulatory Bodies',
    description: 'Learn how financial regulators protect market participants',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Basics',
    xpReward: 30,
    content: {
      explanation: 'Regulators help keep financial markets fair, transparent, and orderly. Agencies often monitor disclosure rules, market conduct, brokers, and investor protection.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the role of financial regulators?',
          options: ['To supervise markets and enforce rules', 'To guarantee returns', 'To set stock prices', 'To determine dividends'],
          correctAnswer: 0,
          explanation: 'Regulators help maintain fair practices and market integrity.'
        },
        {
          id: 'q2',
          question: 'Which body is commonly associated with US stock market oversight?',
          options: ['SEC', 'EPA', 'IRS', 'FAA'],
          correctAnswer: 0,
          explanation: 'The U.S. Securities and Exchange Commission (SEC) is a major securities regulator.'
        },
        {
          id: 'q3',
          question: 'True or False: Regulators are responsible for guaranteeing investor profits.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Regulators protect fairness and transparency, not gains.'
        },
        {
          id: 'q4',
          question: 'Why do regulations matter in investing?',
          options: ['They reduce fraud and improve transparency', 'They guarantee returns', 'They make trading free', 'They replace fundamental analysis'],
          correctAnswer: 0,
          explanation: 'Proper regulation builds trust and helps protect investors from misconduct.'
        },
        {
          id: 'q5',
          question: 'Which are common regulatory goals? (Select all that apply)',
          options: ['Fair markets', 'Investor protection', 'Transparency', 'Guaranteed wealth building'],
          correctAnswer: 0,
          explanation: 'Regulators focus on fairness, transparency, and protection rather than guaranteeing outcomes.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  }
];

