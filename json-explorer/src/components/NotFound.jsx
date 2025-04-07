import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold mb-4">404 - Seite nicht gefunden</h1>
      <p className="mb-6">Die von Ihnen gesuchte Seite existiert leider nicht.</p>
      <Link to="/json-explorer" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default NotFound; 