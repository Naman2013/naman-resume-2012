import { API } from 'app/api';

export default function fetchTelescopeStatus(obsId) {
  return API.get(`/api/obs/getObservatoryStatus?obsId=${obsId}`);
}
