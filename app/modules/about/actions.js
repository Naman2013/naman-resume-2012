import { fetchAboutDataService } from '../../services/about';

export const COMMIT_FEATURES = 'COMMIT_FEATURES';
export const FETCH_ABOUT_DATA_START = 'FETCH_ABOUT_DATA_START';
export const FETCH_ABOUT_DATA_SUCCESS = 'FETCH_ABOUT_DATA_SUCCESS';

const commitFeatures = payload => ({
  type: COMMIT_FEATURES,
  payload,
});

export const processFeaturePopStatus = featureID => (dispatch, getState) => {
  const {
    about: { sloohFeatures },
  } = getState();

  const flipFeature = (feature) => {
    if (feature.id === featureID) {
      return Object.assign({}, feature, {
        tooltip: Object.assign(feature.tooltip, { toolTipOpen: true }),
      });
    }

    return Object.assign({}, feature, {
      tooltip: Object.assign(feature.tooltip, { toolTipOpen: false }),
    });
  };
  const updatedFeatures = sloohFeatures.map(flipFeature);

  dispatch(commitFeatures(updatedFeatures));
};

const fetchAboutDataActionStart = () => ({
  type: FETCH_ABOUT_DATA_START,
});

const fetchAboutDataActionSuccess = payload => ({
  type: FETCH_ABOUT_DATA_SUCCESS,
  payload,
});

// /////////////////////
/* FETCH ABOUT DATA */

export const fetchAboutDataAction = () => (dispatch, getState) => {
  dispatch(fetchAboutDataActionStart());

  const { token, at, cid } = getState().user;

  return fetchAboutDataService({
    token,
    at,
    cid,
  }).then((result) => {
    dispatch(fetchAboutDataActionSuccess(result.data));
  });
};
