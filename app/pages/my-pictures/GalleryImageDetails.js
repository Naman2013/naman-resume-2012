import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { findIndex } from 'lodash';
import Pagination from '../../components/common/pagination/Pagination';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts, fetchMyPicturesImageDetails } from '../../modules/my-pictures-image-details/actions';
import { fetchGalleryPictures } from '../../modules/my-pictures-gallery-pictures/actions';
import ImageViewer from '../../components/my-pictures/ImageViewer';
import imageDetailsStyle from './ImageDetailsStyles';
import ImageInfoPanel from '../../components/my-pictures/ImageInfoPanel';

const mapStateToProps = ({ user, myPicturesImageDetails, galleryPictures }) => ({
  myPicturesImageDetails,
  galleryPictures,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMyPicturesImageDetails,
    fetchGalleryPictures,
    fetchImageDetailsAndCounts,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageDetails extends Component {
  constructor(props) {
    super(props);

    const {
      params: {
        galleryId
      },
    } = this.props;

    this.state = {
      editorValue: props.myPicturesImageDetails.observationLog,
      galleryId,
      currentImageIndex: 0,
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    const {
      params: {
        customerImageId,
        shareToken,
        galleryId
      }
    } = this.props;

    this.props.actions.fetchImageDetailsAndCounts({
      customerImageId,
      shareToken,
    });
    this.props.actions.fetchGalleryPictures({
      galleryId,
      firstImageNumber: 1,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      params: {
        customerImageId,
        shareToken,
        galleryId,
      }
    } = nextProps;
    if (nextProps.galleryPictures.imageList.length) {
      const currentImageIndex = findIndex(nextProps.galleryPictures.imageList, image => (image.customerImageId === Number(customerImageId) && image.shareToken === String(shareToken)));
      this.setState({
        currentImageIndex,
      });
    }
    if (Number(this.props.params.customerImageId) !== Number(customerImageId) || String(this.props.params.shareToken) !== String(shareToken)) {
      this.props.actions.fetchImageDetailsAndCounts({
        customerImageId: nextProps.params.customerImageId,
        shareToken: nextProps.params.shareToken,
      });
      this.props.actions.fetchGalleryPictures({
        galleryId,
        firstImageNumber: 1,
      });
    }

  }

  handleNextPageClick = () => {
    const { galleryPictures: { imageList } } = this.props;
    const { currentImageIndex, galleryId } = this.state;
    const nextImage = imageList[currentImageIndex + 1];

    if (nextImage) {
      browserHistory.push(`/my-pictures/gallery/${galleryId}/show-image/${nextImage.customerImageId}/${nextImage.shareToken}`);
    }
  }

  handlePreviousPageClick = () => {
    const { galleryPictures: { imageList } } = this.props;
    const { currentImageIndex, galleryId } = this.state;
    const previousImage = imageList[currentImageIndex - 1];
    if (previousImage) {
      browserHistory.push(`/my-pictures/gallery/${galleryId}/show-image/${previousImage.customerImageId}/${previousImage.shareToken}`);
    }
  }

  handleEditorChange = (editorHTML) => {
    this.setState({ editorValue: editorHTML });
  }

  render() {
    const {
      scheduledMissionId,
      imageTitle,
    } = this.props.myPicturesImageDetails;
    const {
      error,
      fetching,
      imageCount,
      imageList,
    } = this.props.galleryPictures;
    const {
      currentImageIndex,
      galleryId
    } = this.state;

    const rangeText = Pagination.generateRangeText({
      startRange: currentImageIndex,
      itemsPerPage: 1,
    });
    const canNext = (currentImageIndex + 1) < imageCount;
    const canPrevious = currentImageIndex !== 0;
    const image = imageList[currentImageIndex] && imageList[currentImageIndex].imageURL;

    return (
      <div>
        <MyPicturesNavigation
          page="galleryImages"
          galleryId={galleryId}
        />
        <div className="clearfix my-pictures-container">
          <div className="container">
            <div className="left">
              <h2 dangerouslySetInnerHTML={{ __html: imageTitle }} />
            </div>
            <div className="right-top"></div>
          </div>
          <div className="container">
            <div className="left my-pic-galleries">
              <ImageViewer currentImage={image} fetching={fetching} error={error} />
              <Pagination
                totalCount={imageCount}
                currentRange={rangeText}
                handleNextPageClick={this.handleNextPageClick}
                handlePreviousPageClick={this.handlePreviousPageClick}
                canNext={canNext}
                canPrevious={canPrevious}
              />
            </div>
            <aside className="right">
              <ImageInfoPanel customerImageId={this.props.params.customerImageId}  />
            </aside>
          </div>
        </div>
        <style jsx>{imageDetailsStyle}</style>
        <style jsx global>
        {`
          .my-pic-galleries .count {
            padding: 0 200px;
          }
        `}
        </style>
      </div>
    );
  }
}

ImageDetails.defaultProps = {
  myPicturesImageDetails: {
    fetching: false,
    error: false,
    imageTitle: '',
    imageURL: '',
    zoom: 0,
    originx: 0,
    originy: 0,
    observationLog: '',
    shareToken: '',
    likesCount: 0,
    canLikeFlag: false,
    showLikePrompt: false,
    likePrompt: '',
    canDownloadFlag: false,
    scheduledMissionId: 0,
    canEditFlag: false,
    fileData: {},
  },
  galleryPictures: {
    imageList: []
  },
  actions: {},
};

ImageDetails.propTypes = {
  myPicturesImageDetails: PropTypes.shape({
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    imageTitle: PropTypes.string,
    imageURL: PropTypes.string,
    zoom: PropTypes.number,
    originx: PropTypes.number,
    originy: PropTypes.number,
    observationLog: PropTypes.string,
    shareToken: PropTypes.string,
    likesCount: PropTypes.number,
    canLikeFlag: PropTypes.bool,
    showLikePrompt: PropTypes.bool,
    likePrompt: PropTypes.string,
    canDownloadFlag: PropTypes.bool,
    canEditFlag: PropTypes.bool,
    fileData: PropTypes.shape({}),
  }),
  galleryPictures: PropTypes.shape({
    imageList: PropTypes.arrayOf(PropTypes.shape({
      imageURL: PropTypes.string,
    }))
  }),
  // actions: PropTypes.shape({
  //   fetchImageDetailsAndCounts,
  // }),
  params: PropTypes.shape({
    customerImageId: PropTypes.string,
    shareToken: PropTypes.string,
    galleryId: PropTypes.string,
  }).isRequired,
};

export default ImageDetails;
