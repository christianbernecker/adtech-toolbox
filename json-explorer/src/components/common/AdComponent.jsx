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
  const adRef = useRef(null);
  const isAdBlockerDetected = useRef(false);

  useEffect(() => {
    // Check if GPT is defined
    const isGptDefined = typeof window.googletag !== 'undefined';
    
    if (!isGptDefined) {
      console.log('GPT not loaded, possibly blocked by ad blocker');
      isAdBlockerDetected.current = true;
      return;
    }

    // Check if the ad container is created
    const adContainer = document.getElementById(adUnitId);
    if (!adContainer) {
      console.log('Ad container not found:', adUnitId);
      return;
    }

    // Check URL for no_ads parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('no_ads')) {
      console.log('No ads mode enabled via URL parameter');
      return;
    }

    try {
      // Display the ad
      if (isGptDefined) {
        window.googletag.cmd.push(function() {
          window.googletag.display(adUnitId);
        });
      }
    } catch (error) {
      console.error('Error displaying ad:', error);
    }
  }, [adUnitId]);

  // Check for ad blocker after a delay
  useEffect(() => {
    const checkAdBlocker = setTimeout(() => {
      if (adRef.current) {
        const adIframes = adRef.current.querySelectorAll('iframe');
        if (adIframes.length === 0) {
          isAdBlockerDetected.current = true;
          adRef.current.classList.add('ad-blocked');
        }
      }
    }, 2000);

    return () => clearTimeout(checkAdBlocker);
  }, []);

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

  // Add a border in development/staging to visualize ad slots better
  if (window.location.hostname.includes('staging') || window.location.hostname.includes('localhost')) {
    mergedStyles.border = '1px dashed #ccc';
    mergedStyles.backgroundColor = '#f9f9f9';
  }

  // Render ad container with proper ID
  return (
    <div ref={adRef} className={`ad-container ${className}`} style={mergedStyles} data-ad-unit={adUnitId.replace('div-gpt-ad-', '')}>
      <div id={adUnitId} className="ad-unit">
        {/* GPT Ad will be inserted here */}
      </div>
    </div>
  );
};

export default React.memo(AdComponent); 