import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 480);
  const [isVerySmallMobile, setIsVerySmallMobile] = useState(window.innerWidth < 333);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 480);
      setIsVerySmallMobile(window.innerWidth < 333);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  
  // Glassy styles
  const glassyStyle = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      background: 'rgba(13, 17, 23, 0.7)',
      borderBottom: '1px solid rgba(88, 166, 255, 0.3)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap',
      WebkitBackdropFilter: 'blur(16px)'
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
      gap: isMobile ? '0.5rem' : '1.2rem',
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
      backgroundColor: 'rgba(88, 166, 255, 0.2)',
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
    },
    backBtn: {
      fontSize: '1.4rem',
      color: '#58a6ff',
      marginRight: '0.8rem',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
    },
    // Mobile styles
    mobileHeader: {
      padding: '0.8rem 1rem',
    },
    mobileBrand: {
      gap: '0.6rem',
    },
    mobileLogo: {
      height: '40px',
    },
    mobileTitle: {
      fontSize: '1.2rem',
    },
    mobileNavContainer: {
      gap: '0.4rem',
    },
    mobileNavLink: {
      fontSize: '0.95rem',
      padding: '4px 8px',
    },
    mobileMenuBtn: {
      fontSize: '1.4rem',
    },
    mobileBackBtn: {
      fontSize: '1.2rem',
    },
    // Small mobile styles
    smallMobileHeader: {
      padding: '0.6rem 0.8rem',
    },
    smallMobileBrand: {
      gap: '0.5rem',
    },
    smallMobileLogo: {
      height: '35px',
    },
    smallMobileTitle: {
      fontSize: '1.1rem',
    },
    smallMobileNavContainer: {
      gap: '0.3rem',
    },
    smallMobileNavLink: {
      fontSize: '0.9rem',
      padding: '3px 6px',
    },
    smallMobileMenuBtn: {
      fontSize: '1.3rem',
    },
    smallMobileBackBtn: {
      fontSize: '1.1rem',
    },
    // Very small mobile styles
    verySmallMobileHeader: {
      padding: '0.5rem 0.6rem',
    },
    verySmallMobileBrand: {
      gap: '0.4rem',
    },
    verySmallMobileLogo: {
      height: '30px',
    },
    verySmallMobileTitle: {
      fontSize: '1rem',
    },
    verySmallMobileNavContainer: {
      gap: '0.2rem',
    },
    verySmallMobileNavLink: {
      fontSize: '0.85rem',
      padding: '2px 5px',
    },
    verySmallMobileMenuBtn: {
      fontSize: '1.2rem',
    },
    verySmallMobileBackBtn: {
      fontSize: '1rem',
    }
  };
  
  // Get responsive styles
  const getResponsiveStyle = (baseStyle, mobileStyle, smallMobileStyle, verySmallMobileStyle) => {
    if (isVerySmallMobile && verySmallMobileStyle) return { ...baseStyle, ...verySmallMobileStyle };
    if (isSmallMobile && smallMobileStyle) return { ...baseStyle, ...smallMobileStyle };
    if (isMobile && mobileStyle) return { ...baseStyle, ...mobileStyle };
    return baseStyle;
  };
  
  return (
    <header style={getResponsiveStyle(
      glassyStyle.header,
      glassyStyle.mobileHeader,
      glassyStyle.smallMobileHeader,
      glassyStyle.verySmallMobileHeader
    )}>
      <div style={getResponsiveStyle(
        glassyStyle.brand,
        glassyStyle.mobileBrand,
        glassyStyle.smallMobileBrand,
        glassyStyle.verySmallMobileBrand
      )}>
        {!isHome && (
          <button style={getResponsiveStyle(
            glassyStyle.backBtn,
            glassyStyle.mobileBackBtn,
            glassyStyle.smallMobileBackBtn,
            glassyStyle.verySmallMobileBackBtn
          )} onClick={() => navigate(-1)}>←</button>
        )}
        <img 
          src="/assets/logo.png" 
          alt="Settlers Inn Logo" 
          style={getResponsiveStyle(
            glassyStyle.logo,
            glassyStyle.mobileLogo,
            glassyStyle.smallMobileLogo,
            glassyStyle.verySmallMobileLogo
          )} 
        />
        <h1 style={getResponsiveStyle(
          glassyStyle.title,
          glassyStyle.mobileTitle,
          glassyStyle.smallMobileTitle,
          glassyStyle.verySmallMobileTitle
        )}>Settlers Inn</h1>
      </div>
      <button 
        style={getResponsiveStyle(
          glassyStyle.menuBtn,
          glassyStyle.mobileMenuBtn,
          glassyStyle.smallMobileMenuBtn,
          glassyStyle.verySmallMobileMenuBtn
        )} 
        onClick={toggleMenu}
      >
        ☰
      </button>
      <nav style={getResponsiveStyle(
        glassyStyle.navContainer,
        glassyStyle.mobileNavContainer,
        glassyStyle.smallMobileNavContainer,
        glassyStyle.verySmallMobileNavContainer
      )}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) =>
              isActive
                ? { 
                    ...getResponsiveStyle(
                      glassyStyle.navLink,
                      glassyStyle.mobileNavLink,
                      glassyStyle.smallMobileNavLink,
                      glassyStyle.verySmallMobileNavLink
                    ), 
                    ...glassyStyle.navLinkActive 
                  }
                : getResponsiveStyle(
                    glassyStyle.navLink,
                    glassyStyle.mobileNavLink,
                    glassyStyle.smallMobileNavLink,
                    glassyStyle.verySmallMobileNavLink
                  )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
