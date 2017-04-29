import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMissionsAndCounts } from '../../modules/my-pictures/actions';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';

import style from './my-pictures-gallery.scss';

const mapStateToProps = ({ myPictures }) => ({
  imageList: myPictures.missions.response.imageList,
  fetching: myPictures.missions.fetching,
  error: myPictures.missions.error,
  errorBody: myPictures.missions.errorBody,
  firstMissionNumber: myPictures.missions.firstImageNumber,
  maxMissionCount: myPictures.missions.maxImageCount,
  imageCount: myPictures.missions.imageCount,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissionsAndCounts,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Missions extends Component {
  componentWillMount() {
    this.props.actions.fetchMissionsAndCounts({});
  }

  componentWillUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      actions,
      maxMissionCount,
      firstMissionNumber,
      imageCount,
      fetching,
      imageList,
      error,
    } = this.props;
    return (
      <div>
        <MyPicturesNavigation
          page="missions"
        />

        <div className="clearfix my-pictures-container">
          <div>
            <PhotoView
              missions={true}
              paginate={actions.fetchMissionsAndCounts}
              imageCount={imageCount}
              maxImageCount={maxMissionCount}
              firstImageNumber={firstMissionNumber}
              fetching={fetching}
              imageList={imageList}
              error={error}
              type="covers"
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
  imageCount: 0,
  maxMissionCount: 9,
  firstMissionNumber: 1,
};

Missions.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
    scheduledMissionId: PropTypes.number.isRequired,
  })),
  imageCount: PropTypes.number,
  maxMissionCount: PropTypes.number,
  firstMissionNumber: PropTypes.number,
  fetching: PropTypes.bool,
  error: PropTypes.bool,
};

export default Missions;
