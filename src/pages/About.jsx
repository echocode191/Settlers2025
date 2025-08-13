import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const [dailyQuote, setDailyQuote] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isVerySmallMobile, setIsVerySmallMobile] = useState(false);
  
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
    
    // Check screen size for responsive design
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
      setIsVerySmallMobile(window.innerWidth <= 333);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Glassy style object
  const glassyStyle = {
    body: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#e2e8f0',
      paddingBottom: '5rem',
      minHeight: '100vh',
      overflowX: 'hidden'
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
      backdropFilter: 'blur(16px)',
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      padding: 'clamp(1.8rem, 4vw, 2.8rem)',
      marginBottom: '2.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      animation: 'fadeInUp 1.2s ease both, subtleGlow 8s ease-in-out infinite',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      WebkitBackdropFilter: 'blur(16px)'
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
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '2rem',
      padding: '1.2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      WebkitBackdropFilter: 'blur(8px)'
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
    },
    // Mobile styles
    mobileSection: {
      margin: '2rem auto',
      padding: '1.5rem clamp(0.8rem, 4vw, 2rem)',
    },
    mobileHeading: {
      marginBottom: '2rem',
    },
    mobileBlock: {
      padding: 'clamp(1.5rem, 3vw, 2rem)',
      marginBottom: '1.8rem',
    },
    mobileStats: {
      padding: '1rem',
      marginTop: '1.5rem',
    },
    mobileStatNumber: {
      fontSize: '1.3rem',
    },
    mobileStatLabel: {
      fontSize: '0.75rem',
    },
    // Small mobile styles
    smallMobileSection: {
      margin: '1.5rem auto',
      padding: '1.2rem clamp(0.6rem, 3vw, 1.5rem)',
    },
    smallMobileHeading: {
      marginBottom: '1.5rem',
    },
    smallMobileBlock: {
      padding: 'clamp(1.2rem, 3vw, 1.8rem)',
      marginBottom: '1.5rem',
    },
    smallMobileTitle: {
      fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)',
      marginBottom: '1rem',
    },
    smallMobileText: {
      fontSize: 'clamp(0.9rem, 2.3vw, 1rem)',
      lineHeight: '1.6',
      marginBottom: '1.2rem',
    },
    smallMobileQuote: {
      fontSize: 'clamp(0.9rem, 2.3vw, 1rem)',
      marginTop: '1.8rem',
    },
    smallMobileStats: {
      padding: '0.8rem',
      marginTop: '1.2rem',
    },
    smallMobileStatNumber: {
      fontSize: '1.1rem',
    },
    smallMobileStatLabel: {
      fontSize: '0.7rem',
    },
    // Very small mobile styles
    verySmallMobileSection: {
      margin: '1rem auto',
      padding: '1rem clamp(0.5rem, 3vw, 1.2rem)',
    },
    verySmallMobileHeading: {
      marginBottom: '1.2rem',
    },
    verySmallMobileBlock: {
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      marginBottom: '1.2rem',
    },
    verySmallMobileTitle: {
      fontSize: 'clamp(1rem, 3vw, 1.3rem)',
      marginBottom: '0.8rem',
    },
    verySmallMobileText: {
      fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
      lineHeight: '1.5',
      marginBottom: '1rem',
    },
    verySmallMobileQuote: {
      fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
      marginTop: '1.5rem',
    },
    verySmallMobileStats: {
      padding: '0.6rem',
      marginTop: '1rem',
    },
    verySmallMobileStatNumber: {
      fontSize: '1rem',
    },
    verySmallMobileStatLabel: {
      fontSize: '0.65rem',
    }
  };
  
  // Get responsive styles
  const getResponsiveStyle = (baseStyle, mobileStyle, smallMobileStyle, verySmallMobileStyle) => {
    if (isVerySmallMobile && verySmallMobileStyle) return { ...baseStyle, ...verySmallMobileStyle };
    if (isSmallMobile && smallMobileStyle) return { ...baseStyle, ...smallMobileStyle };
    if (isMobile && mobileStyle) return { ...baseStyle, ...mobileStyle };
    return baseStyle;
  };
  
  return (
    <div style={glassyStyle.body}>
      <style>
        {`
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
        `}
      </style>
      
      <Navbar />
      <section style={getResponsiveStyle(
        glassyStyle.section,
        glassyStyle.mobileSection,
        glassyStyle.smallMobileSection,
        glassyStyle.verySmallMobileSection
      )}>
        <h1 style={getResponsiveStyle(
          glassyStyle.heading,
          glassyStyle.mobileHeading,
          glassyStyle.smallMobileHeading,
          glassyStyle.verySmallMobileHeading
        )}>About Settlers Inn</h1>
        
        <div style={getResponsiveStyle(
          glassyStyle.block,
          glassyStyle.mobileBlock,
          glassyStyle.smallMobileBlock,
          glassyStyle.verySmallMobileBlock
        )}>
          <div style={glassyStyle.badge}>EST. 2021</div>
          <h3 style={getResponsiveStyle(
            glassyStyle.title,
            null,
            glassyStyle.smallMobileTitle,
            glassyStyle.verySmallMobileTitle
          )}>✨ Our Beginning</h3>
          <p style={getResponsiveStyle(
            glassyStyle.text,
            null,
            glassyStyle.smallMobileText,
            glassyStyle.verySmallMobileText
          )}>
            Settlers Inn was founded in 2021 with a simple vision: to create a welcoming space in the heart of Kenya's highlands 
            where guests could experience authentic hospitality and delicious local cuisine.
          </p>
          <p style={getResponsiveStyle(
            glassyStyle.text,
            null,
            glassyStyle.smallMobileText,
            glassyStyle.verySmallMobileText
          )}>
            What started as a modest establishment has quickly grown into a beloved destination for both travelers and locals alike, 
            thanks to our commitment to quality service and genuine warmth.
          </p>
          <div style={getResponsiveStyle(
            glassyStyle.stats,
            glassyStyle.mobileStats,
            glassyStyle.smallMobileStats,
            glassyStyle.verySmallMobileStats
          )}>
            <div style={glassyStyle.statItem}>
              <div style={getResponsiveStyle(
                glassyStyle.statNumber,
                glassyStyle.mobileStatNumber,
                glassyStyle.smallMobileStatNumber,
                glassyStyle.verySmallMobileStatNumber
              )}>2+</div>
              <div style={getResponsiveStyle(
                glassyStyle.statLabel,
                glassyStyle.mobileStatLabel,
                glassyStyle.smallMobileStatLabel,
                glassyStyle.verySmallMobileStatLabel
              )}>Years of Service</div>
            </div>
            <div style={glassyStyle.statItem}>
              <div style={getResponsiveStyle(
                glassyStyle.statNumber,
                glassyStyle.mobileStatNumber,
                glassyStyle.smallMobileStatNumber,
                glassyStyle.verySmallMobileStatNumber
              )}>2000+</div>
              <div style={getResponsiveStyle(
                glassyStyle.statLabel,
                glassyStyle.mobileStatLabel,
                glassyStyle.smallMobileStatLabel,
                glassyStyle.verySmallMobileStatLabel
              )}>Happy Guests</div>
            </div>
          </div>
        </div>
        
        <div style={getResponsiveStyle(
          glassyStyle.block,
          glassyStyle.mobileBlock,
          glassyStyle.smallMobileBlock,
          glassyStyle.verySmallMobileBlock
        )}>
          <div style={glassyStyle.badge}>COMMUNITY</div>
          <h3 style={getResponsiveStyle(
            glassyStyle.title,
            null,
            glassyStyle.smallMobileTitle,
            glassyStyle.verySmallMobileTitle
          )}>🤝 Our Commitment</h3>
          <p style={getResponsiveStyle(
            glassyStyle.text,
            null,
            glassyStyle.smallMobileText,
            glassyStyle.verySmallMobileText
          )}>
            At Settlers Inn, we believe in the power of community. We source ingredients from local farmers, 
            employ residents from the surrounding areas, and create a space where everyone feels welcome.
          </p>
          <p style={getResponsiveStyle(
            glassyStyle.text,
            null,
            glassyStyle.smallMobileText,
            glassyStyle.verySmallMobileText
          )}>
            Our team is dedicated to providing not just a meal or a room, but an experience that reflects the warmth 
            and richness of Kenyan hospitality.
          </p>
          <div style={getResponsiveStyle(
            glassyStyle.stats,
            glassyStyle.mobileStats,
            glassyStyle.smallMobileStats,
            glassyStyle.verySmallMobileStats
          )}>
            <div style={glassyStyle.statItem}>
              <div style={getResponsiveStyle(
                glassyStyle.statNumber,
                glassyStyle.mobileStatNumber,
                glassyStyle.smallMobileStatNumber,
                glassyStyle.verySmallMobileStatNumber
              )}>12+</div>
              <div style={getResponsiveStyle(
                glassyStyle.statLabel,
                glassyStyle.mobileStatLabel,
                glassyStyle.smallMobileStatLabel,
                glassyStyle.verySmallMobileStatLabel
              )}>Local Staff</div>
            </div>
            <div style={glassyStyle.statItem}>
              <div style={getResponsiveStyle(
                glassyStyle.statNumber,
                glassyStyle.mobileStatNumber,
                glassyStyle.smallMobileStatNumber,
                glassyStyle.verySmallMobileStatNumber
              )}>20+</div>
              <div style={getResponsiveStyle(
                glassyStyle.statLabel,
                glassyStyle.mobileStatLabel,
                glassyStyle.smallMobileStatLabel,
                glassyStyle.verySmallMobileStatLabel
              )}>Local Suppliers</div>
            </div>
          </div>
        </div>
        
        <div style={getResponsiveStyle(
          glassyStyle.block,
          glassyStyle.mobileBlock,
          glassyStyle.smallMobileBlock,
          glassyStyle.verySmallMobileBlock
        )}>
          <div style={glassyStyle.badge}>EXPERIENCE</div>
          <h3 style={getResponsiveStyle(
            glassyStyle.title,
            null,
            glassyStyle.smallMobileTitle,
            glassyStyle.verySmallMobileTitle
          )}>🔥 What We Offer</h3>
          <p style={getResponsiveStyle(
            glassyStyle.text,
            null,
            glassyStyle.smallMobileText,
            glassyStyle.verySmallMobileText
          )}>
            Settlers Inn offers comfortable accommodations, delicious meals made with locally-sourced ingredients, 
            and versatile conference facilities for your business needs.
          </p>
          <p style={getResponsiveStyle(
            glassyStyle.text,
            null,
            glassyStyle.smallMobileText,
            glassyStyle.verySmallMobileText
          )}>
            Whether you're visiting Kericho for business or leisure, we strive to make your stay memorable 
            with our attention to detail and personalized service.
          </p>
          <p style={getResponsiveStyle(
            glassyStyle.quote,
            null,
            glassyStyle.smallMobileQuote,
            glassyStyle.verySmallMobileQuote
          )}>
            "{dailyQuote}"
          </p>
          <div style={getResponsiveStyle(
            glassyStyle.stats,
            glassyStyle.mobileStats,
            glassyStyle.smallMobileStats,
            glassyStyle.verySmallMobileStats
          )}>
            <div style={glassyStyle.statItem}>
              <div style={getResponsiveStyle(
                glassyStyle.statNumber,
                glassyStyle.mobileStatNumber,
                glassyStyle.smallMobileStatNumber,
                glassyStyle.verySmallMobileStatNumber
              )}>{visitorCount}</div>
              <div style={getResponsiveStyle(
                glassyStyle.statLabel,
                glassyStyle.mobileStatLabel,
                glassyStyle.smallMobileStatLabel,
                glassyStyle.verySmallMobileStatLabel
              )}>Visitors Today</div>
            </div>
            <div style={glassyStyle.statItem}>
              <div style={getResponsiveStyle(
                glassyStyle.statNumber,
                glassyStyle.mobileStatNumber,
                glassyStyle.smallMobileStatNumber,
                glassyStyle.verySmallMobileStatNumber
              )}>4.8★</div>
              <div style={getResponsiveStyle(
                glassyStyle.statLabel,
                glassyStyle.mobileStatLabel,
                glassyStyle.smallMobileStatLabel,
                glassyStyle.verySmallMobileStatLabel
              )}>Guest Rating</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
