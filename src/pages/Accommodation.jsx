import React, { useEffect, useState } from 'react';
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
      @keyframes flickerZoom {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.03); opacity: 0.95; }
      }
      .scroll-container::-webkit-scrollbar {
        display: none;
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
    scrollGallery: {
      display: 'flex',
      overflowX: 'auto',
      gap: '1rem',
      paddingBottom: '1rem',
      scrollSnapType: 'x mandatory',
      animation: 'fadeIn 2s ease-in-out',
      marginBottom: '2rem',
    },
    scrollItem: {
      flex: '0 0 auto',
      scrollSnapAlign: 'start',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid #30363d',
      boxShadow: '0 0 10px rgba(88,166,255,0.1)',
      animation: 'flickerZoom 4s infinite ease-in-out',
    },
    image: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      display: 'block',
    },
    video: {
      width: '100%',
      height: '160px',
      objectFit: 'cover',
      display: 'block',
    },
    roomGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
    },
    roomCard: {
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 0 15px rgba(88,166,255,0.15)',
      textAlign: 'left',
    },
    roomTitle: {
      color: '#58a6ff',
      fontSize: '1.2rem',
      marginBottom: '0.5rem',
    },
    roomDesc: {
      fontSize: '0.9rem',
      color: '#8b949e',
      marginBottom: '0.8rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    input: {
      background: '#0d1117',
      color: '#fff',
      padding: '0.4rem 0.6rem',
      borderRadius: '6px',
      border: '1px solid #30363d',
    },
    price: {
      color: '#9fef00',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    bookBtn: {
      background: '#25d366',
      color: '#fff',
      padding: '0.6rem 1.2rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
      textAlign: 'center',
      display: 'inline-block',
    },
  };

  const mediaItems = [
    '/assets/room1.jpg',
    '/assets/room2.jpg',
    '/assets/conference1.jpg',
    '/assets/Compound Overview1.jpg',
    '/assets/upstairs env view1.jpg',
    '/assets/dining2.jpg',
    '/assets/cake video.mp4',
    '/assets/Room 40sec.mp4',
    '/assets/bar under construction.mp4',
  ];

  const RoomCard = ({ type }) => {
    const [guests, setGuests] = useState(1);
    const [breakfast, setBreakfast] = useState(false);
    const [sessionType, setSessionType] = useState('half');

    let basePrice = 0;
    if (type === 'standard') basePrice = 1500;
    if (type === 'family') basePrice = 2000;
    if (type === 'conference') basePrice = sessionType === 'full' ? 5000 : 2000;

    const total =
      type === 'conference'
        ? basePrice
        : basePrice + (breakfast ? 500 * guests : 0);

    const message = encodeURIComponent(
      type === 'conference'
        ? `Hello Settlers Inn! I'd like to book the Conference Room for a ${sessionType === 'full' ? 'Full Day' : 'Half Day'} session.\nTotal Budget: KES ${total}\nPlease confirm availability.`
        : `Hi Settlers Inn! I’d like to book the ${type === 'standard' ? 'Standard Room' : 'Family Room'} for ${guests} guest(s).\nBreakfast: ${breakfast ? 'Yes' : 'No'}\nTotal Budget: KES ${total}`
    );

    const image = type === 'standard'
      ? '/assets/room1.jpg'
      : type === 'family'
      ? '/assets/room2.jpg'
      : '/assets/conference1.jpg';

    const title =
      type === 'standard'
        ? 'Standard Room'
        : type === 'family'
        ? 'Family Room'
        : 'Conference Room';

    const desc =
      type === 'standard'
        ? 'Simple. Clean. Safe. Like a Netflix opening scene before everything goes right.'
        : type === 'family'
        ? 'Big enough for your squad. Cozy enough for family drama. The good kind.'
        : 'Equipped for meetings, trainings & strategy. Includes Wi-Fi, coffee & space to think.';

    return (
      <div style={styles.roomCard}>
        <img src={image} alt={title} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
        <h3 style={styles.roomTitle}>{title}</h3>
        <p style={styles.roomDesc}>{desc}</p>

        <div style={styles.formGroup}>
          {type !== 'conference' && (
            <>
              <label>Guests:</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                min={1}
                style={styles.input}
              />
              <label>
                <input
                  type="checkbox"
                  checked={breakfast}
                  onChange={(e) => setBreakfast(e.target.checked)}
                />{' '}
                Add Breakfast (KES 500 per person)
              </label>
            </>
          )}

          {type === 'conference' && (
            <>
              <label>Session Type:</label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                style={styles.input}
              >
                <option value="half">Half Day - KES 2000</option>
                <option value="full">Full Day - KES 5000</option>
              </select>
            </>
          )}
        </div>

        <p style={styles.price}>Total: KES {total}</p>

        <a
          href={`https://wa.me/254748778388?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.bookBtn}
        >
          📲 Book on WhatsApp
        </a>
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <section style={styles.section}>
        <h2 style={styles.title}>🏨 Heaven Found: Settlers Stays</h2>
        <p style={styles.subtitle}>
          Not just a place to stay. A place to feel alive again.
        </p>
        <p style={styles.thriller}>
          🎬 “3 rooms. 1 legacy. Comfort is calling…” 📞
        </p>

        <div className="scroll-container" style={styles.scrollGallery}>
          {mediaItems.map((src, i) => {
            const isVideo = src.endsWith('.mp4');
            return (
              <div key={i} style={{ ...styles.scrollItem, width: '220px' }}>
                {isVideo ? (
                  <video
                    src={src}
                    style={styles.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img src={src} alt={`media-${i}`} style={styles.image} />
                )}
              </div>
            );
          })}
        </div>

        <div style={styles.roomGrid}>
          <RoomCard type="standard" />
          <RoomCard type="family" />
          <RoomCard type="conference" />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Accommodation;
