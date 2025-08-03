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
  
  const funnyPhrases = [
    "🍲 Come hungry. Leave like a king!",
    "😋 Our chapatis might flirt with your taste buds!",
    "🛏️ Rooms so cozy, you'll extend your stay accidentally.",
    "☕ Warning: Our tea may cause sudden smiles.",
    "🚀 Settlers — where your stomach settles happy!"
  ];
  
  const reviews = [
    "“The best hangout in Kericho hands down!” — Mercy K.",
    "“That coffee hit different... felt like Nairobi!” — Brian N.",
    "“Clean, affordable, and that fish was perfection.” — Jane M.",
    "“Chapo x sausage combo is undefeated.🔥” — Kiprotich L.",
    "“That conference hall is 🔥 and the food... top tier!” — Ivy W.",
    "“I'd come back just for the egg pancakes.🤤” — Moffat M.",
    "“Service with a smile every single time.” — Susan W.",
    "“I loved the quiet upstairs room with the morning view.” — Dennis K.",
    "“Settlers is the reason I stopped cooking at home 😂” — Terry N.",
    "“That nyama stew and ugali combo? Blessings!” — Juma B."
  ];
  
  const featuredDishes = [
    { img: "chapati 1.jpg", emoji: "🥙", title: "Golden Chapatis", desc: "Soft, flaky, and fresh from the pan." },
    { img: "fish x chips.jpg", emoji: "🐟", title: "Fish & Chips", desc: "Crispy fries with grilled tilapia." },
    { img: "cofee.jpg", emoji: "☕", title: "Bold Kenyan Coffee", desc: "Locally brewed, strong & smooth." },
    { img: "ugali x greens x meat.jpg", emoji: "🍛", title: "Ugali Feast", desc: "Greens, meat & ugali like mama made it." }
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
    setVisitorCount(Math.floor(Math.random() * 500) + 1200);
    
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    // Rotate content
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % funnyPhrases.length);
      setReviewIndex(prev => (prev + 1) % reviews.length);
    }, 5000);
    
    // Simulate new content being added
    const contentInterval = setInterval(() => {
      setNewContentCount(prev => prev + 1);
    }, 30000); // Every 30 seconds
    
    // Rotate featured dishes
    const dishInterval = setInterval(() => {
      setActiveDish(prev => (prev + 1) % featuredDishes.length);
    }, 8000);
    
    // Simulate online status
    const onlineInterval = setInterval(() => {
      setIsOnline(Math.random() > 0.2); // 80% chance of being online
    }, 30000);
    
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
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    
    // Add keyframe animations to document head
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; }
        100% { opacity: 0; transform: translateY(10px); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
    `;
    document.head.appendChild(style);
    
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
  
  // Inline styles
  const toastStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#111',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    fontSize: '14px',
    zIndex: 10000,
    maxWidth: '90%',
    textAlign: 'center',
    animation: 'fadeInOut 6s ease-in-out',
    lineHeight: '1.5',
    cursor: 'pointer',
  };
  
  const heroStyle = {
    position: 'relative',
    height: '100vh',
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
    padding: '0 20px',
    maxWidth: '800px',
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(5px)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  };
  
  const titleStyle = {
    fontSize: 'clamp(2rem, 8vw, 4rem)',
    marginBottom: '1rem',
    color: '#9fef00',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    animation: 'fadeInUp 1s ease',
  };
  
  const phraseStyle = {
    fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
    marginBottom: '1rem',
    color: '#fff',
    animation: 'pulse 3s infinite',
    minHeight: '2.5rem',
  };
  
  const subtitleStyle = {
    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
    marginBottom: '2rem',
    color: '#e1e8eb',
  };
  
  const buttonsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };
  
  const buttonStyle = {
    display: 'inline-block',
    padding: '12px 24px',
    background: '#9fef00',
    color: '#0d1117',
    borderRadius: '30px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(159, 239, 0, 0.3)',
  };
  
  const bookButtonStyle = {
    ...buttonStyle,
    background: '#58a6ff',
    boxShadow: '0 4px 15px rgba(88, 166, 255, 0.3)',
  };
  
  const statsContainerStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'space-around',
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    padding: '15px',
    borderRadius: '16px',
    margin: '0 20px',
    zIndex: '3',
  };
  
  const statItemStyle = {
    textAlign: 'center',
  };
  
  const statNumberStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#9fef00',
  };
  
  const statLabelStyle = {
    fontSize: '0.9rem',
    color: '#e1e8eb',
  };
  
  const sectionStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
  };
  
  const introStyle = {
    ...sectionStyle,
    background: 'rgba(22, 27, 34, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  };
  
  const specialBannerStyle = {
    background: 'linear-gradient(90deg, #9fef00, #58a6ff)',
    color: '#0d1117',
    padding: '10px 20px',
    borderRadius: '30px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginBottom: '1.5rem',
    animation: 'shimmer 2s infinite',
    backgroundSize: '200px 100%',
    boxShadow: '0 4px 15px rgba(159, 239, 0, 0.3)',
  };
  
  const introTextStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#e1e8eb',
    maxWidth: '800px',
    margin: '0 auto',
  };
  
  const featuredStyle = {
    ...sectionStyle,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  };
  
  const dishStyle = {
    background: 'rgba(22, 27, 34, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: activeDish === 0 ? 'float 6s ease-in-out infinite' : 'none',
  };
  
  const dishImageContainerStyle = {
    position: 'relative',
    height: '200px',
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
    top: '10px',
    right: '10px',
    background: '#ff3e3e',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(255, 62, 62, 0.4)',
    animation: 'pulse 2s infinite',
  };
  
  const dishContentStyle = {
    padding: '1.5rem',
  };
  
  const dishTitleStyle = {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    color: '#9fef00',
  };
  
  const dishDescStyle = {
    color: '#e1e8eb',
    lineHeight: '1.5',
  };
  
  const reviewsStyle = {
    ...sectionStyle,
    background: 'rgba(22, 27, 34, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  };
  
  const reviewsTitleStyle = {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#9fef00',
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
    color: '#e1e8eb',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto',
    animation: 'fadeInUp 1s ease',
  };
  
  const facebookStyle = {
    ...sectionStyle,
    textAlign: 'center',
    marginBottom: '2rem',
  };
  
  const facebookTitleStyle = {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#9fef00',
  };
  
  const facebookContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  };
  
  const quickAccessStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'rgba(22, 27, 34, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50px',
    padding: '10px',
    display: 'flex',
    gap: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    zIndex: '100',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    transform: isScrolled ? 'translateY(0)' : 'translateY(100px)',
    opacity: isScrolled ? '1' : '0',
  };
  
  const quickLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#9fef00',
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'all 0.2s ease',
  };
  
  const footerTextStyle = {
    textAlign: 'center',
    marginTop: '2rem',
    color: '#8b949e',
    fontSize: '0.9rem',
    padding: '0 1rem',
  };
  
  const newContentBannerStyle = {
    position: 'fixed',
    top: '80px',
    right: '20px',
    background: 'linear-gradient(90deg, #ff3e3e, #ff9e3e)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    boxShadow: '0 4px 15px rgba(255, 62, 62, 0.3)',
    zIndex: '100',
    animation: 'pulse 2s infinite',
    transform: newContentCount > 0 ? 'translateX(0)' : 'translateX(200px)',
    transition: 'transform 0.5s ease',
  };

  return (
    <>
      <Navbar />
      {showInstallToast && (
        <div style={toastStyle} onClick={handleInstallClick}>
          🧠 Tip: Tap here to <strong>install Settlers Inn</strong> as an app!
        </div>
      )}
      
      {newContentCount > 0 && (
        <div style={newContentBannerStyle}>
          🆕 {newContentCount} new updates!
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
          <h2 style={titleStyle}>Welcome to Settlers Inn</h2>
          <p style={phraseStyle}>{funnyPhrases[phraseIndex]}</p>
          <p style={subtitleStyle}>Where Settlers Still Eat Like Kings.</p>
          
          <div style={buttonsContainerStyle}>
            <a href="/menu" style={buttonStyle}>🍽️ View Our Menu</a>
            <a href="/accommodation" style={bookButtonStyle}>🛏️ Book a Room</a>
          </div>
        </div>
        
        <div style={statsContainerStyle}>
          <div style={statItemStyle}>
            <div style={statNumberStyle}>{visitorCount}+</div>
            <div style={statLabelStyle}>Happy Guests</div>
          </div>
          <div style={statItemStyle}>
            <div style={statNumberStyle}>{currentTime}</div>
            <div style={statLabelStyle}>Local Time</div>
          </div>
          <div style={statItemStyle}>
            <div style={statNumberStyle}>{isOnline ? 'Online' : 'Away'}</div>
            <div style={statLabelStyle}>Status</div>
          </div>
        </div>
      </section>
      
      <section style={introStyle}>
        <div style={specialBannerStyle}>
          🌟 {dailySpecial} 🌟
        </div>
        <p style={introTextStyle}>
          Located in the heart of the Kenya Highlands, Settlers Inn is a family-owned gem serving authentic dishes, hearty portions, and warm hospitality.
        </p>
      </section>
      
      <section style={featuredStyle}>
        {featuredDishes.map((dish, i) => (
          <div 
            key={i} 
            style={{
              ...dishStyle,
              transform: activeDish === i ? 'translateY(-5px)' : 'none',
              boxShadow: activeDish === i ? '0 12px 40px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
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
        <h2 style={reviewsTitleStyle}>💬 What People Are Saying</h2>
        <div style={reviewRotatorStyle}>
          <p style={reviewStyle}>{reviews[reviewIndex]}</p>
        </div>
      </section>
      
      <section style={facebookStyle}>
        <h2 style={facebookTitleStyle}>💬 Facebook Reviews (Live)</h2>
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
        &copy; {new Date().getFullYear()} Settlers Inn — Built by EchoCode
      </p>
    </>
  );
};

export default Home;