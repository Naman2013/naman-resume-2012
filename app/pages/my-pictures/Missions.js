import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMissionsAndCounts } from '../../modules/my-pictures/actions';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import GoogleOutOfPageAd from '../../components/common/google-ads/GoogleOutOfPageAd';
import style from './my-pictures-gallery.scss';

const mapStateToProps = ({ user, myPictures }) => ({
  imageList: myPictures.missions.response.imageList,
  fetching: myPictures.missions.fetching,
  error: myPictures.missions.error,
  errorBody: myPictures.missions.errorBody,
  firstMissionNumber: myPictures.missions.firstMissionNumber,
  maxMissionCount: myPictures.missions.maxMissionCount,
  imageCount: myPictures.missions.imageCount,
  user,
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
      user,
    } = this.props;
    return (
      <div>
        {user && user.at == 9 && <GoogleOutOfPageAd
         adURL={'/5626790/HP_Pop-up'}
         targetDivID={'div-gpt-ad-1516029782692-0'}
         />
       }

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
