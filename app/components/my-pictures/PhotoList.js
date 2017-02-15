import React, { Component, PropTypes } from 'react';
import Photo from './Photo';
import classnames from 'classnames';
import style from './PhotoList.scss';

class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }

  handlePhotoClick(event) {
    event.preventDefault();
  }

  render() {
    const { imageList, galleryType } = this.props;
    const containerColClassNames = classnames({
      'col-xs-12': !galleryType,
    });
    const listColClassNames = classnames({
      'col-xs-4': !galleryType,
      'col-xs-12': galleryType,
    });
    return (
      <div className={`${style.photoListRoot} clearfix`}>
        <ul className={`${style.photoList} ${containerColClassNames}`}>
          {
            imageList.map(photo => (
              <li key={photo.imageId} className={listColClassNames}>
                <Photo
                  handlePhotoClick={this.handlePhotoClick}
                  imageURL={photo.imageURL}
                  imageTitle={photo.imageTitle}
                  overlayText={photo.overlayText}
                />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

PhotoList.defaultProps = {
  galleryType: false,
};

PhotoList.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageId: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
  })).isRequired,
  galleryType: PropTypes.bool,
};

export default PhotoList;
