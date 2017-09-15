import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToGallery from './AddToGallery';
import { white, black } from '../../../styles/variables/colors';
import RemoveFromGallery from './RemoveFromGallery';
import DeleteGallery from './DeleteGallery';
import DeleteImage from './DeleteImage';
import Heart from '../../common/heart/heart';
import { likeImage } from '../../../services/my-pictures/like-image';
import { actionsStyles } from './actions.style';

const getTheme = actionSource => (
  (actionSource === 'galleryImageDetails' || actionSource === 'imageDetails') ?
  'dark' : 'light');
class PhotoActions extends Component {
  static propTypes = {
    imageURL: PropTypes.string,
    canEditFlag: PropTypes.bool,
    customerImageId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    galleryId: PropTypes.number,
    actionSource: PropTypes.string.isRequired,
    heartProps: PropTypes.shape({
      membershipType: PropTypes.string,
      showLikePrompt: PropTypes.bool,
      likePrompt: PropTypes.string,
      canLikeFlag: PropTypes.bool,
      likeAction: PropTypes.func,
      count: PropTypes.number,
      theme: PropTypes.string,
      likeType: PropTypes.string,
      likeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  };

  static defaultProps = {
    imageURL: '',
    canEditFlag: false,
    galleryId: null,
    customerImageId: null,
    heartProps: {},
  };

  state = {
  };

  handleDownloadPhotoClick = (event) => {
    event.preventDefault();
    const { imageURL } = this.props;
    window.open(imageURL);
  }

  render() {
    const {
      actionSource,
      canEditFlag,
      galleryId,
      customerImageId,
      heartProps,
      scheduledMissionId,
    } = this.props;

    const canDownload = actionSource !== 'galleries';
    const canRemovePhoto = actionSource === 'galleryPictures' || actionSource === 'galleryImageDetails';
    const canDeleteGallery = actionSource === 'galleries';
    const canDeleteImage = actionSource === 'photoRoll' || actionSource === 'imageDetails' || actionSource === 'galleryPictures' || actionSource === 'galleryImageDetails';
    const canLikePhoto = actionSource === 'galleryImageDetails' || actionSource === 'imageDetails';
    return (
      <div className={`actions ${getTheme(actionSource)}`}>
        {canLikePhoto && <Heart
          {...heartProps}
          likeAction={likeImage}
          showLikeText={false}
        />}
        {canEditFlag && <AddToGallery
          actionSource={actionSource}
          customerImageId={customerImageId}
        />}
        {canEditFlag && canRemovePhoto &&
          <RemoveFromGallery
            customerImageId={customerImageId}
            galleryId={galleryId}
            actionSource={actionSource}
          />}
        {canEditFlag && canDeleteImage &&
          <DeleteImage
            galleryId={galleryId}
            customerImageId={customerImageId}
            actionSource={actionSource}
            scheduledMissionId={scheduledMissionId}
          />}
        {canDeleteGallery &&
          <DeleteGallery
            galleryId={galleryId}
          />}
        {canDownload && <button onClick={this.handleDownloadPhotoClick} className="action">
          <span className="fa fa-download"></span>
          <div className="action-description">Download</div>
        </button>}
        <style jsx>
        {`
          ${actionsStyles}
          .actions {
            display: flex;
            flex-direction: row;
            margin-top: -5px;
          }

          .galleryList {
            top: -15px;
            height: 250px;
            width: 200px;
            position: absolute;
            z-index: 99999;
            background-color: ${white};
          }
        `}
        </style>
      </div>
    );
  }
}

export default PhotoActions;
