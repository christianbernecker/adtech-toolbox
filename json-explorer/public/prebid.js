// Prebid Configuration for AdTech Toolbox
window.pbjs = window.pbjs || {};
window.pbjs.que = window.pbjs.que || [];

// Prebid Configuration
window.pbjs.que.push(function() {
  // Configure currency settings if needed
  pbjs.setConfig({
    debug: true,
    enableSendAllBids: true,
    bidderTimeout: 3000,
    publisherDomain: 'adtech-toolbox.com',
    userSync: {
      filterSettings: {
        iframe: {
          bidders: '*',
          filter: 'include'
        }
      },
      syncEnabled: true,
      syncDelay: 3000
    }
  });

  // Define ad units
  const adUnits = [{
    code: 'div-gpt-ad-top-banner',
    mediaTypes: {
      banner: {
        sizes: [[728, 90], [970, 90], [970, 250]]
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13144370  // Replace with your placement ID
      }
    }, {
      bidder: 'rubicon',
      params: {
        accountId: '14062',    // Replace with your account ID
        siteId: '70608',       // Replace with your site ID
        zoneId: '335918'       // Replace with your zone ID
      }
    }]
  }, {
    code: 'div-gpt-ad-sidebar',
    mediaTypes: {
      banner: {
        sizes: [[300, 250], [300, 600]]
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13144370  // Replace with your placement ID
      }
    }, {
      bidder: 'rubicon',
      params: {
        accountId: '14062',    // Replace with your account ID
        siteId: '70608',       // Replace with your site ID
        zoneId: '335918'       // Replace with your zone ID
      }
    }]
  }, {
    code: 'div-gpt-ad-bottom-banner',
    mediaTypes: {
      banner: {
        sizes: [[728, 90], [970, 90]]
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13144370  // Replace with your placement ID
      }
    }, {
      bidder: 'rubicon',
      params: {
        accountId: '14062',    // Replace with your account ID
        siteId: '70608',       // Replace with your site ID
        zoneId: '335918'       // Replace with your zone ID
      }
    }]
  }];

  // Add ad units
  pbjs.addAdUnits(adUnits);
}); 