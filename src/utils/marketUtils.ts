// Utility functions for market data operations

import { MarketData } from '../types';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(price);
}

export function formatPercentage(value: number): string {
  return `${(value >= 0 ? '+' : '')}${value.toFixed(2)}%`;
}

export function calculatePnL(entryPrice: number, currentPrice: number, quantity: number): number {
  return (currentPrice - entryPrice) * quantity;
}

export function calculatePnLPercentage(entryPrice: number, currentPrice: number): number {
  return ((currentPrice - entryPrice) / entryPrice) * 100;
}

export function formatVolume(volume: number): string {
  if (volume >= 1e9) return (volume / 1e9).toFixed(2) + 'B';
  if (volume >= 1e6) return (volume / 1e6).toFixed(2) + 'M';
  if (volume >= 1e3) return (volume / 1e3).toFixed(2) + 'K';
  return volume.toFixed(2);
}

export function formatMarketCap(marketCap: number): string {
  return `$${formatVolume(marketCap)}`;
}

export function getPriceChangeColor(change: number): 'green' | 'red' {
  return change >= 0 ? 'green' : 'red';
}

export function calculateMovingAverage(prices: number[], period: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      result.push(0);
    } else {
      const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push(sum / period);
    }
  }
  return result;
}

export function calculateVolatility(prices: number[]): number {
  if (prices.length < 2) return 0;
  const mean = prices.reduce((a, b) => a + b) / prices.length;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
}

export function filterMarketDataByChain(data: MarketData[], chain: string): MarketData[] {
  return data.filter(market => market.chain === chain);
}

export function sortMarketDataByChange(data: MarketData[], descending = true): MarketData[] {
  return [...data].sort((a, b) => {
    return descending ? b.changePercent24h - a.changePercent24h : a.changePercent24h - b.changePercent24h;
  });
}
