import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Accommodation = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes popIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.6; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }, []);

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
      textAlign: 'center',
    },
    title: {
      color: '#9fef00',
      fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
      marginBottom: '0.5rem',
      animation: 'popIn 0.6s ease-in-out',
    },
    subtitle: {
      color: '#8b949e',
      fontSize: '1rem',
      marginBottom: '2rem',
      animation: 'fadeIn 2s ease-in-out',
    },
    thriller: {
      fontSize: '1.2rem',
      color: '#58a6ff',
      marginBottom: '2.5rem',
      fontStyle: 'italic',
      animation: 'pulse 3s ease-in-out infinite',
    },
    roomGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '2rem',
    },
    roomCard: {
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 0 15px rgba(88,166,255,0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    roomImage: {
      width: '100%',
      borderRadius: '10px',
      marginBottom: '0.8rem',
      border: '1px solid #30363d',
      transition: 'transform 0.3s ease-in-out',
    },
    roomTitle: {
      color: '#58a6ff',
      marginBottom: '0.4rem',
      fontSize: '1.2rem',
    },
    roomDesc: {
      fontSize: '0.9rem',
      color: '#8b949e',
      marginBottom: '0.8rem',
    },
    roomPrice: {
      color: '#9fef00',
      fontWeight: 'bold',
      marginBottom: '1.2rem',
    },
    bookBtn: {
      display: 'inline-block',
      background: '#25d366',
      color: '#fff',
      padding: '0.6rem 1.2rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'background 0.3s ease',
    },
  };

  const rooms = [
    {
      title: 'Standard Room',
      img: '/assets/room.jpg',
      desc: 'Simple. Clean. Safe. Like a Netflix opening scene before everything goes perfectly right.',
      price: 'KES 1,800 / night',
      msg: "Hi Settlers Inn! I'd love to book the Standard Room — solo traveler vibes 🧳🛏️",
    },
    {
      title: 'Family Room',
      img: '/assets/indoor.jpg',
      desc: 'Big enough for your squad. Cozy enough for family drama. The happy kind. Mostly.',
      price: 'KES 2,500 / night',
      msg: "Hi Settlers Inn! I'd love to book the Family Room — it's time to reunite the crew 👨‍👩‍👧‍👦✨",
    },
    {
      title: 'Conference Room',
      img: '/assets/conference.jpg',
      desc: 'Equipped for meetings, trainings & strategy sessions. Power up your plans with Wi-Fi, coffee, and space to think.',
      price: 'KES 3,500 / session',
      msg: "Hello Settlers Inn! I'd like to reserve the Conference Room for a team session 💼🖥️. Please share availability.",
    },
  ];

  return (
    <div style={styles.page}>
      <Navbar />

      <section style={styles.section}>
        <h2 style={styles.title}>🏨 Heaven Found: Settlers Stays</h2>
        <p style={styles.subtitle}>
          You don't just sleep here. You reset. You reconnect. You <i>recharge like royalty.</i>
        </p>
        <p style={styles.thriller}>
          🎬 "3 rooms. 1 legacy. Comfort is calling…" 📞
        </p>

        <div style={styles.roomGrid}>
          {rooms.map((room, i) => (
            <div key={i} style={styles.roomCard}>
              <img src={room.img} alt={room.title} style={styles.roomImage} />
              <h3 style={styles.roomTitle}>{room.title}</h3>
              <p style={styles.roomDesc}>{room.desc}</p>
              <p style={styles.roomPrice}>{room.price}</p>
              <a
                href={`https://wa.me/254748778388?text=${encodeURIComponent(room.msg)}`}
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
