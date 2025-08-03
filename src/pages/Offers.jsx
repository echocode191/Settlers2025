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
    
    // Animation styles
    if (typeof document !== 'undefined') {
      const style = document.createElement("style");
      style.innerHTML = `
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
        .new-offers-banner {
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.9), rgba(139, 92, 246, 0.9));
          color: #0f172a;
          padding: 10px 18px;
          border-radius: 20px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1.5rem;
          animation: shimmer 3s infinite;
          background-size: 200px 100%;
          backdrop-filter: blur(4px);
        }
        .stats-container {
          display: flex;
          justify-content: space-around;
          background: rgba(30, 41, 59, 0.7);
          border-radius: 16px;
          padding: 1.2rem;
          margin-top: 1rem;
          backdrop-filter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
        .stat-item {
          text-align: center;
        }
        .stat-number {
          font-size: 1.3rem;
          color: #38bdf8;
          font-weight: 600;
        }
        .stat-label {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-top: '0.3rem',
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      clearInterval(countdownInterval);
      clearInterval(messageInterval);
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
  
  // Styles with modern glassy design
  const styles = {
    wrapper: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#e2e8f0',
      minHeight: '100vh',
      padding: '3rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      background: 'rgba(30, 41, 59, 0.7)',
      padding: '2.5rem',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      maxWidth: '600px',
      width: '100%',
      animation: 'fadeInUp 0.8s ease',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
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
      backdropFilter: 'blur(4px)',
      border: '1px solid rgba(56, 189, 248, 0.3)',
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
      backdropFilter: 'blur(4px)',
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
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      color: '#e2e8f0',
      marginTop: '0.8rem',
      outline: 'none',
      backdropFilter: 'blur(4px)',
      transition: 'all 0.2s ease',
    },
    label: {
      color: '#38bdf8',
      fontSize: '1rem',
      fontWeight: '500',
      display: 'block',
      marginBottom: '0.5rem',
    }
  };
  
  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <h2 style={styles.funHeader}>{promotionalMessages[messageIndex]}</h2>
        
        {newOffers > 0 && (
          <div className="new-offers-banner">
            🆕 {newOffers} new offers added this week!
          </div>
        )}
        
        <div style={styles.card}>
          <h1 style={styles.title}>10% OFF — This Week Only!</h1>
          {!expired && (
            <div style={styles.countdown}>
              ⏳ Offer ends in: <strong style={styles.timer}>{countdown}</strong>
            </div>
          )}
          <p style={styles.description}>
            Enjoy authentic Kenyan meals and comfortable stays at Settlers Inn. This special offer is available for a limited time.
          </p>
          
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">{visitorCount}+</div>
              <div className="stat-label">Visitors Today</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{claimed ? 'Claimed' : 'Available'}</div>
              <div className="stat-label">Offer Status</div>
            </div>
          </div>
          
          {!claimed && !fakeLoading && (
            <button
              onClick={handleClaim}
              disabled={expired}
              style={{
                ...styles.button,
                backgroundColor: expired ? 'rgba(100, 116, 139, 0.7)' : 'rgba(37, 211, 102, 0.9)',
                cursor: expired ? 'not-allowed' : 'pointer',
                boxShadow: expired ? 'none' : '0 4px 15px rgba(37, 211, 102, 0.25)',
              }}
            >
              {expired ? "Offer Expired" : "Claim Offer Now"}
            </button>
          )}
          
          {fakeLoading && (
            <div style={{ marginTop: "1.5rem" }}>
              <div style={styles.spinner}></div>
              <p style={styles.joke}>{joke}</p>
              <p style={{ color: "#38bdf8", fontSize: "0.9rem" }}>Processing your request...</p>
            </div>
          )}
          
          {claimed && !fakeLoading && !feedbackStep && (
            <button
              style={{ 
                ...styles.button, 
                backgroundColor: 'rgba(100, 116, 139, 0.7)', 
                cursor: 'not-allowed' 
              }}
              disabled
            >
              Already Claimed
            </button>
          )}
          
          {feedbackStep && (
            <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
              <label style={styles.label}>
                What would you like to order or book?
              </label>
              <textarea
                ref={textareaRef}
                rows="4"
                placeholder="e.g. I'd like to reserve a room for Friday and order chicken stew"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                style={styles.textarea}
              />
              <button
                onClick={handleSend}
                style={{
                  ...styles.button,
                  marginTop: "1rem",
                  backgroundColor: 'rgba(56, 189, 248, 0.9)',
                  color: '#0f172a',
                  boxShadow: '0 4px 15px rgba(56, 189, 248, 0.25)',
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