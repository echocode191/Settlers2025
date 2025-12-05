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
  const [showAdLoader, setShowAdLoader] = useState(true);

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

  // ---- Loader Timer (8-10s) ----
  useEffect(() => {
    const adTimer = setTimeout(() => {
      setShowAdLoader(false);
    }, 3000); // loader stays for 9 seconds (middle of 8-10s range)
    return () => clearTimeout(adTimer);
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

  // ---- Clean Loading Screen ----
  if (!isCssLoaded || showAdLoader) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        zIndex: 9999,
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Main Loader */}
        <div style={{
          textAlign: 'center',
          padding: '40px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          animation: 'fadeInOutLoader 2.5s ease-in-out infinite',
          transform: 'perspective(1000px) rotateX(5deg)',
          transformStyle: 'preserve-3d'
        }}>
          {/* Welcome Message */}
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '15px',
            letterSpacing: '1px',
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transform: 'translateZ(20px)'
          }}>
            Welcome to Settlers Inn
          </div>
          
          <div style={{
            fontSize: '20px',
            marginBottom: '25px',
            color: '#f0f0f0',
            lineHeight: '1.5',
            transform: 'translateZ(15px)'
          }}>
            Preparing your premium experience...
          </div>
          
          {/* Loading Text */}
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            letterSpacing: '1px',
            color: '#fff',
            transform: 'translateZ(10px)'
          }}>
            Loading...
          </div>

          {/* Animated Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', transform: 'translateZ(5px)' }}>
            <div className="loader-dots">
              <div style={{
                width: '12px',
                height: '12px',
                margin: '0 6px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'bounce 1.4s infinite ease-in-out both',
                boxShadow: '0 0 10px rgba(255,255,255,0.7)'
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                margin: '0 6px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'bounce 1.4s infinite ease-in-out both',
                animationDelay: '0.16s',
                boxShadow: '0 0 10px rgba(255,255,255,0.7)'
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                margin: '0 6px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'bounce 1.4s infinite ease-in-out both',
                animationDelay: '0.32s',
                boxShadow: '0 0 10px rgba(255,255,255,0.7)'
              }}></div>
            </div>
          </div>
        </div>

        {/* Data Purchase Button (bottom-right) */}
        <a 
          href="https://festus-bingwa-service.netlify.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            padding: '15px 25px',
            borderRadius: '50px',
            background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(245, 87, 108, 0.7)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'glow 2s infinite alternate, bounce 2s infinite',
            transform: 'perspective(1000px) rotateX(-10deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          Bingwa Sokoni Data Purchase
        </a>
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
          background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '30px',
          fontSize: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 9999,
          cursor: 'pointer',
          animation: 'fadeInOut 7s ease-in-out',
        }} onClick={handleInstall}>
          📲 Tap to install <strong>Settlers Inn</strong> to your device!
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
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}
@keyframes fadeInOutLoader {
  0% { opacity: 0.7; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.7; transform: scale(0.95); }
}
@keyframes glow {
  0% { box-shadow: 0 0 20px rgba(245, 87, 108, 0.7); }
  100% { box-shadow: 0 0 30px rgba(245, 87, 108, 1), 0 0 40px rgba(245, 87, 108, 0.8); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0) perspective(1000px) rotateX(-10deg); }
  50% { transform: translateY(-15px) perspective(1000px) rotateX(-10deg); }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = bannerAnimation;
  document.head.appendChild(style);
}

export default App;
