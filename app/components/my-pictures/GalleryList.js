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
                  isImages={isImages}
                  galleryId={gallery.galleryId}
                  created={gallery.created}
                  imageURL={gallery.imageURL}
                  imageTitle={gallery.title}
                  shareToken={gallery.shareToken}
                  customerImageId={gallery.customerImageId}
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
    galleryId: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
};

export default GalleryList;
