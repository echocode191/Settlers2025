import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
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

  // Handle PWA install prompt
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
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

      {/* PWA Install Banner */}
      {showBanner && (
        <div style={installBannerStyle} onClick={handleInstall}>
          📲 Tap to install <strong>Settlers Inn</strong> to your device! (7s offer 😅)
        </div>
      )}

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Valuation />} />

        {/* All other pages with Navbar */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/accommodation" element={<Accommodation />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/location" element={<Location />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/value" element={<Valuation />} /> {/* optional alias */}
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

// Style for PWA Install Banner
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

// Inject keyframes for fade animation
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
