import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from '../condition-snapshot/Offline';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchDomeCamAction } from '../../../modules/Telescope-Overview';
import { white } from '../../../styles/variables/colors';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { domeCamWidgetResult },
}) => ({
  domeCamTitle: domeCamWidgetResult.title,
  refreshIntervalSec: domeCamWidgetResult.refreshIntervalSec,
  domeCamURL: domeCamWidgetResult.domeCamURL,
  offlineImageURL: domeCamWidgetResult.offlineImageURL,
  onlineStatus: domeCamWidgetResult.onlineStatus,
  imageWidth: domeCamWidgetResult.imageWidth,
  fetchingDomeCamWidgetResult: telescopeOverview.fetchingDomeCamWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchDomeCamAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class DomeCamWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    DomecamWidgetId: PropTypes.string.isRequired,
    fetchingDomeCamWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    domeCamURL: PropTypes.string.isRequired,
    onlineStatus: PropTypes.string.isRequired,
    offlineImageURL: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      fetchingDomeCamWidgetResult,
      domeCamTitle,
      refreshIntervalSec,
      domeCamURL,
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
      <div className="telescope-block live-domecam">
        <h1 style={inlineTitleStyle}>{domeCamTitle}</h1>
        <div className="live-domecam">
          {onlineStatus == 'offline' && <Offline offlineImageURL={offlineImageURL}/>}
          {onlineStatus == 'online' && domeCamURL ? <RefreshedImage imageURL={domeCamURL} refreshIntervalSec={refreshIntervalSec} imageAltText="" maxImageWidth={imageWidth}/> : <GenericLoadingBox />
          }
        </div>
      </div>
    );
  }
}

export default DomeCamWidget;
