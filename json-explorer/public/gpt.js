// Google Publisher Tag integration
window.googletag = window.googletag || { cmd: [] };

// GPT configuration
googletag.cmd.push(function() {
  // Define ad slots for responsive design
  
  // Top banner - responsive for desktop sizes
  googletag
    .defineSlot('/21802911858/adtech-toolbox-top', [[728, 90], [970, 90], [970, 250]], 'div-gpt-ad-top-banner')
    .addService(googletag.pubads())
    .setTargeting('position', ['top']);
    
  // Sidebar ad - responsive for sidebar sizes  
  googletag
    .defineSlot('/21802911858/adtech-toolbox-sidebar', [[300, 250], [300, 600]], 'div-gpt-ad-sidebar')
    .addService(googletag.pubads())
    .setTargeting('position', ['sidebar']);
    
  // Bottom banner - responsive for desktop sizes
  googletag
    .defineSlot('/21802911858/adtech-toolbox-bottom', [[728, 90], [970, 90]], 'div-gpt-ad-bottom-banner')
    .addService(googletag.pubads())
    .setTargeting('position', ['bottom']);

  // Set common targeting parameters
  googletag.pubads().setTargeting('tool', ['json-explorer']);
  googletag.pubads().setTargeting('site', ['adtech-toolbox']);

  // Enable SRA (Single Request Architecture)
  googletag.pubads().enableSingleRequest();
  
  // Enable lazy loading
  googletag.pubads().enableLazyLoad({
    fetchMarginPercent: 100,
    renderMarginPercent: 50,
    mobileScaling: 2.0
  });

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
      });
    }
    
    // Request initial ads
    googletag.pubads().refresh();
  });
}

// Set timeout for Prebid auction
setTimeout(function() {
  initAdServer();
}, 3000); // 3 second timeout 