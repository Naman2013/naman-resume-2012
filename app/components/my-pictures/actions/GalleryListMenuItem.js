import React, { Component } from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import { lightBlack } from '../../../styles/variables/colors';


const {
  arrayOf,
  shape,
  func,
  number,
  string,
  bool,
} = PropTypes;

class GalleryListMenuItem extends Component {

  static propTypes = {
    customerImageId: number.isRequired,
    galleryList: arrayOf(shape({
    })).isRequired,
    galleryAction: func.isRequired,
    response: string,
    loading: bool,
    currentGalleryId: string,
  };
  static defaultProps = {
    response: null,
    loading: false,
    currentGalleryId: null,
  };
  state = {
  };

  handleClick = (e, gallery) => {
    const {
      customerImageId,
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
    });
  }

  render() {
    const {
      galleryList,
      response,
      currentGalleryId,
      loading,
    } = this.props;

    const sortedGalleries = orderBy(galleryList, ['created'], ['desc']);
    return (
      <ul className="menu-list">
        {sortedGalleries.map(gallery => (<li
          onClick={e => this.handleClick(e, gallery)}
          key={gallery.galleryId}
        >
          <div className="menu-item">
            {(response &&
              currentGalleryId === gallery.galleryId) &&
              <span dangerouslySetInnerHTML={{ __html: response }} />}
            {currentGalleryId !== gallery.galleryId && <span>
              {gallery.title}
              <span>(<span dangerouslySetInnerHTML={{ __html: gallery.galleryPictureCount }} />)</span>
              {!gallery.created && <span> new!</span>}
              </span>
            }
          </div>
        </li>))}
        <style jsx>
         {`

           .menu-list {
              list-style: none;
              padding: 0;
           }
           .menu-item {
             padding: 5px 0;
             border-top: 1px solid ${lightBlack};
           }
          `}
        </style>
      </ul>

    );
  }
}

export default GalleryListMenuItem;
