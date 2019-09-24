import { API } from 'app/api';

/**
  @param telescopeId     required   for requestType of 'single', ignored for requestType of 'all' (mission-capable telescopeId)
  @param status          optional   'live', 'test', 'all'  default 'live'  only display 'live' in the app
  @param requestType     optional  'single', 'all'    default 'single'
*/
export const fetchPresetOptions = ({ status, telescopeId, requestType }) => {
  return API.post('/api/reservation/getPresetOptions', {
    status,
    telescopeId,
    requestType,
  });
};
