import axios from 'axios';

export default function fetchBrowseTaggedDataService({ token, at, cid, viewType }) {
  return axios.post('/api/search/browseTaggedData', {
    token,
    at,
    cid,
    viewType,
  });
}
