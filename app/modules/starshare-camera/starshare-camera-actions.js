import axios from 'axios';

export const SET_IMAGE_DATA_TO_SNAPSHOT = 'SET_IMAGE_DATA_TO_SNAPSHOT';
export const SNAP_IMAGE_START = 'SNAP_IMAGE_START';
export const SNAP_IMAGE_SUCCESS = 'SNAP_IMAGE_SUCCESS';
export const SNAP_IMAGE_FAIL = 'SNAP_IMAGE_FAIL';
export const RESET_SNAP_IMAGE_MESSAGE = 'RESET_SNAP_IMAGE_MESSAGE';
export const RESET_SNAPSHOT_LIST = 'RESET_SNAPSHOT_LIST';

export const RESET_IMAGE_TO_SNAP = 'RESET_IMAGE_TO_SNAP';

const setImageData = data => ({
  type: SET_IMAGE_DATA_TO_SNAPSHOT,
  data,
});

const snapImageSuccess = imageData => ({
  type: SNAP_IMAGE_SUCCESS,
  imageData,
});

const snapImageFail = error => ({
  type: SNAP_IMAGE_FAIL,
  error,
});

export const resetsnapImageMsg = () => ({
  type: RESET_SNAP_IMAGE_MESSAGE,
});

const resetSnapshots = () => ({
  type: RESET_SNAPSHOT_LIST,
});

export const resetSnapshotList = () => (dispatch) => {
  dispatch(resetSnapshots());
};

export const setImageDataToSnapshot = data => (dispatch) => {
  dispatch(setImageData(data));
};

export const resetImageToSnap = () => ({
  type: RESET_IMAGE_TO_SNAP,
});

const snapImageStart = () => ({
  type: SNAP_IMAGE_START,
});

export const snapImage = () => (dispatch, getState) => {
  const {
    user: { token, at, cid },
    starshareCamera: { imageDataToSnapshot },
  } = getState();

  const { callSource, imageURL, imageID } = imageDataToSnapshot;

  dispatch(snapImageStart());

  if (callSource && imageURL && imageID) {
    return axios.post('/api/images/snapImage', {
      token,
      at,
      cid,
      ...imageDataToSnapshot,
    }).then((result) => {
      if (!result.data.apiError) {
        dispatch(snapImageSuccess(
          Object.assign({
            explanation: result.data.explanation,
            imagesLastSnapped: result.data.imagesAdded,
            apiError: result.data.apiError,
          }, imageDataToSnapshot)),
        );
      } else {
        dispatch(snapImageFail(result.data));
      }
    });
  }
};
