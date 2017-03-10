import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import { fetchPhotoRollandMissionRoll } from '../../modules/my-pictures/actions';
import style from './my-pictures-gallery.scss';

const mapStateToProps = ({ myPictures, objectTypeList }, ownProps) => ({
  imageList: myPictures.photoRoll.response.imageList,
  fetching: myPictures.photoRoll.fetching,
  error: myPictures.photoRoll.error,
  errorBody: myPictures.photoRoll.errorBody,
  scheduledMissionId: ownProps.routeParams.scheduledMissionId,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPhotoRollandMissionRoll,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PhotoRoll extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.actions.fetchPhotoRollandMissionRoll();
  }

  render() {
    const { fetching, imageList, error } = this.props;
    return (
      <div>
        <MyPicturesNavigation
          page="photoRoll"
        />

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
