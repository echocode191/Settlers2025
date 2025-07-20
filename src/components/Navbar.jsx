import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ toggleTheme, currentTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/accommodation', label: 'Stay' },
    { to: '/about', label: 'About' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/location', label: '📍 Location' },
    { to: '/contact', label: 'Contact' },
    { to: '/offers', label: 'Offers' },
  ];

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      background: 'rgba(13, 17, 23, 0.85)',
      borderBottom: '1px solid #2b3137',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
    },
    logo: {
      height: '45px',
    },
    title: {
      fontSize: '1.4rem',
      color: '#9fef00',
      margin: 0,
    },
    navContainer: {
      display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '1rem',
      alignItems: isMobile ? 'flex-start' : 'center',
      width: isMobile ? '100%' : 'auto',
      paddingTop: isMobile ? '1rem' : 0,
    },
    navLink: {
      color: '#58a6ff',
      textDecoration: 'none',
      fontSize: '1rem',
      padding: '6px 10px',
      borderRadius: '8px',
      transition: 'all 0.2s ease-in-out',
    },
    navLinkActive: {
      backgroundColor: '#58a6ff22',
      color: '#9fef00',
      fontWeight: 'bold',
      textShadow: '0 0 5px #9fef00',
    },
    menuBtn: {
      display: 'block',
      background: 'none',
      border: 'none',
      fontSize: '1.6rem',
      color: '#58a6ff',
      cursor: 'pointer',
    },
    backBtn: {
      fontSize: '1.4rem',
      color: '#58a6ff',
      marginRight: '1rem',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
    },
    themeToggle: {
      fontSize: '1.1rem',
      marginLeft: isMobile ? 0 : '1rem',
      background: '#222',
      color: '#9fef00',
      border: '1px solid #444',
      borderRadius: '8px',
      padding: '5px 10px',
      cursor: 'pointer',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        {!isHome && (
          <button style={styles.backBtn} onClick={() => navigate(-1)}>←</button>
        )}
        <img src="/assets/logo.png" alt="Settlers Inn Logo" style={styles.logo} />
        <h1 style={styles.title}>Settlers Inn</h1>
      </div>

      <button style={styles.menuBtn} onClick={toggleMenu}>☰</button>

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
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}

        <button onClick={toggleTheme} style={styles.themeToggle}>
          {currentTheme === 'dark' ? '🌞 Light' : '🌙 Dark'}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
