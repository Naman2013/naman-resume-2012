import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import { fetchGalleryPicturesAndCounts } from '../../modules/my-pictures-gallery-pictures/actions';
import { darkBlueGray } from '../../styles/variables/colors';
import style from './my-pictures-gallery.scss';

const mapStateToProps = ({ galleryPictures }) => ({
  error: galleryPictures.error,
  errorBody: galleryPictures.errorBody,
  fetching: galleryPictures.fetching,
  firstImageNumber: galleryPictures.firstImageNumber,
  imageCount: galleryPictures.imageCount,
  imageList: galleryPictures.imageList,
  maxImageCount: galleryPictures.maxImageCount,
  galleryTitle: galleryPictures.galleryTitle,
  galleryDateCreated: galleryPictures.galleryDateCreated,
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
      pagingMode: 'api',
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
      galleryTitle,
      galleryDateCreated,
      params: { galleryId }
    } = this.props;
    return (
      <div>
        <MyPicturesNavigation
          page="galleryImages"
          galleryId={galleryId}
        />
        <div className="flex">
          <div className="missionInfo">
            {galleryTitle && <span className="galleryTitle" dangerouslySetInnerHTML={{ __html: galleryTitle }} />}
          </div>
          <div>
            {galleryDateCreated && <div className="galleryDesc">Created <span dangerouslySetInnerHTML={{ __html: galleryDateCreated }} /> (UTC)</div>}
          </div>
        </div>

        <div className="clearfix my-pictures-container">
          <div>
            <PhotoView
              paginate={actions.fetchGalleryPicturesAndCounts}
              paginateParams={{ pagingMode: 'api', galleryId }}
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
        <style jsx>{`
          .flex {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 30px;
            background-color: #D9D9D9;
            color: ${darkBlueGray};
          }
          .galleryTitle {
            font-size: 30px;
          }

          .galleryDesc {

          }
        `}</style>
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
  galleryTitle: '',
  galleryDateCreated: '',
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
  galleryTitle: PropTypes.string,
  galleryDateCreated: PropTypes.string,
};

export default GalleryImages;
