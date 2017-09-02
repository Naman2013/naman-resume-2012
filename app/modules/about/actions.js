export const COMMIT_FEATURES = 'COMMIT_FEATURES';

const commitFeatures = features => ({
  type: COMMIT_FEATURES,
  features,
});

export const processFeaturePopStatus = featureID => (dispatch, getState) => {
  const { about: { sloohFeatures } } = getState();

  const flipFeature = (feature) => {
    if (feature.id === featureID) {
      return Object.assign({}, feature, { toolTipOpen: true });
    }

    return Object.assign({}, feature, { toolTipOpen: false });
  };

  const updatedFeatures = sloohFeatures.map(flipFeature);

  dispatch(commitFeatures(updatedFeatures));
};
