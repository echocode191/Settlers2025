import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Accommodation = () => {
  const styles = {
    page: {
      fontFamily: "'Fira Code', monospace",
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      minHeight: '100vh',
      paddingBottom: '2rem',
    },
    section: {
      maxWidth: '900px',
      margin: 'auto',
      padding: '2rem 1rem',
    },
    title: {
      textAlign: 'center',
      color: '#9fef00',
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    subtitle: {
      textAlign: 'center',
      color: '#8b949e',
      marginBottom: '2rem',
    },
    roomGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1.5rem',
    },
    roomCard: {
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      padding: '1rem',
      boxShadow: '0 0 10px rgba(88,166,255,0.1)',
      textAlign: 'center',
    },
    roomImage: {
      width: '100%',
      borderRadius: '8px',
      marginBottom: '0.8rem',
      border: '1px solid #30363d',
    },
    roomTitle: {
      color: '#58a6ff',
      marginBottom: '0.5rem',
      fontSize: '1.1rem',
    },
    roomDesc: {
      fontSize: '0.9rem',
      color: '#8b949e',
      marginBottom: '0.8rem',
    },
    roomPrice: {
      color: '#9fef00',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    bookBtn: {
      display: 'inline-block',
      background: '#25d366',
      color: '#fff',
      padding: '0.6rem 1.2rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  const rooms = [
    {
      title: 'Standard Room',
      img: '/assets/room.jpg',
      desc: 'A cozy space for solo travelers or couples. Clean and quiet.',
      price: 'KES 1,800 / night',
    },
    {
      title: 'Family Room',
      img: '/assets/indoor.jpg',
      desc: 'Spacious and comfy — great for families or groups.',
      price: 'KES 2,500 / night',
    },
    {
      title: 'Outdoor Cottage',
      img: '/assets/outdoor.jpg',
      desc: 'Private cottage with a garden view and peaceful vibes.',
      price: 'KES 3,200 / night',
    },
  ];

  return (
    <div style={styles.page}>
      <Navbar />

      <section style={styles.section}>
        <h2 style={styles.title}>🛏️ Accommodation</h2>
        <p style={styles.subtitle}>Stay the night. Wake up to clean air, birdsong, and warm chai.</p>

        <div style={styles.roomGrid}>
          {rooms.map((room, i) => (
            <div key={i} style={styles.roomCard}>
              <img src={room.img} alt={room.title} style={styles.roomImage} />
              <h3 style={styles.roomTitle}>{room.title}</h3>
              <p style={styles.roomDesc}>{room.desc}</p>
              <p style={styles.roomPrice}>{room.price}</p>
              <a
                href="https://wa.me/254748778388?text=Hi%20Settlers%20Inn%2C%20I'd%20love%20to%20book%20a%20room."
                target="_blank"
                rel="noopener noreferrer"
                style={styles.bookBtn}
              >
                📲 Book on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accommodation;
