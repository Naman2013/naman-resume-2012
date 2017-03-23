import createReducer from '../utils/createReducer';

import { ENABLE_LANDING, DISABLE_LANDING } from './actions';

const initialState = false;

export default createReducer(initialState, {
  [ENABLE_LANDING](state, { isLanding }) {
    return isLanding;
  },
  [DISABLE_LANDING](state, { isLanding }) {
    return isLanding;
  },
});
