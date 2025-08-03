import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Accommodation from './pages/Accommodation';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import Contact from './pages/Contact';
import Offers from './pages/Offers';
import Valuation from './pages/Valuation';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  // Initialize dynamic content
  useEffect(() => {
    // Set visitor count
    setVisitorCount(Math.floor(Math.random() * 50) + 20);
    
    // Set last updated time
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    // Simulate online status
    const onlineInterval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% chance of being online
    }, 30000);
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    
    return () => {
      clearInterval(onlineInterval);
      clearInterval(timeInterval);
    };
  }, []);

  // Capture install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 7000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Trigger install
  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        console.log('✅ User accepted the PWA install');
      }
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  // Auto-refresh when update found
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                console.log('🔄 New version available, refreshing...');
                setUpdateAvailable(true);
                setRefreshing(true);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
            };
          }
        };
      });
    }
  }, []);

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        10% { opacity: 1; transform: translateX(-50%) translateY(0); }
        90% { opacity: 1; }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Inline styles
  const installBannerStyle = {
    position: 'fixed',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(90deg, #9fef00, #58a6ff)',
    color: '#0d1117',
    padding: '10px 20px',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(159, 239, 0, 0.3)',
    zIndex: 9999,
    cursor: 'pointer',
    animation: 'fadeInOut 7s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const refreshToastStyle = {
    position: 'fixed',
    top: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#161b22',
    color: '#9fef00',
    padding: '12px 20px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 0 15px rgba(159, 239, 0, 0.3)',
    zIndex: 9999,
    animation: 'slideDown 0.5s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const statusBannerStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'rgba(22, 27, 34, 0.9)',
    backdropFilter: 'blur(10px)',
    color: '#c9d1d9',
    padding: '10px 15px',
    borderRadius: '12px',
    fontSize: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    zIndex: 9998,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    border: '1px solid #30363d',
  };

  const statusItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  const statusDotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: isOnline ? '#9fef00' : '#ff3e3e',
    animation: 'pulse 2s infinite',
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* Install banner */}
      {showBanner && (
        <div style={installBannerStyle} onClick={handleInstall}>
          📱 Tap to install <strong>Settlers Inn</strong> to your device!
          <span style={{ fontSize: '12px', opacity: '0.8' }}>(Auto-dismiss in 7s)</span>
        </div>
      )}
      
      {/* Update refresh toast */}
      {refreshing && (
        <div style={refreshToastStyle}>
          🔄 {updateAvailable ? 'New version available! ' : ''}Updating to latest version...
        </div>
      )}
      
      {/* Status banner */}
      <div style={statusBannerStyle}>
        <div style={statusItemStyle}>
          <span style={statusDotStyle}></span>
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <div style={statusItemStyle}>
          <span>👥 {visitorCount} visitors</span>
        </div>
        <div style={statusItemStyle}>
          <span>🕒 {lastUpdated}</span>
        </div>
      </div>
      
      <Routes>
        {/* ✅ Landing Page */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> {/* Alias */}
        
        {/* ✅ Core Pages */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/value" element={<Valuation />} />
        
        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;