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
  
  const foodJokes = [
    "😋 Eat like royalty, pay like a villager.",
    "🔥 Our nyama choma speaks fluent Swahili.",
    "🍽️ Forks up! Time to offend your diet.",
    "☕ Our tea sees your soul and hugs it.",
    "🤣 Calories don't count at Settlers Inn — trust us.",
    "🍗 Chicken that makes you forget your ex.",
    "🥘 Our chapatis are soft like your crush's hands.",
    "💥 Hunger meets its match here.",
    "🐐 Goat meat so good, it might call you back.",
    "🎶 Your stomach's playlist: 'Ugali Anthem Remix'",
    "🥤 Soda colder than your DMs.",
    "🚫 Diet starts after this plate... maybe.",
    "🍛 Food hot enough to slap your worries away.",
    "😎 This plate? Certified street legend.",
    "🔥 Mbuzi that burns into your memory.",
    "🍲 Soup that makes you believe in healing.",
    "💬 You came for food, stayed for vibes.",
    "🍖 Our grill guy has beef with bland meat.",
    "🌶️ Flavor turned up like a Gen Z playlist.",
    "📸 Too tasty for just one photo.",
    "🎯 No disappointments — only cravings hit.",
    "📦 Takeaway that feels like a gift.",
    "🎉 You + our plate = the best duo since Ugali & Sukuma.",
    "🍞 Breakfast? More like Bestfast.",
    "🫶 We season our food with love and legends.",
    "🎬 Chapati: soft. Mbuzi: wild. You: obsessed.",
    "🍷 Wine so fine, it whispers sweet nothings.",
    "🤤 Tastes like home but cooked with ambition.",
    "🌟 Meals that make your phone forget Instagram.",
    "💡 Idea: Eat now. Regret never.",
    "📞 Your stomach called. It said, 'Settlers, now!'",
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
    
    // Rotate jokes
    const interval = setInterval(() => {
      setJokeIndex((prev) => (prev + 1) % foodJokes.length);
    }, 4000);
    
    // Animation styles
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes typewriter { from { width: 0; } to { width: 100%; } }
      @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
      @keyframes glow { 0% { text-shadow: 0 0 5px #9fef00; } 50% { text-shadow: 0 0 15px #9fef00; } 100% { text-shadow: 0 0 5px #9fef00; } }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
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
    `;
    document.head.appendChild(style);
    
    return () => clearInterval(interval);
  }, []);
  
  const sendOrder = (e) => {
    e.preventDefault();
    if (!foodName.trim()) return alert('Please enter your order.');
    if (orderType === 'delivery' && !location.trim()) return alert('Enter delivery location.');
    if (paymentOption === 'mpesa' && (!phone || phone.length < 10)) return alert('Enter a valid Mpesa phone number.');
    
    setIsSending(true);
    
    // Simulate sending delay
    setTimeout(() => {
      const message = `Hi Settlers Inn 👋, I want to order: ${foodName}
Order Type: ${orderType === 'pickup' ? '🛍 Pickup' : orderType === 'eat' ? '🍽 Eat Here' : '🛵 Delivery'}
${orderType === 'delivery' ? `Location: ${location}` : ''}
Payment Method: ${paymentOption === 'arrival' ? '💰 Pay on Arrival' : `📲 Mpesa (${phone})`}
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
      id: 'breakfast', title: '🌅 Breakfast',
      items: [['Highland Breakfast (eggs, toast, sausage)', 'KES 500']]
    },
    {
      id: 'lunch', title: '🍛 Lunch & Dinner',
      items: [
        ['Whole Fish', 'KES 700'], ['Broiler Chicken 1/4KG', 'KES 300'], ['Broiler Chicken 1/2KG', 'KES 600'],
        ['Kienyeji Chicken 1/4KG', 'KES 350'], ['Kienyeji Chicken 1/2', 'KES 700'],
        ['Mbuzi 1/4KG', 'KES 350'], ['Mbuzi 1/2KG', 'KES 700'],
        ['Ng`ombe 1/4KG', 'KES 300'], ['Ng`ombe 1/2KG', 'KES 600'],
        ['Pork 1/4KG', 'KES 350'], ['Pork 1/2KG', 'KES 700']
      ]
    },
    {
      id: 'dinner', title: '🌇 Dinner Special',
      items: [['Chicken Stir Fry', 'KES 800', true]]  // New item
    },
    {
      id: 'matumbo', title: '🥠 Matumbo Zone',
      items: [
        ['Matumbo Mbuzi 1/4KG', 'KES 300'], ['Matumbo Mbuzi 1/2KG', 'KES 600'],
        ['Matumbo Ng`ombe 1/4KG', 'KES 250'], ['Matumbo Ng`ombe 1/2KG', 'KES 500']
      ]
    },
    {
      id: 'sides', title: '🍽️ Side Orders',
      items: [
        ['White Ugali', 'KES 70'], ['Ugali Wimbi', 'KES 100'], ['Ugali Sorghum', 'KES 100'],
        ['White Rice', 'KES 150'], ['Stir Fried', 'KES 200'],
        ['Mboga Kienyeji', 'KES 100'], ['Sukuma wiki/Cabbage/spinach', 'KES 50'],
        ['Kachumbari', 'KES 100'], ['Beans Plain', 'KES 100'],
      ]
    },
    {
      id: 'soft', title: '🍹 Soft Beverages',
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
      id: 'cake', title: '🍰 Cakes & Desserts',
      items: [['Vanilla 1KG', 'KES 1500'], ['Black Forest', 'KES 2000'], ['Marble 1KG', 'KES 2000'], ['Cake Slice', 'KES 150']]
    },
    {
      id: 'beer', title: '🍺 Beer',
      items: [['Beer Cans', 'KES 350'], ['Bottled Beer', 'KES 300']]
    },
    {
      id: 'wine', title: '🍷 Wines',
      items: [['Caprice', 'KES 1000'], ['Four Cousins', 'KES 1600'], ['4th Street', 'KES 1600']]
    },
  ];

  const styles = {
    body: {
      fontFamily: "'Fira Code', monospace",
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      minHeight: '100vh',
      paddingBottom: '5rem',
    },
    section: {
      padding: '2rem 1rem',
      maxWidth: '900px',
      margin: 'auto',
      animation: 'fadeIn 1s ease',
    },
    orderBox: {
      background: '#161b22',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 0 15px rgba(88,166,255,0.1)',
      textAlign: 'center',
      marginBottom: '3rem',
    },
    h2: {
      color: '#9fef00',
      fontSize: '1.5rem',
      marginBottom: '0.6rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      animation: 'typewriter 3s steps(40, end) 1 normal both',
    },
    p: {
      color: '#d0ff87',
      marginBottom: '1rem',
      minHeight: '24px',
      fontWeight: 'bold',
      animation: 'glow 3s ease-in-out infinite, pulse 3s ease-in-out infinite',
      textAlign: 'center',
      fontSize: '1rem',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      justifyContent: 'center',
      marginTop: '1rem',
    },
    input: {
      padding: '0.6rem 1rem',
      background: '#0d1117',
      border: '1px solid #30363d',
      borderRadius: '8px',
      color: '#c9d1d9',
      minWidth: '220px',
      flex: '1',
    },
    button: {
      padding: '0.6rem 1.2rem',
      background: '#9fef00',
      color: '#0d1117',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      flexShrink: '0',
      transition: 'all 0.2s',
    },
    quickAccess: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      justifyContent: 'center',
      marginBottom: '2rem',
      fontSize: '0.85rem',
    },
    quickButton: {
      background: '#21262d',
      color: '#9fef00',
      padding: '0.4rem 0.8rem',
      border: '1px solid #30363d',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    floatBtn: {
      position: 'fixed',
      bottom: 25,
      right: 20,
      background: '#25D366',
      color: 'white',
      fontSize: '1.5rem',
      padding: '0.7rem 0.85rem',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      zIndex: 999,
      textDecoration: 'none',
    },
    menuSection: {
      paddingTop: '1rem',
    },
    category: {
      marginBottom: '2.5rem',
      animation: 'fadeInUp 0.8s ease',
      position: 'relative',
    },
    categoryTitle: {
      color: '#58a6ff',
      borderBottom: '1px solid #30363d',
      paddingBottom: '0.4rem',
      marginBottom: '1rem',
      fontSize: '1.2rem',
    },
    menuItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.7rem',
      padding: '0.4rem 0.2rem',
      borderBottom: '1px dashed #30363d',
      fontSize: '0.95rem',
      position: 'relative',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      background: 'rgba(22, 27, 34, 0.5)',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.2rem',
      color: '#9fef00',
      fontWeight: 'bold',
    },
    statLabel: {
      fontSize: '0.8rem',
      color: '#8b949e',
    },
  };

  return (
    <div style={styles.body}>
      <Navbar />
      <section style={styles.section}>
        <div style={styles.orderBox}>
          <h2 style={styles.h2}>🍛 Welcome to Our Delicious World</h2>
          <p style={styles.p}>{foodJokes[jokeIndex]}</p>
          
          <div className="special-banner">
            🌟 {dailySpecial} 🌟
          </div>
          
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{visitorCount}+</div>
              <div style={styles.statLabel}>Hungry Visitors</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{newItems.length}</div>
              <div style={styles.statLabel}>New Items</div>
            </div>
          </div>
          
          <form onSubmit={sendOrder} style={styles.form}>
            <input
              type="text"
              placeholder="e.g. Ugali & Fish"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              style={styles.input}
            />
            {/* Order Type */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['pickup', 'eat', 'delivery'].map((type) => (
                <label key={type} style={{ color: '#c9d1d9', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <input
                    type="radio"
                    value={type}
                    checked={orderType === type}
                    onChange={(e) => setOrderType(e.target.value)}
                  />
                  {type === 'pickup' ? '🛍 Pickup' : type === 'eat' ? '🍽 Eat Here' : '🛵 Delivery'}
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
                style={styles.input}
              />
            )}
            {/* Payment */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <label style={{ color: '#c9d1d9' }}>
                <input
                  type="radio"
                  value="arrival"
                  checked={paymentOption === 'arrival'}
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                💰 Pay on Arrival
              </label>
              <label style={{ color: '#c9d1d9' }}>
                <input
                  type="radio"
                  value="mpesa"
                  checked={paymentOption === 'mpesa'}
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                📲 Pay with Mpesa
              </label>
            </div>
            {paymentOption === 'mpesa' && (
              <input
                type="tel"
                placeholder="Mpesa Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
                required
              />
            )}
            <button 
              type="submit" 
              style={{
                ...styles.button,
                background: isSending ? '#555' : '#9fef00',
                cursor: isSending ? 'not-allowed' : 'pointer',
              }}
              disabled={isSending}
            >
              {isSending ? 'Sending...' : '📲 WhatsApp Us'}
            </button>
          </form>
        </div>
        
        <div style={styles.quickAccess}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => scrollToSection(cat.id)} style={styles.quickButton}>
              {cat.title}
            </button>
          ))}
        </div>
        
        <div style={styles.menuSection}>
          <h2 style={styles.h2}>🍽️ Our Menu</h2>
          {categories.map((cat, i) => (
            <div key={i} id={cat.id} style={styles.category}>
              {newItems.includes(cat.items[0]?.[0]) && <div className="new-badge">NEW</div>}
              <h3 style={styles.categoryTitle}>{cat.title}</h3>
              {cat.items.map(([name, price, isNew], j) => (
                <div key={j} style={styles.menuItem}>
                  <p>{name}</p>
                  <span>{price}</span>
                  {isNew && <div className="new-badge">NEW</div>}
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
        style={styles.floatBtn}
      >
        💬
      </a>
      <Footer />
    </div>
  );
};

export default Menu;