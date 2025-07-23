import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Menu = () => {
  const [foodName, setFoodName] = useState('');
  const [jokeIndex, setJokeIndex] = useState(0);

  const foodJokes = [
    "😋 Eat like royalty, pay like a villager.",
    "🔥 Our nyama choma speaks fluent Swahili.",
    "🍽️ Forks up! Time to offend your diet.",
    "☕ Our tea sees your soul and hugs it.",
    "🤣 Calories don’t count at Settlers Inn — trust us.",
    "🍗 Chicken that makes you forget your ex.",
    "🥘 Our chapatis are soft like your crush's hands.",
    "💥 Hunger meets its match here.",
    "🐐 Goat meat so good, it might call you back.",
    "🎶 Your stomach's playlist: ‘Ugali Anthem Remix’",
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
    const interval = setInterval(() => {
      setJokeIndex((prev) => (prev + 1) % foodJokes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sendOrder = (e) => {
    e.preventDefault();
    if (!foodName.trim()) return;
    const message = `Hi Settlers Inn, I want to order: ${foodName}`;
    const url = `https://wa.me/254748778388?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

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
      maxWidth: '100%',
      display: 'block',
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
      fontFamily: 'Fira Code',
      minWidth: '220px',
      flex: '1',
    },
    button: {
      padding: '0.6rem 1.2rem',
      background: '#9fef00',
      color: '#0d1117',
      border: 'none',
      borderRadius: '8px',
      fontFamily: 'Fira Code',
      cursor: 'pointer',
      fontWeight: 'bold',
      flexShrink: 0,
    },
    menuSection: {
      paddingTop: '1rem',
    },
    category: {
      marginBottom: '2.5rem',
      animation: 'fadeInUp 0.8s ease',
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
    },
  };

  const categories = [
    { id: 'breakfast', title: '🌅 Breakfast', items: [['Highland Breakfast (eggs, toast, sausage)', 'KES 500']] },
    { id: 'lunch', title: '🍛 Lunch & Dinner', items: [['Whole Fish', 'KES 700KG'], ['Broiler Chicken 1/4KG', 'KES 300'], ['Broiler Chicken 1/2KG', 'KES 600'], ['Kienyeji Chicken 1/4KG', 'KES 350'], ['Kienyeji Chicken 1/2', 'KES 700'], ['Mbuzi 1/4KG', 'KES 350'], ['Mbuzi 1/2KG', 'KES 700'], ['Ng`ombe 1/4KG', 'KES 300'], ['Ng`ombe 1/2KG', 'KES 600'], ['Pork 1/4KG', 'KES 350'], ['Pork 1/2KG', 'KES 700']] },
    { id: 'dinner', title: '🌇 Dinner Special', items: [['Chicken Stir Fry', 'KES 800'], ['Nyama Choma (per plate)', 'KES 950']] },
    { id: 'matumbo', title: '🥠 Matumbo Zone', items: [['Matumbo Mbuzi 1/4KG', 'KES 300'], ['Matumbo Mbuzi 1/2KG', 'KES 600'], ['Matumbo Ng`ombe 1/4KG', 'KES 250'], ['Matumbo Ng`ombe 1/2KG', 'KES 500']] },
    { id: 'sides', title: '🍽️ Side Orders', items: [['White Ugali', 'KES 70'], ['Ugali Wimbi', 'KES 100'], ['Ugali Sorghum', 'KES 100'], ['White Rice', 'KES 120'], ['Stir Fried', 'KES 150'], ['Mboga Kienyeji', 'KES 100'], ['Sukuma wiki/Cabbage/spinach', 'KES 50'], ['Kachumbari', 'KES 100'], ['Beans Plain', 'KES 100']] },
    { id: 'soft', title: '🍹 Soft Beverages', items: [['Dasani 500ML', 'KES 50'], ['Dasani 1L', 'KES 100'], ['Plastic Soda 350ML', 'KES 50'], ['Dawa (take away)', 'KES 130'], ['Monster', 'KES 250'], ['Plastic Soda 500ML', 'KES 80'], ['Plastic Soda 1.25ML', 'KES 150'], ['Plastic Soda 1L', 'KES 130'], ['Plastic Soda 2L', 'KES 200'], ['Bottled Soda 300ML', 'KES 60'], ['Minute Maid 400ML', 'KES 80'], ['Minute Maid 1L', 'KES 150'], ['Yoghurt 500ML', 'KES 130'], ['Yatta Juice 1L', 'KES 350'], ['Redbull', 'KES 250'], ['Predator', 'KES 70'], ['Powerplay', 'KES 70'], ['Orchid Valley', 'KES 350'], ['Pep Juice', 'KES 100']] },
    { id: 'cake', title: '🍰 Cakes & Desserts', items: [['Vanilla 1KG', 'KES 1300'], ['Black Forest', 'KES 1500'], ['Marble 1KG', 'KES 1500'], ['Cake Slice', 'KES 100']] },
    { id: 'beer', title: '🍺 Beer', items: [['Beer Cans', 'KES 350'], ['Bottled Beer', 'KES 300']] },
    { id: 'wine', title: '🍷 Wines', items: [['Caprice', 'KES 1000'], ['Four Cousins', 'KES 1600'], ['4th Street', 'KES 1600']] },
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes typewriter { from { width: 0; } to { width: 100%; } }
      @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
      @keyframes glow { 0% { text-shadow: 0 0 5px #9fef00; } 50% { text-shadow: 0 0 15px #9fef00; } 100% { text-shadow: 0 0 5px #9fef00; } }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={styles.body}>
      <Navbar />
      <section style={styles.section}>
        <div style={styles.orderBox}>
          <h2 style={styles.h2}>🍛 Welcome to Our Delicious World</h2>
          <p style={styles.p}>{foodJokes[jokeIndex]}</p>
          <form onSubmit={sendOrder} style={styles.form}>
            <input
              type="text"
              placeholder="e.g. Ugali & Fish"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>📲 WhatsApp Us</button>
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
              <h3 style={styles.categoryTitle}>{cat.title}</h3>
              {cat.items.map(([name, price], j) => (
                <div key={j} style={styles.menuItem}>
                  <p>{name}</p>
                  <span>{price}</span>
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
