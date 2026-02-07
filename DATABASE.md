# SQLite WASM Database Documentation

## Overview

This application uses **sql.js**, a WebAssembly build of SQLite, to provide client-side data persistence. The database stores all user data, trades, market information, predictions, and user progress.

## Architecture

### Database Modules

```
src/db/
├── database.ts      # Core database initialization and CRUD operations
├── seedData.ts      # Mock data seeding for demo purposes
└── api.ts           # High-level API for business logic operations

src/hooks/
└── useDatabase.ts   # React hook for database state management

src/context/
└── DatabaseContext.tsx  # React context provider for database access
```

## Features

### 1. **Local Data Persistence**
   - All data stored in browser's localStorage
   - Persistent across sessions
   - No server required for local development
   - Auto-saves after each operation

### 2. **Comprehensive Schema**
   - **Users**: User profiles with stats and reputation
   - **Portfolio**: Cryptocurrency holdings
   - **Trades**: Buy/Sell transaction history
   - **Market Data**: Token prices and market info
   - **Predictions**: Market predictions and their outcomes
   - **Badges**: Achievement system

### 3. **WASM Performance**
   - SQL queries run in WebAssembly (fast!)
   - Minimal overhead compared to IndexedDB
   - Complex queries and aggregations supported

## Database Schema

### Users Table
```typescript
{
  id: string (UUID)
  username: string
  wallet_address: string
  total_balance: number
  unrealized_pnl: number
  realized_pnl: number
  level: number
  reputation: number
  rank: number
  win_streak: number
  created_at: string (ISO)
  updated_at: string (ISO)
}
```

### Portfolio Table
```typescript
{
  id: string (UUID)
  user_id: string
  asset_symbol: string (e.g., "BTC", "ETH")
  quantity: number
  average_price: number
  current_price: number
  chain: string (Ethereum, Polygon, etc.)
  created_at: string (ISO)
  updated_at: string (ISO)
}
```

### Trades Table
```typescript
{
  id: string (UUID)
  user_id: string
  pair: string (e.g., "BTC/USDT")
  type: 'buy' | 'sell'
  quantity: number
  price: number
  total: number
  chain: string
  status: 'pending' | 'filled' | 'cancelled'
  timestamp: string (ISO)
}
```

### Market Data Table
```typescript
{
  id: string (UUID)
  symbol: string
  name: string
  price: number
  market_cap: number
  volume_24h: number
  change_24h: number (percentage)
  chain: string
  updated_at: string (ISO)
}
```

### Predictions Table
```typescript
{
  id: string (UUID)
  user_id: string
  symbol: string
  direction: 'up' | 'down'
  stake: number
  potential_return: number
  status: 'active' | 'won' | 'lost' | 'closed'
  expiry_time: string (ISO)
  created_at: string (ISO)
  closed_at?: string (ISO)
}
```

### Badges Table
```typescript
{
  id: string (UUID)
  user_id: string
  badge_name: string
  description: string
  earned: boolean
  earned_date?: string (ISO)
}
```

## Usage in Components

### Using the Database Hook

```tsx
import { useDatabaseContext } from '../context/DatabaseContext';

function MyComponent() {
  const {
    isInitialized,
    isLoading,
    error,
    currentUser,
    portfolio,
    trades,
    marketData,
    predictions,
    badges,
    refetchData,
    setCurrentUser,
  } = useDatabaseContext();

  useEffect(() => {
    if (currentUser) {
      // User data is available
      console.log('User balance:', currentUser.total_balance);
      console.log('Portfolio items:', portfolio.length);
    }
  }, [currentUser, portfolio]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {currentUser && <p>Hello, {currentUser.username}!</p>}
    </div>
  );
}
```

### Using Database API Functions

```tsx
import {
  executeTrade,
  addAssetToPortfolio,
  placePrediction,
  calculatePortfolioMetrics,
  formatCurrency,
} from '../db/api';

// Execute a trade
const trade = await executeTrade(
  userId,
  'BTC/USDT',
  'buy',
  0.5,
  43210,
  'Ethereum'
);

// Add asset to portfolio
const portfolio = await addAssetToPortfolio(
  userId,
  'BTC',
  2.5,
  43210,
  'Ethereum'
);

// Place a prediction
const prediction = await placePrediction(
  userId,
  'BTC',
  'up',
  500,
  1000,
  new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
);

// Calculate metrics
const metrics = calculatePortfolioMetrics(portfolio, trades);
console.log('Portfolio Value:', formatCurrency(metrics.totalValue));
console.log('Unrealized P&L:', formatCurrency(metrics.unrealizedPnL));
console.log('ROI:', metrics.roi.toFixed(2) + '%');
```

## Core Operations

### Create Operations
```tsx
createUser(user)              // Create new user
addPortfolioItem(item)        // Add to portfolio
createTrade(trade)            // Record a trade
upsertMarketData(data)        // Update market data
createPrediction(prediction)  // Make a prediction
createBadge(badge)            // Award a badge
```

### Read Operations
```tsx
getUser(userId)                    // Get user by ID
getPortfolio(userId)               // Get user's portfolio
getTrades(userId)                  // Get user's trades
getMarketData(symbol, chain)       // Get market data
getAllMarketData(chain?)           // Get all market data (optionally filtered)
searchMarketData(term, chain?)     // Search tokens
getPredictions(userId, status?)    // Get predictions (optionally filtered)
getUserBadges(userId)              // Get user's badges
```

### Update Operations
```tsx
updateUser(userId, updates)              // Update user info
updatePortfolioItem(itemId, updates)     // Update portfolio item
updateTradeStatus(tradeId, status)       // Update trade status
updatePredictionStatus(predictionId, status) // Resolve prediction
awardBadge(userId, badgeName)           // Award achievement
```

### Delete Operations
```tsx
removePortfolioItem(itemId)    // Remove from portfolio
clearDatabase()                 // Clear all data
```

## Database Management

### Export/Import Data

```tsx
import { exportDatabase, importDatabase } from '../db/database';

// Export entire database as JSON
const jsonData = exportDatabase();
localStorage.setItem('backup', jsonData);

// Import from backup
const backupData = localStorage.getItem('backup');
if (backupData) {
  importDatabase(backupData);
}
```

### Persistence

Data is automatically persisted to localStorage. Each write operation:
1. Updates the in-memory database
2. Exports the database
3. Saves to localStorage

Recovery on page load:
1. Initialize sql.js
2. Check localStorage for saved database
3. Load if exists, otherwise create fresh

## Performance Considerations

### Query Examples

**Get user's top-performing assets:**
```tsx
const portfolio = getPortfolio(userId);
const topPerformers = portfolio
  .map(item => ({
    ...item,
    gain: (item.current_price - item.average_price) * item.quantity,
  }))
  .sort((a, b) => b.gain - a.gain)
  .slice(0, 5);
```

**Calculate total portfolio value:**
```tsx
const totalValue = portfolio.reduce(
  (sum, item) => sum + item.quantity * item.current_price,
  0
);
```

**Get active predictions:**
```tsx
const activePredictions = getPredictions(userId, 'active');
```

## Data Seeding

On first application load, mock data is automatically seeded:
- Demo user with sample portfolio
- Trading history
- Market data for 8 tokens across multiple chains
- Sample predictions
- Achievement badges

To reseed data:
```tsx
import { clearDatabase } from '../db/database';
import { seedDatabase } from '../db/seedData';

await clearDatabase();
await seedDatabase();
```

## Migration to Backend

When ready to migrate to a real backend:

1. **API Wrapper Layer**
   - Replace database calls with API calls
   - Maintain same interface (useDatabase hook)
   - Add network error handling

2. **Hybrid Mode**
   - Keep local cache in browser
   - Sync with server
   - Offline-first architecture

3. **Example Migration**
   ```tsx
   // Before: Direct database call
   const trades = getTrades(userId);
   
   // After: API call with fallback
   const trades = await fetch(`/api/users/${userId}/trades`)
     .then(r => r.json())
     .catch(() => getTrades(userId)); // Fallback to local
   ```

## Browser Compatibility

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage support required (typically 5-10MB quota)
- WebAssembly support required (all modern browsers)

## File Size

- sql.js library: ~700KB (uncompressed), ~200KB (gzipped)
- Application bundle: ~254KB (with all features)
- Typical database (with seed data): <1MB in localStorage

## Troubleshooting

### Database not persisting?
- Check if localStorage is available
- Check browser storage quota
- Clear localStorage and reload: `localStorage.clear()`

### Slow queries?
- Keep queries simple
- Use WHERE clauses to filter data
- Index frequently queried columns

### Large database?
- Export and archive old trades
- Clear old predictions
- Consider pagination for large result sets

## Future Enhancements

1. **Multi-tab sync** - Synchronize database across browser tabs
2. **Encryption** - Encrypt sensitive data in localStorage
3. **Compression** - Compress database before storing
4. **Cloud sync** - Sync with cloud backend
5. **Time-series optimization** - Store historical data efficiently
