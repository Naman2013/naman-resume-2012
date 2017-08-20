import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToGallery from './AddToGallery';
import { white } from '../../../styles/variables/colors';
import { removeImageFromGallery } from '../../../services/my-pictures/remove-image-from-gallery';
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

  state = {
    removeLoading: false,
    removeResponse: '',
  };

  handleDownloadPhotoClick = (event) => {
    event.preventDefault();
    const { imageURL } = this.props;
    window.open(imageURL);
  }

  removeFromGallery = () => {
    const { user } = this.props;

    this.setState({
      removeLoading: true,
    });

    removeImageFromGallery({
      galleryId: gallery.galleryId,
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
      customerImageId,
    } = this.props;

    return (
      <div className="">
        {canEditFlag && <AddToGallery
          customerImageId={customerImageId}
        />}
        {canEditFlag && canRemove && <button className="action" onClick={this.removeFromGallery}>
          <span className="fa fa-minus" />
        </button>}
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
