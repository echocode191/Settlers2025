import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    // Initialize visitor count
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
    }, 45000);
    
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
        
        /* Base styles */
        .navbar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: rgba(15, 23, 42, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        
        .navbar-header.scrolled {
          background: rgba(15, 23, 42, 0.95);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        
        .navbar-logo {
          height: 45px;
          transition: transform 0.3s ease;
        }
        
        .navbar-title {
          font-size: 1.4rem;
          color: #e2e8f0;
          margin: 0;
          white-space: nowrap;
          font-weight: 600;
        }
        
        .navbar-nav-container {
          display: flex;
          flex-direction: row;
          gap: 1.2rem;
          align-items: center;
        }
        
        .navbar-nav-link {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 1rem;
          padding: 8px 12px;
          border-radius: 10px;
          transition: all 0.2s ease-in-out;
          font-weight: 500;
        }
        
        .navbar-nav-link.active {
          background-color: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          font-weight: 600;
        }
        
        .navbar-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.6rem;
          color: #38bdf8;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .navbar-menu-btn:hover {
          background-color: rgba(56, 189, 248, 0.1);
        }
        
        .navbar-back-btn {
          font-size: 1.4rem;
          color: #38bdf8;
          margin-right: 0.8rem;
          cursor: pointer;
          border: none;
          background: none;
          padding: 5px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .navbar-back-btn:hover {
          background-color: rgba(56, 189, 248, 0.1);
        }
        
        .navbar-status-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .navbar-status-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #94a3b8;
        }
        
        .navbar-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38bdf8;
          animation: subtlePulse 2s infinite;
        }
        
        .navbar-notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: subtlePulse 2s infinite;
        }
        
        .navbar-notification-btn {
          position: relative;
          background: none;
          border: none;
          color: #38bdf8;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .navbar-notification-btn:hover {
          background-color: rgba(56, 189, 248, 0.1);
        }
        
        .navbar-mobile-header {
          display: none;
          width: 100%;
        }
        
        .navbar-mobile-status {
          display: none;
          align-items: center;
          gap: 1rem;
        }
        
        .navbar-mobile-nav-status {
          display: none;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
          justify-content: space-between;
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
          .navbar-header {
            padding: 0.8rem 1rem;
            flex-wrap: wrap;
          }
          
          .navbar-logo {
            height: 35px;
          }
          
          .navbar-title {
            font-size: 1.2rem;
          }
          
          .navbar-menu-btn {
            display: block;
          }
          
          .navbar-nav-container {
            display: none;
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
            width: 100%;
            padding: 1rem;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0 0 16px 16px;
            animation: fadeInDown 0.3s ease;
            z-index: 999;
            max-height: 60vh;
            overflow-y: auto;
          }
          
          .navbar-nav-container.open {
            display: flex;
          }
          
          .navbar-status-container {
            display: none;
          }
          
          .navbar-mobile-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .navbar-mobile-status {
            display: flex;
          }
          
          .navbar-mobile-nav-status {
            display: flex;
          }
        }
        
        /* Small mobile styles */
        @media (max-width: 480px) {
          .navbar-header {
            padding: 0.6rem 0.8rem;
          }
          
          .navbar-logo {
            height: 30px;
          }
          
          .navbar-title {
            font-size: 1.1rem;
          }
          
          .navbar-menu-btn {
            font-size: 1.4rem;
          }
          
          .navbar-nav-container {
            padding: 0.8rem;
            max-height: 70vh;
          }
          
          .navbar-nav-link {
            padding: 10px 12px;
            font-size: 1rem;
            margin-bottom: 4px;
          }
          
          .navbar-mobile-status .navbar-status-item {
            font-size: 0.8rem;
            gap: 0.6rem;
          }
          
          .navbar-notification-btn {
            font-size: 1.1rem;
          }
          
          .navbar-notification-badge {
            min-width: 16px;
            height: 16px;
            font-size: 0.65rem;
            top: -4px;
            right: -4px;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      clearInterval(timer);
      clearInterval(notificationInterval);
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
  
  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-mobile-header">
        <div className="navbar-brand">
          {!isHome && (
            <button 
              className="navbar-back-btn" 
              onClick={() => navigate(-1)}
            >
              ←
            </button>
          )}
          <img 
            src="/assets/logo.png" 
            alt="Settlers Inn Logo" 
            className="navbar-logo"
          />
          <h1 className="navbar-title">Settlers Inn</h1>
        </div>
        
        <div className="navbar-mobile-status">
          <div className="navbar-status-item">
            <span className="navbar-status-dot"></span>
            <span>{visitorCount}</span>
          </div>
          <button className="navbar-notification-btn">
            🔔
            {notificationCount > 0 && (
              <span className="navbar-notification-badge">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
          <button 
            className="navbar-menu-btn" 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      
      <div className="navbar-status-container">
        <div className="navbar-status-item">
          <span className="navbar-status-dot"></span>
          <span>{visitorCount} visitors online</span>
        </div>
        <div className="navbar-status-item">
          <span>🕒 {currentTime}</span>
        </div>
        <button className="navbar-notification-btn">
          🔔
          {notificationCount > 0 && (
            <span className="navbar-notification-badge">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
      </div>
      
      <nav className={`navbar-nav-container ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `navbar-nav-link ${isActive ? 'active' : ''}`
            }
            onClick={() => setMenuOpen(false)} // Close menu when link is clicked
          >
            {label}
          </NavLink>
        ))}
        
        <div className="navbar-mobile-nav-status">
          <div className="navbar-status-item">
            <span className="navbar-status-dot"></span>
            <span>{visitorCount} visitors</span>
          </div>
          <div className="navbar-status-item">
            <span>🕒 {currentTime}</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
