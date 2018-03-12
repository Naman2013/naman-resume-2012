import createReducer from '../utils/createReducer';

// services
import fetchGuideDataService from '../../services/guides/guide-data';

/* getGuideData */
export const FETCH_GUIDE_DATA = 'FETCH_GUIDE_DATA';
export const FETCH_GUIDE_DATA_START = 'FETCH_GUIDE_DATA_START';
export const FETCH_GUIDE_DATA_FAIL = 'FETCH_GUIDE_DATA_FAIL';
export const FETCH_GUIDE_DATA_SUCCESS = 'FETCH_GUIDE_DATA_SUCCESS';
export const RESET_GUIDE_DATA = 'RESET_GUIDE_DATA';


export const fetchGuideDataAction = (guideId) => (dispatch, getState) => {
  dispatch(fetchGuideDataActionStart());

  const { token, at, cid } = getState().user;

  return fetchGuideDataService({
    token,
    at,
    cid,
    guideId,
  }).then(
    result => {
      dispatch(fetchGuideDataActionSuccess(result.data));
    }
  );
};

export const resetGuideData = () => ({
  type: RESET_GUIDE_DATA,
});

const fetchGuideDataActionStart = () => ({
  type: FETCH_GUIDE_DATA_START,
});

const fetchGuideDataActionSuccess = (payload) => ({
    type: FETCH_GUIDE_DATA_SUCCESS,
    payload,
});

const fetchGuideDataActionError = payload => ({
  type: FETCH_GUIDE_DATA_FAIL,
  payload,
});
