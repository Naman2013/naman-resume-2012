import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getMyPictures } from '../actions';
import {
  makeObjectObservationIsFetchingSelector,
  makeObjectObservationMyPicturesSelector,
  makeObjectDetailsDataSelector,
  makeObjectImageDetailsSelector,
} from '../selectors';
import { ACTION } from '../reducer';
import { WriteObservationModal } from '../components/write-observation-modal';
import { setObservationTags } from '../../image-details/thunks';
import { makeUserSelector } from '../../user/selectors';
import { shareMemberPicture } from '../../share-member-photo/actions';

const mapStateToProps = createStructuredSelector({
  isFetching: makeObjectObservationIsFetchingSelector(),
  myPictures: makeObjectObservationMyPicturesSelector(),
  objectDetails: makeObjectDetailsDataSelector(),
  imageDetails: makeObjectImageDetailsSelector(),
  user: makeUserSelector(),
});

const mapDispatchToProps = {
  getMyPictures,
  setObservationTags,
  shareMemberPicture,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WriteObservationModal);
