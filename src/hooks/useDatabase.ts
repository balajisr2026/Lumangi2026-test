import { useEffect, useState, useCallback } from 'react';
import {
  initializeDatabase,
  getUser,
  getPortfolio,
  getTrades,
  getAllMarketData,
  getPredictions,
  getUserBadges,
  updatePortfolioItem,
  createTrade,
  createPrediction,
  updatePredictionStatus,
  type User,
  type Portfolio,
  type Trade,
  type MarketData,
  type Prediction,
  type Badge,
} from '../db/database';
import { seedDatabase } from '../db/seedData';

export interface UseDatabase {
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  currentUser: User | null;
  portfolio: Portfolio[];
  trades: Trade[];
  marketData: MarketData[];
  predictions: Prediction[];
  badges: Badge[];
  refetchData: () => Promise<void>;
  setCurrentUser: (userId: string) => void;
}

export function useDatabase(): UseDatabase {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(
    localStorage.getItem('currentUserId')
  );

  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);

  // Initialize database on component mount
  useEffect(() => {
    const initDb = async () => {
      try {
        setIsLoading(true);
        await initializeDatabase();
        await seedDatabase();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize database'));
        console.error('Database initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initDb();
  }, []);

  // Fetch user data when currentUserId changes
  useEffect(() => {
    if (!isInitialized || !currentUserId) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const user = getUser(currentUserId);
        const portfolioData = getPortfolio(currentUserId);
        const tradesData = getTrades(currentUserId);
        const marketDataAll = getAllMarketData();
        const predictionsData = getPredictions(currentUserId);
        const badgesData = getUserBadges(currentUserId);

        setCurrentUserState(user);
        setPortfolio(portfolioData);
        setTrades(tradesData);
        setMarketData(marketDataAll);
        setPredictions(predictionsData);
        setBadges(badgesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch user data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isInitialized, currentUserId]);

  const refetchData = useCallback(async () => {
    if (!isInitialized || !currentUserId) return;

    try {
      setIsLoading(true);
      const user = getUser(currentUserId);
      const portfolioData = getPortfolio(currentUserId);
      const tradesData = getTrades(currentUserId);
      const marketDataAll = getAllMarketData();
      const predictionsData = getPredictions(currentUserId);
      const badgesData = getUserBadges(currentUserId);

      setCurrentUserState(user);
      setPortfolio(portfolioData);
      setTrades(tradesData);
      setMarketData(marketDataAll);
      setPredictions(predictionsData);
      setBadges(badgesData);
    } catch (err) {
      console.error('Failed to refetch data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized, currentUserId]);

  const setCurrentUser = useCallback((userId: string) => {
    setCurrentUserId(userId);
    localStorage.setItem('currentUserId', userId);
  }, []);

  return {
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
  };
}

export { createTrade, createPrediction, updatePredictionStatus, updatePortfolioItem };
