import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToGallery from './AddToGallery';
import { white } from '../../../styles/variables/colors';
import RemoveFromGallery from './RemoveFromGallery';
import DeleteGallery from './DeleteGallery';
import DeleteImage from './DeleteImage';
import Heart from '../../common/heart/heart';
import { likeImage } from '../../../services/my-pictures/like-image';
import { actionsStyles } from './actions.style';

class PhotoActions extends Component {
  static propTypes = {
    imageURL: PropTypes.string,
    canEditFlag: PropTypes.bool,
    customerImageId: PropTypes.number,
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
    } = this.props;

    const canDownload = actionSource !== 'galleries';
    const canRemovePhoto = actionSource === 'galleryPictures' || actionSource === 'galleryImageDetails';
    const canDeleteGallery = actionSource === 'galleries';
    const canDeleteImage = actionSource === 'photoRoll' || actionSource === 'imageDetails';
    const canLikePhoto = actionSource === 'galleryImageDetails' || actionSource === 'imageDetails';
    return (
      <div className="actions">
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
            customerImageId={customerImageId}
            actionSource={actionSource}
          />}
        {canDeleteGallery &&
          <DeleteGallery
            galleryId={galleryId}
          />}
        {canDownload && <button onClick={this.handleDownloadPhotoClick} className="action">
          <span className="fa fa-download"></span>
        </button>}
        <style jsx>
        {`
          ${actionsStyles}
          .actions {
            display: flex;
            flex-direction: row;
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
