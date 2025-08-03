import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  const [popupMedia, setPopupMedia] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [newMediaCount, setNewMediaCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setPopupMedia(null);
    window.addEventListener('keydown', handleEsc);
    setIsMobile(window.innerWidth < 768);
    
    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    
    // Simulate new content being added
    const interval = setInterval(() => {
      setNewMediaCount(prev => prev + 1);
    }, 45000); // Every 45 seconds
    
    // Add CSS animations to document head
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);
  
  const media = [
    { src: '/assets/bar under construction.mp4', type: 'video', isNew: true },
    { src: '/assets/boiled egg.jpg', type: 'image' },
    { src: '/assets/cake video.mp4', type: 'video' },
    { src: '/assets/cake video2.mp4', type: 'video' },
    { src: '/assets/cake1.jpg', type: 'image' },
    { src: '/assets/chapati 1.jpg', type: 'image' },
    { src: '/assets/chapo x egg pancakes.jpg', type: 'image' },
    { src: '/assets/chapo x ndazi x chips x sausage.jpg', type: 'image' },
    { src: '/assets/chillin field 2.jpg', type: 'image' },
    { src: '/assets/chillin field.jpg', type: 'image' },
    { src: '/assets/chips kuku 1.jpg', type: 'image' },
    { src: '/assets/chips kuku2.jpg', type: 'image' },
    { src: '/assets/chips kuku3.jpg', type: 'image' },
    { src: '/assets/chips sausage 1.jpg', type: 'image' },
    { src: '/assets/chips sausage 2.jpg', type: 'image' },
    { src: '/assets/chips.jpg', type: 'image' },
    { src: '/assets/cofee 1.jpg', type: 'image' },
    { src: '/assets/cofee.jpg', type: 'image' },
    { src: '/assets/cofee2.jpg', type: 'image' },
    { src: '/assets/Compound Overview1.jpg', type: 'image' },
    { src: '/assets/conference.jpg', type: 'image' },
    { src: '/assets/conference1.jpg', type: 'image' },
    { src: '/assets/dining1.jpg', type: 'image' },
    { src: '/assets/dining2.jpg', type: 'image' },
    { src: '/assets/dining3.jpg', type: 'image' },
    { src: '/assets/dining4.jpg', type: 'image' },
    { src: '/assets/dining5.jpg', type: 'image' },
    { src: '/assets/downstairs room.jpg', type: 'image' },
    { src: '/assets/drown taken overview.jpg', type: 'image' },
    { src: '/assets/egg pancake x chips.mp4', type: 'video' },
    { src: '/assets/fanta.jpg', type: 'image' },
    { src: '/assets/fish x chips.jpg', type: 'image' },
    { src: '/assets/fish.jpg', type: 'image' },
    { src: '/assets/greens vs fish.jpg', type: 'image' },
    { src: '/assets/Holiday vibes for children.jpg', type: 'image' },
    { src: '/assets/Kachumbari.jpg', type: 'image' },
    { src: '/assets/kitch.jpg', type: 'image' },
    { src: '/assets/kitch1.jpg', type: 'image' },
    { src: '/assets/kitch2.jpg', type: 'image' },
    { src: '/assets/kitch3.jpg', type: 'image' },
    { src: '/assets/Master meal.jpg', type: 'image' },
    { src: '/assets/master plates of chips kuku.jpg', type: 'image' },
    { src: '/assets/Meal 1.jpg', type: 'image' },
    { src: '/assets/meat x greens x ugali.mp4', type: 'video' },
    { src: '/assets/night View.jpg', type: 'image' },
    { src: '/assets/Onions.jpg', type: 'image' },
    { src: '/assets/outdoor1.jpg', type: 'image' },
    { src: '/assets/outdoor2.jpg', type: 'image' },
    { src: '/assets/outside1.jpg', type: 'image' },
    { src: '/assets/overview2.jpg', type: 'image' },
    { src: '/assets/overview3.jpg', type: 'image' },
    { src: '/assets/overview4.jpg', type: 'image' },
    { src: '/assets/pure egg pancake.jpg', type: 'image' },
    { src: '/assets/Room 40sec.mp4', type: 'video' },
    { src: '/assets/room1.jpg', type: 'image' },
    { src: '/assets/room2.jpg', type: 'image' },
    { src: '/assets/senate.mp4', type: 'video' },
    { src: '/assets/settlers bookshop.jpg', type: 'image' },
    { src: '/assets/settlers overview 2.jpg', type: 'image' },
    { src: '/assets/settlers view from highway.jpg', type: 'image' },
    { src: '/assets/settlers.mp4', type: 'video' },
    { src: '/assets/smokie x chips x chapo.jpg', type: 'image' },
    { src: '/assets/smokie1.jpg', type: 'image' },
    { src: '/assets/sofa 3 main dh.jpg', type: 'image' },
    { src: '/assets/soft chillin soccer.jpg', type: 'image' },
    { src: '/assets/Ugali Nyama stew.jpg', type: 'image' },
    { src: '/assets/ugali x greens x meat.jpg', type: 'image' },
    { src: '/assets/upstairs env view.jpg', type: 'image' },
    { src: '/assets/upstairs env view1.jpg', type: 'image' },
    { src: '/assets/upstairs outview2.jpg', type: 'image' }
  ];
  
  // Styles with modern glassy design
  const styles = {
    page: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#e2e8f0',
      minHeight: '100vh',
      paddingBottom: '2rem',
    },
    section: {
      maxWidth: '1200px',
      margin: 'auto',
      padding: '3rem 1.5rem',
      animation: 'fadeInUp 0.8s ease',
    },
    title: {
      textAlign: 'center',
      color: '#e2e8f0',
      fontSize: '2.2rem',
      marginBottom: '0.8rem',
      fontWeight: '600',
    },
    intro: {
      textAlign: 'center',
      color: '#94a3b8',
      marginBottom: '2.5rem',
      fontSize: '1.1rem',
      maxWidth: '600px',
      marginInline: 'auto',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '1.5rem',
    },
    item: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    popupMedia: {
      maxWidth: '90vw',
      maxHeight: '90vh',
      borderRadius: '20px',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    newBadge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(239, 68, 68, 0.9)',
      color: 'white',
      fontSize: '0.75rem',
      padding: '4px 10px',
      borderRadius: '12px',
      zIndex: 2,
      fontWeight: '600',
      backdropFilter: 'blur(4px)',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      fontSize: '1.2rem',
      color: '#38bdf8',
    },
    newContentBanner: {
      background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.9), rgba(139, 92, 246, 0.9))',
      color: '#0f172a',
      padding: '10px 18px',
      borderRadius: '20px',
      fontWeight: '600',
      textAlign: 'center',
      margin: '0 auto 2rem',
      maxWidth: '320px',
      animation: 'subtlePulse 3s infinite',
      backdropFilter: 'blur(4px)',
    },
    mediaContainer: {
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease',
    },
    closePopup: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(30, 41, 59, 0.8)',
      color: '#e2e8f0',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      width: '44px',
      height: '44px',
      fontSize: '20px',
      cursor: 'pointer',
      zIndex: 1001,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.2s ease',
    }
  };
  
  if (isLoading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.loading}>
          Loading gallery...
        </div>
        <Footer />
      </div>
    );
  }
  
  const handlePopupClick = (e) => {
    // Only close if clicking directly on the overlay, not on the media
    if (e.target === e.currentTarget) {
      setPopupMedia(null);
    }
  };
  
  return (
    <div style={styles.page}>
      <Navbar />
      <section style={styles.section}>
        <h2 style={styles.title}>Gallery</h2>
        <p style={styles.intro}>A visual journey through our spaces, dishes, and memorable moments at Settlers Inn.</p>
        
        {newMediaCount > 0 && (
          <div style={styles.newContentBanner}>
            🆕 {newMediaCount} new moments added!
          </div>
        )}
        
        <div style={styles.grid}>
          {media.map((item, index) => (
            <div 
              key={index} 
              style={styles.mediaContainer}
              onClick={() => setPopupMedia(item)}
            >
              {item.isNew && <div style={styles.newBadge}>NEW</div>}
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={`Gallery ${index}`}
                  style={styles.item}
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.src}
                  style={styles.item}
                  muted
                  autoPlay={!isMobile && index === 0}
                  loop
                  preload="metadata"
                  playsInline
                />
              )}
            </div>
          ))}
        </div>
      </section>
      
      {popupMedia && (
        <div style={styles.overlay} onClick={handlePopupClick}>
          <button 
            style={styles.closePopup}
            onClick={() => setPopupMedia(null)}
          >
            ×
          </button>
          {popupMedia.type === 'image' ? (
            <img 
              src={popupMedia.src} 
              alt="Popup" 
              style={styles.popupMedia} 
            />
          ) : (
            <video 
              src={popupMedia.src} 
              controls 
              autoPlay 
              style={styles.popupMedia}
              playsInline
            />
          )}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;