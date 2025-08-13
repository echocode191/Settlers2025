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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [fbLoaded, setFbLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isVerySmallMobile, setIsVerySmallMobile] = useState(false);
  
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
    // Check screen size for responsive design
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
      setIsVerySmallMobile(window.innerWidth <= 333);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
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
    
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      if (typeof window !== 'undefined' && !window.FB) {
        window.fbAsyncInit = function() {
          window.FB.init({
            appId: 'your-app-id', // Replace with your Facebook App ID
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v18.0'
          });
          setFbLoaded(true);
        };
        
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    };
    
    // Load Facebook SDK when component mounts
    loadFacebookSDK();
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
      clearInterval(contentInterval);
      clearInterval(onlineInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener('resize', checkScreenSize);
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
  
  // Glassy style object
  const glassyStyle = {
    container: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "#e2e8f0",
      minHeight: "100vh",
      overflowX: "hidden"
    },
    heroSection: {
      position: "relative",
      height: "90vh",
      minHeight: "600px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      color: "#fff",
      textAlign: "center",
      marginBottom: "80px"
    },
    heroBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -2,
      background: "url('/assets/hero-fallback.jpg') center/cover"
    },
    heroVideo: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -1
    },
    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.8))",
      zIndex: -1
    },
    heroContent: {
      position: "relative",
      zIndex: 2,
      padding: "2rem",
      maxWidth: "800px",
      width: "90%",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(16px)",
      borderRadius: "24px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      margin: "0 auto",
      WebkitBackdropFilter: "blur(16px)"
    },
    heroTitle: {
      fontSize: "clamp(2.2rem, 8vw, 4rem)",
      marginBottom: "1.2rem",
      color: "#e2e8f0",
      textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      animation: "fadeInUp 1.2s ease",
      fontWeight: 600
    },
    heroPhrase: {
      fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
      marginBottom: "1.5rem",
      color: "#cbd5e1",
      animation: "subtlePulse 4s infinite",
      minHeight: "2.5rem"
    },
    heroSubtitle: {
      fontSize: "clamp(1rem, 3vw, 1.3rem)",
      marginBottom: "2.5rem",
      color: "#94a3b8",
      fontWeight: 300
    },
    heroButtons: {
      display: "flex",
      flexDirection: "row",
      gap: "1.2rem",
      justifyContent: "center",
      flexWrap: "wrap"
    },
    heroButton: {
      display: "inline-block",
      padding: "14px 28px",
      background: "rgba(56, 189, 248, 0.8)",
      color: "#0f172a",
      borderRadius: "30px",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: "1rem",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(56, 189, 248, 0.3)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      WebkitBackdropFilter: "blur(8px)"
    },
    heroButtonBook: {
      background: "rgba(139, 92, 246, 0.8)",
      boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)"
    },
    statsContainer: {
      position: "absolute",
      bottom: "-40px",
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(12px)",
      padding: "18px",
      borderRadius: "20px",
      margin: "0 20px",
      zIndex: 3,
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
      WebkitBackdropFilter: "blur(12px)"
    },
    statItem: {
      textAlign: "center"
    },
    statNumber: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#38bdf8"
    },
    statLabel: {
      fontSize: "0.9rem",
      color: "#cbd5e1"
    },
    sectionContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "4rem 1rem"
    },
    introSection: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(12px)",
      borderRadius: "24px",
      padding: "2.5rem",
      marginBottom: "3rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      position: "relative",
      zIndex: 1,
      WebkitBackdropFilter: "blur(12px)"
    },
    specialBanner: {
      background: "linear-gradient(90deg, rgba(56, 189, 248, 0.8), rgba(139, 92, 246, 0.8))",
      color: "#0f172a",
      padding: "12px 24px",
      borderRadius: "30px",
      fontWeight: 600,
      display: "inline-block",
      marginBottom: "1.8rem",
      animation: "shimmer 3s infinite",
      backgroundSize: "200px 100%",
      boxShadow: "0 4px 15px rgba(56, 189, 248, 0.25)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      WebkitBackdropFilter: "blur(8px)"
    },
    introText: {
      fontSize: "1.1rem",
      lineHeight: "1.7",
      color: "#e2e8f0",
      maxWidth: "800px",
      margin: "0 auto"
    },
    featuredDishes: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2.5rem",
      marginBottom: "3rem",
      position: "relative",
      zIndex: 1
    },
    dishCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(12px)",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      WebkitBackdropFilter: "blur(12px)"
    },
    dishCardActive: {
      animation: "gentleFloat 8s ease-in-out infinite",
      transform: "translateY(-5px)",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)"
    },
    dishImageContainer: {
      position: "relative",
      aspectRatio: "4/3",
      overflow: "hidden"
    },
    dishImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease"
    },
    newBadge: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: "rgba(239, 68, 68, 0.9)",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: 600,
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
      animation: "subtlePulse 3s infinite",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)"
    },
    dishContent: {
      padding: "1.8rem"
    },
    dishTitle: {
      fontSize: "1.4rem",
      marginBottom: "0.8rem",
      color: "#e2e8f0",
      fontWeight: 600
    },
    dishDesc: {
      color: "#cbd5e1",
      lineHeight: "1.6",
      fontSize: "1rem"
    },
    reviewsSection: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(12px)",
      borderRadius: "24px",
      padding: "2.5rem",
      marginBottom: "3rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      position: "relative",
      zIndex: 1,
      WebkitBackdropFilter: "blur(12px)"
    },
    reviewsTitle: {
      fontSize: "2.2rem",
      marginBottom: "2rem",
      color: "#e2e8f0",
      fontWeight: 600
    },
    reviewRotator: {
      minHeight: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    reviewText: {
      fontSize: "1.2rem",
      fontStyle: "italic",
      color: "#e2e8f0",
      lineHeight: "1.7",
      maxWidth: "800px",
      margin: "0 auto",
      animation: "fadeInUp 1.2s ease"
    },
    facebookSection: {
      textAlign: "center",
      marginBottom: "3rem",
      position: "relative",
      zIndex: 1
    },
    facebookTitle: {
      fontSize: "2.2rem",
      marginBottom: "2rem",
      color: "#e2e8f0",
      fontWeight: 600
    },
    facebookContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "2rem",
      width: "100%"
    },
    facebookEmbed: {
      width: "380px",
      height: "500px",
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(12px)",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      WebkitBackdropFilter: "blur(12px)"
    },
    quickAccess: {
      position: "fixed",
      bottom: "25px",
      right: "25px",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(12px)",
      borderRadius: "50px",
      padding: "12px",
      display: "flex",
      gap: "12px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
      zIndex: 100,
      transition: "transform 0.3s ease, opacity 0.3s ease",
      transform: "translateY(100px)",
      opacity: 0,
      border: "1px solid rgba(255, 255, 255, 0.2)",
      WebkitBackdropFilter: "blur(12px)"
    },
    quickAccessVisible: {
      transform: "translateY(0)",
      opacity: 1
    },
    quickLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.15)",
      color: "#38bdf8",
      textDecoration: "none",
      fontSize: "1.2rem",
      transition: "all 0.2s ease",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    footerText: {
      textAlign: "center",
      marginTop: "3rem",
      color: "#64748b",
      fontSize: "0.9rem",
      padding: "0 1rem",
      position: "relative",
      zIndex: 1
    },
    installToast: {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(255, 255, 255, 0.15)",
      color: "#f1f5f9",
      padding: "14px 24px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      fontSize: "14px",
      zIndex: 10000,
      maxWidth: "90%",
      textAlign: "center",
      animation: "fadeInOut 7s ease-in-out",
      lineHeight: "1.5",
      cursor: "pointer",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      WebkitBackdropFilter: "blur(12px)"
    },
    newContentBanner: {
      position: "fixed",
      top: "100px",
      right: "20px",
      background: "linear-gradient(90deg, rgba(239, 68, 68, 0.8), rgba(245, 158, 11, 0.8))",
      color: "white",
      padding: "10px 18px",
      borderRadius: "20px",
      fontWeight: 600,
      fontSize: "0.9rem",
      boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
      zIndex: 100,
      animation: "subtlePulse 3s infinite",
      transform: "translateX(200px)",
      transition: "transform 0.5s ease",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      WebkitBackdropFilter: "blur(8px)"
    },
    newContentBannerVisible: {
      transform: "translateX(0)"
    },
    closeButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.2rem",
      cursor: "pointer",
      marginLeft: "10px",
      lineHeight: "1"
    },
    loadingSpinner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      color: "#38bdf8"
    },
    // Mobile styles
    mobileHeroSection: {
      height: "75vh",
      minHeight: "450px",
      marginBottom: "60px"
    },
    mobileHeroContent: {
      padding: "1.5rem",
      width: "95%"
    },
    mobileHeroTitle: {
      fontSize: "2.2rem"
    },
    mobileHeroPhrase: {
      fontSize: "1.1rem"
    },
    mobileHeroSubtitle: {
      fontSize: "0.95rem",
      marginBottom: "1.5rem"
    },
    mobileHeroButtons: {
      flexDirection: "column",
      gap: "0.8rem"
    },
    mobileHeroButton: {
      width: "100%"
    },
    mobileStatsContainer: {
      flexDirection: "column",
      gap: "10px",
      padding: "12px",
      margin: "0 1rem",
      bottom: "-30px"
    },
    mobileSectionContainer: {
      padding: "2rem 1rem"
    },
    mobileFeaturedDishes: {
      gridTemplateColumns: "1fr",
      gap: "1.5rem"
    },
    mobileQuickAccess: {
      bottom: "15px",
      right: "15px",
      padding: "8px",
      gap: "8px"
    },
    mobileQuickLink: {
      width: "36px",
      height: "36px",
      fontSize: "1rem"
    },
    mobileNewContentBanner: {
      top: "80px",
      right: "10px",
      padding: "8px 14px",
      fontSize: "0.8rem"
    },
    mobileFacebookEmbed: {
      width: "100%",
      maxWidth: "300px",
      height: "400px"
    },
    // Small mobile styles
    smallMobileHeroSection: {
      height: "70vh",
      minHeight: "400px",
      marginBottom: "50px"
    },
    smallMobileHeroContent: {
      padding: "1.2rem",
      width: "95%"
    },
    smallMobileHeroTitle: {
      fontSize: "1.8rem",
      marginBottom: "0.8rem"
    },
    smallMobileHeroPhrase: {
      fontSize: "1rem",
      marginBottom: "1rem",
      minHeight: "2rem"
    },
    smallMobileHeroSubtitle: {
      fontSize: "0.85rem",
      marginBottom: "1.2rem"
    },
    smallMobileHeroButtons: {
      gap: "0.6rem"
    },
    smallMobileHeroButton: {
      padding: "10px 16px",
      fontSize: "0.9rem"
    },
    smallMobileStatsContainer: {
      gap: "8px",
      padding: "10px",
      margin: "0 0.8rem",
      bottom: "-25px"
    },
    smallMobileSectionContainer: {
      padding: "1.5rem 0.8rem"
    },
    smallMobileIntroSection: {
      padding: "1.2rem",
      marginBottom: "1.5rem"
    },
    smallMobileSpecialBanner: {
      padding: "8px 16px",
      fontSize: "0.85rem",
      marginBottom: "1.2rem"
    },
    smallMobileIntroText: {
      fontSize: "0.95rem",
      lineHeight: "1.5"
    },
    smallMobileFeaturedDishes: {
      gap: "1.2rem"
    },
    smallMobileDishContent: {
      padding: "1rem"
    },
    smallMobileDishTitle: {
      fontSize: "1.1rem",
      marginBottom: "0.6rem"
    },
    smallMobileDishDesc: {
      fontSize: "0.85rem"
    },
    smallMobileReviewsSection: {
      padding: "1.2rem",
      marginBottom: "1.5rem"
    },
    smallMobileReviewsTitle: {
      fontSize: "1.6rem",
      marginBottom: "1.2rem"
    },
    smallMobileReviewText: {
      fontSize: "0.95rem"
    },
    smallMobileFacebookTitle: {
      fontSize: "1.6rem",
      marginBottom: "1.2rem"
    },
    smallMobileFacebookEmbed: {
      width: "100%",
      maxWidth: "280px",
      height: "350px"
    },
    smallMobileQuickAccess: {
      bottom: "10px",
      right: "10px",
      padding: "6px",
      gap: "6px"
    },
    smallMobileQuickLink: {
      width: "32px",
      height: "32px",
      fontSize: "1rem"
    },
    smallMobileFooterText: {
      fontSize: "0.75rem",
      padding: "0 0.8rem",
      marginTop: "2rem"
    },
    smallMobileNewContentBanner: {
      top: "70px",
      right: "10px",
      padding: "8px 14px",
      fontSize: "0.8rem"
    },
    // Very small mobile styles
    verySmallMobileHeroSection: {
      height: "65vh",
      minHeight: "350px"
    },
    verySmallMobileHeroContent: {
      padding: "1rem",
      width: "95%"
    },
    verySmallMobileHeroTitle: {
      fontSize: "1.6rem",
      marginBottom: "0.6rem"
    },
    verySmallMobileHeroPhrase: {
      fontSize: "0.9rem",
      marginBottom: "0.8rem",
      minHeight: "1.8rem"
    },
    verySmallMobileHeroSubtitle: {
      fontSize: "0.8rem",
      marginBottom: "1rem"
    },
    verySmallMobileHeroButtons: {
      gap: "0.5rem"
    },
    verySmallMobileHeroButton: {
      padding: "8px 12px",
      fontSize: "0.85rem"
    },
    verySmallMobileStatsContainer: {
      gap: "6px",
      padding: "8px",
      margin: "0 0.6rem",
      bottom: "-20px"
    },
    verySmallMobileSectionContainer: {
      padding: "1.2rem 0.6rem"
    },
    verySmallMobileIntroSection: {
      padding: "1rem",
      marginBottom: "1.2rem"
    },
    verySmallMobileSpecialBanner: {
      padding: "6px 12px",
      fontSize: "0.8rem",
      marginBottom: "1rem"
    },
    verySmallMobileIntroText: {
      fontSize: "0.9rem",
      lineHeight: "1.4"
    },
    verySmallMobileFeaturedDishes: {
      gap: "1rem"
    },
    verySmallMobileDishContent: {
      padding: "0.8rem"
    },
    verySmallMobileDishTitle: {
      fontSize: "1rem",
      marginBottom: "0.5rem"
    },
    verySmallMobileDishDesc: {
      fontSize: "0.8rem"
    },
    verySmallMobileReviewsSection: {
      padding: "1rem",
      marginBottom: "1.2rem"
    },
    verySmallMobileReviewsTitle: {
      fontSize: "1.4rem",
      marginBottom: "1rem"
    },
    verySmallMobileReviewText: {
      fontSize: "0.9rem"
    },
    verySmallMobileFacebookTitle: {
      fontSize: "1.4rem",
      marginBottom: "1rem"
    },
    verySmallMobileFacebookEmbed: {
      width: "100%",
      maxWidth: "260px",
      height: "300px"
    },
    verySmallMobileQuickAccess: {
      bottom: "8px",
      right: "8px",
      padding: "4px",
      gap: "4px"
    },
    verySmallMobileQuickLink: {
      width: "28px",
      height: "28px",
      fontSize: "0.8rem"
    },
    verySmallMobileFooterText: {
      fontSize: "0.7rem",
      padding: "0 0.6rem",
      marginTop: "1.5rem"
    },
    verySmallMobileNewContentBanner: {
      top: "60px",
      right: "8px",
      padding: "6px 12px",
      fontSize: "0.75rem"
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
    <div style={glassyStyle.container}>
      <style>
        {`
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
     
