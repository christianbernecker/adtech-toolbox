import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import '../../styles/MainLayout.css';

// Test-Anzeigen Komponenten
const TestAdLeft = () => (
  <div className="mx-auto" style={{ width: '160px', height: '600px', background: 'linear-gradient(135deg, #4285f4, #34a853)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>TEST AD - LEFT</div>
    <div style={{ fontSize: '12px' }}>160x600</div>
    <div style={{ fontSize: '10px', position: 'absolute', bottom: '10px' }}>/6355419/Travel/Europe/France/Paris</div>
  </div>
);

const TestAdRight = () => (
  <div className="mx-auto" style={{ width: '300px', height: '600px', background: 'linear-gradient(135deg, #ea4335, #fbbc05)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>TEST AD - RIGHT</div>
    <div style={{ fontSize: '12px' }}>300x600</div>
    <div style={{ fontSize: '10px', position: 'absolute', bottom: '10px' }}>/6355419/Travel/Europe/France/Paris</div>
  </div>
);

const TestAdBottom = () => (
  <div className="mx-auto" style={{ width: '728px', maxWidth: '100%', height: '90px', background: 'linear-gradient(90deg, #fbbc05, #ea4335)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
    <div style={{ fontWeight: 'bold' }}>TEST AD - BOTTOM</div>
    <div style={{ fontSize: '10px' }}>728x90</div>
    <div style={{ fontSize: '9px', position: 'absolute', bottom: '5px' }}>/6355419/Travel/Europe/France/Paris</div>
  </div>
);

const MainLayout = ({ forceTestMode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [showAds, setShowAds] = useState(true);

  // Bestimme, ob wir Test-Anzeigen anzeigen sollen (Staging oder forceTestMode)
  const isStaging = window.location.hostname.includes('staging') || window.location.hostname === 'localhost' || forceTestMode;

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Check for no_ads parameter in URL
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('no_ads')) {
        setShowAds(false);
      }
    } catch (error) {
      console.error('Error checking URL parameters:', error);
    }
  }, []);

  // Usercentrics-Initialisierung ist jetzt zentral in index.html

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-screen-2xl mx-auto relative">
        {/* Simple header - only show STAGING badge */}
        <header className={`py-4 px-6 text-right`}>
          <div className="flex justify-end items-center">
            {(window.location.hostname.includes('staging') || forceTestMode) && (
              <div className="bg-yellow-500 text-black px-3 py-1 rounded-md font-bold">
                {forceTestMode ? 'TEST MODE' : 'STAGING'}
              </div>
            )}
            {/* Dark mode toggle removed from here - will be in JsonToolsApp */}
          </div>
        </header>
        
        <div className="flex flex-wrap lg:flex-nowrap relative">
          {/* Left Ad Banner */}
          {showAds && (
            <div className="w-full lg:w-auto lg:h-screen overflow-hidden" style={{ minWidth: '160px' }}>
              <div className="sticky top-0 pt-4">
                {isStaging ? (
                  <TestAdLeft />
                ) : (
                  <div id="div-gpt-ad-left" className="mx-auto" style={{ width: '160px', height: '600px' }}>
                    {/* Leerer Container für GPT - kein Platzhalter mehr, damit GPT richtig rendern kann */}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            <Outlet context={{ isDarkMode, toggleDarkMode }} />
            
            {/* Bottom Ad Banner - positioned inside content div after the main content with minimum 200px margin */}
            {showAds && (
              <div className="w-full" style={{ marginTop: '200px' }}>
                {isStaging ? (
                  <TestAdBottom />
                ) : (
                  <div id="div-gpt-ad-bottom" className="mx-auto" style={{ width: '728px', maxWidth: '100%', height: '90px' }}>
                    {/* Leerer Container für GPT - kein Platzhalter mehr, damit GPT richtig rendern kann */}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Right Ad Banner */}
          {showAds && (
            <div className="w-full lg:w-auto lg:h-screen overflow-hidden" style={{ minWidth: '300px' }}>
              <div className="sticky top-0 pt-4">
                {isStaging ? (
                  <TestAdRight />
                ) : (
                  <div id="div-gpt-ad-right" className="mx-auto" style={{ width: '300px', height: '600px' }}>
                    {/* Leerer Container für GPT - kein Platzhalter mehr, damit GPT richtig rendern kann */}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <footer className={`py-4 px-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} AdTech Toolbox
            </div>
            <div className="flex space-x-4">
              <Link to="/legal/imprint"
                className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Imprint
              </Link>
              <Link to="/legal/privacy"
                className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout; 