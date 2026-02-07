import { v4 as uuidv4 } from 'uuid';
import {
  createUser,
  addPortfolioItem,
  createTrade,
  upsertMarketData,
  createPrediction,
  createBadge,
  getAllUsers,
  type User,
  type Portfolio,
  type Trade,
  type MarketData,
  type Prediction,
  type Badge,
} from './database';

export async function seedDatabase(): Promise<void> {
  // Check if data already exists
  const existingUsers = getAllUsers();
  if (existingUsers.length > 0) {
    console.log('Database already seeded');
    return;
  }

  console.log('Seeding database with mock data...');

  // Create demo user
  const demoUserId = uuidv4();
  const demoUser: User = {
    id: demoUserId,
    username: 'DemoTrader',
    wallet_address: '0x1234567890123456789012345678901234567890',
    total_balance: 125430.50,
    unrealized_pnl: 8230.75,
    realized_pnl: 15420.25,
    level: 12,
    reputation: 8520,
    rank: 142,
    win_streak: 7,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };

  createUser(demoUser);

  // Create portfolio items
  const portfolioItems: Portfolio[] = [
    {
      id: uuidv4(),
      user_id: demoUserId,
      asset_symbol: 'BTC',
      quantity: 2.5,
      average_price: 42850,
      current_price: 43210,
      chain: 'Ethereum',
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      asset_symbol: 'ETH',
      quantity: 15.8,
      average_price: 2245,
      current_price: 2318,
      chain: 'Ethereum',
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      asset_symbol: 'SOL',
      quantity: 125.3,
      average_price: 168,
      current_price: 172,
      chain: 'Ethereum',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      asset_symbol: 'MATIC',
      quantity: 5000,
      average_price: 0.82,
      current_price: 0.94,
      chain: 'Polygon',
      created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  portfolioItems.forEach(item => addPortfolioItem(item));

  // Create sample trades
  const trades: Trade[] = [
    {
      id: uuidv4(),
      user_id: demoUserId,
      pair: 'BTC/USDT',
      type: 'buy',
      quantity: 0.5,
      price: 42850,
      total: 21425,
      chain: 'Ethereum',
      status: 'filled',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      pair: 'ETH/USDT',
      type: 'buy',
      quantity: 10,
      price: 2280,
      total: 22800,
      chain: 'Ethereum',
      status: 'filled',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      pair: 'ETH/USDT',
      type: 'sell',
      quantity: 5,
      price: 2310,
      total: 11550,
      chain: 'Ethereum',
      status: 'filled',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      pair: 'SOL/USDT',
      type: 'buy',
      quantity: 50,
      price: 168,
      total: 8400,
      chain: 'Ethereum',
      status: 'filled',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      pair: 'MATIC/USDT',
      type: 'buy',
      quantity: 3000,
      price: 0.82,
      total: 2460,
      chain: 'Polygon',
      status: 'filled',
      timestamp: new Date().toISOString(),
    },
  ];

  trades.forEach(trade => createTrade(trade));

  // Create market data for multiple chains
  const marketDataList: MarketData[] = [
    // Top tokens
    {
      id: `BTC-Ethereum-${Date.now()}`,
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43210,
      market_cap: 850230000000,
      volume_24h: 28340000000,
      change_24h: 2.45,
      chain: 'Ethereum',
      updated_at: new Date().toISOString(),
    },
    {
      id: `ETH-Ethereum-${Date.now()}`,
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2318,
      market_cap: 278230000000,
      volume_24h: 12450000000,
      change_24h: 1.82,
      chain: 'Ethereum',
      updated_at: new Date().toISOString(),
    },
    {
      id: `SOL-Ethereum-${Date.now()}`,
      symbol: 'SOL',
      name: 'Solana',
      price: 172,
      market_cap: 68450000000,
      volume_24h: 2340000000,
      change_24h: 3.21,
      chain: 'Ethereum',
      updated_at: new Date().toISOString(),
    },
    {
      id: `MATIC-Polygon-${Date.now()}`,
      symbol: 'MATIC',
      name: 'Polygon',
      price: 0.94,
      market_cap: 8340000000,
      volume_24h: 450000000,
      change_24h: 1.15,
      chain: 'Polygon',
      updated_at: new Date().toISOString(),
    },
    {
      id: `ARB-Arbitrum-${Date.now()}`,
      symbol: 'ARB',
      name: 'Arbitrum',
      price: 1.28,
      market_cap: 5230000000,
      volume_24h: 180000000,
      change_24h: -0.45,
      chain: 'Arbitrum',
      updated_at: new Date().toISOString(),
    },
    {
      id: `OP-Optimism-${Date.now()}`,
      symbol: 'OP',
      name: 'Optimism',
      price: 2.45,
      market_cap: 2840000000,
      volume_24h: 95000000,
      change_24h: 2.67,
      chain: 'Optimism',
      updated_at: new Date().toISOString(),
    },
    {
      id: `AVAX-Ethereum-${Date.now()}`,
      symbol: 'AVAX',
      name: 'Avalanche',
      price: 38.5,
      market_cap: 13450000000,
      volume_24h: 450000000,
      change_24h: 1.92,
      chain: 'Ethereum',
      updated_at: new Date().toISOString(),
    },
    {
      id: `BASE-Base-${Date.now()}`,
      symbol: 'BASE',
      name: 'Base',
      price: 0.55,
      market_cap: 450000000,
      volume_24h: 15000000,
      change_24h: -1.23,
      chain: 'Base',
      updated_at: new Date().toISOString(),
    },
  ];

  marketDataList.forEach(data => upsertMarketData(data));

  // Create predictions
  const predictions: Prediction[] = [
    {
      id: uuidv4(),
      user_id: demoUserId,
      symbol: 'BTC',
      direction: 'up',
      stake: 500,
      potential_return: 1000,
      status: 'active',
      expiry_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      symbol: 'ETH',
      direction: 'up',
      stake: 250,
      potential_return: 550,
      status: 'active',
      expiry_time: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      symbol: 'SOL',
      direction: 'down',
      stake: 300,
      potential_return: 600,
      status: 'won',
      expiry_time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      closed_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
  ];

  predictions.forEach(pred => createPrediction(pred));

  // Create badges
  const badges: Badge[] = [
    {
      id: uuidv4(),
      user_id: demoUserId,
      badge_name: 'First Trade',
      description: 'Complete your first trade',
      earned: true,
      earned_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      badge_name: 'Bull Run',
      description: 'Win 5 consecutive predictions',
      earned: true,
      earned_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      badge_name: 'Hodler',
      description: 'Hold an asset for 30 days',
      earned: true,
      earned_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      badge_name: 'Cross-Chain Master',
      description: 'Trade on 5 different chains',
      earned: false,
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      badge_name: 'Prediction Pro',
      description: 'Win 10 predictions',
      earned: false,
    },
    {
      id: uuidv4(),
      user_id: demoUserId,
      badge_name: 'Million Dollar Trader',
      description: 'Trade $1M+ volume',
      earned: false,
    },
  ];

  badges.forEach(badge => createBadge(badge));

  console.log('Database seeded successfully');
}

// Helper function to generate a new user ID
export function generateUserId(): string {
  return uuidv4();
}
