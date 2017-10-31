import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gallery from './Gallery';
import style from './PhotoList.scss';

class PublicGalleryList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { galleryList } = this.props;
    return (
      <div className={`${style.photoListRoot} clearfix`}>
        <ul className={`${style.photoList} col-xs-12`}>
          {
            galleryList.map(gallery => (
              <li key={gallery.galleryId} className="col-xs-12 col-sm-4">
                <div className="relative-container"><Gallery
                  {...gallery}
                  isPublicGallery={true}
                  customerImageId={gallery.firstCustomerImageId}
                  shareToken={gallery.firstImageShareToken}
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

PublicGalleryList.propTypes = {
  galleryList: PropTypes.arrayOf(PropTypes.shape({
    galleryId: PropTypes.any.isRequired,
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string,
    firstImageShareToken: PropTypes.string,
    firstCustomerImageId: PropTypes.string
  })),
};

export default PublicGalleryList;
