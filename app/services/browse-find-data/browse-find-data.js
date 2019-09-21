import axios from 'axios';

export default function fetchBrowseFindDataService({ token, at, cid, findTerm, viewType }) {
  return axios.post('/api/search/findData', {
    token,
    at,
    cid,
    findTerm,
    viewType,
  });
}
