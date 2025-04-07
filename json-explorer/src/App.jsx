import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import JsonToolsApp from './components/JsonToolsApp';
import NotFound from './components/NotFound';

// Bestimme, ob wir uns in der Produktion oder Staging-Umgebung befinden
const isProduction = !window.location.hostname.includes('staging') && window.location.hostname !== 'localhost';
const isTestPath = window.location.pathname.includes('/json-explorer/test');

// Wir behandeln die Test-URL in Produktion wie eine Staging-Umgebung
const forceTestMode = isProduction && isTestPath;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout forceTestMode={forceTestMode} />}>
          <Route index element={<Navigate to="/json-explorer" replace />} />
          <Route path="/json-explorer" element={<JsonToolsApp />} />
          <Route path="/json-explorer/test" element={<JsonToolsApp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;