import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import GenericLoadingBox from '../common/loading-screens/generic-loading-box';
import PhotoList from './PhotoList';
import MissionList from './MissionList';
import Pagination from '../common/pagination/Pagination';

class PhotoView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startRange: 0,
    };

    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
  }

  handleNextPageClick() {
    const { imagesPerPage } = this.props;
    const { startRange } = this.state;
    window.scrollTo(0, 0);
    this.setState({
      startRange: startRange + imagesPerPage,
    });
  }

  handlePreviousPageClick() {
    const { imagesPerPage } = this.props;
    const { startRange } = this.state;
    window.scrollTo(0, 0);
    this.setState({
      startRange: startRange - imagesPerPage,
    });
  }

  render() {
    const { fetching, imageList, error, type, imagesPerPage } = this.props;
    const { startRange } = this.state;

    const imageRange = _.slice(imageList, startRange, startRange + imagesPerPage);
    const rangeText = Pagination.generateRangeText({
      startRange,
      itemsPerPage: imageRange.length,
    });

    const canNext = (startRange + imagesPerPage) < imageList.length;
    const canPrevious = startRange !== 0;

    if (fetching) {
      return <GenericLoadingBox />;
    }

    if (error) {
      return <GenericLoadingBox text="We apologize, there was an issue fetching your images." />;
    }

    if (imageList.length === 0) {
      return <GenericLoadingBox text="No images are available." />;
    }

    return (
      <div>
        {
          type === 'covers' ?
            <MissionList imageList={imageRange} /> : null
        }
        {
          type === 'images' ?
            <PhotoList imageList={imageRange} /> : null
        }
        <Pagination
          totalCount={imageList.length}
          currentRange={rangeText}
          handleNextPageClick={this.handleNextPageClick}
          handlePreviousPageClick={this.handlePreviousPageClick}
          canNext={canNext}
          canPrevious={canPrevious}
        />
      </div>
    );
  }
}

PhotoView.defaultProps = {
  imagesPerPage: 9,
};

// TODO: increase validation for the imageList types.
PhotoView.propTypes = {
  fetching: PropTypes.bool.isRequired,
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
  })).isRequired,
  error: PropTypes.bool.isRequired,
  imagesPerPage: PropTypes.number,
  type: PropTypes.oneOf(['covers', 'images']).isRequired,
};

export default PhotoView;
