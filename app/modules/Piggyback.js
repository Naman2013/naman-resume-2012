import axios from 'axios';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import { missionConfirmOpen } from './Missions';

/**
  see https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/
  for /api/reservation/grabPiggyback documentation
*/
// export function grabPiggyback(mission) {
//   return axios.post('/api/reservation/grabPiggyback', mission);
// }

const GRAB_PIGGYBACK_SUCCESS = 'GRAB_PIGGYBACK_SUCCESS';
const GRAB_PIGGYBACK_FAIL = 'GRAB_PIGGYBACK_FAIL';
const GRAB_PIGGYBACK_START = 'GRAB_PIGGYBACK_START';

export const grabPiggyback = (mission) => (dispatch, getState) => {
  const { token, at, cid } = getState().user;

  // this.props.actions.getNextPiggybackSingle({
  //   ...user,
  //   scheduledMissionId: piggyback.scheduledMissionId,
  //   uniqueId: card.uniqueId,
  //   callSource: 'recommends',
  //   objectTitle: card.title,
  //   lookaheadPiggyback: card.lookaheadDaysPiggyback,
  // });

  console.log(mission);

  return axios.post('/api/reservation/grabPiggyback', {
    token,
    at,
    cid,
    callSource: 'recommends',
    scheduledMissionId: mission.scheduledMissionId,
    ...mission,
  })
  .then(result => dispatch(missionConfirmOpen('piggyback')));
};

const initialState = {
  piggyback: {},
  piggybackError: {},
  error: false,
  fetching: true,
};

export default createReducer(initialState, {
  [GRAB_PIGGYBACK_SUCCESS](state, data) {
    return {
      piggyback: data,
      piggybackError: {},
      error: false,
      fetching: false,
    };
  },
  [GRAB_PIGGYBACK_FAIL](state, error) {
    return {
      piggyback: {},
      piggybackError: error,
      error: true,
      fetching: false,
    }
  },
  [GRAB_PIGGYBACK_START](state) {
    return {
      piggyback: {},
      piggybackError: {},
      error: false,
      fetching: true,
    }
  },
});
