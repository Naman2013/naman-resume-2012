/**
 a simple wrapper against the ga global to add any required
 defensive code to the application
 */

import * as Sentry from '@sentry/browser';

export default function fireSloohGAPageview({ location }) {
  if (typeof gtag === 'undefined') {
    Sentry.captureMessage('Function does not exist');

    return;
  }

  //ga('send', {
  //  hitType: 'pageview',
  //  location,
  //});

  gtag('config', window.getGoogleAnalyticsPropertyID(), {
    page_location: location,
  });
}
