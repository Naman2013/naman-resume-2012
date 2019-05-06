import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContextMenu from '../../common/context-menu/ContextMenuV4';
import GalleryListMenuItem from './GalleryListMenuItem';
import {
  fetchGalleries,
  createGallery,
  fetchGalleriesCount,
} from '../../../modules/my-pictures-galleries/actions';
import {
  addImageToGallery,
  resetAddResponse,
} from '../../../modules/my-pictures-gallery-actions/actions';
import { togglePublicGallery } from '../../../modules/toggle-public-gallery/actions';

import styles from './AddToGalleryV4.style';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
  oneOfType,
  node,
} = PropTypes;

const mapStateToProps = ({ galleries, galleryActions }) => ({
  galleryCreated: galleries.galleryCreated,
  galleryCreating: galleries.galleryCreating,
  galleryCreatingError: galleries.galleryCreatingError,
  fetchGalleriesLoading: galleries.fetching,
  galleryList: galleries.galleryList,
  addToGalleryState: galleryActions.addToGallery,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchGalleries,
      fetchGalleriesCount,
      createGallery,
      addImageToGallery,
      resetAddResponse,
      togglePublicGallery,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AddToGallery extends Component {
  static propTypes = {
    customerImageId: oneOfType([number, string]).isRequired,
    actions: shape({
      fetchGalleries: func.isRequired,
      createGallery: func.isRequired,
      fetchGalleriesCount: func.isRequired,
    }).isRequired,
    addToGalleryState: shape({
      loading: bool,
      response: string,
      galleryId: string,
    }).isRequired,
    fetchGalleriesLoading: bool,
    galleryCreated: bool,
    galleryCreating: bool,
    galleryCreatingError: bool,
    galleryList: arrayOf(shape({})).isRequired,
    render: node.isRequired,
    className: string,
    isDesktop: bool.isRequired,
    index: number,
    asideMenuWidth: number.isRequired,
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
      cid: '',
    },
    index: 1,
    className: '',
  };

  constructor(props) {
    super(props);
    this.contextTrigger = null;
  }

  state = {
    newGalleryName: '',
  };

  createGallery = event => {
    event.preventDefault();
    const { actions } = this.props;
    const { newGalleryName } = this.state;

    if (!newGalleryName) return;
    actions
      .createGallery({
        title: newGalleryName,
      })
      .then(res => {
        if (!res.payload.apiError) {
          actions.fetchGalleriesCount({});
        }
        this.setState({
          newGalleryName: '',
        });
      });
  };

  updateNewGalleryName = e => {
    this.setState({
      newGalleryName: e.target.value,
    });
  };

  addToGalleryAndReset = ({ galleryId, customerImageId }) => {
    const { actions } = this.props;

    actions
      .addImageToGallery({
        galleryId,
        customerImageId,
      })
      .then(() => actions.fetchGalleriesCount({}));

    setTimeout(() => {
      actions.resetAddResponse();
    }, 5000);
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.createGallery(e);
    }
  };

  toggleMenu = e => {
    const { actions } = this.props;
    e.preventDefault();
    e.stopPropagation();

    if (this.contextTrigger) {
      this.contextTrigger.handleContextClick(e);
    }

    actions.resetAddResponse();
  };

  fetchGalleries = () => {
    const { actions } = this.props;
    actions.fetchGalleries({
      noFilters: true,
    });
  };

  forceFocus = e => {
    e.preventDefault();
    this._createInput.focus();
  };

  togglePublicGalleryIcon = (e, galleryId) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.actions.togglePublicGallery({
      galleryId,
    });
  };

  render() {
    const {
      addToGalleryState,
      galleryList,
      fetchGalleriesLoading,
      galleryCreating,
      galleryCreatingError,
      customerImageId,
      render,
      className,
      isDesktop,
      index,
      asideMenuWidth,
    } = this.props;

    const { newGalleryName } = this.state;

    let leftOffset = -45;

    if (isDesktop) {
      leftOffset = 0 || index % 3 === 0 ? asideMenuWidth : leftOffset;
    } else {
      leftOffset = index === 0 || index % 2 === 0 ? asideMenuWidth : leftOffset;
    }

    return (
      <div className={`action-menu-container ${className && className}`}>
        <ContextMenu
          className="add-gallery-context-menu"
          ref={c => {
            this.contextTrigger = c;
          }}
          menuWidth={250}
          onShow={this.fetchGalleries}
          leftOffset={leftOffset}
          titleText="Select A Gallery Below"
        >
          {fetchGalleriesLoading && (
            <div className="loading">Loading your galleries</div>
          )}
          {!fetchGalleriesLoading && (
            <div className="rest-of-list">
              <div className="create-gallery">
                <button className="action-create" onClick={this.createGallery}>
                  <span className="fa fa-plus" />
                </button>
                {galleryCreating && <span>Creating your gallery...</span>}
                {!galleryCreating && (
                  <input
                    className="name-input"
                    onClick={e => e.preventDefault()}
                    onKeyPress={this.onKeyPress}
                    onMouseDown={this.forceFocus}
                    type="text"
                    placeholder="Type Here to Create Gallery"
                    value={newGalleryName}
                    onChange={this.updateNewGalleryName}
                    ref={input => {
                      this._createInput = input;
                    }}
                  />
                )}
                {galleryCreatingError && (
                  <span>Your gallery could not be created</span>
                )}
              </div>
              <GalleryListMenuItem
                galleryList={galleryList}
                togglePublicGallery={this.togglePublicGalleryIcon}
                customerImageId={customerImageId}
                galleryAction={this.addToGalleryAndReset}
                loading={addToGalleryState.loading}
                response={addToGalleryState.response}
                currentGalleryId={addToGalleryState.galleryId}
              />
            </div>
          )}
        </ContextMenu>

        {render(this.toggleMenu)}

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AddToGallery;
