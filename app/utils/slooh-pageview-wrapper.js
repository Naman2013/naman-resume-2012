import { API } from 'app/api';
import { getUserInfo } from 'app/modules/User';

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
		pageURI: pagePath.pagePath,
	    	referringPageURL: pagePath.referringPageURL,
	  };
	  finalRequestData = requestData;
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
