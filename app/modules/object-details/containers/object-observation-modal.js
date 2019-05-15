import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getMyPictures } from '../actions';
import {
  makeObjectObservationMyPicturesSelector,
  makeObjectDetailsDataSelector,
} from '../selectors';
import { ACTION } from '../reducer';
import { WriteObservationModal } from '../components/write-observation-modal';
import { setObservationTags } from '../../image-details/thunks';

const mapStateToProps = createStructuredSelector({
  myPictures: makeObjectObservationMyPicturesSelector(),
  objectDetails: makeObjectDetailsDataSelector(),
});

const mapDispatchToProps = {
  getMyPictures,
  setObservationTags,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WriteObservationModal);
