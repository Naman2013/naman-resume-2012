import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import { bindActionCreators } from 'redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import GalleryListMenuItem from './GalleryListMenuItem';
import { white, black } from '../../../styles/variables/colors';
import { fetchGalleries, createGallery } from '../../../modules/my-pictures-galleries/actions';
import { removeImageFromGallery } from '../../../services/my-pictures/remove-image-from-gallery';
import { actionsStyles } from './actions.style';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({ galleries, user }) => ({
  fetchGalleriesLoading: galleries.fetching,
  galleryList: galleries.galleryList,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleries,
    createGallery,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class RemoveFromGallery extends Component {

  static propTypes = {
    customerImageId: number.isRequired,
    actions: shape({
      fetchGalleries: func.isRequired,
      createGallery: func.isRequired,
    }),
    fetchGalleriesLoading: bool,
    galleryList: arrayOf(shape({
    })).isRequired,
    user: shape({
      at: string,
      token: string,
      cid: string,
    }).isRequired,
  };
  static defaultProps = {
    fetchGalleriesLoading: false,
    user: {
      at: '',
      token: '',
      cid: ''
    }
  };

  constructor() {
    super();
    this.contextTrigger = null;
  }

  state = {
  };

  fetchGalleries = () => {
    const { actions, galleryList } = this.props;
    if (galleryList.length === 0) {
      // only make call once
      actions.fetchGalleries({});
    }
  }

  toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.contextTrigger) {
      this.contextTrigger.handleContextClick(e);
    }
  }

  render() {
    const {
      galleryList,
      fetchGalleriesLoading,
      customerImageId,
      user,
    } = this.props;

    const menuId = uniqueId();
    return (
      <div className="action-menu-container">
        <ContextMenuTrigger id={menuId} ref={c => this.contextTrigger = c}>
          <button className="action" onClick={this.toggleMenu}>
            <span className="fa fa-minus" />
          </button>
        </ContextMenuTrigger>

        <ContextMenu
          id={menuId}
          onShow={this.fetchGalleries}
          className="gallery-context-menu"
          hideOnLeave={true}
        >
          {fetchGalleriesLoading && <MenuItem>
              Loading your galleries
            </MenuItem>
          }
          {!fetchGalleriesLoading &&
            <GalleryListMenuItem
              galleryList={galleryList}
              customerImageId={customerImageId}
              galleryAction={removeImageFromGallery}
              user={user}
            />}
        </ContextMenu>
        <style jsx>
          {`
            ${actionsStyles}
          `}
        </style>
        <style jsx global>
          {`
            .gallery-context-menu {
              z-index: 999;
              background-color: ${white};
              color: ${black};
            }
          `}
        </style>
      </div>

    );
  }
}

export default RemoveFromGallery;
