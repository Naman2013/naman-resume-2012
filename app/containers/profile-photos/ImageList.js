/***********************************
* V4 ImageList 
***********************************/

import React, { Component, Fragment, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectUser from '../../redux/components/ConnectUser';
import Pagination from '../../components/common/pagination/v4-pagination/pagination';
import { DeviceContext } from '../../providers/DeviceProvider';

import { fetchMissionsAndCounts, fetchPhotoRollAndCounts } from '../../modules/my-pictures/actions';
import { fetchGalleriesAndCounts } from '../../modules/my-pictures-galleries/actions';

import style from './ImageList.style';

const mapTypeToList = {
  observations: 'observationsList',
  photoRoll: 'photoRollList',
  missions: 'missionsList',
  galleries: 'galleryList',
};

const mapTypeToCount = {
  observations: 'observationsCount',
  photoRoll: 'photoRollCount',
  missions: 'missionsCount',
  galleries: 'galleryCount',
};

const manTypeToId = {
  observations: 'imageId',
  photoRoll: 'imageId',
  missions: 'imageId',
  galleries: 'galleryId',
};

const mapTypeToRequest = {
  observations: 'fetchPhotoRollAndCounts',
  photoRoll: 'fetchPhotoRollAndCounts',
  missions: 'fetchMissionsAndCounts',
  galleries: 'fetchGalleriesAndCounts',
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissionsAndCounts,
    fetchGalleriesAndCounts,
    fetchPhotoRollAndCounts,
  }, dispatch),
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

@connect(mapStateToProps, mapDispatchToProps)
class ImageList extends Component {
  state = {
    activePage: 1,
  }

  componentDidMount() {
    const { actions, type } = this.props;
    const request = actions[mapTypeToRequest[type]];
    request({ sharedOnly: type === 'observations' });
    // actions[request]({  });
    //  fetchMissionsAndCounts | fetchGalleriesAndCounts | fetchPhotoRollAndCounts
  }

  handlePageChange = ({ activePage }) => {
    const { actions, type } = this.props;

    // used for determine first photo sequence number and fetch next 9 photos
    const PHOTOS_ON_ONE_PAGE = 9;
    const PREVIOUS_PAGE = activePage - 1;
    const startFrom = activePage === 1
      ? 1
      : (PREVIOUS_PAGE * PHOTOS_ON_ONE_PAGE) + 1;
    //  ***

    const request = actions[mapTypeToRequest[type]];
    request({ firstMissionNumber: startFrom });
    this.setState({ activePage });
  }

  placeholder = () => {
    const { type } = this.props;
    return this.props[mapTypeToCount[type]] > 0
      ? <div>Loading...</div>
      : <div>The list is empty.</div>;
  }

  render() {
    const { children, type } = this.props;
    const arrOfImages = this.props[mapTypeToList[type]];
    const count = this.props[mapTypeToCount[type]];
    return Array.isArray(arrOfImages) && arrOfImages.length > 0
      ? (
        <ConnectUser
          render={user => (
            <DeviceContext.Consumer>
              {
                context => (
                  <Fragment>
                    <div className="root" style={{ justifyContent: context.isDesktop ? 'normal' : 'space-between' }}>
                      {count > 0
                        ? arrOfImages.map((image, i) => cloneElement(children, {
                            key: image[manTypeToId[type]],
                            isDesktop: context.isDesktop,
                            isMobile: context.isMobile,
                            index: i,
                            currentItem: image,
                            user,
                          }))
                        : 'The list is empty.'
                      }
                      <div className="pagination-wrapper">
                        {count && <Pagination
                          activePage={this.state.activePage}
                          pagesPerPage={4}
                          onPageChange={this.handlePageChange}
                          totalPageCount={Math.ceil(count / 9)}
                        />}
                      </div>
                    </div>
                    <style jsx>{style}</style>
                  </Fragment>
                )
              }
            </DeviceContext.Consumer>
            )
          }
        />
      )
      : this.placeholder();
  }
}

ImageList.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.shape({
    fetchMissionsAndCounts: PropTypes.func,
  }).isRequired,
  imageCount: PropTypes.number,
};

ImageList.defaultProps = {
  imageList: [],
  imageCount: 0,
};

export default ImageList;
