import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Photo from './Photo';
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
    const { imageList, galleryType, colNum } = this.props;
    const containerColClassNames = classnames({
      'col-xs-12': !galleryType,
    });
    const listColClassNames = classnames({
      [`col-md-${colNum}  col-xs-6`]: !galleryType,
      'col-xs-12': galleryType,
    });

    return (
      <div className={`${style.photoListRoot} clearfix`}>
        <ul className={`${style.photoList} ${containerColClassNames}`}>
          {
            imageList.map(photo => (
              <li key={photo.customerImageId || photo.imageId} className={listColClassNames}>
                <Photo
                  detailsUrl={`/my-pictures/show-image/${photo.customerImageId}/${photo.shareToken}`}
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
  colNum: '4',
};

PhotoList.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageId: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
  })).isRequired,
  galleryType: PropTypes.bool,
  colNum: PropTypes.string,
};

export default PhotoList;
