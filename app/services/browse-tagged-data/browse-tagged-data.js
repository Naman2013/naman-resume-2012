import { API } from 'app/api';

export default function fetchBrowseTaggedDataService({ token, at, cid, viewType }) {
  return API.post('/api/search/browseTaggedData', {
    token,
    at,
    cid,
    viewType,
  });
}
