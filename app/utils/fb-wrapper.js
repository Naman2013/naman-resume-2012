/**
  a simple wrapper for the Facebook Pixel
*/

export default function fireSloohFBEvent({ pagePath }) {
  if (typeof fbq === 'undefined') {
	console.log('Facebook pixel fbq function not found.....');
 	return; 
  }

  //Track all Pageviews in Facebook
  //fbq('track', 'PageView'),

    /* 1/30/2020 - Track Facebook - Complete Registration Events */
    if (pagePath == "/join/purchaseConfirmation/join") {
  	  fbq('track', 'CompleteRegistration');
    }
}