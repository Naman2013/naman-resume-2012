import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import createReducer from '../utils/createReducer';

import {
  SET_IMAGE_DATA_TO_SNAPSHOT,
  SNAP_IMAGE_START,
  SNAP_IMAGE_SUCCESS,
  SNAP_IMAGE_FAIL,
  RESET_SNAP_IMAGE_MESSAGE,
  RESET_SNAPSHOT_LIST,
  RESET_IMAGE_TO_SNAP,
  SET_PREVIOUS_INSTRUMENT,
} from './starshare-camera-actions';

const EMPTY = 'EMPTY';
const SNAP = 'SNAP';

class EmptySnap {
  constructor() {
    this.imageID = uniqueId();
    this.type = EMPTY;
  }
}

function generateInitialEmptyStarshareSlots(count) {
  const emptySlots = [];
  for (let i = 0; i < count; i += 1) {
    emptySlots.push(new EmptySnap());
  }
  return emptySlots;
}

const initialState = {
  imageDataToSnapshot: {
    callSource: 'details',
    zoom: 1,
    originX: 0,
    originY: 0,
    masked: false,
    astroObjectID: '0',
    scheduledMissionID: '0',
    imageURL: '',
    imageID: '',
  },
  snapshotMsg: '',
  snapshotList: generateInitialEmptyStarshareSlots(6),
  justSnapped: false,
  previousInstrumentId: null,
};

export default createReducer(initialState, {
  [SET_IMAGE_DATA_TO_SNAPSHOT](state, { data }) {
    return {
      ...state,
      imageDataToSnapshot: {
        ...state.imageDataToSnapshot,
        ...data,
      },
    };
  },
  [SNAP_IMAGE_START](state) {
    return {
      ...state,
      justSnapped: false,
    };
  },
  [SNAP_IMAGE_SUCCESS](
    state,
    {
      imageData: {
        apiError,
        imagesLastSnapped,
        imageURL,
        imageID,
        explanation,
      },
    }
  ) {
    return {
      ...state,
      apiError,
      imagesLastSnapped,
      snapshotList: take([{ imageURL, imageID }, ...state.snapshotList], 6),
      snapshotMsg: explanation,
      justSnapped: !apiError,
    };
  },
  [SNAP_IMAGE_FAIL](state, { error }) {
    return {
      ...state,
      apiError: error.apiError,
      imagesLastSnapped: error.imagedAdded,
      snapshotMsg: error.explanation,
      justSnapped: false,
    };
  },
  [RESET_SNAP_IMAGE_MESSAGE](state) {
    return {
      ...state,
      snapshotMsg: '',
    };
  },
  [RESET_SNAPSHOT_LIST](state) {
    return {
      ...state,
      snapshotList: initialState.snapshotList,
    };
  },
  [RESET_IMAGE_TO_SNAP](state) {
    return {
      ...state,
      imageDataToSnapshot: {
        ...initialState.imageDataToSnapshot,
      },
    };
  },
  [SET_PREVIOUS_INSTRUMENT](state, { id }) {
    return {
      ...state,
      previousInstrumentId: id,
    };
  },
});
