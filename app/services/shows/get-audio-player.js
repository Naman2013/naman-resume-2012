import axios from 'axios';

export default function getAudioPlayer({ cid, at, token, pageSource }) {
  return axios.post('/api/app/getAudioPlayer', {
    cid,
    at,
    token,
    pageSource,
  });
}
