import createReducer from '../utils/createReducer';


const SET_CATEGORY = 'SET_CATEGORY';
const SET_OBJECT = 'SET_OBJECT';
const CLEAR_BROWSE = 'CLEAR_BROWSE';


export const setCategory = item => ({
  type: SET_CATEGORY,
  payload: item,
});

export const setObject = item => ({
  type: SET_OBJECT,
  payload: item,
});

export const clearBrowse = item => { type: CLEAR_BROWSE, };


const initialState = {
  category: null,
  object: null
};

export default createReducer(initialState, {
  [SET_CATEGORY](state, { payload }) {
    return {
      ...state,
      category: payload,
      object: null,
    };
  },
  [SET_OBJECT](state, { payload }) {
    return {
      ...state,
      object: payload,
    };
  },
  [CLEAR_BROWSE](state) {
    return {
      ...state,
      category: null,
      object: null,
    };
  },   
});
