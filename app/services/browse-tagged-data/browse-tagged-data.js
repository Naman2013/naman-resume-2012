import { API } from 'app/api';

export default function fetchBrowseTaggedDataService({ token, at, cid, contentTypes }) {
  return API.post('/api/search/browseTaggedData', {
    token,
    at,
    cid,
    contentTypes,
  });
}
