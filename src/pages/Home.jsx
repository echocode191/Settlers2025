import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  // Original state declarations
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
  
  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isVerySmallMobile, setIsVerySmallMobile] = useState(false);
  
  // Seasonal theme state
  const [seasonalTheme, setSeasonalTheme] = useState({
    month: 'september',
    colors: {
      primary: '#d2691e',      // Chocolate
      secondary: '#ff8c00',    // Dark orange
      accent: '#8B4513',       // Saddle brown
      background: '#fff8dc',   // Cornsilk
      text: '#5d4037',         // Dark brown
      highlight: '#ffd700',     // Gold
    },
    emojis: {
      welcome: '🍂',
      special: '🍁',
      review: '🍂',
      facebook: '🍂',
      footer: '🍂',
    },
    phrases: [
      "🍂 Autumn flavors, memorable experiences",
      "🍁 Where local cuisine meets warm hospitality",
      "🛏️ Your comfortable retreat in the highlands",
      "☕ Savor moments that matter",
      "🚀 Settlers Inn — your home away from home"
    ]
  });
  
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
  
  // Update theme based on current month
  useEffect(() => {
    const updateSeasonalTheme = () => {
      const currentMonth = new Date().getMonth(); // 0-11 (8=Sep, 9=Oct)
      
      if (currentMonth === 8) { // September
        setSeasonalTheme({
          month: 'september',
          colors: {
            primary: '#d2691e',      // Chocolate
            secondary: '#ff8c00',    // Dark orange
            accent: '#8B4513',       // Saddle brown
            background: '#fff8dc',   // Cornsilk
            text: '#5d4037',         // Dark brown
            highlight: '#ffd700',     // Gold
          },
          emojis: {
            welcome: '🍂',
            special: '🍁',
            review: '🍂',
            facebook: '🍂',
            footer: '🍂',
          },
          phrases: [
            "🍂 Autumn flavors, memorable experiences",
            "🍁 Where local cuisine meets warm hospitality",
            "🛏️ Your comfortable retreat in the highlands",
            "☕ Savor moments that matter",
            "🚀 Settlers Inn — your home away from home"
          ]
        });
      } else if (currentMonth === 9) { // October
        setSeasonalTheme({
          month: 'october',
          colors: {
            primary: '#4b0082',      // Indigo
            secondary: '#8b008b',    // Dark magenta
            accent: '#ff4500',       // Orange red
            background: '#2c2c2c',   // Dark gray
            text: '#f5f5f5',         // Light gray
            highlight: '#ff8c00',    // Dark orange
          },
          emojis: {
            welcome: '🎃',
            special: '👻',
            review: '🎃',
            facebook: '🎃',
            footer: '🎃',
          },
          phrases: [
            "🎃 Spooky flavors, memorable experiences",
            "👻 Where local cuisine meets haunted hospitality",
            "🛏️ Your cozy retreat in the highlands",
            "☕ Savor chilling moments that matter",
            "🚀 Settlers Inn — your haunted home away from home"
          ]
        });
      }
    };

    // Initial theme setup
    updateSeasonalTheme();
    
    // Set up timer to check for month change (check once per day)
    const themeTimer = setInterval(updateSeasonalTheme, 86400000); // 24 hours
    
    return () => clearInterval(themeTimer);
  }, []);
  
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
  
  // Responsive style detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
      setIsVerySmallMobile(window.innerWidth <= 333);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="home-container">
      <style>
        {`
          /* Base styles with seasonal theme variables */
          :root {
            --primary: ${seasonalTheme.colors.primary};
            --secondary: ${seasonalTheme.colors.secondary};
            --accent: ${seasonalTheme.colors.accent};
            --background: ${seasonalTheme.colors.background};
            --text: ${seasonalTheme.colors.text};
            --highlight: ${seasonalTheme.colors.highlight};
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--background);
            color: var(--text);
            line-height: 1.6;
            transition: background-color 0.5s ease, color 0.5s ease;
          }
          
          .home-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          /* Hero Section with seasonal theme */
          .hero-section {
            position: relative;
            height: 100vh;
            min-height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            color: #fff;
            text-align: center;
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), 
                        url('/assets/hero-fallback.jpg') center/cover no-repeat;
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
            width: 90%;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: fadeIn 1.5s ease-in-out;
          }
          
          .hero-title {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            letter-spacing: -1px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          
          .hero-phrase {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            font-weight: 300;
            opacity: 0.9;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            opacity: 0.8;
          }
          
          .hero-buttons {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
          }
          
          .hero-button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #fff;
            color: var(--text);
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          
          .hero-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          }
          
          .hero-button.primary {
            background-color: var(--primary);
            color: white;
          }
          
          .stats-container {
            position: absolute;
            bottom: 30px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            gap: 3rem;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            margin: 0 20px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .stat-item {
            text-align: center;
          }
          
          .stat-number {
            font-size: 1.8rem;
            font-weight: 700;
            color: #fff;
          }
          
          .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
          }
          
          /* Section Styles with seasonal theme */
          .section {
            padding: 5rem 1rem;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
          }
          
          .intro-section {
            background-color: #fff;
            border-radius: 16px;
            padding: 3rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            text-align: center;
            margin-bottom: 3rem;
            transition: background-color 0.5s ease;
          }
          
          .special-banner {
            display: inline-block;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: 600;
            margin-bottom: 1.5rem;
            box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
          }
          
          .intro-text {
            font-size: 1.1rem;
            color: var(--text);
            max-width: 800px;
            margin: 0 auto;
          }
          
          /* Featured Dishes */
          .featured-dishes {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }
          
          .dish-card {
            background-color: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .dish-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          }
          
          .dish-card.active {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            border: 2px solid var(--primary);
          }
          
          .dish-image-container {
            position: relative;
            height: 200px;
            overflow: hidden;
          }
          
          .dish-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .dish-card:hover .dish-image {
            transform: scale(1.05);
          }
          
          .new-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background-color: var(--accent);
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
          }
          
          .dish-content {
            padding: 1.5rem;
          }
          
          .dish-title {
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
            color: var(--text);
            font-weight: 600;
          }
          
          .dish-desc {
            color: var(--text);
            opacity: 0.8;
            font-size: 1rem;
          }
          
          /* Reviews Section */
          .reviews-section {
            background-color: #fff;
            border-radius: 16px;
            padding: 3rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            text-align: center;
            margin-bottom: 3rem;
            transition: background-color 0.5s ease;
          }
          
          .reviews-title {
            font-size: 2.2rem;
            margin-bottom: 2rem;
            color: var(--text);
            font-weight: 700;
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
            color: var(--text);
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.8;
          }
          
          /* Facebook Section */
          .facebook-section {
            text-align: center;
            margin-bottom: 3rem;
          }
          
          .facebook-title {
            font-size: 2.2rem;
            margin-bottom: 2rem;
            color: var(--text);
            font-weight: 700;
          }
          
          .facebook-container {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
          }
          
          .facebook-embed {
            width: 380px;
            height: 400px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          }
          
          /* Quick Access */
          .quick-access {
            position: fixed;
            bottom: 25px;
            right: 25px;
            background-color: #fff;
            border-radius: 50px;
            padding: 12px;
            display: flex;
            gap: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            z-index: 100;
            transition: transform 0.3s ease, opacity 0.3s ease;
            transform: translateY(100px);
            opacity: 0;
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
            background-color: var(--background);
            color: var(--primary);
            text-decoration: none;
            font-size: 1.2rem;
            transition: all 0.2s ease;
          }
          
          .quick-link:hover {
            background-color: var(--primary);
            color: white;
          }
          
          /* Install Toast */
          .install-toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--text);
            color: var(--background);
            padding: 14px 24px;
            border-radius: 50px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            font-size: 14px;
            z-index: 10000;
            max-width: 90%;
            text-align: center;
            cursor: pointer;
            animation: fadeInOut 7s ease-in-out;
          }
          
          /* New Content Banner */
          .new-content-banner {
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(90deg, var(--accent), var(--highlight));
            color: white;
            padding: 10px 18px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transform: translateX(200px);
            transition: transform 0.5s ease;
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
          
          /* Footer */
          .footer-text {
            text-align: center;
            margin-top: 3rem;
            color: var(--text);
            font-size: 0.9rem;
            padding: 0 1rem;
          }
          
          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 10px); }
            15% { opacity: 1; transform: translate(-50%, 0); }
            85% { opacity: 1; }
            100% { opacity: 0; transform: translate(-50%, 10px); }
          }
          
          /* Seasonal decorative elements */
          .seasonal-decoration {
            position: absolute;
            font-size: 2rem;
            opacity: 0.7;
            animation: float 6s ease-in-out infinite;
            z-index: 1;
          }
          
          .decoration-1 {
            top: 10%;
            left: 5%;
            animation-delay: 0s;
          }
          
          .decoration-2 {
            top: 20%;
            right: 8%;
            animation-delay: 1s;
          }
          
          .decoration-3 {
            bottom: 15%;
            left: 10%;
            animation-delay: 2s;
          }
          
          .decoration-4 {
            bottom: 25%;
            right: 5%;
            animation-delay: 3s;
          }
          
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          
          /* Responsive Styles */
          @media (max-width: 768px) {
            .hero-section {
              height: 80vh;
              min-height: 500px;
            }
            
            .hero-title {
              font-size: 2.5rem;
            }
            
            .hero-phrase {
              font-size: 1.2rem;
            }
            
            .hero-buttons {
              flex-direction: column;
              align-items: center;
            }
            
            .hero-button {
              width: 80%;
            }
            
            .stats-container {
              flex-direction: column;
              gap: 1rem;
              bottom: 20px;
            }
            
            .section {
              padding: 3rem 1rem;
            }
            
            .featured-dishes {
              grid-template-columns: 1fr;
            }
            
            .facebook-embed {
              width: 100%;
              max-width: 380px;
            }
            
            .seasonal-decoration {
              font-size: 1.5rem;
            }
          }
          
          @media (max-width: 480px) {
            .hero-section {
              height: 70vh;
              min-height: 450px;
            }
            
            .hero-title {
              font-size: 2rem;
            }
            
            .hero-phrase {
              font-size: 1rem;
            }
            
            .hero-content {
              padding: 1.5rem;
            }
            
            .intro-section, .reviews-section {
              padding: 2rem 1.5rem;
            }
            
            .reviews-title, .facebook-title {
              font-size: 1.8rem;
            }
            
            .review-text {
              font-size: 1rem;
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
            
            .seasonal-decoration {
              font-size: 1.2rem;
            }
          }
          
          @media (max-width: 333px) {
            .hero-title {
              font-size: 1.8rem;
            }
            
            .hero-phrase {
              font-size: 0.9rem;
            }
            
            .hero-subtitle {
              font-size: 0.9rem;
            }
            
            .hero-button {
              padding: 12px 20px;
              font-size: 0.9rem;
            }
            
            .section {
              padding: 2rem 0.8rem;
            }
            
            .intro-section, .reviews-section {
              padding: 1.5rem 1rem;
            }
            
            .dish-title {
              font-size: 1.2rem;
            }
            
            .dish-desc {
              font-size: 0.9rem;
            }
            
            .reviews-title, .facebook-title {
              font-size: 1.5rem;
            }
            
            .review-text {
              font-size: 0.9rem;
            }
            
            .quick-access {
              bottom: 10px;
              right: 10px;
            }
            
            .quick-link {
              width: 32px;
              height: 32px;
              font-size: 0.9rem;
            }
            
            .seasonal-decoration {
              font-size: 1rem;
            }
          }
        `}
      </style>
      
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
        {/* Seasonal decorative elements */}
        <div className="seasonal-decoration decoration-1">
          {seasonalTheme.month === 'september' ? '🍂' : '🎃'}
        </div>
        <div className="seasonal-decoration decoration-2">
          {seasonalTheme.month === 'september' ? '🍁' : '👻'}
        </div>
        <div className="seasonal-decoration decoration-3">
          {seasonalTheme.month === 'september' ? '🍄' : '🦇'}
        </div>
        <div className="seasonal-decoration decoration-4">
          {seasonalTheme.month === 'september' ? '🌰' : '🕷️'}
        </div>
        
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="none"
          poster="/assets/hero-fallback.jpg"
          onLoadedData={handleVideoLoad}
        >
          <source src="/assets/settlers.mp4" type="video/mp4" />
          <source src="/assets/settlers.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        <div className="hero-content">
          <h1 className="hero-title">Settlers Inn</h1>
          <p className="hero-phrase">{seasonalTheme.phrases[phraseIndex]}</p>
          <p className="hero-subtitle">Established 2021 | Kericho Highlands</p>
          
          <div className="hero-buttons">
            <a href="/menu" className="hero-button">🍽️ Our Menu</a>
            <a href="/accommodation" className="hero-button primary">🛏️ Book a Room</a>
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
      
      <section className="section">
        <div className="intro-section">
          <div className="special-banner">
            {seasonalTheme.emojis.special} {dailySpecial} {seasonalTheme.emojis.special}
          </div>
          <p className="intro-text">
            Nestled in the heart of Kenya's highlands, Settlers Inn offers a perfect blend of comfort, 
            cuisine, and hospitality. Since our opening in 2021, we've been dedicated to providing 
            authentic experiences and memorable meals for our guests.
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="featured-dishes">
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
                  height="200"
                />
                {i === 0 && <div className="new-badge">NEW</div>}
              </div>
              <div className="dish-content">
                <h3 className="dish-title">{dish.emoji} {dish.title}</h3>
                <p className="dish-desc">{dish.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section">
        <div className="reviews-section">
          <h2 className="reviews-title">{seasonalTheme.emojis.review} Guest Experiences</h2>
          <div className="review-rotator">
            <p className="review-text">{reviews[reviewIndex]}</p>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="facebook-section">
          <h2 className="facebook-title">{seasonalTheme.emojis.facebook} Facebook Reviews</h2>
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
        &copy; {new Date().getFullYear()} Settlers Inn — Established 2021 | Built by EchoCode {seasonalTheme.emojis.footer}
      </p>
    </div>
  );
}

export default Home;
