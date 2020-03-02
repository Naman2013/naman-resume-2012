import { API } from 'app/api';
import cookie from 'cookie';
import { storeSessionToken } from 'app/modules/User';

const GENERATE_SESSION_API_URL = '/api/app/generateSessionToken';

const generateSessionToken = () => {
  //console.log('generateSessionToken');
  API.post(GENERATE_SESSION_API_URL).then(({ data: { sloohSessionToken } }) => {
    storeSessionToken(sloohSessionToken);
  });
};

export const initSessionToken = ({ isAuthorized }) => {
  //console.log('initSessionToken');
  //console.log('isAuthorized', isAuthorized);
  if (isAuthorized) {
    return;
  }

  const { sloohSiteSessionToken } = cookie.parse(window.document.cookie);

  if (!sloohSiteSessionToken) {
    generateSessionToken();
  }
};
