import { createSelector } from 'reselect';

export const selectObjectDetails = state => state.objectDetails;

export const makeObjectDetailsFetchingSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.isFetching
  );

export const makeObjectDetailsDataSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.objectDetails
  );

export const makeObjectDetailsMissionsSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.objectMissions
  );

export const makeObjectDataSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.objectData
  );

export const makeObjectImageDetailsSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.imageDetails
  );

export const makeObjectSharedMemberPhotosSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.sharedMemberPhotos
  );

export const makeObjectObservationDataSelector = () =>
  createSelector(
    selectObjectDetails,
    state => state.objectObservation
  );

export const makeObjectObservationMyPicturesSelector = () =>
  createSelector(
    makeObjectObservationDataSelector(),
    state => state.myPictures
  );
