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
      // Safe access to googletag
      if (window.googletag) {
        window.googletag.cmd = window.googletag.cmd || [];
        window.googletag.cmd.push(function() {
          try {
            window.googletag.display(adUnitId);
            adDisplayed.current = true;
            console.log(`Ad displayed: ${adUnitId}`);
          } catch (err) {
            console.error(`Error displaying ad ${adUnitId}:`, err);
          }
        });
      } else {
        // Add placeholder for when GPT is not loaded
        console.warn(`GPT not loaded for ${adUnitId}`);
        const placeholder = document.createElement('div');
        placeholder.style.background = '#f0f0f0';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.width = '100%';
        placeholder.style.height = '100%';
        placeholder.style.minHeight = adUnitId.includes('sidebar') ? '250px' : '90px';
        placeholder.innerText = 'Ad placeholder';
        
        // Clear and append placeholder
        if (adContainerRef.current) {
          adContainerRef.current.innerHTML = '';
          adContainerRef.current.appendChild(placeholder);
        }
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

  // Add a border in development/staging to visualize ad slots better
  if (window.location.hostname.includes('staging') || window.location.hostname.includes('localhost')) {
    mergedStyles.border = '1px dashed #ccc';
    mergedStyles.backgroundColor = '#f9f9f9';
  }

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