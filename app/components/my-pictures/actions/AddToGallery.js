import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import { bindActionCreators } from 'redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import GalleryListMenuItem from './GalleryListMenuItem';
import { white, black } from '../../../styles/variables/colors';
import { fetchGalleries, createGallery } from '../../../modules/my-pictures-galleries/actions';
import { addImageToGallery } from '../../../services/my-pictures/add-image-to-gallery';
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
  // error: galleries.error,
  // errorBody: galleries.errorBody,
  galleryCreated: galleries.galleryCreated,
  galleryCreating: galleries.galleryCreating,
  galleryCreatingError: galleries.galleryCreatingError,
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
class AddToGallery extends Component {

  static propTypes = {
    customerImageId: number.isRequired,
    actions: shape({
      fetchGalleries: func.isRequired,
      createGallery: func.isRequired,
    }),
    fetchGalleriesLoading: bool,
    galleryCreated: bool,
    galleryCreating: bool,
    galleryCreatingError: bool,
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
    galleryCreated: false,
    galleryCreating: false,
    galleryCreatingError: false,
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
    newGalleryName: '',
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

  createGallery = () => {
    const { actions } = this.props;
    const { newGalleryName } = this.state;

    actions.createGallery({
      title: newGalleryName,
    }).then(() => {
      this.setState({
        newGalleryName: ''
      })
    });
  }

  updateNewGalleryName = (e) => {
    this.setState({
      newGalleryName: e.target.value,
    });
  }

  render() {
    const {
      galleryList,
      fetchGalleriesLoading,
      galleryCreated,
      galleryCreating,
      galleryCreatingError,
      customerImageId,
      user,
    } = this.props;
    const {
      newGalleryName,
    } = this.state;

    const menuId = uniqueId();
    return (
      <div className="action-menu-container">
        <ContextMenuTrigger id={menuId} ref={c => this.contextTrigger = c}>
          <button className="action" onClick={this.toggleMenu}>
            <span className="fa fa-plus" />
          </button>
        </ContextMenuTrigger>

        <ContextMenu
          id={menuId}
          onShow={this.fetchGalleries}
          className="add-gallery-context-menu"
          hideOnLeave={true}
        >
          {fetchGalleriesLoading && <MenuItem>
              Loading your galleries
            </MenuItem>
          }
          {!fetchGalleriesLoading && <div>
            <MenuItem
              onClick={() => {}}
              preventClose={true}
            >
              <button className="action" onClick={this.createGallery}>
                <span className="fa fa-plus" />
              </button>
              {galleryCreating && <span>Creating your gallery...</span>}
              {!galleryCreating && <input
                type="text"
                placeholder="Type Here to Create Gallery"
                value={newGalleryName}
                onChange={this.updateNewGalleryName}
              />}
              {galleryCreatingError && <span>Your gallery could not be created</span>}
            </MenuItem>
            <GalleryListMenuItem
              galleryList={galleryList}
              customerImageId={customerImageId}
              galleryAction={addImageToGallery}
              user={user}
            />

            </div>}
        </ContextMenu>
        <style jsx>
          {`
            ${actionsStyles}
          `}
        </style>
        <style jsx global>
          {`
            .add-gallery-context-menu {
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

export default AddToGallery;
