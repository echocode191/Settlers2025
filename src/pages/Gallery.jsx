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
    }, 30000); // Every 30 seconds
    
    // Add CSS animations to document head
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
    
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
  
  const styles = {
    page: {
      fontFamily: "'Fira Code', monospace",
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      minHeight: '100vh',
      paddingBottom: '2rem',
    },
    section: {
      maxWidth: '1100px',
      margin: 'auto',
      padding: '2rem 1rem',
    },
    title: {
      textAlign: 'center',
      color: '#9fef00',
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    intro: {
      textAlign: 'center',
      color: '#8b949e',
      marginBottom: '2rem',
      fontSize: '1rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '1rem',
    },
    item: {
      width: '100%',
      height: 'auto',
      maxHeight: '160px',
      objectFit: 'cover',
      borderRadius: '10px',
      border: '1px solid #30363d',
      boxShadow: '0 4px 14px rgba(0, 255, 120, 0.08)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    popupMedia: {
      maxWidth: '90vw',
      maxHeight: '90vh',
      borderRadius: '12px',
      border: '2px solid #9fef00',
      boxShadow: '0 0 30px rgba(159, 239, 0, 0.3)',
    },
    newBadge: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      background: '#ff3e3e',
      color: 'white',
      fontSize: '0.7rem',
      padding: '2px 6px',
      borderRadius: '10px',
      zIndex: 2,
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      fontSize: '1.2rem',
      color: '#9fef00',
    },
    newContentBanner: {
      background: 'linear-gradient(90deg, #9fef00, #58a6ff)',
      color: '#0d1117',
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '0 auto 1.5rem',
      maxWidth: '300px',
      animation: 'pulse 2s infinite',
    },
    mediaContainer: {
      position: 'relative',
    },
    closePopup: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      fontSize: '20px',
      cursor: 'pointer',
      zIndex: 1001,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
        <h2 style={styles.title}>📸 Settlers Inn Gallery</h2>
        <p style={styles.intro}>From sizzling plates to soft fields — moments that matter most.</p>
        
        {newMediaCount > 0 && (
          <div style={styles.newContentBanner}>
            🆕 {newMediaCount} new moments added!
          </div>
        )}
        
        <div style={styles.grid}>
          {media.map((item, index) => (
            <div key={index} style={styles.mediaContainer}>
              {item.isNew && <div style={styles.newBadge}>NEW</div>}
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={`Gallery ${index}`}
                  style={styles.item}
                  onClick={() => setPopupMedia(item)}
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.src}
                  style={styles.item}
                  onClick={() => setPopupMedia(item)}
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