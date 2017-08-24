import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import { bindActionCreators } from 'redux';
import ContextMenu from '../../common/context-menu/ContextMenu';
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

    return (
      <div className="action-menu-container">
        <ContextMenu
          className="add-gallery-context-menu"
          ref={c => this.contextTrigger = c}
          menuWidth={250}
          onShow={this.fetchGalleries}
        >
          {fetchGalleriesLoading && <div>
              Loading your galleries
            </div>
          }
          {!fetchGalleriesLoading && <div>
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
            <GalleryListMenuItem
              galleryList={galleryList}
              customerImageId={customerImageId}
              galleryAction={addImageToGallery}
              user={user}
            />

            </div>}
        </ContextMenu>
        <button className="action" onClick={this.toggleMenu}>
          <span className="fa fa-plus" />
        </button>
        <style jsx>
          {`
            ${actionsStyles}
          `}
        </style>
        <style jsx global>
          {`
            .add-gallery-context-menu {
              margin-top: -30px;
              margin-left: 30px;
              margin-right: -200px;
              z-index: 999999;
              background-color: ${white};
              color: ${black};
              padding: 15px;
              padding-bottom: 30px;
              overflow-y: auto;
            }

          `}
        </style>
      </div>

    );
  }
}

export default AddToGallery;
