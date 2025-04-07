// Initialize Prebid
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

// Prebid Configuration
pbjs.que.push(function() {
  const adUnits = [{
    code: 'div-gpt-ad-1',
    mediaTypes: {
      banner: {
        sizes: [[728, 90], [300, 250], [300, 600], [320, 50]]
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13144370 // Replace with your placement ID
      }
    }]
  }];

  // Configure Usercentrics CMP Integration
  pbjs.setConfig({
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
    debug: false,
    bidderTimeout: 2000
  });

  pbjs.addAdUnits(adUnits);

  // Request bids and set targeting
  pbjs.requestBids({
    bidsBackHandler: function() {
      googletag.cmd.push(function() {
        pbjs.que.push(function() {
          pbjs.setTargetingForGPTAsync();
          googletag.pubads().refresh();
        });
      });
    }
  });
}); 