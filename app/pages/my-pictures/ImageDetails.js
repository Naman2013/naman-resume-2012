import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts } from '../../modules/my-pictures-image-details/actions';
import { verifyMyPicsOwner } from '../../modules/my-pictures-verify-owner/actions';
import ImageViewer from '../../components/my-pictures/ImageViewer';
import imageDetailsStyle from './ImageDetailsStyles';
import ImageInfoPanel from '../../components/my-pictures/ImageInfoPanel';
import PhotoActions from '../../components/my-pictures/actions/PhotoActions';
import ModalGeneric from '../../components/common/modals/modal-generic';
import { resetShareMemberPhoto } from '../../modules/share-member-photo/actions';
import { setPageTitle, setStandardMeta, setOpenGraphMeta } from '../../modules/pageLevelMetaContent/seo-actions';

const mapStateToProps = ({ myPicturesImageDetails, user, shareMemberPhoto }) => ({
  myPicturesImageDetails,
  showSharePrompt: shareMemberPhoto.showSharePrompt,
  sharePrompt: shareMemberPhoto.sharePrompt,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchImageDetailsAndCounts,
    verifyMyPicsOwner,
    resetShareMemberPhoto,
    setPageTitle,
    setStandardMeta,
    setOpenGraphMeta,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: props.myPicturesImageDetails.observationLog,
      showSharePicturePrompt: false,
      sharePicturePrompt: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showSharePrompt !== this.state.showSharePicturePrompt) {
      this.setState({
        showSharePicturePrompt: nextProps.showSharePrompt,
        sharePicturePrompt: nextProps.sharePrompt,
      });
    }

    /* set the Page Meta Tags and Open Graph tagging */
    this.props.actions.setPageTitle(nextProps.myPicturesImageDetails.imageTitle);
    this.props.actions.setStandardMeta({ description: nextProps.myPicturesImageDetailssocialShareDescription });
    this.props.actions.setOpenGraphMeta({ type: "image", title: nextProps.myPicturesImageDetails.imageTitle, description: nextProps.myPicturesImageDetails.socialShareDescription, image: nextProps.myPicturesImageDetails.imageURL });

  }

  componentWillMount() {
    window.scrollTo(0, 0);
    const {
      actions,
      params: {
        customerImageId,
        shareToken,
        galleryId
      }
    } = this.props;
    actions.verifyMyPicsOwner({
      itemId: customerImageId,
      itemType: 'image'
    }).then(() => {

      if (this.props.myPicturesImageDetails.customerImageId !== customerImageId) { // don't call api for info we already have
        actions.fetchImageDetailsAndCounts({
          customerImageId,
          shareToken,
        });
      }
    });
  }


  handleEditorChange = (editorHTML) => {
    this.setState({ editorValue: editorHTML });

    // make call to update changes
  }

  closeModal = () => {
    this.setState({
      showSharePicturePrompt: false,
    });
    this.props.actions.resetShareMemberPhoto();
  }

  render() {
    const {
      scheduledMissionId,
      observationLog,
      canShareFlag,
      error,
      fetching,
      canEditFlag,
      likePrompt,
      likesCount,
      imageTitle,
      imageURL,
      fileData,
      canLikeFlag,
      photoViewFullURL,
      socialShareDescription,
    } = this.props.myPicturesImageDetails;

    const {
      params: {
        customerImageId,
        shareToken,
        galleryId,
        scheduledMissionId: scheduledMissionIdParam // only images coming from mission pictures page will have this.
      },
      user
    } = this.props;

    const { sharePicturePrompt, showSharePicturePrompt } = this.state;

    const heartProps = {
      likePrompt,
      canLikeFlag,
      count: likesCount,
      theme: 'buttonOnly',
      likeId: customerImageId,
    };

    // only send scheduledMissionId to PhotoActions if user is coming from the Mission Images page
    const photoActionsScheduledMissionId = scheduledMissionIdParam ? scheduledMissionId : null;

    return (
      <div>
        <ModalGeneric
          open={showSharePicturePrompt}
          closeModal={this.closeModal}
          description={String(sharePicturePrompt)}
        />
        {canEditFlag && <MyPicturesNavigation
          page="photo-roll"
          scheduledMissionId={scheduledMissionId}
        />}
        <div className="clearfix my-pictures-container">
          <div className="container">
            <div className="left title">
              <h2 dangerouslySetInnerHTML={{ __html: imageTitle }} />
            </div>
            <div className="right-top">
              <PhotoActions
                canShareFlag={canShareFlag}
                canEditFlag={canEditFlag}
                imageURL={imageURL}
                customerImageId={customerImageId}
                user={user}
                actionSource="imageDetails"
                heartProps={heartProps}
                scheduledMissionId={photoActionsScheduledMissionId}
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
