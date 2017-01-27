import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { fetchMissions } from '../../modules/my-pictures/actions';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import MissionList from '../../components/my-pictures/MissionList';
import Pagination from '../../components/common/pagination/Pagination';
import style from './my-pictures-gallery.scss';

const IMAGES_PER_PAGE = 9;

const mapStateToProps = ({ myPictures }) => ({
  imageList: myPictures.missions.response.imageList,
  fetching: myPictures.missions.fetching,
  error: myPictures.missions.error,
  errorBody: myPictures.missions.errorBody,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissions,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Missions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startRange: 0,
    };

    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchMissions();
  }

  componentWillUpdate() {
    window.scrollTo(0, 0);
  }

  handleNextPageClick() {
    const { startRange } = this.state;
    this.setState({
      startRange: startRange + IMAGES_PER_PAGE + 1,
    });
  }

  handlePreviousPageClick() {
    const { startRange } = this.state;
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
        <MyPicturesNavigation
          page="missions"
        />

        <div className="clearfix my-pictures-container">
          <div className={style.myPicturesGallery}>
            {
              fetching ? <GenericLoadingBox /> : <MissionList imageList={imageRange} />
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

Missions.defaultProps = {
  imageList: [],
  fetching: false,
  error: false,
};

Missions.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
    scheduledMissionId: PropTypes.number.isRequired,
  })),
  fetching: PropTypes.bool,
  error: PropTypes.bool,
};

export default Missions;
