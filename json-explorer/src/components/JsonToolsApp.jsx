import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import TabNavigation from './common/TabNavigation';
import JsonVastExplorer from './JsonVastExplorer/JsonVastExplorer';
import JsonDiffInspector from './JsonDiffInspector/JsonDiffInspector';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import usePersistedHistory from '../hooks/usePersistedHistory';

function JsonToolsApp() {
  // Get dark mode from MainLayout via outlet context
  const { isDarkMode } = useOutletContext() || { isDarkMode: false };
  
  // Shared state between tools
  const [activeTab, setActiveTab] = useState('explorer');
  // Use the persisted history hook instead of useState
  const [history, setHistory, showHistory, setShowHistory] = usePersistedHistory('json-explorer-history', []);
  
  // Use keyboard shortcuts
  useKeyboardShortcuts(activeTab, setActiveTab, () => {}, setShowHistory);

  return (
    <div className="w-full">
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
      
      {/* Main Content */}
      <div className="w-full">
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
    </div>
  );
}

export default JsonToolsApp; 