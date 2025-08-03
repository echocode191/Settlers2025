import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const [dailyQuote, setDailyQuote] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);
  
  useEffect(() => {
    // Dynamic visitor count simulation - more realistic for a hotel since 2021
    setVisitorCount(Math.floor(Math.random() * 200) + 800);
    
    // Daily quote rotation - more professional quotes
    const quotes = [
      "Comfort is found in the details of hospitality.",
      "Where every guest feels like family.",
      "Creating memorable experiences since 2021.",
      "Your peaceful retreat in the highlands."
    ];
    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Animation styles - more subtle
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtleGlow {
          0%, 100% { box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15); }
          50% { box-shadow: 0 12px 40px rgba(56, 189, 248, 0.15); }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  // Styles with modern glassy design
  const styles = {
    body: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#e2e8f0',
      paddingBottom: '5rem',
      minHeight: '100vh',
    },
    section: {
      maxWidth: '1000px',
      margin: '4rem auto',
      padding: '2rem clamp(1rem, 5vw, 3rem)',
    },
    heading: {
      fontSize: 'clamp(2rem, 6vw, 2.8rem)',
      color: '#e2e8f0',
      textAlign: 'center',
      marginBottom: '3rem',
      fontWeight: '600',
      animation: 'fadeInUp 1s ease',
    },
    block: {
      backdropFilter: 'blur(12px)',
      background: 'rgba(30, 41, 59, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: 'clamp(1.8rem, 4vw, 2.8rem)',
      marginBottom: '2.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      animation: 'fadeInUp 1.2s ease both, subtleGlow 8s ease-in-out infinite',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    blockHover: {
      '&:hover': {
        transform: 'translateY(-5px)',
      }
    },
    title: {
      color: '#38bdf8',
      fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
      marginBottom: '1.2rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    text: {
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      lineHeight: '1.7',
      color: '#cbd5e1',
      marginBottom: '1.4rem',
    },
    quote: {
      fontStyle: 'italic',
      color: '#38bdf8',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      textAlign: 'center',
      marginTop: '2.2rem',
      fontWeight: '500',
    },
    badge: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'rgba(56, 189, 248, 0.2)',
      color: '#38bdf8',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      animation: 'subtlePulse 3s infinite',
      backdropFilter: 'blur(4px)',
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '2rem',
      padding: '1.2rem',
      background: 'rgba(15, 23, 42, 0.5)',
      borderRadius: '16px',
      backdropFilter: 'blur(4px)',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.5rem',
      color: '#38bdf8',
      fontWeight: '600',
    },
    statLabel: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      marginTop: '0.3rem',
    }
  };
  
  return (
    <div style={styles.body}>
      <Navbar />
      <section style={styles.section}>
        <h1 style={styles.heading}>About Settlers Inn</h1>
        
        <div style={{...styles.block, ...styles.blockHover}}>
          <div style={styles.badge}>EST. 2021</div>
          <h3 style={styles.title}>✨ Our Beginning</h3>
          <p style={styles.text}>
            Settlers Inn was founded in 2021 with a simple vision: to create a welcoming space in the heart of Kenya's highlands 
            where guests could experience authentic hospitality and delicious local cuisine.
          </p>
          <p style={styles.text}>
            What started as a modest establishment has quickly grown into a beloved destination for both travelers and locals alike, 
            thanks to our commitment to quality service and genuine warmth.
          </p>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>2+</div>
              <div style={styles.statLabel}>Years of Service</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>2000+</div>
              <div style={styles.statLabel}>Happy Guests</div>
            </div>
          </div>
        </div>
        
        <div style={{...styles.block, ...styles.blockHover}}>
          <div style={styles.badge}>COMMUNITY</div>
          <h3 style={styles.title}>🤝 Our Commitment</h3>
          <p style={styles.text}>
            At Settlers Inn, we believe in the power of community. We source ingredients from local farmers, 
            employ residents from the surrounding areas, and create a space where everyone feels welcome.
          </p>
          <p style={styles.text}>
            Our team is dedicated to providing not just a meal or a room, but an experience that reflects the warmth 
            and richness of Kenyan hospitality.
          </p>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>12+</div>
              <div style={styles.statLabel}>Local Staff</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>20+</div>
              <div style={styles.statLabel}>Local Suppliers</div>
            </div>
          </div>
        </div>
        
        <div style={{...styles.block, ...styles.blockHover}}>
          <div style={styles.badge}>EXPERIENCE</div>
          <h3 style={styles.title}>🔥 What We Offer</h3>
          <p style={styles.text}>
            Settlers Inn offers comfortable accommodations, delicious meals made with locally-sourced ingredients, 
            and versatile conference facilities for your business needs.
          </p>
          <p style={styles.text}>
            Whether you're visiting Kericho for business or leisure, we strive to make your stay memorable 
            with our attention to detail and personalized service.
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
              <div style={styles.statNumber}>4.8★</div>
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