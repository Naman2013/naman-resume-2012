import { API } from 'app/api';
import { getUserInfo } from 'app/modules/User';

const LOG_PAGE_VISIT_API_URL = '/api/app/logPageVisit';

const logPageVisit = pageURI => {
  const { cid, at, token } = getUserInfo();

  const requestData = {
    cid,
    at,
    token,
    trackingIdType: 'customer',
    pageURI,
  };

  API.post(LOG_PAGE_VISIT_API_URL, requestData).then(response => {
    console.log('logPageVisit');
    console.log(response);
  });
};

export const fireSloohPageView = (pagePath, referringPageURL) => {
  // logPageVisit(pagePath);
};
