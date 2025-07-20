import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const styles = {
    body: {
      fontFamily: "'Fira Code', monospace",
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
    },
    section: {
      maxWidth: '900px',
      margin: '3rem auto',
      padding: '2rem 1rem',
    },
    h2: {
      textAlign: 'center',
      color: '#9fef00',
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    p: {
      color: '#8b949e',
      fontSize: '1rem',
      lineHeight: '1.7',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    story: {
      background: '#161b22',
      borderRadius: '10px',
      padding: '1.5rem',
      border: '1px solid #30363d',
      boxShadow: '0 0 12px rgba(88,166,255,0.1)',
      marginTop: '2rem',
    },
    quote: {
      fontStyle: 'italic',
      color: '#c9d1d9',
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.body}>
      <Navbar />

      <section style={styles.section}>
        <h2 style={styles.h2}>🏠 About Settlers Inn</h2>
        <p style={styles.p}>
          Settlers Inn is a locally-owned hideaway nestled in the heart of Kenya's highlands.
          For years, we’ve been serving locals and travelers with hearty meals and comfortable lodging.
        </p>

        <div style={styles.story}>
          <p style={styles.p}>
            We started out as a small family-run kitchen with just a few tables and a passion for good food.
            Over the years, our reputation grew — thanks to word of mouth and our loyal guests who kept coming back.
          </p>
          <p style={styles.p}>
            Today, we’re proud to offer not only amazing dishes, but also cozy accommodation, warm service,
            and a peaceful environment perfect for both getaways and gatherings.
          </p>
          <p style={styles.quote}>
            "We may be off the beaten path, but those who find us rarely forget us."
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
