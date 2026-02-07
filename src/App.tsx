import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DatabaseProvider } from './context/DatabaseContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Market } from './pages/Market';
import { Trading } from './pages/Trading';
import { Predictions } from './pages/Predictions';
import { Portfolio } from './pages/Portfolio';
import { Engagement } from './pages/Engagement';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <DatabaseProvider>
      <Router>
        <div className="app-container">
          <Navbar onMenuToggle={handleMenuToggle} />
          <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/market" element={<Market />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/engage" element={<Engagement />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DatabaseProvider>
  );
}

export default App;
