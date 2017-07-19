import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import { findIndex } from 'lodash';
import Pagination from '../../components/common/pagination/Pagination';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts, fetchMyPicturesImageDetails } from '../../modules/my-pictures-image-details/actions';
import { fetchGalleryPictures } from '../../modules/my-pictures-galleries/actions';
import RichTextEditor from '../../components/rich-text-editor/RichTextEditor';
import MissionTags from '../../components/common/tags/mission-tags';
import { imageDetailsStyle } from './ImageDetailsStyles';

const mapStateToProps = ({ user, myPicturesImageDetails, galleries }) => ({
  myPicturesImageDetails,
  galleries,
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
    if (nextProps.galleries.imageList.length) {
      const currentImageIndex = findIndex(nextProps.galleries.imageList, image => (image.customerImageId === Number(customerImageId) && image.shareToken === String(shareToken)));
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
    const { galleries: { imageList } } = this.props;
    const { currentImageIndex, galleryId } = this.state;
    const nextImage = imageList[currentImageIndex + 1];

    if (nextImage) {
      hashHistory.push(`my-pictures/gallery/${galleryId}/show-image/${nextImage.customerImageId}/${nextImage.shareToken}`);
    }
  }

  handlePreviousPageClick = () => {
    const { galleries: { imageList } } = this.props;
    const { currentImageIndex, galleryId } = this.state;
    const previousImage = imageList[currentImageIndex - 1];
    if (previousImage) {
      hashHistory.push(`my-pictures/gallery/${galleryId}/show-image/${previousImage.customerImageId}/${previousImage.shareToken}`);
    }
  }

  handleEditorChange = (editorHTML) => {
    this.setState({ editorValue: editorHTML });
  }

  render() {
    const {
      scheduledMissionId,
      observationLog,
      error,
      fetching,
      canEditFlag,
      imageTitle,
      fileData,
    } = this.props.myPicturesImageDetails;
    const {
      imageCount,
      imageList,
    } = this.props.galleries;
    const {
      currentImageIndex
    } = this.state;

    const rangeText = Pagination.generateRangeText({
      startRange: currentImageIndex,
      itemsPerPage: 1,
    });
    const canNext = (currentImageIndex + 1) < imageCount;
    const canPrevious = currentImageIndex !== 0;
    const image = imageList[0] && imageList[0].imageURL;
    return (
      <div>
        <MyPicturesNavigation
          page="galleries"
        />
        <div className="clearfix my-pictures-container">
          <div className="container">
            <div className="left">
              <h2 dangerouslySetInnerHTML={{ __html: imageTitle }} />
            </div>
            <div className="right-top"></div>
          </div>
          <div className="container">
            <div className="left">
              <div className="image-container">
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${image})`
                  }}
                />
              </div>
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
            {/* TODO pull this into a shared component with ImageDetails.js */}
              <h4 className="header">Observation Log</h4>
              {canEditFlag ?
                <div>
                  <RichTextEditor
                    editorValue={this.state.editorValue}
                    onChange={this.handleEditorChange}
                  />
                </div>
              : <div dangerouslySetInnerHTML={{ __html: observationLog }} />
            }
              <h4 className="header">Image Tags</h4>
              <div>
                <MissionTags
                  tagClass="image"
                  tagType="observation"
                  scheduledMissionId={scheduledMissionId}
                />
              </div>
              <h4 className="header">File Data</h4>
              <div>{Object.keys(fileData).map((key) => {
                return <div key={key}><span className="bold">{key}</span>: {fileData[key]}</div>;
              })}</div>
            </aside>
          </div>
        </div>
        {imageDetailsStyle}
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
    canEditFlag: false,
    fileData: {},
  },
  galleries: {
    imageList: []
  },
  actions: {},
};

ImageDetails.propTypes = {
  myPicturesImageDetails: {
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
  },
  galleries: {
    imageList: PropTypes.arrayOf(PropTypes.shape({
      imageURL: PropTypes.string,
    }))
  },
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
