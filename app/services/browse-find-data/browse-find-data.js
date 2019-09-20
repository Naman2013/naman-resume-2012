import { API } from 'app/api';

export default function fetchBrowseFindDataService({ token, at, cid, findTerm }) {
  return API.post('/api/search/findData', {
    token,
    at,
    cid,
    findTerm,
  });
}
