import { API } from 'app/api';
import cookie from 'cookie';
import { storeSessionToken } from 'app/modules/User';

const GENERATE_SESSION_API_URL = '/api/app/generateSessionToken';

export const initSessionToken = ({ isAuthorized }) => {
  //console.log('initSessionToken');
  //console.log('isAuthorized', isAuthorized);
  if (isAuthorized) {
    return;
  }

  const { _sloohatid } = cookie.parse(window.document.cookie);

  if (!_sloohatid) {
	API.post(GENERATE_SESSION_API_URL).then(({ data: { sloohSessionToken } }) => {
		storeSessionToken(sloohSessionToken);
	});
  }
};
