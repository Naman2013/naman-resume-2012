/**
  A wrapper for specific Facebook Events
*/

export function fireSloohFBPurchaseEvent(myprops) {
  if (typeof fbq === 'undefined') {
	
	//ideally send a Sentry error...
 	return; 
  }

    /* 1/30/2020 - Track Facebook - Complete Registration Events */
    /* 3/26/2020 - Track Facebook - Changed from Complete Registration Events to Purchase Events */
	fbq('track', 'Purchase',
  		{
    			value: myprops.planCostInUSD,
    			currency: 'USD',
    			contents: [
      				{
        				id: myprops.planName,
        				quantity: 1
      				}
			],
    			content_type: 'product'
  		}
	);
}