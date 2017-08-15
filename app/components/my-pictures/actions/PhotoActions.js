import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToGallery from './AddToGallery';
import { white, turqoise, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';
import { borderRadius } from '../../../styles/mixins/utilities';
import { actionsStyles } from './actions.style';
class PhotoActions extends Component {
  static propTypes = {
    imageURL: PropTypes.string,
  };

  static defaultProps = {
    imageURL: '',
  };

  handleDownloadPhotoClick = (event) => {
    event.preventDefault();
    const { imageURL } = this.props;
    window.open(imageURL);
  }

  render() {
    const {
      imageURL,
      customerImageId,
    } = this.props;

    return (
      <div className="">
        <AddToGallery
          customerImageId={customerImageId}
        />
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
