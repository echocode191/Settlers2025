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

  // ---- Ad Timer ----
  useEffect(() => {
    const adTimer = setTimeout(() => {
      setShowAdLoader(false);
    }, 7000); // Ad shows for exactly 7 seconds
    
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

  // ---- Ad Loading Screen ----
  if (!isCssLoaded || showAdLoader) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #111, #222)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        zIndex: 9999,
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ 
          textAlign: 'center', 
          maxWidth: '500px',
          padding: '30px',
          borderRadius: '10px',
          background: 'rgba(0, 0, 0, 0.6)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            color: '#fff'
          }}>
            Loading Settlers Inn...
          </div>
          
          <div style={{ 
            marginBottom: '25px', 
            fontSize: '18px',
            lineHeight: '1.5'
          }}>
            This site is powered by <span style={{ color: '#3498db', fontWeight: 'bold' }}>Echocode</span> and in partnership with <span style={{ color: '#0cb946', fontWeight: 'bold' }}>Safaricom</span>
          </div>
          
          <div style={{ 
            marginBottom: '30px',
            fontSize: '16px',
            color: '#ddd'
          }}>
            Click the link below to get the best offers!
          </div>
          
          <a 
            href="https://festus-bingwa-service.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 25px',
              background: 'linear-gradient(45deg, #3498db, #0cb946)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '30px',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            }}
          >
            Visit Festus Bingwa Service
          </a>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            <div className="loader-dots">
              <div style={{
                width: '10px',
                height: '10px',
                margin: '0 5px',
                backgroundColor: '#3498db',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'bounce 1.4s infinite ease-in-out both'
              }}></div>
              <div style={{
                width: '10px',
                height: '10px',
                margin: '0 5px',
                backgroundColor: '#3498db',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'bounce 1.4s infinite ease-in-out both',
                animationDelay: '0.16s'
              }}></div>
              <div style={{
                width: '10px',
                height: '10px',
                margin: '0 5px',
                backgroundColor: '#3498db',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'bounce 1.4s infinite ease-in-out both',
                animationDelay: '0.32s'
              }}></div>
            </div>
          </div>
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
          📲 Tap to install <strong>Settlers Inn</strong> to your device! (10s offer)
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
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = bannerAnimation;
  document.head.appendChild(style);
}

export default App;
