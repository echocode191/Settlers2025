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
    
    // Add keyframe animations and responsive styles to document head
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
        
        /* Base styles */
        .home-container {
          font-family: 'Inter', system-ui, sans-serif;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #e2e8f0;
          min-height: 100vh;
        }
        
        .hero-section {
          position: relative;
          height: 90vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: #fff;
          text-align: center;
        }
        
        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 2rem;
          max-width: 800px;
          width: 100%;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 0 1rem;
        }
        
        .hero-title {
          font-size: clamp(2.2rem, 8vw, 4rem);
          margin-bottom: 1.2rem;
          color: #e2e8f0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 1.2s ease;
          font-weight: 600;
        }
        
        .hero-phrase {
          font-size: clamp(1.2rem, 4vw, 1.6rem);
          margin-bottom: 1.5rem;
          color: #cbd5e1;
          animation: subtlePulse 4s infinite;
          min-height: 2.5rem;
        }
        
        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.3rem);
          margin-bottom: 2.5rem;
          color: #94a3b8;
          font-weight: 300;
        }
        
        .hero-buttons {
          display: flex;
          flex-direction: row;
          gap: 1.2rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .hero-button {
          display: inline-block;
          padding: 14px 28px;
          background: rgba(56, 189, 248, 0.9);
          color: #0f172a;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(56, 189, 248, 0.25);
          backdrop-filter: blur(4px);
        }
        
        .hero-button.book {
          background: rgba(139, 92, 246, 0.9);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.25);
        }
        
        .stats-container {
          position: absolute;
          bottom: 30px;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          padding: 18px;
          border-radius: 16px;
          margin: 0 20px;
          z-index: 3;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 1.5rem;
          font-weight: 600;
          color: #38bdf8;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: #cbd5e1;
        }
        
        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1rem;
        }
        
        .intro-section {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 3rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 0 auto 3rem;
        }
        
        .special-banner {
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.9), rgba(139, 92, 246, 0.9));
          color: #0f172a;
          padding: 12px 24px;
          border-radius: 30px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 1.8rem;
          animation: shimmer 3s infinite;
          background-size: 200px 100%;
          box-shadow: 0 4px 15px rgba(56, 189, 248, 0.25);
          backdrop-filter: blur(4px);
        }
        
        .intro-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #e2e8f0;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .featured-dishes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        
        .dish-card {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .dish-card.active {
          animation: gentleFloat 8s ease-in-out infinite;
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        }
        
        .dish-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .dish-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .new-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          animation: subtlePulse 3s infinite;
          backdrop-filter: blur(4px);
        }
        
        .dish-content {
          padding: 1.8rem;
        }
        
        .dish-title {
          font-size: 1.4rem;
          margin-bottom: 0.8rem;
          color: #e2e8f0;
          font-weight: 600;
        }
        
        .dish-desc {
          color: #cbd5e1;
          line-height: 1.6;
          font-size: 1rem;
        }
        
        .reviews-section {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 3rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 0 auto 3rem;
        }
        
        .reviews-title {
          font-size: 2.2rem;
          margin-bottom: 2rem;
          color: #e2e8f0;
          font-weight: 600;
        }
        
        .review-rotator {
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .review-text {
          font-size: 1.2rem;
          font-style: italic;
          color: #e2e8f0;
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto;
          animation: fadeInUp 1.2s ease;
        }
        
        .facebook-section {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .facebook-title {
          font-size: 2.2rem;
          margin-bottom: 2rem;
          color: #e2e8f0;
          font-weight: 600;
        }
        
        .facebook-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          width: 100%;
        }
        
        .facebook-embed {
          width: 380px;
        }
        
        .quick-access {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          padding: 12px;
          display: flex;
          gap: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
          z-index: 100;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform: translateY(100px);
          opacity: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .quick-access.visible {
          transform: translateY(0);
          opacity: 1;
        }
        
        .quick-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: #38bdf8;
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.2s ease;
        }
        
        .footer-text {
          text-align: center;
          margin-top: 3rem;
          color: #64748b;
          font-size: 0.9rem;
          padding: 0 1rem;
        }
        
        .install-toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(30, 41, 59, 0.85);
          color: #f1f5f9;
          padding: 14px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          font-size: 14px;
          z-index: 10000;
          max-width: 90%;
          text-align: center;
          animation: fadeInOut 7s ease-in-out;
          line-height: 1.5;
          cursor: pointer;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .new-content-banner {
          position: fixed;
          top: 80px;
          right: 20px;
          background: linear-gradient(90deg, rgba(239, 68, 68, 0.9), rgba(245, 158, 11, 0.9));
          color: white;
          padding: 10px 18px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
          z-index: 100;
          animation: subtlePulse 3s infinite;
          transform: translateX(200px);
          transition: transform 0.5s ease;
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .new-content-banner.visible {
          transform: translateX(0);
        }
        
        .close-button {
          background: none;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          margin-left: 10px;
          line-height: 1;
        }
        
        /* Mobile-first responsive styles */
        @media (max-width: 768px) {
          .hero-section {
            height: 75vh;
            min-height: 450px;
          }
          
          .hero-content {
            padding: 1.5rem;
            margin: 0 1rem;
          }
          
          .hero-title {
            font-size: 2.2rem;
          }
          
          .hero-phrase {
            font-size: 1.1rem;
          }
          
          .hero-subtitle {
            font-size: 0.95rem;
            margin-bottom: 1.5rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            gap: 0.8rem;
          }
          
          .hero-button {
            width: 100%;
          }
          
          .stats-container {
            flex-direction: column;
            gap: 10px;
            padding: 12px;
            margin: 0 1rem;
          }
          
          .section-container {
            padding: 2rem 1rem;
          }
          
          .featured-dishes {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .dish-image-container {
            height: 180px;
          }
          
          .quick-access {
            bottom: 15px;
            right: 15px;
            padding: 8px;
            gap: 8px;
          }
          
          .quick-link {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-section {
            height: 70vh;
            min-height: 400px;
          }
          
          .hero-content {
            padding: 1.2rem;
            margin: 0 0.8rem;
            width: calc(100% - 1.6rem);
          }
          
          .hero-title {
            font-size: 1.8rem;
            margin-bottom: 0.8rem;
          }
          
          .hero-phrase {
            font-size: 1rem;
            margin-bottom: 1rem;
            min-height: 2rem;
          }
          
          .hero-subtitle {
            font-size: 0.85rem;
            margin-bottom: 1.2rem;
          }
          
          .hero-buttons {
            gap: 0.6rem;
          }
          
          .hero-button {
            padding: 10px 16px;
            font-size: 0.9rem;
          }
          
          .stats-container {
            gap: 8px;
            padding: 10px;
            margin: 0 0.8rem;
            bottom: 15px;
          }
          
          .stat-number {
            font-size: 1.1rem;
          }
          
          .stat-label {
            font-size: 0.75rem;
          }
          
          .section-container {
            padding: 1.5rem 0.8rem;
          }
          
          .intro-section {
            padding: 1.2rem;
            margin-bottom: 1.5rem;
          }
          
          .special-banner {
            padding: 8px 16px;
            font-size: 0.85rem;
            margin-bottom: 1.2rem;
          }
          
          .intro-text {
            font-size: 0.95rem;
            line-height: 1.5;
          }
          
          .featured-dishes {
            gap: 1.2rem;
          }
          
          .dish-image-container {
            height: 150px;
          }
          
          .dish-content {
            padding: 1rem;
          }
          
          .dish-title {
            font-size: 1.1rem;
            margin-bottom: 0.6rem;
          }
          
          .dish-desc {
            font-size: 0.85rem;
          }
          
          .reviews-section {
            padding: 1.2rem;
            margin-bottom: 1.5rem;
          }
          
          .reviews-title {
            font-size: 1.6rem;
            margin-bottom: 1.2rem;
          }
          
          .review-text {
            font-size: 0.95rem;
          }
          
          .facebook-title {
            font-size: 1.6rem;
            margin-bottom: 1.2rem;
          }
          
          .facebook-embed {
            width: 100%;
            max-width: 300px;
          }
          
          .quick-access {
            bottom: 10px;
            right: 10px;
            padding: 6px;
            gap: 6px;
          }
          
          .quick-link {
            width: 32px;
            height: 32px;
            font-size: 0.9rem;
          }
          
          .footer-text {
            font-size: 0.75rem;
            padding: 0 0.8rem;
            margin-top: 2rem;
          }
          
          .new-content-banner {
            top: 70px;
            right: 10px;
            padding: 8px 14px;
            font-size: 0.8rem;
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
  
  return (
    <div className="home-container">
      <Navbar />
      {showInstallToast && (
        <div className="install-toast" onClick={handleInstallClick}>
          💡 Tip: Tap here to <strong>install Settlers Inn</strong> as an app!
        </div>
      )}
      
      {newContentCount > 0 && (
        <div className={`new-content-banner ${newContentCount > 0 ? 'visible' : ''}`}>
          <span>🆕 {newContentCount} new updates!</span>
          <button 
            className="close-button"
            onClick={() => setNewContentCount(0)}
          >
            ×
          </button>
        </div>
      )}
      
      <section className="hero-section">
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="none"
        >
          <source src="/assets/settlers.mp4" type="video/mp4" />
        </video>
        
        <div className="hero-content">
          <h2 className="hero-title">Settlers Inn</h2>
          <p className="hero-phrase">{welcomingPhrases[phraseIndex]}</p>
          <p className="hero-subtitle">Established 2021 | Kericho Highlands</p>
          
          <div className="hero-buttons">
            <a href="/menu" className="hero-button">🍽️ Our Menu</a>
            <a href="/accommodation" className="hero-button book">🛏️ Book a Room</a>
          </div>
        </div>
        
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">{visitorCount}+</div>
            <div className="stat-label">Guests Since 2021</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{currentTime}</div>
            <div className="stat-label">Local Time</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{isOnline ? 'Open' : 'Busy'}</div>
            <div className="stat-label">Status</div>
          </div>
        </div>
      </section>
      
      <section className="intro-section section-container">
        <div className="special-banner">
          🌟 {dailySpecial} 🌟
        </div>
        <p className="intro-text">
          Nestled in the heart of Kenya's highlands, Settlers Inn offers a perfect blend of comfort, 
          cuisine, and hospitality. Since our opening in 2021, we've been dedicated to providing 
          authentic experiences and memorable meals for our guests.
        </p>
      </section>
      
      <section className="featured-dishes section-container">
        {featuredDishes.map((dish, i) => (
          <div 
            key={i} 
            className={`dish-card ${activeDish === i ? 'active' : ''}`}
            onMouseEnter={() => setActiveDish(i)}
          >
            <div className="dish-image-container">
              <img 
                src={`/assets/${dish.img}`} 
                alt={dish.title} 
                className="dish-image"
                loading="lazy"
              />
              {i === 0 && <div className="new-badge">NEW</div>}
            </div>
            <div className="dish-content">
              <h3 className="dish-title">{dish.emoji} {dish.title}</h3>
              <p className="dish-desc">{dish.desc}</p>
            </div>
          </div>
        ))}
      </section>
      
      <section className="reviews-section section-container">
        <h2 className="reviews-title">💬 Guest Experiences</h2>
        <div className="review-rotator">
          <p className="review-text">{reviews[reviewIndex]}</p>
        </div>
      </section>
      
      <section className="facebook-section section-container">
        <h2 className="facebook-title">💬 Facebook Reviews</h2>
        <div className="facebook-container">
          <div 
            className="fb-xfbml-parse-ignore facebook-embed"
            data-href="https://www.facebook.com/settlersinn1/"
            data-tabs="timeline"
            data-width="380"
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
      
      <div className={`quick-access ${isScrolled ? 'visible' : ''}`}>
        <a href="tel:0748778388" className="quick-link">📞</a>
        <a href="https://maps.app.goo.gl/hvW5TubkM8WGcfAs5" target="_blank" rel="noreferrer" className="quick-link">🧭</a>
        <a href="/accommodation" className="quick-link">🛏️</a>
        <a href="/gallery" className="quick-link">📷</a>
        <a href="/menu" className="quick-link">🥘</a>
        <a href="https://wa.me/254748778388" target="_blank" rel="noreferrer" className="quick-link">💬</a>
      </div>
      
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Settlers Inn — Established 2021 | Built by EchoCode
      </p>
    </div>
  );
}

export default Home;
