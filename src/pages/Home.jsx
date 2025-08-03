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
  
  // Inline styles with modern glassy design
  const toastStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(30, 41, 59, 0.85)',
    color: '#f1f5f9',
    padding: '14px 24px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    fontSize: '14px',
    zIndex: 10000,
    maxWidth: '90%',
    textAlign: 'center',
    animation: 'fadeInOut 7s ease-in-out',
    lineHeight: '1.5',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };
  
  const heroStyle = {
    position: 'relative',
    height: '90vh',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    color: '#fff',
    textAlign: 'center',
  };
  
  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: '-1',
  };
  
  const heroContentStyle = {
    position: 'relative',
    zIndex: '2',
    padding: '2rem',
    maxWidth: '800px',
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };
  
  const titleStyle = {
    fontSize: 'clamp(2.2rem, 8vw, 4rem)',
    marginBottom: '1.2rem',
    color: '#e2e8f0',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    animation: 'fadeInUp 1.2s ease',
    fontWeight: '600',
  };
  
  const phraseStyle = {
    fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
    marginBottom: '1.5rem',
    color: '#cbd5e1',
    animation: 'subtlePulse 4s infinite',
    minHeight: '2.5rem',
  };
  
  const subtitleStyle = {
    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
    marginBottom: '2.5rem',
    color: '#94a3b8',
    fontWeight: '300',
  };
  
  const buttonsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '1.2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };
  
  const buttonStyle = {
    display: 'inline-block',
    padding: '14px 28px',
    background: 'rgba(56, 189, 248, 0.9)',
    color: '#0f172a',
    borderRadius: '30px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.25)',
    backdropFilter: 'blur(4px)',
  };
  
  const bookButtonStyle = {
    ...buttonStyle,
    background: 'rgba(139, 92, 246, 0.9)',
    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
  };
  
  const statsContainerStyle = {
    position: 'absolute',
    bottom: '30px',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'space-around',
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(10px)',
    padding: '18px',
    borderRadius: '16px',
    margin: '0 20px',
    zIndex: '3',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };
  
  const statItemStyle = {
    textAlign: 'center',
  };
  
  const statNumberStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#38bdf8',
  };
  
  const statLabelStyle = {
    fontSize: '0.9rem',
    color: '#cbd5e1',
  };
  
  const sectionStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
  };
  
  const introStyle = {
    ...sectionStyle,
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2.5rem',
    marginBottom: '3rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };
  
  const specialBannerStyle = {
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
  };
  
  const introTextStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#e2e8f0',
    maxWidth: '800px',
    margin: '0 auto',
  };
  
  const featuredStyle = {
    ...sectionStyle,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
    marginBottom: '3rem',
  };
  
  const dishStyle = (index) => ({
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
  });
  
  const dishImageContainerStyle = {
    position: 'relative',
    height: '220px',
    overflow: 'hidden',
  };
  
  const dishImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  };
  
  const newBadgeStyle = {
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
  };
  
  const dishContentStyle = {
    padding: '1.8rem',
  };
  
  const dishTitleStyle = {
    fontSize: '1.4rem',
    marginBottom: '0.8rem',
    color: '#e2e8f0',
    fontWeight: '600',
  };
  
  const dishDescStyle = {
    color: '#cbd5e1',
    lineHeight: '1.6',
  };
  
  const reviewsStyle = {
    ...sectionStyle,
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2.5rem',
    marginBottom: '3rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };
  
  const reviewsTitleStyle = {
    fontSize: '2.2rem',
    marginBottom: '2rem',
    color: '#e2e8f0',
    fontWeight: '600',
  };
  
  const reviewRotatorStyle = {
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const reviewStyle = {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    color: '#e2e8f0',
    lineHeight: '1.7',
    maxWidth: '800px',
    margin: '0 auto',
    animation: 'fadeInUp 1.2s ease',
  };
  
  const facebookStyle = {
    ...sectionStyle,
    textAlign: 'center',
    marginBottom: '3rem',
  };
  
  const facebookTitleStyle = {
    fontSize: '2.2rem',
    marginBottom: '2rem',
    color: '#e2e8f0',
    fontWeight: '600',
  };
  
  const facebookContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  };
  
  const quickAccessStyle = {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    background: 'rgba(30, 41, 59, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50px',
    padding: '12px',
    display: 'flex',
    gap: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
    zIndex: '100',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    transform: isScrolled ? 'translateY(0)' : 'translateY(100px)',
    opacity: isScrolled ? '1' : '0',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };
  
  const quickLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#38bdf8',
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'all 0.2s ease',
  };
  
  const footerTextStyle = {
    textAlign: 'center',
    marginTop: '3rem',
    color: '#64748b',
    fontSize: '0.9rem',
    padding: '0 1rem',
  };
  
  const newContentBannerStyle = {
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
  };
  
  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.2rem',
    cursor: 'pointer',
    marginLeft: '10px',
    lineHeight: 1,
  };
  
  return (
    <>
      <Navbar />
      {showInstallToast && (
        <div style={toastStyle} onClick={handleInstallClick}>
          💡 Tip: Tap here to <strong>install Settlers Inn</strong> as an app!
        </div>
      )}
      
      {newContentCount > 0 && (
        <div style={newContentBannerStyle}>
          <span>🆕 {newContentCount} new updates!</span>
          <button 
            style={closeButtonStyle}
            onClick={() => setNewContentCount(0)}
          >
            ×
          </button>
        </div>
      )}
      
      <section style={heroStyle}>
        <video 
          style={videoStyle} 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="none"
        >
          <source src="/assets/settlers.mp4" type="video/mp4" />
        </video>
        
        <div style={heroContentStyle}>
          <h2 style={titleStyle}>Settlers Inn</h2>
          <p style={phraseStyle}>{welcomingPhrases[phraseIndex]}</p>
          <p style={subtitleStyle}>Established 2021 | Kericho Highlands</p>
          
          <div style={buttonsContainerStyle}>
            <a href="/menu" style={buttonStyle}>🍽️ Our Menu</a>
            <a href="/accommodation" style={bookButtonStyle}>🛏️ Book a Room</a>
          </div>
        </div>
        
        <div style={statsContainerStyle}>
          <div style={statItemStyle}>
            <div style={statNumberStyle}>{visitorCount}+</div>
            <div style={statLabelStyle}>Guests Since 2021</div>
          </div>
          <div style={statItemStyle}>
            <div style={statNumberStyle}>{currentTime}</div>
            <div style={statLabelStyle}>Local Time</div>
          </div>
          <div style={statItemStyle}>
            <div style={statNumberStyle}>{isOnline ? 'Open' : 'Busy'}</div>
            <div style={statLabelStyle}>Status</div>
          </div>
        </div>
      </section>
      
      <section style={introStyle}>
        <div style={specialBannerStyle}>
          🌟 {dailySpecial} 🌟
        </div>
        <p style={introTextStyle}>
          Nestled in the heart of Kenya's highlands, Settlers Inn offers a perfect blend of comfort, 
          cuisine, and hospitality. Since our opening in 2021, we've been dedicated to providing 
          authentic experiences and memorable meals for our guests.
        </p>
      </section>
      
      <section style={featuredStyle}>
        {featuredDishes.map((dish, i) => (
          <div 
            key={i} 
            style={dishStyle(i)}
            onMouseEnter={() => setActiveDish(i)}
          >
            <div style={dishImageContainerStyle}>
              <img 
                src={`/assets/${dish.img}`} 
                alt={dish.title} 
                style={dishImageStyle}
                loading="lazy"
              />
              {i === 0 && <div style={newBadgeStyle}>NEW</div>}
            </div>
            <div style={dishContentStyle}>
              <h3 style={dishTitleStyle}>{dish.emoji} {dish.title}</h3>
              <p style={dishDescStyle}>{dish.desc}</p>
            </div>
          </div>
        ))}
      </section>
      
      <section style={reviewsStyle}>
        <h2 style={reviewsTitleStyle}>💬 Guest Experiences</h2>
        <div style={reviewRotatorStyle}>
          <p style={reviewStyle}>{reviews[reviewIndex]}</p>
        </div>
      </section>
      
      <section style={facebookStyle}>
        <h2 style={facebookTitleStyle}>💬 Facebook Reviews</h2>
        <div style={facebookContainerStyle}>
          <div 
            className="fb-page"
            data-href="https://www.facebook.com/settlersinn1/"
            data-tabs="timeline"
            data-width="380"
            data-height="400"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote cite="https://www.facebook.com/settlersinn1/" className="fb-xfbml-parse-ignore">
              <a href="https://www.facebook.com/settlersinn1/">Settlers Inn</a>
            </blockquote>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <div style={quickAccessStyle}>
        <a href="tel:0748778388" style={quickLinkStyle}>📞</a>
        <a href="https://maps.app.goo.gl/hvW5TubkM8WGcfAs5" target="_blank" rel="noreferrer" style={quickLinkStyle}>🧭</a>
        <a href="/accommodation" style={quickLinkStyle}>🛏️</a>
        <a href="/gallery" style={quickLinkStyle}>📷</a>
        <a href="/menu" style={quickLinkStyle}>🥘</a>
        <a href="https://wa.me/254748778388" target="_blank" rel="noreferrer" style={quickLinkStyle}>💬</a>
      </div>
      
      <p style={footerTextStyle}>
        &copy; {new Date().getFullYear()} Settlers Inn — Established 2021 | Built by EchoCode
      </p>
    </>
  );
};

export default Home;