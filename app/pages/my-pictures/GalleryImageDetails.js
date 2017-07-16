import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pagination from '../../components/common/pagination/Pagination';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts } from '../../modules/my-pictures-image-details/actions';
import { fetchGalleryPictures } from '../../modules/my-pictures-galleries/actions';
import RichTextEditor from '../../components/rich-text-editor/RichTextEditor';
import MissionTags from '../../components/common/tags/mission-tags';
import { imageDetailsStyle } from './ImageDetailsStyles';

const mapStateToProps = ({ myPicturesImageDetails, galleries }) => ({
  myPicturesImageDetails,
  galleries,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleryPictures,
    fetchImageDetailsAndCounts,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: props.myPicturesImageDetails.observationLog,
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
      maxImageCount: 1,
      galleryId,
      firstImageNumber: 1,
    });
  }

  handleNextPageClick = () => {
    const {
      firstImageNumber,
      maxImageCount,
      paginate = this.props.fetchGalleryPictures,
      paginateParams,
    } = this.props.galleries;
    paginate({
      ...paginateParams,
      firstImageNumber: firstImageNumber + maxImageCount,
      maxImageCount,
    });
  }

  handlePreviousPageClick = () => {
    const {
      firstImageNumber,
      maxImageCount,
      paginate = this.props.fetchGalleryPictures,
      paginateParams,
    } = this.props.galleries;

    paginate({
      ...paginateParams,
      firstImageNumber: firstImageNumber - maxImageCount,
      maxImageCount,
    });

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
      firstImageNumber,
      maxImageCount,
      imageCount,
      imageList,
    } = this.props.galleries;

    const firstImageNumberIndex = firstImageNumber - 1;
    const rangeText = Pagination.generateRangeText({
      startRange: firstImageNumberIndex,
      itemsPerPage: imageList.length, // use length here because there may be less than maxImageCount
    });
    const canNext = (firstImageNumberIndex + maxImageCount) < imageCount;
    const canPrevious = firstImageNumberIndex !== 0;
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
