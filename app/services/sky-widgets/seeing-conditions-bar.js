import axios from 'axios';

export const GET_SEEING_CONDITIONS_URL = '/api/widget/seeingConditions';

export default function fetchSeeingConditionsBar({ obsId, widgetUniqueId }) {
  return axios.post(GET_SEEING_CONDITIONS_URL, {
    obsId,
    widgetUniqueId,
  });
}
