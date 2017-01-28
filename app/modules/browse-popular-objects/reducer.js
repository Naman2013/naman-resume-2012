import createReducer from '../utils/createReducer';
import {
  SET_SELECTED_CATEGORY_INDEX,
  SET_SELECTED_OBJECT_INDEX,
  RESET_RESERVE_BY_OBJECT,
} from './actions';

const initialState = {
  selectedCategoryIndex: null,
  selectedObjectIndex: null,
};

export default createReducer(initialState, {
  [SET_SELECTED_CATEGORY_INDEX](state, { payload }) {
    return {
      ...state,
      selectedCategoryIndex: payload,
    };
  },
  [SET_SELECTED_OBJECT_INDEX](state, { payload }) {
    return {
      ...state,
      selectedObjectIndex: payload,
    };
  },
  [RESET_RESERVE_BY_OBJECT]() {
    return {
      ...initialState,
    };
  },
});
