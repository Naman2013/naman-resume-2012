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
} from 'app/modules/starshare-camera/starshare-camera-actions';

class TelescopeImageViewerController extends Component {
  static propTypes = {
    activeInstrumentID: PropTypes.string.isRequired,
    render: PropTypes.func,
  };

  static defaultProps = {
    render: noop,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeInstrumentID !== this.props.activeInstrumentID) {
      this.previousInstrumentID = this.props.activeInstrumentID;
    }
  }

  previousInstrumentID = null;

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
    } = this.props;
    const actions = {
      snapImage,
      resetImageToSnap,
      resetsnapImageMsg,
    };
    return (
      <div>
        <Telescope
          activeInstrumentID={activeInstrumentID}
          previousInstrumentID={this.previousInstrumentID}
          render={render}
        />
        <StarShareCamera
          actions={actions}
          snapshotMsg={snapshotMsg}
          justSnapped={justSnapped}
          snapAPIError={snapAPIError}
          snapshotList={snapshotList}
          imagesLastSnapped={imagesLastSnapped}
        />
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
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      snapImage,
      resetImageToSnap,
      resetsnapImageMsg,
    },
    dispatch
  );

export { TelescopeImageViewerController };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TelescopeImageViewerController);
