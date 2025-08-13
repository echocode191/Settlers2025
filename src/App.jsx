import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Accommodation from './pages/Accommodation';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
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
  const [isCssLoaded, setIsCssLoaded] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if CSS is loaded
    const checkCssLoaded = () => {
      const styles = document.getElementsByTagName('style');
      const links = document.getElementsByTagName('link');
      
      // Check if we have any styles or links loaded
      if (styles.length > 0 || links.length > 0) {
        setIsCssLoaded(true);
      }
    };

    // Initial check
    checkCssLoaded();

    // Fallback timeout in case CSS doesn't load
    const timeoutId = setTimeout(() => {
      setIsCssLoaded(true);
    }, 300); // Adjust as needed

    // Listen for CSS load events
    window.addEventListener('load', checkCssLoaded);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', checkCssLoaded);
    };
  }, []);

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

  // Show loading spinner while CSS is loading
  if (!isCssLoaded) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#111', // Match your app's background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        zIndex: 9999,
        fontSize: '18px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>Loading Settlers Inn...</div>
          <div className="spinner" style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      {/* Install banner */}
      {showBanner && (
        <div style={installBannerStyle} onClick={handleInstall}>
          📲 Tap to install <strong>Settlers Inn</strong> to your device! (7s offer 😅)
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </Router>
  );
};

// 🔥 Toast-like banner style
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

// Optional CSS animation (inject in your CSS file)
const bannerAnimation = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject animation to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = bannerAnimation;
  document.head.appendChild(style);
}

export default App;
