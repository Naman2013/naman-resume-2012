import { API } from 'app/api';

export default function fetchImageDetailsService({
  token,
  at,
  cid,
  customerImageId,
}) {
  return API.post('/api/images/getImageDetails', {
    token,
    at,
    cid,
    customerImageId,
    useShareToken: 'n',
    callSource: 'sharedpictures',
  });
}
