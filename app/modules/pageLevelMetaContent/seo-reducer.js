import createReducer from '../utils/createReducer';

import { SET_PAGE_TITLE } from './seo-actions';

export const initialState = {
  pageTitle: 'Learn to explore space',
  description: 'Do you wonder what is out there? Join a community of fellow Earthlings looking through powerful telescopes into outer space.',
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
  [SET_PAGE_TITLE](state, { title }) {
    return ({
      ...state,
      title,
    });
  },
});
