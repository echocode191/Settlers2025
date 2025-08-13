import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
  const [routingLoaded, setRoutingLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isVerySmallMobile, setIsVerySmallMobile] = useState(false);
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const isMountedRef = useRef(true);
  
  const jokes = [
    "The shortest route to great food!",
    "Your journey to comfort begins here.",
    "Getting closer to your perfect getaway.",
    "The path to memorable experiences.",
    "Almost there — your destination awaits!"
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
    setVisitorCount(Math.floor(Math.random() * 30) + 15);
    
    // Simulate nearby places
    const places = [
      { name: "Kericho Town", distance: "2.5 km", type: "town" },
      { name: "Kipkelion Town", distance: "15 km", type: "town" },
      { name: "Kericho Tea Hotel", distance: "3 km", type: "hotel" },
      { name: "Chagaik Arboretum", distance: "8 km", type: "attraction" }
    ];
    setNearbyPlaces(places);
    
    // Dynamically load leaflet-routing-machine
    if (typeof window !== 'undefined' && !window.L?.Routing) {
      import('leaflet-routing-machine').then(() => {
        if (isMountedRef.current) {
          setRoutingLoaded(true);
        }
      });
    } else if (typeof window !== 'undefined' && window.L?.Routing) {
      setRoutingLoaded(true);
    }
    
    // Check screen size for responsive design
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
      setIsVerySmallMobile(window.innerWidth <= 333);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      isMountedRef.current = false;
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    
    try {
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
          html: '🏨',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
      })
        .addTo(mapInstanceRef.current)
        .bindPopup('Settlers Inn')
        .openPopup();
    } catch (error) {
      console.error("Error initializing map:", error);
    }
    
    return () => {
      if (mapInstanceRef.current) {
        try {
          // Clean up routing control if it exists
          if (routeLineRef.current) {
            mapInstanceRef.current.removeControl(routeLineRef.current);
            routeLineRef.current = null;
          }
          
          // Clean up user marker if it exists
          if (userMarkerRef.current) {
            mapInstanceRef.current.removeLayer(userMarkerRef.current);
            userMarkerRef.current = null;
          }
          
          // Remove the map
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        } catch (error) {
          console.error("Error cleaning up map:", error);
        }
      }
    };
  }, []);
  
  const locateMe = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setUserCoords(coords);
      
      if (!mapInstanceRef.current) return;
      
      // Clean up existing user marker and route
      if (userMarkerRef.current) {
        mapInstanceRef.current.removeLayer(userMarkerRef.current);
        userMarkerRef.current = null;
      }
      
      if (routeLineRef.current) {
        mapInstanceRef.current.removeControl(routeLineRef.current);
        routeLineRef.current = null;
      }
      
      // Add new user marker
      userMarkerRef.current = L.marker(coords, {
        icon: L.divIcon({
          className: 'user-marker',
          html: '📍',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      }).addTo(mapInstanceRef.current)
        .bindPopup("Your location")
        .openPopup();
      
      // Add routing if loaded
      if (routingLoaded && window.L?.Routing) {
        try {
          const routingControl = window.L.Routing.control({
            waypoints: [L.latLng(coords), L.latLng(settlersCoords)],
            lineOptions: {
              styles: [{ color: '#38bdf8', weight: 5 }],
            },
            createMarker: () => null,
            show: false,
            routeWhileDragging: false,
          }).addTo(mapInstanceRef.current);
          
          routeLineRef.current = routingControl;
          
          // Fit map to show both points
          const group = new L.featureGroup([
            userMarkerRef.current,
            L.marker(settlersCoords)
          ]);
          
          mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
        } catch (error) {
          console.error("Error creating route:", error);
        }
      }
      
      const dist = getDistance(coords[0], coords[1], settlersCoords[0], settlersCoords[1]);
      setDistance(dist);
      setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
      
      setIsLocating(false);
    }, () => {
      setIsLocating(false);
      alert("Unable to get your location. Please enable location services.");
    });
  };
  
  const flyToSettlers = () => {
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.flyTo(settlersCoords, 17, {
          animate: true,
          duration: 2,
        });
      } catch (error) {
        console.error("Error flying to location:", error);
      }
    }
  };
  
  const openGoogleMaps = () => {
    window.open('https://maps.app.goo.gl/T4JeUH1KDCUrx9mK7', '_blank');
  };
  
  // Glassy styles
  const glassyStyle = {
    page: {
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#e2e8f0',
      fontFamily: "Inter, system-ui, sans-serif",
      minHeight: '100vh',
      overflowX: 'hidden'
    },
    section: {
      maxWidth: '1100px',
      margin: 'auto',
      padding: '3rem 1.5rem',
    },
    title: {
      textAlign: 'center',
      fontSize: '2.2rem',
      marginBottom: '0.8rem',
      color: '#e2e8f0',
      fontWeight: '600',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '1.1rem',
      marginBottom: '2.5rem',
      color: '#94a3b8',
      maxWidth: '600px',
      marginInline: 'auto',
    },
    mapContainer: {
      height: '400px',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.2rem',
      justifyContent: 'center',
      marginBottom: '2.5rem',
    },
    button: {
      padding: '0.8rem 1.5rem',
      fontSize: '0.95rem',
      borderRadius: '12px',
      
      backgroundColor: 'rgba(56, 189, 248, 0.8)',
      color: '#0f172a',
      cursor: 'pointer',
      minWidth: '150px',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(8px)'
    },
    distanceContainer: {
      textAlign: 'center',
      marginTop: '1.5rem',
      marginBottom: '1.5rem',
      background: 'rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: '1.5rem',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(12px)'
    },
    distance: {
      color: '#38bdf8',
      fontWeight: '600',
      fontSize: '1.1rem',
    },
    joke: {
      color: '#cbd5e1',
      fontStyle: 'italic',
      marginTop: '0.8rem',
    },
    nearbyContainer: {
      background: 'rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '2rem',
      marginBottom: '2.5rem',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(12px)'
    },
    nearbyTitle: {
      fontSize: '1.5rem',
      marginBottom: '1.5rem',
      color: '#e2e8f0',
      textAlign: 'center',
      fontWeight: '600',
    },
    nearbyList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1.5rem',
    },
    nearbyItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '1.5rem',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      WebkitBackdropFilter: 'blur(8px)'
    },
    nearbyName: {
      fontWeight: '600',
      color: '#e2e8f0',
      fontSize: '1.1rem',
    },
    nearbyDistance: {
      color: '#38bdf8',
      fontSize: '0.95rem',
      fontWeight: '600',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      background: 'rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '1.5rem',
      marginBottom: '2.5rem',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(12px)'
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#38bdf8',
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#94a3b8',
      marginTop: '0.3rem',
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '24px',
      zIndex: 1000,
      WebkitBackdropFilter: 'blur(12px)'
    },
    loadingText: {
      color: '#e2e8f0',
      marginBottom: '1rem',
      fontWeight: '500',
    },
    spinner: {
      border: '3px solid rgba(56, 189, 248, 0.2)',
      borderTop: '3px solid #38bdf8',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      animation: 'spin 1s linear infinite',
    },
    // Mobile styles
    mobileSection: {
      padding: '2rem 1rem',
    },
    mobileTitle: {
      fontSize: '1.8rem',
    },
    mobileSubtitle: {
      fontSize: '1rem',
      marginBottom: '2rem',
    },
    mobileMapContainer: {
      height: '350px',
      marginBottom: '1.5rem',
    },
    mobileButtonContainer: {
      gap: '1rem',
      marginBottom: '2rem',
    },
    mobileButton: {
      padding: '0.7rem 1.2rem',
      fontSize: '0.9rem',
      minWidth: '130px',
    },
    mobileDistanceContainer: {
      marginTop: '1.2rem',
      marginBottom: '1.2rem',
      padding: '1.2rem',
    },
    mobileDistance: {
      fontSize: '1rem',
    },
    mobileJoke: {
      fontSize: '0.9rem',
    },
    mobileNearbyContainer: {
      padding: '1.5rem',
      marginBottom: '2rem',
    },
    mobileNearbyTitle: {
      fontSize: '1.3rem',
      marginBottom: '1.2rem',
    },
    mobileNearbyList: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '1.2rem',
    },
    mobileNearbyItem: {
      padding: '1.2rem',
    },
    mobileNearbyName: {
      fontSize: '1rem',
    },
    mobileNearbyDistance: {
      fontSize: '0.9rem',
    },
    mobileStatsContainer: {
      padding: '1.2rem',
      marginBottom: '2rem',
    },
    mobileStatNumber: {
      fontSize: '1.3rem',
    },
    mobileStatLabel: {
      fontSize: '0.85rem',
    },
    // Small mobile styles
    smallMobileSection: {
      padding: '1.5rem 0.8rem',
    },
    smallMobileTitle: {
      fontSize: '1.6rem',
    },
    smallMobileSubtitle: {
      fontSize: '0.95rem',
      marginBottom: '1.5rem',
    },
    smallMobileMapContainer: {
      height: '300px',
      marginBottom: '1.2rem',
    },
    smallMobileButtonContainer: {
      gap: '0.8rem',
      marginBottom: '1.5rem',
    },
    smallMobileButton: {
      padding: '0.6rem 1rem',
      fontSize: '0.85rem',
      minWidth: '120px',
    },
    smallMobileDistanceContainer: {
      marginTop: '1rem',
      marginBottom: '1rem',
      padding: '1rem',
    },
    smallMobileDistance: {
      fontSize: '0.95rem',
    },
    smallMobileJoke: {
      fontSize: '0.85rem',
    },
    smallMobileNearbyContainer: {
      padding: '1.2rem',
      marginBottom: '1.5rem',
    },
    smallMobileNearbyTitle: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
    },
    smallMobileNearbyList: {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
    smallMobileNearbyItem: {
      padding: '1rem',
    },
    smallMobileNearbyName: {
      fontSize: '0.95rem',
    },
    smallMobileNearbyDistance: {
      fontSize: '0.85rem',
    },
    smallMobileStatsContainer: {
      padding: '1rem',
      marginBottom: '1.5rem',
    },
    smallMobileStatNumber: {
      fontSize: '1.2rem',
    },
    smallMobileStatLabel: {
      fontSize: '0.8rem',
    },
    // Very small mobile styles
    verySmallMobileSection: {
      padding: '1.2rem 0.6rem',
    },
    verySmallMobileTitle: {
      fontSize: '1.4rem',
    },
    verySmallMobileSubtitle: {
      fontSize: '0.9rem',
      marginBottom: '1.2rem',
    },
    verySmallMobileMapContainer: {
      height: '250px',
      marginBottom: '1rem',
    },
    verySmallMobileButtonContainer: {
      gap: '0.6rem',
      marginBottom: '1.2rem',
    },
    verySmallMobileButton: {
      padding: '0.5rem 0.8rem',
      fontSize: '0.8rem',
      minWidth: '110px',
    },
    verySmallMobileDistanceContainer: {
      marginTop: '0.8rem',
      marginBottom: '0.8rem',
      padding: '0.8rem',
    },
    verySmallMobileDistance: {
      fontSize: '0.9rem',
    },
    verySmallMobileJoke: {
      fontSize: '0.8rem',
    },
    verySmallMobileNearbyContainer: {
      padding: '1rem',
      marginBottom: '1.2rem',
    },
    verySmallMobileNearbyTitle: {
      fontSize: '1.1rem',
      marginBottom: '0.8rem',
    },
    verySmallMobileNearbyList: {
      gridTemplateColumns: '1fr',
      gap: '0.8rem',
    },
    verySmallMobileNearbyItem: {
      padding: '0.8rem',
    },
    verySmallMobileNearbyName: {
      fontSize: '0.9rem',
    },
    verySmallMobileNearbyDistance: {
      fontSize: '0.8rem',
    },
    verySmallMobileStatsContainer: {
      padding: '0.8rem',
      marginBottom: '1.2rem',
    },
    verySmallMobileStatNumber: {
      fontSize: '1.1rem',
    },
    verySmallMobileStatLabel: {
      fontSize: '0.75rem',
    }
  };
  
  // Get responsive styles
  const getResponsiveStyle = (baseStyle, mobileStyle, smallMobileStyle, verySmallMobileStyle) => {
    if (isVerySmallMobile && verySmallMobileStyle) return { ...baseStyle, ...verySmallMobileStyle };
    if (isSmallMobile && smallMobileStyle) return { ...baseStyle, ...smallMobileStyle };
    if (isMobile && mobileStyle) return { ...baseStyle, ...mobileStyle };
    return baseStyle;
  };
  
  // Map expanded style
  const mapExpandedStyle = {
    height: isVerySmallMobile ? '200px' : isSmallMobile ? '250px' : isMobile ? '300px' : 'min(80vh, 500px)'
  };
  
  return (
    <div style={glassyStyle.page}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .leaflet-container { 
            width: 100%; 
            height: 100%; 
            border-radius: 24px;
          }
          .settlers-marker { 
            font-size: 1.5rem; 
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          }
          .user-marker { 
            font-size: 1.4rem; 
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          }
          .leaflet-routing-container { 
            display: none; 
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
        <h2 style={getResponsiveStyle(
          glassyStyle.title,
          glassyStyle.mobileTitle,
          glassyStyle.smallMobileTitle,
          glassyStyle.verySmallMobileTitle
        )}>Find Us</h2>
        <p style={getResponsiveStyle(
          glassyStyle.subtitle,
          glassyStyle.mobileSubtitle,
          glassyStyle.smallMobileSubtitle,
          glassyStyle.verySmallMobileSubtitle
        )}>We're located in the Kenya Highlands. Here's how to get to Settlers Inn.</p>
        
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
            )}>{visitorCount}</div>
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
            )}>4.8★</div>
            <div style={getResponsiveStyle(
              glassyStyle.statLabel,
              glassyStyle.mobileStatLabel,
              glassyStyle.smallMobileStatLabel,
              glassyStyle.verySmallMobileStatLabel
            )}>Location Rating</div>
          </div>
          <div style={glassyStyle.statItem}>
            <div style={getResponsiveStyle(
              glassyStyle.statNumber,
              glassyStyle.mobileStatNumber,
              glassyStyle.smallMobileStatNumber,
              glassyStyle.verySmallMobileStatNumber
            )}>24/7</div>
            <div style={getResponsiveStyle(
              glassyStyle.statLabel,
              glassyStyle.mobileStatLabel,
              glassyStyle.smallMobileStatLabel,
              glassyStyle.verySmallMobileStatLabel
            )}>Service</div>
          </div>
        </div>
        
        <div style={{
          ...getResponsiveStyle(
            glassyStyle.mapContainer,
            glassyStyle.mobileMapContainer,
            glassyStyle.smallMobileMapContainer,
            glassyStyle.verySmallMobileMapContainer
          ),
          ...(mapExpanded && mapExpandedStyle)
        }}>
          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
          {isLocating && (
            <div style={glassyStyle.loadingOverlay}>
              <div>
                <div style={glassyStyle.loadingText}>Finding your location...</div>
                <div style={glassyStyle.spinner}></div>
              </div>
            </div>
          )}
        </div>
        
        <div style={getResponsiveStyle(
          glassyStyle.buttonContainer,
          glassyStyle.mobileButtonContainer,
          glassyStyle.smallMobileButtonContainer,
          glassyStyle.verySmallMobileButtonContainer
        )}>
          <button 
            onClick={locateMe} 
            style={{
              ...getResponsiveStyle(
                glassyStyle.button,
                glassyStyle.mobileButton,
                glassyStyle.smallMobileButton,
                glassyStyle.verySmallMobileButton
              ),
              background: isLocating ? 'rgba(100, 116, 139, 0.8)' : 'rgba(56, 189, 248, 0.8)',
              cursor: isLocating ? 'not-allowed' : 'pointer',
            }}
            disabled={isLocating}
          >
            {isLocating ? 'Locating...' : '📍 Locate Me'}
          </button>
          <button 
            onClick={flyToSettlers} 
            style={{
              ...getResponsiveStyle(
                glassyStyle.button,
                glassyStyle.mobileButton,
                glassyStyle.smallMobileButton,
                glassyStyle.verySmallMobileButton
              ),
              backgroundColor: 'rgba(34, 197, 94, 0.8)'
            }}
          >
            🚀 Fly to Settlers
          </button>
          <button 
            onClick={() => setMapExpanded(!mapExpanded)} 
            style={getResponsiveStyle(
              glassyStyle.button,
              glassyStyle.mobileButton,
              glassyStyle.smallMobileButton,
              glassyStyle.verySmallMobileButton
            )}
          >
            {mapExpanded ? '🗺️ Collapse Map' : '🔍 Expand Map'}
          </button>
          <button 
            onClick={openGoogleMaps} 
            style={{
              ...getResponsiveStyle(
                glassyStyle.button,
                glassyStyle.mobileButton,
                glassyStyle.smallMobileButton,
                glassyStyle.verySmallMobileButton
              ),
              backgroundColor: 'rgba(251, 191, 36, 0.8)',
              color: '#0f172a'
            }}
          >
            🌍 Google Maps
          </button>
        </div>
        
        {distance && (
          <div style={getResponsiveStyle(
            glassyStyle.distanceContainer,
            glassyStyle.mobileDistanceContainer,
            glassyStyle.smallMobileDistanceContainer,
            glassyStyle.verySmallMobileDistanceContainer
          )}>
            <p style={getResponsiveStyle(
              glassyStyle.distance,
              glassyStyle.mobileDistance,
              glassyStyle.smallMobileDistance,
              glassyStyle.verySmallMobileDistance
            )}>
              🛣️ You're approximately <strong>{distance} km</strong> away.
            </p>
            <p style={getResponsiveStyle(
              glassyStyle.joke,
              glassyStyle.mobileJoke,
              glassyStyle.smallMobileJoke,
              glassyStyle.verySmallMobileJoke
            )}>{joke}</p>
          </div>
        )}
        
        <div style={getResponsiveStyle(
          glassyStyle.nearbyContainer,
          glassyStyle.mobileNearbyContainer,
          glassyStyle.smallMobileNearbyContainer,
          glassyStyle.verySmallMobileNearbyContainer
        )}>
          <h3 style={getResponsiveStyle(
            glassyStyle.nearbyTitle,
            glassyStyle.mobileNearbyTitle,
            glassyStyle.smallMobileNearbyTitle,
            glassyStyle.verySmallMobileNearbyTitle
          )}>📍 Nearby Places</h3>
          <div style={getResponsiveStyle(
            glassyStyle.nearbyList,
            glassyStyle.mobileNearbyList,
            glassyStyle.smallMobileNearbyList,
            glassyStyle.verySmallMobileNearbyList
          )}>
            {nearbyPlaces.map((place, index) => (
              <div key={index} style={getResponsiveStyle(
                glassyStyle.nearbyItem,
                glassyStyle.mobileNearbyItem,
                glassyStyle.smallMobileNearbyItem,
                glassyStyle.verySmallMobileNearbyItem
              )}>
                <div>
                  <div style={getResponsiveStyle(
                    glassyStyle.nearbyName,
                    glassyStyle.mobileNearbyName,
                    glassyStyle.smallMobileNearbyName,
                    glassyStyle.verySmallMobileNearbyName
                  )}>{place.name}</div>
                  <div style={{ 
                    fontSize: isVerySmallMobile ? '0.7rem' : isSmallMobile ? '0.75rem' : '0.8rem', 
                    color: '#94a3b8', 
                    marginTop: '0.3rem' 
                  }}>
                    {place.type}
                  </div>
                </div>
                <div style={getResponsiveStyle(
                  glassyStyle.nearbyDistance,
                  glassyStyle.mobileNearbyDistance,
                  glassyStyle.smallMobileNearbyDistance,
                  glassyStyle.verySmallMobileNearbyDistance
                )}>{place.distance}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Location;
