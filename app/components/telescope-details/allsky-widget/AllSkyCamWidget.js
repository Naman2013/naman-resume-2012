import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from '../condition-snapshot/Offline';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchAllSkyAction } from '../../../modules/Telescope-Overview';
import { white } from '../../../styles/variables/colors';

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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchAllSkyAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class AllSkyCamWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    AllskyWidgetId: PropTypes.string.isRequired,
    fetchingAllSkyWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    allSkyCamURL: PropTypes.string.isRequired,
    onlineStatus: PropTypes.string.isRequired,
    offlineImageURL: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      fetchingAllSkyWidgetResult,
      allSkyTitle,
      refreshIntervalSec,
      allSkyCamURL,
      onlineStatus,
      offlineImageURL,
      imageWidth,
    } = this.props;

    const inlineTitleStyle = {
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      minWidth: '100%',
    }

    return (
      <div className="telescope-block live-allskycam">
        <h1 style={inlineTitleStyle}>{allSkyTitle}</h1>
        <div className="live-allskycam">
          {onlineStatus == 'offline' && <Offline offlineImageURL={offlineImageURL}/>}
          {onlineStatus == 'online' && allSkyCamURL ? <RefreshedImage imageURL={allSkyCamURL} refreshIntervalSec={refreshIntervalSec} imageAltText="" maxImageWidth={imageWidth}/> : <GenericLoadingBox />
          }
        </div>
      </div>
    );
  }
}

export default AllSkyCamWidget;
