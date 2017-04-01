import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMissionPhotos, loadFITImages } from '../../modules/my-pictures/actions';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import s from './my-pictures-gallery.scss';

const mapStateToProps = ({ myPictures, objectTypeList }, ownProps) => ({
  imageList: myPictures.missionPhotos.response.imageList,
  fetching: myPictures.missionPhotos.fetching,
  error: myPictures.missionPhotos.error,
  errorBody: myPictures.missionPhotos.errorBody,
  scheduledMissionId: ownProps.routeParams.scheduledMissionId,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissionPhotos,
    loadFITImages,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class MissionImages extends Component {
  componentWillMount() {
    const { scheduledMissionId } = this.props;
    this.props.actions.fetchMissionPhotos(scheduledMissionId);
  }

  handleFITClick = () => {
    const { scheduledMissionId } = this.props;
    this.props.actions.loadFITImages({ scheduledMissionId });
  }

  render() {
    const { fetching, imageList, error } = this.props;
    return (
      <div className={s.missionImages}>
        <MyPicturesNavigation
          page="missions"
        />

      <div className={`${s.missionImageControl} clearfix`}>
          <div className={s.navigation}>
            <button onClick={this.handleFITClick} className={s.FITButton}>FITS</button>
          </div>
        </div>

        <div className="clearfix my-pictures-container">
          <div>
            <PhotoView
              fetching={fetching}
              imageList={imageList}
              error={error}
              type="images"
            />
          </div>
        </div>
      </div>
    );
  }
}

MissionImages.defaultProps = {
  imageList: [],
  fetching: false,
  error: false,
};

MissionImages.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
  })),
  fetching: PropTypes.bool,
  error: PropTypes.bool,
};

export default MissionImages;
