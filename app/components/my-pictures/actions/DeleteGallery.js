import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { white, black, pink } from '../../../styles/variables/colors';
import { secondaryFont, primaryFont } from '../../../styles/variables/fonts';
import { fetchGalleries, fetchGalleriesCount } from '../../../modules/my-pictures-galleries/actions';
import { deleteGallery } from '../../../services/my-pictures/delete-gallery';

const {
  arrayOf,
  bool,
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
    maxImageCount: number.isRequired,
    firstImageNumber: number.isRequired,
    customerImageId: number.isRequired,
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
          confirmText="Are you sure you want to permanently delete this gallery?"
          removeAction={this.removeGallery}
          buttonClass="fa-close"
        />
      </div>
    );
  }
}

export default DeleteGallery;
