export const UPDATE_SLOOH_FEATURE_THREE = 'UPDATE_SLOOH_FEATURE_THREE';

export const updateFeatureThree = ({ registrationURL }) => ({
  type: UPDATE_SLOOH_FEATURE_THREE,
  payload: {
    actionUrl: registrationURL,
  },
});
