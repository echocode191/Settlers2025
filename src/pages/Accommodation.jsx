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
      <h4 style={{ marginBottom: '0.5rem', color: '#38bdf8' }}>Confirm M-PESA Payment</h4>
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
          background: 'rgba(15, 23, 42, 0.9)',
          color: '#e2e8f0',
          padding: '12px 20px',
          borderRadius: '10px',
          zIndex: 10,
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
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
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fadeInUp {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .react-datepicker {
          background-color: rgba(30, 41, 59, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          backdrop-filter: blur(10px);
          border-radius: 12px;
        }
        .react-datepicker__header {
          background-color: rgba(30, 41, 59, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #38bdf8 !important;
          color: #0f172a !important;
          border-radius: 50%;
        }
        .react-datepicker__day:hover {
          background-color: rgba(56, 189, 248, 0.3);
          border-radius: 50%;
        }
        .new-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          animation: subtlePulse 2s infinite;
          backdrop-filter: blur(4px);
        }
        .special-banner {
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.9), rgba(139, 92, 246, 0.9));
          color: #0f172a;
          padding: 10px 18px;
          border-radius: 20px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1.5rem;
          animation: shimmer 3s infinite;
          background-size: 200px 100%;
          backdrop-filter: blur(4px);
        }
        @media (max-width: 600px) {
          .media-scroll {
            gap: 0.8rem !important;
          }
          .media-scroll > div {
            width: 180px !important;
          }
          .room-card {
            padding: 1.2rem !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
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
          boxShadow: isHovered ? '0 12px 30px rgba(0, 0, 0, 0.2)' : '0 8px 25px rgba(0, 0, 0, 0.15)',
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
            <label style={labelStyle}>Check-In Date:</label>
            <DatePicker 
              selected={checkIn} 
              onChange={setCheckIn}
              className="date-picker"
              style={datePickerStyle}
            />
            <label style={labelStyle}>Check-Out Date:</label>
            <DatePicker 
              selected={checkOut} 
              onChange={setCheckOut}
              className="date-picker"
              style={datePickerStyle}
            />
            <label style={labelStyle}>Guests:</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              style={inputStyle}
            />
            <label style={{ 
              display: 'block', 
              marginTop: '0.8rem',
              color: '#cbd5e1',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={breakfast}
                onChange={(e) => setBreakfast(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />{' '}
              Add Breakfast (KES 500/guest)
            </label>
          </>
        ) : (
          <>
            <label style={labelStyle}>Booking Date:</label>
            <DatePicker 
              selected={checkIn} 
              onChange={setCheckIn}
              className="date-picker"
              style={datePickerStyle}
            />
            <label style={labelStyle}>Session:</label>
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
        <p style={{ 
          color: '#38bdf8', 
          fontWeight: '600',
          margin: '1rem 0',
          fontSize: '1.1rem'
        }}>Total: KES {total}</p>
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
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a, #1e293b)', 
      color: '#e2e8f0', 
      fontFamily: 'Inter, system-ui, sans-serif',
      minHeight: '100vh'
    }}>
      <Navbar />
      <section style={{ 
        maxWidth: '1000px', 
        margin: 'auto', 
        padding: '3rem 1.5rem',
        animation: 'fadeInUp 0.8s ease'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <h2 style={{ 
            color: '#e2e8f0', 
            fontSize: '2.2rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            🏨 Settlers Inn Booking
          </h2>
          <div style={{ 
            fontSize: '0.85rem', 
            color: '#94a3b8',
            background: 'rgba(30, 41, 59, 0.7)',
            padding: '6px 12px',
            borderRadius: '20px',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {lastUpdated}
          </div>
        </div>
        
        <div className="special-banner">
          🌟 {dailySpecial} 🌟
        </div>
        
        <p style={{ 
          marginBottom: '1.5rem', 
          lineHeight: '1.6',
          color: '#cbd5e1',
          fontSize: '1rem'
        }}>
          You can book with M-PESA or choose to pay on arrival.
        </p>
        
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '1.5rem',
          borderRadius: '16px',
          marginBottom: '2.5rem',
          color: '#e2e8f0',
          fontSize: '0.95rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
        }}>
          <strong style={{ color: '#38bdf8', fontSize: '1.1rem' }}>📱 How to Pay via M-PESA</strong><br />
          1. Go to <strong style={{ color: '#38bdf8' }}>Lipa na M-PESA</strong> → Paybill<br />
          2. Enter Paybill Number: <strong style={{ color: '#38bdf8' }}>522533</strong><br />
          3. Account Number: <strong style={{ color: '#38bdf8' }}>5936175</strong><br />
          4. Enter Amount<br />
          5. Enter your PIN and confirm<br /><br />
          ✅ Then enter the M-PESA Code below to confirm, or skip to pay later.
        </div>
        
        <div className="media-scroll" style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '1.2rem',
          paddingBottom: '1.5rem',
          scrollSnapType: 'x mandatory',
          marginBottom: '2.5rem',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(56, 189, 248, 0.3) transparent'
        }}>
          {mediaItems.map((src, i) => {
            const isVideo = src.endsWith('.mp4');
            return (
              <div key={i} style={{ 
                flex: '0 0 auto', 
                width: '240px', 
                scrollSnapAlign: 'start',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {isVideo ? (
                  <video src={src} style={imageStyle} autoPlay loop muted playsInline />
                ) : (
                  <img src={src} alt={`media-${i}`} style={imageStyle} />
                )}
                {i === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    color: '#38bdf8',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
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
          gap: '2.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
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
  padding: '0.7rem 1rem',
  width: '100%',
  marginBottom: '1rem',
  borderRadius: '10px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(30, 41, 59, 0.7)',
  color: '#e2e8f0',
  fontSize: '0.95rem',
  backdropFilter: 'blur(4px)',
  transition: 'all 0.2s ease',
  outline: 'none',
};

const datePickerStyle = {
  padding: '0.7rem 1rem',
  width: '100%',
  marginBottom: '1rem',
  borderRadius: '10px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(30, 41, 59, 0.7)',
  color: '#e2e8f0',
  fontSize: '0.95rem',
  backdropFilter: 'blur(4px)',
  transition: 'all 0.2s ease',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  color: '#cbd5e1',
  fontSize: '0.9rem',
  fontWeight: '500',
};

const buttonStyle = {
  background: 'rgba(56, 189, 248, 0.9)',
  color: '#0f172a',
  padding: '0.8rem 1.5rem',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '0.8rem',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(4px)',
  boxShadow: '0 4px 15px rgba(56, 189, 248, 0.25)',
  textAlign: 'center',
  width: '100%',
  fontSize: '0.95rem'
};

const roomCardStyle = {
  background: 'rgba(30, 41, 59, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: '1.8rem',
  textAlign: 'left',
  position: 'relative',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
};

const imageStyle = {
  width: '100%',
  height: '180px',
  objectFit: 'cover',
  borderRadius: '12px',
  marginBottom: '1.2rem',
  transition: 'transform 0.3s ease'
};

const titleStyle = {
  marginBottom: '1.2rem',
  color: '#e2e8f0',
  fontSize: '1.4rem',
  fontWeight: '600'
};

export default Accommodation;