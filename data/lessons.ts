import { Lesson } from '@/types';

export const lessons: Lesson[] = [
  {
    id: 'intro-stocks',
    title: 'What is a Stock?',
    description: 'Learn the basics of what stocks are and how they work',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 25,
    content: {
      explanation: 'A stock represents a share in the ownership of a company. When you buy a stock, you become a partial owner of that company. Stocks are bought and sold on stock exchanges like the New York Stock Exchange (NYSE) or NASDAQ.',
      quiz: [
        {
          id: 'q1',
          question: 'What does buying a stock make you?',
          options: ['A company employee', 'A partial owner of the company', 'A company director', 'A company creditor'],
          correctAnswer: 1,
          explanation: 'When you buy stock, you become a partial owner of the company, entitled to a share of its assets and earnings.'
        },
        {
          id: 'q2',
          question: 'Where are stocks typically bought and sold?',
          options: [' grocery stores', 'Stock exchanges', 'Banks', 'Post offices'],
          correctAnswer: 1,
          explanation: 'Stocks are traded on stock exchanges like the NYSE and NASDAQ, which are organized markets for buying and selling securities.'
        },
        {
          id: 'q3',
          question: 'True or False: Stock prices always go up over time.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Stock prices can go up or down. Historically, the stock market has trended upward over long periods, but individual stocks can lose value.'
        },
        {
          id: 'q4',
          question: 'True or False: When you buy a stock, you own a piece of the company.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'Stock ownership represents a fractional ownership in the company, giving you rights to dividends and voting on major decisions.'
        },
        {
          id: 'q5',
          question: 'Which of the following are major US stock exchanges? (Select all that apply)',
          options: ['New York Stock Exchange (NYSE)', 'NASDAQ', 'Tokyo Stock Exchange', 'London Stock Exchange'],
          correctAnswer: 0,
          explanation: 'The NYSE and NASDAQ are the two largest stock exchanges in the United States. Tokyo and London are major international exchanges.',
          type: 'multiple-select',
          correctAnswers: [0, 1]
        }
      ]
    }
  },
  {
    id: 'buy-sell',
    title: 'Buying and Selling',
    description: 'Understand how to execute buy and sell orders',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 30,
    content: {
      explanation: 'To buy stocks, you place a "buy order" through a brokerage account. To sell, you place a "sell order". You can place different types of orders like market orders (execute immediately) or limit orders (execute only at a specific price).',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What type of order executes immediately at the current market price?',
          options: ['Limit order', 'Market order', 'Stop order', 'GTC order'],
          correctAnswer: 1,
          explanation: 'A market order executes immediately at the current available price, guaranteeing execution but not the price.'
        },
        {
          id: 'q2',
          question: 'What do you need to place before you can buy or sell stocks?',
          options: ['A bank account', 'A brokerage account', 'A credit card', 'A savings account'],
          correctAnswer: 1,
          explanation: 'You need a brokerage account to buy and sell stocks. This is a specialized account that allows you to trade securities.'
        },
        {
          id: 'q3',
          question: 'True or False: A market order guarantees the price you will get.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'A market order guarantees execution but not the price. The price may change between when you place the order and when it executes.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: You can place orders outside of regular trading hours.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'Many brokers offer pre-market and after-hours trading, though these sessions typically have lower liquidity and wider spreads.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which of the following are common order types? (Select all that apply)',
          options: ['Market order', 'Limit order', 'Stop order', 'Cancel order'],
          correctAnswer: 0,
          explanation: 'Market orders, limit orders, and stop orders are common order types for executing trades.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'market-order',
    title: 'Market Orders',
    description: 'Learn about market orders and when to use them',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Orders',
    xpReward: 25,
    content: {
      explanation: 'A market order is an order to buy or sell a stock immediately at the current market price. It\'s the simplest type of order but the exact price you get may vary slightly from the quoted price due to market fluctuations.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the main advantage of a market order?',
          options: ['Price guarantee', 'Immediate execution', 'Lower fees', 'No risk'],
          correctAnswer: 1,
          explanation: 'The main advantage of a market order is that it executes immediately, ensuring you get into or out of a position quickly.'
        },
        {
          id: 'q2',
          question: 'What is a disadvantage of market orders?',
          options: ['They take too long', 'Price uncertainty', 'High fees', 'Complex setup'],
          correctAnswer: 1,
          explanation: 'The main disadvantage is price uncertainty - you may not get exactly the price you saw when placing the order due to market movement.'
        },
        {
          id: 'q3',
          question: 'True or False: Market orders guarantee the exact price you see.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Market orders do not guarantee the exact price. The price may change between when you place the order and when it executes.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Market orders are the simplest type of order.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'Market orders are indeed the simplest type of order - you just specify buy or sell and it executes immediately.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which factors affect market order execution? (Select all that apply)',
          options: ['Market volatility', 'Trading volume', 'Time of day', 'Your account balance'],
          correctAnswer: 0,
          explanation: 'Market volatility, trading volume, and time of day all affect how quickly and at what price your market order executes.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'limit-order',
    title: 'Limit Orders',
    description: 'Understand limit orders and price control',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Orders',
    xpReward: 30,
    content: {
      explanation: 'A limit order is an order to buy or sell a stock at a specific price or better. For a buy limit order, the order will only execute at the limit price or lower. For a sell limit order, it will only execute at the limit price or higher.',
      quiz: [
        {
          id: 'q1',
          question: 'If you place a buy limit order at $50, at what prices will it execute?',
          options: ['$50 or higher', '$50 or lower', 'Exactly $50 only', 'Any price'],
          correctAnswer: 1,
          explanation: 'A buy limit order at $50 will execute at $50 or any price lower than $50, but never higher.'
        },
        {
          id: 'q2',
          question: 'What is the main benefit of a limit order?',
          options: ['Faster execution', 'Price control', 'Lower fees', 'No risk'],
          correctAnswer: 1,
          explanation: 'Limit orders give you price control - you set the maximum price you\'re willing to pay or minimum price you\'re willing to accept.'
        },
        {
          id: 'q3',
          question: 'True or False: Limit orders guarantee execution.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Limit orders do not guarantee execution. If the stock never reaches your limit price, the order may never execute.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: A sell limit order at $100 will execute at $100 or higher.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'For sell limit orders, the order executes at the limit price or higher, ensuring you get at least your minimum price.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'When should you use a limit order? (Select all that apply)',
          options: ['When you want to control the price', 'When immediate execution is critical', 'When the market is volatile', 'When you have a specific target price'],
          correctAnswer: 0,
          explanation: 'Use limit orders when you want price control, during volatile markets, or when you have a specific target price. Use market orders when immediate execution is critical.',
          type: 'multiple-select',
          correctAnswers: [0, 2, 3]
        }
      ]
    }
  },
  {
    id: 'terminology',
    title: 'Trading Terminology',
    description: 'Match key trading terms with their definitions',
    type: 'matching',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      matching: {
        id: 'match1',
        instruction: 'Match the trading term with its correct definition',
        pairs: [
          { left: 'Dividend', right: 'A portion of company profits paid to shareholders' },
          { left: 'Portfolio', right: 'Collection of investments owned by an individual' },
          { left: 'Volatility', right: 'The degree of variation in a stock\'s price' },
          { left: 'Liquidity', right: 'How easily an asset can be converted to cash' }
        ]
      }
    }
  },
  {
    id: 'risk-management',
    title: 'Risk Management Basics',
    description: 'Learn essential risk management principles',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 35,
    content: {
      explanation: 'Risk management is crucial for successful trading. Key principles include: never invest more than you can afford to lose, diversify your investments, use stop-loss orders, and avoid emotional decision-making.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the golden rule of risk management?',
          options: ['Invest as much as possible', 'Never invest more than you can afford to lose', 'Always use margin', 'Follow hot tips'],
          correctAnswer: 1,
          explanation: 'The golden rule is to never invest more than you can afford to lose. This protects you from financial ruin if trades go wrong.'
        },
        {
          id: 'q2',
          question: 'What does diversification help with?',
          options: ['Maximizing returns', 'Reducing risk', 'Simplifying trading', 'Lowering fees'],
          correctAnswer: 1,
          explanation: 'Diversification reduces risk by spreading investments across different assets, so poor performance in one area doesn\'t devastate your portfolio.'
        },
        {
          id: 'q3',
          question: 'True or False: Stop-loss orders guarantee you won\'t lose money.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Stop-loss orders help limit losses but don\'t guarantee you won\'t lose money. In fast-moving markets, orders may execute at worse prices than expected.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Emotional decision-making is a common cause of trading losses.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'Emotional decision-making, driven by fear and greed, is indeed a common cause of trading losses. Following a disciplined strategy is crucial.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are key risk management principles? (Select all that apply)',
          options: ['Never invest more than you can afford to lose', 'Diversify investments', 'Use stop-loss orders', 'Follow hot tips from social media'],
          correctAnswer: 0,
          explanation: 'Key risk management principles include: never invest more than you can afford to lose, diversify investments, and use stop-loss orders. Following hot tips is NOT a risk management principle.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'diversification',
    title: 'Diversification',
    description: 'Understand why spreading your investments matters',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 30,
    content: {
      explanation: 'Diversification means spreading your investments across different assets, sectors, or geographic regions to reduce risk. If one investment performs poorly, others may perform well, balancing your overall portfolio.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the main purpose of diversification?',
          options: ['To maximize returns', 'To reduce risk', 'To increase fees', 'To simplify trading'],
          correctAnswer: 1,
          explanation: 'The main purpose of diversification is to reduce risk by not putting all your eggs in one basket.'
        },
        {
          id: 'q2',
          question: 'Which is an example of poor diversification?',
          options: ['Owning stocks from different sectors', 'Owning only tech stocks', 'Having stocks and bonds', 'International and domestic stocks'],
          correctAnswer: 1,
          explanation: 'Owning only tech stocks is poor diversification because you\'re concentrated in one sector that could all decline together.'
        },
        {
          id: 'q3',
          question: 'True or False: Diversification guarantees against losses.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Diversification reduces risk but does not guarantee against losses. It spreads risk but doesn\'t eliminate it entirely.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Diversification can include different asset classes like stocks and bonds.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True diversification includes spreading across different asset classes (stocks, bonds, real estate, etc.), not just different stocks.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are good diversification strategies? (Select all that apply)',
          options: ['Investing in multiple sectors', 'Different geographic regions', 'Mix of asset classes', 'Investing everything in one stock'],
          correctAnswer: 0,
          explanation: 'Good diversification includes multiple sectors, different geographic regions, and a mix of asset classes. Investing everything in one stock is the opposite of diversification.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'interactive-trade',
    title: 'Your First Trade',
    description: 'Practice placing a trade with a simulated scenario',
    type: 'interactive',
    difficulty: 'beginner',
    category: 'Practice',
    xpReward: 30,
    content: {
      interactive: {
        scenario: 'You have $1,000 to invest. You\'ve been researching XYZ Corp and believe it\'s a good investment. The current price is $50 per share.',
        steps: [
          'How many shares can you buy with $1,000?',
          'What type of order would you place to buy immediately?',
          'If the price drops to $45, what happens to your investment value?'
        ]
      }
    }
  },
  {
    id: 'stop-loss',
    title: 'Stop-Loss Orders',
    description: 'Protect your investments with stop-loss orders',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Orders',
    xpReward: 30,
    content: {
      explanation: 'A stop-loss order is an order placed with a broker to buy or sell once the stock reaches a certain price. It\'s designed to limit an investor\'s loss on a position. For example, setting a stop-loss at 10% below the purchase price limits your potential loss to 10%.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the primary purpose of a stop-loss order?',
          options: ['To maximize profits', 'To limit potential losses', 'To delay execution', 'To reduce fees'],
          correctAnswer: 1,
          explanation: 'The primary purpose of a stop-loss order is to limit potential losses by automatically selling a stock when it reaches a predetermined price.'
        },
        {
          id: 'q2',
          question: 'If you buy a stock at $100 and set a stop-loss at $90, what happens if the stock drops to $85?',
          options: ['You sell at $100', 'You sell at $90', 'You sell at $85', 'Nothing happens'],
          correctAnswer: 1,
          explanation: 'When the stock hits $90, your stop-loss order triggers and sells the stock at approximately $90, limiting your loss to about 10%.'
        },
        {
          id: 'q3',
          question: 'True or False: Stop-loss orders guarantee you\'ll get exactly your stop price.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Stop-loss orders do not guarantee exact execution prices. In fast-moving markets, orders may execute at worse prices due to slippage.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Stop-loss orders can help protect profits when the stock moves in your favor.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'Trailing stop-loss orders can protect profits by adjusting upward as the stock price rises, locking in gains while protecting against reversals.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'When should you use stop-loss orders? (Select all that apply)',
          options: ['For long-term investments', 'For volatile stocks', 'When you can\'t monitor the market', 'For all trades regardless of strategy'],
          correctAnswer: 0,
          explanation: 'Stop-loss orders are particularly useful for volatile stocks, when you can\'t monitor the market, and for shorter-term trades. They may not be appropriate for all long-term investment strategies.',
          type: 'multiple-select',
          correctAnswers: [1, 2]
        }
      ]
    }
  },
  {
    id: 'support-resistance',
    title: 'Support and Resistance',
    description: 'Understanding key price levels in technical analysis',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Technical Analysis',
    xpReward: 30,
    content: {
      explanation: 'Support is a price level where a stock tends to find buying interest and stop falling. Resistance is a price level where selling pressure tends to increase and prevent further price rises. These levels help traders identify potential entry and exit points.',
      quiz: [
        {
          id: 'q1',
          question: 'What is support in trading?',
          options: ['A price level where price tends to rise', 'A price level where price tends to fall', 'A type of order', 'A trading strategy'],
          correctAnswer: 0,
          explanation: 'Support is a price level where a stock tends to find buying interest and bounce upward, preventing further decline.'
        },
        {
          id: 'q2',
          question: 'What happens when a stock breaks through resistance?',
          options: ['It always falls back down', 'Resistance may become support', 'The stock becomes worthless', 'Nothing changes'],
          correctAnswer: 1,
          explanation: 'When a stock breaks through resistance, that former resistance level often becomes a new support level as market psychology shifts.'
        },
        {
          id: 'q3',
          question: 'True or False: Support and resistance levels are exact price points.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Support and resistance are more like zones or ranges rather than exact price points. They represent areas where buying or selling pressure tends to increase.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Support levels can become resistance levels once broken.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'Yes, when a support level is broken, it often becomes a resistance level as sellers who previously defended that level may try to push price back down.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which factors influence support and resistance levels? (Select all that apply)',
          options: ['Previous price levels', 'Psychological round numbers', 'Volume patterns', 'Random events'],
          correctAnswer: 0,
          explanation: 'Support and resistance levels are influenced by previous price levels, psychological round numbers (like $100), and volume patterns. They are not random.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'moving-averages',
    title: 'Moving Averages',
    description: 'Learn how moving averages help identify trends',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Technical Analysis',
    xpReward: 30,
    content: {
      explanation: 'A moving average is a calculation that smooths out price data by creating a constantly updated average price. The 50-day and 200-day moving averages are commonly used to identify trends. When the price is above the moving average, it suggests an uptrend; below suggests a downtrend.',
      quiz: [
        {
          id: 'q1',
          question: 'What does it typically indicate when a stock\'s price is above its 200-day moving average?',
          options: ['The stock is in a downtrend', 'The stock is in an uptrend', 'The stock is overvalued', 'The stock is undervalued'],
          correctAnswer: 1,
          explanation: 'When a stock trades above its 200-day moving average, it generally suggests the stock is in an uptrend and has positive momentum.'
        },
        {
          id: 'q2',
          question: 'What is the main benefit of using moving averages?',
          options: ['Predicting exact future prices', 'Smoothing out price noise to see trends', 'Guaranteeing profits', 'Eliminating all risk'],
          correctAnswer: 1,
          explanation: 'Moving averages smooth out day-to-day price fluctuations, helping traders see the underlying trend without getting distracted by short-term volatility.'
        },
        {
          id: 'q3',
          question: 'True or False: Shorter moving averages are more sensitive to price changes.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'Shorter moving averages (like 10-day or 20-day) are more sensitive to recent price changes and react faster to price movements.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Moving averages can predict exact future prices.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Moving averages cannot predict exact future prices. They only show historical trends and help identify potential support/resistance levels.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are commonly used moving average periods? (Select all that apply)',
          options: ['10-day', '50-day', '200-day', '5000-day'],
          correctAnswer: 0,
          explanation: 'Common moving average periods include 10-day, 20-day, 50-day, 100-day, and 200-day. 5000-day is not commonly used as it spans too many years.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'rsi-indicator',
    title: 'RSI Indicator',
    description: 'Understanding the Relative Strength Index',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Technical Analysis',
    xpReward: 35,
    prerequisites: ['support-resistance', 'moving-averages'],
    content: {
      explanation: 'The Relative Strength Index (RSI) is a momentum indicator that measures the speed and change of price movements. It oscillates between 0 and 100. Readings above 70 suggest a stock is overbought, while readings below 30 suggest it\'s oversold.',
      quiz: [
        {
          id: 'q1',
          question: 'What does an RSI reading above 70 typically indicate?',
          options: ['Stock is oversold', 'Stock is overbought', 'Stock is undervalued', 'Stock will crash'],
          correctAnswer: 1,
          explanation: 'An RSI above 70 typically indicates that a stock is overbought, meaning prices may have risen too quickly and could be due for a pullback.'
        },
        {
          id: 'q2',
          question: 'What is the range of the RSI indicator?',
          options: ['0 to 50', '0 to 100', '-100 to 100', '0 to 1000'],
          correctAnswer: 1,
          explanation: 'The RSI oscillates between 0 and 100, making it easy to interpret extreme readings at the upper and lower bounds.'
        },
        {
          id: 'q3',
          question: 'True or False: RSI above 70 guarantees the stock will immediately fall.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'RSI above 70 suggests overbought conditions but does not guarantee an immediate price decline. Overbought stocks can continue rising for extended periods.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: RSI below 30 indicates the stock is oversold.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. RSI below 30 typically indicates that a stock is oversold, meaning prices may have fallen too quickly and could be due for a bounce.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are important RSI levels to watch? (Select all that apply)',
          options: ['30', '50', '70', '100'],
          correctAnswer: 0,
          explanation: 'The key RSI levels are 30 (oversold threshold), 50 (midpoint), and 70 (overbought threshold). 100 is the maximum but not a key trading level.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'pe-ratio',
    title: 'P/E Ratio',
    description: 'Understanding Price-to-Earnings ratio',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Fundamental Analysis',
    xpReward: 30,
    content: {
      explanation: 'The Price-to-Earnings (P/E) ratio is calculated by dividing a company\'s stock price by its earnings per share. It helps investors determine if a stock is overvalued or undervalued compared to its earnings. A higher P/E may indicate growth expectations, while a lower P/E may suggest value.',
      quiz: [
        {
          id: 'q1',
          question: 'How is the P/E ratio calculated?',
          options: ['Stock price ÷ Earnings per share', 'Earnings per share ÷ Stock price', 'Stock price × Earnings per share', 'Stock price + Earnings per share'],
          correctAnswer: 0,
          explanation: 'The P/E ratio is calculated by dividing the current stock price by the earnings per share (EPS).'
        },
        {
          id: 'q2',
          question: 'What does a high P/E ratio generally suggest?',
          options: ['The stock is definitely overvalued', 'Investors expect high growth', 'The company has no earnings', 'The stock is a bargain'],
          correctAnswer: 1,
          explanation: 'A high P/E ratio typically suggests that investors expect high future growth from the company, though it could also indicate overvaluation.'
        },
        {
          id: 'q3',
          question: 'True or False: A low P/E ratio always means a stock is undervalued.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'A low P/E ratio could indicate value, but it could also indicate that the company has fundamental problems or declining earnings prospects.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: The P/E ratio is calculated using the company\'s total earnings.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'The P/E ratio uses earnings per share (EPS), not total earnings. It\'s calculated on a per-share basis.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which factors affect the P/E ratio? (Select all that apply)',
          options: ['Stock price', 'Earnings per share', 'Company size', 'Industry growth rates'],
          correctAnswer: 0,
          explanation: 'The P/E ratio is directly affected by stock price and earnings per share. Industry growth rates indirectly affect it through investor expectations, but company size does not directly impact the calculation.',
          type: 'multiple-select',
          correctAnswers: [0, 1]
        }
      ]
    }
  },
  {
    id: 'earnings-reports',
    title: 'Earnings Reports',
    description: 'Learn how quarterly earnings affect stock prices',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Fundamental Analysis',
    xpReward: 30,
    content: {
      explanation: 'Companies release quarterly earnings reports that show their financial performance. These reports can significantly impact stock prices. Key metrics include revenue, earnings per share (EPS), and guidance. Results that beat expectations often lead to price increases, while misses can cause declines.',
      quiz: [
        {
          id: 'q1',
          question: 'What typically happens when a company reports earnings that exceed analyst expectations?',
          options: ['Stock price usually falls', 'Stock price usually rises', 'Stock price stays the same', 'The company goes bankrupt'],
          correctAnswer: 1,
          explanation: 'When a company beats earnings expectations, investors often view it positively, which typically leads to an increase in stock price.'
        },
        {
          id: 'q2',
          question: 'What is "guidance" in the context of earnings reports?',
          options: ['Legal advice for the company', 'Management\'s forecast for future performance', 'Instructions for trading the stock', 'Government regulations'],
          correctAnswer: 1,
          explanation: 'Guidance refers to management\'s forecast of future performance, which investors closely watch as it indicates the company\'s outlook.'
        },
        {
          id: 'q3',
          question: 'True or False: Earnings reports are released monthly.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Earnings reports are released quarterly (every 3 months), not monthly. This is why they\'re called "quarterly earnings reports."',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Earnings per share (EPS) is a key metric in earnings reports.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'EPS is indeed a crucial metric that shows how much profit the company made per outstanding share of stock.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are key components of earnings reports? (Select all that apply)',
          options: ['Revenue', 'Earnings per share', 'Future guidance', 'Stock price predictions'],
          correctAnswer: 0,
          explanation: 'Key components include revenue, earnings per share (EPS), and future guidance. Stock price predictions are not part of official earnings reports.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'market-cap',
    title: 'Market Capitalization',
    description: 'Understanding company size classifications',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Fundamental Analysis',
    xpReward: 30,
    content: {
      explanation: 'Market capitalization (market cap) is the total value of a company\'s outstanding shares. It\'s calculated by multiplying the current stock price by the total number of outstanding shares. Companies are classified as large-cap, mid-cap, small-cap, or micro-cap based on their market cap.',
      quiz: [
        {
          id: 'q1',
          question: 'How is market capitalization calculated?',
          options: ['Stock price × Total shares outstanding', 'Stock price ÷ Total shares outstanding', 'Total revenue × Stock price', 'Company assets ÷ Stock price'],
          correctAnswer: 0,
          explanation: 'Market cap is calculated by multiplying the current stock price by the total number of outstanding shares.'
        },
        {
          id: 'q2',
          question: 'What is the typical market cap range for large-cap companies?',
          options: ['Under $300 million', '$300 million - $2 billion', '$2 billion - $10 billion', 'Over $10 billion'],
          correctAnswer: 3,
          explanation: 'Large-cap companies typically have a market capitalization over $10 billion. These are usually well-established, blue-chip companies.'
        },
        {
          id: 'q3',
          question: 'True or False: Market cap represents the total value of a company.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Market cap represents the total market value of a company\'s equity - essentially what investors think the entire company is worth.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Small-cap companies are generally less risky than large-cap companies.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Small-cap companies are generally riskier than large-cap companies due to higher volatility, less financial stability, and smaller market presence.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are market cap classifications? (Select all that apply)',
          options: ['Large-cap', 'Mid-cap', 'Small-cap', 'Micro-cap'],
          correctAnswer: 0,
          explanation: 'All four are market cap classifications: large-cap (over $10B), mid-cap ($2-10B), small-cap ($300M-2B), and micro-cap (under $300M).',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2, 3]
        }
      ]
    }
  },
  {
    id: 'short-selling',
    title: 'Short Selling',
    description: 'Learn how to profit from falling stock prices',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Advanced',
    xpReward: 40,
    prerequisites: ['buy-sell', 'risk-management'],
    content: {
      explanation: 'Short selling is a strategy where you borrow shares and sell them, hoping to buy them back later at a lower price. It\'s a way to profit from declining prices, but it carries unlimited risk since prices can theoretically rise indefinitely. Short sellers must pay interest on borrowed shares and can be forced to cover if the price rises too much.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the maximum profit potential in a short sale?',
          options: ['Unlimited', 'Limited to the initial sale price', 'Zero', 'Double the investment'],
          correctAnswer: 1,
          explanation: 'The maximum profit in a short sale is limited to the initial sale price (if the stock goes to zero), but losses can be unlimited if the price keeps rising.'
        },
        {
          id: 'q2',
          question: 'What is "covering" in short selling?',
          options: ['Buying back the borrowed shares', 'Selling more shares', 'Hedging with options', 'Reporting to regulators'],
          correctAnswer: 0,
          explanation: 'Covering is the process of buying back the borrowed shares to close the short position, ideally at a lower price than you sold them for.'
        },
        {
          id: 'q3',
          question: 'True or False: Short selling has unlimited loss potential.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Since stock prices can theoretically rise indefinitely, short sellers face unlimited loss potential if the price keeps rising.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Short sellers pay interest on borrowed shares.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Short sellers must pay interest on the borrowed shares, which adds to the cost of maintaining a short position.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are risks of short selling? (Select all that apply)',
          options: ['Unlimited losses', 'Interest costs', 'Margin calls', 'Guaranteed profits'],
          correctAnswer: 0,
          explanation: 'Risks include unlimited losses, interest costs on borrowed shares, and potential margin calls. Guaranteed profits is not a risk - it\'s not possible with short selling.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'options-basics',
    title: 'Options Basics',
    description: 'Introduction to call and put options',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Advanced',
    xpReward: 40,
    prerequisites: ['buy-sell', 'risk-management'],
    content: {
      explanation: 'Options are contracts that give the right, but not the obligation, to buy or sell an asset at a predetermined price. A call option gives the right to buy, while a put option gives the right to sell. Options can be used for hedging, speculation, or generating income through premium collection.',
      quiz: [
        {
          id: 'q1',
          question: 'What does a call option give you the right to do?',
          options: ['Sell an asset at a specific price', 'Buy an asset at a specific price', 'Do nothing with an asset', 'Borrow an asset'],
          correctAnswer: 1,
          explanation: 'A call option gives you the right to buy the underlying asset at a specified price within a specific time period.'
        },
        {
          id: 'q2',
          question: 'What is the "strike price" of an option?',
          options: ['The price you pay for the option contract', 'The price at which you can buy/sell the underlying asset', 'The current market price', 'The maximum possible profit'],
          correctAnswer: 1,
          explanation: 'The strike price is the predetermined price at which you can buy (for calls) or sell (for puts) the underlying asset if you exercise the option.'
        },
        {
          id: 'q3',
          question: 'True or False: Options give you the obligation to exercise.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Options give you the right, but not the obligation, to buy or sell. You can choose whether to exercise the option or let it expire worthless.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Put options increase in value when the underlying asset price decreases.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Put options give the right to sell at a fixed price, so they become more valuable when the underlying asset price falls below the strike price.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are common uses of options? (Select all that apply)',
          options: ['Hedging', 'Speculation', 'Income generation', 'Guaranteed returns'],
          correctAnswer: 0,
          explanation: 'Options are commonly used for hedging (protecting positions), speculation (betting on price direction), and income generation (selling options). Guaranteed returns is not a common use.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest',
    description: 'Understanding the power of compounding in investing',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Strategy',
    xpReward: 30,
    content: {
      explanation: 'Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods. In investing, this means your earnings generate their own earnings over time. The longer your money compounds, the more dramatic the effect becomes.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the key factor that makes compound interest powerful over time?',
          options: ['High interest rates only', 'Time - the longer it compounds, the more powerful', 'Large initial investment only', 'Frequent trading'],
          correctAnswer: 1,
          explanation: 'Time is the most critical factor in compound interest. The longer your money can compound, the more exponential the growth becomes.'
        },
        {
          id: 'q2',
          question: 'If you earn 10% annually, how long will it take to double your money (approximately)?',
          options: ['5 years', '7.2 years', '10 years', '12 years'],
          correctAnswer: 1,
          explanation: 'Using the Rule of 72, dividing 72 by the annual return (10%) gives approximately 7.2 years to double your money.'
        },
        {
          id: 'q3',
          question: 'True or False: Compound interest works better with shorter time periods.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Compound interest becomes more powerful with longer time periods. The longer your money can compound, the more dramatic the exponential growth becomes.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Earnings from compound interest generate their own earnings.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. This is the essence of compound interest - your earnings generate their own earnings, creating exponential growth over time.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which factors enhance compound interest? (Select all that apply)',
          options: ['Longer time periods', 'Higher returns', 'Regular contributions', 'Frequent withdrawals'],
          correctAnswer: 0,
          explanation: 'Longer time periods, higher returns, and regular contributions all enhance compound interest. Frequent withdrawals reduce the compounding effect.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'dollar-cost-averaging',
    title: 'Dollar-Cost Averaging',
    description: 'A strategy to reduce timing risk',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 30,
    content: {
      explanation: 'Dollar-cost averaging (DCA) involves investing a fixed amount regularly regardless of share price. This strategy reduces the impact of volatility and removes the need to time the market. When prices are high, you buy fewer shares; when prices are low, you buy more shares, potentially lowering your average cost over time.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the main benefit of dollar-cost averaging?',
          options: ['Guaranteed higher returns', 'Reducing timing risk and emotional decision-making', 'Lower trading fees', 'Higher dividends'],
          correctAnswer: 1,
          explanation: 'DCA reduces timing risk by spreading investments over time and helps avoid emotional decisions based on short-term market movements.'
        },
        {
          id: 'q2',
          question: 'In dollar-cost averaging, when do you buy more shares?',
          options: ['When prices are high', 'When prices are low', 'Always the same amount', 'Never varies'],
          correctAnswer: 1,
          explanation: 'With a fixed investment amount, you automatically buy more shares when prices are low and fewer shares when prices are high, potentially lowering your average cost.'
        },
        {
          id: 'q3',
          question: 'True or False: Dollar-cost averaging guarantees better returns than lump-sum investing.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. DCA does not guarantee better returns. In strong bull markets, lump-sum investing often outperforms DCA. DCA is primarily about risk management, not return maximization.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: DCA helps remove emotional decision-making from investing.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. By following a systematic investment schedule, DCA helps investors avoid emotional decisions based on fear or greed.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are benefits of dollar-cost averaging? (Select all that apply)',
          options: ['Reduces timing risk', 'Automatic investment discipline', 'Lower average cost in volatile markets', 'Guaranteed profits'],
          correctAnswer: 0,
          explanation: 'Benefits include reducing timing risk, automatic investment discipline, and potentially lowering average cost in volatile markets. Guaranteed profits is not a benefit.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'bull-bear-markets',
    title: 'Bull vs Bear Markets',
    description: 'Understanding market cycles and sentiment',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 30,
    content: {
      explanation: 'A bull market is when prices are rising or expected to rise, typically characterized by optimism and confidence. A bear market is when prices are falling, usually by 20% or more from recent highs, marked by pessimism. Understanding these cycles helps investors adjust their strategies accordingly.',
      quiz: [
        {
          id: 'q1',
          question: 'What characterizes a bull market?',
          options: ['Falling prices and pessimism', 'Rising prices and optimism', 'Flat prices and uncertainty', 'High volatility only'],
          correctAnswer: 1,
          explanation: 'A bull market is characterized by rising prices and investor optimism, with the general expectation that prices will continue to increase.'
        },
        {
          id: 'q2',
          question: 'How much do prices typically need to fall to be considered a bear market?',
          options: ['5%', '10%', '20%', '50%'],
          correctAnswer: 2,
          explanation: 'A bear market is typically defined as a decline of 20% or more from recent highs, accompanied by widespread pessimism.'
        },
        {
          id: 'q3',
          question: 'True or False: Bull markets can last for many years.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Bull markets can last for extended periods, sometimes many years, especially during sustained economic growth periods.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Bear markets are permanent declines.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Bear markets are temporary market cycles. Historically, markets have always recovered from bear market declines, though the timing and duration vary.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are characteristics of bull markets? (Select all that apply)',
          options: ['Rising prices', 'Investor optimism', 'Economic growth', 'Widespread pessimism'],
          correctAnswer: 0,
          explanation: 'Bull markets are characterized by rising prices, investor optimism, and economic growth. Widespread pessimism is characteristic of bear markets.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'market-hours',
    title: 'Market Hours',
    description: 'Understanding when markets are open for trading',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 30,
    content: {
      explanation: 'Stock markets have specific trading hours. The NYSE and NASDAQ are open Monday through Friday from 9:30 AM to 4:00 PM Eastern Time. Pre-market and after-hours trading allow trading outside these hours but with less liquidity and wider spreads.',
      quiz: [
        {
          id: 'q1',
          question: 'What are the regular trading hours for the NYSE and NASDAQ?',
          options: ['8:00 AM - 5:00 PM ET', '9:30 AM - 4:00 PM ET', '10:00 AM - 3:00 PM ET', '24/7'],
          correctAnswer: 1,
          explanation: 'Regular trading hours for major US exchanges are 9:30 AM to 4:00 PM Eastern Time, Monday through Friday.'
        },
        {
          id: 'q2',
          question: 'What is a characteristic of pre-market trading?',
          options: ['Higher liquidity', 'Lower volatility', 'Less liquidity and wider spreads', 'Same as regular hours'],
          correctAnswer: 2,
          explanation: 'Pre-market trading typically has less liquidity and wider spreads compared to regular trading hours due to fewer participants.'
        },
        {
          id: 'q3',
          question: 'True or False: Stock markets are open on weekends.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Major stock markets like the NYSE and NASDAQ are closed on weekends (Saturday and Sunday).',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: After-hours trading has the same liquidity as regular hours.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. After-hours trading has significantly less liquidity than regular trading hours, which can lead to larger price movements and wider spreads.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are characteristics of extended hours trading? (Select all that apply)',
          options: ['Less liquidity', 'Wider spreads', 'Higher volatility', 'More participants'],
          correctAnswer: 0,
          explanation: 'Extended hours trading (pre-market and after-hours) has less liquidity, wider spreads, and higher volatility. It has fewer participants than regular hours.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'market-participants',
    title: 'Market Participants',
    description: 'Learn who trades in the markets and why',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 30,
    content: {
      explanation: 'Market participants include retail investors (individuals), institutional investors (pension funds, mutual funds), market makers (provide liquidity), and high-frequency traders (algorithmic trading). Each group plays a different role in market function and liquidity.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the primary role of market makers?',
          options: ['Invest for long-term growth', 'Provide liquidity by continuously buying and selling', 'Regulate the market', 'Set stock prices'],
          correctAnswer: 1,
          explanation: 'Market makers provide liquidity by continuously offering to buy and sell securities, ensuring there are always buyers and sellers in the market.'
        },
        {
          id: 'q2',
          question: 'Which of these is an example of an institutional investor?',
          options: ['Individual trader', 'Pension fund', 'Market maker', 'Day trader'],
          correctAnswer: 1,
          explanation: 'Institutional investors include pension funds, mutual funds, insurance companies, and other large organizations that invest on behalf of others.'
        },
        {
          id: 'q3',
          question: 'True or False: Retail investors trade with their personal money.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Retail investors are individual traders who invest their personal money, as opposed to institutional investors who manage money for others.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: High-frequency traders use algorithms to execute trades.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. High-frequency traders use sophisticated algorithms and high-speed data connections to execute trades in milliseconds or microseconds.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are types of market participants? (Select all that apply)',
          options: ['Retail investors', 'Institutional investors', 'Market makers', 'Market regulators'],
          correctAnswer: 0,
          explanation: 'Market participants include retail investors, institutional investors, and market makers. Market regulators are government entities that oversee markets, not market participants.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'types-of-securities',
    title: 'Types of Securities',
    description: 'Understanding different investment vehicles',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 30,
    content: {
      explanation: 'Securities are tradable financial instruments. Common types include stocks (equity), bonds (debt), ETFs (baskets of securities), mutual funds (pooled investments), and options (derivatives). Each serves different investment purposes and risk profiles.',
      quiz: [
        {
          id: 'q1',
          question: 'What type of security represents ownership in a company?',
          options: ['Bonds', 'Stocks', 'ETFs', 'Options'],
          correctAnswer: 1,
          explanation: 'Stocks represent equity ownership in a company, giving shareholders a claim on company assets and earnings.'
        },
        {
          id: 'q2',
          question: 'What is the main characteristic of a bond?',
          options: ['Ownership stake', 'Debt instrument with fixed payments', 'Basket of securities', 'Right to buy/sell'],
          correctAnswer: 1,
          explanation: 'Bonds are debt securities where investors lend money to issuers in exchange for periodic interest payments and return of principal.'
        },
        {
          id: 'q3',
          question: 'True or False: ETFs trade like individual stocks on exchanges.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. ETFs (Exchange-Traded Funds) trade on stock exchanges just like individual stocks, with prices changing throughout the trading day.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Mutual funds are traded throughout the day like stocks.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Mutual funds are priced only once per day at the end of trading, unlike ETFs which trade continuously throughout the day.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are types of securities? (Select all that apply)',
          options: ['Stocks', 'Bonds', 'ETFs', 'Real estate'],
          correctAnswer: 0,
          explanation: 'Stocks, bonds, and ETFs are all types of securities traded on financial markets. Real estate is an asset class but not typically considered a traded security in the same way.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 'reading-stock-charts',
    title: 'Reading Stock Charts',
    description: 'Basic chart reading for beginners',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 30,
    content: {
      explanation: 'Stock charts display price movements over time. The most common is a candlestick chart showing open, high, low, and close prices. Green candles indicate price increases, while red candles show decreases. Timeframes can range from minutes to years.',
      quiz: [
        {
          id: 'q1',
          question: 'What does a green candlestick typically indicate?',
          options: ['Price decreased', 'Price increased', 'Price stayed the same', 'Volume was high'],
          correctAnswer: 1,
          explanation: 'A green candlestick indicates that the closing price was higher than the opening price, showing a price increase.'
        },
        {
          id: 'q2',
          question: 'What information does a candlestick show?',
          options: ['Only closing price', 'Open, high, low, and close prices', 'Only volume', 'Company earnings'],
          correctAnswer: 1,
          explanation: 'Candlesticks show four key price points: open, high, low, and close, providing a complete picture of price movement.'
        },
        {
          id: 'q3',
          question: 'True or False: Red candlesticks indicate price increases.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False. Red candlesticks indicate that the closing price was lower than the opening price, showing a price decrease.',
          type: 'true-false'
        },
        {
          id: 'q4',
          question: 'True or False: Candlestick charts can show different timeframes.',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. Candlestick charts can display various timeframes from minutes to years, allowing analysis of different trading periods.',
          type: 'true-false'
        },
        {
          id: 'q5',
          question: 'Which are key elements of a candlestick? (Select all that apply)',
          options: ['Open price', 'High price', 'Low price', 'Close price'],
          correctAnswer: 0,
          explanation: 'Candlesticks show open, high, low, and close prices - these four elements provide a complete picture of price movement.',
          type: 'multiple-select',
          correctAnswers: [0, 1, 2, 3]
        }
      ]
    }
  },
  {
    id: 'market-index',
    title: 'Market Indices',
    description: 'Understanding indices like S&P 500 and Dow Jones',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'Market indices track the performance of a group of stocks. The S&P 500 tracks 500 large US companies, the Dow Jones Industrial Average tracks 30 large companies, and the NASDAQ Composite focuses on technology stocks. Indices help gauge overall market performance.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'How many companies are in the S&P 500 index?',
          options: ['30', '100', '500', '1000'],
          correctAnswer: 2,
          explanation: 'The S&P 500 tracks 500 of the largest publicly traded companies in the United States, representing about 80% of US market cap.'
        },
        {
          id: 'q2',
          question: 'What is the primary purpose of a market index?',
          options: ['To guarantee profits', 'To track overall market performance', 'To pick individual stocks', 'To set stock prices'],
          correctAnswer: 1,
          explanation: 'Market indices serve as benchmarks to track the overall performance of a specific segment of the stock market or the entire market.'
        }
      ]
    }
  },
  {
    id: 'sectors-and-industries',
    title: 'Sectors and Industries',
    description: 'Understanding how companies are classified',
    type: 'matching',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      matching: {
        id: 'match5',
        instruction: 'Match the sector with its description',
        pairs: [
          { left: 'Technology', right: 'Companies involved in software, hardware, and internet services' },
          { left: 'Healthcare', right: 'Pharmaceuticals, biotechnology, and medical devices' },
          { left: 'Financials', right: 'Banks, insurance companies, and investment firms' },
          { left: 'Consumer Discretionary', right: 'Retail, automotive, and luxury goods' }
        ]
      }
    }
  },
  {
    id: 'supply-and-demand',
    title: 'Supply and Demand',
    description: 'Basic economics that drive stock prices',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 10,
    content: {
      explanation: 'Stock prices are driven by supply and demand. When more people want to buy (demand) than sell (supply), prices rise. When more people want to sell than buy, prices fall. This fundamental principle underlies all price movements in financial markets.',
      quiz: [
        {
          id: 'q1',
          question: 'What happens to stock prices when demand exceeds supply?',
          options: ['Prices fall', 'Prices rise', 'Prices stay the same', 'Trading stops'],
          correctAnswer: 1,
          explanation: 'When demand exceeds supply, buyers compete for limited shares, driving prices upward.'
        },
        {
          id: 'q2',
          question: 'What is the primary driver of stock price movements?',
          options: ['Company management only', 'Supply and demand', 'Government regulations', 'Stock exchange rules'],
          correctAnswer: 1,
          explanation: 'Supply and demand is the fundamental driver of all price movements in financial markets, reflecting buyers\' and sellers\' collective actions.'
        }
      ]
    }
  },
  {
    id: 'market-cap-importance',
    title: 'Why Market Cap Matters',
    description: 'Understanding the significance of company size',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'Market capitalization (market cap) indicates a company\'s size and value. Large-cap companies tend to be more stable but may grow slower. Small-cap companies offer higher growth potential but with more risk. Mid-caps offer a balance between growth and stability.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What is a key characteristic of large-cap stocks?',
          options: ['High growth potential, high risk', 'Stability, lower growth potential', 'Very volatile', 'Always bankrupt'],
          correctAnswer: 1,
          explanation: 'Large-cap stocks are generally more stable and established, but typically offer lower growth potential compared to smaller companies.'
        },
        {
          id: 'q2',
          question: 'How is market cap calculated?',
          options: ['Stock price × Number of shares outstanding', 'Company revenue × Industry average', 'Total assets - Total liabilities', 'Annual dividends × 10'],
          correctAnswer: 0,
          explanation: 'Market cap is calculated by multiplying the current stock price by the total number of shares outstanding.'
        }
      ]
    }
  },
  {
    id: 'volatility-basics',
    title: 'Understanding Volatility',
    description: 'Learn about price fluctuations and risk',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 10,
    content: {
      explanation: 'Volatility measures how much stock prices fluctuate. High volatility means large price swings, while low volatility indicates stable prices. Volatility is often associated with risk - higher volatility generally means higher potential returns but also higher potential losses.',
      quiz: [
        {
          id: 'q1',
          question: 'What does high volatility indicate?',
          options: ['Stable prices', 'Large price fluctuations', 'No trading activity', 'Guaranteed profits'],
          correctAnswer: 1,
          explanation: 'High volatility indicates that prices are experiencing large fluctuations, moving significantly up or down over short periods.'
        },
        {
          id: 'q2',
          question: 'What is the relationship between volatility and risk?',
          options: ['No relationship', 'Higher volatility generally means higher risk', 'Higher volatility means lower risk', 'Volatility eliminates risk'],
          correctAnswer: 1,
          explanation: 'Higher volatility is generally associated with higher risk, as prices can move dramatically in either direction, increasing uncertainty.'
        }
      ]
    }
  },
  {
    id: 'liquidity-basics',
    title: 'Understanding Liquidity',
    description: 'How easily assets can be converted to cash',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 10,
    content: {
      explanation: 'Liquidity refers to how easily an asset can be bought or sold without affecting its price. Stocks of large companies are typically highly liquid, while small company stocks may be less liquid. Higher liquidity means easier trading with narrower bid-ask spreads.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What characterizes a highly liquid stock?',
          options: ['Difficult to trade', 'Easy to trade without price impact', 'Never moves in price', 'Only available to institutions'],
          correctAnswer: 1,
          explanation: 'A highly liquid stock can be bought or sold easily in large quantities without significantly affecting its price.'
        },
        {
          id: 'q2',
          question: 'What is the bid-ask spread?',
          options: ['The difference between buy and sell prices', 'The total daily trading volume', 'The company\'s market cap', 'The dividend yield'],
          correctAnswer: 0,
          explanation: 'The bid-ask spread is the difference between the highest price a buyer is willing to pay (bid) and the lowest price a seller is willing to accept (ask).'
        }
      ]
    }
  },
  {
    id: 'brokerage-accounts',
    title: 'Brokerage Accounts',
    description: 'Understanding how to set up a trading account',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'A brokerage account is an account with a licensed brokerage firm that allows you to buy and sell securities. Types include full-service (with advice), discount (self-directed), and robo-advisors (automated). Key considerations include fees, account minimums, and available investment options.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the main difference between full-service and discount brokers?',
          options: ['Full-service offer investment advice, discount are self-directed', 'Discount brokers are illegal', 'Full-service are free', 'No difference'],
          correctAnswer: 0,
          explanation: 'Full-service brokers provide investment advice and research, while discount brokers allow self-directed trading at lower costs.'
        },
        {
          id: 'q2',
          question: 'What is a robo-advisor?',
          options: ['A human financial advisor', 'An automated service that creates and manages portfolios', 'A type of stock', 'A trading strategy'],
          correctAnswer: 1,
          explanation: 'Robo-advisors are automated investment services that use algorithms to create and manage investment portfolios based on your goals and risk tolerance.'
        }
      ]
    }
  },
  {
    id: 'tax-basics',
    title: 'Tax Basics for Traders',
    description: 'Understanding tax implications of trading',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'Trading has tax implications. Short-term gains (held less than a year) are taxed at higher ordinary income rates, while long-term gains (held over a year) get lower capital gains rates. Losses can offset gains, and some accounts like IRAs offer tax advantages.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'How are short-term capital gains typically taxed?',
          options: ['At lower capital gains rates', 'At higher ordinary income rates', 'They are tax-free', 'At a flat 10% rate'],
          correctAnswer: 1,
          explanation: 'Short-term capital gains (from assets held less than one year) are typically taxed at higher ordinary income tax rates.'
        },
        {
          id: 'q2',
          question: 'What is the tax advantage of holding investments longer than one year?',
          options: ['No tax advantage', 'Lower capital gains tax rates', 'Higher taxes', 'Guaranteed profits'],
          correctAnswer: 1,
          explanation: 'Investments held longer than one year qualify for long-term capital gains tax rates, which are generally lower than short-term rates.'
        }
      ]
    }
  },
  {
    id: 'regulatory-bodies',
    title: 'Market Regulation',
    description: 'Understanding who regulates the markets',
    type: 'matching',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      matching: {
        id: 'match6',
        instruction: 'Match the regulatory body with its role',
        pairs: [
          { left: 'SEC', right: 'Securities and Exchange Commission - regulates securities markets' },
          { left: 'FINRA', right: 'Financial Industry Regulatory Authority - oversees broker-dealers' },
          { left: 'FDIC', right: 'Federal Deposit Insurance Corporation - insures bank deposits' },
          { left: 'FED', right: 'Federal Reserve - central banking system' }
        ]
      }
    }
  },
  {
    id: 'dividend-basics',
    title: 'Dividend Basics',
    description: 'Understanding how dividends work',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 10,
    content: {
      explanation: 'Dividends are payments made by companies to shareholders from their profits. They can be paid quarterly, monthly, or as special one-time payments. Not all companies pay dividends - growth companies often reinvest profits instead of paying dividends.',
      quiz: [
        {
          id: 'q1',
          question: 'What are dividends?',
          options: ['Stock price increases', 'Payments from company profits to shareholders', 'Trading fees', 'Interest on loans'],
          correctAnswer: 1,
          explanation: 'Dividends are distributions of a portion of a company\'s earnings to its shareholders, typically paid on a regular basis.'
        },
        {
          id: 'q2',
          question: 'Why might a growth company choose not to pay dividends?',
          options: ['They are required to pay dividends', 'They reinvest profits for growth', 'Dividends are illegal', 'To avoid taxes'],
          correctAnswer: 1,
          explanation: 'Growth companies often reinvest their profits into business expansion and development rather than paying dividends to shareholders.'
        }
      ]
    }
  },
  {
    id: 'stock-splits',
    title: 'Stock Splits',
    description: 'Understanding what happens when stocks split',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 10,
    content: {
      explanation: 'A stock split divides existing shares into multiple shares. A 2-for-1 split gives each shareholder one additional share for each share they own. The total value remains the same, but the share price decreases. Splits make shares more affordable and can increase liquidity.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What happens in a 2-for-1 stock split?',
          options: ['You lose half your shares', 'You get one additional share for each share you own', 'The company doubles in value', 'Dividends double'],
          correctAnswer: 1,
          explanation: 'In a 2-for-1 split, each shareholder receives one additional share for each share they own, doubling the number of shares while halving the price.'
        },
        {
          id: 'q2',
          question: 'What is the effect of a stock split on total investment value?',
          options: ['Value doubles', 'Value is cut in half', 'Total value remains the same', 'Value increases by 50%'],
          correctAnswer: 2,
          explanation: 'A stock split does not change the total value of your investment - you own more shares at a proportionally lower price.'
        }
      ]
    }
  },
  {
    id: 'eps-basics',
    title: 'Earnings Per Share (EPS)',
    description: 'Understanding this key fundamental metric',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'EPS represents the portion of a company\'s profit allocated to each outstanding share of common stock. It\'s calculated as (Net Income - Preferred Dividends) ÷ Average Outstanding Shares. Higher EPS generally indicates better profitability.',
      quiz: [
        {
          id: 'q1',
          question: 'How is EPS calculated?',
          options: ['Stock price ÷ Earnings', '(Net Income - Preferred Dividends) ÷ Outstanding Shares', 'Total Revenue ÷ Employee Count', 'Market Cap ÷ Total Assets'],
          correctAnswer: 1,
          explanation: 'EPS is calculated by dividing net income minus preferred dividends by the weighted average number of outstanding shares.'
        },
        {
          id: 'q2',
          question: 'What does a higher EPS generally indicate?',
          options: ['Company is losing money', 'Better profitability per share', 'Higher stock price guaranteed', 'Lower risk'],
          correctAnswer: 1,
          explanation: 'Higher EPS generally indicates better profitability, as the company is generating more earnings for each share outstanding.'
        }
      ]
    }
  },
  {
    id: 'volume-basics',
    title: 'Trading Volume',
    description: 'Understanding the importance of trading volume',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 10,
    content: {
      explanation: 'Trading volume is the number of shares traded during a given period. High volume indicates strong investor interest and can confirm price trends. Low volume may suggest lack of interest or consolidation. Volume analysis helps traders assess the strength of price movements.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What does high trading volume typically indicate?',
          options: ['No one is interested', 'Strong investor interest and activity', 'The stock is delisted', 'Price will definitely fall'],
          correctAnswer: 1,
          explanation: 'High trading volume indicates strong investor interest and active trading, often confirming the significance of price movements.'
        },
        {
          id: 'q2',
          question: 'How can volume help traders?',
          options: ['It guarantees profits', 'It helps assess the strength of price movements', 'It predicts exact future prices', 'It eliminates all risk'],
          correctAnswer: 1,
          explanation: 'Volume analysis helps traders determine the strength and sustainability of price movements - high volume confirms trends, low volume may signal weakness.'
        }
      ]
    }
  },
  {
    id: 'initial-public-offering',
    title: 'Initial Public Offering (IPO)',
    description: 'Understanding how companies go public',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'An IPO is when a private company first offers shares to the public. It\'s a way for companies to raise capital and for early investors to cash out. IPOs can be volatile and risky for individual investors, as there\'s limited historical performance data.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the main purpose of an IPO?',
          options: ['To reduce company value', 'To raise capital from public investors', 'To fire the CEO', 'To avoid regulations'],
          correctAnswer: 1,
          explanation: 'The main purpose of an IPO is to raise capital from public investors to fund company growth and provide liquidity for early shareholders.'
        },
        {
          id: 'q2',
          question: 'Why might IPOs be considered risky for individual investors?',
          options: ['They are guaranteed to profit', 'Limited historical performance data', 'They are illegal', 'They always crash immediately'],
          correctAnswer: 1,
          explanation: 'IPOs can be risky because there\'s limited historical performance data, making it difficult to assess the company\'s long-term prospects.'
        }
      ]
    }
  },
  {
    id: 'short-interest',
    title: 'Short Interest',
    description: 'Understanding what short interest tells us',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'Short interest is the total number of shares that have been sold short but not yet covered. High short interest can indicate bearish sentiment, but can also lead to short squeezes if the price rises rapidly. Short interest is expressed as a percentage of total shares outstanding.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What does short interest measure?',
          options: ['Number of shares bought', 'Number of shares sold short but not covered', 'Total company value', 'Daily trading volume'],
          correctAnswer: 1,
          explanation: 'Short interest measures the total number of shares that have been sold short but not yet repurchased or covered.'
        },
        {
          id: 'q2',
          question: 'What can high short interest indicate?',
          options: ['Only bullish sentiment', 'Bearish sentiment or potential short squeeze', 'Company bankruptcy', 'Guaranteed profits'],
          correctAnswer: 1,
          explanation: 'High short interest can indicate bearish sentiment from investors, but it can also set up conditions for a short squeeze if the price rises rapidly.'
        }
      ]
    }
  },
  {
    id: 'market-sentiment',
    title: 'Market Sentiment',
    description: 'Understanding investor psychology and mood',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 10,
    content: {
      explanation: 'Market sentiment refers to the overall attitude of investors toward a particular security or market. It can be bullish (optimistic) or bearish (pessimistic). Sentiment is often driven by emotions, news, and economic indicators, and can sometimes contradict fundamental analysis.',
      quiz: [
        {
          id: 'q1',
          question: 'What does bullish sentiment indicate?',
          options: ['Investors expect prices to fall', 'Investors expect prices to rise', 'Investors are neutral', 'No one is trading'],
          correctAnswer: 1,
          explanation: 'Bullish sentiment indicates that investors are optimistic and expect prices to rise in the future.'
        },
        {
          id: 'q2',
          question: 'What can drive market sentiment?',
          options: ['Only company earnings', 'Emotions, news, and economic indicators', 'Only government actions', 'Nothing affects sentiment'],
          correctAnswer: 1,
          explanation: 'Market sentiment can be driven by various factors including investor emotions, news events, economic indicators, and market trends.'
        }
      ]
    }
  },
  {
    id: 'economic-indicators',
    title: 'Key Economic Indicators',
    description: 'Understanding economic data that affects markets',
    type: 'matching',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      matching: {
        id: 'match7',
        instruction: 'Match the economic indicator with what it measures',
        pairs: [
          { left: 'GDP', right: 'Gross Domestic Product - total economic output' },
          { left: 'Inflation Rate', right: 'Rate at which prices increase over time' },
          { left: 'Unemployment Rate', right: 'Percentage of labor force that is jobless' },
          { left: 'Interest Rates', right: 'Cost of borrowing money set by central banks' }
        ]
      }
    }
  },
  {
    id: 'currency-effects',
    title: 'Currency Effects on Stocks',
    description: 'How currency movements impact investments',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'Currency fluctuations can significantly impact stock returns, especially for multinational companies. A strong domestic currency can hurt exporters by making their products more expensive abroad, while potentially benefiting importers. Currency risk is an important consideration for international investing.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'How does a strong domestic currency typically affect exporters?',
          options: ['Helps them by making products cheaper abroad', 'Hurts them by making products more expensive abroad', 'No effect on exporters', 'Guarantees higher profits'],
          correctAnswer: 1,
          explanation: 'A strong domestic currency makes exports more expensive for foreign buyers, potentially reducing demand and hurting exporter profits.'
        },
        {
          id: 'q2',
          question: 'What is currency risk?',
          options: ['The risk of currency becoming worthless', 'The risk that currency fluctuations affect investment returns', 'The risk of government default', 'The risk of inflation only'],
          correctAnswer: 1,
          explanation: 'Currency risk is the potential for investment returns to be affected by changes in currency exchange rates, particularly relevant for international investments.'
        }
      ]
    }
  },
  {
    id: 'corporate-actions',
    title: 'Corporate Actions',
    description: 'Understanding company decisions that affect shareholders',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'Corporate actions are events initiated by companies that affect shareholders. These include dividends, stock splits, mergers, acquisitions, spin-offs, and buybacks. These actions can significantly impact share prices and investor returns.',
      quiz: [
        {
          id: 'q1',
          question: 'What is a stock buyback?',
          options: ['Company issuing new shares', 'Company repurchasing its own shares', 'Selling shares to competitors', 'Government buying company stock'],
          correctAnswer: 1,
          explanation: 'A stock buyback is when a company repurchases its own shares from the marketplace, reducing the number of outstanding shares.'
        },
        {
          id: 'q2',
          question: 'What is a merger?',
          options: ['Company splitting into two', 'Two companies combining into one', 'Company going bankrupt', 'Government taking over company'],
          correctAnswer: 1,
          explanation: 'A merger is when two companies combine to form a single entity, often to achieve synergies and increase market share.'
        }
      ]
    }
  },
  {
    id: 'investment-objectives',
    title: 'Setting Investment Objectives',
    description: 'Defining your financial goals and time horizon',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 15,
    content: {
      explanation: 'Investment objectives define what you want to achieve with your investments. Common objectives include capital appreciation (growth), income generation, capital preservation, and speculation. Your objectives should align with your risk tolerance, time horizon, and financial goals.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What is capital appreciation as an investment objective?',
          options: ['Generating regular income', 'Growing the value of investments over time', 'Preserving existing capital', 'Avoiding all risk'],
          correctAnswer: 1,
          explanation: 'Capital appreciation focuses on growing the value of investments over time through price increases, rather than generating current income.'
        },
        {
          id: 'q2',
          question: 'Why is time horizon important for investment objectives?',
          options: ['It determines if you can afford to lose money', 'It affects your risk tolerance and strategy', 'It guarantees profits', 'It has no importance'],
          correctAnswer: 1,
          explanation: 'Time horizon is crucial because longer timeframes typically allow for more aggressive strategies, while shorter timeframes may require more conservative approaches.'
        }
      ]
    }
  },
  {
    id: 'dividend-investing',
    title: 'Dividend Investing',
    description: 'Generating income through dividend-paying stocks',
    type: 'multiple-choice',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 25,
    content: {
      explanation: 'Dividend investing focuses on stocks that pay regular dividends, providing passive income. Dividend yield is calculated as annual dividends divided by share price. Companies with consistent dividend payments are often stable, mature businesses. Reinvesting dividends can accelerate compound growth through dividend reinvestment plans (DRIPs).',
      multipleChoice: [
        {
          id: 'q1',
          question: 'How is dividend yield calculated?',
          options: ['Share price ÷ Annual dividend', 'Annual dividend ÷ Share price', 'Annual dividend × Share price', 'Annual dividend + Share price'],
          correctAnswer: 1,
          explanation: 'Dividend yield is calculated by dividing the annual dividend per share by the current share price, expressed as a percentage.'
        },
        {
          id: 'q2',
          question: 'What is a DRIP (Dividend Reinvestment Plan)?',
          options: ['A type of insurance', 'Automatically reinvesting dividends to buy more shares', 'A trading strategy', 'A regulatory requirement'],
          correctAnswer: 1,
          explanation: 'A DRIP automatically reinvests cash dividends into additional shares of the stock, helping to accelerate compound growth.'
        }
      ]
    }
  },
  {
    id: 'technical-chart-patterns',
    title: 'Chart Patterns',
    description: 'Recognizing common technical chart patterns',
    type: 'matching',
    difficulty: 'advanced',
    category: 'Technical Analysis',
    xpReward: 30,
    content: {
      matching: {
        id: 'match3',
        instruction: 'Match the chart pattern with its description',
        pairs: [
          { left: 'Head and Shoulders', right: 'A pattern indicating a reversal from bullish to bearish' },
          { left: 'Double Bottom', right: 'A bullish reversal pattern with two troughs at similar levels' },
          { left: 'Triangle', right: 'A continuation pattern where price converges between trendlines' },
          { left: 'Cup and Handle', right: 'A bullish continuation pattern resembling a cup with a handle' }
        ]
      }
    }
  },
  {
    id: 'margin-trading',
    title: 'Margin Trading',
    description: 'Understanding leverage and margin requirements',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Advanced',
    xpReward: 35,
    content: {
      explanation: 'Margin trading allows you to buy more stock than you could with just your cash by borrowing from your broker. This amplifies both potential gains and losses. Margin requirements specify how much of your own money you must invest. Margin calls occur when your account value falls below the required maintenance level.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the main risk of margin trading?',
          options: ['Lower returns', 'Amplified losses and potential margin calls', 'Higher fees only', 'Limited investment choices'],
          correctAnswer: 1,
          explanation: 'The main risk of margin trading is that losses are amplified, and you may face margin calls requiring you to deposit more money or sell positions at unfavorable prices.'
        },
        {
          id: 'q2',
          question: 'What is a margin call?',
          options: ['A request to borrow more money', 'A demand to deposit more funds or sell securities', 'A type of order', 'A dividend payment'],
          correctAnswer: 1,
          explanation: 'A margin call occurs when your account equity falls below the maintenance requirement, forcing you to deposit more funds or sell positions to cover the loan.'
        }
      ]
    }
  },
  {
    id: 'advanced-scenario',
    title: 'Advanced Trading Scenario',
    description: 'Apply your knowledge in a complex trading situation',
    type: 'interactive',
    difficulty: 'advanced',
    category: 'Practice',
    xpReward: 40,
    prerequisites: ['risk-management', 'diversification', 'support-resistance'],
    content: {
      interactive: {
        scenario: 'You have a diversified portfolio worth $50,000. One of your holdings, TechCorp, has risen 25% and is showing signs of being overbought with an RSI of 75. Another holding, StableInc, has dropped 15% due to market conditions but has strong fundamentals. You have $10,000 in cash available.',
        steps: [
          'What might be a prudent strategy regarding TechCorp given the overbought RSI?',
          'How might you evaluate StableInc for potential investment?',
          'What risk management principles should guide your decision-making?'
        ]
      }
    }
  },
  // Additional Orders lessons
  {
    id: 'stop-limit-order',
    title: 'Stop-Limit Orders',
    description: 'Combining stop and limit orders for precision',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Orders',
    xpReward: 25,
    content: {
      explanation: 'A stop-limit order combines a stop order with a limit order. Once the stop price is triggered, it becomes a limit order. This provides more control over execution price but may not execute if the price moves away quickly.',
      quiz: [
        {
          id: 'q1',
          question: 'What happens when a stop-limit order is triggered?',
          options: ['It becomes a market order', 'It becomes a limit order', 'It is cancelled', 'It executes immediately at any price'],
          correctAnswer: 1,
          explanation: 'When the stop price is reached, a stop-limit order becomes a limit order, giving you control over the execution price.'
        },
        {
          id: 'q2',
          question: 'What is a disadvantage of stop-limit orders?',
          options: ['They execute too quickly', 'May not execute if price moves away', 'Lower fees', 'Guaranteed execution'],
          correctAnswer: 1,
          explanation: 'Stop-limit orders may not execute if the price moves away quickly after the stop is triggered, potentially leaving you without a position.'
        }
      ]
    }
  },
  {
    id: 'trailing-stop',
    title: 'Trailing Stop Orders',
    description: 'Dynamic stop orders that follow price movements',
    type: 'multiple-choice',
    difficulty: 'intermediate',
    category: 'Orders',
    xpReward: 25,
    content: {
      explanation: 'A trailing stop order sets the stop price at a fixed percentage or amount below the current market price. As the price rises, the stop price rises with it, but it stays in place if the price falls. This helps lock in gains while allowing for continued upside.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'How does a trailing stop differ from a regular stop order?',
          options: ['Trailing stops never execute', 'Trailing stops adjust with price movements', 'Regular stops are illegal', 'No difference'],
          correctAnswer: 1,
          explanation: 'Trailing stops adjust automatically as the price moves in your favor, helping to lock in gains while allowing for continued upside.'
        },
        {
          id: 'q2',
          question: 'What is the main benefit of a trailing stop?',
          options: ['Guaranteed highest price', 'Locks in gains while allowing upside', 'Eliminates all risk', 'Predicts market direction'],
          correctAnswer: 1,
          explanation: 'Trailing stops help lock in gains by following the price upward while still providing protection if the price reverses.'
        }
      ]
    }
  },
  {
    id: 'oco-orders',
    title: 'One-Cancels-Other (OCO) Orders',
    description: 'Managing multiple order scenarios',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Orders',
    xpReward: 30,
    content: {
      explanation: 'OCO orders consist of two orders with the same security. When one order is executed, the other is automatically cancelled. This is useful for setting profit targets and stop-losses simultaneously, ensuring only one scenario plays out.',
      quiz: [
        {
          id: 'q1',
          question: 'What happens in an OCO order when one order executes?',
          options: ['Both orders execute', 'The other order is cancelled', 'The orders are modified', 'Nothing changes'],
          correctAnswer: 1,
          explanation: 'In an OCO order, when one order is executed, the other order is automatically cancelled to prevent duplicate positions.'
        },
        {
          id: 'q2',
          question: 'What is a common use case for OCO orders?',
          options: ['Buying two different stocks', 'Setting profit target and stop-loss simultaneously', 'Day trading only', 'Hedging with options'],
          correctAnswer: 1,
          explanation: 'OCO orders are commonly used to set both a profit target and stop-loss simultaneously, ensuring only one outcome occurs.'
        }
      ]
    }
  },
  {
    id: 'order-execution-quality',
    title: 'Order Execution Quality',
    description: 'Understanding how well your orders are filled',
    type: 'multiple-choice',
    difficulty: 'intermediate',
    category: 'Orders',
    xpReward: 20,
    content: {
      explanation: 'Order execution quality refers to how well your orders are filled in terms of price, speed, and likelihood of execution. Factors include the broker\'s execution methods, market conditions, and order type. Better execution can significantly impact trading results.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What factors affect order execution quality?',
          options: ['Only the stock price', 'Broker methods, market conditions, and order type', 'Only the time of day', 'Only your account balance'],
          correctAnswer: 1,
          explanation: 'Order execution quality is affected by the broker\'s execution methods, current market conditions, the type of order placed, and other factors.'
        },
        {
          id: 'q2',
          question: 'Why is execution quality important for traders?',
          options: ['It guarantees profits', 'It can significantly impact trading results', 'It only matters for large institutions', 'It has no impact on returns'],
          correctAnswer: 1,
          explanation: 'Execution quality can significantly impact trading results through better prices, faster fills, and more reliable order execution.'
        }
      ]
    }
  },
  {
    id: 'after-hours-trading',
    title: 'After-Hours Trading',
    description: 'Understanding extended session trading',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Orders',
    xpReward: 20,
    content: {
      explanation: 'After-hours trading occurs before and after regular market hours. While it offers flexibility, it typically has lower liquidity, wider spreads, and higher volatility. Not all brokers support extended hours, and some order types may be restricted.',
      quiz: [
        {
          id: 'q1',
          question: 'What is a characteristic of after-hours trading?',
          options: ['Higher liquidity than regular hours', 'Lower liquidity and wider spreads', 'Guaranteed better prices', 'Same as regular hours'],
          correctAnswer: 1,
          explanation: 'After-hours trading typically has lower liquidity and wider bid-ask spreads compared to regular trading hours due to fewer participants.'
        },
        {
          id: 'q2',
          question: 'What risk is associated with after-hours trading?',
          options: ['Lower fees', 'Higher volatility and less liquidity', 'Guaranteed profits', 'No risks'],
          correctAnswer: 1,
          explanation: 'After-hours trading carries higher risk due to increased volatility and reduced liquidity compared to regular trading hours.'
        }
      ]
    }
  },
  // Additional Strategy lessons
  {
    id: 'value-investing',
    title: 'Value Investing',
    description: 'Finding undervalued stocks',
    type: 'multiple-choice',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 25,
    content: {
      explanation: 'Value investing involves finding stocks trading for less than their intrinsic value. Popularized by Benjamin Graham and Warren Buffett, it focuses on fundamental analysis, margin of safety, and patience. Value investors look for low P/E ratios, strong fundamentals, and temporary market inefficiencies.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What is the core principle of value investing?',
          options: ['Buying high-flying stocks', 'Finding stocks trading below intrinsic value', 'Day trading only', 'Ignoring fundamentals'],
          correctAnswer: 1,
          explanation: 'Value investing focuses on finding stocks that are trading for less than their intrinsic value, based on fundamental analysis.'
        },
        {
          id: 'q2',
          question: 'What is "margin of safety" in value investing?',
          options: ['Trading with borrowed money', 'Buying below intrinsic value to protect against errors', 'Selling at any loss', 'Market timing'],
          correctAnswer: 1,
          explanation: 'Margin of safety refers to buying a stock at a price significantly below its calculated intrinsic value to protect against analysis errors or market downturns.'
        }
      ]
    }
  },
  {
    id: 'growth-investing',
    title: 'Growth Investing',
    description: 'Investing in companies with high growth potential',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 25,
    content: {
      explanation: 'Growth investing focuses on companies expected to grow at an above-average rate compared to their industry or the overall market. Growth investors prioritize revenue and earnings growth over current valuation. These stocks often have higher P/E ratios and higher volatility.',
      quiz: [
        {
          id: 'q1',
          question: 'What do growth investors prioritize?',
          options: ['Current low valuation', 'High revenue and earnings growth', 'Dividend yield only', 'Market cap only'],
          correctAnswer: 1,
          explanation: 'Growth investors prioritize companies with high revenue and earnings growth potential over current valuation metrics.'
        },
        {
          id: 'q2',
          question: 'What is a characteristic of growth stocks?',
          options: ['Low P/E ratios', 'Higher P/E ratios and higher volatility', 'High dividend yields', 'Stable but slow growth'],
          correctAnswer: 1,
          explanation: 'Growth stocks typically have higher P/E ratios as investors pay a premium for expected growth, and they often exhibit higher volatility.'
        }
      ]
    }
  },
  {
    id: 'momentum-investing',
    title: 'Momentum Investing',
    description: 'Following market trends and price momentum',
    type: 'multiple-choice',
    difficulty: 'advanced',
    category: 'Strategy',
    xpReward: 30,
    content: {
      explanation: 'Momentum investing involves buying securities that are trending upward and selling those trending downward. Based on the idea that winners tend to keep winning and losers tend to keep losing in the short to medium term. Momentum strategies often use technical indicators and relative strength measurements.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What is the basic principle of momentum investing?',
          options: ['Buy low, sell high', 'Buy winners, sell losers based on trends', 'Only buy dividend stocks', 'Never sell'],
          correctAnswer: 1,
          explanation: 'Momentum investing is based on the principle that assets that have performed well recently will continue to perform well, and vice versa.'
        },
        {
          id: 'q2',
          question: 'What time frame does momentum investing typically focus on?',
          options: ['Decades', 'Short to medium term (months to a year)', 'Only intraday', 'Centuries'],
          correctAnswer: 1,
          explanation: 'Momentum investing typically focuses on short to medium-term trends, ranging from a few months to about a year.'
        }
      ]
    }
  },
  {
    id: 'contrarian-investing',
    title: 'Contrarian Investing',
    description: 'Going against the crowd',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Strategy',
    xpReward: 30,
    content: {
      explanation: 'Contrarian investing involves taking positions opposite to prevailing market sentiment. When others are greedy, contrarians are fearful, and vice versa. This strategy requires independent thinking, patience, and strong conviction. It can be profitable but carries the risk of going against strong trends.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the core principle of contrarian investing?',
          options: ['Following the crowd', 'Taking positions opposite to market sentiment', 'Only buying index funds', 'Avoiding all risk'],
          correctAnswer: 1,
          explanation: 'Contrarian investing involves taking positions that are opposite to prevailing market sentiment - buying when others are selling and selling when others are buying.'
        },
        {
          id: 'q2',
          question: 'What risk is associated with contrarian investing?',
          options: ['Guaranteed losses', 'Going against strong market trends', 'Higher fees', 'Complexity only'],
          correctAnswer: 1,
          explanation: 'The main risk of contrarian investing is going against strong market trends, which can result in losses if the crowd is right.'
        }
      ]
    }
  },
  {
    id: 'sector-rotation',
    title: 'Sector Rotation Strategy',
    description: 'Moving investments between sectors based on economic cycles',
    type: 'multiple-choice',
    difficulty: 'advanced',
    category: 'Strategy',
    xpReward: 30,
    content: {
      explanation: 'Sector rotation involves shifting investments between different sectors based on economic cycles. Different sectors perform better at different stages of the economic cycle. For example, cyclical sectors tend to outperform during economic expansions, while defensive sectors may be better during recessions.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What is sector rotation based on?',
          options: ['Random selection', 'Economic cycles and sector performance', 'Company management only', 'Government intervention only'],
          correctAnswer: 1,
          explanation: 'Sector rotation is based on the idea that different sectors perform better at different stages of the economic cycle.'
        },
        {
          id: 'q2',
          question: 'Which sectors typically perform well during economic expansions?',
          options: ['Only defensive sectors', 'Cyclical sectors like technology and industrials', 'Only utilities', 'All sectors perform the same'],
          correctAnswer: 1,
          explanation: 'Cyclical sectors like technology, industrials, and consumer discretionary tend to perform well during economic expansions when consumer and business spending increases.'
        }
      ]
    }
  },
  {
    id: 'pairs-trading',
    title: 'Pairs Trading',
    description: 'Market-neutral strategy using correlated securities',
    type: 'quiz',
    difficulty: 'advanced',
    category: 'Strategy',
    xpReward: 35,
    content: {
      explanation: 'Pairs trading involves taking long and short positions in two correlated securities. When the correlation between them weakens, you bet that they will converge again. This is a market-neutral strategy that profits from the relationship between securities rather than overall market direction.',
      quiz: [
        {
          id: 'q1',
          question: 'What is pairs trading?',
          options: ['Trading two different stocks randomly', 'Taking long and short positions in correlated securities', 'Only trading in pairs of hours', 'Diversification only'],
          correctAnswer: 1,
          explanation: 'Pairs trading involves taking long positions in one security and short positions in another correlated security, profiting from their relationship.'
        },
        {
          id: 'q2',
          question: 'What makes pairs trading market-neutral?',
          options: ['It never loses money', 'It profits from security relationships, not market direction', 'It only trades bonds', 'It requires no capital'],
          correctAnswer: 1,
          explanation: 'Pairs trading is market-neutral because it profits from the relationship between two securities rather than the overall direction of the market.'
        }
      ]
    }
  },
  {
    id: 'position-sizing',
    title: 'Position Sizing',
    description: 'Determining how much to invest in each trade',
    type: 'multiple-choice',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 25,
    content: {
      explanation: 'Position sizing is determining how much capital to allocate to each trade. Common methods include fixed dollar amount, percentage of portfolio, and volatility-based sizing. Proper position sizing is crucial for risk management and can help prevent large losses from any single position.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'Why is position sizing important?',
          options: ['It guarantees profits', 'It helps manage risk and prevent large losses', 'It increases trading fees', 'It predicts market direction'],
          correctAnswer: 1,
          explanation: 'Position sizing is crucial for risk management as it helps prevent large losses from any single position and controls overall portfolio risk.'
        },
        {
          id: 'q2',
          question: 'What is a common position sizing method?',
          options: ['Investing 100% in one stock', 'Percentage of portfolio or fixed dollar amount', 'Random allocation', 'Based on stock price only'],
          correctAnswer: 1,
          explanation: 'Common position sizing methods include allocating a fixed percentage of portfolio or a fixed dollar amount to each trade.'
        }
      ]
    }
  },
  {
    id: 'portfolio-rebalancing',
    title: 'Portfolio Rebalancing',
    description: 'Maintaining your target asset allocation',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 25,
    content: {
      explanation: 'Rebalancing involves periodically adjusting your portfolio back to your target asset allocation. As some investments perform better than others, your portfolio drifts from your intended allocation. Rebalancing forces you to sell high and buy low, maintaining your risk profile.',
      quiz: [
        {
          id: 'q1',
          question: 'Why is portfolio rebalancing necessary?',
          options: ['Portfolio never changes', 'Investments drift from target allocation over time', 'It increases fees', 'It guarantees profits'],
          correctAnswer: 1,
          explanation: 'Over time, some investments perform better than others, causing your portfolio to drift from your intended asset allocation, requiring rebalancing.'
        },
        {
          id: 'q2',
          question: 'What does rebalancing force you to do?',
          options: ['Sell low and buy high', 'Sell high and buy low', 'Only buy stocks', 'Only sell stocks'],
          correctAnswer: 1,
          explanation: 'Rebalancing forces you to sell investments that have appreciated (sell high) and buy those that have underperformed (buy low), maintaining your target allocation.'
        }
      ]
    }
  },
  {
    id: 'tax-loss-harvesting',
    title: 'Tax-Loss Harvesting',
    description: 'Using losses to reduce tax liability',
    type: 'multiple-choice',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 25,
    content: {
      explanation: 'Tax-loss harvesting involves selling investments that have declined in value to realize losses, which can offset capital gains and reduce tax liability. You can then reinvest in similar (but not identical) securities to maintain market exposure while capturing tax benefits.',
      multipleChoice: [
        {
          id: 'q1',
          question: 'What is the purpose of tax-loss harvesting?',
          options: ['To increase trading losses', 'To offset capital gains and reduce taxes', 'To avoid all taxes', 'To increase fees'],
          correctAnswer: 1,
          explanation: 'Tax-loss harvesting aims to realize investment losses that can offset capital gains, thereby reducing overall tax liability.'
        },
        {
          id: 'q2',
          question: 'What must you avoid after tax-loss harvesting?',
          options: ['Reinvesting in any stock', 'Reinvesting in substantially identical securities (wash sale rule)', 'Never investing again', 'Only buying bonds'],
          correctAnswer: 1,
          explanation: 'The wash sale rule prohibits claiming a loss if you purchase substantially identical securities within 30 days before or after the sale.'
        }
      ]
    }
  },
  {
    id: 'defensive-investing',
    title: 'Defensive Investing',
    description: 'Strategies for protecting capital during downturns',
    type: 'quiz',
    difficulty: 'intermediate',
    category: 'Strategy',
    xpReward: 25,
    content: {
      explanation: 'Defensive investing focuses on capital preservation during market downturns. Strategies include increasing cash allocations, focusing on defensive sectors (utilities, consumer staples), using hedging instruments, and maintaining high-quality investments. The goal is to limit losses while maintaining some upside potential.',
      quiz: [
        {
          id: 'q1',
          question: 'What is the focus of defensive investing?',
          options: ['Maximizing gains at all costs', 'Capital preservation during downturns', 'Only buying penny stocks', 'Market timing only'],
          correctAnswer: 1,
          explanation: 'Defensive investing focuses on protecting capital and limiting losses during market downturns while maintaining some upside potential.'
        },
        {
          id: 'q2',
      question: 'Which sectors are considered defensive?',
      options: ['Technology and biotech', 'Utilities and consumer staples', 'Only cryptocurrency', 'Only emerging markets'],
      correctAnswer: 1,
      explanation: 'Defensive sectors like utilities and consumer staples tend to be less affected by economic cycles as they provide essential services.'
    }
  ]
}
},
{
  id: 'social-trading',
  title: 'Social Trading and Copy Trading',
  description: 'Learning from and copying other traders',
  type: 'multiple-choice',
  difficulty: 'intermediate',
  category: 'Strategy',
  xpReward: 25,
  content: {
    explanation: 'Social trading platforms allow investors to follow and copy the trades of successful traders. This can be educational for beginners but carries risks like over-reliance on others, lack of understanding of strategies, and potential conflicts of interest.',
    multipleChoice: [
      {
        id: 'q1',
        question: 'What is copy trading?',
        options: ['Copying legal documents', 'Automatically copying trades of other traders', 'Photocopying stock certificates', 'Copying company reports'],
        correctAnswer: 1,
        explanation: 'Copy trading involves automatically replicating the trades of other traders in your own account.'
      },
      {
        id: 'q2',
        question: 'What is a risk of social trading?',
        options: ['Guaranteed profits', 'Over-reliance on others without understanding strategies', 'Lower fees', 'Better performance'],
        correctAnswer: 1,
        explanation: 'A major risk of social trading is becoming over-reliant on others\' decisions without understanding the underlying strategies or risks.'
      }
    ]
  }
},
{
  id: 'algorithmic-trading-basics',
  title: 'Algorithmic Trading Basics',
  description: 'Understanding automated trading systems',
  type: 'quiz',
  difficulty: 'advanced',
  category: 'Strategy',
  xpReward: 30,
  content: {
    explanation: 'Algorithmic trading uses computer programs to execute trades based on predefined criteria. It can help eliminate emotional decisions, execute trades faster, and backtest strategies. However, it requires programming skills and can be subject to technical failures.',
    quiz: [
      {
        id: 'q1',
        question: 'What is algorithmic trading?',
        options: ['Trading by hand', 'Using computer programs to execute trades based on criteria', 'Only institutional trading', 'Illegal trading'],
        correctAnswer: 1,
        explanation: 'Algorithmic trading uses computer algorithms to automatically execute trades when specific conditions are met.'
      },
      {
        id: 'q2',
        question: 'What is a benefit of algorithmic trading?',
        options: ['Emotional decision making', 'Faster execution and emotion elimination', 'Higher fees', 'Only for beginners'],
        correctAnswer: 1,
        explanation: 'Algorithmic trading can execute trades faster than humans and eliminates emotional decision-making from the trading process.'
      }
    ]
  }
},
{
  id: 'backtesting-basics',
  title: 'Backtesting Trading Strategies',
  description: 'Testing strategies on historical data',
  type: 'multiple-choice',
  difficulty: 'advanced',
  category: 'Strategy',
  xpReward: 30,
  content: {
    explanation: 'Backtesting involves applying trading strategies to historical data to see how they would have performed. This helps validate strategies before risking real money. However, past performance doesn\'t guarantee future results, and backtesting has limitations like overfitting and not accounting for real-world constraints.',
    multipleChoice: [
      {
        id: 'q1',
        question: 'What is backtesting?',
        options: ['Testing physical equipment', 'Applying strategies to historical data', 'Forward testing only', 'Market prediction'],
        correctAnswer: 1,
        explanation: 'Backtesting involves applying trading strategies to historical market data to evaluate how they would have performed.'
      },
      {
        id: 'q2',
        question: 'What is a limitation of backtesting?',
        options: ['It guarantees future profits', 'Past performance doesn\'t guarantee future results', 'It only works for stocks', 'It requires no data'],
        correctAnswer: 1,
        explanation: 'A major limitation of backtesting is that past performance doesn\'t guarantee future results, and historical conditions may not repeat.'
      }
    ]
  }
},
{
  id: 'trading-process-ordering',
  title: 'Trading Process Steps',
  description: 'Learn the correct order of steps in trading',
  type: 'ordering',
  difficulty: 'beginner',
  category: 'Basics',
  xpReward: 35,
  content: {
    explanation: 'When trading stocks, there\'s a specific process you should follow to make informed decisions and manage risk effectively. Understanding this sequence helps you trade more systematically.',
    ordering: [
      {
        id: 'order1',
        instruction: 'Order the trading steps from first to last:',
        items: ['Place the order', 'Research the stock', 'Review your trade', 'Set a budget', 'Monitor the position'],
        correctOrder: [1, 0, 3, 4, 2],
        explanation: 'The correct sequence is: 1) Research the stock, 2) Set a budget, 3) Place the order, 4) Monitor the position, 5) Review your trade.'
      }
    ]
  }
},
{
  id: 'market-participants-wordbank',
  title: 'Market Participants',
  description: 'Identify different types of market participants',
  type: 'word-bank',
  difficulty: 'beginner',
  category: 'Basics',
  xpReward: 30,
  content: {
    explanation: 'The stock market has many different types of participants, each with different goals and strategies. Understanding who is trading helps you understand market dynamics.',
    wordBank: [
      {
        id: 'wb1',
        instruction: 'Select the correct words to complete the sentences:',
        sentence: 'Institutional investors like _____ and _____ trade large volumes. _____ trade on behalf of clients. _____ buy and sell for personal accounts.',
        words: ['hedge funds', 'retail investors', 'mutual funds', 'brokers', 'banks', 'day traders'],
        correctWords: ['hedge funds', 'mutual funds', 'brokers', 'retail investors'],
        explanation: 'Institutional investors like hedge funds and mutual funds trade large volumes. Brokers trade on behalf of clients. Retail investors buy and sell for personal accounts.'
      }
    ]
  }
},
{
  id: 'stock-terms-flashcards',
  title: 'Stock Terms Flashcards',
  description: 'Learn key stock trading terminology',
  type: 'flashcard',
  difficulty: 'beginner',
  category: 'Basics',
  xpReward: 40,
  content: {
    explanation: 'Flashcards are a great way to memorize important trading terms. Click each card to reveal the definition and test your knowledge.',
    flashcards: [
      {
        id: 'fc1',
        front: 'What is a "bull market"?',
        back: 'A bull market is a period of rising stock prices, typically accompanied by optimism and investor confidence.',
        hint: 'Think of a bull charging forward with its horns up',
        explanation: 'Bull markets are characterized by sustained price increases and are generally associated with strong economic conditions.'
      },
      {
        id: 'fc2',
        front: 'What is a "bear market"?',
        back: 'A bear market is a period of falling stock prices, typically defined as a decline of 20% or more from recent highs.',
        hint: 'Think of a bear swiping its paws downward',
        explanation: 'Bear markets are often accompanied by pessimism and can last for extended periods.'
      },
      {
        id: 'fc3',
        front: 'What is "volatility"?',
        back: 'Volatility measures how much and how quickly stock prices change. High volatility means large price swings, while low volatility means prices are relatively stable.',
        hint: 'Related to how "jumpy" the market is',
        explanation: 'Volatility is a key risk factor - higher volatility means higher potential returns but also higher risk.'
      },
      {
        id: 'fc4',
        front: 'What is "liquidity"?',
        back: 'Liquidity refers to how easily you can buy or sell a stock without affecting its price. High liquidity means many buyers and sellers are active.',
        hint: 'Think of how "liquid" or easy it is to convert to cash',
        explanation: 'Stocks with high liquidity are easier to trade and typically have narrower bid-ask spreads.'
      },
      {
        id: 'fc5',
        front: 'What is a "dividend"?',
        back: 'A dividend is a portion of a company\'s profits distributed to shareholders, usually on a quarterly basis.',
        hint: 'Think of it as a "reward" for owning the stock',
        explanation: 'Dividends provide regular income to investors and are often paid by established, profitable companies.'
      }
    ]
  }
},
{
  id: 'order-types-matching',
  title: 'Order Types Matching',
  description: 'Match order types with their descriptions',
  type: 'matching',
  difficulty: 'intermediate',
  category: 'Orders',
  xpReward: 35,
  content: {
    explanation: 'Different order types serve different purposes. Matching them with their descriptions helps you choose the right one for your trading strategy.',
    matching: {
      id: 'match1',
      instruction: 'Match each order type with its description:',
      pairs: [
        { left: 'Market Order', right: 'Executes immediately at current price' },
        { left: 'Limit Order', right: 'Executes only at specified price or better' },
        { left: 'Stop Order', right: 'Becomes a market order when price reaches stop price' },
        { left: 'Stop-Limit Order', right: 'Becomes a limit order when price reaches stop price' }
      ]
    }
  }
},
{
  id: 'risk-management-wordbank',
  title: 'Risk Management Terms',
  description: 'Complete sentences about risk management',
  type: 'word-bank',
  difficulty: 'intermediate',
  category: 'Risk Management',
  xpReward: 35,
  content: {
    explanation: 'Risk management is crucial for long-term trading success. These terms describe key concepts every trader should know.',
    wordBank: [
      {
        id: 'wb2',
        instruction: 'Select the correct words to complete the sentences:',
        sentence: 'Never risk more than _____ of your account on a single trade. Use _____ to limit potential losses. A _____ ratio of 2:1 means your potential profit is twice your risk. Proper _____ helps preserve capital during losing streaks.',
        words: ['1-2%', 'position sizing', 'stop-loss', 'risk-to-reward', 'leverage', 'diversification'],
        correctWords: ['1-2%', 'stop-loss', 'risk-to-reward', 'position sizing'],
        explanation: 'Never risk more than 1-2% of your account on a single trade. Use stop-loss to limit potential losses. A risk-to-reward ratio of 2:1 means your potential profit is twice your risk. Proper position sizing helps preserve capital during losing streaks.'
      }
    ]
  }
}
];

export const categories = ['Basics', 'Orders', 'Strategy', 'Practice', 'Technical Analysis', 'Fundamental Analysis', 'Advanced', 'Options', 'Forex', 'Crypto', 'Psychology', 'Risk Management'];




