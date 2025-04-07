import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`mt-16 py-6 border-t ${
      isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AdTech Toolbox. Alle Rechte vorbehalten.
          </div>
          <div className="flex space-x-6">
            <a 
              href="/legal/imprint.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
            >
              Impressum
            </a>
            <a 
              href="/legal/privacy.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
            >
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 