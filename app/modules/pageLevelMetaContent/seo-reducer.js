import createReducer from '../utils/createReducer';

import { SET_PAGE_TITLE } from './seo-actions';

export const initialState = {
  pageTitle: 'Slooh',
};

export default createReducer(initialState, {
  [SET_PAGE_TITLE](state, { title }) {
    return ({
      ...state,
      title,
    });
  },
});
