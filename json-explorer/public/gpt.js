// Google Publisher Tag integration
window.googletag = window.googletag || { cmd: [] };

// Define ad sizes
const adSize = [[728, 90], [300, 250], [300, 600], [320, 50]];

// Define ad units
const adUnits = [{
  code: 'div-gpt-ad-1',
  mediaTypes: {
    banner: {
      sizes: adSize,
    }
  },
  bids: [{
    bidder: 'appnexus',
    params: {
      placementId: 13144370 // Your AppNexus placement ID
    }
  }]
}];

// Configure Prebid
window.pbjs = window.pbjs || {};
window.pbjs.que = window.pbjs.que || [];

// Flag to track if Usercentrics has been checked
let usercentricsChecked = false;

// Variable to store whether personalized ads are enabled
let personalizedAdsEnabled = true;

window.googletag.cmd.push(function() {
  // Check if Usercentrics is available
  if (window.UC_UI && !usercentricsChecked) {
    // Disable initial loading of ads
    googletag.pubads().disableInitialLoad();

    // If Usercentrics has already loaded and user made choices
    if (window.UC_UI.isInitialized()) {
      const hasMarketingConsent = window.UC_UI.getServicesBaseInfo().some(
        service => service.id === 'BJz7qNsdj-7' && service.consent.status === true
      );
      
      // Set personalized ads based on consent
      personalizedAdsEnabled = hasMarketingConsent;
      googletag.pubads().setRequestNonPersonalizedAds(hasMarketingConsent ? 0 : 1);
      usercentricsChecked = true;
    }

    // Listen for Usercentrics events
    window.addEventListener('UC_UI_INITIALIZED', function() {
      const hasMarketingConsent = window.UC_UI.getServicesBaseInfo().some(
        service => service.id === 'BJz7qNsdj-7' && service.consent.status === true
      );
      
      // Set personalized ads based on consent
      personalizedAdsEnabled = hasMarketingConsent;
      googletag.pubads().setRequestNonPersonalizedAds(hasMarketingConsent ? 0 : 1);
      usercentricsChecked = true;
      
      // Refresh ads
      if (window.pbjs && window.pbjs.setTargetingForGPTAsync) {
        window.pbjs.setTargetingForGPTAsync();
        googletag.pubads().refresh();
      }
    });

    // Update consent when user updates
    window.addEventListener('UC_UI_CMP_EVENT', function(event) {
      if (event.detail.type === 'ACCEPT_ALL' || event.detail.type === 'DENY_ALL' || event.detail.type === 'SAVE') {
        const hasMarketingConsent = window.UC_UI.getServicesBaseInfo().some(
          service => service.id === 'BJz7qNsdj-7' && service.consent.status === true
        );
        
        // Update personalized ads setting
        personalizedAdsEnabled = hasMarketingConsent;
        googletag.pubads().setRequestNonPersonalizedAds(hasMarketingConsent ? 0 : 1);
        
        // Refresh ads
        if (window.pbjs && window.pbjs.setTargetingForGPTAsync) {
          window.pbjs.setTargetingForGPTAsync();
          googletag.pubads().refresh();
        }
      }
    });
  } else {
    // Fallback to TCF API if Usercentrics not available
    try {
      // Check if the TCF API exists
      if (typeof window.__tcfapi === 'function') {
        window.__tcfapi('addEventListener', 2, function(tcData, success) {
          if (success && tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete') {
            // Check for consent for personalized ads (Purpose 1 - Store and/or access information on a device)
            const hasConsent = tcData.purpose && tcData.purpose.consents && tcData.purpose.consents[1];
            personalizedAdsEnabled = hasConsent;
            googletag.pubads().setRequestNonPersonalizedAds(hasConsent ? 0 : 1);
          }
        });
      }
    } catch (e) {
      console.error('Error in TCF API integration:', e);
    }
  }

  // Define slot
  googletag.defineSlot('/19968336/header-bid-tag-0', adSize, 'div-gpt-ad-1')
    .addService(googletag.pubads());

  // Configure ad settings
  googletag.pubads().enableSingleRequest();
  googletag.pubads().collapseEmptyDivs();
  googletag.enableServices();
});

// Function to request and display ads
function refreshAds() {
  googletag.cmd.push(function() {
    googletag.pubads().refresh();
  });
}

// Function to create GPT ad slots after Prebid auction
function initAdServer() {
  if (window.pbjs && pbjs.initAdserverSet) return;
  
  // Set flag to avoid duplicate calls
  if (window.pbjs) {
    pbjs.initAdserverSet = true;
  }
  
  googletag.cmd.push(function() {
    // Set targeting from Prebid
    if (window.pbjs) {
      pbjs.que.push(function() {
        pbjs.setTargetingForGPTAsync();
        console.log('Prebid targeting set for GPT');
      });
    }
    
    // Request initial ads
    googletag.pubads().refresh();
  });
}

// Set timeout for Prebid auction
setTimeout(function() {
  initAdServer();
}, 2000); // 2 second timeout (optimizing from 3 to 2 seconds for better page speed)

// Add support for ad blockers
window.addEventListener('load', function() {
  setTimeout(function() {
    const adContainers = document.querySelectorAll('[id^="div-gpt-ad-"]');
    
    adContainers.forEach(function(container) {
      // Check if the ad container is empty after a delay
      if (container.innerHTML.trim() === '' || 
          container.querySelector('iframe') === null) {
        
        // Replace with a message for users with ad blockers
        const placeholder = document.createElement('div');
        placeholder.style.width = '100%';
        placeholder.style.height = '100%';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.textAlign = 'center';
        placeholder.style.backgroundColor = '#f9f9f9';
        placeholder.style.border = '1px dashed #ccc';
        placeholder.style.padding = '20px';
        placeholder.style.boxSizing = 'border-box';
        placeholder.style.fontSize = '14px';
        placeholder.style.color = '#666';
        
        placeholder.innerHTML = 'This tool is supported by ads.<br>Please consider disabling your ad blocker.';
        
        container.appendChild(placeholder);
      }
    });
  }, 3000);
}); 