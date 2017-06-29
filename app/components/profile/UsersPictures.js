import React, { Component, PropTypes } from 'react';
import take from 'lodash/take';
import PhotoList from '../my-pictures/PhotoList';


const { arrayOf, shape, string, number, func } = PropTypes;

class UsersPictures extends Component {
  constructor(props) {
    super(props);
    this.setPhotoRefreshInterval();
  }

  componentWillUnmount() {
    clearInterval(this.photoTimer);
  }

  setPhotoRefreshInterval() {
    const { fetchPhotosAction } = this.props;

    if (this.photoTimer) {
      clearInterval(this.photoTimer);
    }

    this.photoTimer = setInterval(() => {
      fetchPhotosAction({});
    }, 300000);
  }

  render() {
    const { imageList } = this.props;
    const IMAGE_LIST_LIMIT = 12;
    return (
      <PhotoList imageList={take(imageList, IMAGE_LIST_LIMIT)} colNum="3" />
    );
  }
}

UsersPictures.defaultProps = {
  imageList: [],
};

UsersPictures.propTypes = {
  imageList: arrayOf(shape({
    imageURL: string.isRequired,
    imageId: number.isRequired,
  })),
  fetchPhotosAction: func.isRequired,
};

export default UsersPictures;
