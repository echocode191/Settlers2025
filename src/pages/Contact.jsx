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
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
