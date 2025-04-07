import { useState, useEffect } from 'react';

/**
 * A custom hook that persists history in localStorage
 * @param {string} key - The localStorage key to store history
 * @param {Array} initialValue - The initial history value if none in localStorage
 * @returns {Array} - [history, setHistory, showHistory, setShowHistory]
 */
const usePersistedHistory = (key, initialValue = []) => {
  // Initialize state from localStorage or with initialValue
  const [history, setHistory] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error loading history from localStorage:", error);
      return initialValue;
    }
  });

  // State to control visibility of history panel
  const [showHistory, setShowHistory] = useState(false);

  // Update localStorage when history changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving history to localStorage:", error);
    }
  }, [key, history]);

  return [history, setHistory, showHistory, setShowHistory];
};

export default usePersistedHistory; 