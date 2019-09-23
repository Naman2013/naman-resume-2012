import { API } from 'app/api';

export default function getAudioPlayer({ cid, at, token, pageSource }) {
  return API.post('/api/app/getAudioPlayer', {
    cid,
    at,
    token,
    pageSource,
  });
}
