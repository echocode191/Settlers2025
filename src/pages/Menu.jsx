import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Menu = () => {
  const [foodName, setFoodName] = useState('');
  const [jokeIndex, setJokeIndex] = useState(0);
  const [orderType, setOrderType] = useState('pickup');
  const [location, setLocation] = useState('');
  const [paymentOption, setPaymentOption] = useState('arrival');
  const [phone, setPhone] = useState('');
  const [dailySpecial, setDailySpecial] = useState("");
  const [newItems, setNewItems] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isVerySmallMobile, setIsVerySmallMobile] = useState(false);
  
  const foodMessages = [
    "Taste the authentic flavors of Kenya",
    "Fresh ingredients, delicious meals",
    "Where local cuisine meets comfort",
    "Savor every moment with our dishes",
    "Your perfect dining destination"
  ];
  
  useEffect(() => {
    // Initialize dynamic content
    const specials = [
      "Today's Special: Grilled Tilapia with Ugali - KES 700",
      "Chef's Recommendation: Beef Stew with Rice - KES 650",
      "New Item: Chicken Stir Fry - KES 800",
      "Weekend Deal: Nyama Choma Platter - KES 900"
    ];
    setDailySpecial(specials[Math.floor(Math.random() * specials.length)]);
    
    // Set new menu items
    setNewItems(["Chicken Stir Fry", "Grilled Tilapia", "Beef Stew"]);
    
    // Set visitor count
    setVisitorCount(Math.floor(Math.random() * 100) + 50);
    
    // Rotate messages
    const interval = setInterval(() => {
      setJokeIndex((prev) => (prev + 1) % foodMessages.length);
    }, 5000);
    
    // Check screen size for responsive design
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
      setIsVerySmallMobile(window.innerWidth <= 333);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  const sendOrder = (e) => {
    e.preventDefault();
    if (!foodName.trim()) return alert('Please enter your order.');
    if (orderType === 'delivery' && !location.trim()) return alert('Enter delivery location.');
    if (paymentOption === 'mpesa' && (!phone || phone.length < 10)) return alert('Enter a valid Mpesa phone number.');
    
    setIsSending(true);
    
    // Simulate sending delay
    setTimeout(() => {
      const message = `Hi Settlers Inn, I want to order: ${foodName}
Order Type: ${orderType === 'pickup' ? 'Pickup' : orderType === 'eat' ? 'Dine In' : 'Delivery'}
${orderType === 'delivery' ? `Location: ${location}` : ''}
Payment Method: ${paymentOption === 'arrival' ? 'Pay on Arrival' : `Mpesa (${phone})`}
${paymentOption === 'mpesa' ? 'Customer has paid. Please confirm.' : 'Customer will pay on delivery/pickup.'}
`;
      const url = `https://wa.me/254748778388?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      setIsSending(false);
    }, 1500);
  };
  
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };
  
  const categories = [
    {
      id: 'breakfast', title: 'Breakfast',
      items: [['Highland Breakfast (eggs, toast, sausage)', 'KES 500']]
    },
    {
      id: 'lunch', title: 'Lunch & Dinner',
      items: [
        ['Whole Fish', 'KES 700'], ['Broiler Chicken 1/4KG', 'KES 300'], ['Broiler Chicken 1/2KG', 'KES 600'],
        ['Kienyeji Chicken 1/4KG', 'KES 350'], ['Kienyeji Chicken 1/2', 'KES 700'],
        ['Mbuzi 1/4KG', 'KES 350'], ['Mbuzi 1/2KG', 'KES 700'],
        ['Ng`ombe 1/4KG', 'KES 300'], ['Ng`ombe 1/2KG', 'KES 600'],
        ['Pork 1/4KG', 'KES 350'], ['Pork 1/2KG', 'KES 700']
      ]
    },
    {
      id: 'dinner', title: 'Dinner Special',
      items: [['Chicken Stir Fry', 'KES 800', true]]  // New item
    },
    {
      id: 'matumbo', title: 'Matumbo Zone',
      items: [
        ['Matumbo Mbuzi 1/4KG', 'KES 300'], ['Matumbo Mbuzi 1/2KG', 'KES 600'],
        ['Matumbo Ng`ombe 1/4KG', 'KES 250'], ['Matumbo Ng`ombe 1/2KG', 'KES 500']
      ]
    },
    {
      id: 'sides', title: 'Side Orders',
      items: [
        ['White Ugali', 'KES 70'], ['Ugali Wimbi', 'KES 100'], ['Ugali Sorghum', 'KES 100'],
        ['White Rice', 'KES 150'], ['Stir Fried', 'KES 200'],
        ['Mboga Kienyeji', 'KES 100'], ['Sukuma wiki/Cabbage/spinach', 'KES 50'],
        ['Kachumbari', 'KES 100'], ['Beans Plain', 'KES 100'],
      ]
    },
    {
      id: 'soft', title: 'Soft Beverages',
      items: [
        ['Dasani 500ML', 'KES 50'], ['Dasani 1L', 'KES 100'],
        ['Plastic Soda 350ML', 'KES 50'], ['Plastic Soda 500ML', 'KES 80'],
        ['Plastic Soda 1.25ML', 'KES 180'], ['Plastic Soda 1L', 'KES 150'], ['Plastic Soda 2L', 'KES 250'],
        ['Bottled Soda 300ML', 'KES 60'], ['Minute Maid 400ML', 'KES 90'], ['Minute Maid 1L', 'KES 180'],
        ['Yoghurt 500ML', 'KES 130'], ['Yatta Juice 1L', 'KES 350'],
        ['Dawa (take away)', 'KES 130'], ['Monster', 'KES 250'], ['Redbull', 'KES 250'],
        ['Predator', 'KES 70'], ['Powerplay', 'KES 70'], ['Orchid Valley', 'KES 350'], ['Pep Juice', 'KES 100']
      ]
    },
    {
      id: 'cake', title: 'Cakes & Desserts',
      items: [['Vanilla 1KG', 'KES 1500'], ['Black Forest', 'KES 2000'], ['Marble 1KG', 'KES 2000'], ['Cake Slice', 'KES 150']]
    },
    {
      id: 'beer', title: 'Beer',
      items: [['Beer Cans', 'KES 350'], ['Bottled Beer', 'KES 300']]
    },
    {
      id: 'wine', title: 'Wines',
      items: [['Caprice', 'KES 1000'], ['Four Cousins', 'KES 1600'], ['4th Street', 'KES 1600']]
    },
  ];
  
  // Glassy styles
  const glassyStyle = {
    body: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#e2e8f0',
      minHeight: '100vh',
      paddingBottom: '5rem',
      overflowX: 'hidden'
    },
    section: {
      padding: '3rem 1.5rem',
      maxWidth: '1000px',
      margin: 'auto',
      animation: 'fadeInUp 0.8s ease',
    },
    orderBox: {
      background: 'rgba(255, 255, 255, 0.08)',
      padding: '2.5rem',
      borderRadius: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      textAlign: 'center',
      marginBottom: '3rem',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(16px)'
    },
    h2: {
      color: '#e2e8f0',
      fontSize: '2rem',
      marginBottom: '1rem',
      fontWeight: '600',
    },
    p: {
      color: '#38bdf8',
      marginBottom: '1.5rem',
      minHeight: '24px',
      fontWeight: '500',
      animation: 'subtlePulse 4s ease-in-out infinite',
      textAlign: 'center',
      fontSize: '1.1rem',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.2rem',
      justifyContent: 'center',
      marginTop: '1.5rem',
    },
    input: {
      padding: '0.8rem 1.2rem',
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      color: '#e2e8f0',
      minWidth: '220px',
      flex: '1',
      backdropFilter: 'blur(8px)',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s ease',
      WebkitBackdropFilter: 'blur(8px)'
    },
    button: {
      padding: '0.8rem 1.5rem',
      background: 'rgba(56, 189, 248, 0.8)',
      color: '#0f172a',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: '600',
      flexShrink: '0',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    quickAccess: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.8rem',
      justifyContent: 'center',
      marginBottom: '2.5rem',
    },
    quickButton: {
      background: 'rgba(255, 255, 255, 0.08)',
      color: '#e2e8f0',
      padding: '0.6rem 1.2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(8px)',
      fontWeight: '500',
      fontSize: '0.9rem',
      WebkitBackdropFilter: 'blur(8px)'
    },
    floatBtn: {
      position: 'fixed',
      bottom: 25,
      right: 20,
      background: 'rgba(37, 211, 102, 0.8)',
      color: 'white',
      fontSize: '1.5rem',
      padding: '0.8rem 0.9rem',
      borderRadius: '50%',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
      zIndex: 999,
      textDecoration: 'none',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    menuSection: {
      paddingTop: '1.5rem',
    },
    category: {
      marginBottom: '2.5rem',
      animation: 'fadeInUp 0.8s ease',
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '2rem',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(16px)'
    },
    categoryTitle: {
      color: '#38bdf8',
      borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
      paddingBottom: '0.6rem',
      marginBottom: '1.5rem',
      fontSize: '1.4rem',
      fontWeight: '600',
    },
    menuItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.8rem',
      padding: '0.6rem 0.2rem',
      borderBottom: '1px dashed rgba(255, 255, 255, 0.1)',
      fontSize: '1rem',
      position: 'relative',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '1.2rem',
      marginBottom: '1.5rem',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.3rem',
      color: '#38bdf8',
      fontWeight: '600',
    },
    statLabel: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      marginTop: '0.3rem',
    },
    radioLabel: {
      color: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.95rem',
    },
    radioInput: {
      marginRight: '0.5rem',
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
    // Mobile styles
    mobileSection: {
      padding: '2rem 1rem',
    },
    mobileOrderBox: {
      padding: '2rem',
      marginBottom: '2rem',
    },
    mobileH2: {
      fontSize: '1.8rem',
    },
    mobileP: {
      fontSize: '1rem',
    },
    mobileForm: {
      gap: '1rem',
    },
    mobileInput: {
      minWidth: '180px',
      fontSize: '0.95rem',
      padding: '0.7rem 1rem',
    },
    mobileButton: {
      fontSize: '0.9rem',
      padding: '0.7rem 1.2rem',
    },
    mobileQuickAccess: {
      gap: '0.6rem',
      marginBottom: '2rem',
    },
    mobileQuickButton: {
      fontSize: '0.85rem',
      padding: '0.5rem 1rem',
    },
    mobileFloatBtn: {
      bottom: 20,
      right: 15,
      fontSize: '1.3rem',
      padding: '0.7rem 0.8rem',
    },
    mobileCategory: {
      padding: '1.5rem',
      marginBottom: '2rem',
    },
    mobileCategoryTitle: {
      fontSize: '1.2rem',
    },
    mobileMenuItem: {
      fontSize: '0.95rem',
    },
    mobileStatsContainer: {
      padding: '1rem',
      marginBottom: '1.2rem',
    },
    mobileStatNumber: {
      fontSize: '1.2rem',
    },
    mobileStatLabel: {
      fontSize: '0.8rem',
    },
    mobileRadioLabel: {
      fontSize: '0.9rem',
    },
    // Small mobile styles
    smallMobileSection: {
      padding: '1.5rem 0.8rem',
    },
    smallMobileOrderBox: {
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    smallMobileH2: {
      fontSize: '1.6rem',
      marginBottom: '0.8rem',
    },
    smallMobileP: {
      fontSize: '0.95rem',
    },
    smallMobileForm: {
      gap: '0.8rem',
    },
    smallMobileInput: {
      minWidth: '160px',
      fontSize: '0.9rem',
      padding: '0.6rem 0.9rem',
    },
    smallMobileButton: {
      fontSize: '0.85rem',
      padding: '0.6rem 1rem',
    },
    smallMobileQuickAccess: {
      gap: '0.5rem',
      marginBottom: '1.5rem',
    },
    smallMobileQuickButton: {
      fontSize: '0.8rem',
      padding: '0.4rem 0.8rem',
    },
    smallMobileFloatBtn: {
      bottom: 15,
      right: 10,
      fontSize: '1.2rem',
      padding: '0.6rem 0.7rem',
    },
    smallMobileCategory: {
      padding: '1.2rem',
      marginBottom: '1.5rem',
    },
    smallMobileCategoryTitle: {
      fontSize: '1.1rem',
    },
    smallMobileMenuItem: {
      fontSize: '0.9rem',
    },
    smallMobileStatsContainer: {
      padding: '0.8rem',
      marginBottom: '1rem',
    },
    smallMobileStatNumber: {
      fontSize: '1.1rem',
    },
    smallMobileStatLabel: {
      fontSize: '0.75rem',
    },
    smallMobileRadioLabel: {
      fontSize: '0.85rem',
    },
    // Very small mobile styles
    verySmallMobileSection: {
      padding: '1.2rem 0.6rem',
    },
    verySmallMobileOrderBox: {
      padding: '1.2rem',
      marginBottom: '1.2rem',
    },
    verySmallMobileH2: {
      fontSize: '1.4rem',
      marginBottom: '0.6rem',
    },
    verySmallMobileP: {
      fontSize: '0.9rem',
    },
    verySmallMobileForm: {
      gap: '0.6rem',
    },
    verySmallMobileInput: {
      minWidth: '140px',
      fontSize: '0.85rem',
      padding: '0.5rem 0.8rem',
    },
    verySmallMobileButton: {
      fontSize: '0.8rem',
      padding: '0.5rem 0.9rem',
    },
    verySmallMobileQuickAccess: {
      gap: '0.4rem',
      marginBottom: '1.2rem',
    },
    verySmallMobileQuickButton: {
      fontSize: '0.75rem',
      padding: '0.4rem 0.7rem',
    },
    verySmallMobileFloatBtn: {
      bottom: 10,
      right: 10,
      fontSize: '1.1rem',
      padding: '0.5rem 0.6rem',
    },
    verySmallMobileCategory: {
      padding: '1rem',
      marginBottom: '1.2rem',
    },
    verySmallMobileCategoryTitle: {
      fontSize: '1rem',
    },
    verySmallMobileMenuItem: {
      fontSize: '0.85rem',
    },
    verySmallMobileStatsContainer: {
      padding: '0.6rem',
      marginBottom: '0.8rem',
    },
    verySmallMobileStatNumber: {
      fontSize: '1rem',
    },
    verySmallMobileStatLabel: {
      fontSize: '0.7rem',
    },
    verySmallMobileRadioLabel: {
      fontSize: '0.8rem',
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
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes subtlePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
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
        <div style={getResponsiveStyle(
          glassyStyle.orderBox,
          glassyStyle.mobileOrderBox,
          glassyStyle.smallMobileOrderBox,
          glassyStyle.verySmallMobileOrderBox
        )}>
          <h2 style={getResponsiveStyle(
            glassyStyle.h2,
            glassyStyle.mobileH2,
            glassyStyle.smallMobileH2,
            glassyStyle.verySmallMobileH2
          )}>Our Menu</h2>
          <p style={getResponsiveStyle(
            glassyStyle.p,
            glassyStyle.mobileP,
            glassyStyle.smallMobileP,
            glassyStyle.verySmallMobileP
          )}>{foodMessages[jokeIndex]}</p>
          
          <div style={glassyStyle.specialBanner}>
            🌟 {dailySpecial} 🌟
          </div>
          
          <div style={getResponsiveStyle(
            glassyStyle.statsContainer,
            glassyStyle.mobileStatsContainer,
            glassyStyle.smallMobileStatsContainer,
            glassyStyle.verySmallMobileStatsContainer
          )}>
            <div style={glassyStyle.statItem}>
              <div style={getResponsiveStyle(
                glassyStyle.statNumber,
                glassyStyle.mobileStatNumber,
                glassyStyle.smallMobileStatNumber,
                glassyStyle.verySmallMobileStatNumber
              )}>{visitorCount}+</div>
              <div style={getResponsiveStyle(
                glassyStyle.statLabel,
                glassyStyle.mobileStatLabel,
                glassyStyle.smallMobileStatLabel,
                glassyStyle.verySmallMobileStatLabel
              )}>Visitors Today</div>
            </div>
            <div style={glassyStyle.statItem}>
              <div style={getResponsiveStyle(
                glassyStyle.statNumber,
                glassyStyle.mobileStatNumber,
                glassyStyle.smallMobileStatNumber,
                glassyStyle.verySmallMobileStatNumber
              )}>{newItems.length}</div>
              <div style={getResponsiveStyle(
                glassyStyle.statLabel,
                glassyStyle.mobileStatLabel,
                glassyStyle.smallMobileStatLabel,
                glassyStyle.verySmallMobileStatLabel
              )}>New Items</div>
            </div>
          </div>
          
          <form onSubmit={sendOrder} style={getResponsiveStyle(
            glassyStyle.form,
            glassyStyle.mobileForm,
            glassyStyle.smallMobileForm,
            glassyStyle.verySmallMobileForm
          )}>
            <input
              type="text"
              placeholder="e.g. Ugali & Fish"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              style={getResponsiveStyle(
                glassyStyle.input,
                glassyStyle.mobileInput,
                glassyStyle.smallMobileInput,
                glassyStyle.verySmallMobileInput
              )}
            />
            {/* Order Type */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['pickup', 'eat', 'delivery'].map((type) => (
                <label key={type} style={getResponsiveStyle(
                  glassyStyle.radioLabel,
                  glassyStyle.mobileRadioLabel,
                  glassyStyle.smallMobileRadioLabel,
                  glassyStyle.verySmallMobileRadioLabel
                )}>
                  <input
                    type="radio"
                    value={type}
                    checked={orderType === type}
                    onChange={(e) => setOrderType(e.target.value)}
                    style={glassyStyle.radioInput}
                  />
                  {type === 'pickup' ? 'Pickup' : type === 'eat' ? 'Dine In' : 'Delivery'}
                </label>
              ))}
            </div>
            {orderType === 'delivery' && (
              <input
                type="text"
                placeholder="Delivery location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                style={getResponsiveStyle(
                  glassyStyle.input,
                  glassyStyle.mobileInput,
                  glassyStyle.smallMobileInput,
                  glassyStyle.verySmallMobileInput
                )}
              />
            )}
            {/* Payment */}
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
              <label style={getResponsiveStyle(
                glassyStyle.radioLabel,
                glassyStyle.mobileRadioLabel,
                glassyStyle.smallMobileRadioLabel,
                glassyStyle.verySmallMobileRadioLabel
              )}>
                <input
                  type="radio"
                  value="arrival"
                  checked={paymentOption === 'arrival'}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  style={glassyStyle.radioInput}
                />
                Pay on Arrival
              </label>
              <label style={getResponsiveStyle(
                glassyStyle.radioLabel,
                glassyStyle.mobileRadioLabel,
                glassyStyle.smallMobileRadioLabel,
                glassyStyle.verySmallMobileRadioLabel
              )}>
                <input
                  type="radio"
                  value="mpesa"
                  checked={paymentOption === 'mpesa'}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  style={glassyStyle.radioInput}
                />
                Pay with Mpesa
              </label>
            </div>
            {paymentOption === 'mpesa' && (
              <input
                type="tel"
                placeholder="Mpesa Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={getResponsiveStyle(
                  glassyStyle.input,
                  glassyStyle.mobileInput,
                  glassyStyle.smallMobileInput,
                  glassyStyle.verySmallMobileInput
                )}
                required
              />
            )}
            <button 
              type="submit" 
              style={{
                ...getResponsiveStyle(
                  glassyStyle.button,
                  glassyStyle.mobileButton,
                  glassyStyle.smallMobileButton,
                  glassyStyle.verySmallMobileButton
                ),
                background: isSending ? 'rgba(100, 116, 139, 0.8)' : 'rgba(56, 189, 248, 0.8)',
                cursor: isSending ? 'not-allowed' : 'pointer',
              }}
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'WhatsApp Us'}
            </button>
          </form>
        </div>
        
        <div style={getResponsiveStyle(
          glassyStyle.quickAccess,
          glassyStyle.mobileQuickAccess,
          glassyStyle.smallMobileQuickAccess,
          glassyStyle.verySmallMobileQuickAccess
        )}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => scrollToSection(cat.id)} style={getResponsiveStyle(
              glassyStyle.quickButton,
              glassyStyle.mobileQuickButton,
              glassyStyle.smallMobileQuickButton,
              glassyStyle.verySmallMobileQuickButton
            )}>
              {cat.title}
            </button>
          ))}
        </div>
        
        <div style={glassyStyle.menuSection}>
          <h2 style={getResponsiveStyle(
            glassyStyle.h2,
            glassyStyle.mobileH2,
            glassyStyle.smallMobileH2,
            glassyStyle.verySmallMobileH2
          )}>Menu Categories</h2>
          {categories.map((cat, i) => (
            <div key={i} id={cat.id} style={getResponsiveStyle(
              glassyStyle.category,
              glassyStyle.mobileCategory,
              glassyStyle.smallMobileCategory,
              glassyStyle.verySmallMobileCategory
            )}>
              {newItems.includes(cat.items[0]?.[0]) && <div style={glassyStyle.newBadge}>NEW</div>}
              <h3 style={getResponsiveStyle(
                glassyStyle.categoryTitle,
                glassyStyle.mobileCategoryTitle,
                glassyStyle.smallMobileCategoryTitle,
                glassyStyle.verySmallMobileCategoryTitle
              )}>{cat.title}</h3>
              {cat.items.map(([name, price, isNew], j) => (
                <div key={j} style={getResponsiveStyle(
                  glassyStyle.menuItem,
                  glassyStyle.mobileMenuItem,
                  glassyStyle.smallMobileMenuItem,
                  glassyStyle.verySmallMobileMenuItem
                )}>
                  <p>{name}</p>
                  <span>{price}</span>
                  {isNew && <div style={glassyStyle.newBadge}>NEW</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <a
        href="https://wa.me/254748778388?text=Hi%20Settlers%20Inn%2C%20I%20want%20to%20order%20food"
        target="_blank"
        rel="noopener noreferrer"
        title="Order on WhatsApp"
        style={getResponsiveStyle(
          glassyStyle.floatBtn,
          glassyStyle.mobileFloatBtn,
          glassyStyle.smallMobileFloatBtn,
          glassyStyle.verySmallMobileFloatBtn
        )}
      >
        💬
      </a>
      <Footer />
    </div>
  );
};

export default Menu;
