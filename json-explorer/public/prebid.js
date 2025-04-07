// Prebid Configuration for AdTech Toolbox
window.pbjs = window.pbjs || {};
window.pbjs.que = window.pbjs.que || [];

// Prebid Configuration
window.pbjs.que.push(function() {
  // Configure currency settings if needed
  pbjs.setConfig({
    debug: false, // Set to false for production
    enableSendAllBids: true,
    useBidCache: true,
    bidderTimeout: 2000, // 2 seconds for faster page loads
    publisherDomain: 'adtech-toolbox.com',
    priceGranularity: {
      buckets: [
        { precision: 2, min: 0, max: 5, increment: 0.01 },
        { precision: 2, min: 5, max: 20, increment: 0.1 },
        { precision: 2, min: 20, max: 50, increment: 0.5 }
      ]
    },
    userSync: {
      filterSettings: {
        iframe: {
          bidders: '*',
          filter: 'include'
        }
      },
      syncEnabled: true,
      syncDelay: 3000
    },
    // Set floor prices to ensure minimum CPMs
    floors: {
      enforcement: {
        enforceJS: true,
        enforcePBS: true,
        floorDeals: false
      },
      data: {
        currency: 'EUR',
        schema: {
          fields: ['mediaType', 'size', 'domain']
        },
        values: {
          'banner|300x250|adtech-toolbox.com': 0.7,
          'banner|300x600|adtech-toolbox.com': 1.0,
          'banner|728x90|adtech-toolbox.com': 0.5,
          'banner|970x90|adtech-toolbox.com': 0.8,
          'banner|970x250|adtech-toolbox.com': 1.2,
          'banner|*|adtech-toolbox.com': 0.3
        }
      }
    },
    // Cookie Consent Management
    consentManagement: {
      gdpr: {
        cmpApi: 'iab',
        timeout: 8000,
        defaultGdprScope: true
      }
    }
  });

  // Define ad units
  const adUnits = [{
    code: 'div-gpt-ad-sidebar',
    mediaTypes: {
      banner: {
        sizes: [[300, 250], [300, 600]]
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13144370,  // Replace with your placement ID
        keywords: {
          adtype: 'sidebar',
          page: 'json-tools'
        }
      }
    }, {
      bidder: 'rubicon',
      params: {
        accountId: '14062',    // Replace with your account ID
        siteId: '70608',       // Replace with your site ID
        zoneId: '335918',      // Replace with your zone ID
        keywords: ['adtech', 'tools', 'developer']
      }
    }, {
      bidder: 'criteo',
      params: {
        networkId: 7100        // Replace with your network ID
      }
    }, {
      bidder: 'pubmatic',
      params: {
        publisherId: '156260', // Replace with your publisher ID
        adSlot: 'adtech_sidebar_300x600'
      }
    }]
  }, {
    code: 'div-gpt-ad-bottom-banner',
    mediaTypes: {
      banner: {
        sizes: [[728, 90], [970, 90], [970, 250]]
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13144370,  // Replace with your placement ID
        keywords: {
          adtype: 'bottom',
          page: 'json-tools'
        }
      }
    }, {
      bidder: 'rubicon',
      params: {
        accountId: '14062',    // Replace with your account ID
        siteId: '70608',       // Replace with your site ID
        zoneId: '335918',      // Replace with your zone ID
        keywords: ['adtech', 'tools', 'developer']
      }
    }, {
      bidder: 'criteo',
      params: {
        networkId: 7100        // Replace with your network ID
      }
    }, {
      bidder: 'pubmatic',
      params: {
        publisherId: '156260', // Replace with your publisher ID
        adSlot: 'adtech_bottom_728x90'
      }
    }]
  }];

  // Add ad units
  pbjs.addAdUnits(adUnits);
  
  // Analytics Configuration - Optional but recommended
  pbjs.enableAnalytics([{
    provider: 'adagio',
    options: {
      publisherId: 'ADAGIO-PUBLISHER-ID' // Replace with your publisher ID
    }
  }]);
}); 