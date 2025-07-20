import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Menu = () => {
  const [foodName, setFoodName] = useState('');

  const sendOrder = (e) => {
    e.preventDefault();
    if (!foodName.trim()) return;
    const message = `Hi Settlers Inn, I want to order: ${foodName}`;
    const url = `https://wa.me/254748778388?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const styles = {
    body: {
      fontFamily: "'Fira Code', monospace",
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      margin: 0,
      paddingBottom: '5rem',
    },
    section: {
      padding: '2rem 1rem',
      maxWidth: '900px',
      margin: 'auto',
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
      marginBottom: '1rem',
    },
    p: {
      color: '#8b949e',
      marginBottom: '1rem',
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
      fontFamily: 'Fira Code',
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
    },
    menuSection: {
      paddingTop: '1rem',
    },
    category: {
      marginBottom: '2.5rem',
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
  };

  const categories = [
    {
      title: '🌅 Breakfast',
      items: [
        ['Highland Breakfast (eggs, toast, sausage)', 'KES 450'],
        ['Porridge with Sweet Potatoes', 'KES 300'],
      ],
    },
    {
      title: '🍛 Lunch',
      items: [
        ['Grilled Steak with Fries', 'KES 850'],
        ['Beef Stew + Rice', 'KES 700'],
        ['Ugali & Fish', 'KES 750'],
      ],
    },
    {
      title: '🌇 Dinner',
      items: [
        ['Chicken Stir Fry', 'KES 800'],
        ['Nyama Choma (per plate)', 'KES 950'],
      ],
    },
    {
      title: '🍹 Drinks',
      items: [
        ['Fresh Passion Juice', 'KES 200'],
        ['Chai ya Maziwa', 'KES 100'],
        ['Kenyan Coffee', 'KES 180'],
      ],
    },
  ];

  return (
    <div style={styles.body}>
      <Navbar />

      <section style={styles.section}>
        <div style={styles.orderBox}>
          <h2 style={styles.h2}>🍛 Order Food Instantly</h2>
          <p style={styles.p}>
            Enter your favorite dish and order via WhatsApp. We'll reply fast!
          </p>
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

        <div style={styles.menuSection}>
          <h2 style={styles.h2}>🍽️ Our Menu</h2>
          {categories.map((cat, i) => (
            <div key={i} style={styles.category}>
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
