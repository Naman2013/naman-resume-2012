import axios from 'axios';

export default function fetchBrowseTaggedDataService({ token, at, cid, contentTypes }) {
  return axios.post('/api/search/browseTaggedData', {
    token,
    at,
    cid,
    contentTypes,
  });
}
