import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gallery from './Gallery';
import style from './PhotoList.scss';

class GalleryList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { galleryList, isImages } = this.props;
    return (
      <div className={`${style.photoListRoot} clearfix`}>
        <ul className={`${style.photoList} col-xs-12`}>
          {
            galleryList.map(gallery => (
              <li key={gallery.galleryId} className="col-xs-4">
                <Gallery
                  {...gallery}
                  isImages={isImages}
                  imageTitle={gallery.title || gallery.imageTitle}
                />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

GalleryList.propTypes = {
  galleryList: PropTypes.arrayOf(PropTypes.shape({
    galleryId: PropTypes.any.isRequired,
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string,
  })),
};

export default GalleryList;
