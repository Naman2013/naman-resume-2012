import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import classnames from 'classnames';
import take from 'lodash/take';
import { canUseDOM } from 'exenv';
import {
  snapImage,
  resetImageToSnap,
  resetsnapImageMsg,
} from 'app/modules/starshare-camera/starshare-camera-actions';
import removeStyle from 'app/utils/removeStyle';
import ModalGeneric from 'app/components/common/modals/modal-generic';
import uniqueId from 'lodash/uniqueId';
import Snap from './Snap';
import './star-share-camera.scss';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      snapImage,
      resetImageToSnap,
      resetsnapImageMsg,
    },
    dispatch
  ),
});

const mapStateToProps = ({ starshareCamera }) => ({
  snapshotList: starshareCamera.snapshotList,
  snapshotMsg: starshareCamera.snapshotMsg,
  snapAPIError: starshareCamera.apiError,
  imagesLastSnapped: starshareCamera.imagesLastSnapped,
  justSnapped: starshareCamera.justSnapped,
});

function getSnapClasses(index, snappingImages) {
  const FIRST_ELEMENT = 0;
  return classnames('snapshot', {
    shake: index === FIRST_ELEMENT && snappingImages,
  });
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
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
    lightboxOpen: false,
    lightboxImage: '',
    snappingPhoto: false,
    snapshotList: [],
  };

  componentDidMount() {
    const { mobileStarShare } = this.props;
    this.getSnapshotListData();
  }

  componentDidUpdate(prevProps) {
    const { snapshotList, mobileStarShare } = this.props;
    if (
      snapshotList !== prevProps.snapshotList ||
      mobileStarShare !== prevProps.mobileStarShare
    ) {
      this.getSnapshotListData();
    }
  }

  getSnapshotListData() {
    const { snapshotList, mobileStarShare } = this.props;
    if (mobileStarShare) {
      this.setState({ snapshotList: take(snapshotList, 4) });
    } else {
      this.setState({ snapshotList });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { snapshotMsg } = this.props;
    if (snapshotMsg !== nextProps.snapshotMsg) this.openModal();
  }

  openLightbox = imageSource => {
    this.setState({
      lightboxOpen: true,
      lightboxImage: imageSource,
      snappingPhoto: false,
    });
  };

  closeLightbox = () => {
    if (canUseDOM) {
      removeStyle(window.document.getElementsByTagName('body'));
    }

    this.setState({
      lightboxOpen: false,
      lightboxImage: '',
    });
  };

  takeSnapshot = () => {
    const { actions } = this.props;
    this.setState(
      {
        snappingPhoto: true,
      },
      () => actions.snapImage()
    );
  };

  openModal = () => {
    this.setState({
      openedModal: true,
    });
  };

  closeModal = () => {
    const { actions } = this.props;
    this.setState(
      {
        openedModal: false,
      },
      () => actions.resetsnapImageMsg()
    );
  };

  render() {
    const { takeSnapshot, openLightbox, closeModal, closeLightbox } = this;
    const {
      lightboxOpen,
      lightboxImage,
      snappingPhoto,
      openedModal,
      snapshotList,
    } = this.state;
    const { snapshotMsg, snapAPIError, justSnapped } = this.props;
    const snappingImages = justSnapped && snappingPhoto;

    return (
      <div className="star-share-camera-wrapper">
        <button className="snapshot-btn" onClick={takeSnapshot}>
          <i className="fa fa-camera" />
        </button>
        {snapshotList.map((snapshot, i) => {
          return (
            <button
              key={`${snapshot.imageID}-${uniqueId()}`}
              onClick={() => openLightbox(snapshot.imageURL)}
              className={getSnapClasses(i, snappingImages)}
            >
              {snapshot.imageURL && (
                <Snap
                  width="100px"
                  height="50px"
                  key={`${snapshot.imageID}-${uniqueId()}`}
                  imageURL={snapshot.imageURL}
                />
              )}
            </button>
          );
        })}
        {snapshotMsg && snapAPIError && (
          <ModalGeneric
            open={openedModal}
            closeModal={closeModal}
            description={String(snapshotMsg)}
          />
        )}

        {lightboxImage && (
          <Lightbox
            images={[{ src: lightboxImage }]}
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            backdropClosesModal
            showImageCount={false}
          />
        )}
      </div>
    );
  }
}

export default StarShareCamera;
