import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAllWidgets } from '../../../modules/telescope-details/actions';

import generateTelescopeDetailsTabConfiguration from './generate-tab-configuration';
import DefaultTabs from '../../Tabs';

const mapStateToProps = ({ telescopeDetails }) => ({
  currentConditionsURL: telescopeDetails.weatherConditionWidgetResult.currentConditionsURL,

  dayNightBarPanelRefreshInterval: telescopeDetails.dayNightBarPanel.refreshIntervalSec,
  dayNightBarPanelURL: telescopeDetails.dayNightBarPanel.dayNightBarPanelURL,
  dayNightBarPanelImageWidth: telescopeDetails.dayNightBarPanel.imageWidth,
  dayNightBarPanelTitle: telescopeDetails.dayNightBarPanel.title,

  dayNightMapRefreshInterval: telescopeDetails.dayNightMap.refreshIntervalSec,
  dayNightMapURL: telescopeDetails.dayNightMap.dayNightMapURL,
  dayNightMapImageWidth: telescopeDetails.dayNightMap.imageWidth,
  dayNightMapTitle: telescopeDetails.dayNightMap.title,

  allSkyRefreshIntervalSec: telescopeDetails.allSkyCamera.refreshIntervalSec,
  allSkyCamURL: telescopeDetails.allSkyCamera.allSkyCamURL,
  allSkyCamOfflineURL: telescopeDetails.allSkyCamera.offlineImageURL,
  allSkyCamOnlineStatus: telescopeDetails.allSkyCamera.onlineStatus,
  allSkyCamImageWidth: telescopeDetails.allSkyCamera.imageWidth,
  allSkyCamTitle: telescopeDetails.allSkyCamera.title,

  domeCamRefreshIntervalSec: telescopeDetails.domeCam.refreshIntervalSec,
  domeCamURL: telescopeDetails.domeCam.domeCamURL,
  domeCamOfflineURL: telescopeDetails.domeCam.offlineImageURL,
  domeCamOnlineStatus: telescopeDetails.domeCam.onlineStatus,
  domeCamImageWidth: telescopeDetails.domeCam.imageWidth,
  domeCamTitle: telescopeDetails.domeCam.title,
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

    dayNightBarPanelRefreshInterval: PropTypes.number.isRequired,
    dayNightBarPanelURL: PropTypes.string.isRequired,
    dayNightBarPanelImageWidth: PropTypes.string.isRequired,
    dayNightBarPanelTitle: PropTypes.string.isRequired,

    dayNightMapRefreshInterval: PropTypes.number.isRequired,
    dayNightMapURL: PropTypes.string.isRequired,
    dayNightMapImageWidth: PropTypes.string.isRequired,
    dayNightMapTitle: PropTypes.string.isRequired,

    allSkyRefreshIntervalSec: PropTypes.number.isRequired,
    allSkyCamURL: PropTypes.string.isRequired,
    allSkyCamOfflineURL: PropTypes.string.isRequired,
    allSkyCamOnlineStatus: PropTypes.string.isRequired,
    allSkyCamImageWidth: PropTypes.string.isRequired,
    allSkyCamTitle: PropTypes.string.isRequired,

    domeCamRefreshIntervalSec: PropTypes.number.isRequired,
    domeCamURL: PropTypes.string.isRequired,
    domeCamOfflineURL: PropTypes.string.isRequired,
    domeCamOnlineStatus: PropTypes.string.isRequired,
    domeCamImageWidth: PropTypes.string.isRequired,
    domeCamTitle: PropTypes.string.isRequired,

    // provided by parent
    obsId: PropTypes.string.isRequired,
    CurrentConditionsWidgetId: PropTypes.string.isRequired,
    DayNightBarPanelWidgetId: PropTypes.string.isRequired,
    DayNightMapWidgetId: PropTypes.string.isRequired,
    AllskyWidgetId: PropTypes.string.isRequired,
    DomecamWidgetId: PropTypes.string.isRequired,
    FacilityWebcamWidgetId: PropTypes.string.isRequired,
    MiniWeatherPanelWidgetId: PropTypes.string.isRequired,
    SatelliteWidgetId: PropTypes.string.isRequired,
    WeatherConditionsWidgetId: PropTypes.string.isrequired,
    MissionControlStatusWidgetId: PropTypes.string.isrequired,

    actions: PropTypes.shape({
      fetchAllWidgets: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    selectedTabIndex: 0,
  };

  componentWillMount() {
    const {
      obsId,
      CurrentConditionsWidgetId,
      DayNightBarPanelWidgetId,
      DayNightMapWidgetId,
      AllskyWidgetId,
      DomecamWidgetId,
    } = this.props;

    this.props.actions.fetchAllWidgets({
      obsId,
      CurrentConditionsWidgetId,
      DayNightBarPanelWidgetId,
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
        DayNightBarPanelWidgetId: nextProps.DayNightBarPanelWidgetId,
        DayNightMapWidgetId: nextProps.DayNightMapWidgetId,
        AllskyWidgetId: nextProps.AllskyWidgetId,
        DomecamWidgetId: nextProps.DomecamWidgetId,
      });
    }
  }

  handleTabClick = (selectedTabIndex) => {
    this.setState({
      selectedTabIndex,
    });
  };

  render() {
    const { selectedTabIndex } = this.state;
    const tabConfiguration = generateTelescopeDetailsTabConfiguration(this.props);

    return (
      <div>
        <DefaultTabs
          tabConfiguration={tabConfiguration}
          handleTabSelect={this.handleTabClick}
          selectedIndex={selectedTabIndex}
        />
      </div>
    );
  }
}

export default TelescopeDetailsTabs;
