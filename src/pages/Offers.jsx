import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Offers = () => {
  const offerKey = "settlers-offer-claimed";
  const [claimed, setClaimed] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [expired, setExpired] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [fakeLoading, setFakeLoading] = useState(false);
  const [joke, setJoke] = useState("");
  const [feedbackStep, setFeedbackStep] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [newOffers, setNewOffers] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isVerySmallMobile, setIsVerySmallMobile] = useState(false);
  
  const textareaRef = useRef(null);
  
  const promotionalMessages = [
    "Special offer this week at Settlers Inn",
    "Enjoy authentic Kenyan cuisine at a special price",
    "Limited time offer for our valued guests",
    "Experience our hospitality with this exclusive deal",
    "Your perfect getaway at a special rate"
  ];
  
  const loadingMessages = [
    "Processing your request...",
    "Preparing your discount...",
    "Finalizing your offer...",
    "Almost ready...",
    "Applying your special offer..."
  ];
  
  const offerExpiresAt = new Date("2025-07-25T23:59:59");
  
  useEffect(() => {
    // Initialize dynamic content
    setNewOffers(Math.floor(Math.random() * 3) + 1);
    setVisitorCount(Math.floor(Math.random() * 100) + 50);
    
    const isClaimed = localStorage.getItem(offerKey) === "true";
    setClaimed(isClaimed);
    
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = offerExpiresAt.getTime() - now;
      if (distance < 0) {
        clearInterval(countdownInterval);
        setCountdown("Offer expired");
        setExpired(true);
        return;
      }
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % promotionalMessages.length);
    }, 5000);
    
    // Check screen size for responsive design
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
      setIsVerySmallMobile(window.innerWidth <= 333);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      clearInterval(countdownInterval);
      clearInterval(messageInterval);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  useEffect(() => {
    if (feedbackStep && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [feedbackStep]);
  
  const handleClaim = () => {
    localStorage.setItem(offerKey, "true");
    setClaimed(true);
    setFakeLoading(true);
    setJoke(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    setTimeout(() => {
      setFakeLoading(false);
      setFeedbackStep(true);
    }, 4000);
  };
  
  const handleSend = () => {
    if (!feedbackMessage.trim()) return;
    const url = `https://wa.me/254748778388?text=${encodeURIComponent(
      `Hi Settlers Inn! I just claimed the 10% OFF offer.\n\nHere's my request:\n${feedbackMessage}`
    )}`;
    window.open(url, "_blank");
  };
  
  // Glassy styles
  const glassyStyle = {
    wrapper: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#e2e8f0',
      minHeight: '100vh',
      padding: '3rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'hidden'
    },
    funHeader: {
      fontSize: '1.2rem',
      marginBottom: '1.5rem',
      color: '#38bdf8',
      animation: 'subtlePulse 4s ease-in-out infinite',
      minHeight: '40px',
      fontWeight: '500',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.08)',
      padding: '2.5rem',
      borderRadius: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      maxWidth: '600px',
      width: '100%',
      animation: 'fadeInUp 0.8s ease',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(16px)'
    },
    title: {
      color: '#e2e8f0',
      fontSize: '2rem',
      marginBottom: '1.2rem',
      fontWeight: '600',
    },
    countdown: {
      background: 'rgba(56, 189, 248, 0.2)',
      padding: '0.8rem 1.2rem',
      borderRadius: '12px',
      display: 'inline-block',
      color: '#e2e8f0',
      fontSize: '1rem',
      marginBottom: '1.2rem',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    timer: {
      color: '#38bdf8',
      fontWeight: '600',
    },
    description: {
      margin: '1.2rem 0 2rem',
      fontSize: '1.05rem',
      color: '#cbd5e1',
      lineHeight: '1.6',
    },
    button: {
      padding: '0.9rem 2rem',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '12px',
      color: '#fff',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    spinner: {
      border: '4px solid rgba(56, 189, 248, 0.2)',
      borderTop: '4px solid #38bdf8',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      margin: '0 auto',
      animation: 'spin 1s linear infinite',
    },
    joke: {
      color: '#94a3b8',
      marginTop: '1rem',
      fontStyle: 'italic',
    },
    textarea: {
      width: '100%',
      padding: '0.8rem',
      fontSize: '1rem',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      color: '#e2e8f0',
      marginTop: '0.8rem',
      outline: 'none',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.2s ease',
      WebkitBackdropFilter: 'blur(8px)'
    },
    label: {
      color: '#38bdf8',
      fontSize: '1rem',
      fontWeight: '500',
      display: 'block',
      marginBottom: '0.5rem',
    },
    newOffersBanner: {
      background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.8), rgba(139, 92, 246, 0.8))',
      color: '#0f172a',
      padding: '10px 18px',
      borderRadius: '20px',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: '1.5rem',
      animation: 'shimmer 3s infinite',
      backgroundSize: '200px 100%',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '1.2rem',
      marginTop: '1rem',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.3rem',
      color: '#38bdf8',
      fontWeight: '600',
    },
    statLabel: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      marginTop: '0.3rem',
    },
    // Mobile styles
    mobileWrapper: {
      padding: '2rem 1rem',
    },
    mobileFunHeader: {
      fontSize: '1.1rem',
    },
    mobileCard: {
      padding: '2rem',
    },
    mobileTitle: {
      fontSize: '1.8rem',
    },
    mobileDescription: {
      fontSize: '1rem',
    },
    mobileButton: {
      padding: '0.8rem 1.8rem',
      fontSize: '1rem',
    },
    mobileTextarea: {
      fontSize: '0.95rem',
    },
    mobileLabel: {
      fontSize: '0.95rem',
    },
    // Small mobile styles
    smallMobileWrapper: {
      padding: '1.5rem 0.8rem',
    },
    smallMobileFunHeader: {
      fontSize: '1rem',
    },
    smallMobileCard: {
      padding: '1.5rem',
    },
    smallMobileTitle: {
      fontSize: '1.6rem',
    },
    smallMobileDescription: {
      fontSize: '0.95rem',
    },
    smallMobileButton: {
      padding: '0.7rem 1.5rem',
      fontSize: '0.95rem',
    },
    smallMobileTextarea: {
      fontSize: '0.9rem',
    },
    smallMobileLabel: {
      fontSize: '0.9rem',
    },
    // Very small mobile styles
    verySmallMobileWrapper: {
      padding: '1.2rem 0.6rem',
    },
    verySmallMobileFunHeader: {
      fontSize: '0.95rem',
    },
    verySmallMobileCard: {
      padding: '1.2rem',
    },
    verySmallMobileTitle: {
      fontSize: '1.4rem',
    },
    verySmallMobileDescription: {
      fontSize: '0.9rem',
    },
    verySmallMobileButton: {
      padding: '0.6rem 1.2rem',
      fontSize: '0.9rem',
    },
    verySmallMobileTextarea: {
      fontSize: '0.85rem',
    },
    verySmallMobileLabel: {
      fontSize: '0.85rem',
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
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes subtlePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
        `}
      </style>
      
      <Navbar />
      <div style={getResponsiveStyle(
        glassyStyle.wrapper,
        glassyStyle.mobileWrapper,
        glassyStyle.smallMobileWrapper,
        glassyStyle.verySmallMobileWrapper
      )}>
        <h2 style={getResponsiveStyle(
          glassyStyle.funHeader,
          glassyStyle.mobileFunHeader,
          glassyStyle.smallMobileFunHeader,
          glassyStyle.verySmallMobileFunHeader
        )}>{promotionalMessages[messageIndex]}</h2>
        
        {newOffers > 0 && (
          <div style={glassyStyle.newOffersBanner}>
            🆕 {newOffers} new offers added this week!
          </div>
        )}
        
        <div style={getResponsiveStyle(
          glassyStyle.card,
          glassyStyle.mobileCard,
          glassyStyle.smallMobileCard,
          glassyStyle.verySmallMobileCard
        )}>
          <h1 style={getResponsiveStyle(
            glassyStyle.title,
            glassyStyle.mobileTitle,
            glassyStyle.smallMobileTitle,
            glassyStyle.verySmallMobileTitle
          )}>10% OFF — This Week Only!</h1>
          {!expired && (
            <div style={glassyStyle.countdown}>
              ⏳ Offer ends in: <strong style={glassyStyle.timer}>{countdown}</strong>
            </div>
          )}
          <p style={getResponsiveStyle(
            glassyStyle.description,
            glassyStyle.mobileDescription,
            glassyStyle.smallMobileDescription,
            glassyStyle.verySmallMobileDescription
          )}>
            Enjoy authentic Kenyan meals and comfortable stays at Settlers Inn. This special offer is available for a limited time.
          </p>
          
          <div style={glassyStyle.statsContainer}>
            <div style={glassyStyle.statItem}>
              <div style={glassyStyle.statNumber}>{visitorCount}+</div>
              <div style={glassyStyle.statLabel}>Visitors Today</div>
            </div>
            <div style={glassyStyle.statItem}>
              <div style={glassyStyle.statNumber}>{claimed ? 'Claimed' : 'Available'}</div>
              <div style={glassyStyle.statLabel}>Offer Status</div>
            </div>
          </div>
          
          {!claimed && !fakeLoading && (
            <button
              onClick={handleClaim}
              disabled={expired}
              style={{
                ...getResponsiveStyle(
                  glassyStyle.button,
                  glassyStyle.mobileButton,
                  glassyStyle.smallMobileButton,
                  glassyStyle.verySmallMobileButton
                ),
                backgroundColor: expired ? 'rgba(100, 116, 139, 0.8)' : 'rgba(37, 211, 102, 0.8)',
                cursor: expired ? 'not-allowed' : 'pointer',
                boxShadow: expired ? 'none' : '0 4px 15px rgba(37, 211, 102, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {expired ? "Offer Expired" : "Claim Offer Now"}
            </button>
          )}
          
          {fakeLoading && (
            <div style={{ marginTop: "1.5rem" }}>
              <div style={glassyStyle.spinner}></div>
              <p style={glassyStyle.joke}>{joke}</p>
              <p style={{ color: "#38bdf8", fontSize: "0.9rem" }}>Processing your request...</p>
            </div>
          )}
          
          {claimed && !fakeLoading && !feedbackStep && (
            <button
              style={{ 
                ...getResponsiveStyle(
                  glassyStyle.button,
                  glassyStyle.mobileButton,
                  glassyStyle.smallMobileButton,
                  glassyStyle.verySmallMobileButton
                ), 
                backgroundColor: 'rgba(100, 116, 139, 0.8)', 
                cursor: 'not-allowed',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              disabled
            >
              Already Claimed
            </button>
          )}
          
          {feedbackStep && (
            <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
              <label style={getResponsiveStyle(
                glassyStyle.label,
                glassyStyle.mobileLabel,
                glassyStyle.smallMobileLabel,
                glassyStyle.verySmallMobileLabel
              )}>
                What would you like to order or book?
              </label>
              <textarea
                ref={textareaRef}
                rows="4"
                placeholder="e.g. I'd like to reserve a room for Friday and order chicken stew"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                style={getResponsiveStyle(
                  glassyStyle.textarea,
                  glassyStyle.mobileTextarea,
                  glassyStyle.smallMobileTextarea,
                  glassyStyle.verySmallMobileTextarea
                )}
              />
              <button
                onClick={handleSend}
                style={{
                  ...getResponsiveStyle(
                    glassyStyle.button,
                    glassyStyle.mobileButton,
                    glassyStyle.smallMobileButton,
                    glassyStyle.verySmallMobileButton
                  ),
                  marginTop: "1rem",
                  backgroundColor: 'rgba(56, 189, 248, 0.8)',
                  color: '#0f172a',
                  boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                Send via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Offers;
