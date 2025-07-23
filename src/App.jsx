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
                setRefreshing(true);
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }
            };
          }
        };
      });
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />

      {/* Install banner */}
      {showBanner && (
        <div style={installBannerStyle} onClick={handleInstall}>
          📲 Tap to install <strong>Settlers Inn</strong> to your device! (7s promo 😄)
        </div>
      )}

      {/* Optional toast for update refresh */}
      {refreshing && (
        <div style={refreshToastStyle}>
          🔄 Updating to latest version...
        </div>
      )}

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

// 💡 Styles
const installBannerStyle = {
  position: 'fixed',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: '#111',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '15px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
  zIndex: 9999,
  cursor: 'pointer',
  animation: 'fadeInOut 7s ease-in-out',
};

const refreshToastStyle = {
  position: 'fixed',
  top: '60px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#161b22',
  color: '#9fef00',
  padding: '10px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  boxShadow: '0 0 10px #9fef00',
  zIndex: 9999,
};

// Inject animations
const bannerAnimation = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = bannerAnimation;
  document.head.appendChild(style);
}

export default App;
