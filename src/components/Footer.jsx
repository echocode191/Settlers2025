import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState("");
  
  React.useEffect(() => {
    // Initialize visitor count
    setVisitorCount(Math.floor(Math.random() * 500) + 800);
    
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    // Add CSS animations
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => clearInterval(timer);
  }, []);
  
  // Styles with modern glassy design
  const styles = {
    footer: {
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      padding: '3rem 1.5rem 2rem',
      fontFamily: "'Inter', system-ui, sans-serif" ,
      color: '#e2e8f0',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      animation: 'fadeInUp 1s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '3rem',
      maxWidth: '1200px',
      margin: 'auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
    },
    col: {
      minWidth: '260px',
      flex: '1',
    },
    heading: {
      color: '#38bdf8',
      marginBottom: '1rem',
      fontSize: '1.3rem',
      fontWeight: '600',
      transition: 'transform 0.3s ease',
    },
    a: {
      color: '#38bdf8',
      textDecoration: 'none',
      fontSize: '0.95rem',
      transition: 'color 0.3s ease',
    },
    contactInfo: {
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
      lineHeight: '1.7',
    },
    cta: {
      textAlign: 'center',
      marginTop: '2.5rem',
    },
    whatsapp: {
      display: 'inline-block',
      backgroundColor: 'rgba(37, 211, 102, 0.9)',
      color: '#fff',
      padding: '0.8rem 1.6rem',
      borderRadius: '12px',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(4px)',
      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)',
    },
    bottom: {
      textAlign: 'center',
      marginTop: '2.5rem',
      fontSize: '0.85rem',
      color: '#94a3b8',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2.5rem',
      margin: '2rem 0',
      flexWrap: 'wrap',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.3rem',
      color: '#38bdf8',
      fontWeight: '600',
    },
    statLabel: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      marginTop: '0.3rem',
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '1.2rem',
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      background: 'rgba(30, 41, 59, 0.7)',
      color: '#38bdf8',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(4px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    glowEffect: {
      position: 'absolute',
      top: '-100px',
      right: '-100px',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0) 70%)',
      zIndex: 0,
      animation: 'subtlePulse 4s infinite alternate',
    },
    liveIndicator: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: 'rgba(30, 41, 59, 0.7)',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      color: '#38bdf8',
      marginTop: '0.8rem',
      backdropFilter: 'blur(4px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    liveDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#38bdf8',
      animation: 'subtlePulse 2s infinite',
    }
  };
  
  return (
    <footer style={styles.footer}>
      <div style={styles.glowEffect}></div>
      <div style={styles.container}>
        {/* Brand Info */}
        <div style={styles.col}>
          <h3 style={styles.heading}>Settlers Inn</h3>
          <p>Kipkelion, Kenya Highlands</p>
          <p>Established 2021</p>
          <div style={styles.liveIndicator}>
            <span style={styles.liveDot}></span>
            <span>Open now until 10 PM</span>
          </div>
        </div>
        
        {/* Contact Info */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Contact Us</h4>
          <div style={styles.contactInfo}>
            <p>
              📞 Hotel: <a href="tel:+254748778388" style={styles.a}>0748 778388</a>
            </p>
            <p>
              👤 Manager: <a href="tel:+254723709208" style={styles.a}>0723 709208</a>
            </p>
            <p>
              👤 Owner: <a href="tel:+254727046813" style={styles.a}>0727 046813</a>
            </p>
            <p>
              ✉️ <a href="mailto:settlersinn2030@gmail.com" style={styles.a}>settlersinn@gmail.com</a>
            </p>
          </div>
        </div>
        
        {/* Quick Links */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Quick Links</h4>
          <div style={styles.contactInfo}>
            <p><Link to="/menu" style={styles.a}>Our Menu</Link></p>
            <p><Link to="/accommodation" style={styles.a}>Book a Room</Link></p>
            <p><Link to="/offers" style={styles.a}>Special Offers</Link></p>
            <p><Link to="/gallery" style={styles.a}>Gallery</Link></p>
          </div>
          
          <div style={styles.socialLinks}>
            <a href="https://wa.me/254748778388" target="_blank" rel="noreferrer" style={styles.socialLink}>
              💬
            </a>
            <a href="https://www.facebook.com/settlersinn1/" target="_blank" rel="noreferrer" style={styles.socialLink}>
              f
            </a>
            <a href="https://maps.app.goo.gl/hvW5TubkM8WGcfAs5" target="_blank" rel="noreferrer" style={styles.socialLink}>
              📍
            </a>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{visitorCount}+</div>
          <div style={styles.statLabel}>Happy Guests</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{currentTime}</div>
          <div style={styles.statLabel}>Local Time</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>4.8★</div>
          <div style={styles.statLabel}>Guest Rating</div>
        </div>
      </div>
      
      {/* WhatsApp CTA */}
      <div style={styles.cta}>
        <a
          href="https://wa.me/254748778388?text=Hi%20Settlers%20Inn%2C%20I%20want%20to%20book%20a%20room%20or%20table!"
          target="_blank"
          rel="noreferrer"
          style={styles.whatsapp}
        >
          📲 Chat with Us on WhatsApp
        </a>
      </div>
      
      {/* Footer Bottom */}
      <div style={styles.bottom}>
        <p>
          Built with ❤️ by{' '}
          <a
            href="https://wa.me/254721635810"
            target="_blank"
            rel="noreferrer"
            style={styles.a}
          >
            EchoCode (Kimutai Gibson)
          </a>
        </p>
        <p>© {year} Settlers Inn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;