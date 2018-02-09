import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from '../condition-snapshot/Offline';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchDomeCamTimelapseAction } from '../../../modules/Telescope-Overview';
import { white } from '../../../styles/variables/colors';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { domeCamTimelapseWidgetResult },
}) => ({
  domeCamTimelapseTitle: domeCamTimelapseWidgetResult.title,
  refreshIntervalSec: domeCamTimelapseWidgetResult.refreshIntervalSec,
  domeCamTimelapseURL: domeCamTimelapseWidgetResult.domecamTimelapseURL,
  offlineImageURL: domeCamTimelapseWidgetResult.offlineImageURL,
  onlineStatus: domeCamTimelapseWidgetResult.onlineStatus,
  widgetWidth: domeCamTimelapseWidgetResult.widgetWidth,
  fetchingDomeCamTimelapseWidgetResult: telescopeOverview.fetchingDomeCamTimelapseWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchDomeCamTimelapseAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class DomeCamTimelapseWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    DomecamTimelapseWidgetId: PropTypes.string.isRequired,
    fetchingDomeCamTimelapseWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    domeCamTimelapseURL: PropTypes.string.isRequired,
    onlineStatus: PropTypes.string.isRequired,
    offlineImageURL: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { obsId, DomecamTimelapseWidgetId } = this.props;
    this.props.actions.fetchDomeCamTimelapseAction({ obsId, DomecamTimelapseWidgetId });
  }

  componentWillUpdate(nextProps) {
    if (this.props.DomecamTimelapseWidgetId !== nextProps.DomecamTimelapseWidgetId && this.props.obsId !== nextProps.obsId) {
      this.props.actions.fetchDomeCamTimelapseAction({ obsId: nextProps.obsId, DomecamTimelapseWidgetId: nextProps.DomecamTimelapseWidgetId });
    }
  }

  render() {
    const {
      fetchingDomeCamTimelapseWidgetResult,
      domeCamTimelapseTitle,
      refreshIntervalSec,
      domeCamTimelapseURL,
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
      <div className="telescope-block live-domecam">
        <h1 style={inlineTitleStyle}>{domeCamTimelapseTitle}</h1>
        <div className="live-domecamtimelapse">
          {onlineStatus == 'offline' && <Offline offlineImageURL={offlineImageURL}/>}
          {onlineStatus == 'online' && domeCamTimelapseURL ?
            <video playsInline autoPlay muted loop nodownload controls controlsList="nodownload">
              <source src={domeCamTimelapseURL} type="video/mp4" />
            </video>
            : <GenericLoadingBox />
          }
        </div>
      </div>
    );
  }
}

export default DomeCamTimelapseWidget;
