import { API } from 'app/api';

export const GET_SEEING_CONDITIONS_URL = '/api/widget/seeingConditions';

export default function fetchSeeingConditionsBar({ obsId, widgetUniqueId }) {
  return API.post(GET_SEEING_CONDITIONS_URL, {
    obsId,
    widgetUniqueId,
  });
}
