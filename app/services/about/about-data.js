import axios from 'axios';

export const GET_PAGE_ABOUT = '/api/page/about';

export function fetchAboutDataService({
  cid, at, token, ver, lang,
}) {
  return axios.post(GET_PAGE_ABOUT, {
    cid,
    at,
    token,
    ver,
    lang,
  });
}
