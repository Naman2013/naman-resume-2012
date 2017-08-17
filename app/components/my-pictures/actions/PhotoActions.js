import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToGallery from './AddToGallery';
import RemoveFromGallery from './RemoveFromGallery';
import { white } from '../../../styles/variables/colors';
import { actionsStyles } from './actions.style';
class PhotoActions extends Component {
  static propTypes = {
    imageURL: PropTypes.string,
    canEditFlag: PropTypes.bool,
    customerImageId: PropTypes.number.isRequired,
  };

  static defaultProps = {
    imageURL: '',
    canEditFlag: false,
  };

  handleDownloadPhotoClick = (event) => {
    event.preventDefault();
    const { imageURL } = this.props;
    window.open(imageURL);
  }

  render() {
    const {
      canEditFlag,
      imageURL,
      customerImageId,
    } = this.props;

    return (
      <div className="">
        {canEditFlag && <AddToGallery
          customerImageId={customerImageId}
        />}
        {canEditFlag && <RemoveFromGallery
          customerImageId={customerImageId}
        />}
        <button onClick={this.handleDownloadPhotoClick} className="action">
          <span className="fa fa-download"></span>
        </button>
        <style jsx>
        {`
          ${actionsStyles}
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
