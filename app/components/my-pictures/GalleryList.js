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
              <li key={isImages ? gallery.customerImageId : gallery.galleryId} className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                <div className="relative-container"><Gallery
                  {...gallery}
                  isImages={isImages}
                  imageTitle={gallery.title || gallery.imageTitle}
                /></div>
              </li>
            ))
          }
        </ul>
        <style jsx>
          {`
            .relative-container {
              position: relative;
            }
          `}
        </style>
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
