import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContextMenu from '../../common/context-menu/ContextMenu';
import GalleryListMenuItem from './GalleryListMenuItem';
import { white, black, pink } from '../../../styles/variables/colors';
import { fetchGalleries, createGallery, fetchGalleriesCount } from '../../../modules/my-pictures-galleries/actions';
import { addImageToGallery, resetAddResponse } from '../../../modules/my-pictures-gallery-actions/actions';
import { actionsStyles } from './actions.style';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
  oneOfType,
} = PropTypes;

const mapStateToProps = ({ galleries, galleryActions }) => ({
  // error: galleries.error,
  // errorBody: galleries.errorBody,
  galleryCreated: galleries.galleryCreated,
  galleryCreating: galleries.galleryCreating,
  galleryCreatingError: galleries.galleryCreatingError,
  fetchGalleriesLoading: galleries.fetching,
  galleryList: galleries.galleryList,
  addToGalleryState: galleryActions.addToGallery,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleries,
    fetchGalleriesCount,
    createGallery,
    addImageToGallery,
    resetAddResponse,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class AddToGallery extends Component {

  static propTypes = {
    customerImageId: oneOfType([number, string]).isRequired,
    actions: shape({
      fetchGalleries: func.isRequired,
      createGallery: func.isRequired,
      fetchGalleriesCount: func.isRequired,
    }),
    addToGalleryState: shape({
      loading: bool,
      response: string,
      galleryId: string,
    }).isRequired,
    fetchGalleriesLoading: bool,
    galleryCreated: bool,
    galleryCreating: bool,
    galleryCreatingError: bool,
    galleryList: arrayOf(shape({
    })).isRequired,
  };
  static defaultProps = {
    addToGalleryState: {
      loading: false,
      response: null,
      galleryId: null,
    },
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
    actions.fetchGalleries({
      noFilters: true,
    });
  }

  toggleMenu = (e) => {
    const { actions } = this.props;
    e.preventDefault();
    e.stopPropagation();

    if (this.contextTrigger) {
      this.contextTrigger.handleContextClick(e);
    }

    actions.resetAddResponse();
  }

  createGallery = (e) => {
    const { actions } = this.props;
    const { newGalleryName } = this.state;
    e.preventDefault();

    if (!newGalleryName) return;
    actions.createGallery({
      title: newGalleryName,
    }).then((res) => {
      if (!res.payload.apiError) {
        actions.fetchGalleriesCount({});
      }
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

  addToGalleryAndReset = ({ galleryId, customerImageId }) => {
    const { actions } = this.props;

    actions.addImageToGallery({
      galleryId,
      customerImageId,
    }).then(() => actions.fetchGalleriesCount({}));

    setTimeout(() => {
      actions.resetAddResponse();
    }, 5000);
  }

  render() {
    const {
      actionSource,
      addToGalleryState,
      galleryList,
      fetchGalleriesLoading,
      galleryCreated,
      galleryCreating,
      galleryCreatingError,
      customerImageId,
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
          leftOffset={-35}
          titleText="Select A Gallery Below"
        >
          {fetchGalleriesLoading && <div className="loading">
              Loading your galleries
            </div>
          }
          {!fetchGalleriesLoading && <div className="rest-of-list">
            <div className="create-gallery">
              <button className="action create" onClick={this.createGallery}>
                <span className="fa fa-plus" />
              </button>
              {galleryCreating && <span>Creating your gallery...</span>}
              {!galleryCreating && <input
                className="name-input"
                onClick={e => e.preventDefault()}
                type="text"
                placeholder="Type Here to Create Gallery"
                value={newGalleryName}
                onChange={this.updateNewGalleryName}
              />}
              {galleryCreatingError && <span>Your gallery could not be created</span>}
            </div>
            <GalleryListMenuItem
              galleryList={galleryList}
              customerImageId={customerImageId}
              galleryAction={this.addToGalleryAndReset}
              loading={addToGalleryState.loading}
              response={addToGalleryState.response}
              currentGalleryId={addToGalleryState.galleryId}
            />
          </div>}
        </ContextMenu>
        <button className="action" onClick={this.toggleMenu}>
          <span className="fa fa-plus" />
          <div className="action-description">Add to gallery</div>
        </button>
        <style jsx>
          {`
            .loading {
              width: 50%;
              margin:  25px 50%;
              transform: translateX(-50%);
            }

            .rest-of-list {
              height: 100%;
              overflow-y: auto;
            }
            .action-menu-container {
              position: relative;
            }
            .create-gallery {
              display: flex;
              flex-direction: row;
              align-items: center;
            }

            ${actionsStyles}
            .action.create {
              margin: 5px;
              background: ${white};
              color: ${pink};
              border: 2px solid ${pink};
            }

            .action.create:hover {
              background: ${pink};
              color: ${white};
            }

            .name-input {
              border: none;
              color: ${pink};
              width: 90%;
            }

            .name-input::-webkit-input-placeholder { /* Chrome */
              color: ${pink};
            }
            .name-input:-ms-input-placeholder { /* IE 10+ */
              color: ${pink};
            }
            .name-input::-moz-placeholder { /* Firefox 19+ */
              color: ${pink};
            }
            .name-input:-moz-placeholder { /* Firefox 4 - 18 */
              color: ${pink};
            }
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
              padding-bottom: 30px;
              overflow: hidden;
              font-size: 14px;
            }

          `}
        </style>
      </div>

    );
  }
}

export default AddToGallery;
