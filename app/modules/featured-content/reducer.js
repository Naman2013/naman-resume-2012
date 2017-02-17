import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_FEATURED_START,
  FETCH_FEATURED_SUCCESS,
  FETCH_FEATURED_FAIL,
} from './actions';

const initialState = {
  sectionObjectTitle: '',
  sectionTitle: '',
  sectionSubtitle: '',
  itemList: [],
  error: false,
  errorMessage: {},
  fetching: true,
};

export default createReducer(initialState, {
  [FETCH_FEATURED_START](state) {
    return {
      ...state,
    };
  },
  [FETCH_FEATURED_SUCCESS](state, { payload }) {
    const { sectionObjectTitle, sectionTitle, sectionSubtitle, itemList } = payload;
    return {
      ...state,
      sectionObjectTitle,
      sectionTitle,
      sectionSubtitle,
      itemList,
      error: false,
      errorMessage: {},
      fetching: false,
    };
  },
  [FETCH_FEATURED_FAIL](state, { payload }) {
    const { errorMsg } = payload;
    return {
      ...state,
      sectionObjectTitle: '',
      sectionTitle: '',
      sectionSubtitle: '',
      itemList: [],
      error: true,
      errorMessage: errorMsg,
      fetching: false,
    };
  },
});
