/***********************************
* V4 ImageList 
***********************************/

import React, { Component, Fragment, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '../../components/common/pagination/v4-pagination/pagination';
import { DeviceContext } from '../../providers/DeviceProvider';
import { fetchMissionsAndCounts } from '../../modules/my-pictures/actions';

import { fetchGalleriesAndCounts } from '../../modules/my-pictures-galleries/actions';
import style from './ImageList.style';

const mapTypeToList = {
  observations: 'observatinsList',
  missions: 'missionsList',
  galleries: 'galleryList',
};

const mapTypeToCount = {
  observations: 'observationsCount',
  missions: 'missionsCount',
  galleries: 'galleryCount',
};

const manTypeToId = {
  observations: 'observationId',
  missions: 'imageId',
  galleries: 'galleryId',
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissionsAndCounts,
    fetchGalleriesAndCounts,
  }, dispatch),
});

const mapStateToProps = ({ myPictures, galleries }) => ({
  missionsList: myPictures.missions.response.imageList,
  missionsCount: myPictures.missions.imageCount,
  galleryList: galleries.galleryList,
  galleryCount: galleries.maxImageCount,
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageList extends Component {
  state = {
    activePage: 1,
  }

  componentDidMount() {
    this.props.actions[this.props.request]({});
    //  fetchMissionsAndCounts | fetchGalleriesAndCounts
  }

  handlePageChange = ({ activePage }) => {
    // used for determine first photo sequence number and fetch next 9 photos
    const PHOTOS_ON_ONE_PAGE = 9;
    const PREVIOUS_PAGE = activePage - 1;
    const startFrom = activePage === 1
      ? 1
      : (PREVIOUS_PAGE * PHOTOS_ON_ONE_PAGE) + 1;
    this.props.actions[this.props.request]({ firstMissionNumber: startFrom });
    this.setState({ activePage });
  }

  render() {
    const { children, type } = this.props;
    const arrOfImages = this.props[mapTypeToList[type]];
    const count = this.props[mapTypeToCount[type]];
    // const count = 5;
    // const arrOfImages = [1,2,4,5,6];
    return arrOfImages.length !== 0 ? (
      <DeviceContext.Consumer>
        {
          context => (
            <Fragment>
              <div className="root" style={{ justifyContent: context.isDesktop ? 'normal' : 'space-between' }}>
                {arrOfImages.length > 0 && arrOfImages.map((image, i) => cloneElement(children, {
                    key: image[manTypeToId[type]],
                    isDesktop: context.isDesktop,
                    isMobile: context.isMobile,
                    index: i,
                    currentItem: image,
                  }))
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
    ) : (
      <div>Loading</div>
    );
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
