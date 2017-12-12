import createReducer from '../utils/createReducer';

import {
  SET_PAGE_TITLE,
  RESET_PAGE_META,
  SET_STANDARD_META,
  SET_OPEN_GRAPH_META,
} from './seo-actions';

export const initialState = {
  pageTitle: 'Learn to explore space',
  standard: {
    description: 'Do you wonder what is out there? Join a community of fellow Earthlings looking through powerful telescopes into outer space.',
  },
  og: {
    title: 'Slooh.com is Teaching the world to explore space.',
    audio: '',
    video: '',
    description: 'Do you wonder what is out there? Join a community of fellow Earthlings looking through powerful telescopes into outer space.',
    type: 'website',
    url: 'https://slooh.com',
    image: 'https://vega.slooh.com/assets/chrome/Siggle-Slooh.svg',
    site_name: 'Slooh',
    site: 'slooh.com',
  },
};

export default createReducer(initialState, {
  [SET_STANDARD_META](state, { payload }) {
    return ({
      ...state,
      standard: Object.assign({}, initialState.standard, payload),
    });
  },
  [SET_STANDARD_META](state, { payload }) {
    return ({
      ...state,
      og: Object.assign({}, initialState.og, payload),
    });
  },
  [SET_PAGE_TITLE](state, { title }) {
    return ({
      ...state,
      title,
    });
  },
  [RESET_PAGE_META]() {
    return ({
      ...initialState,
    });
  },
});
