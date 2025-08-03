import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MpesaPayment = ({ amount = '', item = 'booking' }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const sendToWhatsApp = () => {
    if (!phone || !code) return;
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const message = `🌍 Settlers Inn Payment Confirmation\n\n📦 Item: ${item}\n💰 Amount: KES ${amount}\n📞 Phone: ${phone}\n✅ Mpesa Code: ${code}\n📌 Paybill: 522533\n🧾 Account: 5936175\n\nPlease confirm this payment.`;
      const url = `https://wa.me/254748778388?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      setIsProcessing(false);
    }, 1500);
  };
  
  return (
    <div style={{ marginTop: '1rem', position: 'relative' }}>
      <h4 style={{ marginBottom: '0.5rem', color: '#9fef00' }}>Confirm M-PESA Payment</h4>
      <input
        type="text"
        placeholder="Phone Number (07...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="M-PESA Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={inputStyle}
      />
      <button 
        onClick={sendToWhatsApp} 
        style={{
          ...buttonStyle,
          background: isProcessing ? '#555' : '#25d366',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
        }}
        disabled={isProcessing}
      >
        {isProcessing ? '⏳ Processing...' : '📤 Confirm via WhatsApp'}
      </button>
      {isProcessing && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          zIndex: 10,
        }}>
          Processing payment...
        </div>
      )}
    </div>
  );
};

const Accommodation = () => {
  const [dailySpecial, setDailySpecial] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  
  useEffect(() => {
    // Simulate daily specials
    const specials = [
      "Today: Free breakfast with all room bookings!",
      "Weekend Special: 15% off conference rooms",
      "Family Deal: Kids stay free with family room booking",
      "New Offer: Late checkout until 2 PM (Sundays only)"
    ];
    setDailySpecial(specials[Math.floor(Math.random() * specials.length)]);
    
    // Set last updated time
    const now = new Date();
    setLastUpdated(`Last updated: ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
    
    // Animation styles
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes popIn {
        from {opacity: 0; transform: scale(0.95);}
        to {opacity: 1; transform: scale(1);}
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      .react-datepicker {
        background-color: #161b22;
        border: 1px solid #30363d;
        color: white;
      }
      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background-color: #9fef00 !important;
        color: #000 !important;
      }
      .new-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff3e3e;
        color: white;
        font-size: 0.7rem;
        padding: 2px 6px;
        border-radius: 10px;
        animation: pulse 2s infinite;
      }
      .special-banner {
        background: linear-gradient(90deg, #9fef00, #58a6ff);
        color: #0d1117;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 1rem;
        animation: shimmer 2s infinite;
        background-size: 200px 100%;
      }
      @media (max-width: 600px) {
        .media-scroll {
          gap: 0.5rem !important;
        }
        .media-scroll > div {
          width: 160px !important;
        }
        .room-card {
          padding: 1rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

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
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [isHovered, setIsHovered] = useState(false);
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    const nights =
      type === 'conference' ? 1 : Math.max(Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24)), 1);
    const basePrice =
      type === 'standard'
        ? 1500
        : type === 'family'
        ? 2000
        : sessionType === 'full'
        ? 5000
        : 2000;
    const total =
      type === 'conference'
        ? basePrice
        : nights * (basePrice + (breakfast ? 500 * guests : 0));
    const title =
      type === 'standard'
        ? 'Standard Room'
        : type === 'family'
        ? 'Family Room'
        : 'Conference Room';
    const message = encodeURIComponent(
      type === 'conference'
        ? `Hello Settlers Inn! I'd like to book the Conference Room for a ${
            sessionType === 'full' ? 'Full Day' : 'Half Day'
          } on ${formatDate(checkIn)}.\nTotal Budget: KES ${total}`
        : `Hi Settlers Inn! I'd like to book the ${title} from ${formatDate(
            checkIn
          )} to ${formatDate(checkOut)} for ${guests} guest(s).\nBreakfast: ${
            breakfast ? 'Yes' : 'No'
          }\nNights: ${nights}\nTotal: KES ${total}`
    );
    const image =
      type === 'standard'
        ? '/assets/room1.jpg'
        : type === 'family'
        ? '/assets/room2.jpg'
        : '/assets/conference1.jpg';
    
    const isNew = type === 'conference'; // Simulate new feature
    
    return (
      <div 
        className="room-card" 
        style={{
          ...roomCardStyle,
          transform: isHovered ? 'translateY(-5px)' : 'none',
          boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isNew && <div className="new-badge">NEW</div>}
        <img src={image} alt={title} style={imageStyle} />
        <h3 style={titleStyle}>{title}</h3>
        {type !== 'conference' ? (
          <>
            <label>Check-In Date:</label>
            <DatePicker selected={checkIn} onChange={setCheckIn} />
            <label>Check-Out Date:</label>
            <DatePicker selected={checkOut} onChange={setCheckOut} />
            <label>Guests:</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              style={inputStyle}
            />
            <label style={{ display: 'block', marginTop: '0.5rem' }}>
              <input
                type="checkbox"
                checked={breakfast}
                onChange={(e) => setBreakfast(e.target.checked)}
              />{' '}
              Add Breakfast (KES 500/guest)
            </label>
          </>
        ) : (
          <>
            <label>Booking Date:</label>
            <DatePicker selected={checkIn} onChange={setCheckIn} />
            <label>Session:</label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              style={inputStyle}
            >
              <option value="half">Half Day – KES 2,000</option>
              <option value="full">Full Day – KES 5,000</option>
            </select>
          </>
        )}
        <p style={{ color: '#9fef00', fontWeight: 'bold' }}>Total: KES {total}</p>
        <a
          href={`https://wa.me/254748778388?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          🛌 Reserve Now (Pay on Arrival)
        </a>
        <MpesaPayment amount={total} item={title} />
      </div>
    );
  };

  return (
    <div style={{ background: '#0d1117', color: '#c9d1d9', fontFamily: 'Fira Code, monospace' }}>
      <Navbar />
      <section style={{ maxWidth: '900px', margin: 'auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#9fef00', fontSize: '2rem', animation: 'popIn 0.6s ease-in-out' }}>
            🏨 Settlers Inn Booking
          </h2>
          <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>
            {lastUpdated}
          </div>
        </div>
        
        <div className="special-banner">
          🌟 {dailySpecial} 🌟
        </div>
        
        <p style={{ marginBottom: '1rem' }}>
          You can book with M-PESA or choose to pay on arrival.
        </p>
        
        <div style={{
          background: '#0d1f17',
          border: '1px solid #1f5f3f',
          padding: '1.2rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          color: '#9fffa2',
          fontSize: '0.95rem',
        }}>
          <strong>📱 How to Pay via M-PESA</strong><br />
          1. Go to <strong>Lipa na M-PESA</strong> → Paybill<br />
          2. Enter Paybill Number: <strong>522533</strong><br />
          3. Account Number: <strong>5936175</strong><br />
          4. Enter Amount<br />
          5. Enter your PIN and confirm<br /><br />
          ✅ Then enter the M-PESA Code below to confirm, or skip to pay later.
        </div>
        
        <div className="media-scroll" style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '1rem',
          paddingBottom: '1rem',
          scrollSnapType: 'x mandatory'
        }}>
          {mediaItems.map((src, i) => {
            const isVideo = src.endsWith('.mp4');
            return (
              <div key={i} style={{ 
                flex: '0 0 auto', 
                width: '220px', 
                scrollSnapAlign: 'start',
                position: 'relative'
              }}>
                {isVideo ? (
                  <video src={src} style={imageStyle} autoPlay loop muted playsInline />
                ) : (
                  <img src={src} alt={`media-${i}`} style={imageStyle} />
                )}
                {i === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}>
                    NEW
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
        }}>
          <RoomCard type="standard" />
          <RoomCard type="family" />
          <RoomCard type="conference" />
        </div>
      </section>
      <Footer />
    </div>
  );
};

// 🔧 Styles
const inputStyle = {
  padding: '0.4rem',
  width: '100%',
  marginBottom: '0.5rem',
  borderRadius: '6px',
  border: '1px solid #30363d',
  background: '#0d1117',
  color: '#fff',
};
const buttonStyle = {
  background: '#25d366',
  color: '#fff',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '0.5rem',
  transition: 'all 0.2s ease',
};
const roomCardStyle = {
  background: '#161b22',
  border: '1px solid #30363d',
  borderRadius: '12px',
  padding: '1.5rem',
  textAlign: 'left',
  position: 'relative',
};
const imageStyle = {
  width: '100%',
  height: '160px',
  objectFit: 'cover',
  borderRadius: '8px',
};
const titleStyle = {
  marginBottom: '1rem',
  color: '#58a6ff',
};

export default Accommodation;