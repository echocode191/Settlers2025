import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState("");
  
  React.useEffect(() => {
    // Initialize visitor count
    setVisitorCount(Math.floor(Math.random() * 1000) + 1500);
    
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
    
    return () => clearInterval(timer);
  }, []);

  const styles = {
    footer: {
      background: 'linear-gradient(to right, #161b22, #0d1117)',
      padding: '3rem 1rem 2rem',
      fontFamily: 'Fira Code, monospace',
      color: '#c9d1d9',
      borderTop: '1px solid #2b3137',
      animation: 'fadeInUp 1s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '3rem',
      maxWidth: '1000px',
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
      color: '#9fef00',
      marginBottom: '0.8rem',
      fontSize: '1.2rem',
      cursor: 'pointer',
      textShadow: '0 0 6px #9fef00',
      transition: 'transform 0.3s ease',
    },
    a: {
      color: '#58a6ff',
      textDecoration: 'none',
      fontSize: '0.95rem',
      transition: 'color 0.3s ease, text-shadow 0.3s ease',
    },
    contactInfo: {
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
      lineHeight: '1.7',
    },
    cta: {
      textAlign: 'center',
      marginTop: '2rem',
    },
    whatsapp: {
      display: 'inline-block',
      backgroundColor: '#25D366',
      color: '#fff',
      padding: '0.7rem 1.5rem',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontFamily: 'Fira Code',
      textDecoration: 'none',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 0 10px #25D36677',
    },
    bottom: {
      textAlign: 'center',
      marginTop: '2.5rem',
      fontSize: '0.85rem',
      color: '#8b949e',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      margin: '1.5rem 0',
      flexWrap: 'wrap',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.2rem',
      color: '#9fef00',
      fontWeight: 'bold',
    },
    statLabel: {
      fontSize: '0.8rem',
      color: '#8b949e',
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '1rem',
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(88, 166, 255, 0.1)',
      color: '#58a6ff',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
    glowEffect: {
      position: 'absolute',
      top: '-100px',
      right: '-100px',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(159, 239, 0, 0.2) 0%, rgba(159, 239, 0, 0) 70%)',
      zIndex: 0,
      animation: 'pulse 4s infinite alternate',
    },
    liveIndicator: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      background: 'rgba(88, 166, 255, 0.1)',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      color: '#58a6ff',
      marginTop: '0.5rem',
    },
    liveDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#9fef00',
      animation: 'pulse 2s infinite',
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.glowEffect}></div>
      <div style={styles.container}>
        {/* Brand Info */}
        <div style={styles.col}>
          <h3 style={styles.heading}>Settlers Inn</h3>
          <p>📍 Kipkelion, Kenya Highlands</p>
          <p>Where Settlers Still Eat Like Kings.</p>
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
            <p><Link to="/menu" style={styles.a}>🥘 Our Menu</Link></p>
            <p><Link to="/accommodation" style={styles.a}>🛏️ Book a Room</Link></p>
            <p><Link to="/offers" style={styles.a}>💎 Special Offers</Link></p>
            <p><Link to="/gallery" style={styles.a}>📷 Gallery</Link></p>
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
          <div style={styles.statNumber}>4.9★</div>
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
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#1f6feb';
              e.currentTarget.style.textShadow = '0 0 6px #1f6feb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#58a6ff';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            EchoBiz (Kimutai Gibson)
          </a>
        </p>
        <p>© {year} Settlers Inn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;