// Google Publisher Tag integration
window.googletag = window.googletag || { cmd: [] };

// GPT configuration
googletag.cmd.push(function() {
  // Define ad slots for responsive design
  
  // Sidebar ad - responsive for sidebar sizes  
  googletag
    .defineSlot('/21802911858/adtech-toolbox-sidebar', [[300, 250], [300, 600]], 'div-gpt-ad-sidebar')
    .addService(googletag.pubads())
    .setTargeting('position', ['sidebar'])
    .setTargeting('page', ['json_tools']);
    
  // Bottom banner - responsive for desktop sizes
  googletag
    .defineSlot('/21802911858/adtech-toolbox-bottom', [[728, 90], [970, 90], [970, 250]], 'div-gpt-ad-bottom-banner')
    .addService(googletag.pubads())
    .setTargeting('position', ['bottom'])
    .setTargeting('page', ['json_tools']);

  // Set common targeting parameters
  googletag.pubads().setTargeting('tool', ['json-explorer']);
  googletag.pubads().setTargeting('site', ['adtech-toolbox']);
  
  // Add language targeting
  googletag.pubads().setTargeting('lang', ['en']);
  
  // Device targeting
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  googletag.pubads().setTargeting('device', [isMobile ? 'mobile' : 'desktop']);
  
  // Pass page URL parameters
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const campaign = urlParams.get('utm_campaign');
    const source = urlParams.get('utm_source');
    
    if (campaign) {
      googletag.pubads().setTargeting('utm_campaign', [campaign]);
    }
    if (source) {
      googletag.pubads().setTargeting('utm_source', [source]);
    }
  } catch (e) {
    console.warn('Error processing URL parameters:', e);
  }

  // Enable SRA (Single Request Architecture)
  googletag.pubads().enableSingleRequest();
  
  // Enable lazy loading
  googletag.pubads().enableLazyLoad({
    fetchMarginPercent: 100,
    renderMarginPercent: 50,
    mobileScaling: 2.0
  });
  
  // GDPR compliance
  if (typeof __tcfapi === 'function') {
    googletag.pubads().disableInitialLoad();
    
    // Set personalized ads based on user consent
    __tcfapi('addEventListener', 2, function(tcData, success) {
      if (success && tcData.eventStatus === 'tcloaded') {
        // Check if user granted consent for personalized ads
        if (tcData.purpose.consents[1]) {
          // Purpose 1 is personalized ads
          googletag.pubads().setRequestNonPersonalizedAds(0); // 0 = personalized
        } else {
          googletag.pubads().setRequestNonPersonalizedAds(1); // 1 = non-personalized
        }
        
        googletag.pubads().refresh();
        
        // Remove event listener
        __tcfapi('removeEventListener', 2, function() {}, tcData.listenerId);
      }
    });
  }

  // Enable services
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