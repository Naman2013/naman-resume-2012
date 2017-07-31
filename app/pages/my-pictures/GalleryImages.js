import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import { fetchGalleryPicturesAndCounts } from '../../modules/my-pictures-galleries/actions';
import style from './my-pictures-gallery.scss';

const mapStateToProps = ({ galleries }) => ({
  error: galleries.error,
  errorBody: galleries.errorBody,
  fetching: galleries.fetching,
  firstImageNumber: galleries.firstImageNumber,
  imageCount: galleries.imageCount,
  imageList: galleries.imageList,
  maxImageCount: galleries.maxImageCount,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleryPicturesAndCounts,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class GalleryImages extends Component {
  componentWillMount() {
    const { params: { galleryId }, firstImageNumber, maxImageCount } = this.props;
    window.scrollTo(0, 0);
    this.props.actions.fetchGalleryPicturesAndCounts({
      galleryId,
      firstImageNumber,
      maxImageCount,
    });
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
    } = this.props;
    return (
      <div>
        <MyPicturesNavigation
          page="galleries"
        />

        <div className="clearfix my-pictures-container">
          <div>
            <PhotoView
              paginate={actions.fetchGalleryPicturesAndCounts}
              imageCount={imageCount}
              maxImageCount={maxImageCount}
              firstImageNumber={firstImageNumber}
              fetching={fetching}
              galleryList={imageList}
              error={error}
              type="galleryImages"
            />
          </div>
        </div>
      </div>
    );
  }
}

GalleryImages.defaultProps = {
  imageList: [],
  fetching: false,
  error: false,
  imageCount: 0,
  maxImageCount: 9,
  firstImageNumber: 1,
};

GalleryImages.propTypes = {
  actions: PropTypes.shape({
    fetchGalleryPicturesAndCounts: PropTypes.func.isRequired,
  }),
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

export default GalleryImages;
