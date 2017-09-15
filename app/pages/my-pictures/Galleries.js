import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import { fetchGalleriesAndCounts } from '../../modules/my-pictures-galleries/actions';
import style from './my-pictures-gallery.scss';

const mapStateToProps = ({ galleries }) => ({
  error: galleries.error,
  errorBody: galleries.errorBody,
  fetching: galleries.fetching,
  firstGalleryNumber: galleries.firstGalleryNumber,
  imageCount: galleries.imageCount,
  galleryList: galleries.galleryList,
  maxImageCount: galleries.maxImageCount,
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
    this.props.actions.fetchGalleriesAndCounts({
      pagingMode: 'api'
    });
  }

  render() {
    const {
      actions,
      error,
      fetching,
      firstGalleryNumber,
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
              paginateParams={{ pagingMode: 'api' }}
              imageCount={imageCount}
              maxImageCount={maxImageCount}
              firstImageNumber={firstGalleryNumber}
              fetching={fetching}
              galleryList={galleryList}
              error={error}
              type="gallery"
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
  firstGalleryNumber: 1,
};

Galleries.propTypes = {
  galleryList: PropTypes.arrayOf(PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
  })),
  imageCount: PropTypes.number,
  maxImageCount: PropTypes.number,
  firstGalleryNumber: PropTypes.number,
  fetching: PropTypes.bool,
  error: PropTypes.bool,
};

export default Galleries;
