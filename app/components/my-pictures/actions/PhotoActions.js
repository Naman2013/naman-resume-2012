import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToGallery from './AddToGallery';
import { white } from '../../../styles/variables/colors';
import RemoveFromGallery from './RemoveFromGallery';
import DeleteGallery from './DeleteGallery';
import DeleteImage from './DeleteImage';
import { actionsStyles } from './actions.style';

class PhotoActions extends Component {
  static propTypes = {
    imageURL: PropTypes.string,
    canEditFlag: PropTypes.bool,
    customerImageId: PropTypes.number,
    galleryId: PropTypes.number,
    actionSource: PropTypes.string.isRequired,
  };

  static defaultProps = {
    imageURL: '',
    canEditFlag: false,
    galleryId: null,
    customerImageId: null,
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
    } = this.props;

    const canDownload = actionSource !== 'galleries';
    const canRemovePicture = actionSource === 'galleryPictures' || actionSource === 'galleryImageDetails';
    const canDeleteGallery = actionSource === 'galleries';
    const canDeleteImage = actionSource === 'photoRoll' || actionSource === 'imageDetails';
    return (
      <div className="actions">
        {canEditFlag && <AddToGallery
          actionSource={actionSource}
          customerImageId={customerImageId}
        />}
        {canEditFlag && canRemovePicture &&
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
