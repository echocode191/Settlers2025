import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #2b3137',
      background: 'rgba(13, 17, 23, 0.9)',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap'
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem'
    },
    logo: {
      height: '45px'
    },
    title: {
      fontSize: '1.4rem',
      color: '#9fef00',
      margin: 0
    },
    nav: {
      display: menuOpen ? 'flex' : 'none',
      flexDirection: 'column',
      width: '100%',
      marginTop: '1rem'
    },
    navDesktop: {
      display: 'flex',
      gap: '1.2rem'
    },
    link: {
      color: '#58a6ff',
      textDecoration: 'none',
      fontSize: '1rem',
      transition: '0.2s'
    },
    linkHover: {
      color: '#1f6feb',
      textShadow: '0 0 4px #58a6ff'
    },
    menuBtn: {
      display: 'block',
      background: 'none',
      border: 'none',
      fontSize: '1.6rem',
      color: '#58a6ff',
      cursor: 'pointer'
    },
    backBtn: {
      fontSize: '1.4rem',
      color: '#58a6ff',
      marginRight: '1rem',
      cursor: 'pointer',
      border: 'none',
      background: 'none'
    }
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

      <nav style={{ ...(window.innerWidth > 768 ? styles.navDesktop : styles.nav) }}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/menu">Menu</Link>
        <Link style={styles.link} to="/accommodation">Stay</Link>
        <Link style={styles.link} to="/about">About</Link>
        <Link style={styles.link} to="/gallery">Gallery</Link>
        <Link style={styles.link} to="/location">📍 Location</Link>
        <Link style={styles.link} to="/contact">Contact</Link>
        <Link style={styles.link} to="/offers">Offers</Link>
      </nav>
    </header>
  );
};

export default Navbar;
