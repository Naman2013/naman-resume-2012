/**
  a simple wrapper for the Facebook Pixel
*/

export default function fireSloohFBEvent({ location }) {
  if (typeof fbq === 'undefined') { return; }

  /* 1/30/2020 - Track Facebook - Complete Registration Events */
  if (location == "/join/purchaseConfirmation/join") {
	  fbq('track', 'CompleteRegistration');
  }
}
