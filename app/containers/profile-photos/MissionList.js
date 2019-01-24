/***********************************
* V4 MissionList 
***********************************/

import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'components/common/pagination/v4-pagination/pagination.js';
import { DeviceContext } from 'providers/DeviceProvider';
import MissionCard from 'components/profile-photos/MissionCard';
import { fetchMissionsAndCounts } from 'modules/my-pictures/actions';
import style from './MissionList.style';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissionsAndCounts,
  }, dispatch),
});

const mapStateToProps = ({ myPictures }) => ({
  imageList: myPictures.missions.response.imageList,
  imageCount: myPictures.missions.imageCount,
});

@connect(mapStateToProps, mapDispatchToProps)
class MissionList extends Component {
  state = {
    activePage: 1,
  }

  componentDidMount() {
    this.props.actions.fetchMissionsAndCounts({});
  }

  handlePageChange = ({ activePage }) => {
    // used for determine first photo sequence number and fetch next 9 photos
    const PHOTOS_ON_ONE_PAGE = 9;
    const PREVIOUS_PAGE = activePage - 1;
    const startFrom = activePage === 1
      ? 1
      : (PREVIOUS_PAGE * PHOTOS_ON_ONE_PAGE) + 1;
    this.props.actions.fetchMissionsAndCounts({ firstMissionNumber: startFrom });
    this.setState({ activePage });
  }

  render() {
    const { imageList, imageCount } = this.props;
    return imageList.length !== 0 ? (
      <DeviceContext.Consumer>
        {
          context => (
            <Fragment>
              <div className="root" style={{ justifyContent: context.isDesktop ? 'normal' : 'space-between' }}>
                {imageList.length > 0 && imageList.map((mission, i) => (
                  <MissionCard
                    key={mission.imageId}
                    isDesktop={context.isDesktop}
                    isMobile={context.isMobile}
                    index={i}
                    mission={mission}
                  />
                ))}
                <div className="pagination-wrapper">
                  {imageCount && <Pagination
                    activePage={this.state.activePage}
                    pagesPerPage={4}
                    onPageChange={this.handlePageChange}
                    totalPageCount={Math.ceil(imageCount / 9)}
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

MissionList.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.shape({
    fetchMissionsAndCounts: PropTypes.func,
  }).isRequired,
  imageCount: PropTypes.number,
};

MissionList.defaultProps = {
  imageList: [],
  imageCount: 0,
};

export default MissionList;
