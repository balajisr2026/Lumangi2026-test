import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/market', label: 'Market', icon: '📈' },
    { path: '/trading', label: 'Trading', icon: '💹' },
    { path: '/predictions', label: 'Predictions', icon: '🎯' },
    { path: '/portfolio', label: 'Portfolio', icon: '💼' },
    { path: '/engage', label: 'Engagement', icon: '🏆' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <p className="section-title">Main</p>
            {menuItems.slice(0, 3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="nav-section">
            <p className="section-title">Secondary</p>
            {menuItems.slice(3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="chain-selector">
            <p className="footer-label">Network</p>
            <select className="chain-select">
              <option>Ethereum</option>
              <option>Polygon</option>
              <option>Arbitrum</option>
              <option>Optimism</option>
              <option>Base</option>
            </select>
          </div>
        </div>
      </aside>
    </>
  );
};
