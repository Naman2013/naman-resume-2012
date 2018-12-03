import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { allSkyWidgetResult },
}) => ({
  allSkyTitle: allSkyWidgetResult.title,
  refreshIntervalSec: allSkyWidgetResult.refreshIntervalSec,
  allSkyCamURL: allSkyWidgetResult.allSkyCamURL,
  offlineImageURL: allSkyWidgetResult.offlineImageURL,
  onlineStatus: allSkyWidgetResult.onlineStatus,
  imageWidth: allSkyWidgetResult.imageWidth,
  fetchingAllSkyWidgetResult: telescopeOverview.fetchingAllSkyWidgetResult,
});

@connect(mapStateToProps)
class AllSkyCamWidget extends Component {
  static propTypes = {
    refreshIntervalSec: PropTypes.number.isRequired,
    allSkyCamURL: PropTypes.string.isRequired,
    onlineStatus: PropTypes.string.isRequired,
  };

  render() {
    const {
      refreshIntervalSec,
      allSkyCamURL,
      onlineStatus,
      imageWidth,
    } = this.props;

    return (
      onlineStatus === 'online' && allSkyCamURL
        ? <RefreshedImage imageURL={allSkyCamURL} refreshIntervalSec={refreshIntervalSec} imageAltText="" maxImageWidth={imageWidth} />
        : null
    );
  }
}

export default AllSkyCamWidget;
