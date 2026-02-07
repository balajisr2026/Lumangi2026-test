import { useState } from 'react';
import '../styles/navbar.css';

interface NavbarProps {
  onMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [displayAddress, setDisplayAddress] = useState('');

  const handleWalletConnect = () => {
    if (!isWalletConnected) {
      // TODO: Integrate Web3 wallet connection
      setDisplayAddress('0x1234...5678');
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
      setDisplayAddress('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={onMenuToggle}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Lumanagi</span>
          </div>
        </div>

        <div className="navbar-center">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search tokens, pairs..." 
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="navbar-right">
          <button className="notification-btn">
            🔔
            <span className="notification-badge">3</span>
          </button>
          
          <button 
            className={`wallet-btn ${isWalletConnected ? 'connected' : ''}`}
            onClick={handleWalletConnect}
          >
            {isWalletConnected ? (
              <>
                <span className="wallet-status">✓</span>
                {displayAddress}
              </>
            ) : (
              <>
                <span className="wallet-icon">🔗</span>
                Connect Wallet
              </>
            )}
          </button>

          <button className="profile-btn">👤</button>
        </div>
      </div>
    </nav>
  );
};
