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
    <div className="mpesa-payment">
      <h4 className="mpesa-heading">Confirm M-PESA Payment</h4>
      <input
        type="text"
        placeholder="Phone Number (07...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mpesa-input glass"
      />
      <input
        type="text"
        placeholder="M-PESA Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mpesa-input glass"
      />
      <button 
        onClick={sendToWhatsApp} 
        className={`mpesa-button glass ${isProcessing ? 'processing' : ''}`}
        disabled={isProcessing}
      >
        {isProcessing ? '⏳ Processing...' : '📤 Confirm via WhatsApp'}
      </button>
      {isProcessing && (
        <div className="processing-overlay glass">
          Processing payment...
        </div>
      )}
    </div>
  );
};

const Accommodation = () => {
  const [dailySpecial, setDailySpecial] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isVerySmallMobile, setIsVerySmallMobile] = useState(false);
  
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
    
    // Check screen size for responsive design
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
      setIsVerySmallMobile(window.innerWidth <= 333);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
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
        className={`room-card glass ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isNew && <div className="new-badge">NEW</div>}
        <img src={image} alt={title} className="room-image" />
        <h3 className="room-title">{title}</h3>
        {type !== 'conference' ? (
          <>
            <label className="form-label">Check-In Date:</label>
            <DatePicker 
              selected={checkIn} 
              onChange={setCheckIn}
              className="date-picker glass"
            />
            <label className="form-label">Check-Out Date:</label>
            <DatePicker 
              selected={checkOut} 
              onChange={setCheckOut}
              className="date-picker glass"
            />
            <label className="form-label">Guests:</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="form-input glass"
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={breakfast}
                onChange={(e) => setBreakfast(e.target.checked)}
                className="checkbox-input"
              />{' '}
              Add Breakfast (KES 500/guest)
            </label>
          </>
        ) : (
          <>
            <label className="form-label">Booking Date:</label>
            <DatePicker 
              selected={checkIn} 
              onChange={setCheckIn}
              className="date-picker glass"
            />
            <label className="form-label">Session:</label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="form-select glass"
            >
              <option value="half">Half Day – KES 2,000</option>
              <option value="full">Full Day – KES 5,000</option>
            </select>
          </>
        )}
        <p className="room-total">Total: KES {total}</p>
        <a
          href={`https://wa.me/254748778388?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="reserve-button glass"
        >
          🛌 Reserve Now (Pay on Arrival)
        </a>
        <MpesaPayment amount={total} item={title} />
      </div>
    );
  };
  
  return (
    <div className="accommodation-container">
      <style>
        {`
          /* Base styles with glassmorphism theme */
          :root {
            --primary: #4facfe;
            --secondary: #00f2fe;
            --accent: #4facfe;
            --background: linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c);
            --text: #ffffff;
            --highlight: #4facfe;
            --glass-bg: rgba(255, 255, 255, 0.15);
            --glass-border: rgba(255, 255, 255, 0.2);
            --glass-shadow: rgba(31, 38, 135, 0.15);
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: var(--background);
            color: var(--text);
            line-height: 1.5;
            background-attachment: fixed;
            background-size: cover;
            min-height: 100vh;
          }
          
          .accommodation-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            padding-bottom: 80px;
          }
          
          /* Glassmorphism utility class */
          .glass {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            border: 1px solid var(--glass-border);
            box-shadow: 0 8px 32px 0 var(--glass-shadow);
            transition: transform 0.3s ease;
          }
          
          .glass:hover {
            transform: translateY(-5px);
          }
          
          /* Section Styles */
          .section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 1.5rem;
            animation: fadeInUp 0.8s ease;
          }
          
          /* Header Styles */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .heading {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text);
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }
          
          .last-updated {
            font-size: 0.9rem;
            color: var(--text);
            opacity: 0.8;
            padding: 8px 16px;
            border-radius: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(8px);
            border: 1px solid var(--glass-border);
          }
          
          /* Special Banner */
          .special-banner {
            display: inline-block;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            color: white;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 600;
            margin-bottom: 2rem;
            font-size: 1rem;
            box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
            text-align: center;
            width: 100%;
          }
          
          /* Description */
          .description {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            color: var(--text);
            opacity: 0.9;
            text-align: center;
          }
          
          /* Payment Info */
          .payment-info {
            padding: 2rem;
            border-radius: 20px;
            margin-bottom: 3rem;
            font-size: 1rem;
            line-height: 1.6;
          }
          
          .payment-info strong {
            color: var(--highlight);
            font-size: 1.2rem;
            display: block;
            margin-bottom: 0.8rem;
          }
          
          .payment-info .highlight {
            color: var(--highlight);
            font-weight: 600;
          }
          
          /* Media Scroll */
          .media-scroll {
            display: flex;
            overflow-x: auto;
            gap: 1.5rem;
            padding-bottom: 1.5rem;
            margin-bottom: 3rem;
            scroll-snap-type: x mandatory;
          }
          
          .media-scroll::-webkit-scrollbar {
            height: 8px;
          }
          
          .media-scroll::-webkit-scrollbar-track {
            background: var(--glass-bg);
            border-radius: 4px;
          }
          
          .media-scroll::-webkit-scrollbar-thumb {
            background: var(--highlight);
            border-radius: 4px;
          }
          
          .media-item {
            flex: 0 0 auto;
            width: 280px;
            scroll-snap-align: start;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          
          .media-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          
          .new-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            background: linear-gradient(45deg, #ff416c, #ff4b2b);
            color: white;
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
            box-shadow: 0 4px 10px rgba(255, 65, 108, 0.4);
            animation: subtlePulse 2s infinite;
          }
          
          /* Room Grid */
          .room-grid {
            display: grid;
            gap: 2.5rem;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }
          
          /* Room Card */
          .room-card {
            padding: 2rem;
            text-align: left;
            position: relative;
            transition: all 0.3s ease;
          }
          
          .room-card.hovered {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(79, 172, 254, 0.3);
          }
          
          .room-image {
            width: 100%;
            height: 220px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            transition: transform 0.5s ease;
          }
          
          .room-card:hover .room-image {
            transform: scale(1.03);
          }
          
          .room-title {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: var(--text);
            font-weight: 600;
          }
          
          .form-label {
            display: block;
            margin-bottom: 0.8rem;
            color: var(--text);
            font-size: 1rem;
            font-weight: 500;
          }
          
          .form-input, .form-select {
            width: 100%;
            padding: 12px 16px;
            margin-bottom: 1.2rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background: var(--glass-bg);
            color: var(--text);
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
          }
          
          .form-input:focus, .form-select:focus {
            border-color: var(--highlight);
            box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.3);
          }
          
          .checkbox-label {
            display: block;
            margin-top: 1rem;
            margin-bottom: 1.2rem;
            color: var(--text);
            font-size: 1rem;
            cursor: pointer;
          }
          
          .checkbox-input {
            margin-right: 0.5rem;
          }
          
          .room-total {
            color: var(--highlight);
            font-weight: 600;
            margin: 1.5rem 0;
            font-size: 1.3rem;
          }
          
          .reserve-button {
            display: inline-block;
            padding: 14px 24px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            margin-bottom: 1.5rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
            text-align: center;
            width: 100%;
            font-size: 1rem;
          }
          
          .reserve-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(79, 172, 254, 0.6);
          }
          
          /* Mpesa Payment */
          .mpesa-payment {
            margin-top: 1rem;
            position: relative;
          }
          
          .mpesa-heading {
            margin-bottom: 1rem;
            color: var(--highlight);
            font-size: 1.2rem;
            font-weight: 600;
          }
          
          .mpesa-input {
            padding: 12px 16px;
            width: 100%;
            margin-bottom: 1rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background: var(--glass-bg);
            color: var(--text);
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
          }
          
          .mpesa-input:focus {
            border-color: var(--highlight);
            box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.3);
          }
          
          .mpesa-button {
            background: linear-gradient(45deg, #25D366, #128C7E);
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            display: inline-block;
            margin-top: 0.8rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
            text-align: center;
            width: 100%;
            font-size: 1rem;
          }
          
          .mpesa-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
          }
          
          .mpesa-button.processing {
            background: rgba(100, 116, 139, 0.8);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          
          .processing-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 15px 25px;
            border-radius: 12px;
            z-index: 10;
            font-weight: 500;
          }
          
          /* Date Picker */
          .react-datepicker {
            background-color: var(--glass-bg) !important;
            border: 1px solid var(--glass-border) !important;
            color: var(--text) !important;
            backdrop-filter: blur(12px) !important;
            border-radius: 12px !important;
          }
          
          .react-datepicker__header {
            background-color: var(--glass-bg) !important;
            border-bottom: 1px solid var(--glass-border) !important;
          }
          
          .react-datepicker__day--selected,
          .react-datepicker__day--keyboard-selected {
            background-color: var(--highlight) !important;
            color: var(--background) !important;
            border-radius: 50% !important;
          }
          
          .react-datepicker__day:hover {
            background-color: rgba(79, 172, 254, 0.3) !important;
            border-radius: 50% !important;
          }
          
          /* Animations */
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes subtlePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          /* Responsive Styles */
          @media (max-width: 768px) {
            .section {
              padding: 2rem 1rem;
            }
            
            .heading {
              font-size: 2rem;
            }
            
            .media-scroll {
              gap: 1rem;
            }
            
            .media-item {
              width: 220px;
            }
            
            .media-image {
              height: 160px;
            }
            
            .room-grid {
              gap: 1.8rem;
            }
            
            .room-card {
              padding: 1.5rem;
            }
            
            .room-image {
              height: 180px;
            }
            
            .room-title {
              font-size: 1.3rem;
            }
          }
          
          @media (max-width: 480px) {
            .section {
              padding: 1.5rem 0.8rem;
            }
            
            .heading {
              font-size: 1.7rem;
            }
            
            .description {
              font-size: 1rem;
            }
            
            .payment-info {
              padding: 1.5rem;
              font-size: 0.9rem;
            }
            
            .media-scroll {
              gap: 0.8rem;
            }
            
            .media-item {
              width: 180px;
            }
            
            .media-image {
              height: 140px;
            }
            
            .room-grid {
              gap: 1.5rem;
            }
            
            .room-card {
              padding: 1.2rem;
            }
            
            .room-image {
              height: 160px;
            }
            
            .room-title {
              font-size: 1.2rem;
            }
            
            .form-label {
              font-size: 0.9rem;
            }
            
            .form-input, .form-select {
              padding: 10px 14px;
              font-size: 0.9rem;
            }
            
            .checkbox-label {
              font-size: 0.9rem;
            }
            
            .room-total {
              font-size: 1.1rem;
            }
            
            .reserve-button {
              padding: 12px 20px;
              font-size: 0.9rem;
            }
            
            .mpesa-heading {
              font-size: 1.1rem;
            }
            
            .mpesa-input {
              padding: 10px 14px;
              font-size: 0.9rem;
            }
            
            .mpesa-button {
              padding: 10px 16px;
              font-size: 0.9rem;
            }
          }
          
          @media (max-width: 333px) {
            .section {
              padding: 1.2rem 0.6rem;
            }
            
            .heading {
              font-size: 1.5rem;
            }
            
            .description {
              font-size: 0.95rem;
            }
            
            .payment-info {
              padding: 1.2rem;
              font-size: 0.85rem;
            }
            
            .media-scroll {
              gap: 0.6rem;
            }
            
            .media-item {
              width: 160px;
            }
            
            .media-image {
              height: 120px;
            }
            
            .room-grid {
              gap: 1.2rem;
            }
            
            .room-card {
              padding: 1rem;
            }
            
            .room-image {
              height: 140px;
            }
            
            .room-title {
              font-size: 1.1rem;
            }
            
            .form-label {
              font-size: 0.85rem;
            }
            
            .form-input, .form-select {
              padding: 8px 12px;
              font-size: 0.85rem;
            }
            
            .checkbox-label {
              font-size: 0.85rem;
            }
            
            .room-total {
              font-size: 1rem;
            }
            
            .reserve-button {
              padding: 10px 16px;
              font-size: 0.85rem;
            }
            
            .mpesa-heading {
              font-size: 1rem;
            }
            
            .mpesa-input {
              padding: 8px 12px;
              font-size: 0.85rem;
            }
            
            .mpesa-button {
              padding: 8px 14px;
              font-size: 0.85rem;
            }
          }
        `}
      </style>
      
      <Navbar />
      <section className="section">
        <div className="header">
          <h2 className="heading">🏨 Settlers Inn Booking</h2>
          <div className="last-updated glass">
            {lastUpdated}
          </div>
        </div>
        
        <div className="special-banner">
          🌟 {dailySpecial} 🌟
        </div>
        
        <p className="description">
          You can book with M-PESA or choose to pay on arrival.
        </p>
        
        <div className="payment-info glass">
          <strong>📱 How to Pay via M-PESA</strong><br />
          1. Go to <span className="highlight">Lipa na M-PESA</span> → Paybill<br />
          2. Enter Paybill Number: <span className="highlight">522533</span><br />
          3. Account Number: <span className="highlight">5936175</span><br />
          4. Enter Amount<br />
          5. Enter your PIN and confirm<br /><br />
          ✅ Then enter the M-PESA Code below to confirm, or skip to pay later.
        </div>
        
        <div className="media-scroll">
          {mediaItems.map((src, i) => {
            const isVideo = src.endsWith('.mp4');
            return (
              <div key={i} className="media-item glass">
                {isVideo ? (
                  <video 
                    src={src} 
                    className="media-image" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={src} 
                    alt={`media-${i}`} 
                    className="media-image" 
                  />
                )}
                {i === 0 && (
                  <div className="new-badge">
                    NEW
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="room-grid">
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
