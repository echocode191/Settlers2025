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
  
  // Glassy styles
  const glassyStyle = {
    container: {
      marginTop: '1rem',
      position: 'relative'
    },
    heading: {
      marginBottom: '0.5rem',
      color: '#38bdf8'
    },
    input: {
      padding: '0.7rem 1rem',
      width: '100%',
      marginBottom: '1rem',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      background: 'rgba(255, 255, 255, 0.08)',
      color: '#e2e8f0',
      fontSize: '0.95rem',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.2s ease',
      outline: 'none',
      WebkitBackdropFilter: 'blur(8px)'
    },
    button: {
      background: 'rgba(37, 211, 102, 0.8)',
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
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
      textAlign: 'center',
      width: '100%',
      fontSize: '0.95rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    processingOverlay: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#e2e8f0',
      padding: '12px 20px',
      borderRadius: '12px',
      zIndex: 10,
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(12px)'
    }
  };
  
  return (
    <div style={glassyStyle.container}>
      <h4 style={glassyStyle.heading}>Confirm M-PESA Payment</h4>
      <input
        type="text"
        placeholder="Phone Number (07...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={glassyStyle.input}
      />
      <input
        type="text"
        placeholder="M-PESA Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={glassyStyle.input}
      />
      <button 
        onClick={sendToWhatsApp} 
        style={{
          ...glassyStyle.button,
          background: isProcessing ? 'rgba(85, 85, 85, 0.8)' : 'rgba(37, 211, 102, 0.8)',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
        }}
        disabled={isProcessing}
      >
        {isProcessing ? '⏳ Processing...' : '📤 Confirm via WhatsApp'}
      </button>
      {isProcessing && (
        <div style={glassyStyle.processingOverlay}>
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
    
    // Glassy styles
    const glassyStyle = {
      roomCard: {
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '1.8rem',
        textAlign: 'left',
        position: 'relative',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
        WebkitBackdropFilter: 'blur(16px)'
      },
      roomCardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)'
      },
      newBadge: {
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        background: 'rgba(239, 68, 68, 0.9)',
        color: 'white',
        fontSize: '0.7rem',
        padding: '2px 6px',
        borderRadius: '10px',
        animation: 'subtlePulse 2s infinite',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        WebkitBackdropFilter: 'blur(8px)'
      },
      image: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        borderRadius: '12px',
        marginBottom: '1.2rem',
        transition: 'transform 0.3s ease'
      },
      title: {
        marginBottom: '1.2rem',
        color: '#e2e8f0',
        fontSize: '1.4rem',
        fontWeight: '600'
      },
      label: {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#cbd5e1',
        fontSize: '0.9rem',
        fontWeight: '500'
      },
      input: {
        padding: '0.7rem 1rem',
        width: '100%',
        marginBottom: '1rem',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.08)',
        color: '#e2e8f0',
        fontSize: '0.95rem',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.2s ease',
        outline: 'none',
        WebkitBackdropFilter: 'blur(8px)'
      },
      checkboxLabel: {
        display: 'block',
        marginTop: '0.8rem',
        color: '#cbd5e1',
        fontSize: '0.9rem',
        cursor: 'pointer'
      },
      total: {
        color: '#38bdf8',
        fontWeight: '600',
        margin: '1rem 0',
        fontSize: '1.1rem'
      },
      button: {
        background: 'rgba(56, 189, 248, 0.8)',
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
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
        textAlign: 'center',
        width: '100%',
        fontSize: '0.95rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        WebkitBackdropFilter: 'blur(8px)'
      },
      // Mobile styles
      mobileRoomCard: {
        padding: '1.2rem'
      },
      mobileImage: {
        height: '160px'
      },
      mobileTitle: {
        fontSize: '1.2rem'
      },
      // Small mobile styles
      smallMobileRoomCard: {
        padding: '1rem'
      },
      smallMobileImage: {
        height: '140px'
      },
      smallMobileTitle: {
        fontSize: '1.1rem'
      },
      smallMobileLabel: {
        fontSize: '0.85rem'
      },
      smallMobileInput: {
        fontSize: '0.9rem',
        padding: '0.6rem 0.8rem'
      },
      smallMobileCheckboxLabel: {
        fontSize: '0.85rem'
      },
      smallMobileTotal: {
        fontSize: '1rem'
      },
      smallMobileButton: {
        fontSize: '0.9rem',
        padding: '0.6rem 1.2rem'
      },
      // Very small mobile styles
      verySmallMobileRoomCard: {
        padding: '0.8rem'
      },
      verySmallMobileImage: {
        height: '120px'
      },
      verySmallMobileTitle: {
        fontSize: '1rem'
      },
      verySmallMobileLabel: {
        fontSize: '0.8rem'
      },
      verySmallMobileInput: {
        fontSize: '0.85rem',
        padding: '0.5rem 0.7rem'
      },
      verySmallMobileCheckboxLabel: {
        fontSize: '0.8rem'
      },
      verySmallMobileTotal: {
        fontSize: '0.95rem'
      },
      verySmallMobileButton: {
        fontSize: '0.85rem',
        padding: '0.5rem 1rem'
      }
    };
    
    // Get responsive styles
    const getResponsiveStyle = (baseStyle, mobileStyle, smallMobileStyle, verySmallMobileStyle) => {
      if (isVerySmallMobile && verySmallMobileStyle) return { ...baseStyle, ...verySmallMobileStyle };
      if (isSmallMobile && smallMobileStyle) return { ...baseStyle, ...smallMobileStyle };
      if (isMobile && mobileStyle) return { ...baseStyle, ...mobileStyle };
      return baseStyle;
    };
    
    return (
      <div 
        style={{
          ...getResponsiveStyle(
            glassyStyle.roomCard,
            glassyStyle.mobileRoomCard,
            glassyStyle.smallMobileRoomCard,
            glassyStyle.verySmallMobileRoomCard
          ),
          ...(isHovered && glassyStyle.roomCardHover)
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isNew && <div style={glassyStyle.newBadge}>NEW</div>}
        <img 
          src={image} 
          alt={title} 
          style={getResponsiveStyle(
            glassyStyle.image,
            glassyStyle.mobileImage,
            glassyStyle.smallMobileImage,
            glassyStyle.verySmallMobileImage
          )} 
        />
        <h3 style={getResponsiveStyle(
          glassyStyle.title,
          glassyStyle.mobileTitle,
          glassyStyle.smallMobileTitle,
          glassyStyle.verySmallMobileTitle
        )}>{title}</h3>
        {type !== 'conference' ? (
          <>
            <label style={getResponsiveStyle(
              glassyStyle.label,
              null,
              glassyStyle.smallMobileLabel,
              glassyStyle.verySmallMobileLabel
            )}>Check-In Date:</label>
            <DatePicker 
              selected={checkIn} 
              onChange={setCheckIn}
              className="date-picker"
              style={getResponsiveStyle(
                glassyStyle.input,
                null,
                glassyStyle.smallMobileInput,
                glassyStyle.verySmallMobileInput
              )}
            />
            <label style={getResponsiveStyle(
              glassyStyle.label,
              null,
              glassyStyle.smallMobileLabel,
              glassyStyle.verySmallMobileLabel
            )}>Check-Out Date:</label>
            <DatePicker 
              selected={checkOut} 
              onChange={setCheckOut}
              className="date-picker"
              style={getResponsiveStyle(
                glassyStyle.input,
                null,
                glassyStyle.smallMobileInput,
                glassyStyle.verySmallMobileInput
              )}
            />
            <label style={getResponsiveStyle(
              glassyStyle.label,
              null,
              glassyStyle.smallMobileLabel,
              glassyStyle.verySmallMobileLabel
            )}>Guests:</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              style={getResponsiveStyle(
                glassyStyle.input,
                null,
                glassyStyle.smallMobileInput,
                glassyStyle.verySmallMobileInput
              )}
            />
            <label style={getResponsiveStyle(
              glassyStyle.checkboxLabel,
              null,
              glassyStyle.smallMobileCheckboxLabel,
              glassyStyle.verySmallMobileCheckboxLabel
            )}>
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
            <label style={getResponsiveStyle(
              glassyStyle.label,
              null,
              glassyStyle.smallMobileLabel,
              glassyStyle.verySmallMobileLabel
            )}>Booking Date:</label>
            <DatePicker 
              selected={checkIn} 
              onChange={setCheckIn}
              className="date-picker"
              style={getResponsiveStyle(
                glassyStyle.input,
                null,
                glassyStyle.smallMobileInput,
                glassyStyle.verySmallMobileInput
              )}
            />
            <label style={getResponsiveStyle(
              glassyStyle.label,
              null,
              glassyStyle.smallMobileLabel,
              glassyStyle.verySmallMobileLabel
            )}>Session:</label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              style={getResponsiveStyle(
                glassyStyle.input,
                null,
                glassyStyle.smallMobileInput,
                glassyStyle.verySmallMobileInput
              )}
            >
              <option value="half">Half Day – KES 2,000</option>
              <option value="full">Full Day – KES 5,000</option>
            </select>
          </>
        )}
        <p style={getResponsiveStyle(
          glassyStyle.total,
          null,
          glassyStyle.smallMobileTotal,
          glassyStyle.verySmallMobileTotal
        )}>Total: KES {total}</p>
        <a
          href={`https://wa.me/254748778388?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          style={getResponsiveStyle(
            glassyStyle.button,
            null,
            glassyStyle.smallMobileButton,
            glassyStyle.verySmallMobileButton
          )}
        >
          🛌 Reserve Now (Pay on Arrival)
        </a>
        <MpesaPayment amount={total} item={title} />
      </div>
    );
  };
  
  // Glassy styles
  const glassyStyle = {
    body: {
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#e2e8f0',
      fontFamily: 'Inter, system-ui, sans-serif',
      minHeight: '100vh',
      overflowX: 'hidden'
    },
    section: {
      maxWidth: '1000px',
      margin: 'auto',
      padding: '3rem 1.5rem',
      animation: 'fadeInUp 0.8s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    heading: {
      color: '#e2e8f0',
      fontSize: '2.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    lastUpdated: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      background: 'rgba(255, 255, 255, 0.08)',
      padding: '6px 12px',
      borderRadius: '20px',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    specialBanner: {
      background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.8), rgba(139, 92, 246, 0.8))',
      color: '#0f172a',
      padding: '10px 18px',
      borderRadius: '20px',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: '1.5rem',
      animation: 'shimmer 3s infinite',
      backgroundSize: '200px 100%',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    description: {
      marginBottom: '1.5rem',
      lineHeight: '1.6',
      color: '#cbd5e1',
      fontSize: '1rem'
    },
    paymentInfo: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      padding: '1.5rem',
      borderRadius: '16px',
      marginBottom: '2.5rem',
      color: '#e2e8f0',
      fontSize: '0.95rem',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
      WebkitBackdropFilter: 'blur(12px)'
    },
    paymentInfoHeading: {
      color: '#38bdf8',
      fontSize: '1.1rem'
    },
    paymentInfoText: {
      color: '#38bdf8'
    },
    mediaScroll: {
      display: 'flex',
      overflowX: 'auto',
      gap: '1.2rem',
      paddingBottom: '1.5rem',
      scrollSnapType: 'x mandatory',
      marginBottom: '2.5rem',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(56, 189, 248, 0.3) transparent'
    },
    mediaItem: {
      flex: '0 0 auto',
      width: '240px',
      scrollSnapAlign: 'start',
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    mediaItemImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover'
    },
    newBadge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#38bdf8',
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: '600',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    roomGrid: {
      display: 'grid',
      gap: '2.5rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    },
    // Mobile styles
    mobileSection: {
      padding: '2rem 1rem'
    },
    mobileHeading: {
      fontSize: '1.8rem'
    },
    mobileMediaScroll: {
      gap: '0.8rem'
    },
    mobileMediaItem: {
      width: '180px'
    },
    mobileRoomGrid: {
      gap: '1.8rem'
    },
    // Small mobile styles
    smallMobileSection: {
      padding: '1.5rem 0.8rem'
    },
    smallMobileHeading: {
      fontSize: '1.6rem'
    },
    smallMobileDescription: {
      fontSize: '0.95rem'
    },
    smallMobilePaymentInfo: {
      padding: '1.2rem',
      fontSize: '0.9rem'
    },
    smallMobilePaymentInfoHeading: {
      fontSize: '1rem'
    },
    smallMobileMediaScroll: {
      gap: '0.7rem'
    },
    smallMobileMediaItem: {
      width: '160px'
    },
    smallMobileMediaItemImage: {
      height: '160px'
    },
    smallMobileRoomGrid: {
      gap: '1.5rem'
    },
    // Very small mobile styles
    verySmallMobileSection: {
      padding: '1.2rem 0.6rem'
    },
    verySmallMobileHeading: {
      fontSize: '1.4rem'
    },
    verySmallMobileDescription: {
      fontSize: '0.9rem'
    },
    verySmallMobilePaymentInfo: {
      padding: '1rem',
      fontSize: '0.85rem'
    },
    verySmallMobilePaymentInfoHeading: {
      fontSize: '0.95rem'
    },
    verySmallMobileMediaScroll: {
      gap: '0.6rem'
    },
    verySmallMobileMediaItem: {
      width: '140px'
    },
    verySmallMobileMediaItemImage: {
      height: '140px'
    },
    verySmallMobileRoomGrid: {
      gap: '1.2rem'
    }
  };
  
  // Get responsive styles
  const getResponsiveStyle = (baseStyle, mobileStyle, smallMobileStyle, verySmallMobileStyle) => {
    if (isVerySmallMobile && verySmallMobileStyle) return { ...baseStyle, ...verySmallMobileStyle };
    if (isSmallMobile && smallMobileStyle) return { ...baseStyle, ...smallMobileStyle };
    if (isMobile && mobileStyle) return { ...baseStyle, ...mobileStyle };
    return baseStyle;
  };
  
  return (
    <div style={glassyStyle.body}>
      <style>
        {`
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
            background-color: rgba(255, 255, 255, 0.08) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: #e2e8f0 !important;
            backdrop-filter: blur(12px) !important;
            border-radius: 12px !important;
            WebkitBackdropFilter: blur(12px) !important;
          }
          .react-datepicker__header {
            background-color: rgba(255, 255, 255, 0.08) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
          }
          .react-datepicker__day--selected,
          .react-datepicker__day--keyboard-selected {
            background-color: #38bdf8 !important;
            color: #0f172a !important;
            border-radius: 50% !important;
          }
          .react-datepicker__day:hover {
            background-color: rgba(56, 189, 248, 0.3) !important;
            border-radius: 50% !important;
          }
        `}
      </style>
      
      <Navbar />
      <section style={getResponsiveStyle(
        glassyStyle.section,
        glassyStyle.mobileSection,
        glassyStyle.smallMobileSection,
        glassyStyle.verySmallMobileSection
      )}>
        <div style={glassyStyle.header}>
          <h2 style={getResponsiveStyle(
            glassyStyle.heading,
            glassyStyle.mobileHeading,
            glassyStyle.smallMobileHeading,
            glassyStyle.verySmallMobileHeading
          )}>
            🏨 Settlers Inn Booking
          </h2>
          <div style={glassyStyle.lastUpdated}>
            {lastUpdated}
          </div>
        </div>
        
        <div className="special-banner" style={glassyStyle.specialBanner}>
          🌟 {dailySpecial} 🌟
        </div>
        
        <p style={getResponsiveStyle(
          glassyStyle.description,
          null,
          glassyStyle.smallMobileDescription,
          glassyStyle.verySmallMobileDescription
        )}>
          You can book with M-PESA or choose to pay on arrival.
        </p>
        
        <div style={getResponsiveStyle(
          glassyStyle.paymentInfo,
          null,
          glassyStyle.smallMobilePaymentInfo,
          glassyStyle.verySmallMobilePaymentInfo
        )}>
          <strong style={getResponsiveStyle(
            glassyStyle.paymentInfoHeading,
            null,
            glassyStyle.smallMobilePaymentInfoHeading,
            glassyStyle.verySmallMobilePaymentInfoHeading
          )}>📱 How to Pay via M-PESA</strong><br />
          1. Go to <strong style={glassyStyle.paymentInfoText}>Lipa na M-PESA</strong> → Paybill<br />
          2. Enter Paybill Number: <strong style={glassyStyle.paymentInfoText}>522533</strong><br />
          3. Account Number: <strong style={glassyStyle.paymentInfoText}>5936175</strong><br />
          4. Enter Amount<br />
          5. Enter your PIN and confirm<br /><br />
          ✅ Then enter the M-PESA Code below to confirm, or skip to pay later.
        </div>
        
        <div className="media-scroll" style={getResponsiveStyle(
          glassyStyle.mediaScroll,
          glassyStyle.mobileMediaScroll,
          glassyStyle.smallMobileMediaScroll,
          glassyStyle.verySmallMobileMediaScroll
        )}>
          {mediaItems.map((src, i) => {
            const isVideo = src.endsWith('.mp4');
            return (
              <div key={i} style={getResponsiveStyle(
                glassyStyle.mediaItem,
                glassyStyle.mobileMediaItem,
                glassyStyle.smallMobileMediaItem,
                glassyStyle.verySmallMobileMediaItem
              )}>
                {isVideo ? (
                  <video 
                    src={src} 
                    style={getResponsiveStyle(
                      glassyStyle.mediaItemImage,
                      null,
                      glassyStyle.smallMobileMediaItemImage,
                      glassyStyle.verySmallMobileMediaItemImage
                    )} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={src} 
                    alt={`media-${i}`} 
                    style={getResponsiveStyle(
                      glassyStyle.mediaItemImage,
                      null,
                      glassyStyle.smallMobileMediaItemImage,
                      glassyStyle.verySmallMobileMediaItemImage
                    )} 
                  />
                )}
                {i === 0 && (
                  <div style={glassyStyle.newBadge}>
                    NEW
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div style={getResponsiveStyle(
          glassyStyle.roomGrid,
          glassyStyle.mobileRoomGrid,
          glassyStyle.smallMobileRoomGrid,
          glassyStyle.verySmallMobileRoomGrid
        )}>
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
