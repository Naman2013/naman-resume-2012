import createReducer from '../utils/createReducer';
import {
  OTHER_FEATURED_OBJECTS_START,
  OTHER_FEATURED_OBJECTS_SUCCESS,
  OTHER_FEATURED_OBJECTS_FAIL,
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
  [OTHER_FEATURED_OBJECTS_START](state) {
    return {
      ...state,
    };
  },
  [OTHER_FEATURED_OBJECTS_SUCCESS](state, { payload }) {
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
  [OTHER_FEATURED_OBJECTS_FAIL](state, { payload }) {
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
