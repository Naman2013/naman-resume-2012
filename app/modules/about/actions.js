export const COMMIT_FEATURES = 'COMMIT_FEATURES';

const commitFeatures = payload => ({
  type: COMMIT_FEATURES,
  payload,
});

export const processFeaturePopStatus = featureID => (dispatch, getState) => {
  const { about: { sloohFeatures } } = getState();

  const flipFeature = (feature) => {
    if (feature.id === featureID) {
      return Object.assign({}, feature, { tooltip: Object.assign(feature.tooltip, { toolTipOpen: true }) });
    }

    return Object.assign({}, feature, { tooltip: Object.assign(feature.tooltip, { toolTipOpen: false }) });
  };
  const updatedFeatures = sloohFeatures.map(flipFeature);

  dispatch(commitFeatures(updatedFeatures));
};
