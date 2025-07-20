import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const settlersCoords = [-0.16486, 35.58073]; // Settlers Inn coordinates

const Location = () => {
  const [userCoords, setUserCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [joke, setJoke] = useState('');
  const [mapExpanded, setMapExpanded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const routeLineRef = useRef(null);

  const jokes = [
    "🐐 Shortcut via goat path... just kidding!",
    "🛵 Dodging potholes like a pro...",
    "🍲 Free aroma as you get closer...",
    "🚕 We told the boda guy to hurry!",
    "🗺️ Calculating... avoid cows on the road!",
    "📡 GPS locking in like your hunger!"
  ];

  const styles = {
    page: {
      fontFamily: "'Fira Code', monospace",
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      minHeight: '100vh',
      paddingBottom: '2rem',
    },
    section: {
      maxWidth: '1100px',
      margin: 'auto',
      padding: '2rem 1rem',
    },
    title: {
      textAlign: 'center',
      color: '#9fef00',
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    subtitle: {
      textAlign: 'center',
      color: '#8b949e',
      marginBottom: '2rem',
      fontSize: '1rem',
    },
    mapBox: {
      height: mapExpanded ? '80vh' : '400px',
      borderRadius: '14px',
      overflow: 'hidden',
      border: '2px solid #30363d',
      boxShadow: '0 0 20px rgba(0,255,120,0.1)',
      marginBottom: '1.5rem',
      transition: '0.3s ease',
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      flexWrap: 'wrap',
    },
    button: {
      padding: '0.7rem 1.5rem',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#25D366',
      color: '#0d1117',
      fontSize: '1rem',
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(37, 211, 102, 0.4)',
      transition: '0.3s',
    },
    distance: {
      textAlign: 'center',
      color: '#58a6ff',
      fontSize: '1rem',
      marginTop: '0.8rem',
    },
    joke: {
      textAlign: 'center',
      fontSize: '0.95rem',
      color: '#8b949e',
      marginTop: '0.3rem',
    },
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current, {
      center: settlersCoords,
      zoom: 14,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
    }).addTo(mapInstanceRef.current);

    L.marker(settlersCoords, {
      icon: L.divIcon({
        className: 'settlers-marker',
        html: '🏠',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    }).addTo(mapInstanceRef.current).bindPopup('Settlers Inn');

    return () => {
      mapInstanceRef.current.remove();
    };
  }, []);

  const locateMe = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setUserCoords(coords);

      if (userMarkerRef.current) mapInstanceRef.current.removeLayer(userMarkerRef.current);
      if (routeLineRef.current) mapInstanceRef.current.removeControl(routeLineRef.current);

      userMarkerRef.current = L.marker(coords, {
        icon: L.divIcon({
          className: 'user-marker',
          html: '🧍',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      }).addTo(mapInstanceRef.current).bindPopup("You are here").openPopup();

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(coords[0], coords[1]),
          L.latLng(settlersCoords[0], settlersCoords[1]),
        ],
        lineOptions: {
          styles: [{ color: '#9fef00', weight: 5 }],
        },
        createMarker: () => null,
        show: false,
        routeWhileDragging: false,
      }).addTo(mapInstanceRef.current);

      routeLineRef.current = routingControl;

      const dist = getDistance(coords[0], coords[1], settlersCoords[0], settlersCoords[1]);
      setDistance(dist);

      // Show fun travel joke
      setJoke(jokes[Math.floor(Math.random() * jokes.length)]);

      mapInstanceRef.current.fitBounds(routingControl.getPlan().getWaypoints().map(w => w.latLng), {
        padding: [50, 50],
      });
    });
  };

  const flyToSettlers = () => {
    mapInstanceRef.current.flyTo(settlersCoords, 17, {
      animate: true,
      duration: 2,
    });
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <section style={styles.section}>
        <h2 style={styles.title}>📍 Find Us</h2>
        <p style={styles.subtitle}>
          We’re in the beautiful Kenya Highlands. Let’s get you there the smart way.
        </p>

        <div style={styles.mapBox} ref={mapRef} id="map" />

        <div style={styles.controls}>
          <button onClick={locateMe} style={styles.button}>📍 Locate Me</button>
          <button onClick={flyToSettlers} style={{ ...styles.button, backgroundColor: '#9fef00' }}>
            🚀 Take Me to Settlers
          </button>
          <button
            onClick={() => setMapExpanded(!mapExpanded)}
            style={{ ...styles.button, backgroundColor: '#1f6feb', color: '#fff' }}
          >
            {mapExpanded ? '🗺️ Collapse Map' : '🔍 Expand Map'}
          </button>
        </div>

        {distance && (
          <>
            <div style={styles.distance}>
              🛣️ You're approximately <strong>{distance} km</strong> away.
            </div>
            <div style={styles.joke}>{joke}</div>
          </>
        )}
      </section>
      <Footer />

      <style>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
        }
        .settlers-marker {
          font-size: 1.6rem;
        }
        .user-marker {
          font-size: 1.4rem;
        }
      `}</style>
    </div>
  );
};

export default Location;
