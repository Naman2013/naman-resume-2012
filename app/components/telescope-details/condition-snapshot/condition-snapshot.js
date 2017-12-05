import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DayNightTimeline from './DayNightTimeline';
import DayNightMap from './DayNightMap';
import AllSkyCamera from './AllSkyCamera';
import DomeCam from './DomeCam';
import { fetchAllWidgets } from '../../../modules/telescope-details/actions';
import './condition-snapshot.scss';

const mapStateToProps = ({ telescopeDetails }) => ({
  title: telescopeDetails.weatherConditionWidgetResult.title,
  subtitle: telescopeDetails.weatherConditionWidgetResult.subtitle,
  currentConditionsURL: telescopeDetails.weatherConditionWidgetResult.currentConditionsURL,

  dayNightBarPanelRefreshInterval: telescopeDetails.dayNightBarPanel.refreshIntervalSec,
  dayNightBarPanelURL: telescopeDetails.dayNightBarPanel.dayNightBarPanelURL,

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
class TelescopeConditionSnapshot extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    currentConditionsURL: PropTypes.string.isRequired,

    dayNightBarPanelRefreshInterval: PropTypes.number.isRequired,
    dayNightBarPanelURL: PropTypes.string.isRequired,

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

    obsId: PropTypes.string.isRequired,
    CurrentConditionsWidgetId: PropTypes.string.isRequired,
    DayNightBarPanelWidgetId: PropTypes.string.isRequired,
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

  render() {
    const {
      title,
      subtitle,
      dayNightBarPanelRefreshInterval,
      dayNightBarPanelURL,
      dayNightMapRefreshInterval,
      dayNightMapURL,
      allSkyRefreshIntervalSec,
      allSkyCamURL,
      allSkyCamOfflineURL,
      allSkyCamOnlineStatus,
      domeCamRefreshIntervalSec,
      domeCamURL,
      domeCamOfflineURL,
      domeCamOnlineStatus,
    } = this.props;

    return (
      <div className="condition-snapshot telescope-details-widget">
        <div className="top">
          <div className="row">
            <div className="col-xs-12">
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
          </div>
        </div>
        <div className="content">

          <div className="row">
            <div className="col-xs-12">
              {
                dayNightBarPanelRefreshInterval && dayNightBarPanelURL ?
                  <DayNightTimeline
                    dayNightBarPanelURL={dayNightBarPanelURL}
                    refreshIntervalSec={dayNightBarPanelRefreshInterval}
                  /> : null
              }
            </div>

            <div className="col-xs-12">
              {
                dayNightMapRefreshInterval && dayNightMapURL ?
                  <DayNightMap
                    refreshIntervalSec={dayNightMapRefreshInterval}
                    dayNightMapURL={dayNightMapURL}
                  /> : null
              }
            </div>

            <div className="col-xs-12">
              {
                allSkyRefreshIntervalSec && allSkyCamURL ?
                  <AllSkyCamera
                    refreshIntervalSec={allSkyRefreshIntervalSec}
                    allSkyCamURL={allSkyCamURL}
                    offlineImageURL={allSkyCamOfflineURL}
                    onlineStatus={allSkyCamOnlineStatus}
                  /> : null
              }
            </div>

            <div className="col-xs-12">
              {
                domeCamRefreshIntervalSec && domeCamURL ?
                  <DomeCam
                    refreshIntervalSec={domeCamRefreshIntervalSec}
                    domeCamURL={domeCamURL}
                    offlineImageURL={domeCamOfflineURL}
                    onlineStatus={domeCamOnlineStatus}
                  /> : null
              }
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default TelescopeConditionSnapshot;
