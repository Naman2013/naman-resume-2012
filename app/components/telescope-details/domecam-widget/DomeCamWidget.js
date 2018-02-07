import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from '../condition-snapshot/Offline';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import { fetchDomeCam } from '../../../modules/Telescope-Overview';
import { white } from '../../../styles/variables/colors';

const mapStateToProps = ({
  telescopeOverview,
  telescopeOverview: { domeCamWidgetResult },
}) => ({
  title: domeCamWidgetResult.title,
  refreshIntervalSec: domeCamWidgetResult.refreshIntervalSec,
  domeCamURL: domeCamWidgetResult.domeCamURL,
  offlineImageURL: domeCamWidgetResult.offlineImageURL,
  offlineStatus: domeCamWidgetResult.offlineStatus,
  fetchingDomeCamWidgetResult: telescopeOverview.fetchingDomeCamWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchDomeCam,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class DomeCamWidget extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    domeCamWidgetId: PropTypes.string.isRequired,
    fetchingDomeCamWidgetResult: PropTypes.bool.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    domeCamURL: PropTypes.string.isRequired,
    offlineStatus: PropTypes.string.isRequired,
    offlineImageURL: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      fetchDomeCam: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { obsId, domeCamWidgetId } = this.props;
    this.props.actions.fetchDomeCam({
      obsId,
      domeCamWidgetId,
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.domeCamWidgetId !== nextProps.domeCamWidgetId && this.props.obsId !== nextProps.obsId) {
      this.props.actions.fetchDomeCam({
        obsId: nextProps.obsId,
        domeCamWidgetId: nextProps.domeCamWidgetId,
      });
    }
  }

  render() {
    const {
      fetchingDomeCamWidgetResult,
      title,
      refreshIntervalSec,
      domeCamURL,
      offlineStatus,
      offlineImageURL,
    } = this.props;

    const inlineTitleStyle = {
      color: 'white',
      textAlign: 'center',
      position: 'absolute',
      minWidth: '100%',
    }

    return (
      <div className="telescope-block live-domecam">
        <div className="live-domecam">
          {onlineStatus == 'offline' && <Offline offlineImageURL={offlineImageURL}/>}
          {onlineStatus == 'online' && domeCamURL ? <RefreshedImage imageURL={domeCamURL} refreshIntervalSec={refreshIntervalSec} imageAltText=""/> : <GenericLoadingBox />
          }
        </div>
      </div>
    );
  }
}

export default DomeCamWidget;
