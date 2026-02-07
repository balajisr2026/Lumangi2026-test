import { useState } from 'react';
import '../styles/dashboard.css';

export const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('24h');

  const topTokens = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$95,234', change: '+5.23%', volume: '$2.1B', trend: 'up' },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,456', change: '+2.15%', volume: '$1.2B', trend: 'up' },
    { symbol: 'SOL', name: 'Solana', price: '$198.34', change: '-1.32%', volume: '$856M', trend: 'down' },
    { symbol: 'AVAX', name: 'Avalanche', price: '$124.56', change: '+3.45%', volume: '$234M', trend: 'up' },
  ];

  const portfolioMetrics = [
    { label: 'Total Balance', value: '$125,420.50', change: '+12.5%' },
    { label: '24h Profit/Loss', value: '$2,450.00', change: '+1.9%' },
    { label: 'Total Trades', value: '234', change: '0%' },
    { label: 'Win Rate', value: '68.5%', change: '+2.3%' },
  ];

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome back, Trader!</h1>
          <p>Monitor your portfolio and explore trading opportunities</p>
        </div>
        <button className="quick-trade-btn">Quick Trade</button>
      </section>

      {/* Portfolio Overview */}
      <section className="portfolio-overview">
        <div className="metrics-grid">
          {portfolioMetrics.map((metric, idx) => (
            <div key={idx} className="metric-card">
              <p className="metric-label">{metric.label}</p>
              <h3 className="metric-value">{metric.value}</h3>
              <span className={`metric-change ${metric.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {metric.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Portfolio Performance</h3>
            <div className="timeframe-selector">
              {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
                <button
                  key={tf}
                  className={`tf-btn ${timeframe === tf ? 'active' : ''}`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-placeholder">
            <div className="chart-mock">
              <svg viewBox="0 0 400 200" className="chart-line">
                <polyline points="0,150 50,120 100,140 150,80 200,100 250,60 300,90 350,40 400,70" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h3>Quick Stats</h3>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Active Positions</span>
              <span className="stat-value">12</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Pending Orders</span>
              <span className="stat-value">3</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Next Prediction Expires</span>
              <span className="stat-value">2h 15m</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Current Streak</span>
              <span className="stat-value">5W ✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Movers */}
      <section className="top-movers-section">
        <div className="section-header">
          <h3>Top Movers</h3>
          <a href="/market" className="view-all">View All →</a>
        </div>
        <div className="movers-grid">
          {topTokens.map((token) => (
            <div key={token.symbol} className={`token-card ${token.trend}`}>
              <div className="token-header">
                <div>
                  <p className="token-symbol">{token.symbol}</p>
                  <p className="token-name">{token.name}</p>
                </div>
                <span className="trend-indicator">
                  {token.trend === 'up' ? '📈' : '📉'}
                </span>
              </div>
              <div className="token-body">
                <p className="token-price">{token.price}</p>
                <p className={`token-change ${token.trend === 'up' ? 'positive' : 'negative'}`}>
                  {token.change}
                </p>
              </div>
              <p className="token-volume">{token.volume} Vol</p>
              <button className="trade-token-btn">Trade</button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <span className="action-icon">💳</span>
            <span className="action-label">Deposit</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🔄</span>
            <span className="action-label">Swap</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🎯</span>
            <span className="action-label">Make Prediction</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📊</span>
            <span className="action-label">Analytics</span>
          </button>
        </div>
      </section>
    </div>
  );
};
