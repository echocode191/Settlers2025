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
  
  const funnyMessages = [
    "🎯 This is not a drill! Real offer, real food!",
    "🍲 Come hungry. Leave royalty.",
    "🚨 10% off before Grandma eats it all!",
    "🔥 Offers hotter than our chapatis!",
    "👑 Eat like a king. Pay like a peasant.",
    "🕒 Hurry! This deal runs faster than our waiter!",
  ];
  
  const funnyJokes = [
    "🤣 Scanning your stomach... yep, it's hungry!",
    "🤖 Warming up our chef bots...",
    "💸 Applying discount magic. Please wait...",
    "🍛 Spicing up your offer. Hang tight...",
    "🐐 Herding goats for the freshest stew...",
    "⏳ One moment... bribing the waiter with chai ☕",
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
      setMessageIndex((prev) => (prev + 1) % funnyMessages.length);
    }, 4000);
    
    // Animation styles
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }
      @keyframes popIn {
        0% { transform: scale(0.9); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      .new-offers-banner {
        background: linear-gradient(90deg, #ff3e3e, #ff9e3e);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 1rem;
        animation: shimmer 2s infinite;
        background-size: 200px 100%;
      }
      .stats-container {
        display: flex;
        justify-content: space-around;
        background: rgba(22, 27, 34, 0.5);
        border-radius: 12px;
        padding: 1rem;
        margin-top: 1rem;
      }
      .stat-item {
        text-align: center;
      }
      .stat-number {
        font-size: 1.2rem;
        color: #9fef00;
        font-weight: bold;
      }
      .stat-label {
        font-size: 0.8rem;
        color: #8b949e;
      }
    `;
    document.head.appendChild(style);
    
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
    setJoke(funnyJokes[Math.floor(Math.random() * funnyJokes.length)]);
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

  const styles = {
    wrapper: {
      fontFamily: "Fira Code, monospace",
      backgroundColor: "#0d1117",
      color: "#c9d1d9",
      minHeight: "100vh",
      padding: "3rem 1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    funHeader: {
      fontSize: "1.2rem",
      marginBottom: "1.5rem",
      color: "#58a6ff",
      animation: "pulse 3s ease-in-out infinite",
      minHeight: "40px",
    },
    card: {
      background: "#161b22",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 0 20px rgba(159, 239, 0, 0.15)",
      maxWidth: "600px",
      width: "100%",
      animation: "popIn 0.6s ease",
    },
    title: {
      color: "#9fef00",
      fontSize: "1.8rem",
      marginBottom: "1rem",
    },
    countdown: {
      backgroundColor: "#1f6feb",
      padding: "0.6rem 1rem",
      borderRadius: "8px",
      display: "inline-block",
      color: "#fff",
      fontSize: "1rem",
      marginBottom: "1rem",
    },
    timer: {
      color: "#9fef00",
    },
    description: {
      margin: "1rem 0 2rem",
      fontSize: "1.05rem",
      color: "#c9d1d9",
    },
    button: {
      padding: "0.9rem 2rem",
      fontSize: "1.1rem",
      border: "none",
      borderRadius: "10px",
      color: "#fff",
      transition: "0.3s ease",
      boxShadow: "0 0 10px rgba(37, 211, 102, 0.3)",
    },
    spinner: {
      border: "4px solid #ccc",
      borderTop: "4px solid #9fef00",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      margin: "0 auto",
      animation: "spin 1s linear infinite",
    },
    joke: {
      color: "#999",
      marginTop: "1rem",
      fontStyle: "italic",
    },
    textarea: {
      width: "100%",
      padding: "0.8rem",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "1px solid #333",
      backgroundColor: "#0d1117",
      color: "#fff",
      marginTop: "0.5rem",
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <h2 style={styles.funHeader}>{funnyMessages[messageIndex]}</h2>
        
        {newOffers > 0 && (
          <div className="new-offers-banner">
            🆕 {newOffers} new offers added this week!
          </div>
        )}
        
        <div style={styles.card}>
          <h1 style={styles.title}>🎉 10% OFF — This Week Only!</h1>
          {!expired && (
            <div style={styles.countdown}>
              ⏳ Offer ends in: <strong style={styles.timer}>{countdown}</strong>
            </div>
          )}
          <p style={styles.description}>
            Indulge in authentic Kenyan meals and cozy stays at Settlers Inn. Grab this deal before it vanishes!
          </p>
          
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{visitorCount}+</div>
              <div style={styles.statLabel}>Visitors Today</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{claimed ? 'Claimed' : 'Available'}</div>
              <div style={styles.statLabel}>Offer Status</div>
            </div>
          </div>
          
          {!claimed && !fakeLoading && (
            <button
              onClick={handleClaim}
              disabled={expired}
              style={{
                ...styles.button,
                backgroundColor: expired ? "#555" : "#25D366",
                cursor: expired ? "not-allowed" : "pointer",
              }}
            >
              {expired ? "❌ Offer Expired" : "🎁 Claim Offer Now"}
            </button>
          )}
          
          {fakeLoading && (
            <div style={{ marginTop: "1.5rem" }}>
              <div style={styles.spinner}></div>
              <p style={styles.joke}>{joke}</p>
              <p style={{ color: "#58a6ff", fontSize: "0.9rem" }}>Finalizing your discount...</p>
            </div>
          )}
          
          {claimed && !fakeLoading && !feedbackStep && (
            <button
              style={{ ...styles.button, backgroundColor: "#555", cursor: "not-allowed" }}
              disabled
            >
              ✅ Already Claimed
            </button>
          )}
          
          {feedbackStep && (
            <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
              <label style={{ color: "#9fef00", fontSize: "1rem" }}>
                ✍️ What would you like to order or book?
              </label>
              <textarea
                ref={textareaRef}
                rows="4"
                placeholder="e.g. I'd love to reserve a room for Friday and order chicken stew 🍗"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                style={styles.textarea}
              />
              <button
                onClick={handleSend}
                style={{
                  ...styles.button,
                  marginTop: "1rem",
                  backgroundColor: "#9fef00",
                  color: "#0d1117",
                }}
              >
                💬 Send via WhatsApp
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