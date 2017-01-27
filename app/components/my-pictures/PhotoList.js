import React, { Component, PropTypes } from 'react';
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
    const { imageList } = this.props;
    return (
      <div className={`${style.photoListRoot} clearfix`}>
        <ul className={`${style.photoList} col-xs-12`}>
          {
            imageList.map(photo => (
              <li key={photo.imageId} className="col-xs-4">
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

PhotoList.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageId: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
  })).isRequired,
};

export default PhotoList;
