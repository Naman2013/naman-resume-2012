import React, { Component, PropTypes } from 'react';
import Gallery from './Gallery';
import style from './PhotoList.scss';

class GalleryList extends Component {
  constructor(props) {
    super(props);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }


  render() {
    const { imageList } = this.props;
    return (
      <div className={`${style.photoListRoot} clearfix`}>
        <ul className={`${style.photoList} col-xs-12`}>
          {
            imageList.map(photo => (
              <li key={photo.imageId} className={`${style.item} col-xs-4`}>
                <Gallery
                  imageURL={photo.imageURL}
                  imageTitle={photo.imageTitle}
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
  imageList: PropTypes.arrayOf(PropTypes.shape({
    galleryId: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
  })).isRequired,
};

export default GalleryList;
