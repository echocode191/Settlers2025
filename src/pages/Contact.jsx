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
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
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
          background: #38bdf8;
          margin-right: 5px;
          animation: subtlePulse 2s infinite;
        }
        .offline-indicator {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          margin-right: 5px;
        }
        .status-bar {
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 10px 16px;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(8px);
        }
      `;
      document.head.appendChild(style);
    }
    
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
  
  // Styles with modern glassy design
  const styles = {
    page: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#e2e8f0',
      minHeight: '100vh',
      paddingBottom: '2rem',
    },
    section: {
      maxWidth: '900px',
      margin: 'auto',
      padding: '3rem 1.5rem',
      animation: 'fadeInUp 0.8s ease',
    },
    title: {
      textAlign: 'center',
      color: '#e2e8f0',
      fontSize: '2.2rem',
      marginBottom: '0.8rem',
      fontWeight: '600',
    },
    subtitle: {
      textAlign: 'center',
      color: '#94a3b8',
      marginBottom: '2.5rem',
      fontSize: '1.1rem',
    },
    contactBox: {
      background: 'rgba(30, 41, 59, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(12px)',
      marginBottom: '3rem',
    },
    contactItem: {
      marginBottom: '1.2rem',
      fontSize: '1.05rem',
      display: 'flex',
      alignItems: 'center',
      color: '#cbd5e1',
    },
    label: {
      color: '#38bdf8',
      fontWeight: '600',
      minWidth: '100px',
    },
    link: {
      color: '#38bdf8',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    },
    whatsapp: {
      display: 'inline-block',
      marginTop: '1.8rem',
      padding: '0.8rem 1.6rem',
      background: 'rgba(37, 211, 102, 0.9)',
      color: 'white',
      borderRadius: '12px',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(4px)',
      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)',
    },
    divider: {
      margin: '3rem 0',
      borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
    },
    creatorBox: {
      background: 'rgba(30, 41, 59, 0.7)',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      textAlign: 'center',
      backdropFilter: 'blur(12px)',
    },
    creatorHeading: {
      color: '#38bdf8',
      fontSize: '1.6rem',
      marginBottom: '1rem',
      fontWeight: '600',
    },
    creatorBio: {
      color: '#cbd5e1',
      fontSize: '1.05rem',
      lineHeight: '1.7',
      marginBottom: '1.5rem',
    },
    phone: {
      fontSize: '1.1rem',
      color: '#38bdf8',
      fontWeight: '600',
      marginBottom: '1.5rem',
    },
    lightNote: {
      color: '#94a3b8',
      fontSize: '0.9rem',
      marginTop: '1.5rem',
    },
    messageBox: {
      background: 'rgba(30, 41, 59, 0.7)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2.5rem',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    messageInput: {
      width: '100%',
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      color: '#e2e8f0',
      padding: '1rem',
      minHeight: '120px',
      resize: 'none',
      fontFamily: 'inherit',
      fontSize: '1rem',
      marginBottom: '1.2rem',
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    sendButton: {
      background: 'rgba(56, 189, 248, 0.9)',
      color: '#0f172a',
      border: 'none',
      borderRadius: '12px',
      padding: '0.8rem 1.5rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(4px)',
      boxShadow: '0 4px 15px rgba(56, 189, 248, 0.25)',
    },
  };
  
  return (
    <div style={styles.page}>
      <Navbar />
      <section style={styles.section}>
        <h2 style={styles.title}>Contact Us</h2>
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
          <h3 style={{ marginBottom: '1.2rem', color: '#38bdf8', fontSize: '1.3rem', fontWeight: '600' }}>
            💬 Send us a message
          </h3>
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
              background: isSending ? 'rgba(100, 116, 139, 0.7)' : 'rgba(56, 189, 248, 0.9)',
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
          <h3 style={styles.creatorHeading}>🤝 Website by Kim • Available for Hire</h3>
          <p style={styles.creatorBio}>
            Hi, I'm Kimutai — a developer specializing in web design, mapping solutions, and digital experiences.
            I create modern websites that help businesses connect with their customers effectively.
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
            💻 React • Web Design • Digital Solutions • Brand Strategy
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;