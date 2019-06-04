import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Telescope from 'app/components/Telescope';
import StarShareCamera from 'app/components/telescope-details/star-share-camera/star-share-camera';
import {
  snapImage,
  resetImageToSnap,
  resetsnapImageMsg,
  setPreviousInstrument,
} from 'app/modules/starshare-camera/starshare-camera-actions';

class TelescopeImageViewerController extends Component {
  static propTypes = {
    activeInstrumentID: PropTypes.string.isRequired,
    render: PropTypes.func,
    instrStarShareCamera: PropTypes.bool,
  };

  static defaultProps = {
    render: noop,
  };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.activeInstrumentID !== this.props.activeInstrumentID) {
    //   this.props.setPreviousInstrument(this.props.activeInstrumentID);
    // }
  }

  previousInstrumentID = null;

  componentWillUnmount() {
    console.log('controller;');
  }

  render() {
    const {
      activeInstrumentID,
      render,
      justSnapped,
      resetImageToSnap,
      resetsnapImageMsg,
      snapImage,
      snapshotList,
      snapshotMsg,
      snapAPIError,
      imagesLastSnapped,
      instrStarShareCamera,
      previousInstrumentId,
    } = this.props;
    const actions = {
      snapImage,
      resetImageToSnap,
      resetsnapImageMsg,
    };
    return (
      <div>
        <Telescope activeInstrumentID={activeInstrumentID} render={render} teleCanReserveMissions={this.props.teleCanReserveMissions} />
        {instrStarShareCamera && (
          <StarShareCamera
            actions={actions}
            snapshotMsg={snapshotMsg}
            justSnapped={justSnapped}
            snapAPIError={snapAPIError}
            snapshotList={snapshotList}
            imagesLastSnapped={imagesLastSnapped}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ starshareCamera }) => ({
  snapshotList: starshareCamera.snapshotList,
  snapshotMsg: starshareCamera.snapshotMsg,
  snapAPIError: starshareCamera.apiError,
  imagesLastSnapped: starshareCamera.imagesLastSnapped,
  justSnapped: starshareCamera.justSnapped,
  previousInstrumentId: starshareCamera.previousInstrumentId,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      snapImage,
      resetImageToSnap,
      resetsnapImageMsg,
      setPreviousInstrument,
    },
    dispatch
  );

export { TelescopeImageViewerController };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TelescopeImageViewerController);
