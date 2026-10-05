# API Key Setup for Real-Time Stock Data

To use real-time stock data in the trading simulator, you need to set up a free Finnhub API key.

## Steps:

1. **Get a Free API Key**
   - Go to https://finnhub.io/
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Add the API Key**
   - Create a `.env.local` file in the project root
   - Add this line:
     ```
     NEXT_PUBLIC_FINNHUB_API_KEY=your_actual_api_key_here
     ```

3. **Restart the Development Server**
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

## Without an API Key

The app will still work in demo mode with the Finnhub demo key, but you'll get:
- Limited data
- Rate limiting
- Potentially outdated prices

## Other Features Available Even Without API Key:

- Multiple currency support
- Multiple exchange support
- Currency conversion
- Portfolio tracking
- All trading functionality

The app will gracefully fall back to demo mode if no API key is provided.
