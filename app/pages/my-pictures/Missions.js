import React, { Component, PropTypes } from 'react';
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
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissionsAndCounts,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Missions extends Component {
  componentWillMount() {
    this.props.actions.fetchMissionsAndCounts();
  }

  componentWillUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const { fetching, imageList, error } = this.props;
    return (
      <div>
        <MyPicturesNavigation
          page="missions"
        />

        <div className="clearfix my-pictures-container">
          <div>
            <PhotoView
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
