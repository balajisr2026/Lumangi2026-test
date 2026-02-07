import { useState } from 'react';
import '../styles/market.css';

export const Market: React.FC = () => {
  const [sortBy, setSortBy] = useState('marketCap');
  const [filterChain, setFilterChain] = useState('all');

  const marketData = [
    { rank: 1, symbol: 'BTC', name: 'Bitcoin', price: '$95,234', change24h: '+5.23%', volume: '$2.1B', marketCap: '$1.89T', chain: 'Bitcoin' },
    { rank: 2, symbol: 'ETH', name: 'Ethereum', price: '$3,456', change24h: '+2.15%', volume: '$1.2B', marketCap: '$415B', chain: 'Ethereum' },
    { rank: 3, symbol: 'SOL', name: 'Solana', price: '$198.34', change24h: '-1.32%', volume: '$856M', marketCap: '$89B', chain: 'Solana' },
    { rank: 4, symbol: 'MATIC', name: 'Polygon', price: '$0.89', change24h: '+4.56%', volume: '$234M', marketCap: '$8.2B', chain: 'Polygon' },
    { rank: 5, symbol: 'ARB', name: 'Arbitrum', price: '$1.23', change24h: '+3.21%', volume: '$450M', marketCap: '$4.5B', chain: 'Arbitrum' },
    { rank: 6, symbol: 'OP', name: 'Optimism', price: '$3.45', change24h: '+2.98%', volume: '$320M', marketCap: '$1.8B', chain: 'Optimism' },
  ];

  return (
    <div className="market">
      {/* Market Header */}
      <div className="market-header">
        <div className="header-content">
          <h1>Market Overview</h1>
          <p>Explore tokens across multiple blockchain networks</p>
        </div>
      </div>

      {/* Controls */}
      <div className="market-controls">
        <div className="controls-left">
          <select 
            className="filter-select" 
            value={filterChain} 
            onChange={(e) => setFilterChain(e.target.value)}
          >
            <option value="all">All Chains</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="optimism">Optimism</option>
          </select>

          <div className="search-box">
            <input type="text" placeholder="Search tokens..." />
            <button>🔍</button>
          </div>
        </div>

        <div className="controls-right">
          <select 
            className="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="marketCap">Market Cap</option>
            <option value="volume">Volume</option>
            <option value="change">24h Change</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Market Table */}
      <div className="market-table-container">
        <table className="market-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Token</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>24h Volume</th>
              <th>Market Cap</th>
              <th>Chain</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((token) => (
              <tr key={token.symbol} className={`table-row ${token.change24h.startsWith('+') ? 'positive' : 'negative'}`}>
                <td className="rank-cell">{token.rank}</td>
                <td className="token-cell">
                  <div className="token-info">
                    <span className="token-icon">
                      {token.symbol[0]}
                    </span>
                    <div>
                      <p className="token-symbol">{token.symbol}</p>
                      <p className="token-name">{token.name}</p>
                    </div>
                  </div>
                </td>
                <td className="price-cell">{token.price}</td>
                <td className="change-cell">
                  <span className={`change ${token.change24h.startsWith('+') ? 'positive' : 'negative'}`}>
                    {token.change24h.startsWith('+') ? '📈' : '📉'} {token.change24h}
                  </span>
                </td>
                <td className="volume-cell">{token.volume}</td>
                <td className="cap-cell">{token.marketCap}</td>
                <td className="chain-cell">
                  <span className="chain-badge">{token.chain}</span>
                </td>
                <td className="action-cell">
                  <button className="trade-btn">Trade</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Market Stats */}
      <section className="market-stats">
        <h3>Market Statistics</h3>
        <div className="stats-grid">
          <div className="stat-box">
            <p className="stat-title">Total Market Cap</p>
            <p className="stat-value">$2.45T</p>
            <span className="stat-change positive">+2.5% (24h)</span>
          </div>
          <div className="stat-box">
            <p className="stat-title">24h Volume</p>
            <p className="stat-value">$85.4B</p>
            <span className="stat-change positive">+5.2% (24h)</span>
          </div>
          <div className="stat-box">
            <p className="stat-title">BTC Dominance</p>
            <p className="stat-value">52.3%</p>
            <span className="stat-change positive">+1.2% (24h)</span>
          </div>
          <div className="stat-box">
            <p className="stat-title">Fear & Greed Index</p>
            <p className="stat-value">72</p>
            <span className="stat-change positive">Greed 😋</span>
          </div>
        </div>
      </section>
    </div>
  );
};
