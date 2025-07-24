import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ✅ M-PESA PAYMENT BLOCK
const MpesaPayment = ({ amount = '', item = 'booking' }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const sendToWhatsApp = () => {
    if (!phone || !code) return;

    const message = `🌍 Settlers Inn Payment Confirmation

📦 Item: ${item}
💰 Amount: KES ${amount}
📞 Phone: ${phone}
✅ Mpesa Code: ${code}
📌 Paybill: 522533
🧾 Account: 5936175

Please confirm this payment.`;

    const url = `https://wa.me/254748778388?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ marginTop: '1rem' }}>
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
      <button onClick={sendToWhatsApp} style={buttonStyle}>
        📤 Confirm via WhatsApp
      </button>
    </div>
  );
};

const Accommodation = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes popIn { from {opacity: 0; transform: scale(0.95);} to {opacity: 1; transform: scale(1);} }
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
        : `Hi Settlers Inn! I’d like to book the ${title} from ${formatDate(
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

    return (
      <div style={roomCardStyle}>
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
        <h2 style={{ color: '#9fef00', fontSize: '2rem', animation: 'popIn 0.6s ease-in-out' }}>
          🏨 Settlers Inn Booking
        </h2>
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

        <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', paddingBottom: '1rem' }}>
          {mediaItems.map((src, i) => {
            const isVideo = src.endsWith('.mp4');
            return (
              <div key={i} style={{ flex: '0 0 auto', width: '220px' }}>
                {isVideo ? (
                  <video src={src} style={imageStyle} autoPlay loop muted playsInline />
                ) : (
                  <img src={src} alt={`media-${i}`} style={imageStyle} />
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
};

const roomCardStyle = {
  background: '#161b22',
  border: '1px solid #30363d',
  borderRadius: '12px',
  padding: '1.5rem',
  textAlign: 'left',
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
