import createReducer from '../utils/createReducer';
import { 
        FETCH_LANDING_PAGE_DETAILS_START,
        FETCH_LANDING_PAGE_DETAILS_SUCCESS,
} from './actions';

const initialState = {
    isFetching: true,    
}

export default createReducer(initialState, {
    [FETCH_LANDING_PAGE_DETAILS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          landingPageDetails: payload,
          isFetching: false,
        };
      },
      [FETCH_LANDING_PAGE_DETAILS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
});