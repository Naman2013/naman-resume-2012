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
    customerImageId: PropTypes.number.isRequired,
    galleryId: PropTypes.string,
  };

  static defaultProps = {
    imageURL: '',
    canEditFlag: false,
    galleryId: null,
  };

  state = {
    removeLoading: false,
    removeResponse: '',
  };

  handleDownloadPhotoClick = (event) => {
    event.preventDefault();
    const { imageURL } = this.props;
    window.open(imageURL);
  }

  removeFromGallery = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { user, customerImageId, galleryId } = this.props;

    this.setState({
      removeLoading: true,
    });

    removeImageFromGallery({
      galleryId,
      customerImageId,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then((res) => {
      this.setState({
        removeLoading: false,
        removeResponse: res.data.response,
      });
    });
  }

  render() {
    const {
      canRemove,
      canEditFlag,
      imageURL,
      galleryId,
      customerImageId,
    } = this.props;

    return (
      <div className="">
        {canEditFlag && <AddToGallery
          customerImageId={customerImageId}
        />}
        {canEditFlag && canRemove &&
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
