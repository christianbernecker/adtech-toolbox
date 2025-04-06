import { useEffect } from 'react';

const useKeyboardShortcuts = (activeTab, setActiveTab, setIsDarkMode, setShowHistory) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl (oder Cmd) + Shift + Key combination
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case 'd': // Toggle Dark Mode
            e.preventDefault();
            setIsDarkMode(prev => !prev);
            break;
          case 'h': // Show/hide history
            if (activeTab === 'explorer') {
              e.preventDefault();
              setShowHistory(prev => !prev);
            }
            break;
          case '1': // Switch to Explorer tab
            e.preventDefault();
            setActiveTab('explorer');
            break;
          case '2': // Switch to Comparator tab
            e.preventDefault();
            setActiveTab('comparator');
            break;
          default:
            break;
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab, setActiveTab, setIsDarkMode, setShowHistory]);
};

export default useKeyboardShortcuts;