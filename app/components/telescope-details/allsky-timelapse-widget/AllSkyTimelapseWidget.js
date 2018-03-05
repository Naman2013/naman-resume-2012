import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from '../condition-snapshot/Offline';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchAllSkyTimelapseAction } from '../../../modules/Telescope-Overview';
import { white } from '../../../styles/variables/colors';
import './allsky-timelapse-widget.scss';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { allSkyTimelapseWidgetResult },
}) => ({
  allskyTimelapseTitle: allSkyTimelapseWidgetResult.title,
  refreshIntervalSec: allSkyTimelapseWidgetResult.refreshIntervalSec,
  allskyTimelapseURL: allSkyTimelapseWidgetResult.allskyTimelapseURL,
  offlineImageURL: allSkyTimelapseWidgetResult.offlineImageURL,
  onlineStatus: allSkyTimelapseWidgetResult.onlineStatus,
  widgetWidth: allSkyTimelapseWidgetResult.widgetWidth,
  fetchingAllSkyTimelapseWidgetResult: telescopeOverview.fetchingAllSkyTimelapseWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchAllSkyTimelapseAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class AllSkyTimelapseWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    AllskyTimelapseWidgetId: PropTypes.string.isRequired,
    fetchingAllSkyTimelapseWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    allskyTimelapseURL: PropTypes.string.isRequired,
    onlineStatus: PropTypes.string.isRequired,
    offlineImageURL: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { obsId, AllskyTimelapseWidgetId } = this.props;
    this.props.actions.fetchAllSkyTimelapseAction({ obsId, AllskyTimelapseWidgetId });
  }

  componentWillUpdate(nextProps) {
    if (this.props.obsId !== nextProps.obsId) {
      this.props.actions.fetchAllSkyTimelapseAction({ obsId: nextProps.obsId, AllskyTimelapseWidgetId: nextProps.AllskyTimelapseWidgetId });
    }
  }

  render() {
    const {
      fetchingAllSkyTimelapseWidgetResult,
      allskyTimelapseTitle,
      refreshIntervalSec,
      allskyTimelapseURL,
      onlineStatus,
      offlineImageURL,
      widgetWidth,
    } = this.props;

    const inlineTitleStyle = {
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      minWidth: '100%',
    }

    return (
      <div className="telescope-block live-allsky">
        <h1 style={inlineTitleStyle}>{allskyTimelapseTitle}</h1>
        <div className="live-allskytimelapse">
          {onlineStatus == 'offline' && <Offline offlineImageURL={offlineImageURL}/>}
          {onlineStatus == 'online' && allskyTimelapseURL ?
            <video style={{width: widgetWidth + 'px'}} className="allskytimelapse-video" playsInline autoPlay muted loop nodownload controls controlsList="nodownload">
              <source src={allskyTimelapseURL} type="video/mp4" />
            </video>
            : <GenericLoadingBox />
          }
        </div>
      </div>
    );
  }
}

export default AllSkyTimelapseWidget;
