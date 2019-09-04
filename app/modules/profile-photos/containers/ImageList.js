/***********************************
 * V4 ImageList
 ***********************************/

import Pagination from 'app/components/common/pagination/v4-pagination/pagination';
import ShowMore from 'app/components/common/ShowMore';
import {
  fetchFiltersLists,
  setFilters,
  setSelectedTagsTabIndex,
} from 'app/modules/my-pictures-filters/actions';
import {
  fetchGalleriesAndCounts,
  fetchMoreGalleries,
} from 'app/modules/my-pictures-galleries/actions';

import {
  fetchMissionsAndCounts,
  fetchMoreMissions,
  fetchMorePhotoroll,
  fetchPhotoRollAndCounts,
} from 'app/modules/my-pictures/actions';
import { fetchObjectTypeList } from 'app/modules/object-type-list/actions';
import { FilterDropdown } from 'app/modules/profile-photos/components/filter-dropdown';
import { SelectedFilters } from 'app/modules/profile-photos/components/selected-filters';
import {
  selectObjectTypeList,
  selectSelectedFilters,
  selectTelescopeList,
  selectTimeList,
  photoHubsUploadToMyPicturesPageDataSelector,
} from 'app/modules/profile-photos/selectors';
import ConnectUser from 'app/redux/components/ConnectUser';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement, Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import {
  getFitsData,
  deleteTag,
  getTags,
  setTag,
  uploadToMyPicturesPage,
} from '../thunks';
import './image-list.scss';
import style from './ImageList.style';
import { UploadPhoto } from 'app/modules/profile-photos/components/UploadPhoto';

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

      fetchFiltersLists,
      fetchObjectTypeList,
      setFilters,
      getFitsData,
      setSelectedTagsTabIndex,
      getTags,
      setTag,
      deleteTag,
      uploadToMyPicturesPage,
    },
    dispatch
  ),
});

const mapStateToProps = state => {
  return {
    missionsList: state.myPictures.missions.response.imageList,
    missionsEmptyMsg: state.myPictures.missions.response.emptySetDisplay,
    missionsCount: state.myPictures.missions.imageCount,
    galleryList: state.galleries.galleryList,
    galleryCount: state.galleries.galleryCount,
    galleryEmptyMsg: state.galleries.emptySetDisplay,
    photoRollList: state.myPictures.photoRoll.response.imageList,
    photoRollCount: state.myPictures.photoRoll.imageCount,
    observationsList: state.myPictures.photoRoll.response.imageList,
    photoRollEmptyMsg: state.myPictures.photoRoll.response.emptySetDisplay,
    observationsCount: state.myPictures.observations.imageCount,
    fitsData: state.photoHubs.fitsData,
    tagsData: state.photoHubs.tagsData,

    telescopeList: selectTelescopeList()(state),
    timeList: selectTimeList()(state),
    objectTypeList: selectObjectTypeList()(state),
    selectedFilters: selectSelectedFilters()(state),
    myPicturesFilters: state.myPicturesFilters,
    uploadToMyPicturesPageData: photoHubsUploadToMyPicturesPageDataSelector()(
      state
    ),
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withRouter
class ImageList extends Component {
  state = {
    activePage: parseInt(this.props.location?.query?.page, 10) || 1,
    isFilterOpen: false,
    isUploadPhotoModalOpen: false,
  };

  componentDidMount() {
    const { actions, type, deviceInfo, params = {} } = this.props;
    const { activePage } = this.state;
    const { uploadToMyPicturesPage } = actions;
    const fetchImages = actions[mapTypeToRequest[type]];
    const imagesToFetch = getImagesCountToFetch(deviceInfo);
    const { customerUUID } = params;
    const PHOTOS_ON_ONE_PAGE = 9;
    const PREVIOUS_PAGE = activePage - 1;
    const firstImageNumber =
      activePage === 1 ? 1 : PREVIOUS_PAGE * PHOTOS_ON_ONE_PAGE + 1;

    fetchImages({
      sharedOnly: type === 'observations',
      firstImageNumber,
      firstMissionNumber: firstImageNumber,
      maxImageCount: imagesToFetch,
      maxMissionCount: imagesToFetch,
      customerUUID,
      publicGalleries: params.public ? 'y' : null,
    });
    //  fetchMissionsAndCounts | fetchGalleriesAndCounts | fetchPhotoRollAndCounts
    this.fetchFilters();
    uploadToMyPicturesPage();
  }

  componentDidUpdate(prevProps) {
    const { actions, type, deviceInfo, params = {} } = this.props;
    const { customerUUID } = params;
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
        customerUUID,
        publicGalleries: params.public ? 'y' : null,
      });

      this.setState({ activePage: currentPage <= 0 ? 1 : currentPage });
    }

    if (!prevProps.deviceInfo.isMobile && deviceInfo.isMobile) {
      const imagesToFetchCount = arrOfImages.length * activePage;
      fetchImages({
        sharedOnly: type === 'observations',
        maxMissionCount: Math.max(imagesToFetchCount, 10),
        maxImageCount: Math.max(imagesToFetchCount, 10),
        customerUUID,
        publicGalleries: params.public ? 'y' : null,
      });
    }

    if (prevProps.type !== type) {
      this.setState({ activePage: 1 });
      fetchImages({
        sharedOnly: type === 'observations',
        maxImageCount: imagesToFetch,
        maxMissionCount: imagesToFetch,
        customerUUID,
        publicGalleries: params.public ? 'y' : null,
      });
    }
  }

  componentWillUnmount() {
    this.handleFilterChange({
      pierNumber: null,
      observatoryId: null,
      filterType: null,
      timeFilter: null,
      dateFilter: null,
      missionSystemTags: [],
      missionUserTags: [],
      pictureUserTags: [],
    });
    this.handleApplyFilter();
  }

  fetchFilters = () => {
    const { actions } = this.props;
    const { fetchFiltersLists, fetchObjectTypeList } = actions;
    fetchFiltersLists();
    fetchObjectTypeList();
  };

  setFilterOpen = isFilterOpen => this.setState({ isFilterOpen });

  setUploadPhotoModalOpen = isUploadPhotoModalOpen =>
    this.setState({ isUploadPhotoModalOpen });

  handlePageChange = ({ activePage }) => {
    const {
      actions,
      type,
      deviceInfo,
      params = {},
      location: { pathname },
    } = this.props;
    const { customerUUID } = params;

    // used for determine first photo sequence number and fetch next 9 photos
    const PHOTOS_ON_ONE_PAGE = 9;
    const PREVIOUS_PAGE = activePage - 1;
    this.startFrom =
      activePage === 1 ? 1 : PREVIOUS_PAGE * PHOTOS_ON_ONE_PAGE + 1;
    //  ***

    const fetchImages = actions[mapTypeToRequest[type]];
    const imagesToFetch = getImagesCountToFetch(deviceInfo);

    browserHistory.push({
      pathname,
      search: `?page=${activePage}`,
    });

    fetchImages({
      sharedOnly: type === 'observations',
      firstMissionNumber: this.startFrom,
      firstImageNumber: this.startFrom,
      maxImageCount: imagesToFetch,
      maxMissionCount: imagesToFetch,
      customerUUID,
      publicGalleries: params.public ? 'y' : null,
    });
    this.setState({ activePage });
  };

  placeholder = () => {
    const {
      type,
      photoRollEmptyMsg,
      missionsEmptyMsg,
      galleryEmptyMsg,
    } = this.props;
    return this.props[mapTypeToCount[type]] > 0 ? (
      <div>Loading...</div>
    ) : (
      <div className="image-list-placeholder">
        {type === 'photoroll' && photoRollEmptyMsg}
        {type === 'observations' && photoRollEmptyMsg}
        {type === 'missions' && missionsEmptyMsg}
        {type === 'galleries' && galleryEmptyMsg}
      </div>
    );
  };

  handleLoadMore = () => {
    const { actions, type, params = {} } = this.props;
    const { customerUUID } = params;
    const { activePage } = this.state;
    const arrOfImages = this.props[mapTypeToList[type]];
    const loadMoreRequest = actions[mapTypeToRequestMore[type]];
    const firstImageNumber = (arrOfImages.length + 1) * activePage;
    loadMoreRequest({
      firstImageNumber,
      sharedOnly: type === 'observations',
      customerUUID,
    });
  };

  handleFilterChange = filter => {
    this.props.actions.setFilters({ ...filter });
  };

  handleApplyFilter = () => {
    const { actions, type, deviceInfo, params = {} } = this.props;
    const { customerUUID } = params;

    const fetchImages = actions[mapTypeToRequest[type]];

    const imagesToFetch = getImagesCountToFetch(deviceInfo);

    this.setState({ activePage: 1 });
    fetchImages({
      sharedOnly: type === 'observations',
      maxImageCount: imagesToFetch,
      maxMissionCount: imagesToFetch,
      customerUUID,
      publicGalleries: params.public ? 'y' : null,
    });
  };

  render() {
    const {
      actions: {
        getFitsData,
        setSelectedTagsTabIndex,
        getTags,
        setTag,
        deleteTag,
      },
      children,
      type,
      deviceInfo,
      telescopeList,
      objectTypeList,
      selectedFilters,
      fitsData,
      timeList,
      myPicturesFilters,
      tagsData,
      params,
      uploadToMyPicturesPageData,
    } = this.props;
    const tagActions = {
      getTags,
      setTag,
      deleteTag,
    };
    const { activePage, isFilterOpen, isUploadPhotoModalOpen } = this.state;
    const arrOfImages = this.props[mapTypeToList[type]];
    const count = this.props[mapTypeToCount[type]];
    const currentImagesNumber = arrOfImages.length * activePage;

    const cn = cx('profile-image-list-wrapper', {
      'filter-open': isFilterOpen,
    });

    return (
      <div className={cn}>
        {params.private && (
          <div className="filter-dropdown-btn">
            <FilterDropdown
              isOpen={isFilterOpen}
              setOpen={this.setFilterOpen}
              onChange={this.handleFilterChange}
              telescopeList={telescopeList}
              timeList={timeList}
              objectTypeList={objectTypeList}
              selectedFilters={selectedFilters}
              onApply={this.handleApplyFilter}
              //tags component
              setSelectedTagsTabIndex={setSelectedTagsTabIndex}
              myPicturesFilters={myPicturesFilters}
            />
          </div>
        )}
        {isFilterOpen && (
          <div className="filter-shader animated fadeIn faster" />
        )}

        <SelectedFilters
          {...{
            selectedFilters,
            telescopeList,
            timeList,
            objectTypeList,
          }}
          onChange={this.handleFilterChange}
          onApply={this.handleApplyFilter}
        />

        {Array.isArray(arrOfImages) && arrOfImages.length > 0 ? (
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
                          getFitsData: type === 'missions' && getFitsData,
                          fitsData: type === 'missions' && fitsData,
                          tagActions: type === 'photoroll' && tagActions,
                          tagsData: type === 'photoroll' && tagsData,
                        })
                      )
                    : 'The list is empty.'}
                  <div className="pagination-wrapper">
                    {count && !deviceInfo.isMobile
                      ? count > 9 && (
                          <Pagination
                            pagesPerPage={4}
                            activePage={activePage}
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
        )}
        <UploadPhoto
          isOpen={isUploadPhotoModalOpen}
          setOpen={this.setUploadPhotoModalOpen()}
        />
      </div>
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
