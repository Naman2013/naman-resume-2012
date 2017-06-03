import axios from 'axios';

export default function fetchTelescopeStatus(obsId) {
  return axios.post(`/api/obs/getObservatoryStatus?obsId=${obsId}`);
}
