import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { fetchGalleries, fetchGalleriesCount } from '../../../modules/my-pictures-galleries/actions';
import { deleteGallery } from '../../../services/my-pictures/delete-gallery';

const {
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({ galleries, user }) => ({
  user,
  ...galleries,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleries,
    fetchGalleriesCount,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class DeleteGallery extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    maxImageCount: number.isRequired,
    firstImageNumber: number.isRequired,
    galleryId: string.isRequired,
    actions: shape({
      fetchGalleries: func.isRequired,
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
      cid: ''
    }
  };

  removeGallery = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      user,
      galleryId,
      actions,
      maxImageCount,
      firstImageNumber,
    } = this.props;

    deleteGallery({
      galleryId,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then((res) => {
      actions.fetchGalleries({
        galleryId,
        maxImageCount,
        firstImageNumber,
        pagingMode: 'api',
      });
      actions.fetchGalleriesCount({});
    });
  }

  render() {
    return (
      <div>
        <ConfirmDeleteModal
          theme={this.props.theme}
          confirmText="Are you sure you want to permanently delete this gallery?"
          buttonHoverText="Delete Gallery"
          removeAction={this.removeGallery}
          buttonClass="fa-close"
        />
      </div>
    );
  }
}

export default DeleteGallery;
