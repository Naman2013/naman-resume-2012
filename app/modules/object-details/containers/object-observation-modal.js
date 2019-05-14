import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getMyPictures } from '../actions';
import {
  makeObjectObservationMyPicturesSelector,
  makeObjectDetailsDataSelector,
} from '../selectors';
import { ACTION } from '../reducer';
import { WriteObservationStep1 } from '../components/write-observation-step1';

class ObjectObservationModal extends Component {
  render() {
    const { getMyPictures, myPictures, objectDetails } = this.props;

    return (
      <Fragment>
        <WriteObservationStep1
          getMyPictures={getMyPictures}
          myPictures={myPictures}
          objectDetails={objectDetails}
        />
      </Fragment>
    );
  }
}

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
)(ObjectObservationModal);
