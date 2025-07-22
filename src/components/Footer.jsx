import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  const styles = {
    footer: {
      background: 'linear-gradient(to right, #161b22, #0d1117)',
      padding: '3rem 1rem 2rem',
      fontFamily: 'Fira Code, monospace',
      color: '#c9d1d9',
      borderTop: '1px solid #2b3137',
      animation: 'fadeInUp 1s ease',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '3rem',
      maxWidth: '1000px',
      margin: 'auto',
      textAlign: 'center',
    },
    col: {
      minWidth: '260px',
      flex: '1',
    },
    heading: {
      color: '#9fef00',
      marginBottom: '0.8rem',
      fontSize: '1.2rem',
      cursor: 'pointer',
      textShadow: '0 0 6px #9fef00',
      transition: 'transform 0.3s ease',
    },
    a: {
      color: '#58a6ff',
      textDecoration: 'none',
      fontSize: '0.95rem',
      transition: 'color 0.3s ease, text-shadow 0.3s ease',
    },
    contactInfo: {
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
      lineHeight: '1.7',
    },
    cta: {
      textAlign: 'center',
      marginTop: '2rem',
    },
    whatsapp: {
      display: 'inline-block',
      backgroundColor: '#25D366',
      color: '#fff',
      padding: '0.7rem 1.5rem',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontFamily: 'Fira Code',
      textDecoration: 'none',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 0 10px #25D36677',
    },
    bottom: {
      textAlign: 'center',
      marginTop: '2.5rem',
      fontSize: '0.85rem',
      color: '#8b949e',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand Info */}
        <div style={styles.col}>
          <h3 style={styles.heading}>Settlers Inn</h3>
          <p>📍 Kipkelion, Kenya Highlands</p>
          <p>Where Settlers Still Eat Like Kings.</p>
        </div>

        {/* Contact Info */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Contact Us</h4>
          <div style={styles.contactInfo}>
            <p>
              📞 Hotel: <a href="tel:+254748778388" style={styles.a}>0748 778388</a>
            </p>
            <p>
              👤 Manager: <a href="tel:+254723709208" style={styles.a}>0723 709208</a>
            </p>
            <p>
              👤 Owner: <a href="tel:+254727046813" style={styles.a}>0727 046813</a>
            </p>
            <p>
              ✉️ <a href="mailto:settlersinn@gmail.com" style={styles.a}>settlersinn@gmail.com</a>
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div style={styles.cta}>
        <a
          href="https://wa.me/254748778388?text=Hi%20Settlers%20Inn%2C%20I%20want%20to%20book%20a%20room%20or%20table!"
          target="_blank"
          rel="noreferrer"
          style={styles.whatsapp}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          📲 Chat with Us on WhatsApp
        </a>
      </div>

      {/* Footer Bottom */}
      <div style={styles.bottom}>
        <p>
          Built with ❤️ by{' '}
          <a
            href="https://wa.me/254721635810"
            target="_blank"
            rel="noreferrer"
            style={styles.a}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#1f6feb';
              e.currentTarget.style.textShadow = '0 0 6px #1f6feb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#58a6ff';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            EchoBiz (Kimutai Gibson)
          </a>
        </p>
        <p>© {year} Settlers Inn. All rights reserved.</p>
      </div>

      {/* Glow animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
