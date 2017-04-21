import createReducer from '../utils/createReducer';

const INCREMENT_ADS_DISPLAYED = 'INCREMENT_ADS_DISPLAYED';

export const incrementAdDisplayCounter = () => ({
  type: INCREMENT_ADS_DISPLAYED,
});

const initialState = {
  adsDisplayed: 0,
};

export default createReducer(initialState, {
  [INCREMENT_ADS_DISPLAYED](state) {
    let { adsDisplayed } = state;
    return {
      adsDisplayed: (adsDisplayed += 1),
    };
  },
});
