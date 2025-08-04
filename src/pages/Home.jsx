import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css'; // Move styles to external CSS file

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
  const [videoLoaded, setVideoLoaded] = useState(false);
  
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
    
    // Combine intervals to reduce timers
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % welcomingPhrases.length);
      setReviewIndex(prev => (prev + 1) % reviews.length);
      setActiveDish(prev => (prev + 1) % featuredDishes.length);
    }, 7000);
    
    // Simulate new content being added
    const contentInterval = setInterval(() => {
      setNewContentCount(prev => prev + 1);
    }, 45000);
    
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
    
    // Facebook SDK - load only when section is visible
    const loadFacebookSDK = () => {
      if (typeof window !== 'undefined' && !window.FB) {
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };
    
    // Use IntersectionObserver to load Facebook SDK when needed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadFacebookSDK();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    const facebookSection = document.querySelector('.facebook-section');
    if (facebookSection) observer.observe(facebookSection);
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
      clearInterval(contentInterval);
      clearInterval(onlineInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      if (facebookSection) observer.unobserve(facebookSection);
    };
  }, []);
  
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
      setShowInstallToast(false);
    }
  };
  
  const handleVideoLoad = () => {
    setVideoLoaded(true);
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
        {/* Background image as fallback */}
        <div className="hero-background"></div>
        
        {/* Video overlay */}
        <div className="hero-overlay"></div>
        
        {/* Video element - optimized loading */}
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="none" // Changed from metadata to none
          poster="/assets/hero-fallback.jpg"
          onLoadedData={handleVideoLoad}
        >
          <source src="/assets/settlers.mp4" type="video/mp4" />
          <source src="/assets/settlers.webm" type="video/webm" />
          Your browser does not support the video tag.
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
                width="280"
                height="220"
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
