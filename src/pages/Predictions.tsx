import { useState } from 'react';
import '../styles/predictions.css';

export const Predictions: React.FC = () => {
  const [filter, setFilter] = useState('active');

  const predictions = [
    {
      id: 1,
      pair: 'BTC/USDT',
      prediction: 'Above $95,000',
      stake: 100,
      potential: 180,
      status: 'active',
      expiresIn: '2h 30m',
    },
    {
      id: 2,
      pair: 'ETH/USDT',
      prediction: 'Below $3,500',
      stake: 50,
      potential: 95,
      status: 'winning',
      expiresIn: '5h 15m',
    },
    {
      id: 3,
      pair: 'SOL/USDT',
      prediction: 'Above $200',
      stake: 75,
      potential: 150,
      status: 'losing',
      expiresIn: '1h 45m',
    },
  ];

  return (
    <div className="predictions">
      <div className="predictions-header">
        <h1>Market Predictions</h1>
        <p>Make predictions on market movements and earn rewards</p>
      </div>

      <div className="predictions-controls">
        <button className="create-btn">+ Create Prediction</button>
        <div className="filter-tabs">
          {['active', 'winning', 'losing', 'closed'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="predictions-grid">
        {predictions.map((p) => (
          <div key={p.id} className={`prediction-card ${p.status}`}>
            <div className="prediction-header">
              <h3>{p.pair}</h3>
              <span className={`status-badge ${p.status}`}>{p.status}</span>
            </div>
            <p className="prediction-text">{p.prediction}</p>
            <div className="prediction-stats">
              <div className="stat">
                <span className="label">Stake</span>
                <p className="value">${p.stake}</p>
              </div>
              <div className="stat">
                <span className="label">Potential</span>
                <p className="value">${p.potential}</p>
              </div>
              <div className="stat">
                <span className="label">Expires</span>
                <p className="value">{p.expiresIn}</p>
              </div>
            </div>
            <button className="action-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};
