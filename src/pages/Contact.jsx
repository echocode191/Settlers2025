import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @supports (backdrop-filter: blur(10px)) {
        .glass {
          backdrop-filter: blur(14px);
          background-color: rgba(22, 27, 34, 0.4);
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const styles = {
    page: {
      fontFamily: "'Fira Code', monospace",
      background: '#0d1117',
      color: '#c9d1d9',
      minHeight: '100vh',
      paddingBottom: '2rem',
    },
    section: {
      maxWidth: '960px',
      margin: 'auto',
      padding: '3rem 1rem',
    },
    title: {
      textAlign: 'center',
      color: '#9fef00',
      fontSize: '2.4rem',
      marginBottom: '0.5rem',
      textShadow: '0 0 8px #9fef00aa',
    },
    subtitle: {
      textAlign: 'center',
      color: '#8b949e',
      marginBottom: '2rem',
      fontSize: '1rem',
    },
    cardGlass: {
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      boxShadow: '0 0 40px rgba(159, 239, 0, 0.1)',
      padding: '2rem',
      marginBottom: '3rem',
      animation: 'fadeIn 0.8s ease',
    },
    contactItem: {
      marginBottom: '1rem',
      fontSize: '1.05rem',
    },
    label: {
      color: '#58a6ff',
      fontWeight: 'bold',
    },
    link: {
      color: '#9fef00',
      textDecoration: 'none',
    },
    whatsapp: {
      display: 'inline-block',
      marginTop: '1.5rem',
      padding: '0.8rem 1.4rem',
      background: '#25d366',
      color: 'white',
      borderRadius: '10px',
      textDecoration: 'none',
      fontWeight: 'bold',
      boxShadow: '0 0 12px rgba(37, 211, 102, 0.4)',
    },
    divider: {
      margin: '2rem 0',
      borderTop: '1px dashed #30363d',
    },
    creatorBox: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 0 30px rgba(88, 166, 255, 0.1)',
      textAlign: 'center',
      animation: 'fadeIn 1.2s ease',
    },
    creatorHeading: {
      color: '#9fef00',
      fontSize: '1.6rem',
      marginBottom: '1rem',
    },
    creatorBio: {
      color: '#c9d1d9',
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '1.2rem',
    },
    phone: {
      fontSize: '1.05rem',
      color: '#58a6ff',
      fontWeight: 'bold',
    },
    lightNote: {
      color: '#8b949e',
      fontSize: '0.85rem',
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <section style={styles.section}>
        <h2 style={styles.title}>📞 Contact Us</h2>
        <p style={styles.subtitle}>Reach out for bookings, events, or any special cravings.</p>

        <div style={styles.cardGlass}>
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
            <a href="mailto:settlersinn@gmail.com" style={styles.link}>settlersinn@gmail.com</a>
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
          <h3 style={styles.creatorHeading}>⚡ Built by Kim — The Agent on the Street</h3>
          <p style={styles.creatorBio}>
            Hello, I’m Kimutai — designer, developer, and street brand builder. <br />
            I bring restaurant dreams to life with bots, maps, and full-stack energy straight from Kenya’s heartlands 🇰🇪.
          </p>

          <p style={styles.phone}>📞 0721 635 810</p>

          <a
            href="https://wa.me/254721635810?text=Hi%20Kim%20👋%2C%20I%20just%20saw%20your%20Settlers%20Inn%20website%20—%20can%20you%20build%20one%20for%20me%3F"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.whatsapp}
          >
            💬 Chat with Kim Now
          </a>

          <p style={styles.lightNote}>
            💻 React • Firebase • AI Bots • Street-smart Solutions
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
