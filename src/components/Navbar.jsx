import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsDark(false);
      document.body.className = 'light';
    } else {
      document.body.className = 'dark';
    }

    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/accommodation", label: "Stay" },
    { to: "/about", label: "About" },
    { to: "/gallery", label: "Gallery" },
    { to: "/location", label: "📍 Location" },
    { to: "/contact", label: "Contact" },
    { to: "/offers", label: "Offers" },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        {!isHome && (
          <button style={styles.backBtn} onClick={() => navigate(-1)}>←</button>
        )}
        <img src="/assets/logo.png" alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Settlers Inn</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button style={styles.menuBtn} onClick={toggleMenu}>☰</button>
        <button onClick={toggleTheme} title="Toggle Theme" style={styles.themeBtn}>
          {isDark ? '🌞' : '🌙'}
        </button>
      </div>

      <nav style={{ ...(window.innerWidth > 768 ? styles.navDesktop : menuOpen ? styles.nav : { display: 'none' }) }}>
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.to}
            style={{
              ...styles.link,
              ...(location.pathname === link.to ? styles.activeLink : {}),
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #2b3137',
    background: 'rgba(13, 17, 23, 0.9)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    flexWrap: 'wrap',
    color: '#fff',
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
  nav: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '1rem',
    gap: '1rem',
  },
  navDesktop: {
    display: 'flex',
    gap: '1.2rem',
  },
  link: {
    color: '#58a6ff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: '0.3s',
  },
  activeLink: {
    fontWeight: 'bold',
    color: '#9fef00',
    textShadow: '0 0 8px #9fef00',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.6rem',
    color: '#58a6ff',
    cursor: 'pointer',
  },
  themeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.4rem',
    color: '#9fef00',
    cursor: 'pointer',
  },
  backBtn: {
    fontSize: '1.4rem',
    color: '#58a6ff',
    marginRight: '1rem',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  }
};

export default Navbar;
