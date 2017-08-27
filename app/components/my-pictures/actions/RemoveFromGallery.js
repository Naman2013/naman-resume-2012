import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { white, black, pink } from '../../../styles/variables/colors';
import { secondaryFont, primaryFont } from '../../../styles/variables/fonts';
import { fetchGalleryPictures } from '../../../modules/my-pictures-gallery-pictures/actions';
import { removeImageFromGallery } from '../../../services/my-pictures/remove-image-from-gallery';

const {
  arrayOf,
  bool,
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
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class RemoveFromGallery extends Component {

  static propTypes = {
    maxImageCount: number.isRequired,
    firstImageNumber: number.isRequired,
    customerImageId: number.isRequired,
    galleryId: number.isRequired,
    actions: shape({
      fetchGalleryPictures: func.isRequired,
    }),
    user: shape({
      at: string,
      token: string,
      cid: string,
    }).isRequired,
  };
  static defaultProps = {
    user: {
      at: '',
      token: '',
      cid: ''
    }
  };

  removeFromGallery = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
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
      actions.fetchGalleryPictures({
        galleryId,
        maxImageCount,
        firstImageNumber,
        pagingMode: 'api',
      });
    });
  }
  render() {
    return (
      <div>
        <ConfirmDeleteModal
          confirmText="Are you sure you want to remove this image from the gallery?"
          removeAction={this.RemoveFromGallery}
          buttonClass="fa-minus"
        />
      </div>
    );
  }
}

export default RemoveFromGallery;
