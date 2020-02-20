/**
 a simple wrapper against the ga global to add any required
 defensive code to the application
 */

import * as Sentry from '@sentry/browser';

export default function fireSloohGAPageview({ pagePath }) {
  if (typeof gtag === 'undefined') {
    Sentry.captureMessage('gtag() function does not exist');
    return;
  }

  //fire off a Google Analytics page-view
  gtag('config', window.getGoogleAnalyticsPropertyID(), { page_location: pagePath, page_path: pagePath });
}
