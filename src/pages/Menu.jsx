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
  
  return (
    <div className="menu-container">
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
          
          .menu-container {
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
            padding: 2rem 1rem;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
          }
          
          /* Order Form Section */
          .order-section {
            padding: 2rem 1rem;
            max-width: 800px;
            margin: 0 auto 3rem;
          }
          
          .order-box {
            padding: 2rem;
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .section-title {
            font-size: 2.2rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
          }
          
          .food-message {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            font-weight: 500;
            animation: subtlePulse 4s ease-in-out infinite;
          }
          
          .special-banner {
            display: inline-block;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            color: white;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 600;
            margin-bottom: 1.5rem;
            font-size: 1rem;
            box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
          }
          
          .stats-container {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
          }
          
          .stat-item {
            text-align: center;
            padding: 1rem;
            min-width: 120px;
          }
          
          .stat-number {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--highlight);
          }
          
          .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
            margin-top: 0.5rem;
          }
          
          /* Form Styles */
          .order-form {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            margin-top: 1.5rem;
          }
          
          .form-input {
            padding: 12px 16px;
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            color: var(--text);
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
          }
          
          .form-input:focus {
            border-color: var(--highlight);
            box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.3);
          }
          
          .radio-group {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .radio-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            padding: 8px 12px;
            border-radius: 8px;
            transition: background 0.3s ease;
          }
          
          .radio-label:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          
          .submit-button {
            padding: 14px 24px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
          }
          
          .submit-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(79, 172, 254, 0.6);
          }
          
          .submit-button:disabled {
            background: rgba(100, 116, 139, 0.8);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          
          /* Quick Access */
          .quick-access {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 3rem;
          }
          
          .quick-button {
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
          }
          
          .quick-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(79, 172, 254, 0.4);
          }
          
          /* Menu Categories */
          .menu-categories {
            max-width: 1000px;
            margin: 0 auto;
          }
          
          .category {
            margin-bottom: 2.5rem;
            position: relative;
            padding: 2rem;
          }
          
          .category-title {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.8rem;
            border-bottom: 2px solid var(--highlight);
            font-weight: 600;
          }
          
          .menu-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0.5rem;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
            font-size: 1rem;
            position: relative;
          }
          
          .menu-item:last-child {
            border-bottom: none;
          }
          
          .menu-item-name {
            flex: 1;
          }
          
          .menu-item-price {
            font-weight: 600;
            color: var(--highlight);
            margin-left: 1rem;
          }
          
          .order-button {
            margin-left: 1rem;
            padding: 6px 12px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border: none;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
          }
          
          .order-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(79, 172, 254, 0.4);
          }
          
          .new-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: linear-gradient(45deg, #ff416c, #ff4b2b);
            color: white;
            font-size: 0.7rem;
            padding: 3px 8px;
            border-radius: 12px;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(255, 65, 108, 0.4);
            animation: subtlePulse 2s infinite;
          }
          
          /* WhatsApp Float Button */
          .whatsapp-float {
            position: fixed;
            bottom: 25px;
            right: 25px;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: linear-gradient(45deg, #25D366, #128C7E);
            color: white;
            font-size: 1.8rem;
            text-decoration: none;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            z-index: 100;
            transition: all 0.3s ease;
          }
          
          .whatsapp-float:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(37, 211, 102, 0.5);
          }
          
          /* Animations */
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes subtlePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          /* Responsive Styles */
          @media (max-width: 768px) {
            .section {
              padding: 1.5rem 1rem;
            }
            
            .order-section {
              padding: 1.5rem 1rem;
              margin-bottom: 2rem;
            }
            
            .order-box {
              padding: 1.5rem;
            }
            
            .section-title {
              font-size: 1.8rem;
            }
            
            .food-message {
              font-size: 1rem;
            }
            
            .stats-container {
              gap: 1rem;
            }
            
            .stat-item {
              min-width: 100px;
              padding: 0.8rem;
            }
            
            .stat-number {
              font-size: 1.5rem;
            }
            
            .form-input {
              padding: 10px 14px;
              font-size: 0.95rem;
            }
            
            .radio-group {
              gap: 1rem;
            }
            
            .radio-label {
              font-size: 0.9rem;
            }
            
            .submit-button {
              padding: 12px 20px;
              font-size: 0.95rem;
            }
            
            .quick-access {
              gap: 0.8rem;
              margin-bottom: 2rem;
            }
            
            .quick-button {
              padding: 8px 16px;
              font-size: 0.85rem;
            }
            
            .category {
              padding: 1.5rem;
              margin-bottom: 2rem;
            }
            
            .category-title {
              font-size: 1.5rem;
            }
            
            .menu-item {
              font-size: 0.95rem;
              padding: 0.8rem 0.5rem;
            }
            
            .order-button {
              padding: 5px 10px;
              font-size: 0.8rem;
            }
            
            .whatsapp-float {
              width: 55px;
              height: 55px;
              font-size: 1.6rem;
              bottom: 20px;
              right: 20px;
            }
          }
          
          @media (max-width: 480px) {
            .section {
              padding: 1.2rem 0.8rem;
            }
            
            .order-section {
              padding: 1.2rem 0.8rem;
            }
            
            .order-box {
              padding: 1.2rem;
            }
            
            .section-title {
              font-size: 1.6rem;
              margin-bottom: 1rem;
            }
            
            .food-message {
              font-size: 0.95rem;
            }
            
            .stats-container {
              gap: 0.8rem;
            }
            
            .stat-item {
              min-width: 80px;
              padding: 0.6rem;
            }
            
            .stat-number {
              font-size: 1.3rem;
            }
            
            .form-input {
              padding: 8px 12px;
              font-size: 0.9rem;
            }
            
            .radio-group {
              flex-direction: column;
              gap: 0.5rem;
              align-items: flex-start;
            }
            
            .submit-button {
              padding: 10px 16px;
              font-size: 0.9rem;
            }
            
            .quick-access {
              gap: 0.6rem;
              margin-bottom: 1.5rem;
            }
            
            .quick-button {
              padding: 6px 12px;
              font-size: 0.8rem;
            }
            
            .category {
              padding: 1.2rem;
              margin-bottom: 1.5rem;
            }
            
            .category-title {
              font-size: 1.3rem;
            }
            
            .menu-item {
              flex-direction: column;
              align-items: flex-start;
              font-size: 0.9rem;
              padding: 0.8rem 0.5rem;
              gap: 0.5rem;
            }
            
            .menu-item-price {
              margin-left: 0;
            }
            
            .order-button {
              align-self: flex-end;
              margin-top: 0.5rem;
            }
            
            .whatsapp-float {
              width: 50px;
              height: 50px;
              font-size: 1.4rem;
              bottom: 15px;
              right: 15px;
            }
          }
          
          @media (max-width: 333px) {
            .section-title {
              font-size: 1.4rem;
            }
            
            .food-message {
              font-size: 0.9rem;
            }
            
            .form-input {
              padding: 8px 10px;
              font-size: 0.85rem;
            }
            
            .submit-button {
              padding: 8px 14px;
              font-size: 0.85rem;
            }
            
            .quick-button {
              padding: 5px 10px;
              font-size: 0.75rem;
            }
            
            .category-title {
              font-size: 1.2rem;
            }
            
            .menu-item {
              font-size: 0.85rem;
            }
            
            .order-button {
              padding: 4px 8px;
              font-size: 0.75rem;
            }
            
            .whatsapp-float {
              width: 45px;
              height: 45px;
              font-size: 1.2rem;
            }
          }
        `}
      </style>
      
      <Navbar />
      
      <section className="section order-section">
        <div className="order-box glass">
          <h2 className="section-title">Our Menu</h2>
          <p className="food-message">{foodMessages[jokeIndex]}</p>
          
          <div className="special-banner">
            🌟 {dailySpecial} 🌟
          </div>
          
          <div className="stats-container glass">
            <div className="stat-item">
              <div className="stat-number">{visitorCount}+</div>
              <div className="stat-label">Visitors Today</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{newItems.length}</div>
              <div className="stat-label">New Items</div>
            </div>
          </div>
          
          <form onSubmit={sendOrder} className="order-form">
            <input
              type="text"
              placeholder="e.g. Ugali & Fish"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              className="form-input glass"
            />
            
            <div className="radio-group">
              {['pickup', 'eat', 'delivery'].map((type) => (
                <label key={type} className="radio-label">
                  <input
                    type="radio"
                    value={type}
                    checked={orderType === type}
                    onChange={(e) => setOrderType(e.target.value)}
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
                className="form-input glass"
              />
            )}
            
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="arrival"
                  checked={paymentOption === 'arrival'}
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                Pay on Arrival
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="mpesa"
                  checked={paymentOption === 'mpesa'}
                  onChange={(e) => setPaymentOption(e.target.value)}
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
                className="form-input glass"
                required
              />
            )}
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'WhatsApp Us'}
            </button>
          </form>
        </div>
        
        <div className="quick-access">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              onClick={() => scrollToSection(cat.id)} 
              className="quick-button glass"
            >
              {cat.title}
            </button>
          ))}
        </div>
      </section>
      
      <section className="section">
        <div className="menu-categories">
          <h2 className="section-title">Menu Categories</h2>
          
          {categories.map((cat, i) => (
            <div key={i} id={cat.id} className="category glass">
              {newItems.includes(cat.items[0]?.[0]) && <div className="new-badge">NEW</div>}
              <h3 className="category-title">{cat.title}</h3>
              
              {cat.items.map(([name, price, isNew], j) => (
                <div key={j} className="menu-item">
                  <div className="menu-item-name">{name}</div>
                  <div className="menu-item-price">{price}</div>
                  <button 
                    onClick={() => {
                      setFoodName(name);
                      document.querySelector('.order-section').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="order-button"
                  >
                    Order
                  </button>
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
        className="whatsapp-float"
      >
        💬
      </a>
      
      <Footer />
    </div>
  );
};

export default Menu;
