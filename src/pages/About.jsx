import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const [dailyQuote, setDailyQuote] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);
  
  useEffect(() => {
    // Dynamic visitor count simulation
    setVisitorCount(Math.floor(Math.random() * 500) + 1200);
    
    // Daily quote rotation
    const quotes = [
      "Home isn't a place, it's a feeling.",
      "Every meal tells a story of our heritage.",
      "Where tradition meets warmth.",
      "The heart of Kenya beats in our kitchen."
    ];
    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Animation styles
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
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
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
      padding: '2rem clamp(1rem, 5vw, 3rem)',
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
      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      marginBottom: '3rem',
      boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
      animation: 'fadeIn 1.5s ease both, glowBorder 6s ease-in-out infinite',
      transition: 'transform 0.4s',
      position: 'relative',
      overflow: 'hidden',
    },
    blockHover: {
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 50px rgba(159,239,0,0.2)',
      }
    },
    title: {
      color: '#58a6ff',
      fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
      marginBottom: '1rem',
      borderBottom: '1px dashed #2f3136',
      paddingBottom: '0.5rem',
    },
    text: {
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      lineHeight: '1.9',
      color: '#e1e8eb',
      marginBottom: '1.4rem',
      textShadow: '0 0 1px rgba(255,255,255,0.05)',
    },
    quote: {
      fontStyle: 'italic',
      color: '#9fef00',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      textAlign: 'center',
      marginTop: '2.2rem',
      textShadow: '0 0 4px rgba(159,239,0,0.3)',
    },
    badge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(159,239,0,0.2)',
      color: '#9fef00',
      padding: '3px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      animation: 'pulse 2s infinite',
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '2rem',
      padding: '1rem',
      background: 'rgba(22, 27, 34, 0.5)',
      borderRadius: '12px',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.5rem',
      color: '#9fef00',
      fontWeight: 'bold',
    },
    statLabel: {
      fontSize: '0.8rem',
      color: '#8b949e',
    }
  };

  return (
    <div style={styles.body}>
      <Navbar />
      <section style={styles.section}>
        <h1 style={styles.heading}>🌿 The Story of Settlers Inn</h1>
        
        <div style={{...styles.block, ...styles.blockHover}}>
          <div style={styles.badge}>EST. 2003</div>
          <h3 style={styles.title}>✨ Act I — The Beginning</h3>
          <p style={styles.text}>
            It began as whispers among the hills of Kipkelion — a small family dream, no billboards, no fanfare. Just a mother's recipes,
            a father's patience, and a fire that never stopped burning.
          </p>
          <p style={styles.text}>
            They served tea to strangers like kin, chapatis that felt like home. Word spread not by ads, but by smiles and full hearts.
          </p>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>20+</div>
              <div style={styles.statLabel}>Years of Service</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>5000+</div>
              <div style={styles.statLabel}>Happy Guests</div>
            </div>
          </div>
        </div>
        
        <div style={{...styles.block, ...styles.blockHover}}>
          <div style={styles.badge}>COMMUNITY</div>
          <h3 style={styles.title}>🤝 Act II — The Belonging</h3>
          <p style={styles.text}>
            Settlers Inn grew not in size first, but in soul. The chairs filled, not with customers — but with friends, travelers, stories, and laughter.
          </p>
          <p style={styles.text}>
            People didn't just dine — they returned. They brought their children, their memories, their love. They stayed not just for the rooms,
            but for the feeling.
          </p>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>15+</div>
              <div style={styles.statLabel}>Local Staff</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>30+</div>
              <div style={styles.statLabel}>Local Suppliers</div>
            </div>
          </div>
        </div>
        
        <div style={{...styles.block, ...styles.blockHover}}>
          <div style={styles.badge}>LEGACY</div>
          <h3 style={styles.title}>🔥 Act III — The Becoming</h3>
          <p style={styles.text}>
            Now we serve hundreds — but we've never stopped serving one person at a time. Every plate is still made with pride,
            every bed still turned with love. This isn't a business. It's a legacy — yours and ours.
          </p>
          <p style={styles.text}>
            Because long after the meal is gone, the feeling stays. And long after the trip ends, the story lives on in you.
          </p>
          <p style={styles.quote}>
            "{dailyQuote}"
          </p>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{visitorCount}</div>
              <div style={styles.statLabel}>Visitors Today</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>4.9★</div>
              <div style={styles.statLabel}>Guest Rating</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;