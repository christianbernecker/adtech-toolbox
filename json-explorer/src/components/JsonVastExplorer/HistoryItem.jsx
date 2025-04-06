import React, { useState, useMemo } from 'react';

const HistoryItem = React.memo(({ item, index, onRestore, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const preview = useMemo(() => {
    if (item.type === 'json_vast') {
      const jsonStr = JSON.stringify(item.jsonContent);
      return jsonStr.length > 50 ? jsonStr.substring(0, 50) + '...' : jsonStr;
    } else if (item.type === 'json') {
      const jsonStr = JSON.stringify(item.content);
      return jsonStr.length > 50 ? jsonStr.substring(0, 50) + '...' : jsonStr;
    }
    return 'No preview available';
  }, [item]);
  
  return (
    <div className={`border rounded-lg mb-2 overflow-hidden ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div 
        className={`flex items-center justify-between p-3 cursor-pointer ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <span className={`font-semibold mr-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>#{index + 1}</span>
          <span className={`px-2 py-1 text-xs rounded-full ${
            item.type === 'json'
              ? isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
              : isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
          }`}>
            {item.type === 'json' ? 'JSON' : 'JSON & VAST'}
          </span>
          <span className={`ml-2 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>{new Date(item.timestamp).toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestore(item);
            }}
            className={`mr-2 px-2 py-1 rounded-lg text-sm transition ${
              isDarkMode
                ? 'bg-green-900 text-green-200 hover:bg-green-800'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Restore
          </button>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''} ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className={`p-3 border-t ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <pre className={`text-xs font-mono whitespace-pre-wrap overflow-x-auto ${
            isDarkMode ? 'text-gray-300' : ''
          }`}>{preview}</pre>
          {item.type === 'json_vast' && (
            <div className={`mt-2 pt-2 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <span className={`text-xs font-semibold ${
                isDarkMode ? 'text-gray-300' : ''
              }`}>VAST Path:</span> 
              <span className={`ml-1 text-xs ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>{item.vastPath}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default HistoryItem;