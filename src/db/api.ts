/**
 * Database API - Simplified interface for database operations
 * This file provides convenient methods for common database operations
 */

import { v4 as uuidv4 } from 'uuid';
import {
  createUser,
  updateUser,
  createTrade,
  addPortfolioItem,
  createPrediction,
  updatePredictionStatus,
  getAllMarketData,
  searchMarketData,
  getTrades,
  getPortfolio,
  getPredictions,
  updatePortfolioItem,
  type User,
  type Trade,
  type Portfolio,
  type Prediction,
  type MarketData,
} from './database';

// ====== USER API ======

export async function createNewUser(username: string, walletAddress: string): Promise<User> {
  const user: User = {
    id: uuidv4(),
    username,
    wallet_address: walletAddress,
    total_balance: 100000, // Starting balance
    unrealized_pnl: 0,
    realized_pnl: 0,
    level: 1,
    reputation: 0,
    rank: 0,
    win_streak: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  createUser(user);
  return user;
}

export async function updateUserBalance(
  userId: string,
  totalBalance: number,
  unrealizedPnL?: number
): Promise<void> {
  const updates: any = {
    total_balance: totalBalance,
    updated_at: new Date().toISOString(),
  };

  if (unrealizedPnL !== undefined) {
    updates.unrealized_pnl = unrealizedPnL;
  }

  updateUser(userId, updates);
}

// ====== TRADING API ======

export async function executeTrade(
  userId: string,
  pair: string,
  type: 'buy' | 'sell',
  quantity: number,
  price: number,
  chain: string
): Promise<Trade> {
  const total = quantity * price;
  const trade: Trade = {
    id: uuidv4(),
    user_id: userId,
    pair,
    type,
    quantity,
    price,
    total,
    chain,
    status: 'filled',
    timestamp: new Date().toISOString(),
  };

  createTrade(trade);
  return trade;
}

export async function getRecentTrades(userId: string, limit?: number): Promise<Trade[]> {
  const trades = getTrades(userId);
  return limit ? trades.slice(0, limit) : trades;
}

// ====== PORTFOLIO API ======

export async function addAssetToPortfolio(
  userId: string,
  symbol: string,
  quantity: number,
  price: number,
  chain: string
): Promise<Portfolio> {
  const item: Portfolio = {
    id: uuidv4(),
    user_id: userId,
    asset_symbol: symbol,
    quantity,
    average_price: price,
    current_price: price,
    chain,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  addPortfolioItem(item);
  return item;
}

export async function updateAssetPrice(
  userId: string,
  symbol: string,
  chain: string,
  newPrice: number
): Promise<void> {
  const portfolio = getPortfolio(userId);
  const item = portfolio.find(p => p.asset_symbol === symbol && p.chain === chain);

  if (item) {
    updatePortfolioItem(item.id, {
      current_price: newPrice,
      updated_at: new Date().toISOString(),
    });
  }
}

// ====== MARKET DATA API ======

export async function getMarketTokens(chain?: string): Promise<MarketData[]> {
  return getAllMarketData(chain);
}

export async function searchTokens(searchTerm: string, chain?: string): Promise<MarketData[]> {
  return searchMarketData(searchTerm, chain);
}

// ====== PREDICTIONS API ======

export async function placePrediction(
  userId: string,
  symbol: string,
  direction: 'up' | 'down',
  stake: number,
  potentialReturn: number,
  expiryTime: Date
): Promise<Prediction> {
  const prediction: Prediction = {
    id: uuidv4(),
    user_id: userId,
    symbol,
    direction,
    stake,
    potential_return: potentialReturn,
    status: 'active',
    expiry_time: expiryTime.toISOString(),
    created_at: new Date().toISOString(),
  };

  createPrediction(prediction);
  return prediction;
}

export async function resolvePrediction(
  predictionId: string,
  won: boolean
): Promise<void> {
  const status = won ? 'won' : 'lost';
  updatePredictionStatus(predictionId, status, new Date().toISOString());
}

export async function getUserPredictions(userId: string, filter?: string): Promise<Prediction[]> {
  return getPredictions(userId, filter);
}

// ====== UTILITY FUNCTIONS ======

/**
 * Calculate percentage change
 */
export function calculatePnL(
  openPrice: number,
  closePrice: number,
  quantity: number
): { pnl: number; pnlPercent: number } {
  const pnl = (closePrice - openPrice) * quantity;
  const pnlPercent = ((closePrice - openPrice) / openPrice) * 100;
  return { pnl, pnlPercent };
}

/**
 * Format currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

/**
 * Calculate portfolio distribution
 */
export function calculatePortfolioDistribution(
  portfolio: Portfolio[]
): Array<{ symbol: string; value: number; percentage: number }> {
  const total = portfolio.reduce((sum, item) => sum + item.quantity * item.current_price, 0);

  return portfolio.map(item => ({
    symbol: item.asset_symbol,
    value: item.quantity * item.current_price,
    percentage: (item.quantity * item.current_price) / total * 100,
  }));
}

/**
 * Calculate portfolio metrics
 */
export function calculatePortfolioMetrics(
  portfolio: Portfolio[],
  trades: Trade[]
): {
  totalValue: number;
  totalInvested: number;
  unrealizedPnL: number;
  realizedPnL: number;
  roi: number;
} {
  const totalValue = portfolio.reduce((sum, item) => sum + item.quantity * item.current_price, 0);

  const buyTrades = trades.filter(t => t.type === 'buy');
  const sellTrades = trades.filter(t => t.type === 'sell');

  const totalInvested = buyTrades.reduce((sum, t) => sum + t.total, 0);
  const totalSold = sellTrades.reduce((sum, t) => sum + t.total, 0);

  const realizedPnL = totalSold - buyTrades.filter(t => sellTrades.some(s => s.pair === t.pair)).reduce((sum, t) => sum + t.total, 0);
  const unrealizedPnL = totalValue - totalInvested;
  const roi = totalInvested > 0 ? ((unrealizedPnL + realizedPnL) / totalInvested) * 100 : 0;

  return {
    totalValue,
    totalInvested,
    unrealizedPnL,
    realizedPnL,
    roi,
  };
}

/**
 * Get top performing assets
 */
export function getTopPerformers(
  portfolio: Portfolio[],
  limit: number = 5
): Array<Portfolio & { gain: number; gainPercent: number }> {
  return portfolio
    .map(item => ({
      ...item,
      gain: (item.current_price - item.average_price) * item.quantity,
      gainPercent: ((item.current_price - item.average_price) / item.average_price) * 100,
    }))
    .sort((a, b) => b.gainPercent - a.gainPercent)
    .slice(0, limit);
}

/**
 * Export user data as JSON
 */
export function exportUserData(
  user: User,
  portfolio: Portfolio[],
  trades: Trade[],
  predictions: Prediction[]
): string {
  const data = {
    user,
    portfolio,
    trades,
    predictions,
    exportedAt: new Date().toISOString(),
  };

  return JSON.stringify(data, null, 2);
}
