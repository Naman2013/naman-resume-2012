import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'react-contextmenu';
import orderBy from 'lodash/orderBy';

const {
  arrayOf,
  shape,
  func,
  number,
  string,
} = PropTypes;

class GalleryListMenuItem extends Component {

  static propTypes = {
    customerImageId: number.isRequired,
    galleryList: arrayOf(shape({
    })).isRequired,
    galleryAction: func.isRequired,
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
      cid: '',
    },
  };
  state = {
    response: null,
    loading: false,
    currentGalleryId: null,
  };

  handleClick = (e, gallery) => {
    const {
      customerImageId,
      user,
      galleryAction,
    } = this.props;
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      loading: true,
    });

    galleryAction({
      galleryId: gallery.galleryId,
      customerImageId,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then((res) => {
      this.setState({
        loading: false,
        response: res.data.response,
        currentGalleryId: gallery.galleryId,
      });

      setTimeout(() => {
        this.setState({
          response: null,
          currentGalleryId: null,
        });
      }, 5000);
    });
  }

  render() {
    const {
      galleryList,
    } = this.props;
    const { response, currentGalleryId } = this.state;

    const sortedGalleries = orderBy(galleryList, ['created'], ['desc']);
    return (
      <div className="">
        {sortedGalleries.map(gallery => (<MenuItem
          onClick={e => this.handleClick(e, gallery)}
          key={gallery.galleryId}
          preventClose={true}
        >
          {(response &&
            currentGalleryId === gallery.galleryId) &&
            <span dangerouslySetInnerHTML={{ __html: response }} />}
          {currentGalleryId !== gallery.galleryId && <span>
            {gallery.title}
            {!gallery.created && <span> new!</span>}
            </span>
          }
        </MenuItem>))}
      </div>

    );
  }
}

export default GalleryListMenuItem;
