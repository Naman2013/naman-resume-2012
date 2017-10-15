import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PhotoView from '../../components/my-pictures/PhotoView';
import { fetchUserPublicGalleries } from '../../modules/my-pictures-user-public-galleries/actions';
import { black } from '../../styles/variables/colors';

const mapStateToProps = ({ userPublicGalleries, user }) => ({
  error: userPublicGalleries.error,
  errorBody: userPublicGalleries.errorBody,
  fetching: userPublicGalleries.fetching,
  firstGalleryNumber: userPublicGalleries.firstGalleryNumber,
  imageCount: userPublicGalleries.galleryPictureCount,
  galleryList: userPublicGalleries.galleryList,
  maxImageCount: userPublicGalleries.maxGalleryCount,
  galleryListTitle: userPublicGalleries.galleryListTitle,
  cid: user.cid,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchUserPublicGalleries,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Galleries extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.actions.fetchUserPublicGalleries({
      pagingMode: 'api',
      cid: this.props.cid,
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
      galleryListTitle,
    } = this.props;

    return (
      <div>
        <div className="clearfix my-pictures-container">
          <div className="public-header">
            <span className="pubic-header" dangerouslySetInnerHTML={{ __html: galleryListTitle }} />
          </div>
          <div>
            <PhotoView
              paginate={actions.fetchUserPublicGalleries}
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
        <style jsx>
        {`
          .public-header {
            padding: 10px 30px;
            color: ${black};
          }
          .pubic-header {
            text-transform: uppercase;
            font-size: 15px;
            font-weight: 800;
          }
        `}
        </style>
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
  cid: null,
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
  cid: PropTypes.string,
};

export default Galleries;
