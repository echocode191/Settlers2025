import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Valuation = () => {
  const [showValue, setShowValue] = useState(false);
  const navigate = useNavigate(); // ✅ React Router navigation

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
      textAlign: 'center',
    },
    box: {
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 0 12px rgba(88,166,255,0.2)',
    },
    title: {
      color: '#9fef00',
      fontSize: '1.8rem',
      marginBottom: '1rem',
    },
    subtitle: {
      color: '#8b949e',
      fontSize: '1rem',
      marginBottom: '2rem',
    },
    button: {
      padding: '0.8rem 1.4rem',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#25d366',
      color: '#0d1117',
      fontWeight: 'bold',
      margin: '0.5rem',
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(37, 211, 102, 0.4)',
    },
    priceBox: {
      marginTop: '2rem',
      textAlign: 'left',
      color: '#c9d1d9',
    },
    priceRow: {
      margin: '0.5rem 0',
      borderBottom: '1px dashed #30363d',
      paddingBottom: '0.5rem',
    },
    label: { color: '#58a6ff' },
    usd: { color: '#9fef00' },
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <section style={styles.section}>
        <div style={styles.box}>
          <h2 style={styles.title}>📊 Google Business Rating</h2>
          <p style={styles.subtitle}>
            This is a PWA site linked to a new business profile.<br />
            Do you want to view its estimated setup value or continue?
          </p>

          {!showValue ? (
            <>
              <button style={styles.button} onClick={() => setShowValue(true)}>
                💸 Show Estimated Value
              </button>
              <button
                style={{ ...styles.button, backgroundColor: '#1f6feb', color: '#fff' }}
                onClick={() => navigate('/')}
              >
                🚀 Proceed to Website
              </button>
            </>
          ) : (
            <div style={styles.priceBox}>
              <h3 style={styles.title}>💰 Professional Web Breakdown</h3>
              <div style={styles.priceRow}>
                <span style={styles.label}>Design & Styling:</span> Ksh 12,000 <span style={styles.usd}>($90)</span>
              </div>
              <div style={styles.priceRow}>
                <span style={styles.label}>Smart Map & Routing:</span> Ksh 7,000 <span style={styles.usd}>($55)</span>
              </div>
              <div style={styles.priceRow}>
                <span style={styles.label}>WhatsApp + PWA Features:</span> Ksh 6,000 <span style={styles.usd}>($45)</span>
              </div>
              <div style={styles.priceRow}>
                <span style={styles.label}>Performance Optimization:</span> Ksh 5,000 <span style={styles.usd}>($40)</span>
              </div>
              <div style={styles.priceRow}>
                <span style={styles.label}>Hosting + Tech Stack:</span> Ksh 4,000 <span style={styles.usd}>($30)</span>
              </div>
              <div style={styles.priceRow}>
                <strong>Total Value:</strong> <span style={{ color: '#9fef00' }}>Ksh 34,000+</span> <span style={styles.usd}>(~$260)</span>
              </div>

              <p style={styles.subtitle}>
                Made with ❤️ by <strong>Kimutai Gibson</strong> — 0721 635 810
              </p>

              <button
                style={{ ...styles.button, backgroundColor: '#9fef00' }}
                onClick={() => navigate('/')}
              >
                🛜 View Site Anyway
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Valuation;
