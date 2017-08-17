import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import orderBy from 'lodash/orderBy';
import { bindActionCreators } from 'redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { white, black, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';
import { fetchGalleries, createGallery } from '../../../modules/my-pictures-galleries/actions';
import { addImageToGallery } from '../../../services/my-pictures/add-image-to-gallery';
import { borderRadius } from '../../../styles/mixins/utilities';
import { actionsStyles } from './actions.style';

const { arrayOf, shape, func, number } = PropTypes;
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

    this.state = {
      addResponse: null,
      addLoading: false,
      addedGalleryId: null,

    };

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
    const { actions, customerImageId, user } = this.props;
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      addLoading: true,
    });

    addImageToGallery({
      galleryId: gallery.galleryId,
      customerImageId,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then( res => {
      this.setState({
        addLoading: false,
        addResponse: res.data.response,
        addedGalleryId: gallery.galleryId,
      });

      setTimeout(() => {
        this.setState({
          addResponse: null,
          addedGalleryId: null,
        });
      }, 5000)

    });
  }

  render() {
    const {
      galleryList,
      fetchGalleriesLoading,
      galleryCreated,
      galleryCreating,
      galleryCreatingError,
    } = this.props;
    const { newGalleryName, addResponse, addedGalleryId } = this.state;

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
            {sortedGalleries.map(gallery => (<MenuItem
              onClick={e => this.handleClick(e, gallery)}
              key={gallery.galleryId}
              preventClose={true}
            >
              {(addResponse && addedGalleryId === gallery.galleryId) && <span dangerouslySetInnerHTML={{ __html: addResponse }} />}
              {addedGalleryId !== gallery.galleryId && <span>
                {gallery.title}
                {!gallery.created && <span> new!</span>}
                </span>
              }
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
