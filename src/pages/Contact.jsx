import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  useEffect(() => {
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    // Simulate online status
    const onlineInterval = setInterval(() => {
      setIsOnline(Math.random() > 0.2); // 80% chance of being online
    }, 30000);
    
    // Animation styles
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      .online-indicator {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #9fef00;
        margin-right: 5px;
        animation: pulse 2s infinite;
      }
      .offline-indicator {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ff3e3e;
        margin-right: 5px;
      }
      .status-bar {
        background: linear-gradient(90deg, #161b22, #0d1117);
        border: 1px solid #30363d;
        border-radius: 20px;
        padding: 8px 16px;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      clearInterval(timer);
      clearInterval(onlineInterval);
    };
  }, []);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      const url = `https://wa.me/254748778388?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      setIsSending(false);
      setMessage("");
    }, 1500);
  };

  const styles = {
    page: {
      fontFamily: "'Fira Code', monospace",
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      minHeight: '100vh',
      paddingBottom: '2rem',
    },
    section: {
      maxWidth: '900px',
      margin: 'auto',
      padding: '2rem 1rem',
    },
    title: {
      textAlign: 'center',
      color: '#9fef00',
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    subtitle: {
      textAlign: 'center',
      color: '#8b949e',
      marginBottom: '2rem',
      fontSize: '1rem',
    },
    contactBox: {
      background: 'rgba(22, 27, 34, 0.9)',
      border: '1px solid #30363d',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 0 16px rgba(88,166,255,0.15)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      marginBottom: '3rem',
      animation: 'fadeIn 1s ease',
    },
    contactItem: {
      marginBottom: '1rem',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      color: '#58a6ff',
      fontWeight: 'bold',
      minWidth: '100px',
    },
    link: {
      color: '#9fef00',
      textDecoration: 'none',
      transition: 'color 0.2s',
    },
    whatsapp: {
      display: 'inline-block',
      marginTop: '1.5rem',
      padding: '0.8rem 1.4rem',
      background: '#25d366',
      color: 'white',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'background 0.3s ease, transform 0.2s ease',
    },
    divider: {
      margin: '2.5rem 0 2rem',
      borderTop: '1px dashed #30363d',
    },
    creatorBox: {
      background: 'rgba(13, 17, 23, 0.85)',
      border: '2px solid #9fef00',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 0 24px rgba(159,239,0,0.15)',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      animation: 'fadeIn 1.2s ease',
    },
    creatorHeading: {
      color: '#9fef00',
      fontSize: '1.5rem',
      marginBottom: '0.8rem',
    },
    creatorBio: {
      color: '#c9d1d9',
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '1rem',
    },
    phone: {
      fontSize: '1rem',
      color: '#58a6ff',
      fontWeight: 'bold',
    },
    lightNote: {
      color: '#8b949e',
      fontSize: '0.85rem',
      marginTop: '1rem',
    },
    messageBox: {
      background: '#161b22',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '2rem',
    },
    messageInput: {
      width: '100%',
      background: '#0d1117',
      border: '1px solid #30363d',
      borderRadius: '8px',
      color: '#c9d1d9',
      padding: '0.8rem',
      minHeight: '100px',
      resize: 'none',
      fontFamily: 'inherit',
      fontSize: '1rem',
      marginBottom: '1rem',
    },
    sendButton: {
      background: '#9fef00',
      color: '#0d1117',
      border: 'none',
      borderRadius: '8px',
      padding: '0.6rem 1.2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <section style={styles.section}>
        <h2 style={styles.title}>📞 Contact Us</h2>
        <p style={styles.subtitle}>Reach out for bookings, questions, or just to say hi.</p>
        
        <div className="status-bar">
          <div>
            {isOnline ? (
              <>
                <span className="online-indicator"></span>
                <span>We're online now</span>
              </>
            ) : (
              <>
                <span className="offline-indicator"></span>
                <span>We might be away</span>
              </>
            )}
          </div>
          <div>{currentTime}</div>
        </div>
        
        <div style={styles.messageBox}>
          <h3 style={{ marginBottom: '1rem', color: '#58a6ff' }}>💬 Send us a message</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            style={styles.messageInput}
          />
          <button 
            onClick={handleSendMessage}
            style={{
              ...styles.sendButton,
              background: isSending ? '#555' : '#9fef00',
              cursor: isSending ? 'not-allowed' : 'pointer',
            }}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send via WhatsApp'}
          </button>
        </div>
        
        <div style={styles.contactBox}>
          <p style={styles.contactItem}>
            <span style={styles.label}>Hotel:</span>{' '}
            <a href="tel:+254748778388" style={styles.link}>0748 778 388</a>
          </p>
          <p style={styles.contactItem}>
            <span style={styles.label}>Manager:</span>{' '}
            <a href="tel:+254723709208" style={styles.link}>0723 709 208</a>
          </p>
          <p style={styles.contactItem}>
            <span style={styles.label}>Owner:</span>{' '}
            <a href="tel:+254727046813" style={styles.link}>0727 046 813</a>
          </p>
          <p style={styles.contactItem}>
            <span style={styles.label}>Email:</span>{' '}
            <a href="mailto:settlersinn2030@gmail.com" style={styles.link}>settlersinn@gmail.com</a>
          </p>
          <a
            href="https://wa.me/254748778388?text=Hi%20Settlers%20Inn%2C%20I'd%20love%20to%20inquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            style={styles.whatsapp}
          >
            💬 Message on WhatsApp
          </a>
        </div>
        
        <div style={styles.divider}></div>
        
        <div style={styles.creatorBox}>
          <h3 style={styles.creatorHeading}>🤝 Powered by Kim • Available for Hire</h3>
          <p style={styles.creatorBio}>
            Hi, I'm Kimutai — a passionate dev blending design, maps, bots, and local energy.
            I craft smooth digital experiences that connect brands to the streets of Kenya 🇰🇪.
            Let's build your idea next.
          </p>
          <p style={styles.phone}>📞 0721 635 810</p>
          <a
            href="https://wa.me/254721635810?text=Hi%20Kim%20👋%2C%20I%20saw%20your%20Settlers%20Inn%20website.%20Can%20we%20talk%20about%20a%20project%3F"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.whatsapp}
          >
            💬 Chat with Kim Now
          </a>
          <p style={styles.lightNote}>
            💻 React • Firebase • Leaflet • Brand Strategy • Street-ready builds
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;