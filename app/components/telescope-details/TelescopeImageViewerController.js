import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Telescope from 'components/Telescope';
import { StarShareCamera } from 'components/telescope-details/star-share-camera';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  snapImage,
  resetImageToSnap,
  resetsnapImageMsg,
} from 'modules/starshare-camera/starshare-camera-actions';

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
    const { snapImage } = this.props;

    return (
      <div>
        <Telescope
          activeInstrumentID={this.props.activeInstrumentID}
          previousInstrumentID={this.previousInstrumentID}
          render={this.props.render}
        />
        <StarShareCamera snapImage={snapImage} />
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
