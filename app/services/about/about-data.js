import { API } from 'app/api';

export const GET_PAGE_ABOUT = '/api/page/about';

export function fetchAboutDataService({ cid, at, token, ver, lang }) {
  return API.post(GET_PAGE_ABOUT, {
    cid,
    at,
    token,
    ver,
    lang,
  });
}
