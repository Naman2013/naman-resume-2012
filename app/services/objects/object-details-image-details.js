import axios from 'axios';

export default function fetchImageDetailsService({
  token,
  at,
  cid,
  customerImageId,
}) {
  return axios.post('/api/images/getImageDetails', {
    token,
    at,
    cid,
    customerImageId,
    useShareToken: 'n',
    callSource: 'sharedpictures',
  });
}
