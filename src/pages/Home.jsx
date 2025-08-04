import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showInstallToast, setShowInstallToast] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [dailySpecial, setDailySpecial] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [newContentCount, setNewContentCount] = useState(0);
  const [activeDish, setActiveDish] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Track window size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize(); // Initialize width
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const welcomingPhrases = [
    "🍲 Authentic flavors, memorable experiences",
    "😋 Where local cuisine meets warm hospitality",
    "🛏️ Your comfortable retreat in the highlands",
    "☕ Savor moments that matter",
    "🚀 Settlers Inn — your home away from home"
  ];
  
  const reviews = [
    "The perfect spot for a weekend getaway in Kericho. — Mercy K.",
    "Their coffee is exceptional — reminds me of Nairobi's best cafes. — Brian N.",
    "Clean rooms, friendly staff, and delicious food. Highly recommend. — Jane M.",
    "The chapati and sausage combo is my go-to breakfast. — Kiprotich L.",
    "Impressed by their conference facilities and catering service. — Ivy W.",
    "The egg pancakes are a must-try! Will definitely come back. — Moffat M.",
    "Consistently great service every time I visit. — Susan W.",
    "Loved the peaceful room with the beautiful morning view. — Dennis K.",
    "Settlers Inn has become my regular dining spot. — Terry N.",
    "Their nyama stew and ugali combo is absolutely delicious. — Juma B."
  ];
  
  const featuredDishes = [
    { img: "chapati 1.jpg", emoji: "🥙", title: "Fresh Chapatis", desc: "Soft, flaky, and made to order daily." },
    { img: "fish x chips.jpg", emoji: "🐟", title: "Fish & Chips", desc: "Fresh tilapia with crispy seasoned fries." },
    { img: "cofee.jpg", emoji: "☕", title: "Highland Coffee", desc: "Premium Kenyan coffee, locally sourced." },
    { img: "ugali x greens x meat.jpg", emoji: "🍛", title: "Traditional Platter", desc: "Ugali with sukuma wiki and nyama choma." }
  ];
  
  useEffect(() => {
    // Initialize dynamic content
    const specials = [
      "Today's Special: Nyama Choma with Ugali - KES 800",
      "Weekend Deal: Family Platter for 4 - KES 2500",
      "New Item: Grilled Tilapia with Chips - KES 700",
      "Chef's Choice: Beef Stew with Rice - KES 650"
    ];
    setDailySpecial(specials[Math.floor(Math.random() * specials.length)]);
    setVisitorCount(Math.floor(Math.random() * 300) + 800);
    
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    // Rotate content
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % welcomingPhrases.length);
      setReviewIndex(prev => (prev + 1) % reviews.length);
    }, 7000);
    
    // Simulate new content being added
    const contentInterval = setInterval(() => {
      setNewContentCount(prev => prev + 1);
    }, 45000);
    
    // Rotate featured dishes
    const dishInterval = setInterval(() => {
      setActiveDish(prev => (prev + 1) % featuredDishes.length);
    }, 10000);
    
    // Simulate online status
    const onlineInterval = setInterval(() => {
      setIsOnline(Math.random() > 0.15);
    }, 45000);
    
    // Scroll detection for animations
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallToast(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    
    // Facebook SDK
    if (typeof window !== 'undefined' && !window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    
    // Add keyframe animations to document head
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; }
          100% { opacity: 0; transform: translateY(10px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        /* Mobile-first responsive styles */
        @media (max-width: 480px) {
          .hero-section {
            height: 70vh !important;
            min-height: 400px !important;
          }
          
          .hero-content {
            padding: 1.2rem !important;
            margin: 0 0.8rem !important;
            width: calc(100% - 1.6rem) !important;
          }
          
          .hero-title {
            font-size: 1.8rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .hero-phrase {
            font-size: 1rem !important;
            margin-bottom: 1rem !important;
            min-height: 2rem !important;
          }
          
          .hero-subtitle {
            font-size: 0.85rem !important;
            margin-bottom: 1.2rem !important;
          }
          
          .hero-buttons {
            flex-direction: column !important;
            gap: 0.6rem !important;
          }
          
          .hero-button {
            width: 100% !important;
            padding: 10px 16px !important;
            font-size: 0.9rem !important;
          }
          
          .stats-container {
            flex-direction: column !important;
            gap: 8px !important;
            padding: 10px !important;
            margin: 0 0.8rem !important;
            bottom: 15px !important;
          }
          
          .stat-number {
            font-size: 1.1rem !important;
          }
          
          .stat-label {
            font-size: 0.75rem !important;
          }
          
          .section-container {
            padding: 1.5rem 0.8rem !important;
          }
          
          .intro-section {
            padding: 1.2rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .special-banner {
            padding: 8px 16px !important;
            font-size: 0.85rem !important;
            margin-bottom: 1.2rem !important;
          }
          
          .intro-text {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
          }
          
          .featured-dishes {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }
          
          .dish-image-container {
            height: 150px !important;
          }
          
          .dish-content {
            padding: 1rem !important;
          }
          
          .dish-title {
            font-size: 1.1rem !important;
            margin-bottom: 0.6rem !important;
          }
          
          .dish-desc {
            font-size: 0.85rem !important;
          }
          
          .reviews-section {
            padding: 1.2rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .reviews-title {
            font-size: 1.6rem !important;
            margin-bottom: 1.2rem !important;
          }
          
          .review-text {
            font-size: 0.95rem !important;
          }
          
          .facebook-title {
            font-size: 1.6rem !important;
            margin-bottom: 1.2rem !important;
          }
          
          .facebook-embed {
            width: 100% !important;
            max-width: 300px !important;
          }
          
          .quick-access {
            bottom: 10px !important;
            right: 10px !important;
            padding: 6px !important;
            gap: 6px !important;
          }
          
          .quick-link {
            width: 32px !important;
            height: 32px !important;
            font-size: 0.9rem !important;
          }
          
          .footer-text {
            font-size: 0.75rem !important;
            padding: 0 0.8rem !important;
            margin-top: 2rem !important;
          }
          
          .new-content-banner {
            top: 70px !important;
            right: 10px !important;
            padding: 8px 14px !important;
            font-size: 0.8rem !important;
          }
        }
        
        @media (min-width: 481px) and (max-width: 768px) {
          .hero-section {
            height: 75vh !important;
            min-height: 450px !important;
          }
          
          .hero-content {
            padding: 1.5rem !important;
            margin: 0 1rem !important;
          }
          
          .hero-title {
            font-size: 2.2rem !important;
          }
          
          .hero-phrase {
            font-size: 1.1rem !important;
          }
          
          .hero-subtitle {
            font-size: 0.95rem !important;
          }
          
          .hero-buttons {
            flex-direction: column !important;
            gap: 0.8rem !important;
          }
          
          .hero-button {
            width: 100% !important;
          }
          
          .stats-container {
            flex-direction: column !important;
            gap: 10px !important;
            padding: 12px !important;
            margin: 0 1rem !important;
          }
          
          .section-container {
            padding: 2rem 1rem !important;
          }
          
          .featured-dishes {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .dish-image-container {
            height: 180px !important;
          }
          
          .quick-access {
            bottom: 15px !important;
            right: 15px !important;
            padding: 8px !important;
            gap: 8px !important;
          }
          
          .quick-link {
            width: 36px !important;
            height: 36px !important;
            font-size: 1rem !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
      clearInterval(contentInterval);
      clearInterval(dishInterval);
      clearInterval(onlineInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);
  
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
      setShowInstallToast(false);
    }
  };
  
  // Check if we're on mobile
  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 480;
  
  // Main styles object - similar to Menu component approach
  const styles = {
    toast: {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(30, 41, 59, 0.85)',
      color: '#f1f5f9',
      padding: isSmallMobile ? '12px 18px' : '14px 24px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      fontSize: isSmallMobile ? '12px' : '14px',
      zIndex: 10000,
      maxWidth: '90%',
      textAlign: 'center',
      animation: 'fadeInOut 7s ease-in-out',
      lineHeight: '1.5',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    hero: {
      position: 'relative',
      height: isMobile ? '75vh' : '90vh',
      minHeight: isMobile ? '450px' : '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      color: '#fff',
      textAlign: 'center',
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: '-1',
    },
    heroContent: {
      position: 'relative',
      zIndex: '2',
      padding: isMobile ? '1.5rem' : '2rem',
      maxWidth: '800px',
      width: '100%',
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(12px)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      margin: isMobile ? '0 1rem' : '0',
    },
    title: {
      fontSize: isMobile ? '2.2rem' : 'clamp(2.2rem, 8vw, 4rem)',
      marginBottom: '1.2rem',
      color: '#e2e8f0',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      animation: 'fadeInUp 1.2s ease',
      fontWeight: '600',
    },
    phrase: {
      fontSize: isMobile ? '1.1rem' : 'clamp(1.2rem, 4vw, 1.6rem)',
      marginBottom: '1.5rem',
      color: '#cbd5e1',
      animation: 'subtlePulse 4s infinite',
      minHeight: isMobile ? '2rem' : '2.5rem',
    },
    subtitle: {
      fontSize: isMobile ? '0.95rem' : 'clamp(1rem, 3vw, 1.3rem)',
      marginBottom: isMobile ? '1.5rem' : '2.5rem',
      color: '#94a3b8',
      fontWeight: '300',
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '0.8rem' : '1.2rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    button: {
      display: 'inline-block',
      padding: isMobile ? '12px 20px' : '14px 28px',
      background: 'rgba(56, 189, 248, 0.9)',
      color: '#0f172a',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: isMobile ? '0.9rem' : '1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(56, 189, 248, 0.25)',
      backdropFilter: 'blur(4px)',
      width: isMobile ? '100%' : 'auto',
    },
    bookButton: {
      ...styles.button,
      background: 'rgba(139, 92, 246, 0.9)',
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
    },
    statsContainer: {
      position: 'absolute',
      bottom: '30px',
      left: '0',
      right: '0',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-around',
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(10px)',
      padding: isMobile ? '12px' : '18px',
      borderRadius: '16px',
      margin: isMobile ? '0 1rem' : '0 20px',
      zIndex: '3',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      gap: isMobile ? '10px' : '0',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      fontWeight: '600',
      color: '#38bdf8',
    },
    statLabel: {
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      color: '#cbd5e1',
    },
    section: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '2rem 1rem' : '4rem 1rem',
    },
    intro: {
      ...styles.section,
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: isMobile ? '1.5rem' : '2.5rem',
      marginBottom: isMobile ? '2rem' : '3rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      margin: isMobile ? '0 1rem 2rem' : '0 auto 3rem',
    },
    specialBanner: {
      background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.9), rgba(139, 92, 246, 0.9))',
      color: '#0f172a',
      padding: '12px 24px',
      borderRadius: '30px',
      fontWeight: '600',
      display: 'inline-block',
      marginBottom: '1.8rem',
      animation: 'shimmer 3s infinite',
      backgroundSize: '200px 100%',
      boxShadow: '0 4px 15px rgba(56, 189, 248, 0.25)',
      backdropFilter: 'blur(4px)',
    },
    introText: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      lineHeight: '1.7',
      color: '#e2e8f0',
      maxWidth: '800px',
      margin: '0 auto',
    },
    featured: {
      ...styles.section,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: isMobile ? '1.5rem' : '2.5rem',
      marginBottom: '3rem',
    },
    dish: (index) => ({
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      animation: activeDish === index ? 'gentleFloat 8s ease-in-out infinite' : 'none',
      transform: activeDish === index ? 'translateY(-5px)' : 'none',
      boxShadow: activeDish === index ? '0 12px 40px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.15)',
    }),
    dishImageContainer: {
      position: 'relative',
      height: isMobile ? '180px' : '220px',
      overflow: 'hidden',
    },
    dishImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
    },
    newBadge: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'rgba(239, 68, 68, 0.9)',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
      animation: 'subtlePulse 3s infinite',
      backdropFilter: 'blur(4px)',
    },
    dishContent: {
      padding: isMobile ? '1.2rem' : '1.8rem',
    },
    dishTitle: {
      fontSize: isMobile ? '1.2rem' : '1.4rem',
      marginBottom: '0.8rem',
      color: '#e2e8f0',
      fontWeight: '600',
    },
    dishDesc: {
      color: '#cbd5e1',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    reviews: {
      ...styles.section,
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: isMobile ? '1.5rem' : '2.5rem',
      marginBottom: isMobile ? '2rem' : '3rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      margin: isMobile ? '0 1rem 2rem' : '0 auto 3rem',
    },
    reviewsTitle: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      marginBottom: '2rem',
      color: '#e2e8f0',
      fontWeight: '600',
    },
    reviewRotator: {
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    review: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontStyle: 'italic',
      color: '#e2e8f0',
      lineHeight: '1.7',
      maxWidth: '800px',
      margin: '0 auto',
      animation: 'fadeInUp 1.2s ease',
    },
    facebook: {
      ...styles.section,
      textAlign: 'center',
      marginBottom: '3rem',
    },
    facebookTitle: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      marginBottom: '2rem',
      color: '#e2e8f0',
      fontWeight: '600',
    },
    facebookContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
      width: '100%',
    },
    quickAccess: {
      position: 'fixed',
      bottom: isMobile ? '15px' : '25px',
      right: isMobile ? '15px' : '25px',
      background: 'rgba(30, 41, 59, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '50px',
      padding: isMobile ? '8px' : '12px',
      display: 'flex',
      gap: isMobile ? '8px' : '12px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
      zIndex: '100',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      transform: isScrolled ? 'translateY(0)' : 'translateY(100px)',
      opacity: isScrolled ? '1' : '0',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    quickLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isMobile ? '36px' : '44px',
      height: isMobile ? '36px' : '44px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#38bdf8',
      textDecoration: 'none',
      fontSize: isMobile ? '1rem' : '1.2rem',
      transition: 'all 0.2s ease',
    },
    footerText: {
      textAlign: 'center',
      marginTop: '3rem',
      color: '#64748b',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      padding: isMobile ? '0 1rem' : '0 1rem',
    },
    newContentBanner: {
      position: 'fixed',
      top: '80px',
      right: '20px',
      background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.9), rgba(245, 158, 11, 0.9))',
      color: 'white',
      padding: '10px 18px',
      borderRadius: '20px',
      fontWeight: '600',
      fontSize: '0.9rem',
      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
      zIndex: '100',
      animation: 'subtlePulse 3s infinite',
      transform: newContentCount > 0 ? 'translateX(0)' : 'translateX(200px)',
      transition: 'transform 0.5s ease',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1.2rem',
      cursor: 'pointer',
      marginLeft: '10px',
      lineHeight: 1,
    },
  };
  
  return (
    <>
      <Navbar />
      {showInstallToast && (
        <div style={styles.toast} onClick={handleInstallClick}>
          💡 Tip: Tap here to <strong>install Settlers Inn</strong> as an app!
        </div>
      )}
      
      {newContentCount > 0 && (
        <div style={styles.newContentBanner} className="new-content-banner">
          <span>🆕 {newContentCount} new updates!</span>
          <button 
            style={styles.closeButton}
            onClick={() => setNewContentCount(0)}
          >
            ×
          </button>
        </div>
      )}
      
      <section style={styles.hero} className="hero-section">
        <video 
          style={styles.video} 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="none"
        >
          <source src="/assets/settlers.mp4" type="video/mp4" />
        </video>
        
        <div style={styles.heroContent} className="hero-content">
          <h2 style={styles.title} className="hero-title">Settlers Inn</h2>
          <p style={styles.phrase} className="hero-phrase">{welcomingPhrases[phraseIndex]}</p>
          <p style={styles.subtitle} className="hero-subtitle">Established 2021 | Kericho Highlands</p>
          
          <div style={styles.buttonsContainer} className="hero-buttons">
            <a href="/menu" style={styles.button} className="hero-button">🍽️ Our Menu</a>
            <a href="/accommodation" style={styles.bookButton} className="hero-button">🛏️ Book a Room</a>
          </div>
        </div>
        
        <div style={styles.statsContainer} className="stats-container">
          <div style={styles.statItem}>
            <div style={styles.statNumber} className="stat-number">{visitorCount}+</div>
            <div style={styles.statLabel} className="stat-label">Guests Since 2021</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber} className="stat-number">{currentTime}</div>
            <div style={styles.statLabel} className="stat-label">Local Time</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber} className="stat-number">{isOnline ? 'Open' : 'Busy'}</div>
            <div style={styles.statLabel} className="stat-label">Status</div>
          </div>
        </div>
      </section>
      
      <section style={styles.intro} className="intro-section section-container">
        <div style={styles.specialBanner} className="special-banner">
          🌟 {dailySpecial} 🌟
        </div>
        <p style={styles.introText} className="intro-text">
          Nestled in the heart of Kenya's highlands, Settlers Inn offers a perfect blend of comfort, 
          cuisine, and hospitality. Since our opening in 2021, we've been dedicated to providing 
          authentic experiences and memorable meals for our guests.
        </p>
      </section>
      
      <section style={styles.featured} className="featured-dishes section-container">
        {featuredDishes.map((dish, i) => (
          <div 
            key={i} 
            style={styles.dish(i)}
            onMouseEnter={() => setActiveDish(i)}
          >
            <div style={styles.dishImageContainer} className="dish-image-container">
              <img 
                src={`/assets/${dish.img}`} 
                alt={dish.title} 
                style={styles.dishImage}
                loading="lazy"
              />
              {i === 0 && <div style={styles.newBadge}>NEW</div>}
            </div>
            <div style={styles.dishContent} className="dish-content">
              <h3 style={styles.dishTitle} className="dish-title">{dish.emoji} {dish.title}</h3>
              <p style={styles.dishDesc} className="dish-desc">{dish.desc}</p>
            </div>
          </div>
        ))}
      </section>
      
      <section style={styles.reviews} className="reviews-section section-container">
        <h2 style={styles.reviewsTitle} className="reviews-title">💬 Guest Experiences</h2>
        <div style={styles.reviewRotator}>
          <p style={styles.review} className="review-text">{reviews[reviewIndex]}</p>
        </div>
      </section>
      
      <section style={styles.facebook} className="section-container">
        <h2 style={styles.facebookTitle} className="facebook-title">💬 Facebook Reviews</h2>
        <div style={styles.facebookContainer} className="facebook-container">
          <div 
            className="fb-xfbml-parse-ignore facebook-embed"
            data-href="https://www.facebook.com/settlersinn1/"
            data-tabs="timeline"
            data-width={isMobile ? "350" : "380"}
            data-height="400"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote cite="https://www.facebook.com/settlersinn1/">
              <a href="https://www.facebook.com/settlersinn1/">Settlers Inn</a>
            </blockquote>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <div style={styles.quickAccess} className="quick-access">
        <a href="tel:0748778388" style={styles.quickLink} className="quick-link">📞</a>
        <a href="https://maps.app.goo.gl/hvW5TubkM8WGcfAs5" target="_blank" rel="noreferrer" style={styles.quickLink} className="quick-link">🧭</a>
        <a href="/accommodation" style={styles.quickLink} className="quick-link">🛏️</a>
        <a href="/gallery" style={styles.quickLink} className="quick-link">📷</a>
        <a href="/menu" style={styles.quickLink} className="quick-link">🥘</a>
        <a href="https://wa.me/254748778388" target="_blank" rel="noreferrer" style={styles.quickLink} className="quick-link">💬</a>
      </div>
      
      <p style={styles.footerText} className="footer-text">
        &copy; {new Date().getFullYear()} Settlers Inn — Established 2021 | Built by EchoCode
      </p>
    </>
  );
}

export default Home;
