import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { white, black } from '../../../styles/variables/colors';
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
    galleryId: string.isRequired,
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

  state = {
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
      <button className="action" onClick={this.removeFromGallery}>
        <span className="fa fa-minus" />
      </button>

    );
  }
}

export default RemoveFromGallery;
