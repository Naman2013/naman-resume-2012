import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { white, black, pink } from '../../../styles/variables/colors';
import { secondaryFont, primaryFont } from '../../../styles/variables/fonts';
import { fetchPhotoRoll, fetchMyPicturesCount } from '../../../modules/my-pictures/actions';
import { deleteImage } from '../../../services/my-pictures/delete-image';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({ myPictures, user }) => ({
  user,
  ...myPictures.photoRoll,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPhotoRoll,
    fetchMyPicturesCount,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class DeleteImage extends Component {

  static propTypes = {
    maxImageCount: number.isRequired,
    firstImageNumber: number.isRequired,
    customerImageId: number.isRequired,
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
      customerImageId,
      actions,
      maxImageCount,
      firstImageNumber,
    } = this.props;

    deleteImage({
      customerImageId,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then((res) => {
      actions.fetchPhotoRoll({
        customerImageId,
        maxImageCount,
        firstImageNumber,
        pagingMode: 'api',
      });
      actions.fetchMyPicturesCount({});
    });
  }

  render() {
    return (
      <div>
        <ConfirmDeleteModal
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
