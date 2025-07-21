import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const settlersCoords = [-0.16486, 35.58073];

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

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
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
      zoom: 15,
      zoomControl: false,
    });

    // Detailed Light Map (normal color)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // Settlers Marker
    L.marker(settlersCoords, {
      icon: L.divIcon({
        className: 'settlers-marker',
        html: '🏠',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    }).addTo(mapInstanceRef.current).bindPopup('📍 Settlers Inn — We’re here!').openPopup();

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

      // Add user marker
      userMarkerRef.current = L.marker(coords, {
        icon: L.divIcon({
          className: 'user-marker',
          html: '🧍',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      }).addTo(mapInstanceRef.current).bindPopup("📍 You're here!").openPopup();

      // Route line
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(coords), L.latLng(settlersCoords)],
        lineOptions: {
          styles: [{ color: '#007bff', weight: 5 }],
        },
        createMarker: () => null,
        show: false,
        routeWhileDragging: false,
      }).addTo(mapInstanceRef.current);

      routeLineRef.current = routingControl;

      const dist = getDistance(coords[0], coords[1], settlersCoords[0], settlersCoords[1]);
      setDistance(dist);
      setJoke(jokes[Math.floor(Math.random() * jokes.length)]);

      mapInstanceRef.current.fitBounds(
        routingControl.getPlan().getWaypoints().map((w) => w.latLng),
        { padding: [50, 50] }
      );
    });
  };

  const flyToSettlers = () => {
    mapInstanceRef.current.flyTo(settlersCoords, 17, {
      animate: true,
      duration: 2,
    });
  };

  const openGoogleMaps = () => {
    window.open('https://maps.app.goo.gl/T4JeUH1KDCUrx9mK7', '_blank');
  };

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Fira Code, monospace' }}>
      <Navbar />
      <section style={{ maxWidth: '1100px', margin: 'auto', padding: '2rem 1rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem', color: '#007bff' }}>
          📍 Find Us
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1rem', marginBottom: '2rem' }}>
          We're in the Kenya Highlands — here's how to get to Settlers Inn.
        </p>

        <div
          ref={mapRef}
          style={{
            height: mapExpanded ? 'min(80vh, 500px)' : '400px',
            borderRadius: '12px',
            border: '2px solid #ccc',
            marginBottom: '1.5rem',
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={locateMe} style={buttonStyle}>📍 Locate Me</button>
          <button onClick={flyToSettlers} style={{ ...buttonStyle, backgroundColor: '#28a745', color: '#fff' }}>
            🚀 Fly to Settlers
          </button>
          <button onClick={() => setMapExpanded(!mapExpanded)} style={buttonStyle}>
            {mapExpanded ? '🗺️ Collapse Map' : '🔍 Expand Map'}
          </button>
          <button onClick={openGoogleMaps} style={{ ...buttonStyle, backgroundColor: '#fbbc05', color: '#000' }}>
            🌍 Google Maps
          </button>
        </div>

        {distance && (
          <>
            <p style={{ textAlign: 'center', color: '#007bff', marginTop: '1rem' }}>
              🛣️ You're approximately <strong>{distance} km</strong> away.
            </p>
            <p style={{ textAlign: 'center', color: '#555' }}>{joke}</p>
          </>
        )}
      </section>
      <Footer />

      <style>{`
        .leaflet-container { width: 100%; height: 100%; }
        .settlers-marker { font-size: 1.5rem; }
        .user-marker { font-size: 1.4rem; }
        .leaflet-routing-container { display: none; }
      `}</style>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 18px',
  fontSize: '0.95rem',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  minWidth: '150px',
};

export default Location;
