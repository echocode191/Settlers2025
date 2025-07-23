import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import 'leaflet/dist/leaflet.css'; // ✅ Leaflet map styling

// ✅ Register PWA Service Worker
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    const userConfirmed = window.confirm('⚡ A new version is available. Refresh now to update?');
    if (userConfirmed) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('✅ App is ready to work offline!');
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
