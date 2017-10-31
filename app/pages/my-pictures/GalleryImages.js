import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import { fetchGalleryPicturesAndCounts } from '../../modules/my-pictures-gallery-pictures/actions';
import { togglePublicGallery } from '../../modules/toggle-public-gallery/actions';
import { darkBlueGray, turqoise } from '../../styles/variables/colors';
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
  publicFlag: galleryPictures.publicFlag,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleryPicturesAndCounts,
    togglePublicGallery,
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

  togglePublicGallery = (e, galleryId) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.actions.togglePublicGallery({
      galleryId,
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
      publicFlag,
      params: { galleryId }
    } = this.props;

    const publicIcon = classnames('fa public-icon', {
      'fa-eye': publicFlag,
      'fa-eye-slash': !publicFlag,
    });
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
          <div className="galleryImage-actions">
            {galleryDateCreated && <div className="galleryDesc">Created <span dangerouslySetInnerHTML={{ __html: galleryDateCreated }} /> (UTC)</div>}
            <span
              className={publicIcon}
              onClick={e => this.togglePublicGallery(e, galleryId)}
            />
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
            display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;      /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
            justify-content: space-between;
            width: 100%;
            padding: 0 30px;
            background-color: #D9D9D9;
            color: ${darkBlueGray};
          }
          .galleryTitle {
            font-size: 30px;
          }

          .galleryImage-actions {
            display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;      /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
            flex-direction: row;
            align-items: center;
          }

          .public-icon {
            cursor: pointer;
            color: ${turqoise};
            margin-left: 15px;
            font-size: 40px;
            display: inline-block;
            height: 100%;
            min-width: 30px;
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
  publicFlag: false,
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
  publicFlag: PropTypes.bool,
};

export default GalleryImages;
