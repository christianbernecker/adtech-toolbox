// Google Publisher Tag integration
window.googletag = window.googletag || { cmd: [] };

// Define ad sizes for each position
const adSizes = {
  left: [[160, 600], [120, 600]],  // Skyscraper formats
  right: [[300, 600], [300, 250]], // Large rectangle and medium rectangle
  bottom: [[728, 90], [970, 90], [320, 50], [970, 250]] // Leaderboard, mobile banner, large leaderboard
};

// Define ad units for each position
const adUnits = [
  {
    code: 'div-gpt-ad-left',
    mediaTypes: {
      banner: {
        sizes: adSizes.left
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13144370 // Your AppNexus placement ID
      }
    }]
  },
  {
    code: 'div-gpt-ad-right',
    mediaTypes: {
      banner: {
        sizes: adSizes.right
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13144370 // Your AppNexus placement ID
      }
    }]
  },
  {
    code: 'div-gpt-ad-bottom',
    mediaTypes: {
      banner: {
        sizes: adSizes.bottom
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13144370 // Your AppNexus placement ID
      }
    }]
  }
];

// Configure Prebid
window.pbjs = window.pbjs || {};
window.pbjs.que = window.pbjs.que || [];

// Flag to track if Usercentrics has been checked
let usercentricsChecked = false;

// Variable to store whether personalized ads are enabled
let personalizedAdsEnabled = true;

// Check URL for no_ads parameter
const urlParams = new URLSearchParams(window.location.search);
const noAds = urlParams.has('no_ads');

// Debug function for Usercentrics
function logUsercentricsStatus() {
  console.log('UC_UI available:', !!window.UC_UI);
  if (window.UC_UI) {
    console.log('UC_UI initialized:', window.UC_UI.isInitialized());
    if (window.UC_UI.isInitialized()) {
      const services = window.UC_UI.getServicesBaseInfo();
      console.log('Services:', services);
      const hasMarketingConsent = services.some(
        service => service.id === 'BJz7qNsdj-7' && service.consent.status === true
      );
      console.log('Marketing consent:', hasMarketingConsent);
    }
  }
}

// Don't initialize ads if no_ads parameter is present
if (noAds) {
  console.log('No ads mode enabled by URL parameter');
} else {
  // Check Usercentrics on page load
  window.addEventListener('load', function() {
    setTimeout(logUsercentricsStatus, 1000);
    setTimeout(logUsercentricsStatus, 3000);
  });

  // Initialize GPT
  window.googletag.cmd.push(function() {
    console.log('GPT initialization started');
    
    // Bestimme, ob wir uns in der Staging- oder Produktionsumgebung befinden
    const isStaging = window.location.hostname.includes('staging') || window.location.hostname === 'localhost';
    const adUnitPrefix = isStaging ? '/6355419/Travel/Europe/France/Paris' : '/19968336/adtech-toolbox';
    
    console.log('🏗️ Using ad unit prefix:', adUnitPrefix);
    
    // Define ad slots for each position
    googletag.defineSlot(`${adUnitPrefix}-left`, adSizes.left, 'div-gpt-ad-left')
      .addService(googletag.pubads())
      .setTargeting('position', ['left']);
      
    googletag.defineSlot(`${adUnitPrefix}-right`, adSizes.right, 'div-gpt-ad-right')
      .addService(googletag.pubads())
      .setTargeting('position', ['right']);
      
    googletag.defineSlot(`${adUnitPrefix}-bottom`, adSizes.bottom, 'div-gpt-ad-bottom')
      .addService(googletag.pubads())
      .setTargeting('position', ['bottom']);
    
    // Set common targeting parameters
    googletag.pubads().setTargeting('tool', ['json-explorer']);
    googletag.pubads().setTargeting('site', ['adtech-toolbox']);
    
    // Add environment targeting
    googletag.pubads().setTargeting('env', [isStaging ? 'staging' : 'production']);
    
    // Im Staging-Modus überspringen wir die Usercentrics/TCF-Checks und laden direkt
    if (isStaging) {
      console.log('🚀 Staging-Modus: Direkte Anzeigenladung ohne CMP-Checks');
      
      // Personalisierte Anzeigen aktivieren - in Staging ist das ok
      googletag.pubads().setRequestNonPersonalizedAds(0);
      
      // Dienste aktivieren
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs(true);
      googletag.pubads().disableInitialLoad(); // Erst nach dem Prebid-Timeout laden
      
      // Keine Lazy Loading im Test-Modus
      googletag.enableServices();
      
      console.log('✅ GPT-Dienste für Staging aktiviert');
      
      // Timeout für Prebid ist in Staging kürzer
      setTimeout(function() {
        console.log('🔄 Sofortiges Laden der Anzeigen in Staging');
        googletag.pubads().refresh();
        
        // Nach kurzer Verzögerung erneut nachladen
        setTimeout(function() {
          console.log('🔄 Zweiter Versuch: Anzeigen neu laden');
          googletag.pubads().refresh();
          
          // Ad-Container markieren, um zu zeigen, dass die Anzeigen geladen werden sollten
          document.querySelectorAll('[id^="div-gpt-ad-"]').forEach(container => {
            const marker = document.createElement('div');
            marker.style.position = 'absolute';
            marker.style.top = '0';
            marker.style.left = '0';
            marker.style.background = 'rgba(0,255,0,0.2)';
            marker.style.color = 'green';
            marker.style.fontSize = '10px';
            marker.style.padding = '2px';
            marker.style.zIndex = '9999';
            marker.textContent = 'Ad should load here';
            
            // Relativen Container erstellen, falls er nicht existiert
            const parent = container.parentElement;
            if (parent && window.getComputedStyle(parent).position === 'static') {
              parent.style.position = 'relative';
            }
            
            parent.appendChild(marker);
          });
        }, 2000);
      }, 500);
    } else {
      // Normales Production-Verhalten
      // Check if Usercentrics is available
      if (window.UC_UI && !usercentricsChecked) {
        console.log('Usercentrics detected in GPT');
        // Disable initial loading of ads
        googletag.pubads().disableInitialLoad();

        // If Usercentrics has already loaded and user made choices
        if (window.UC_UI.isInitialized()) {
          console.log('Usercentrics already initialized');
          const hasMarketingConsent = window.UC_UI.getServicesBaseInfo().some(
            service => service.id === 'BJz7qNsdj-7' && service.consent.status === true
          );
          
          // Set personalized ads based on consent
          personalizedAdsEnabled = hasMarketingConsent;
          googletag.pubads().setRequestNonPersonalizedAds(hasMarketingConsent ? 0 : 1);
          usercentricsChecked = true;
          console.log('Set personalized ads:', personalizedAdsEnabled);
        }

        // Listen for Usercentrics events
        window.addEventListener('UC_UI_INITIALIZED', function() {
          console.log('UC_UI_INITIALIZED event received');
          const hasMarketingConsent = window.UC_UI.getServicesBaseInfo().some(
            service => service.id === 'BJz7qNsdj-7' && service.consent.status === true
          );
          
          // Set personalized ads based on consent
          personalizedAdsEnabled = hasMarketingConsent;
          googletag.pubads().setRequestNonPersonalizedAds(hasMarketingConsent ? 0 : 1);
          usercentricsChecked = true;
          console.log('Set personalized ads after init:', personalizedAdsEnabled);
          
          // Refresh ads
          if (window.pbjs && window.pbjs.setTargetingForGPTAsync) {
            window.pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
          }
        });

        // Update consent when user updates
        window.addEventListener('UC_UI_CMP_EVENT', function(event) {
          console.log('UC_UI_CMP_EVENT received:', event.detail.type);
          if (event.detail.type === 'ACCEPT_ALL' || event.detail.type === 'DENY_ALL' || event.detail.type === 'SAVE') {
            const hasMarketingConsent = window.UC_UI.getServicesBaseInfo().some(
              service => service.id === 'BJz7qNsdj-7' && service.consent.status === true
            );
            
            // Update personalized ads setting
            personalizedAdsEnabled = hasMarketingConsent;
            googletag.pubads().setRequestNonPersonalizedAds(hasMarketingConsent ? 0 : 1);
            console.log('Updated personalized ads after user choice:', personalizedAdsEnabled);
            
            // Refresh ads
            if (window.pbjs && window.pbjs.setTargetingForGPTAsync) {
              window.pbjs.setTargetingForGPTAsync();
              googletag.pubads().refresh();
            }
          }
        });
      } else {
        console.log('Usercentrics not detected, falling back to TCF');
        // Fallback to TCF API if Usercentrics not available
        try {
          // Check if the TCF API exists
          if (typeof window.__tcfapi === 'function') {
            console.log('TCF API available');
            window.__tcfapi('addEventListener', 2, function(tcData, success) {
              console.log('TCF callback:', success, tcData?.eventStatus);
              if (success && (tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete')) {
                // Check for consent for personalized ads (Purpose 1 - Store and/or access information on a device)
                const hasConsent = tcData.purpose && tcData.purpose.consents && tcData.purpose.consents[1];
                personalizedAdsEnabled = hasConsent;
                googletag.pubads().setRequestNonPersonalizedAds(hasConsent ? 0 : 1);
                console.log('TCF consent for personalization:', hasConsent);
              }
            });
          } else {
            console.log('TCF API not available');
          }
        } catch (e) {
          console.error('Error in TCF API integration:', e);
        }
      }

      // Configure ad settings
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      
      // Enable lazy loading
      googletag.pubads().enableLazyLoad({
        fetchMarginPercent: 100,  // Fetch ad when it's 1 viewport away
        renderMarginPercent: 50,   // Render ad when it's 0.5 viewport away
        mobileScaling: 2.0         // Double the above values on mobile
      });
      
      googletag.enableServices();
      console.log('GPT services enabled');
    }
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
      const isStaging = window.location.hostname.includes('staging') || window.location.hostname === 'localhost';
      
      // In Staging keine Ad-Blocker-Erkennung, stattdessen direkte Test-Anzeigen
      if (isStaging) {
        console.log('Staging-Umgebung: Zeige direkte Test-Anzeigen ohne Ad-Blocker-Erkennung');
        
        adContainers.forEach(function(container) {
          // Erstelle Test-Anzeige direkt im DOM
          const testAd = document.createElement('iframe');
          testAd.style.width = '100%';
          testAd.style.height = '100%';
          testAd.style.border = 'none';
          testAd.style.overflow = 'hidden';
          
          // Bestimme die Ad-Größe basierend auf Container-ID
          let adContent = '';
          if (container.id === 'div-gpt-ad-left') {
            adContent = `
              <html><body style="margin:0; padding:0; background:#f0f0f0;">
                <div style="width:160px; height:600px; background:linear-gradient(135deg, #4285f4, #34a853); color:white; display:flex; align-items:center; justify-content:center; text-align:center; font-family:Arial;">
                  <div>
                    <div style="font-size:14px; font-weight:bold; margin-bottom:10px;">TEST AD - LEFT</div>
                    <div style="font-size:12px;">160x600</div>
                    <div style="margin-top:20px; font-size:10px;">/6355419/Travel/Europe/France/Paris</div>
                  </div>
                </div>
              </body></html>
            `;
          } else if (container.id === 'div-gpt-ad-right') {
            adContent = `
              <html><body style="margin:0; padding:0; background:#f0f0f0;">
                <div style="width:300px; height:600px; background:linear-gradient(135deg, #ea4335, #fbbc05); color:white; display:flex; align-items:center; justify-content:center; text-align:center; font-family:Arial;">
                  <div>
                    <div style="font-size:16px; font-weight:bold; margin-bottom:10px;">TEST AD - RIGHT</div>
                    <div style="font-size:12px;">300x600</div>
                    <div style="margin-top:20px; font-size:10px;">/6355419/Travel/Europe/France/Paris</div>
                  </div>
                </div>
              </body></html>
            `;
          } else if (container.id === 'div-gpt-ad-bottom') {
            adContent = `
              <html><body style="margin:0; padding:0; background:#f0f0f0;">
                <div style="width:728px; height:90px; background:linear-gradient(90deg, #fbbc05, #ea4335); color:white; display:flex; align-items:center; justify-content:center; text-align:center; font-family:Arial;">
                  <div>
                    <div style="font-size:14px; font-weight:bold;">TEST AD - BOTTOM</div>
                    <div style="font-size:10px; margin-top:5px;">728x90</div>
                    <div style="font-size:9px; margin-top:5px;">/6355419/Travel/Europe/France/Paris</div>
                  </div>
                </div>
              </body></html>
            `;
          }
          
          // Lösche alle vorhandenen Inhalte
          container.innerHTML = '';
          container.appendChild(testAd);
          
          // Setze den Inhalt des iframes
          testAd.contentWindow.document.open();
          testAd.contentWindow.document.write(adContent);
          testAd.contentWindow.document.close();
          
          console.log(`Test-Anzeige für ${container.id} wurde direkt erstellt`);
        });
      } else {
        // Original Ad-Blocker-Erkennung nur für Produktion
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
      }
    }, 1000); // Zeit reduziert, um schneller zu reagieren
  });
} 