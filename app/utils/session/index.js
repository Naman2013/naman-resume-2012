import { API } from 'app/api';
import cookie from 'cookie';
import { storeSessionToken } from 'app/modules/User';

const GENERATE_SESSION_API_URL = '/api/app/generateSessionToken';

const generateSessionToken = async () => {
  
  let res = await API.post(GENERATE_SESSION_API_URL);  
  storeSessionToken(res.data.sloohSessionToken);
  return true;
};

export const initSessionToken = async ({ isAuthorized }, props) => {
 
  if (isAuthorized) {
    return true;
  }

  // const { sloohSiteSessionToken } = cookie.parse(window.document.cookie);
  // if (!sloohSiteSessionToken) {
  //   return await generateSessionToken();
  // }
  // else
  //   return true;
  const { _sloohsstkn } = cookie.parse(window.document.cookie);
  if(!_sloohsstkn){
    return await generateSessionToken();
  }
  else
    return true;
};
