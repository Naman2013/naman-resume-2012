import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import orderBy from 'lodash/orderBy';
import { bindActionCreators } from 'redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { white, black, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';
import { fetchGalleries, createGallery } from '../../../modules/my-pictures-galleries/actions';
import { addImageToGallery } from '../../../modules/my-pictures-gallery-picture-actions/actions';
import { borderRadius } from '../../../styles/mixins/utilities';
import { actionsStyles } from './actions.style';

const { arrayOf, shape, func, number } = PropTypes;
const mapStateToProps = ({ galleries, galleryPictureActions }) => ({
  // error: galleries.error,
  // errorBody: galleries.errorBody,
  galleryCreated: galleries.galleryCreated,
  galleryCreating: galleries.galleryCreating,
  galleryCreatingError: galleries.galleryCreatingError,
  fetchGalleriesLoading: galleries.fetching,
  galleryList: galleries.galleryList,
  addImageToGallery: galleryPictureActions.addImageToGallery,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addImageToGallery,
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
      addImageToGallery: func.isRequired,
    }),
    galleryList: arrayOf(shape({
    })).isRequired,
  };
  static defaultProps = {};
  state = {
    showMenu: false,
    newGalleryName: ''
  };

  constructor() {
    super();
    this.contextTrigger = null;
  }

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

  handleClick = (e, gallery) => {
    const { actions, customerImageId } = this.props;
    e.preventDefault();
    e.stopPropagation();

    actions.addImageToGallery({
      galleryId: gallery.galleryId,
      customerImageId,
    })
  }

  render() {
    const {
      galleryList,
      fetchGalleriesLoading,
      galleryCreated,
      galleryCreating,
      galleryCreatingError,
    } = this.props;
    const { newGalleryName } = this.state;

    const menuId = uniqueId();
    const sortedGalleries = orderBy(galleryList, ['created'], ['desc']);
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
            {sortedGalleries.map(gallery => (<MenuItem
              onClick={e => this.handleClick(e, gallery)}
              key={gallery.galleryId}
            >
              {gallery.title}
              {!gallery.created && <span> new!</span>}
              </MenuItem>))}

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
