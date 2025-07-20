import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import 'leaflet/dist/leaflet.css'; // ✅ Needed for map styling
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New version available. Refresh?')) {
      updateSW(true);
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
