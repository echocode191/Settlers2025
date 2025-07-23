import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  const [popupMedia, setPopupMedia] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setPopupMedia(null);
    window.addEventListener('keydown', handleEsc);
    setIsMobile(window.innerWidth < 768);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const media = [
    { src: '/assets/bar under construction.mp4', type: 'video' },
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
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <section style={styles.section}>
        <h2 style={styles.title}>📸 Settlers Inn Gallery</h2>
        <p style={styles.intro}>From sizzling plates to soft fields — moments that matter most.</p>

        <div style={styles.grid}>
          {media.map((item, index) =>
            item.type === 'image' ? (
              <img
                key={index}
                src={item.src}
                alt={`Gallery ${index}`}
                style={styles.item}
                onClick={() => setPopupMedia(item)}
                loading="lazy"
              />
            ) : (
              <video
                key={index}
                src={item.src}
                style={styles.item}
                onClick={() => setPopupMedia(item)}
                muted
                autoPlay={!isMobile && index === 0}
                loop
                preload="none"
              />
            )
          )}
        </div>
      </section>

      {popupMedia && (
        <div style={styles.overlay} onClick={() => setPopupMedia(null)}>
          {popupMedia.type === 'image' ? (
            <img src={popupMedia.src} alt="Popup" style={styles.popupMedia} />
          ) : (
            <video src={popupMedia.src} controls autoPlay style={styles.popupMedia} />
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Gallery;
