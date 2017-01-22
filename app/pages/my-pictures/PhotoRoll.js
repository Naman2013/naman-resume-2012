import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { fetchPhotoRoll } from '../../modules/my-pictures/get-pictures-action';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PhotoList from '../../components/my-pictures/PhotoList';
import Pagination from '../../components/common/pagination/Pagination';
import style from './my-pictures-gallery.scss';

const IMAGES_PER_PAGE = 9;

const mapStateToProps = ({ pictures }, ownProps) => ({
  imageList: pictures.photoRoll.response.imageList,
  fetching: pictures.photoRoll.fetching,
  error: pictures.photoRoll.error,
  errorBody: pictures.photoRoll.errorBody,
  scheduledMissionId: ownProps.routeParams.scheduledMissionId,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPhotoRoll,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PhotoRoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startRange: 0,
    };

    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
  }

  componentWillMount() {
    const { scheduledMissionId } = this.props;
    this.props.actions.fetchPhotoRoll({
      scheduledMissionId,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scheduledMissionId !== this.props.scheduledMissionId) {
      this.props.actions.fetchPhotoRoll({
        scheduledMissionId: nextProps.scheduledMissionId,
      });
    }
  }

  handleNextPageClick() {
    const { startRange } = this.state;
    window.scrollTo(0, 0);
    this.setState({
      startRange: startRange + IMAGES_PER_PAGE + 1,
    });
  }

  handlePreviousPageClick() {
    const { startRange } = this.state;
    window.scrollTo(0, 0);
    this.setState({
      startRange: startRange - IMAGES_PER_PAGE - 1,
    });
  }


  render() {
    const { fetching, imageList } = this.props;
    const { startRange } = this.state;

    const imageRange = _.slice(imageList, startRange, startRange + IMAGES_PER_PAGE);
    const rangeText = Pagination.generateRangeText({
      startRange,
      itemsPerPage: imageRange.length,
    });

    const canNext = (startRange + IMAGES_PER_PAGE) < imageList.length;
    const canPrevious = startRange !== 0;

    return (
      <div>
        <div className={style.myPicturesGallery}>
          {
            fetching ? <GenericLoadingBox /> : <PhotoList imageList={imageRange} />
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
      </div>
    );
  }
}

PhotoRoll.defaultProps = {
  imageList: [],
  fetching: false,
  error: false,
};

PhotoRoll.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
  })),
  fetching: PropTypes.bool,
  error: PropTypes.bool,
};

export default PhotoRoll;
