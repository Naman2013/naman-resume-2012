import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchPhotoRoll } from '../../modules/my-pictures/actions';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PhotoList from '../../components/my-pictures/PhotoList';
import Pagination from '../../components/common/pagination/Pagination';
import style from './my-pictures-gallery.scss';

const IMAGES_PER_PAGE = 9;

const mapStateToProps = ({ myPictures, objectTypeList }, ownProps) => ({
  imageList: myPictures.photoRoll.response.imageList,
  fetching: myPictures.photoRoll.fetching,
  error: myPictures.photoRoll.error,
  errorBody: myPictures.photoRoll.errorBody,
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
    window.scrollTo(0, 0);
    this.fetchPhotoRoll();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scheduledMissionId !== this.props.scheduledMissionId) {
      this.props.actions.fetchPhotoRoll({
        scheduledMissionId: nextProps.scheduledMissionId,
      });
    }
  }

  fetchPhotoRoll(filterType) {
    const { scheduledMissionId } = this.props;
    this.props.actions.fetchPhotoRoll({
      scheduledMissionId,
      filterType,
    });
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
    const { startRange, objectFilterType } = this.state;

    const imageRange = _.slice(imageList, startRange, startRange + IMAGES_PER_PAGE);
    const rangeText = Pagination.generateRangeText({
      startRange,
      itemsPerPage: imageRange.length,
    });

    const canNext = (startRange + IMAGES_PER_PAGE) < imageList.length;
    const canPrevious = startRange !== 0;

    return (
      <div>
        <MyPicturesNavigation
          page="photoRoll"
        />

        <div className="clearfix my-pictures-container">
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
