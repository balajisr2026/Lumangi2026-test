# Lumanagi - Cross-Chain Trading & Prediction Platform

A modern React + TypeScript application for cross-chain trading and market predictions with user engagement features.

## Features

- **Cross-Chain Trading**: Execute trades across multiple blockchain networks
- **Real-Time Market Data**: Live market information and price tracking
- **Prediction System**: Make predictions on market movements and earn rewards
- **User Dashboard**: Monitor portfolio and track trading performance
- **User Engagement**: Earn badges, participate in tournaments, and build reputation
- **Responsive Design**: Mobile-friendly interface

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/          # Page components for routing
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── styles/         # Global and component styles
├── App.tsx         # Main App component
├── main.tsx        # Entry point
└── index.css       # Global styles

public/            # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool
- **React Router**: Client-side routing

## Project Features to Implement

### Pages
- [ ] Dashboard - Main trading interface
- [ ] Market Data - Real-time market information
- [ ] Predictions - Prediction creation and tracking
- [ ] Portfolio - User portfolio management
- [ ] Profile - User account settings

### Components
- [ ] TradingChart - Candlestick/line charts for market data
- [ ] OrderForm - Buy/Sell order creation
- [ ] PredictionCard - Display individual predictions
- [ ] MarketTable - Display market data tables
- [ ] UserBadges - Display user achievements and badges
- [ ] Leaderboard - Tournament rankings

### Utilities
- [ ] API client for blockchain data
- [ ] Market data formatter
- [ ] Prediction calculator
- [ ] Portfolio analyzer

## Environment Variables

Create a `.env` file in the project root (if needed for API endpoints):

```
VITE_API_URL=https://api.example.com
VITE_WEB3_PROVIDER=your_provider_url
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License

## Support

For issues or questions, please open an issue in the repository.
