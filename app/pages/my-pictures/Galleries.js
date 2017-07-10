import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import { fetchGalleriesAndCounts } from '../../modules/my-pictures/actions';
import style from './my-pictures-gallery.scss';

const mapStateToProps = ({ myPictures }) => ({
  error: myPictures.galleries.error,
  errorBody: myPictures.galleries.errorBody,
  fetching: myPictures.galleries.fetching,
  firstImageNumber: myPictures.galleries.firstImageNumber,
  imageCount: myPictures.galleries.imageCount,
  galleryList: myPictures.galleries.response.galleryList,
  maxImageCount: myPictures.galleries.maxImageCount,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleriesAndCounts,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Galleries extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.actions.fetchGalleriesAndCounts({});
  }

  render() {
    const {
      actions,
      error,
      fetching,
      firstImageNumber,
      imageCount,
      galleryList,
      maxImageCount,
    } = this.props;

    return (
      <div>
        <MyPicturesNavigation
          page="galleries"
        />

        <div className="clearfix my-pictures-container">
          <div>
            <PhotoView
              paginate={actions.fetchGalleriesAndCounts}
              imageCount={imageCount}
              maxImageCount={maxImageCount}
              firstImageNumber={firstImageNumber}
              fetching={fetching}
              galleryList={galleryList}
              error={error}
              type="images"
            />
          </div>
        </div>
      </div>
    );
  }
}

Galleries.defaultProps = {
  galleryList: [],
  fetching: false,
  error: false,
  imageCount: 0,
  maxImageCount: 9,
  firstImageNumber: 1,
};

Galleries.propTypes = {
  galleryList: PropTypes.arrayOf(PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
  })),
  imageCount: PropTypes.number,
  maxImageCount: PropTypes.number,
  firstImageNumber: PropTypes.number,
  fetching: PropTypes.bool,
  error: PropTypes.bool,
};

export default Galleries;
