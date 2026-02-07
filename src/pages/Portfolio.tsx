import React from 'react';
import '../styles/portfolio.css';

export const Portfolio: React.FC = () => {
  const assets = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 2.5, price: '$95,234', total: '$238,085', change: '+5.2%' },
    { symbol: 'ETH', name: 'Ethereum', amount: 15.0, price: '$3,456', total: '$51,840', change: '+2.1%' },
    { symbol: 'SOL', name: 'Solana', amount: 100.0, price: '$198.34', total: '$19,834', change: '-1.3%' },
    { symbol: 'MATIC', name: 'Polygon', amount: 500.0, price: '$0.89', total: '$445', change: '+4.5%' },
  ];

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <h1>Your Portfolio</h1>
        <p>Manage and track your digital assets</p>
      </div>

      <div className="portfolio-summary">
        <div className="summary-card">
          <p className="card-label">Total Balance</p>
          <h2 className="card-value">$310,204.00</h2>
          <span className="card-change positive">+5.1% (24h)</span>
        </div>
        <div className="summary-card">
          <p className="card-label">Unrealized P&L</p>
          <h2 className="card-value positive">+$15,820.50</h2>
          <span className="card-change">5.3% return</span>
        </div>
        <div className="summary-card">
          <p className="card-label">Realized P&L</p>
          <h2 className="card-value positive">+$3,450.00</h2>
          <span className="card-change">Closed trades</span>
        </div>
        <div className="summary-card">
          <p className="card-label">Assets Count</p>
          <h2 className="card-value">4</h2>
          <span className="card-change">Active holdings</span>
        </div>
      </div>

      <div className="portfolio-holdings">
        <div className="holdings-header">
          <h3>Holdings</h3>
          <button className="add-asset-btn">+ Add Asset</button>
        </div>
        <div className="holdings-table-wrapper">
          <table className="holdings-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>24h Change</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.symbol}>
                  <td className="asset-name">
                    <span className="asset-icon">{asset.symbol[0]}</span>
                    <div>
                      <p className="symbol">{asset.symbol}</p>
                      <p className="name">{asset.name}</p>
                    </div>
                  </td>
                  <td>{asset.amount}</td>
                  <td>{asset.price}</td>
                  <td className="value-cell">{asset.total}</td>
                  <td className={`change-cell ${asset.change.startsWith('+') ? 'positive' : 'negative'}`}>
                    {asset.change.startsWith('+') ? '📈' : '📉'} {asset.change}
                  </td>
                  <td className="action-cell">
                    <button className="action-btn">Sell</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="portfolio-distribution">
        <h3>Asset Distribution</h3>
        <div className="distribution-chart">
          <div className="distribution-row">
            <span className="distribution-label">BTC</span>
            <div className="distribution-bar">
              <div className="distribution-fill" style={{ width: '77%' }}></div>
            </div>
            <span className="distribution-value">77%</span>
          </div>
          <div className="distribution-row">
            <span className="distribution-label">ETH</span>
            <div className="distribution-bar">
              <div className="distribution-fill" style={{ width: '17%' }}></div>
            </div>
            <span className="distribution-value">17%</span>
          </div>
          <div className="distribution-row">
            <span className="distribution-label">SOL</span>
            <div className="distribution-bar">
              <div className="distribution-fill" style={{ width: '6%' }}></div>
            </div>
            <span className="distribution-value">6%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
