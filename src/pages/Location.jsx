import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const settlersCoords = [-0.1995774048265411, 35.43807506648199];

const Location = () => {
  const [userCoords, setUserCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [joke, setJoke] = useState('');
  const [mapExpanded, setMapExpanded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [visitorCount, setVisitorCount] = useState(0);
  
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
    // Initialize visitor count
    setVisitorCount(Math.floor(Math.random() * 50) + 10);
    
    // Simulate nearby places
    const places = [
      { name: "Kericho Town", distance: "2.5 km", type: "town" },
      { name: "Kipkelion Town", distance: "15 km", type: "town" },
      { name: "Kericho Tea Hotel", distance: "3 km", type: "hotel" },
      { name: "Chagaik Arboretum", distance: "8 km", type: "attraction" }
    ];
    setNearbyPlaces(places);
    
    if (!mapRef.current) return;
    
    mapInstanceRef.current = L.map(mapRef.current, {
      center: settlersCoords,
      zoom: 15,
      zoomControl: false,
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);
    
    L.marker(settlersCoords, {
      icon: L.divIcon({
        className: 'settlers-marker',
        html: '🏠',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    })
      .addTo(mapInstanceRef.current)
      .bindPopup('📍 Settlers Inn — We\'re here!')
      .openPopup();
    
    return () => mapInstanceRef.current.remove();
  }, []);
  
  const locateMe = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setUserCoords(coords);
      
      if (userMarkerRef.current)
        mapInstanceRef.current.removeLayer(userMarkerRef.current);
      if (routeLineRef.current)
        mapInstanceRef.current.removeControl(routeLineRef.current);
      
      userMarkerRef.current = L.marker(coords, {
        icon: L.divIcon({
          className: 'user-marker',
          html: '🧍',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      })
        .addTo(mapInstanceRef.current)
        .bindPopup("📍 You're here!")
        .openPopup();
      
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
      
      setIsLocating(false);
    }, () => {
      setIsLocating(false);
      alert("Unable to get your location. Please enable location services.");
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

  const styles = {
    page: {
      background: '#fff',
      color: '#111',
      fontFamily: 'Fira Code, monospace',
    },
    section: {
      maxWidth: '1100px',
      margin: 'auto',
      padding: '2rem 1rem',
    },
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '0.5rem',
      color: '#007bff',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '1rem',
      marginBottom: '2rem',
      color: '#555',
    },
    mapContainer: {
      height: mapExpanded ? 'min(80vh, 500px)' : '400px',
      borderRadius: '12px',
      border: '2px solid #ccc',
      marginBottom: '1.5rem',
      position: 'relative',
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      justifyContent: 'center',
      marginBottom: '2rem',
    },
    button: {
      padding: '10px 18px',
      fontSize: '0.95rem',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      minWidth: '150px',
      transition: 'all 0.2s',
    },
    distanceContainer: {
      textAlign: 'center',
      marginTop: '1rem',
      marginBottom: '1rem',
    },
    distance: {
      color: '#007bff',
      fontWeight: 'bold',
    },
    joke: {
      color: '#555',
      fontStyle: 'italic',
    },
    nearbyContainer: {
      background: '#f8f9fa',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '2rem',
    },
    nearbyTitle: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
      color: '#007bff',
      textAlign: 'center',
    },
    nearbyList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
    },
    nearbyItem: {
      background: '#fff',
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nearbyName: {
      fontWeight: 'bold',
    },
    nearbyDistance: {
      color: '#007bff',
      fontSize: '0.9rem',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      background: '#e9f5ff',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '2rem',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#007bff',
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#555',
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '12px',
      zIndex: 1000,
    },
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <section style={styles.section}>
        <h2 style={styles.title}>📍 Find Us</h2>
        <p style={styles.subtitle}>We're in the Kenya Highlands — here's how to get to Settlers Inn.</p>
        
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{visitorCount}</div>
            <div style={styles.statLabel}>Visitors Today</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>4.9★</div>
            <div style={styles.statLabel}>Location Rating</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>24/7</div>
            <div style={styles.statLabel}>Service</div>
          </div>
        </div>
        
        <div style={styles.mapContainer}>
          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
          {isLocating && (
            <div style={styles.loadingOverlay}>
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>Finding your location...</div>
                <div style={{
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #007bff',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto'
                }}></div>
              </div>
            </div>
          )}
        </div>
        
        <div style={styles.buttonContainer}>
          <button 
            onClick={locateMe} 
            style={{
              ...styles.button,
              background: isLocating ? '#555' : '#007bff',
              cursor: isLocating ? 'not-allowed' : 'pointer',
            }}
            disabled={isLocating}
          >
            {isLocating ? 'Locating...' : '📍 Locate Me'}
          </button>
          <button onClick={flyToSettlers} style={{ ...styles.button, backgroundColor: '#28a745' }}>
            🚀 Fly to Settlers
          </button>
          <button 
            onClick={() => setMapExpanded(!mapExpanded)} 
            style={styles.button}
          >
            {mapExpanded ? '🗺️ Collapse Map' : '🔍 Expand Map'}
          </button>
          <button onClick={openGoogleMaps} style={{ ...styles.button, backgroundColor: '#fbbc05', color: '#000' }}>
            🌍 Google Maps
          </button>
        </div>
        
        {distance && (
          <div style={styles.distanceContainer}>
            <p style={styles.distance}>
              🛣️ You're approximately <strong>{distance} km</strong> away.
            </p>
            <p style={styles.joke}>{joke}</p>
          </div>
        )}
        
        <div style={styles.nearbyContainer}>
          <h3 style={styles.nearbyTitle}>📍 Nearby Places</h3>
          <div style={styles.nearbyList}>
            {nearbyPlaces.map((place, index) => (
              <div key={index} style={styles.nearbyItem}>
                <div>
                  <div style={styles.nearbyName}>{place.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#777' }}>{place.type}</div>
                </div>
                <div style={styles.nearbyDistance}>{place.distance}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <style>{`
        .leaflet-container { width: 100%; height: 100%; }
        .settlers-marker { font-size: 1.5rem; }
        .user-marker { font-size: 1.4rem; }
        .leaflet-routing-container { display: none; }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Location;