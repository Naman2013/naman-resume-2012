import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import GenericLoadingBox from '../common/loading-screens/generic-loading-box';
import ModalGeneric from '../common/modals/modal-generic';
import PhotoList from './PhotoList';
import MissionList from './MissionList';
import Pagination from '../common/pagination/Pagination';
import FITModalHeader from './FIT-image-modal-partials/FITModalHeader';
import FITModalBody from './FIT-image-modal-partials/FITModalBody';
import { resetFITImages } from '../../modules/my-pictures/actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetFITImages,
  }, dispatch),
});

const mapStateToProps = ({ myPictures }) => ({
  fetchingFIT: myPictures.loadedFITSImages.fetchingImages,
  fetchingFITError: myPictures.loadedFITSImages.error,
  FITImages: myPictures.loadedFITSImages.images,
});

@connect(mapStateToProps, mapDispatchToProps)
class PhotoView extends Component {
  constructor(props) {
    super(props);

    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
  }

  state = {
    startRange: 0,
  }

  handleNextPageClick() {
    const { imagesPerPage, type } = this.props;
    const { startRange } = this.state;
    if (type !== 'gallery') {
      window.scrollTo(0, 0);
    }
    this.setState({
      startRange: startRange + imagesPerPage,
    });
  }

  handlePreviousPageClick() {
    const { imagesPerPage, type } = this.props;
    const { startRange } = this.state;
    if (type !== 'gallery') {
      window.scrollTo(0, 0);
    }
    this.setState({
      startRange: startRange - imagesPerPage,
    });
  }

  handleCloseFITSModal = () => {
    this.props.actions.resetFITImages();
  }

  render() {
    const {
      fetching,
      imageList,
      error,
      type,
      imagesPerPage,
      fetchingFIT,
      fetchingFITError,
      FITImages,
    } = this.props;

    const { startRange } = this.state;

    const imageRange = _.slice(imageList, startRange, startRange + imagesPerPage);
    const rangeText = Pagination.generateRangeText({
      startRange,
      itemsPerPage: imageRange.length,
    });

    const canNext = (startRange + imagesPerPage) < imageList.length;
    const canPrevious = startRange !== 0;
    const showFITSModal = FITImages.imageCount > 0;

    if (fetching) {
      return <GenericLoadingBox />;
    }

    if (error) {
      return <GenericLoadingBox text="We apologize, there was an issue fetching your images." />;
    }

    if (imageList.length === 0) {
      return <GenericLoadingBox text="No images are available." />;
    }

    return (
      <div>
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

        {
          type === 'covers' ?
            <MissionList imageList={imageRange} /> : null
        }
        {
          type === 'images' ?
            <PhotoList imageList={imageRange} /> : null
        }
        {
          type === 'gallery' ?
            <PhotoList imageList={imageRange} galleryType /> : null
        }

        <Pagination
          totalCount={imageList.length}
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
  imagesPerPage: 9,
};

// TODO: increase validation for the imageList types.
PhotoView.propTypes = {
  fetching: PropTypes.bool.isRequired,
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
  })).isRequired,
  error: PropTypes.bool.isRequired,
  imagesPerPage: PropTypes.number,
  type: PropTypes.oneOf(['covers', 'images', 'gallery']).isRequired,
};

export default PhotoView;
