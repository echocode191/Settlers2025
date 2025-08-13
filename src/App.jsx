import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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

// Redirect component
const Redirect = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);
  return null;
};

const App = () => {
  const [isCssLoaded, setIsCssLoaded] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  // ---- CSS Load Detection ----
  useEffect(() => {
    const checkCssLoaded = () => {
      const styles = document.getElementsByTagName('style');
      const links = document.getElementsByTagName('link');
      if (styles.length > 0 || links.length > 0) {
        setIsCssLoaded(true);
      }
    };
    checkCssLoaded();
    const timeoutId = setTimeout(() => {
      setIsCssLoaded(true);
    }, 300);
    window.addEventListener('load', checkCssLoaded);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', checkCssLoaded);
    };
  }, []);

  // ---- PWA Install Banner ----
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

  // ---- Auto refresh if new version detected ----
  useEffect(() => {
    let currentVersion = null;

    const checkForUpdate = async () => {
      try {
        const res = await fetch('/meta.json?time=' + new Date().getTime());
        const data = await res.json();
        if (!currentVersion) {
          currentVersion = data.version;
        } else if (data.version !== currentVersion) {
          console.log("New version detected — refreshing...");
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(regs => {
              regs.forEach(reg => reg.unregister());
              window.location.reload(true);
            });
          } else {
            window.location.reload(true);
          }
        }
      } catch (err) {
        console.error("Update check failed:", err);
      }
    };

    checkForUpdate();
    const intervalId = setInterval(checkForUpdate, 30000);
    return () => clearInterval(intervalId);
  }, []);

  // ---- Auto refresh on network reconnect ----
  useEffect(() => {
    const handleReconnect = () => {
      if (navigator.onLine) {
        console.log("Network reconnected — refreshing...");
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => {
            regs.forEach(reg => reg.unregister());
            window.location.reload(true);
          });
        } else {
          window.location.reload(true);
        }
      }
    };
    window.addEventListener('online', handleReconnect);
    return () => window.removeEventListener('online', handleReconnect);
  }, []);

  // ---- Loading Screen ----
  if (!isCssLoaded) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#111',
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

      {/* Install Banner */}
      {showBanner && (
        <div style={{
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
        }} onClick={handleInstall}>
          📲 Tap to install <strong>Settlers Inn</strong> to your device! (7s offer 😅)
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Redirect to="/" />} />
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

// Animations
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

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = bannerAnimation;
  document.head.appendChild(style);
}

export default App;
