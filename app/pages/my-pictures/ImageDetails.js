import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts } from '../../modules/my-pictures-image-details/actions';
import ImageViewer from '../../components/my-pictures/ImageViewer';
import imageDetailsStyle from './ImageDetailsStyles';
import ImageInfoPanel from '../../components/my-pictures/ImageInfoPanel';
import PhotoActions from '../../components/my-pictures/actions/PhotoActions';

const mapStateToProps = ({ myPicturesImageDetails, user }) => ({
  myPicturesImageDetails,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
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
  }


  handleEditorChange = (editorHTML) => {
    this.setState({ editorValue: editorHTML });

    // make call to update changes
  }

  setObservationLog = (text) => {

  }

  render() {
    const {
      scheduledMissionId,
      observationLog,
      error,
      fetching,
      canEditFlag,
      imageTitle,
      imageURL,
      fileData,
    } = this.props.myPicturesImageDetails;

    const {
      params: {
        customerImageId,
        shareToken,
        galleryId
      },
      user
    } = this.props;

    return (
      <div>
        <MyPicturesNavigation
          page="photo-roll"
          scheduledMissionId={scheduledMissionId}
        />
        <div className="clearfix my-pictures-container">
          <div className="container">
            <div className="left title">
              <h2 dangerouslySetInnerHTML={{ __html: imageTitle }} />
            </div>
            <div className="right-top">
              <PhotoActions
                canEditFlag={canEditFlag}
                imageURL={imageURL}
                customerImageId={customerImageId}
                user={user}
                actionSource="galleryDetails"
              />
            </div>
          </div>
          <div className="container">
            <div className="left">
              <ImageViewer fetching={fetching} error={error} currentImage={imageURL} />
            </div>
            <aside className="right">
              <ImageInfoPanel customerImageId={this.props.params.customerImageId} />
            </aside>
          </div>
        </div>
        <style jsx>{imageDetailsStyle}</style>
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
