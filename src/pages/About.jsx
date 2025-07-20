import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      @keyframes glowIn {
        0% { box-shadow: 0 0 0 rgba(159,239,0,0); }
        100% { box-shadow: 0 0 20px rgba(159,239,0,0.1); }
      }
      @keyframes breath {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.01); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const styles = {
    body: {
      fontFamily: "'Fira Code', monospace",
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      paddingBottom: '4rem',
    },
    section: {
      maxWidth: '900px',
      margin: '3rem auto',
      padding: '2rem 1rem',
    },
    heading: {
      fontSize: '2.2rem',
      color: '#9fef00',
      textAlign: 'center',
      marginBottom: '2rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      borderRight: '2px solid #9fef00',
      animation: 'typewriter 3s steps(40, end), pulse 1.5s ease-in-out infinite',
      width: 'fit-content',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    block: {
      background: '#161b22',
      borderRadius: '14px',
      padding: '2rem',
      marginBottom: '2.5rem',
      boxShadow: '0 0 12px rgba(88,166,255,0.05)',
      animation: 'fadeIn 1.2s ease, glowIn 2s ease',
    },
    title: {
      color: '#58a6ff',
      fontSize: '1.3rem',
      marginBottom: '0.8rem',
      borderBottom: '1px dashed #30363d',
      paddingBottom: '0.4rem',
    },
    text: {
      fontSize: '1.05rem',
      lineHeight: '1.8',
      color: '#c9d1d9',
      marginBottom: '1.2rem',
      animation: 'breath 6s ease-in-out infinite',
    },
    quote: {
      fontStyle: 'italic',
      color: '#9fef00',
      fontSize: '1rem',
      textAlign: 'center',
      marginTop: '2rem',
      animation: 'pulse 3s ease-in-out infinite',
    },
  };

  return (
    <div style={styles.body}>
      <Navbar />
      <section style={styles.section}>
        <h1 style={styles.heading}>🌿 The Story of Settlers Inn</h1>

        <div style={styles.block}>
          <h3 style={styles.title}>✨ Act I — The Beginning</h3>
          <p style={styles.text}>
            It began as whispers among the hills of Kipkelion — a small family dream, no billboards, no fanfare. Just a mother’s recipes,
            a father’s patience, and a fire that never stopped burning.
          </p>
          <p style={styles.text}>
            They served tea to strangers like kin, chapatis that felt like home. Word spread not by ads, but by smiles and full hearts.
          </p>
        </div>

        <div style={styles.block}>
          <h3 style={styles.title}>🤝 Act II — The Belonging</h3>
          <p style={styles.text}>
            Settlers Inn grew not in size first, but in soul. The chairs filled, not with customers — but with friends, travelers, stories, and laughter.
          </p>
          <p style={styles.text}>
            People didn’t just dine — they returned. They brought their children, their memories, their love. They stayed not just for the rooms,
            but for the feeling.
          </p>
        </div>

        <div style={styles.block}>
          <h3 style={styles.title}>🔥 Act III — The Becoming</h3>
          <p style={styles.text}>
            Now we serve hundreds — but we’ve never stopped serving one person at a time. Every plate is still made with pride,
            every bed still turned with love. This isn’t a business. It’s a legacy — yours and ours.
          </p>
          <p style={styles.text}>
            Because long after the meal is gone, the feeling stays. And long after the trip ends, the story lives on in you.
          </p>

          <p style={styles.quote}>
            "We aren’t just a stop along the way. We are the reason you remember the journey."
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
