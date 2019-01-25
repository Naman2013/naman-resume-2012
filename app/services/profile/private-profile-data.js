import axios from 'axios';

export const GET_PAGE_PRIVATE_PROFILE = '/api/page/getPrivateProfile';
export const GET_READING_LIST = '/api/readinglists/getReadingList';

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
