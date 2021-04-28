import { API } from 'app/api';
import { getUserInfo, deleteSessionToken, deleteMarketingTrackingId, deleteQuestBreadCrumbDetails } from 'app/modules/User';
import { browserHistory } from 'react-router';

const LOG_PAGE_VISIT_API_URL = '/api/app/logPageVisit';
const VERIFY_MARKETING_ID = '/api/app/verifySloohATId';

const logPageVisit = (pagePath) => {
  const { cid, at, token, _sloohsstkn, _sloohatid } = getUserInfo();

  let finalRequestData = null;
  
  if ( (cid) && (at) && (token)) {
	const requestData = {
		cid,
		at,
		token,
		// siteSessionToken: _sloohsstkn,
		marketingTrackingId: _sloohatid,
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
	else if (pagePath.pagePath.startsWith("/quest-details") == true) {
		deleteQuestBreadCrumbDetails();
	}
  }
  else {
 	//guest
	

	const requestData = {
		// siteSessionToken: _sloohsstkn,
		marketingTrackingId: _sloohatid,
		pageURI: pagePath.pagePath,
	    	referringPageURL: pagePath.referringPageURL,
	  };
	  finalRequestData = requestData;

	  //make sure that any requests as a guest remove any breadcrumb details
	  deleteQuestBreadCrumbDetails();
  }

  API.post(LOG_PAGE_VISIT_API_URL, finalRequestData).then(response => {
   
  });
};

export const fireSloohPageView = (pagePath, referringPageURL) => {
  logPageVisit(pagePath, referringPageURL);
};

export const veritySloohId= async ()=>{
	const { _sloohatid } = getUserInfo();
	if(_sloohatid !== undefined){
		const requestData = { sloohMarketingTrackingId: _sloohatid };
		let response = await API.post(VERIFY_MARKETING_ID, requestData);				
			if(!response.data.apiError){
				if(response.data.status === "failed"){
					if( response.data.statusAction === "InvalidMarketingTrackingID" || response.data.statusAction === "ExpiredMarketingTrackingID" ){
						deleteSessionToken();
						deleteMarketingTrackingId();						  
						
					}
				}
				else if(response.data.status === "success"){
					if(response.data.redirectUserToURI){
						browserHistory.push(response.data.redirectUserToURI);
					}
				}
			}
	}
	
}
