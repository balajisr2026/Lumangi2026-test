import React from 'react';
import '../styles/engagement.css';

export const Engagement: React.FC = () => {
  const badges = [
    { id: 1, name: 'First Trade', icon: '🎉', description: 'Completed first trade', earned: true, earnedDate: '2024-01-15' },
    { id: 2, name: '100 Trades', icon: '⭐', description: 'Completed 100 trades', earned: true, earnedDate: '2024-02-01' },
    { id: 3, name: 'Trading Master', icon: '👑', description: 'Win 10 consecutive trades', earned: false, progress: 7 },
    { id: 4, name: 'Perfect Weekday', icon: '🎯', description: '5 predictions in a row won', earned: false, progress: 3 },
    { id: 5, name: 'Portfolio Hero', icon: '💎', description: 'Reach $500k portfolio', earned: false, progress: 62 },
    { id: 6, name: 'Prediction Guru', icon: '🔮', description: '100% accuracy on 50 predictions', earned: false, progress: 25 },
  ];

  const leaderboard = [
    { rank: 1, username: 'TradeLord', reputation: 15480, wins: 234 },
    { rank: 2, username: 'CryptoNinja', reputation: 14320, wins: 198 },
    { rank: 3, username: 'You', reputation: 2450, wins: 45 },
  ];

  return (
    <div className="engagement">
      <div className="engagement-header">
        <h1>User Engagement & Community</h1>
        <p>Earn badges, compete in tournaments, and build your trading reputation</p>
      </div>

      {/* User Stats */}
      <div className="user-stats">
        <div className="stat-box">
          <p className="stat-label">Your Level</p>
          <h2 className="stat-value">Gold</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
          <p className="progress-text">650/1000 XP to Platinum</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Reputation Points</p>
          <h2 className="stat-value">2,450</h2>
          <span className="stat-change positive">+125 this week</span>
        </div>
        <div className="stat-box">
          <p className="stat-label">Global Rank</p>
          <h2 className="stat-value">#156</h2>
          <span className="stat-change positive">↑ 12 this month</span>
        </div>
        <div className="stat-box">
          <p className="stat-label">Win Streak</p>
          <h2 className="stat-value">7</h2>
          <span className="stat-change">Trading wins</span>
        </div>
      </div>

      {/* Badges Section */}
      <section className="badges-section">
        <h3>Your Badges</h3>
        <div className="badges-grid">
          {badges.map((badge) => (
            <div key={badge.id} className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}>
              <div className="badge-icon">{badge.icon}</div>
              <p className="badge-name">{badge.name}</p>
              <p className="badge-description">{badge.description}</p>
              {badge.earned && <p className="earned-date">Earned: {badge.earnedDate}</p>}
              {!badge.earned && (
                <div className="progress-section">
                  <div className="mini-progress">
                    <div className="mini-fill" style={{ width: `${badge.progress}%` }}></div>
                  </div>
                  <p className="progress-text">{badge.progress}% complete</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="leaderboard-section">
        <div className="leaderboard-header">
          <h3>Top Traders</h3>
          <button className="view-all-btn">View Full Leaderboard →</button>
        </div>
        <div className="leaderboard-table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Reputation</th>
                <th>Wins</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((trader) => (
                <tr key={trader.rank} className={trader.username === 'You' ? 'current-user' : ''}>
                  <td className="rank-badge">
                    {trader.rank === 1 && '🥇'}
                    {trader.rank === 2 && '🥈'}
                    {trader.rank === 3 && '🥉'}
                    {trader.rank > 3 && trader.rank}
                  </td>
                  <td className="username">{trader.username}</td>
                  <td className="reputation">{trader.reputation} pts</td>
                  <td className="wins">{trader.wins}</td>
                  <td className="action">
                    {trader.username !== 'You' && <button className="follow-btn">Follow</button>}
                    {trader.username === 'You' && <span className="current-label">Current</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tournaments */}
      <section className="tournaments-section">
        <h3>Active Tournaments</h3>
        <div className="tournaments-grid">
          <div className="tournament-card">
            <div className="tournament-header">
              <h4>Weekly Trading Championship</h4>
              <span className="prize">Prize: $10,000</span>
            </div>
            <p className="tournament-desc">Highest trading volume wins. Top 10 participants rewarded.</p>
            <div className="tournament-info">
              <span>Your Rank: #245</span>
              <span>Time Left: 3 days</span>
            </div>
            <button className="join-btn">View Details</button>
          </div>

          <div className="tournament-card">
            <div className="tournament-header">
              <h4>Prediction Accuracy Battle</h4>
              <span className="prize">Prize: 5 ETH</span>
            </div>
            <p className="tournament-desc">Best prediction accuracy this month. Minimum 10 predictions.</p>
            <div className="tournament-info">
              <span>Your Accuracy: 72%</span>
              <span>Time Left: 8 days</span>
            </div>
            <button className="join-btn">View Details</button>
          </div>

          <div className="tournament-card">
            <div className="tournament-header">
              <h4>Best Portfolio Performance</h4>
              <span className="prize">Prize: 2 BTC</span>
            </div>
            <p className="tournament-desc">Highest portfolio growth percentage this quarter.</p>
            <div className="tournament-info">
              <span>Your Growth: +45%</span>
              <span>Time Left: 45 days</span>
            </div>
            <button className="join-btn">View Details</button>
          </div>
        </div>
      </section>
    </div>
  );
};
