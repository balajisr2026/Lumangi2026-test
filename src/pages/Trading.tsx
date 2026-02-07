import { useState } from 'react';
import '../styles/trading.css';

export const Trading: React.FC = () => {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const pairs = [
    { pair: 'BTC/USDT', price: '$95,234', change: '+5.23%' },
    { pair: 'ETH/USDT', price: '$3,456', change: '+2.15%' },
    { pair: 'SOL/USDT', price: '$198.34', change: '-1.32%' },
    { pair: 'MATIC/USDT', price: '$0.89', change: '+4.56%' },
  ];

  const orderBook = {
    bids: [
      { price: '95,220', quantity: '2.5', total: '$238,050' },
      { price: '95,210', quantity: '5.0', total: '$476,050' },
      { price: '95,200', quantity: '3.2', total: '$304,640' },
    ],
    asks: [
      { price: '95,240', quantity: '1.8', total: '$171,432' },
      { price: '95,250', quantity: '4.5', total: '$428,625' },
      { price: '95,260', quantity: '2.1', total: '$200,046' },
    ],
  };

  return (
    <div className="trading">
      {/* Trading Header */}
      <div className="trading-header">
        <h1>Trading Terminal</h1>
        <p>Execute trades with advanced order management</p>
      </div>

      <div className="trading-container">
        {/* Trading Chart & Tools */}
        <div className="trading-main">
          {/* Market Selection */}
          <div className="market-selector">
            <div className="selector-header">
              <h3>Trading Pair</h3>
            </div>
            <div className="pair-list">
              {pairs.map((p) => (
                <button
                  key={p.pair}
                  className={`pair-btn ${selectedPair === p.pair ? 'active' : ''}`}
                  onClick={() => setSelectedPair(p.pair)}
                >
                  <div className="pair-info">
                    <span className="pair-name">{p.pair}</span>
                    <span className="pair-change">{p.change}</span>
                  </div>
                  <span className="pair-price">{p.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container">
            <div className="chart-header">
              <div className="chart-info">
                <h3>{selectedPair}</h3>
                <p className="chart-price">$95,234.50</p>
              </div>
              <div className="chart-controls">
                {['15m', '1h', '4h', '1D', '1W'].map((interval) => (
                  <button key={interval} className="interval-btn">
                    {interval}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart-placeholder">
              <svg viewBox="0 0 500 300" className="trading-chart">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#667eea', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <polyline points="0,200 50,150 100,160 150,100 200,130 250,90 300,110 350,70 400,95 450,50" 
                          fill="url(#chartGradient)" stroke="#667eea" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Order Book */}
          <div className="order-book">
            <div className="order-book-header">
              <h3>Order Book</h3>
            </div>
            <div className="order-book-content">
              <div className="order-book-section">
                <p className="section-title sell">Sell Orders</p>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderBook.asks.map((ask, idx) => (
                      <tr key={idx} className="ask-row">
                        <td className="price">{ask.price}</td>
                        <td className="quantity">{ask.quantity}</td>
                        <td className="total">{ask.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="spread-indicator">
                <p>Spread: 0.0011%</p>
              </div>

              <div className="order-book-section">
                <p className="section-title buy">Buy Orders</p>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderBook.bids.map((bid, idx) => (
                      <tr key={idx} className="bid-row">
                        <td className="price">{bid.price}</td>
                        <td className="quantity">{bid.quantity}</td>
                        <td className="total">{bid.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Form */}
        <div className="trading-form-container">
          <div className="form-card">
            <div className="form-tabs">
              <button
                className={`tab-btn ${orderType === 'buy' ? 'active' : ''}`}
                onClick={() => setOrderType('buy')}
              >
                Buy
              </button>
              <button
                className={`tab-btn ${orderType === 'sell' ? 'active' : ''}`}
                onClick={() => setOrderType('sell')}
              >
                Sell
              </button>
            </div>

            <form className="trading-form">
              <div className="form-group">
                <label>Price (USDT)</label>
                <div className="input-group">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <span className="currency">USDT</span>
                </div>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <div className="input-group">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <span className="currency">BTC</span>
                </div>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Order Value</span>
                  <span className="value">$0.00</span>
                </div>
                <div className="summary-row">
                  <span>Fees</span>
                  <span className="value">$0.00</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span className="value">$0.00</span>
                </div>
              </div>

              <div className="order-options">
                <label className="checkbox">
                  <input type="checkbox" />
                  <span>Post-only</span>
                </label>
                <label className="checkbox">
                  <input type="checkbox" />
                  <span>Reduce-only</span>
                </label>
              </div>

              <button
                type="submit"
                className={`submit-btn ${orderType}`}
              >
                {orderType === 'buy' ? '🟢 Buy' : '🔴 Sell'} BTC
              </button>
            </form>

            <div className="wallet-info">
              <p className="info-label">Wallet Balance</p>
              <p className="wallet-balance">2.5 BTC</p>
              <p className="wallet-value">$238,085.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <section className="recent-trades">
        <h3>Your Recent Trades</h3>
        <div className="trades-table-wrapper">
          <table className="trades-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Pair</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-02-07 14:32</td>
                <td><span className="badge buy">Buy</span></td>
                <td>BTC/USDT</td>
                <td>$95,100</td>
                <td>0.5</td>
                <td>$47,550</td>
                <td><span className="status filled">Filled</span></td>
              </tr>
              <tr>
                <td>2024-02-07 13:15</td>
                <td><span className="badge sell">Sell</span></td>
                <td>ETH/USDT</td>
                <td>$3,420</td>
                <td>5.0</td>
                <td>$17,100</td>
                <td><span className="status filled">Filled</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
