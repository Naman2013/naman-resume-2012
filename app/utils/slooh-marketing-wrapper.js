/**
  A wrapper for Slooh Marketing Tracking Events
*/

import {storeMarketingTrackingId} from 'app/modules/User';

export function fireSloohMarketingTrackingStartEvent(marketingTrackingId) {
	//store the marketing tracking id into a cookie
	storeMarketingTrackingId(marketingTrackingId);

	//console.log("Marketing Tracking ID: " + marketingTrackingId);
}