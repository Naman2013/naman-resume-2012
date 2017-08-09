import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMissionPhotos, loadFITImages } from '../../modules/my-pictures/actions';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import s from './my-pictures-gallery.scss';

const mapStateToProps = ({ myPictures, objectTypeList }, ownProps) => ({
  error: myPictures.missionPhotos.error,
  errorBody: myPictures.missionPhotos.errorBody,
  fetching: myPictures.missionPhotos.fetching,
  firstImageNumber: myPictures.missionPhotos.firstImageNumber,
  imageCount: myPictures.missionPhotos.imageCount,
  imageList: myPictures.missionPhotos.response.imageList,
  maxImageCount: myPictures.missionPhotos.maxImageCount,
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
    this.props.actions.fetchMissionPhotos({ scheduledMissionId });
  }

  handleFITClick = () => {
    const { scheduledMissionId } = this.props;
    this.props.actions.loadFITImages({ scheduledMissionId });
  }

  render() {
    const {
      actions,
      error,
      fetching,
      firstImageNumber,
      imageCount,
      imageList,
      maxImageCount,
      scheduledMissionId,
    } = this.props;
    return (
      <div className={s.missionImages}>
        <MyPicturesNavigation
          page="missionImages"
          scheduledMissionId={scheduledMissionId}
        />

      <div className={`${s.missionImageControl} clearfix`}>
          <div className={s.navigation}>
            <button onClick={this.handleFITClick} className={s.FITButton}>FITS</button>
          </div>
        </div>

        <div className="clearfix my-pictures-container">
          <div>
            <PhotoView
              paginateParams={{ scheduledMissionId }}
              paginate={actions.fetchMissionPhotos}
              imageCount={imageCount}
              maxImageCount={maxImageCount}
              firstImageNumber={firstImageNumber}
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
  imageCount: 0,
  maxImageCount: 9,
  firstImageNumber: 1,
};

MissionImages.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
  })),
  imageCount: PropTypes.number,
  maxImageCount: PropTypes.number,
  firstImageNumber: PropTypes.number,
  fetching: PropTypes.bool,
  error: PropTypes.bool,
};

export default MissionImages;
