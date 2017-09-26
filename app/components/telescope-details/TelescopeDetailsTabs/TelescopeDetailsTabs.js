import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAllWidgets } from '../../../modules/telescope-details/actions';

import generateTabConfiguration from './generate-tab-configuration';
import DefaultTabs from '../../Tabs';

const mapStateToProps = ({ telescopeDetails }) => ({
  currentConditionsURL: telescopeDetails.weatherConditionWidgetResult.currentConditionsURL,

  dayNightBarRefreshInterval: telescopeDetails.dayNightBar.refreshIntervalSec,
  dayNightBarURL: telescopeDetails.dayNightBar.dayNightBarURL,

  dayNightMapRefreshInterval: telescopeDetails.dayNightMap.refreshIntervalSec,
  dayNightMapURL: telescopeDetails.dayNightMap.dayNightMapURL,

  allSkyRefreshIntervalSec: telescopeDetails.allSkyCamera.refreshIntervalSec,
  allSkyCamURL: telescopeDetails.allSkyCamera.allSkyCamURL,
  allSkyCamOfflineURL: telescopeDetails.allSkyCamera.offlineImageURL,
  allSkyCamOnlineStatus: telescopeDetails.allSkyCamera.onlineStatus,

  domeCamRefreshIntervalSec: telescopeDetails.domeCam.refreshIntervalSec,
  domeCamURL: telescopeDetails.domeCam.domeCamURL,
  domeCamOfflineURL: telescopeDetails.domeCam.offlineImageURL,
  domeCamOnlineStatus: telescopeDetails.domeCam.onlineStatus,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchAllWidgets,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class TelescopeDetailsTabs extends Component {
  static propTypes = {
    // provided by redux state
    currentConditionsURL: PropTypes.string.isRequired,

    dayNightBarRefreshInterval: PropTypes.number.isRequired,
    dayNightBarURL: PropTypes.string.isRequired,

    dayNightMapRefreshInterval: PropTypes.number.isRequired,
    dayNightMapURL: PropTypes.string.isRequired,

    allSkyRefreshIntervalSec: PropTypes.number.isRequired,
    allSkyCamURL: PropTypes.string.isRequired,
    allSkyCamOfflineURL: PropTypes.string.isRequired,
    allSkyCamOnlineStatus: PropTypes.string.isRequired,

    domeCamRefreshIntervalSec: PropTypes.number.isRequired,
    domeCamURL: PropTypes.string.isRequired,
    domeCamOfflineURL: PropTypes.string.isRequired,
    domeCamOnlineStatus: PropTypes.string.isRequired,

    // provided by parent
    obsId: PropTypes.string.isRequired,
    CurrentConditionsWidgetId: PropTypes.string.isRequired,
    DayNightBarWidgetId: PropTypes.string.isRequired,
    DayNightMapWidgetId: PropTypes.string.isRequired,
    AllskyWidgetId: PropTypes.string.isRequired,
    DomecamWidgetId: PropTypes.string.isRequired,

    actions: PropTypes.shape({
      fetchAllWidgets: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    const {
      obsId,
      CurrentConditionsWidgetId,
      DayNightBarWidgetId,
      DayNightMapWidgetId,
      AllskyWidgetId,
      DomecamWidgetId,
    } = this.props;

    this.props.actions.fetchAllWidgets({
      obsId,
      CurrentConditionsWidgetId,
      DayNightBarWidgetId,
      DayNightMapWidgetId,
      AllskyWidgetId,
      DomecamWidgetId,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { obsId } = this.props;
    const nextObsId = nextProps.obsId;
    if (obsId !== nextObsId) {
      this.props.actions.fetchAllWidgets({
        obsId: nextProps.obsId,
        CurrentConditionsWidgetId: nextProps.CurrentConditionsWidgetId,
        DayNightBarWidgetId: nextProps.DayNightBarWidgetId,
        DayNightMapWidgetId: nextProps.DayNightMapWidgetId,
        AllskyWidgetId: nextProps.AllskyWidgetId,
        DomecamWidgetId: nextProps.DomecamWidgetId,
      });
    }
  }

  render() {
    const tabConfiguration = generateTabConfiguration(this.props);

    return (
      <div>
        <DefaultTabs tabConfiguration={tabConfiguration} />
      </div>
    );
  }
}

export default TelescopeDetailsTabs;
