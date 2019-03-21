/***********************************
 * V4 ImageList
 ***********************************/

import React, { Component, Fragment, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectUser from 'app/redux/components/ConnectUser';
import Pagination from 'app/components/common/pagination/v4-pagination/pagination';
import ShowMore from 'app/components/common/ShowMore';

import {
  fetchMissionsAndCounts,
  fetchPhotoRollAndCounts,
  fetchMorePhotoroll,
  fetchMoreMissions,
} from 'app/modules/my-pictures/actions';
import {
  fetchGalleriesAndCounts,
  fetchMoreGalleries,
} from 'app/modules/my-pictures-galleries/actions';
import { downloadImage } from '../actions';

import style from './ImageList.style';

const mapTypeToList = {
  observations: 'observationsList',
  photoroll: 'photoRollList',
  missions: 'missionsList',
  galleries: 'galleryList',
};

const mapTypeToCount = {
  observations: 'observationsCount',
  photoroll: 'photoRollCount',
  missions: 'missionsCount',
  galleries: 'galleryCount',
};

const mapTypeToId = {
  observations: 'imageId',
  photoroll: 'imageId',
  missions: 'imageId',
  galleries: 'galleryId',
};

const mapTypeToRequest = {
  observations: 'fetchPhotoRollAndCounts',
  photoroll: 'fetchPhotoRollAndCounts',
  missions: 'fetchMissionsAndCounts',
  galleries: 'fetchGalleriesAndCounts',
};

const mapTypeToRequestMore = {
  observations: 'fetchMorePhotoroll',
  photoroll: 'fetchMorePhotoroll',
  missions: 'fetchMoreMissions',
  galleries: 'fetchMoreGalleries',
};

const getImagesCountToFetch = ({ isMobile, isTablet }) =>
  isMobile || isTablet ? 10 : 9;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchMissionsAndCounts,
      fetchGalleriesAndCounts,
      fetchPhotoRollAndCounts,
      fetchMorePhotoroll,
      fetchMoreMissions,
      fetchMoreGalleries,
      downloadImage,
    },
    dispatch
  ),
});

const mapStateToProps = ({ myPictures, galleries }) => ({
  missionsList: myPictures.missions.response.imageList,
  missionsCount: myPictures.missions.imageCount,
  galleryList: galleries.galleryList,
  galleryCount: galleries.maxImageCount,
  photoRollList: myPictures.photoRoll.response.imageList,
  photoRollCount: myPictures.photoRoll.imageCount,
  observationsList: myPictures.photoRoll.response.imageList,
  observationsCount: myPictures.observations.imageCount,
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class ImageList extends Component {
  state = {
    activePage: 1,
  };

  componentDidMount() {
    const { actions, type, deviceInfo } = this.props;
    const fetchImages = actions[mapTypeToRequest[type]];
    const imagesToFetch = getImagesCountToFetch(deviceInfo);
    fetchImages({
      sharedOnly: type === 'observations',
      maxImageCount: imagesToFetch,
      maxMissionCount: imagesToFetch,
    });
    //  fetchMissionsAndCounts | fetchGalleriesAndCounts | fetchPhotoRollAndCounts
  }

  componentDidUpdate(prevProps) {
    const { actions, type, deviceInfo } = this.props;
    const { activePage } = this.state;

    const fetchImages = actions[mapTypeToRequest[type]];
    const arrOfImages = this.props[mapTypeToList[type]];

    const imagesToFetch = getImagesCountToFetch(deviceInfo);

    if (prevProps.deviceInfo.isMobile && !deviceInfo.isMobile) {
      const currentPage = Math.floor(arrOfImages.length / 10);
      const firstImageOfCurrentPage = (currentPage - 1) * 10 + 1;
      const firstImageNumber =
        currentPage === 0 || currentPage === 1 ? 1 : firstImageOfCurrentPage;

      fetchImages({
        sharedOnly: type === 'observations',
        firstImageNumber,
        firstMissionNumber: firstImageNumber,
        maxImageCount: imagesToFetch,
        maxMissionCount: imagesToFetch,
      });

      this.setState({ activePage: currentPage <= 0 ? 1 : currentPage });
    }

    if (!prevProps.deviceInfo.isMobile && deviceInfo.isMobile) {
      const imagesToFetchCount = arrOfImages.length * activePage;
      fetchImages({
        sharedOnly: type === 'observations',
        maxMissionCount: Math.max(imagesToFetchCount, 10),
        maxImageCount: Math.max(imagesToFetchCount, 10),
      });
    }

    if (prevProps.type !== type) {
      this.setState({ activePage: 1 });
      fetchImages({
        sharedOnly: type === 'observations',
        maxImageCount: imagesToFetch,
        maxMissionCount: imagesToFetch,
      });
    }
  }

  handlePageChange = ({ activePage }) => {
    const { actions, type, deviceInfo } = this.props;

    // used for determine first photo sequence number and fetch next 9 photos
    const PHOTOS_ON_ONE_PAGE = 9;
    const PREVIOUS_PAGE = activePage - 1;
    this.startFrom =
      activePage === 1 ? 1 : PREVIOUS_PAGE * PHOTOS_ON_ONE_PAGE + 1;
    //  ***

    const fetchImages = actions[mapTypeToRequest[type]];
    const imagesToFetch = getImagesCountToFetch(deviceInfo);

    fetchImages({
      firstMissionNumber: this.startFrom,
      firstImageNumber: this.startFrom,
      maxImageCount: imagesToFetch,
      maxMissionCount: imagesToFetch,
    });
    this.setState({ activePage });
  };

  placeholder = () => {
    const { type } = this.props;
    return this.props[mapTypeToCount[type]] > 0 ? (
      <div>Loading...</div>
    ) : (
      <div>The list is empty.</div>
    );
  };

  handleLoadMore = () => {
    const { actions, type } = this.props;
    const { activePage } = this.state;
    const arrOfImages = this.props[mapTypeToList[type]];
    const loadMoreRequest = actions[mapTypeToRequestMore[type]];
    const firstImageNumber = (arrOfImages.length + 1) * activePage;

    loadMoreRequest({ firstImageNumber, sharedOnly: type === 'observations' });
  };

  render() {
    const { children, type, deviceInfo, actions } = this.props;
    const { activePage } = this.state;
    const arrOfImages = this.props[mapTypeToList[type]];
    const count = this.props[mapTypeToCount[type]];
    const currentImagesNumber = arrOfImages.length * activePage;

    return Array.isArray(arrOfImages) && arrOfImages.length > 0 ? (
      <ConnectUser
        render={user => (
          <Fragment>
            <div
              className="root uniqclass-for-overflow"
              style={{
                justifyContent: deviceInfo.isDesktop
                  ? 'normal'
                  : 'space-between',
              }}
            >
              {count > 0
                ? arrOfImages.map((image, i) =>
                    cloneElement(children, {
                      key: image[mapTypeToId[type]],
                      isDesktop: deviceInfo.isDesktop,
                      isMobile: deviceInfo.isMobile,
                      firstImageNumber: this.startFrom,
                      index: i,
                      currentItem: image,
                      count,
                      user,
                      actions: {
                        downloadImage: actions.downloadImage,
                      },
                    })
                  )
                : 'The list is empty.'}
              <div className="pagination-wrapper">
                {count && !deviceInfo.isMobile
                  ? count > 9 && (
                      <Pagination
                        activePage={this.state.activePage}
                        pagesPerPage={4}
                        onPageChange={this.handlePageChange}
                        totalPageCount={Math.ceil(count / 9)}
                      />
                    )
                  : count > 10 && (
                      <ShowMore
                        totalCount={count}
                        currentCount={currentImagesNumber}
                        handleShowMore={this.handleLoadMore}
                      />
                    )}
              </div>
            </div>
            <style jsx>{style}</style>
          </Fragment>
        )}
      />
    ) : (
      this.placeholder()
    );
  }
}

ImageList.propTypes = {
  actions: PropTypes.shape({
    fetchMissionsAndCounts: PropTypes.func,
    fetchMorePhotoroll: PropTypes.func,
  }),
  type: PropTypes.string.isRequired,
  deviceInfo: PropTypes.object.isRequired,
};

ImageList.defaultProps = {
  actions: {},
};

export default ImageList;
