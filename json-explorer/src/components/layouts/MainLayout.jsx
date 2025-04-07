import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import '../../styles/MainLayout.css';

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [showAds, setShowAds] = useState(true);

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

  // Initialize and check Usercentrics manually
  useEffect(() => {
    try {
      // Force Usercentrics initialization if not already done
      if (typeof window.UC_UI === 'undefined' || !window.UC_UI.isInitialized()) {
        console.log('Attempting to manually initialize Usercentrics');
        // Try to reload Usercentrics
        const script = document.createElement('script');
        script.src = 'https://app.usercentrics.eu/browser-ui/latest/loader.js';
        script.id = 'usercentrics-cmp-force';
        script.setAttribute('data-settings-id', '3M9Jkz5hR');
        script.setAttribute('data-tcf-enabled', '');
        document.head.appendChild(script);
        
        // Log status after a delay
        setTimeout(() => {
          console.log('Usercentrics status after manual load:', 
            window.UC_UI ? 'Available' : 'Not available',
            window.UC_UI?.isInitialized() ? 'Initialized' : 'Not initialized'
          );
        }, 2000);
      }
    } catch (error) {
      console.error('Error initializing Usercentrics:', error);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-screen-2xl mx-auto relative">
        {/* Simple header - only show STAGING badge */}
        <header className={`py-4 px-6 text-right`}>
          <div className="flex justify-end items-center">
            {window.location.hostname.includes('staging') && (
              <div className="bg-yellow-500 text-black px-3 py-1 rounded-md font-bold">
                STAGING
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
                <div id="div-gpt-ad-left" className="mx-auto" style={{ width: '160px', height: '600px' }}>
                  {/* Ad will be loaded here */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 border border-dashed border-gray-300">
                    <span className="text-gray-400 text-sm text-center p-2">Ad Space</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            <Outlet context={{ isDarkMode, toggleDarkMode }} />
            
            {/* Bottom Ad Banner - positioned inside content div after the main content */}
            {showAds && (
              <div className="w-full mt-8">
                <div id="div-gpt-ad-bottom" className="mx-auto" style={{ width: '728px', maxWidth: '100%', height: '90px' }}>
                  {/* Ad will be loaded here */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 border border-dashed border-gray-300">
                    <span className="text-gray-400 text-sm text-center">Ad Space</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Ad Banner */}
          {showAds && (
            <div className="w-full lg:w-auto lg:h-screen overflow-hidden" style={{ minWidth: '300px' }}>
              <div className="sticky top-0 pt-4">
                <div id="div-gpt-ad-right" className="mx-auto" style={{ width: '300px', height: '600px' }}>
                  {/* Ad will be loaded here */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 border border-dashed border-gray-300">
                    <span className="text-gray-400 text-sm text-center p-2">Ad Space</span>
                  </div>
                </div>
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
              <a href="/legal/imprint.html" target="_blank" rel="noopener noreferrer" 
                className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Imprint
              </a>
              <a href="/legal/privacy.html" target="_blank" rel="noopener noreferrer" 
                className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout; 