// Market and Trading Types

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: Date;
  chain: string;
}

export interface MarketData {
  symbol: string;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  chain: string;
}

export interface Prediction {
  id: string;
  userId: string;
  symbol: string;
  predictedPrice: number;
  expiryTime: Date;
  amount: number;
  status: 'ACTIVE' | 'WON' | 'LOST' | 'EXPIRED';
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  walletAddress: string;
  totalTrades: number;
  winRate: number;
  badges: Badge[];
  reputation: number;
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Portfolio {
  userId: string;
  totalBalance: number;
  assets: Asset[];
  unrealizedPnL: number;
  realizedPnL: number;
}

export interface Asset {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  chain: string;
}

export interface ChainNetwork {
  id: string;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
  active: boolean;
}
