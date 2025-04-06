import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, isDarkMode }) => {
  return (
    <div className={`flex border-b mb-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <button
        className={`py-3 px-6 focus:outline-none ${
          activeTab === 'explorer'
            ? isDarkMode 
              ? 'border-b-2 border-blue-500 text-blue-500' 
              : 'border-b-2 border-blue-600 text-blue-600'
            : isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
        onClick={() => setActiveTab('explorer')}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          JSON VAST Explorer
        </div>
      </button>
      <button
        className={`py-3 px-6 focus:outline-none ${
          activeTab === 'comparator'
            ? isDarkMode 
              ? 'border-b-2 border-blue-500 text-blue-500' 
              : 'border-b-2 border-blue-600 text-blue-600'
            : isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
        onClick={() => setActiveTab('comparator')}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          JSON Diff Inspector
        </div>
      </button>
    </div>
  );
};

export default TabNavigation;