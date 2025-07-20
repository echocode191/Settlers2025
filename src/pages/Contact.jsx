import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
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
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 0 12px rgba(88,166,255,0.1)',
      marginBottom: '3rem',
    },
    contactItem: {
      marginBottom: '1rem',
      fontSize: '1rem',
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
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    divider: {
      margin: '2rem 0',
      borderTop: '1px dashed #30363d',
    },
    creatorBox: {
      background: '#0d1117',
      border: '2px solid #9fef00',
      borderRadius: '14px',
      padding: '2rem',
      boxShadow: '0 0 20px rgba(159,239,0,0.15)',
      textAlign: 'center',
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
      fontSize: '1.1rem',
      color: '#58a6ff',
      fontWeight: 'bold',
    },
    lightNote: {
      color: '#8b949e',
      fontSize: '0.9rem',
      marginTop: '1rem',
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <section style={styles.section}>
        <h2 style={styles.title}>📞 Contact Us</h2>
        <p style={styles.subtitle}>Reach out for bookings, questions, or just to say hi.</p>

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
            Hi! I'm Kimutai, the mind behind this experience — blending design, code, and vibe straight from the streets of Kenya 🛠️🇰🇪. 
            <br /> I build smart, fast websites with maps, bots, and energy. <br />
            Whether you're running a business, street idea, or dreaming big — let’s make it real.
          </p>

          <p style={styles.phone}>📞 0721 635 810</p>

          <a
            href="https://wa.me/254721635810?text=Hi%20Kim%20👋%2C%20just%20saw%20your%20Settlers%20Inn%20website%20—%20can%20you%20build%20one%20for%20me%3F"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.whatsapp}
          >
            💬 Chat with Kim Now
          </a>

          <p style={styles.lightNote}>
            💻 React Dev • Leaflet Maps • Firebase • Street-smart Brands
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
