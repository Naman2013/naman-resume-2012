import uniqueId from 'lodash/uniqueId';
import createReducer from '../utils/createReducer';

import {
  COMMIT_FEATURES,
} from './actions';

// feature types
export const CREW = 'CREW';
export const APPRENTICE = 'APPRENTICE';
export const ASTRONOMER = 'ASTRONOMER';
export const APPRENTICE_TOP = 'APPRENTICE_TOP';

const initialState = {
  sloohFeatures: [
    {
      id: uniqueId(),
      type: APPRENTICE_TOP,
      content: '',
      tooltip: { show: true, content: 'Your payment method will not be charged if you cancel your account during the trial period.\n \n Applies to monthly subscriptions only', toolTipOpen: false },
    },
    {
      id: uniqueId(),
      type: APPRENTICE,
      content: 'Live Telescope Feeds',
      tooltip: { show: false, content: '', toolTipOpen: false },
    },
    {
      id: uniqueId(),
      type: APPRENTICE,
      content: 'Take Pictures: Unlimited',
      tooltip: { show: true, content: 'Includes \'piggybacking\' on missions to capture images automatically', toolTipOpen: false },
    },
    {
      id: uniqueId(),
      type: APPRENTICE,
      content: 'Control Telescopes',
      tooltip: { show: false, content: '', toolTipOpen: false },
    },
    {
      id: uniqueId(),
      type: APPRENTICE,
      content: 'Monthly Reservation Limit',
      tooltip: { show: true, content: '5 mission reservations per month to control any Slooh telescope', toolTipOpen: false },
    },
    {
      id: uniqueId(),
      type: APPRENTICE,
      content: 'Target Objects: Slooh 500',
      tooltip: { show: true, content: 'Point telescopes at Slooh 500 objects, the most popular objects in the night sky', toolTipOpen: false },
    },
    {
      id: uniqueId(),
      type: APPRENTICE,
      content: 'Livecasts',
      tooltip: { show: false, content: '', toolTipOpen: false },
    },
    {
      id: uniqueId(),
      type: APPRENTICE,
      content: 'Community',
      tooltip: { show: false, content: '', toolTipOpen: false },
    },

    {
      id: uniqueId(),
      type: CREW,
      content: 'Live Telescope Feeds',
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: CREW,
      content: 'Take Pictures: Limited',
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: CREW,
      content: 'Control Telescopes',
      liNot: true,
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: CREW,
      content: 'Reservations',
      liNot: true,
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: CREW,
      content: 'Target Objects',
      liNot: true,
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: CREW,
      content: 'Livecasts',
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: CREW,
      content: 'Community',
      tooltip: { show: false, content: '' },
    },

    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Live Telescope Feeds',
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Take Pictures: Unlimited+',
      tooltip: { show: true, content: 'Includes FITS files and \'piggybacking\' on missions to capture images automatically' },
    },
    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Control Telescopes',
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Unlimited Reservations',
      tooltip: { show: true, content: 'No limit to the total number of mission reservations per month to control any Slooh telescope' },
    },
    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Target Objects: All',
      tooltip: { show: true, content: 'Point telescopes at any object in the sky, including Slooh 500, major astro-catalogs and by entering celestial coordinates' },
    },
    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Livecasts',
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Community+',
      tooltip: { show: true, content: 'Participate in citizen science research and discovery' },
    },
  ],
};

export default createReducer(initialState, {
  [COMMIT_FEATURES](state, { payload }) {
    return {
      ...state,
      sloohFeatures: payload,
    };
  },
});
