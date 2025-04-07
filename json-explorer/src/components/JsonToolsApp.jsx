import { useState } from 'react';
import TabNavigation from './common/TabNavigation';
import JsonVastExplorer from './JsonVastExplorer/JsonVastExplorer';
import JsonDiffInspector from './JsonDiffInspector/JsonDiffInspector';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import usePersistedHistory from '../hooks/usePersistedHistory';
import Footer from './common/Footer';
import AdComponent from './common/AdComponent';

function JsonToolsApp() {
  // Shared state between tools
  const [activeTab, setActiveTab] = useState('explorer');
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Use the persisted history hook instead of useState
  const [history, setHistory, showHistory, setShowHistory] = usePersistedHistory('json-explorer-history', []);
  
  // Use keyboard shortcuts
  useKeyboardShortcuts(activeTab, setActiveTab, setIsDarkMode, setShowHistory);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white'} transition-colors duration-200`}>
      {/* STAGING BANNER - Only show on staging domain */}
      {window.location.hostname.includes('staging') && (
        <div className="w-full bg-amber-600 text-white text-center py-1.5 font-semibold shadow-md fixed top-0 left-0 right-0 z-50 flex items-center justify-center">
          <span className="mr-2">⚠️</span> 
          STAGING ENVIRONMENT 
          <span className="ml-2">⚠️</span>
        </div>
      )}
      
      <div className={`p-6 w-full max-w-[1440px] mx-auto ${window.location.hostname.includes('staging') ? 'mt-10' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="mr-3 bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              JSON Tools
            </h1>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Explorer & Diff Inspector</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowHistory(prev => !prev)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition`}
            title="Show/Hide History (Ctrl+Shift+H)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {showHistory ? 'Hide' : 'Show'} History ({history.length})
          </button>
          
          <button 
            onClick={() => setIsDarkMode(prev => !prev)}
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition flex items-center ml-auto`}
            title="Toggle Dark Mode (Ctrl+Shift+D)"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <TabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
      />
      
      {/* Keyboard Shortcuts Help */}
      <div className={`mb-4 p-3 rounded-lg text-sm ${
        isDarkMode ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-blue-50 text-blue-800 border border-blue-100'
      }`}>
        <strong>Keyboard Shortcuts: </strong> 
        {activeTab === 'explorer' ? (
          <span>
            Ctrl+Shift+F (Format), 
            Ctrl+Shift+L (Clear), 
            Ctrl+Shift+H (History), 
            Ctrl+Shift+D (Dark Mode), 
            Ctrl+Shift+1/2 (Switch Tabs)
          </span>
        ) : (
          <span>
            Ctrl+Shift+C (Compare), 
            Ctrl+Shift+L (Clear), 
            Ctrl+Shift+D (Dark Mode), 
            Ctrl+Shift+1/2 (Switch Tabs)
          </span>
        )}
      </div>
      
      {/* Main Content with Sidebar Ad */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Active Tool Content */}
          {activeTab === 'explorer' ? (
            <JsonVastExplorer 
              isDarkMode={isDarkMode} 
              history={history}
              setHistory={setHistory}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
          ) : (
            <JsonDiffInspector 
              isDarkMode={isDarkMode} 
              history={history}
              setHistory={setHistory}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
          )}
        </div>
        
        {/* Sidebar Ad */}
        <div className="md:w-[300px] min-h-[600px] self-start sticky top-6">
          <AdComponent adUnitId="div-gpt-ad-sidebar" />
        </div>
      </div>
      
      {/* Bottom Ad Banner */}
      <div className="mt-8">
        <AdComponent adUnitId="div-gpt-ad-bottom-banner" />
      </div>
      
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default JsonToolsApp; 