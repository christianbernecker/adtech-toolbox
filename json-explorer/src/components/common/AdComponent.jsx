import React, { useEffect, useRef } from 'react';

/**
 * Generic Ad Component for displaying ads
 * 
 * @param {Object} props
 * @param {string} props.adUnitId - ID of the ad unit to display (e.g., 'div-gpt-ad-top-banner')
 * @param {string} props.className - Optional CSS class for the ad container
 * @param {Object} props.style - Optional inline styles for the ad container
 */
const AdComponent = ({ adUnitId, className = '', style = {} }) => {
  const adContainerRef = useRef(null);
  const adDisplayed = useRef(false);

  useEffect(() => {
    // Only initialize ads if they're not already displayed
    if (!adDisplayed.current && adContainerRef.current) {
      // Check if GPT is loaded
      if (window.googletag && googletag.apiReady) {
        googletag.cmd.push(function() {
          googletag.display(adUnitId);
        });
        adDisplayed.current = true;
      }
    }

    // Clean up function
    return () => {
      adDisplayed.current = false;
    };
  }, [adUnitId]);

  // Default styles based on ad unit ID
  const getDefaultStyle = () => {
    switch(adUnitId) {
      case 'div-gpt-ad-top-banner':
      case 'div-gpt-ad-bottom-banner':
        return { minHeight: '90px', textAlign: 'center', margin: '0 auto', maxWidth: '970px' };
      case 'div-gpt-ad-sidebar':
        return { minHeight: '250px', margin: '0 auto' };
      default:
        return {};
    }
  };

  // Merge default styles with passed-in styles
  const mergedStyles = { ...getDefaultStyle(), ...style };

  // Render ad container with proper ID
  return (
    <div 
      id={adUnitId} 
      ref={adContainerRef} 
      className={className}
      style={mergedStyles}
      data-ad-unit={adUnitId.replace('div-gpt-ad-', '')}
    />
  );
};

export default React.memo(AdComponent); 