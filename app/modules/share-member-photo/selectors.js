import { createSelector } from 'reselect';

export const selectShareMemberPhoto = state => state.shareMemberPhoto;

export const makeShareMemberPhotoDataSelector = () =>
  createSelector(
    selectShareMemberPhoto,
    state => state.shareMemberPhotoData
  );
