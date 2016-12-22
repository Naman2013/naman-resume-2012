import createReducer from '../utils/createReducer';

export const SELECT_CONTENT_CATEGORY = 'SELECT_CONTENT_CATEGORY';

export const selectContentCategory = item => ({
  type: SELECT_CONTENT_CATEGORY,
  payload: item
});

const initialState = {
  selectedCategory: null
};

export default createReducer(initialState, {
  [SELECT_CONTENT_CATEGORY](state, { payload }) {
    return {
      ...state,
      selectedCategory: payload
    }
  }
})
