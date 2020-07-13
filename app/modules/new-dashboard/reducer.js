import createReducer from '../utils/createReducer';
import { FETCH_STAR_PARTY_LIST_START,
         FETCH_STAR_PARTY_LIST_SUCCESS } from './actions';

const initialState = {
    isFetching: true,    
}

export default createReducer(initialState, {
    [FETCH_STAR_PARTY_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          upcomingStarPartyList: payload,
          isFetching: false,
        };
      },
      [FETCH_STAR_PARTY_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      }
});
