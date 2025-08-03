import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Accommodation from './pages/Accommodation';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Location from './pages/Location'; // Make sure this import exists
import Contact from './pages/Contact';
import Offers from './pages/Offers';

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
  
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
      // Auto-hide banner after 7 seconds
      setTimeout(() => setShowBanner(false), 7000);
    });
  }, []);
  
  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        console.log('User accepted install');
      }
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };
  
  return (
    <Router>
      <ScrollToTop />
      {/* Install PWA banner */}
      {showBanner && (
        <div style={installBannerStyle} onClick={handleInstall}>
          📲 Tap to install <strong>Settlers Inn</strong> to your device! (7s offer 😅)
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/offers" element={<Offers />} />
        {/* Add a catch-all route that redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// 🔥 Banner style
const installBannerStyle = {
  position: 'fixed',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(30, 41, 59, 0.9)',
  color: '#e2e8f0',
  padding: '12px 24px',
  borderRadius: '12px',
  fontSize: '15px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  zIndex: 9999,
  cursor: 'pointer',
  animation: 'fadeInOut 7s ease-in-out',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

// 🔁 CSS Animation
const bannerAnimation = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}
`;

// Inject animation globally
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = bannerAnimation;
  document.head.appendChild(style);
}

export default App;