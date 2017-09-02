import uniqueId from 'lodash/uniqueId';
import createReducer from '../utils/createReducer';

import {
  COMMIT_FEATURES,
} from './actions';

// feature types
export const CREW = 'CREW';
export const APPRENTICE = 'APPRENTICE';
export const ASTRONOMER = 'ASTRONOMER';

const initialState = {
  sloohFeatures: [
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
      tooltip: { show: true, content: 'Take Pictures: Unlimited', toolTipOpen: false },
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
      tooltip: { show: true, content: 'Monthly Reservation Limit', toolTipOpen: false },
    },
    {
      id: uniqueId(),
      type: APPRENTICE,
      content: 'Target Objects: Slooh 500',
      tooltip: { show: true, content: 'Target Objects: Slooh 500', toolTipOpen: false },
    },
    {
      id: uniqueId(),
      type: APPRENTICE,
      content: 'Live and Recorded Shows',
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
      content: 'Live and Recorded Shows',
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
      tooltip: { show: true, content: 'Take Pictures: Unlimited+' },
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
      tooltip: { show: true, content: '' },
    },
    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Target Objects: All',
      tooltip: { show: true, content: 'Target Objects: All' },
    },
    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Live and Recorded Shows',
      tooltip: { show: false, content: '' },
    },
    {
      id: uniqueId(),
      type: ASTRONOMER,
      content: 'Community+',
      tooltip: { show: true, content: 'Community' },
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
