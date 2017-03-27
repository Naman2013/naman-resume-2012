import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import PhotoList from '../my-pictures/PhotoList';


const { arrayOf, shape, string, number, func } = PropTypes;

class UsersReservations extends Component {
  constructor(props) {
    super(props);
    this.setPhotoRefreshInterval();
  }

  componentWillUnmount() {
    clearInterval(this.photoTimer);
  }

  setPhotoRefreshInterval() {
    const { fetchPhotosAction } = this.props;
    fetchPhotosAction({
      noFilter: true,
    });

    if (this.photoTimer) {
      clearInterval(this.photoTimer);
    }

    this.photoTimer = setInterval(() => {
      fetchPhotosAction({
        noFilter: true,
      });
    }, 300000);
  }

  render() {
    const { imageList } = this.props;
    const IMAGE_LIST_LIMIT = 12;
    return (
      <PhotoList imageList={_.take(imageList, IMAGE_LIST_LIMIT)} colNum="3" />
    );
  }
}

UsersReservations.defaultProps = {
  imageList: [],
};

UsersReservations.propTypes = {
  imageList: arrayOf(shape({
    imageURL: string.isRequired,
    imageId: number.isRequired,
  })),
  fetchPhotosAction: func.isRequired,
};

export default UsersReservations;
