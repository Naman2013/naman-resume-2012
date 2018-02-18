import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { fetchPhotoRoll, fetchMyPicturesCount, fetchMissionPhotos } from '../../../modules/my-pictures/actions';
import { fetchGalleryPicsCount, fetchGalleryPictures } from '../../../modules/my-pictures-gallery-pictures/actions';
import { deleteImage } from '../../../services/my-pictures/delete-image';

const {
  func,
  number,
  shape,
  string,
  oneOfType,
} = PropTypes;

const mapStateToProps = ({ myPictures, user }) => ({
  user,
  ...myPictures.photoRoll,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPhotoRoll,
    fetchMissionPhotos,
    fetchMyPicturesCount,
    fetchGalleryPicsCount,
    fetchGalleryPictures,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class DeleteImage extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    galleryId: string,
    maxImageCount: number.isRequired,
    firstImageNumber: number.isRequired,
    customerImageId: oneOfType([number, string]).isRequired,
    actions: shape({
      fetchPhotoRoll: func.isRequired,
      fetchMyPicturesCount: func.isRequired,
    }),
    user: shape({
      at: string,
      token: string,
      cid: string,
    }).isRequired,
  };

  static defaultProps = {
    theme: 'light',
    galleryId: null,
    user: {
      at: '',
      token: '',
      cid: ''
    }
  };

  removeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      user,
      galleryId,
      actionSource,
      customerImageId,
      actions,
      maxImageCount,
      firstImageNumber,
      scheduledMissionId,
    } = this.props;

    let link;

    deleteImage({
      customerImageId,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then((res) => {
      if (actionSource === 'galleryPictures') {
        actions.fetchGalleryPictures({
          customerImageId,
          maxImageCount,
          firstImageNumber,
          pagingMode: 'api',
          galleryId,
        });

        link = `/my-pictures/galleries/${galleryId}`;
      } else {
        if (scheduledMissionId) {
          actions.fetchMissionPhotos({
            scheduledMissionId,
            customerImageId,
            maxImageCount,
            firstImageNumber,
            pagingMode: 'api',
          });
          link = `/my-pictures/missions/${scheduledMissionId}`;
        } else {
          actions.fetchPhotoRoll({
            customerImageId,
            maxImageCount,
            firstImageNumber,
            pagingMode: 'api',
          });
          actions.fetchMyPicturesCount({});
          link = '/my-pictures/photo-roll';
        }
      }

      browserHistory.push(link);
    });
  }

  render() {
    return (
      <div>
        <ConfirmDeleteModal
          theme={this.props.theme}
          confirmText="Are you sure you want to permanently delete this image?"
          buttonHoverText="Delete Image"
          removeAction={this.removeImage}
          buttonClass="fa-close"
        />
      </div>
    );
  }
}

export default DeleteImage;
