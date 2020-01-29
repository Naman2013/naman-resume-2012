/**
  a simple wrapper against the ga global to add any required
  defensive code to the application
*/

export default function fireSloohGAPageview({ location }) {
  if (typeof gtag === 'undefined') { return; }

  //ga('send', {
  //  hitType: 'pageview',
  //  location,
  //});

  gtag('config', window.getGoogleAnalyticsPropertyID(), {'page_location': location });

}
