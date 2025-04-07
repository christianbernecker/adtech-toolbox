import React, { useState, useRef, useEffect, useCallback } from 'react';

const SearchPanel = React.memo(({ targetRef, contentType, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(-1);
  const searchInputRef = useRef(null);
  
  const performSearch = useCallback(() => {
    if (!targetRef.current || !searchTerm.trim()) return;
    
    const highlightedRows = targetRef.current.querySelectorAll('.bg-yellow-100, .bg-yellow-900');
    highlightedRows.forEach(row => {
      row.classList.remove('bg-yellow-100');
      row.classList.remove('bg-yellow-900');
    });
    
    const rows = Array.from(targetRef.current.querySelectorAll('tr'));
    
    const results = rows.filter(row => 
      row.textContent.toLowerCase().includes(searchTerm.toLowerCase())
    ).map((row, rowIndex) => ({
      element: row,
      rowIndex
    }));
    
    setSearchResults(results);
    
    if (results.length > 0) {
      setCurrentResultIndex(0);
      highlightResult(results[0]);
    }
  }, [targetRef, searchTerm]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch();
      } else {
        setSearchResults([]);
        setCurrentResultIndex(-1);
      }
    }, 300);
    
    return () => clearTimeout(handler);
  }, [searchTerm, performSearch]);
  
  const highlightResult = useCallback((result) => {
    if (!result || !result.element) return;
    
    const container = targetRef.current;
    if (container) {
      const highlightedRows = container.querySelectorAll('.bg-yellow-100, .bg-yellow-900');
      highlightedRows.forEach(row => {
        row.classList.remove('bg-yellow-100');
        row.classList.remove('bg-yellow-900');
      });
    }
    
    result.element.classList.add(isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100');
    
    result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [targetRef, isDarkMode]);
  
  const goToNextResult = useCallback(() => {
    if (searchResults.length === 0) return;
    
    const newIndex = (currentResultIndex + 1) % searchResults.length;
    setCurrentResultIndex(newIndex);
    highlightResult(searchResults[newIndex]);
  }, [searchResults, currentResultIndex, highlightResult]);
  
  const goToPreviousResult = useCallback(() => {
    if (searchResults.length === 0) return;
    
    const newIndex = (currentResultIndex - 1 + searchResults.length) % searchResults.length;
    setCurrentResultIndex(newIndex);
    highlightResult(searchResults[newIndex]);
  }, [searchResults, currentResultIndex, highlightResult]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goToNextResult();
    } else if (e.key === 'Escape') {
      setSearchTerm('');
    }
  }, [goToNextResult]);
  
  return (
    <div className={`flex items-center space-x-2 w-full p-2 rounded-lg ${
      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
    }`}>
      <div className="relative flex-grow">
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Search in ${contentType}...`}
          className={`w-full p-2 border rounded-lg pr-20 focus:outline-none ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
        {searchResults.length > 0 && (
          <div className={`absolute right-2 top-2 text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {currentResultIndex + 1}/{searchResults.length}
          </div>
        )}
      </div>
      <button
        onClick={goToPreviousResult}
        disabled={searchResults.length === 0}
        className={`p-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 ${
          isDarkMode 
            ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
            : 'bg-gray-200'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNextResult}
        disabled={searchResults.length === 0}
        className={`p-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 ${
          isDarkMode 
            ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
            : 'bg-gray-200'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
});

export default SearchPanel;