import axios from 'axios';

export default function fetchTelescopeStatus(obsId) {
  return axios.get(`/api/obs/getObservatoryStatus?obsId=${obsId}`);
}
