import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import { bindActionCreators } from 'redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { white, black, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';
import { fetchGalleries } from '../../../modules/my-pictures/actions';
import { createGallery } from '../../../modules/my-pictures-galleries/actions';
import { borderRadius } from '../../../styles/mixins/utilities';
import { actionsStyles } from './actions.style';

const { arrayOf, shape, func } = PropTypes;
const mapStateToProps = ({ myPictures }) => ({
  // error: myPictures.galleries.error,
  // errorBody: myPictures.galleries.errorBody,
  fetchGalleriesLoading: myPictures.galleries.fetching,
  galleryList: myPictures.galleries.response.galleryList,
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
    actions: shape({
      fetchGalleries: func.isRequired,
      createGallery: func.isRequired,
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
    const { actions } = this.props;

    actions.fetchGalleries({});
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
    });
  }

  updateNewGalleryName = (e) => {
    this.setState({
      newGalleryName: e.target.value,
    });
  }

  handleClick = () => {}

  render() {
    const {
      galleryList,
      fetchGalleriesLoading,
    } = this.props;
    const { newGalleryName } = this.state;

    const menuId = uniqueId();
    console.log('fetchGalleriesLoading', fetchGalleriesLoading)
    console.log('galleries', galleryList)
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
              <input
                type="text"
                placeholder="Type Here to Create Gallery"
                value={newGalleryName}
                onChange={this.updateNewGalleryName}
              />
            </MenuItem>
            {galleryList.map(gallery => (<MenuItem
              onClick={this.handleClick}
              key={gallery.galleryId}
            >
              {gallery.title}
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
