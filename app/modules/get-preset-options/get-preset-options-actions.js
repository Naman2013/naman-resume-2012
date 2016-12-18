import axios from 'axios';

export const START_GET_PRESET_OPTIONS = 'START_GET_PRESET_OPTIONS';
export const SUCCESS_GET_PRESET_OPTIONS = 'SUCCESS_GET_PRESET_OPTIONS';
export const FAIL_GET_PRESET_OPTIONS = 'FAIL_GET_PRESET_OPTIONS';

/**
  @param telescopeId     required   for requestType of 'single', ignored for requestType of 'all' (mission-capable telescopeId)
  @param status          optional   'live', 'test', 'all'  default 'live'  only display 'live' in the app
  @param requestType     optional  'single', 'all'    default 'single'
*/
export const fetchPresetOptions = ({ status, telescopeId, requestType }) => {
  return axios.post('/api/reservation/getPresetOptions', {
    status,
    telescopeId,
    requestType,
  });
};
