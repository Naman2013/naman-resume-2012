import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import ModalGeneric from '../../../components/common/modals/modal-generic';
import Snap from './Snap';
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
    lightboxOpen: false,
    lightboxImage: '',
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.snapshotMsg !== nextProps.snapshotMsg) {
      this.openModal();
    }
  }

  openLightbox = (imageSource, event) => {
    if (event) { event.preventDefault(); }
    this.setState({
      lightboxOpen: true,
      lightboxImage: imageSource,
      snappingImages: false,
    });
  };

  closeLightbox = () => {
    this.setState({
      lightboxOpen: false,
      lightboxImage: '',
    });
  };

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
    this.setState({
      snappingImages,
      openedModal: false,
    });
    this.props.actions.resetsnapImageMsg();
  }

  render() {
    const { snappingImages, lightboxOpen, lightboxImage } = this.state;

    return (
      <div className="star-share-camera-wrapper">
        <button className="snapshot-btn" onClick={this.takeSnapshot}>
          <i className="fa fa-camera" />
        </button>
        {
          this.props.snapshotList.map((snapshot, i) => {
            return (
              <button
                onClick={(event) => { this.openLightbox(snapshot.imageURL, event); }}
                key={`${snapshot.imageID}-${uniqueId()}`}
                className={getSnapClasses(i, snappingImages)}
              >
                {
                  snapshot.imageURL
                    ? <Snap key={snapshot.imageID} width="100px" height="50px" imageURL={snapshot.imageURL} />
                    : null
                }
              </button>
            );
          })
        }
        {
          this.props.snapshotMsg && <ModalGeneric
            open={this.state.openedModal}
            closeModal={this.closeModal}
            description={String(this.props.snapshotMsg)}
          />
        }

        {
          lightboxImage &&
            <Lightbox
              images={[{ src: lightboxImage }]}
              isOpen={lightboxOpen}
              onClose={this.closeLightbox}
              backdropClosesModal={true}
              showImageCount={false}
            />
        }

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
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 4px ${lightGray};
            width: 100px;
            height: 50px;
            outline: 0;
            border: none;
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
