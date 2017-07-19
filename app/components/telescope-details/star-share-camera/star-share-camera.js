import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import ModalGeneric from '../../../components/common/modals/modal-generic';
import {
  snapImage,
  resetImageToSnap,
  resetsnapImageMsg,
} from '../../../modules/starshare-camera/starshare-camera-actions';

import { black, lightGray, white, turqoise, pink } from '../../../styles/variables/colors';
import shakeStyle from './shake-animation';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    snapImage,
    resetImageToSnap,
    resetsnapImageMsg,
  }, dispatch),
});

const mapStateToProps = ({ starshareCamera }) => ({
  snapshotList: starshareCamera.snapshotList,
  snapshotMsg: starshareCamera.snapshotMsg,
  snapAPIError: starshareCamera.apiError,
  imagesLastSnapped: starshareCamera.imagesLastSnapped,
});

function getSnapClasses(index, snappingImages) {
  const FIRST_ELEMENT = 0;
  return classnames('snapshot', {
    shake: (index === FIRST_ELEMENT) && snappingImages,
  });
}

@connect(mapStateToProps, mapDispatchToProps)
class StarShareCamera extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      snapImage: PropTypes.func.isRequired,
      resetImageToSnap: PropTypes.func.isRequired,
      resetsnapImageMsg: PropTypes.func.isRequired,
    }).isRequired,
    snapshotMsg: PropTypes.string,
    snapAPIError: PropTypes.bool,
    imagesLastSnapped: PropTypes.number,
  };

  static defaultProps = {
    snapshotMsg: '',
    snapAPIError: true,
    imagesLastSnapped: 0,
  };

  state = {
    openedModal: false,
    snappingImages: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.snapshotMsg !== nextProps.snapshotMsg) {
      this.openModal();
    }
  }

  takeSnapshot = () => {
    this.props.actions.snapImage();
  }

  openModal = () => {
    this.setState({
      openedModal: true,
    });
  }

  closeModal = () => {
    // close, we need to refine when the flag for snapping is set
    // still getting some spots in time when we should not be shaking the image
    const { snapAPIError, imagesLastSnapped } = this.props;
    const snappingImages = (!snapAPIError && (imagesLastSnapped > 0));
    console.log(this.props);
    this.setState({
      snappingImages,
      openedModal: false,
    });
    this.props.actions.resetsnapImageMsg();
  }

  render() {
    const { snappingImages } = this.state;
    return (
      <div className="star-share-camera-wrapper">
        <button className="snapshot-btn" onClick={this.takeSnapshot}>
          <i className="fa fa-camera" />
        </button>
        {
          this.props.snapshotList.map((snapshot, i) => {
            return (
              <div
                key={`${snapshot.imageID}-${uniqueId()}`}
                className={getSnapClasses(i, snappingImages)}
              >
                {
                  snapshot.imageURL ? <img alt="" key={snapshot.imageID} src={snapshot.imageURL} /> : null
                }
              </div>
            );
          })
        }
        {this.props.snapshotMsg && <ModalGeneric
          open={this.state.openedModal}
          closeModal={this.closeModal}
          description={String(this.props.snapshotMsg)}
        />}

        <style jsx>{shakeStyle}</style>

        <style jsx>{`
          .star-share-camera-wrapper {
            display: flex;
          }

          .snapshot-btn {
            color: ${turqoise};
            background: transparent;
            border: 0;
            font-size: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
          }

          .snapshot-btn:focus {
            outline: none;
          }

          .snapshot-btn:hover {
            color: ${pink};
          }

          .snapshot {
            background: ${black};
            height: 40px;
            overflow: hidden;
            margin: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 4px ${lightGray};
            width: 100px;
            height: 50px;
          }

          .snapshot-index {
            position: absolute;
            color: ${white};
            z-index: 2;
            font-size: 12px;
          }
        `}</style>
      </div>
    );
  }
}

export default StarShareCamera;
