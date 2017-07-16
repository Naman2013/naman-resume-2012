import createReducer from '../utils/createReducer';

import {
  SET_IMAGE_DATA_TO_SNAPSHOT,
  SNAP_IMAGE_SUCCESS,
  SNAP_IMAGE_FAIL,
  RESET_SNAP_IMAGE_MESSAGE,
  RESET_SNAPSHOT_LIST,
  RESET_IMAGE_TO_SNAP,
} from './starshare-camera-actions';

const EMPTY = 'EMPTY';
const SNAP = 'SNAP';

class emptySnap {
  constructor() {
    this.type = EMPTY;
    this.imageID = uniqueId();
  }
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
  snapshotList: [{}, {}, {}],
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
  [SNAP_IMAGE_SUCCESS](state, { imageData: { imageURL, imageID, explanation } }) {
    return {
      ...state,
      snapshotList: [{ imageURL, imageID }, ...state.snapshotList].slice(0, 3),
      snapshotMsg: explanation,
    };
  },
  [SNAP_IMAGE_FAIL](state, { error }) {
    return {
      ...state,
      snapshotMsg: error.explanation,
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
});
