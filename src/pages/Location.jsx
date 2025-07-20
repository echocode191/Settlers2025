import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Location = () => {
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
    mapContainer: {
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #30363d',
      boxShadow: '0 0 12px rgba(88,166,255,0.1)',
      marginBottom: '2rem',
    },
    iframe: {
      width: '100%',
      height: '400px',
      border: 'none',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '2rem',
    },
    actionBtn: {
      padding: '0.8rem 1.4rem',
      background: '#58a6ff',
      color: '#0d1117',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: '0.3s ease',
    },
    whatsapp: {
      background: '#25d366',
      color: 'white',
    },
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <section style={styles.section}>
        <h2 style={styles.title}>📍 Our Location</h2>
        <p style={styles.subtitle}>We’re tucked away in the beautiful Kenya Highlands. Come find your peace.</p>

        <div style={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1993.1089110590363!2d35.2794369!3d-0.5019141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182ba9c43b1f6f1d%3A0xd2cfbe08f96a1f79!2sSettlers%20Inn!5e0!3m2!1sen!2ske!4v1689948372724!5m2!1sen!2ske"
            style={styles.iframe}
            allowFullScreen=""
            loading="lazy"
            title="Settlers Inn Location"
          ></iframe>
        </div>

        <div style={styles.actions}>
          <a href="tel:+254748778388" style={styles.actionBtn}>📞 Call Us</a>
          <a
            href="https://wa.me/254748778388?text=Hi%20Settlers%20Inn%20👋%2C%20could%20you%20please%20send%20me%20directions%20to%20your%20place%3F"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.actionBtn, ...styles.whatsapp }}
          >
            💬 WhatsApp Directions
          </a>
          <a
            href="https://maps.app.goo.gl/4V42cGSvm2bvzsFX8"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.actionBtn}
          >
            🧭 Open in Google Maps
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Location;
