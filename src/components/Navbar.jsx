import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    // Initialize visitor count - more realistic for a hotel since 2021
    setVisitorCount(Math.floor(Math.random() * 50) + 15);
    
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    // Simulate notifications
    const notificationInterval = setInterval(() => {
      setNotificationCount(prev => prev + 1);
    }, 45000); // Every 45 seconds
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };
    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    
    // Handle scroll for navbar effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Add CSS animations and responsive styles
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        /* Mobile-specific responsive styles */
        @media (max-width: 480px) {
          .mobile-header {
            padding: 0.6rem 0.8rem !important;
          }
          
          .mobile-logo {
            height: 30px !important;
          }
          
          .mobile-title {
            font-size: 1.1rem !important;
          }
          
          .mobile-menu-btn {
            font-size: 1.4rem !important;
          }
          
          .mobile-nav-container {
            max-height: 70vh !important;
            overflow-y: auto !important;
            padding: 0.8rem !important;
          }
          
          .mobile-nav-link {
            padding: 10px 12px !important;
            font-size: 1rem !important;
            margin-bottom: 4px !important;
          }
          
          .mobile-status-container {
            font-size: 0.8rem !important;
            gap: 0.6rem !important;
          }
          
          .mobile-notification-btn {
            font-size: 1.1rem !important;
          }
          
          .mobile-notification-badge {
            min-width: 16px !important;
            height: 16px !important;
            font-size: 0.65rem !important;
            top: -4px !important;
            right: -4px !important;
          }
        }
        
        @media (min-width: 481px) and (max-width: 768px) {
          .mobile-nav-container {
            max-height: 60vh !important;
            overflow-y: auto !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      clearInterval(timer);
      clearInterval(notificationInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setMenuOpen(false); // Close menu on navigation
  }, [location]);
  
  const toggleMenu = () => setMenuOpen(prev => !prev);
  
  const navLinks = [
    { to: '/home', label: '🏠 Home' },
    { to: '/menu', label: '🥘 Menu' },
    { to: '/accommodation', label: '🛏️ Stay' },
    { to: '/about', label: '📖 About' },
    { to: '/gallery', label: '📷 Gallery' },
    { to: '/location', label: '📍 Location' },
    { to: '/contact', label: '📞 Contact' },
    { to: '/offers', label: '💎 Offers' },
  ];
  
  // Check for very small mobile devices
  const isSmallMobile = windowWidth < 480;
  
  // Styles with modern glassy design
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isSmallMobile ? '0.6rem 0.8rem' : (isMobile ? '0.8rem 1rem' : '1rem 1.5rem'),
      background: isScrolled 
        ? 'rgba(15, 23, 42, 0.95)' 
        : 'rgba(15, 23, 42, 0.9)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap',
      transition: 'all 0.3s ease',
      boxShadow: isScrolled 
        ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
        : 'none',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: isSmallMobile ? '0.5rem' : '0.8rem',
    },
    logo: {
      height: isSmallMobile ? '30px' : (isMobile ? '35px' : '45px'),
      transition: 'transform 0.3s ease',
    },
    title: {
      fontSize: isSmallMobile ? '1.1rem' : (isMobile ? '1.2rem' : '1.4rem'),
      color: '#e2e8f0',
      margin: 0,
      whiteSpace: 'nowrap',
      fontWeight: '600',
    },
    navContainer: {
      display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '0.3rem' : '1.2rem',
      alignItems: isMobile ? 'flex-start' : 'center',
      width: isMobile ? '100%' : 'auto',
      paddingTop: isMobile ? '0.8rem' : '0',
      position: isMobile ? 'absolute' : 'static',
      top: '100%',
      left: '0',
      right: '0',
      background: isMobile ? 'rgba(15, 23, 42, 0.98)' : 'transparent',
      backdropFilter: isMobile ? 'blur(12px)' : 'none',
      padding: isMobile ? '0.8rem' : '0',
      borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      borderRadius: isMobile ? '0 0 16px 16px' : '0',
      animation: isMobile && menuOpen ? 'fadeInDown 0.3s ease' : 'none',
      zIndex: 999,
      maxHeight: isMobile ? '70vh' : 'none',
      overflowY: isMobile ? 'auto' : 'visible',
    },
    navLink: {
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: isSmallMobile ? '1rem' : '1rem',
      padding: isSmallMobile ? '10px 12px' : '8px 12px',
      borderRadius: '10px',
      transition: 'all 0.2s ease-in-out',
      position: 'relative',
      fontWeight: '500',
      marginBottom: isSmallMobile ? '4px' : '0',
    },
    navLinkActive: {
      backgroundColor: 'rgba(56, 189, 248, 0.2)',
      color: '#38bdf8',
      fontWeight: '600',
    },
    menuBtn: {
      display: 'block',
      background: 'none',
      border: 'none',
      fontSize: isSmallMobile ? '1.4rem' : '1.6rem',
      color: '#38bdf8',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    },
    backBtn: {
      fontSize: isSmallMobile ? '1.2rem' : '1.4rem',
      color: '#38bdf8',
      marginRight: isSmallMobile ? '0.5rem' : '0.8rem',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      transition: 'transform 0.3s ease',
    },
    statusContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: isSmallMobile ? '0.6rem' : '1rem',
    },
    statusItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: isSmallMobile ? '0.8rem' : '0.85rem',
      color: '#94a3b8',
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#38bdf8',
      animation: 'subtlePulse 2s infinite',
    },
    notificationBadge: {
      position: 'absolute',
      top: isSmallMobile ? '-4px' : '-5px',
      right: isSmallMobile ? '-4px' : '-5px',
      background: 'rgba(239, 68, 68, 0.9)',
      color: 'white',
      fontSize: isSmallMobile ? '0.65rem' : '0.7rem',
      fontWeight: '600',
      minWidth: isSmallMobile ? '16px' : '18px',
      height: isSmallMobile ? '16px' : '18px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'subtlePulse 2s infinite',
      backdropFilter: 'blur(4px)',
    },
    notificationButton: {
      position: 'relative',
      background: 'none',
      border: 'none',
      color: '#38bdf8',
      fontSize: isSmallMobile ? '1.1rem' : '1.2rem',
      cursor: 'pointer',
      padding: '5px',
      borderRadius: '50%',
      transition: 'all 0.2s ease',
    },
    mobileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    }
  };
  
  return (
    <header style={styles.header} className={isMobile ? "mobile-header" : ""}>
      <div style={isMobile ? styles.mobileHeader : {}}>
        <div style={styles.brand}>
          {!isHome && (
            <button 
              style={styles.backBtn} 
              onClick={() => navigate(-1)}
            >
              ←
            </button>
          )}
          <img 
            src="/assets/logo.png" 
            alt="Settlers Inn Logo" 
            style={styles.logo}
            className={isMobile ? "mobile-logo" : ""}
          />
          <h1 style={styles.title} className={isMobile ? "mobile-title" : ""}>Settlers Inn</h1>
        </div>
        
        {isMobile && (
          <div style={styles.statusContainer} className="mobile-status-container">
            <div style={styles.statusItem}>
              <span style={styles.statusDot}></span>
              <span>{visitorCount}</span>
            </div>
            <button style={styles.notificationButton} className="mobile-notification-btn">
              🔔
              {notificationCount > 0 && (
                <span style={styles.notificationBadge} className="mobile-notification-badge">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
            <button 
              style={styles.menuBtn} 
              onClick={toggleMenu}
              className="mobile-menu-btn"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        )}
      </div>
      
      {!isMobile && (
        <div style={styles.statusContainer}>
          <div style={styles.statusItem}>
            <span style={styles.statusDot}></span>
            <span>{visitorCount} visitors online</span>
          </div>
          <div style={styles.statusItem}>
            <span>🕒 {currentTime}</span>
          </div>
          <button style={styles.notificationButton}>
            🔔
            {notificationCount > 0 && (
              <span style={styles.notificationBadge}>
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
        </div>
      )}
      
      <nav style={styles.navContainer} className={isMobile ? "mobile-nav-container" : ""}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) =>
              isActive
                ? { ...styles.navLink, ...styles.navLinkActive }
                : styles.navLink
            }
            className={isMobile ? "mobile-nav-link" : ""}
          >
            {label}
          </NavLink>
        ))}
        
        {isMobile && (
          <div style={{ 
            marginTop: '1rem', 
            paddingTop: '1rem', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around'
          }}>
            <div style={styles.statusItem}>
              <span style={styles.statusDot}></span>
              <span>{visitorCount} visitors</span>
            </div>
            <div style={styles.statusItem}>
              <span>🕒 {currentTime}</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
