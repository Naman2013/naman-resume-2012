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

const mapStateToProps = createStructuredSelector({
  myPictures: makeObjectObservationMyPicturesSelector(),
  objectDetails: makeObjectDetailsDataSelector(),
});

const mapDispatchToProps = {
  getMyPictures,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WriteObservationModal);
