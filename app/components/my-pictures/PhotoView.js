import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GenericLoadingBox from '../common/loading-screens/generic-loading-box';
import ModalGeneric from '../common/modals/modal-generic';
import PhotoList from './PhotoList';
import MissionList from './MissionList';
import GalleryList from './GalleryList';
import PublicGalleryList from './PublicGalleryList';
import Pagination from '../common/pagination/Pagination';
import FITModalHeader from './FIT-image-modal-partials/FITModalHeader';
import FITModalBody from './FIT-image-modal-partials/FITModalBody';
import { resetFITImages } from '../../modules/my-pictures/actions';
import { resetShareMemberPhoto } from '../../modules/share-member-photo/actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetFITImages,
      resetShareMemberPhoto,
    },
    dispatch
  ),
});

const mapStateToProps = ({ myPictures, shareMemberPhoto }) => ({
  fetchingFIT: myPictures.loadedFITSImages.fetchingImages,
  fetchingFITError: myPictures.loadedFITSImages.error,
  FITImages: myPictures.loadedFITSImages.images,
  showSharePrompt: shareMemberPhoto.showSharePrompt,
  sharePrompt: shareMemberPhoto.sharePrompt,
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class PhotoView extends Component {
  constructor(props) {
    super(props);

    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
  }

  state = {
    showSharePicturePrompt: false,
    sharePicturePrompt: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.showSharePrompt !== this.state.showSharePicturePrompt) {
      this.setState({
        showSharePicturePrompt: nextProps.showSharePrompt,
        sharePicturePrompt: nextProps.sharePrompt,
      });
    }
  }

  handleNextPageClick() {
    const {
      firstImageNumber,
      maxImageCount,
      paginate,
      paginateParams,
      missions,
      type,
    } = this.props;
    if (type !== 'gallery') {
      window.scrollTo(0, 0);
    }

    if (missions) {
      paginate({
        ...paginateParams,
        firstMissionNumber: firstImageNumber + maxImageCount,
        maxMissionCount: maxImageCount,
      });
    } else {
      paginate({
        ...paginateParams,
        firstImageNumber: firstImageNumber + maxImageCount,
        maxImageCount,
      });
    }
  }

  handlePreviousPageClick() {
    const {
      firstImageNumber,
      maxImageCount,
      paginate,
      paginateParams,
      type,
      missions,
    } = this.props;
    if (type !== 'gallery') {
      window.scrollTo(0, 0);
    }
    if (missions) {
      paginate({
        ...paginateParams,
        firstMissionNumber: firstImageNumber - maxImageCount,
        maxMissionCount: maxImageCount,
      });
    } else {
      paginate({
        ...paginateParams,
        firstImageNumber: firstImageNumber - maxImageCount,
        maxImageCount,
      });
    }
  }

  handleCloseFITSModal = () => {
    this.props.actions.resetFITImages();
  };

  closeModal = () => {
    this.setState({
      showSharePicturePrompt: false,
    });

    this.props.actions.resetShareMemberPhoto();
  };

  render() {
    const {
      fetching,
      imageList,
      error,
      type,
      galleryList,
      scheduledMissionId,
      firstImageNumber,
      imageCount,
      maxImageCount,
      fetchingFIT,
      fetchingFITError,
      FITImages,
      showSharePrompt,
      sharePrompt,
    } = this.props;

    const { sharePicturePrompt, showSharePicturePrompt } = this.state;
    const firstImageNumberIndex = firstImageNumber - 1;
    const rangeText = Pagination.generateRangeText({
      startRange: firstImageNumberIndex,
      itemsPerPage: imageList ? imageList.length : galleryList.length, // use length here because there may be less than maxImageCount
    });

    const canNext = firstImageNumberIndex + maxImageCount < imageCount;
    const canPrevious = firstImageNumberIndex !== 0;
    const showFITSModal = FITImages.imageCount > 0;
    const galleryTypes = ['gallery', 'galleryImages', 'publicGalleries'];
    if (fetching) {
      return <GenericLoadingBox />;
    }

    if (error) {
      return (
        <GenericLoadingBox text="We apologize, there was an issue fetching your images." />
      );
    }

    if (
      galleryTypes.indexOf(type) === -1
        ? imageList.length === 0
        : galleryList.length === 0
    ) {
      return <GenericLoadingBox text="No images are available." />;
    }

    return (
      <div>
        <ModalGeneric
          open={showSharePicturePrompt}
          closeModal={this.closeModal}
          description={String(sharePicturePrompt)}
        />
        <ModalGeneric
          title={
            <FITModalHeader
              headerTitle={FITImages.popupTitleText}
              ownerLocation={FITImages.ownerLocation}
              ownerFirstName={FITImages.ownerFirstName}
              ownerDisplayName={FITImages.ownerDisplayName}
              ownerMembershipType={FITImages.ownerMembershipType}
              ownerMemberSince={FITImages.ownerMemberSince}
              ownerAvatarURL={FITImages.ownerAvatarURL}
              missionDateTime={FITImages.missionDateTime}
              missionIconURL={FITImages.missionIconURL}
              missionObsName={FITImages.missionObsName}
              missionPierName={FITImages.missionPierName}
              missionTitle={FITImages.missionTitle}
              takenByText={FITImages.takenByText}
            />
          }
          description={
            <FITModalBody
              groupList={FITImages.groupList}
              infoText={FITImages.infoText}
            />
          }
          open={showFITSModal}
          closeModal={this.handleCloseFITSModal}
          closeButtonText={FITImages.buttonText}
        />

        {type === 'covers' ? <MissionList imageList={imageList} /> : null}
        {type === 'images' ? (
          <PhotoList
            imageList={imageList}
            scheduledMissionId={scheduledMissionId}
          />
        ) : null}

        {type === 'galleryImages' ? (
          <GalleryList galleryList={galleryList} isImages={true} />
        ) : null}

        {type === 'gallery' ? <GalleryList galleryList={galleryList} /> : null}

        {type === 'publicGalleries' ? (
          <PublicGalleryList galleryList={galleryList} />
        ) : null}

        <Pagination
          totalCount={imageCount}
          currentRange={rangeText}
          handleNextPageClick={this.handleNextPageClick}
          handlePreviousPageClick={this.handlePreviousPageClick}
          canNext={canNext}
          canPrevious={canPrevious}
        />
      </div>
    );
  }
}

PhotoView.defaultProps = {
  maxImageCount: 9,
  imageCount: 0,
  firstImageNumber: 1,
  paginateParams: {},
  missions: false,
  imageList: null,
  galleryList: null,
  sharePrompt: '',
  showSharePrompt: false,
};

// TODO: increase validation for the imageList types.
PhotoView.propTypes = {
  sharePrompt: PropTypes.string,
  showSharePrompt: PropTypes.bool,
  fetching: PropTypes.bool.isRequired,
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string.isRequired,
      imageId: PropTypes.number.isRequired,
    })
  ),
  galleryList: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string.isRequired,
      galleryId: PropTypes.any.isRequired,
    })
  ),
  paginateParams: PropTypes.object,
  paginate: PropTypes.func.isRequired,
  imageCount: PropTypes.number,
  maxImageCount: PropTypes.number,
  firstImageNumber: PropTypes.number,
  error: PropTypes.bool.isRequired,
  missions: PropTypes.bool,
  type: PropTypes.oneOf([
    'covers',
    'images',
    'gallery',
    'galleryImages',
    'publicGalleries',
  ]).isRequired,
};

export default PhotoView;
