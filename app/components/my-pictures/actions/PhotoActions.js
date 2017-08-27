import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToGallery from './AddToGallery';
import { white } from '../../../styles/variables/colors';
import RemoveFromGallery from './RemoveFromGallery';
import { actionsStyles } from './actions.style';

class PhotoActions extends Component {
  static propTypes = {
    imageURL: PropTypes.string,
    canEditFlag: PropTypes.bool,
    customerImageId: PropTypes.number,
    canRemovePicture: PropTypes.bool,
    galleryId: PropTypes.string,
  };

  static defaultProps = {
    imageURL: '',
    canEditFlag: false,
    galleryId: null,
    canRemovePicture: false,
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
      canRemovePicture,
      canEditFlag,
      imageURL,
      galleryId,
      customerImageId,
    } = this.props;

    return (
      <div className="actions">
        {canEditFlag && <AddToGallery
          customerImageId={customerImageId}
        />}
        {canEditFlag && canRemovePicture &&
          <RemoveFromGallery
            customerImageId={customerImageId}
            galleryId={galleryId}
          />}
        <button onClick={this.handleDownloadPhotoClick} className="action">
          <span className="fa fa-download"></span>
        </button>
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
