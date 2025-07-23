import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles.css';

const Home = () => {
  const funnyPhrases = [
    "🍲 Come hungry. Leave like a king!",
    "😋 Our chapatis might flirt with your taste buds!",
    "🛏️ Rooms so cozy, you’ll extend your stay accidentally.",
    "☕ Warning: Our tea may cause sudden smiles.",
    "🚀 Settlers — where your stomach settles happy!"
  ];

  const reviews = [
  "“The best hangout in Kericho hands down!” — Mercy K.",
  "“That coffee hit different... felt like Nairobi!” — Brian N.",
  "“Clean, affordable, and that fish was perfection.” — Jane M.",
  "“Chapo x sausage combo is undefeated.🔥” — Kiprotich L.",
  "“That conference hall is 🔥 and the food... top tier!” — Ivy W.",
  "“I’d come back just for the egg pancakes.🤤” — Moffat M.",
  "“Service with a smile every single time.” — Susan W.",
  "“I loved the quiet upstairs room with the morning view.” — Dennis K.",
  "“Settlers is the reason I stopped cooking at home 😂” — Terry N.",
  "“That nyama stew and ugali combo? Blessings!” — Juma B.",
  "“My Sunday chill spot always. Cold Fanta and good vibes.” — Ruth M.",
  "“Had our meeting there — WiFi, coffee, and comfort!” — Felix M.",
  "“Their ‘Chapo X Ndazi’ plate is addictive 😅” — Lorraine W.",
  "“Everytime I visit, there’s something new on the menu 👏” — Davis T.",
  "“Kinda miss it when I’m away. Feels like home.” — Sharon A.",
  "“Chips kuku never misses. Portions are crazy good.” — Kibet R.",
  "“Late night tea + campus convos = Settlers magic!” — Alvin M.",
  "“We came for lunch and stayed until sunset 😍” — Rose C.",
  "“The cake? Moist. The icing? Just wow.” — Sylvia L.",
  "“They even remembered my order from last time. Mad service!” — Kelvin N.",
  "“Perfect stopover on our way to Narok.” — Sammy K.",
  "“Bar section’s under construction but vibes already loaded.” — Winnie T.",
  "“Samosas crispy. Soda cold. Prices fair. 5/5.” — Arnold M.",
  "“Room service was fast and friendly.” — Carol W.",
  "“I posted their food on IG — got 100+ likes 🤩” — Vicky J.",
  "“I’ve done breakfast, lunch, AND dinner here. Never disappoints.” — George M.",
  "“No cap, those chapos are elite level.” — Mike O.",
  "“Took my parents here — even mum was impressed!” — Lydia N.",
  "“They play soft R&B and gospel in the mornings. Mood✅” — Sheila M.",
  "“Outdoor chill zone is peaceful. Just birds and vibes.” — Leon L.",
  "“They even added a kids’ play area — thoughtful!” — Tabitha K.",
  "“The security guy greeted us by name. Felt special.” — Jared B.",
  "“I’m recommending Settlers to all my Nairobi people.” — Steve W.",
  "“They let me charge my phone. Small kindness, big respect.” — Elsie G."
];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showInstallToast, setShowInstallToast] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % funnyPhrases.length);
      setReviewIndex(prev => (prev + 1) % reviews.length);
    }, 5000);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallToast(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
      setShowInstallToast(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const featuredDishes = [
    { img: "chapati 1.jpg", emoji: "🥙", title: "Golden Chapatis", desc: "Soft, flaky, and fresh from the pan." },
    { img: "fish x chips.jpg", emoji: "🐟", title: "Fish & Chips", desc: "Crispy fries with grilled tilapia." },
    { img: "cofee.jpg", emoji: "☕", title: "Bold Kenyan Coffee", desc: "Locally brewed, strong & smooth." },
    { img: "ugali x greens x meat.jpg", emoji: "🍛", title: "Ugali Feast", desc: "Greens, meat & ugali like mama made it." }
  ];

  return (
    <>
      <Navbar />

      {showInstallToast && (
        <div style={toastStyle} onClick={handleInstallClick}>
          🧠 Tip: Tap here to <strong>install Settlers Inn</strong> as an app!
        </div>
      )}

      <section className="hero glassy">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source src="/assets/settlers.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <h2 className="animated-title">Welcome to Settlers Inn</h2>
          <p className="rotating-phrase">{funnyPhrases[phraseIndex]}</p>
          <p>Where Settlers Still Eat Like Kings.</p>
          <a href="/menu" className="hero-button">🍽️ View Our Menu</a><br /><br />
          <a href="/accommodation" className="hero-button book">🛏️ Book a Room</a>
        </div>
      </section>

      <section className="intro glassy">
        <p>Located in the heart of the Kenya Highlands, Settlers Inn is a family-owned gem serving authentic dishes, hearty portions, and warm hospitality.</p>
      </section>

      <section className="featured glassy">
        {featuredDishes.map((dish, i) => (
          <div key={i} className="dish">
            <img src={`/assets/${dish.img}`} alt={dish.title} />
            <h3>{dish.emoji} {dish.title}</h3>
            <p>{dish.desc}</p>
          </div>
        ))}
      </section>

      <section className="reviews glassy">
        <h2>💬 What People Are Saying</h2>
        <div className="review-rotator">
          <p className="animated-review">{reviews[reviewIndex]}</p>
        </div>
      </section>

      <section className="facebook-reviews">
        <h2>💬 Facebook Reviews (Live)</h2>
        <div className="fb-page"
          data-href="https://www.facebook.com/settlersinn1/"
          data-tabs="timeline"
          data-width="380"
          data-height="400"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote cite="https://www.facebook.com/settlersinn1/" className="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/settlersinn1/">Settlers Inn</a>
          </blockquote>
        </div>
      </section>

      <Footer />

      <div className="quick-access glassy">
        <a href="tel:0748778388">📞</a>
        <a href="https://maps.app.goo.gl/hvW5TubkM8WGcfAs5" target="_blank">🧭</a>
        <a href="/accommodation">🛏️</a>
        <a href="/gallery">📷</a>
        <a href="/menu">🥘</a>
        <a href="https://wa.me/254748778388" target="_blank">💬</a>
      </div>

      <p style={{ textAlign: 'center', marginTop: '2rem', color: '#aaa' }}>
        &copy; {new Date().getFullYear()} Settlers Inn — Built by EchoCode
      </p>
    </>
  );
};

const toastStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#111',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  fontSize: '14px',
  zIndex: 10000,
  maxWidth: '90%',
  textAlign: 'center',
  animation: 'fadeInOut 6s ease-in-out',
  lineHeight: '1.5',
  cursor: 'pointer',
};

const fadeInOutAnimation = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateY(10px); }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = fadeInOutAnimation;
  document.head.appendChild(style);
}

export default Home;
