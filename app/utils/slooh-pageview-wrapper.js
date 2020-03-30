import { API } from 'app/api';
import { getUserInfo, deleteSessionToken, deleteMarketingTrackingId, deleteQuestBreadCrumbDetails() } from 'app/modules/User';

const LOG_PAGE_VISIT_API_URL = '/api/app/logPageVisit';

const logPageVisit = (pagePath) => {
  const { cid, at, token, _sloohsstkn, _sloohatid } = getUserInfo();

  let finalRequestData = null;
  
  if ( (cid) && (at) && (token)) {
	const requestData = {
		cid,
		at,
		token,
		siteSessionToken: _sloohsstkn,
		marketingTrackingId: _sloohatid,
		pageURI: pagePath.pagePath,
	    	referringPageURL: pagePath.referringPageURL,
	  };
	  finalRequestData = requestData;

	//the session token and marketing tracking id will only get logged on the purchase confirmation page visit once.
	console.log(pagePath.pagePath);

	if (pagePath.pagePath == "/join/purchaseConfirmation/join") {
		//cleanup the slooh site session token and slooh marketing tracking id on a successful purchase.
		deleteSessionToken();
		deleteMarketingTrackingId();
	}
	else if (pagePath.pagePath.startsWith("/profile/private") == true) {
		deleteQuestBreadCrumbDetails()
	}
	else if (pagePath.pagePath.startsWith("/quest-details") == true) {
		deleteQuestBreadCrumbDetails()
	}
  }
  else {
 	//guest
	//console.log(_sloohatid);

	const requestData = {
		siteSessionToken: _sloohsstkn,
		marketingTrackingId: _sloohatid,
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
