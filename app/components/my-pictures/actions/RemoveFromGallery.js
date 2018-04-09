import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { fetchGalleryPictures } from '../../../modules/my-pictures-gallery-pictures/actions';
import { fetchGalleriesCount } from '../../../modules/my-pictures-galleries/actions';
import { removeImageFromGallery } from '../../../services/my-pictures/remove-image-from-gallery';

const {
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({ galleryPictures, user }) => ({
  user,
  ...galleryPictures,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleryPictures,
    fetchGalleriesCount,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class RemoveFromGallery extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    maxImageCount: number.isRequired,
    firstImageNumber: number.isRequired,
    customerImageId: number.isRequired,
    galleryId: number.isRequired,
    actions: shape({
      fetchGalleryPictures: func.isRequired,
      fetchGalleriesCount: func.isRequired,
    }),
    user: shape({
      at: string,
      token: string,
      cid: string,
    }).isRequired,
  };

  static defaultProps = {
    theme: 'light',
    user: {
      at: '',
      token: '',
      cid: '',
    },
  };

  removeFromGallery = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      actionSource,
      user,
      customerImageId,
      galleryId,
      actions,
      maxImageCount,
      firstImageNumber,
    } = this.props;

    removeImageFromGallery({
      galleryId,
      customerImageId,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then((res) => {
      if (actionSource === 'galleryImageDetails') {
        browserHistory.push(`/my-pictures/galleries/${galleryId}`);
      } else {
        actions.fetchGalleryPictures({
          galleryId,
          maxImageCount,
          firstImageNumber,
          pagingMode: 'api',
        });

        actions.fetchGalleriesCount({});
      }
    });
  }
  render() {
    return (
      <div>
        <ConfirmDeleteModal
          theme={this.props.theme}
          confirmText="Are you sure you want to remove this image from the gallery?"
          buttonHoverText="Remove from gallery"
          removeAction={this.removeFromGallery}
          buttonClass="fa-minus"
        />
      </div>
    );
  }
}

export default RemoveFromGallery;
