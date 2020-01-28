/**
  a simple wrapper against the ga global to add any required
  defensive code to the application
*/

export default function fireSloohGAPageview({ googleAnalyticsPropertyID, location }) {
  if (typeof gtag === 'undefined') { return; }

  //ga('send', {
  //  hitType: 'pageview',
  //  location,
  //});

  gtag('config', googleAnalyticsPropertyID, {'page_path': location });

}
