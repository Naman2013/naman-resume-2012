import { API } from 'app/api';
import { getUserInfo, deleteSessionToken, deleteMarketingTrackingId } from 'app/modules/User';

const LOG_PAGE_VISIT_API_URL = '/api/app/logPageVisit';

const logPageVisit = (pagePath) => {
  const { cid, at, token, sloohSiteSessionToken, sloohMarketingTrackingId } = getUserInfo();

  let finalRequestData = null;
  
  if ( (cid) && (at) && (token)) {
	const requestData = {
		cid,
		at,
		token,
		trackingId: cid,
		trackingIdType: 'customer',
		sessionToken: sloohSiteSessionToken,
		marketingTrackingId: sloohMarketingTrackingId,
		pageURI: pagePath.pagePath,
	    	referringPageURL: pagePath.referringPageURL,
	  };
	  finalRequestData = requestData;

	//the session token and marketing tracking id will only get logged on the purchase confirmation page visit once.
	if (pagePath.pagePath == "/join/purchaseConfirmation/join") {
		//cleanup the slooh site session token and slooh marketing tracking id on a successful purchase.
		deleteSessionToken();
		deleteMarketingTrackingId();
	}
  }
  else {
 	//guest
	//console.log(sloohMarketingTrackingId);

	const requestData = {
		trackingId: sloohSiteSessionToken,
		trackingIdType: 'guest',
		marketingTrackingId: sloohMarketingTrackingId,
		pageURI: pagePath.pagePath,
	    	referringPageURL: pagePath.referringPageURL,
	  };
	  finalRequestData = requestData;
  }

  API.post(LOG_PAGE_VISIT_API_URL, finalRequestData).then(response => {
    //console.log('logPageVisit');
    //console.log(response);
  });
};

export const fireSloohPageView = (pagePath, referringPageURL) => {
  logPageVisit(pagePath, referringPageURL);
};
