import axios from 'axios';

export const GET_PAGE_PRIVATE_PROFILE = '/api/page/getPrivateProfile';

export function fetchPrivateProfileDataService({
  cid, at, token, ver, lang,
}) {
  return axios.post(GET_PAGE_PRIVATE_PROFILE, {
    cid,
    at,
    token,
    ver,
    lang,
  });
}
