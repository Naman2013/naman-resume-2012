/**
  a simple wrapper for the Facebook Pixel
*/

export default function fireSloohFBEvent({ pagePath }) {
  if (typeof fbq === 'undefined') {
	//console.log('Facebook pixel fbq function not found.....');
	//ideally send a Sentry error...
 	return; 
  }

    /* 1/30/2020 - Track Facebook - Complete Registration Events */

    /* 3/26/2020 - Track Facebook - Changed from Complete Registration Events to Purchase Events */

    if (pagePath == "/join/purchaseConfirmation/join") {
	fbq('track', 'Purchase',
  		{
    			value: 300.00,
    			currency: 'USD',
    			contents: [
      				{
        				id: 'Astronomer',
        				quantity: 1
      				}
			],
    			content_type: 'product'
  		}
	);
    }
}