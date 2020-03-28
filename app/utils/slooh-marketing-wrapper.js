/**
  A wrapper for Slooh Marketing Tracking Events
*/

import { storeMarketingTrackingId } from 'app/modules/User';

export function fireSloohMarketingTrackingStartEvent(_sloohatid) {
	//store the marketing tracking id into a cookie
	storeMarketingTrackingId(_sloohatid);

	//console.log("Marketing Tracking ID: " + _sloohatid);
}