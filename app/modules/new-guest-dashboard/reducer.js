import createReducer from '../utils/createReducer';
import { 
        FETCH_LANDING_PAGE_DETAILS_START,
        FETCH_LANDING_PAGE_DETAILS_SUCCESS,
        FETCH_SUBSCRIPTION_PLAN_START,
        FETCH_SUBSCRIPTION_PLAN_SUCCESS,
} from './actions';

const initialState = {
    isFetching: true,
    subscriptionPlans: {isFetching: true}    
}

export default createReducer(initialState, {
    [FETCH_LANDING_PAGE_DETAILS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          landingPageDetails: {isFetching: false, ...payload},          
        };
      },
      [FETCH_LANDING_PAGE_DETAILS_START](state) {
        return {
          ...state,
          landingPageDetails: initialState,
        };
      },
      [FETCH_SUBSCRIPTION_PLAN_SUCCESS](state, { payload }) { 
        return {
          ...state,

          subscriptionPlans: {isFetching: false, ...payload},          
        };
      },
      [FETCH_SUBSCRIPTION_PLAN_START](state) {        
        return {
          ...state,
          subscriptionPlans: initialState,
        };
      },
});