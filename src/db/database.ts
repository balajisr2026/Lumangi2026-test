import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';

let db: SqlJsDatabase | null = null;
let SQL: any = null;

export interface User {
  id: string;
  username: string;
  wallet_address: string;
  total_balance: number;
  unrealized_pnl: number;
  realized_pnl: number;
  level: number;
  reputation: number;
  rank: number;
  win_streak: number;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  asset_symbol: string;
  quantity: number;
  average_price: number;
  current_price: number;
  chain: string;
  created_at: string;
  updated_at: string;
}

export interface Trade {
  id: string;
  user_id: string;
  pair: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  chain: string;
  status: 'pending' | 'filled' | 'cancelled';
  timestamp: string;
}

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  market_cap: number;
  volume_24h: number;
  change_24h: number;
  chain: string;
  updated_at: string;
}

export interface Prediction {
  id: string;
  user_id: string;
  symbol: string;
  direction: 'up' | 'down';
  stake: number;
  potential_return: number;
  status: 'active' | 'won' | 'lost' | 'closed';
  expiry_time: string;
  created_at: string;
  closed_at?: string;
}

export interface Badge {
  id: string;
  user_id: string;
  badge_name: string;
  description: string;
  earned: boolean;
  earned_date?: string;
}

/**
 * Initialize the SQLite database
 */
export async function initializeDatabase(): Promise<void> {
  if (db) return;

  try {
    SQL = await initSqlJs();
    
    // Try to load from localStorage
    const savedDb = localStorage.getItem('lumanagi_db');
    if (savedDb) {
      const buffer = new Uint8Array(JSON.parse(savedDb));
      db = new SQL.Database(buffer);
    } else {
      db = new SQL.Database();
    }

    createTables();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

/**
 * Create all database tables
 */
function createTables(): void {
  if (!db) throw new Error('Database not initialized');

  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      wallet_address TEXT NOT NULL UNIQUE,
      total_balance REAL DEFAULT 0,
      unrealized_pnl REAL DEFAULT 0,
      realized_pnl REAL DEFAULT 0,
      level INTEGER DEFAULT 1,
      reputation INTEGER DEFAULT 0,
      rank INTEGER DEFAULT 0,
      win_streak INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS portfolio (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      asset_symbol TEXT NOT NULL,
      quantity REAL NOT NULL,
      average_price REAL NOT NULL,
      current_price REAL NOT NULL,
      chain TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, asset_symbol, chain)
    )`,

    `CREATE TABLE IF NOT EXISTS trades (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      pair TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('buy', 'sell')),
      quantity REAL NOT NULL,
      price REAL NOT NULL,
      total REAL NOT NULL,
      chain TEXT NOT NULL,
      status TEXT DEFAULT 'filled' CHECK(status IN ('pending', 'filled', 'cancelled')),
      timestamp TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS market_data (
      id TEXT PRIMARY KEY,
      symbol TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      market_cap REAL NOT NULL,
      volume_24h REAL NOT NULL,
      change_24h REAL NOT NULL,
      chain TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(symbol, chain)
    )`,

    `CREATE TABLE IF NOT EXISTS predictions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      symbol TEXT NOT NULL,
      direction TEXT NOT NULL CHECK(direction IN ('up', 'down')),
      stake REAL NOT NULL,
      potential_return REAL NOT NULL,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'won', 'lost', 'closed')),
      expiry_time TEXT NOT NULL,
      created_at TEXT NOT NULL,
      closed_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS badges (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      badge_name TEXT NOT NULL,
      description TEXT NOT NULL,
      earned INTEGER DEFAULT 0,
      earned_date TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, badge_name)
    )`
  ];

  queries.forEach(query => {
    db!.run(query);
  });

  saveDatabase();
}

/**
 * Save database to localStorage
 */
export function saveDatabase(): void {
  if (!db) throw new Error('Database not initialized');
  try {
    const data = db.export();
    const arr = Array.from(data);
    localStorage.setItem('lumanagi_db', JSON.stringify(arr));
  } catch (error) {
    console.error('Failed to save database:', error);
  }
}

/**
 * Execute a query and return results
 */
function executeQuery(query: string, params: any[] = []): any[] {
  if (!db) throw new Error('Database not initialized');
  const stmt = db.prepare(query);
  stmt.bind(params);
  const results: any[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

/**
 * Execute an insert/update/delete query
 */
function executeUpdate(query: string, params: any[] = []): void {
  if (!db) throw new Error('Database not initialized');
  db.run(query, params);
  saveDatabase();
}

// ====== USER OPERATIONS ======

export function createUser(user: User): void {
  const query = `INSERT INTO users (
    id, username, wallet_address, total_balance, unrealized_pnl, realized_pnl,
    level, reputation, rank, win_streak, created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  executeUpdate(query, [
    user.id, user.username, user.wallet_address, user.total_balance,
    user.unrealized_pnl, user.realized_pnl, user.level, user.reputation,
    user.rank, user.win_streak, user.created_at, user.updated_at
  ]);
}

export function getUser(userId: string): User | null {
  const results = executeQuery('SELECT * FROM users WHERE id = ?', [userId]);
  return results.length > 0 ? (results[0] as User) : null;
}

export function getUserByUsername(username: string): User | null {
  const results = executeQuery('SELECT * FROM users WHERE username = ?', [username]);
  return results.length > 0 ? (results[0] as User) : null;
}

export function updateUser(userId: string, updates: Partial<User>): void {
  const fields = Object.keys(updates)
    .filter(key => key !== 'id')
    .map(key => `${key} = ?`)
    .join(', ');

  const values = Object.keys(updates)
    .filter(key => key !== 'id')
    .map(key => (updates as any)[key]);

  const query = `UPDATE users SET ${fields}, updated_at = ? WHERE id = ?`;
  executeUpdate(query, [...values, new Date().toISOString(), userId]);
}

export function getAllUsers(): User[] {
  return executeQuery('SELECT * FROM users') as User[];
}

// ====== PORTFOLIO OPERATIONS ======

export function addPortfolioItem(item: Portfolio): void {
  const query = `INSERT OR REPLACE INTO portfolio (
    id, user_id, asset_symbol, quantity, average_price, current_price, chain, created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  executeUpdate(query, [
    item.id, item.user_id, item.asset_symbol, item.quantity,
    item.average_price, item.current_price, item.chain, item.created_at, item.updated_at
  ]);
}

export function getPortfolio(userId: string): Portfolio[] {
  return executeQuery(
    'SELECT * FROM portfolio WHERE user_id = ? ORDER BY updated_at DESC',
    [userId]
  ) as Portfolio[];
}

export function updatePortfolioItem(itemId: string, updates: Partial<Portfolio>): void {
  const fields = Object.keys(updates)
    .filter(key => key !== 'id')
    .map(key => `${key} = ?`)
    .join(', ');

  const values = Object.keys(updates)
    .filter(key => key !== 'id')
    .map(key => (updates as any)[key]);

  const query = `UPDATE portfolio SET ${fields}, updated_at = ? WHERE id = ?`;
  executeUpdate(query, [...values, new Date().toISOString(), itemId]);
}

export function removePortfolioItem(itemId: string): void {
  executeUpdate('DELETE FROM portfolio WHERE id = ?', [itemId]);
}

// ====== TRADE OPERATIONS ======

export function createTrade(trade: Trade): void {
  const query = `INSERT INTO trades (
    id, user_id, pair, type, quantity, price, total, chain, status, timestamp
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  executeUpdate(query, [
    trade.id, trade.user_id, trade.pair, trade.type, trade.quantity,
    trade.price, trade.total, trade.chain, trade.status, trade.timestamp
  ]);
}

export function getTrades(userId: string): Trade[] {
  return executeQuery(
    'SELECT * FROM trades WHERE user_id = ? ORDER BY timestamp DESC',
    [userId]
  ) as Trade[];
}

export function getTradesByChain(userId: string, chain: string): Trade[] {
  return executeQuery(
    'SELECT * FROM trades WHERE user_id = ? AND chain = ? ORDER BY timestamp DESC',
    [userId, chain]
  ) as Trade[];
}

export function updateTradeStatus(tradeId: string, status: 'pending' | 'filled' | 'cancelled'): void {
  executeUpdate('UPDATE trades SET status = ? WHERE id = ?', [status, tradeId]);
}

// ====== MARKET DATA OPERATIONS ======

export function upsertMarketData(data: MarketData): void {
  const query = `INSERT OR REPLACE INTO market_data (
    id, symbol, name, price, market_cap, volume_24h, change_24h, chain, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  executeUpdate(query, [
    data.id, data.symbol, data.name, data.price, data.market_cap,
    data.volume_24h, data.change_24h, data.chain, data.updated_at
  ]);
}

export function getMarketData(symbol: string, chain: string): MarketData | null {
  const results = executeQuery(
    'SELECT * FROM market_data WHERE symbol = ? AND chain = ?',
    [symbol, chain]
  );
  return results.length > 0 ? (results[0] as MarketData) : null;
}

export function getAllMarketData(chain?: string): MarketData[] {
  const query = chain
    ? 'SELECT * FROM market_data WHERE chain = ? ORDER BY market_cap DESC'
    : 'SELECT * FROM market_data ORDER BY market_cap DESC';
  const params = chain ? [chain] : [];
  return executeQuery(query, params) as MarketData[];
}

export function searchMarketData(searchTerm: string, chain?: string): MarketData[] {
  const query = chain
    ? `SELECT * FROM market_data WHERE (symbol LIKE ? OR name LIKE ?) AND chain = ? ORDER BY market_cap DESC`
    : `SELECT * FROM market_data WHERE symbol LIKE ? OR name LIKE ? ORDER BY market_cap DESC`;
  const term = `%${searchTerm}%`;
  const params = chain ? [term, term, chain] : [term, term];
  return executeQuery(query, params) as MarketData[];
}

// ====== PREDICTION OPERATIONS ======

export function createPrediction(prediction: Prediction): void {
  const query = `INSERT INTO predictions (
    id, user_id, symbol, direction, stake, potential_return, status, expiry_time, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  executeUpdate(query, [
    prediction.id, prediction.user_id, prediction.symbol, prediction.direction,
    prediction.stake, prediction.potential_return, prediction.status,
    prediction.expiry_time, prediction.created_at
  ]);
}

export function getPredictions(userId: string, status?: string): Prediction[] {
  const query = status
    ? 'SELECT * FROM predictions WHERE user_id = ? AND status = ? ORDER BY created_at DESC'
    : 'SELECT * FROM predictions WHERE user_id = ? ORDER BY created_at DESC';
  const params = status ? [userId, status] : [userId];
  return executeQuery(query, params) as Prediction[];
}

export function updatePredictionStatus(
  predictionId: string,
  status: 'active' | 'won' | 'lost' | 'closed',
  closedAt?: string
): void {
  const query = closedAt
    ? 'UPDATE predictions SET status = ?, closed_at = ? WHERE id = ?'
    : 'UPDATE predictions SET status = ? WHERE id = ?';
  const params = closedAt ? [status, closedAt, predictionId] : [status, predictionId];
  executeUpdate(query, params);
}

// ====== BADGE OPERATIONS ======

export function createBadge(badge: Badge): void {
  const query = `INSERT OR REPLACE INTO badges (
    id, user_id, badge_name, description, earned, earned_date
  ) VALUES (?, ?, ?, ?, ?, ?)`;

  executeUpdate(query, [
    badge.id, badge.user_id, badge.badge_name, badge.description,
    badge.earned ? 1 : 0, badge.earned_date || null
  ]);
}

export function getUserBadges(userId: string): Badge[] {
  return executeQuery(
    'SELECT * FROM badges WHERE user_id = ? ORDER BY earned DESC, badge_name ASC',
    [userId]
  ) as Badge[];
}

export function awardBadge(userId: string, badgeName: string): void {
  const query = `UPDATE badges SET earned = 1, earned_date = ? WHERE user_id = ? AND badge_name = ?`;
  executeUpdate(query, [new Date().toISOString(), userId, badgeName]);
}

// ====== DATABASE MANAGEMENT ======

export function clearDatabase(): void {
  if (!db) throw new Error('Database not initialized');
  const tables = ['badges', 'predictions', 'trades', 'market_data', 'portfolio', 'users'];
  tables.forEach(table => {
    db!.run(`DELETE FROM ${table}`);
  });
  saveDatabase();
}

export function exportDatabase(): string {
  if (!db) throw new Error('Database not initialized');
  const data = db.export();
  const arr = Array.from(data);
  return JSON.stringify(arr);
}

export function importDatabase(jsonData: string): void {
  if (!db) throw new Error('Database not initialized');
  try {
    const arr = JSON.parse(jsonData);
    const buffer = new Uint8Array(arr);
    db = new SQL.Database(buffer);
    saveDatabase();
  } catch (error) {
    console.error('Failed to import database:', error);
    throw error;
  }
}

export function getDatabase(): SqlJsDatabase {
  if (!db) throw new Error('Database not initialized');
  return db;
}
