import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(4px); }
        to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }
      @keyframes glowBorder {
        0%, 100% { box-shadow: 0 0 15px rgba(159,239,0, 0.15); }
        50% { box-shadow: 0 0 30px rgba(159,239,0, 0.3); }
      }
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const styles = {
    body: {
      fontFamily: "'Fira Code', monospace",
      background: 'radial-gradient(ellipse at top, #0d1117 0%, #050505 100%)',
      color: '#c9d1d9',
      paddingBottom: '5rem',
      minHeight: '100vh',
    },
    section: {
      maxWidth: '1000px',
      margin: '4rem auto',
      padding: '2rem',
    },
    heading: {
      fontSize: 'clamp(1.7rem, 6vw, 3rem)',
      color: '#9fef00',
      textAlign: 'center',
      marginBottom: '3rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      borderRight: '3px solid #9fef00',
      animation: 'typewriter 3.5s steps(50, end) 1',
      width: 'fit-content',
      marginInline: 'auto',
    },
    block: {
      backdropFilter: 'blur(8px)',
      background: 'rgba(22, 27, 34, 0.7)',
      border: '1px solid rgba(159,239,0,0.15)',
      borderRadius: '18px',
      padding: '2.2rem',
      marginBottom: '3rem',
      boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
      animation: 'fadeIn 1.5s ease both, glowBorder 6s ease-in-out infinite',
      transition: 'transform 0.4s',
    },
    title: {
      color: '#58a6ff',
      fontSize: '1.5rem',
      marginBottom: '1rem',
      borderBottom: '1px dashed #2f3136',
      paddingBottom: '0.5rem',
    },
    text: {
      fontSize: '1.1rem',
      lineHeight: '1.9',
      color: '#e1e8eb',
      marginBottom: '1.4rem',
      textShadow: '0 0 1px rgba(255,255,255,0.05)',
    },
    quote: {
      fontStyle: 'italic',
      color: '#9fef00',
      fontSize: '1.05rem',
      textAlign: 'center',
      marginTop: '2.2rem',
      textShadow: '0 0 4px rgba(159,239,0,0.3)',
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
