import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    // Initialize visitor count
    setVisitorCount(Math.floor(Math.random() * 100) + 20);
    
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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    // Handle scroll for navbar effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
    
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

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0.8rem 1rem' : '1rem 1.5rem',
      background: isScrolled ? 'rgba(13, 17, 23, 0.95)' : 'rgba(13, 17, 23, 0.9)',
      borderBottom: '1px solid #2b3137',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap',
      transition: 'all 0.3s ease',
      boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
    },
    logo: {
      height: isMobile ? '35px' : '45px',
      transition: 'transform 0.3s ease',
    },
    title: {
      fontSize: isMobile ? '1.2rem' : '1.4rem',
      color: '#9fef00',
      margin: 0,
      whiteSpace: 'nowrap',
    },
    navContainer: {
      display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '0.5rem' : '1.2rem',
      alignItems: isMobile ? 'flex-start' : 'center',
      width: isMobile ? '100%' : 'auto',
      paddingTop: isMobile ? '1rem' : 0,
      position: isMobile ? 'absolute' : 'static',
      top: '100%',
      left: '0',
      right: '0',
      background: isMobile ? 'rgba(13, 17, 23, 0.98)' : 'transparent',
      backdropFilter: isMobile ? 'blur(10px)' : 'none',
      padding: isMobile ? '1rem' : '0',
      borderBottom: isMobile ? '1px solid #2b3137' : 'none',
      borderRadius: isMobile ? '0 0 12px 12px' : '0',
      animation: isMobile && menuOpen ? 'fadeInDown 0.3s ease' : 'none',
      zIndex: 999,
    },
    navLink: {
      color: '#58a6ff',
      textDecoration: 'none',
      fontSize: '1rem',
      padding: '6px 10px',
      borderRadius: '8px',
      transition: 'all 0.2s ease-in-out',
      position: 'relative',
    },
    navLinkActive: {
      backgroundColor: '#58a6ff22',
      color: '#9fef00',
      fontWeight: 'bold',
      textShadow: '0 0 6px #9fef00',
    },
    menuBtn: {
      display: 'block',
      background: 'none',
      border: 'none',
      fontSize: '1.6rem',
      color: '#58a6ff',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    },
    backBtn: {
      fontSize: '1.4rem',
      color: '#58a6ff',
      marginRight: '0.8rem',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      transition: 'transform 0.3s ease',
    },
    statusContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    statusItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '0.8rem',
      color: '#8b949e',
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#9fef00',
      animation: 'pulse 2s infinite',
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      background: '#ff3e3e',
      color: 'white',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      minWidth: '18px',
      height: '18px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'pulse 2s infinite',
    },
    notificationButton: {
      position: 'relative',
      background: 'none',
      border: 'none',
      color: '#58a6ff',
      fontSize: '1.2rem',
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
    <header style={styles.header}>
      <div style={isMobile ? styles.mobileHeader : {}}>
        <div style={styles.brand}>
          {!isHome && (
            <button 
              style={styles.backBtn} 
              onClick={() => navigate(-1)}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ←
            </button>
          )}
          <img 
            src="/assets/logo.png" 
            alt="Settlers Inn Logo" 
            style={styles.logo}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          <h1 style={styles.title}>Settlers Inn</h1>
        </div>
        
        {isMobile && (
          <div style={styles.statusContainer}>
            <div style={styles.statusItem}>
              <span style={styles.statusDot}></span>
              <span>{visitorCount}</span>
            </div>
            <button style={styles.notificationButton}>
              🔔
              {notificationCount > 0 && (
                <span style={styles.notificationBadge}>{notificationCount}</span>
              )}
            </button>
            <button 
              style={styles.menuBtn} 
              onClick={toggleMenu}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
              <span style={styles.notificationBadge}>{notificationCount}</span>
            )}
          </button>
        </div>
      )}
      
      <nav style={styles.navContainer}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) =>
              isActive
                ? { ...styles.navLink, ...styles.navLinkActive }
                : styles.navLink
            }
          >
            {label}
          </NavLink>
        ))}
        
        {isMobile && (
          <div style={{ 
            marginTop: '1rem', 
            paddingTop: '1rem', 
            borderTop: '1px solid #2b3137',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around'
          }}>
            <div style={styles.statusItem}>
              <span style={styles.statusDot}></span>
              <span>{visitorCount}</span>
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