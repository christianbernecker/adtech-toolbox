import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import JsonToolsApp from './components/JsonToolsApp';
import NotFound from './components/NotFound';

// Grundlegende Umgebungserkennung
const isProduction = !window.location.hostname.includes('staging') && window.location.hostname !== 'localhost';

// Bestimme, ob wir auf der Test-URL sind
const isTestPath = () => {
  const path = window.location.pathname;
  return path.endsWith('/test') || path.includes('/test/');
};

// Auth-Prüfung für Test-URL
const isAuthorized = () => {
  // Geheimer Key für die Test-URL
  const SECRET_KEY = 'adtech2023';
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('auth') && urlParams.get('auth') === SECRET_KEY;
};

// Debug-Info in Konsole ausgeben
console.log('Current Path:', window.location.pathname);
console.log('Is Test Path:', isTestPath());
console.log('Is Authorized:', isAuthorized());

// In Produktion Test-Modus nur mit Auth, in Entwicklung immer
const forceTestMode = isTestPath() && (isAuthorized() || !isProduction);
console.log('Test Mode Activated:', forceTestMode);

const App = () => {
  // Verwende vollen Pfad für Assets
  useEffect(() => {
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (link.href.startsWith('/')) {
        // Füge vollen Pfad hinzu, wenn nötig
        const fullPath = window.location.origin + link.href;
        link.href = fullPath;
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainLayout forceTestMode={forceTestMode} />}>
          <Route index element={<JsonToolsApp />} />
          <Route path="test" element={<JsonToolsApp />} />
          <Route path="json-explorer" element={<JsonToolsApp />} />
          <Route path="json-explorer/test" element={<JsonToolsApp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;