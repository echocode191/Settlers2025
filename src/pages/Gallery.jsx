import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  const images = [
    { src: '/assets/tea.jpg', alt: 'Tea' },
    { src: '/assets/chapatis.jpg', alt: 'Chapatis' },
    { src: '/assets/ugali-fish.jpg', alt: 'Ugali & Fish' },
    { src: '/assets/food1.jpg', alt: 'Meal 1' },
    { src: '/assets/food3.jpg', alt: 'Meal 2' },
    { src: '/assets/meat+chips.jpg', alt: 'Meat & Chips' },
    { src: '/assets/coffee.jpg', alt: 'Coffee' },
    { src: '/assets/room.jpg', alt: 'Room' },
    { src: '/assets/indoor.jpg', alt: 'Indoor Space' },
    { src: '/assets/outdoor.jpg', alt: 'Outdoor Area 1' },
    { src: '/assets/outdoor2.jpg', alt: 'Outdoor Area 2' },
    { src: '/assets/img1.jpg', alt: 'Gallery Shot 1' },
    { src: '/assets/img2.jpg', alt: 'Gallery Shot 2' },
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
    h2: {
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1rem',
    },
    img: (index) => ({
      width: '100%',
      borderRadius: '10px',
      border: '1px solid #30363d',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      opacity: 0,
      animation: `fadeInUp 0.7s ease forwards`,
      animationDelay: `${index * 0.1}s`,
    }),
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <section style={styles.section}>
        <h2 style={styles.h2}>📸 Settlers Inn Gallery</h2>
        <p style={styles.intro}>From the food to the views — here’s what makes Settlers special.</p>

        <div style={styles.grid}>
          {images.map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} style={styles.img(i)} />
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
