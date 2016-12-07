import {
  getObservatoryList,
  getCurrentObservatory } from '../Telescope-Overview';

export const setupReserveByTelescope = (obsId) => (dispatch, getState) => {
  dispatch(getObservatoryList(obsId));
  console.log('finished...');
};
