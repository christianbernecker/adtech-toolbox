// Initialize Prebid
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

// Check for no_ads parameter
const urlParams = new URLSearchParams(window.location.search);
const noAds = urlParams.has('no_ads');

// Don't initialize Prebid if no_ads parameter is present
if (noAds) {
  console.log('No ads mode enabled - Prebid initialization skipped');
} else {
  // Prebid Configuration
  pbjs.que.push(function() {
    console.log('Prebid configuration started');
    
    const adUnits = [
      {
        code: 'div-gpt-ad-left',
        mediaTypes: {
          banner: {
            sizes: [[160, 600], [120, 600]]
          }
        },
        bids: [{
          bidder: 'appnexus',
          params: {
            placementId: 13144370 // Replace with your placement ID
          }
        }]
      },
      {
        code: 'div-gpt-ad-right',
        mediaTypes: {
          banner: {
            sizes: [[300, 600], [300, 250]]
          }
        },
        bids: [{
          bidder: 'appnexus',
          params: {
            placementId: 13144370 // Replace with your placement ID
          }
        }]
      },
      {
        code: 'div-gpt-ad-bottom',
        mediaTypes: {
          banner: {
            sizes: [[728, 90], [970, 90], [320, 50], [970, 250]]
          }
        },
        bids: [{
          bidder: 'appnexus',
          params: {
            placementId: 13144370 // Replace with your placement ID
          }
        }]
      }
    ];

    // Configure Usercentrics CMP Integration
    try {
      // Enable debug for easier troubleshooting
      pbjs.setConfig({
        debug: true,
        userSync: {
          filterSettings: {
            iframe: {
              bidders: '*',
              filter: 'include'
            }
          }
        },
        consentManagement: {
          gdpr: {
            cmpApi: 'iab',
            timeout: 8000,
            defaultGdprScope: true
          },
          usp: {
            cmpApi: 'iab',
            timeout: 100
          }
        },
        // Additional Prebid configuration
        currency: {
          adServerCurrency: 'EUR'
        },
        bidderTimeout: 2000
      });
      
      console.log('Prebid configuration set');
    } catch (error) {
      console.error('Error setting Prebid config:', error);
    }

    try {
      pbjs.addAdUnits(adUnits);
      console.log('Ad units added to Prebid');
    } catch (error) {
      console.error('Error adding ad units:', error);
    }

    // Request bids and set targeting
    try {
      pbjs.requestBids({
        bidsBackHandler: function(bidResponses) {
          console.log('Prebid bids received:', bidResponses);
          googletag.cmd.push(function() {
            pbjs.que.push(function() {
              try {
                pbjs.setTargetingForGPTAsync();
                console.log('Targeting set for GPT');
                googletag.pubads().refresh();
                console.log('GPT refresh called');
              } catch (error) {
                console.error('Error setting targeting:', error);
              }
            });
          });
        }
      });
      console.log('Prebid bid request sent');
    } catch (error) {
      console.error('Error requesting bids:', error);
    }
  });
} 