import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './telescope-details.scss';
import DEFAULT_FULL_MISSION_DATA from './default-full-mission-data';

import { bootstrapTelescopeDetails } from '../../modules/telescope-details/actions';

import {
  getObservatoryList,
  getCurrentObservatory,

  fetchObservatoryTelescopeStatus,
  fetchObservatoryWebcam,
  resetSnapshotList,
} from '../../modules/Telescope-Overview';

import { fetchObjectContent } from '../../modules/community-content/community-object-content-actions';

import determineImageLoader from '../../components/telescope-details/determine-image-loader';

import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import Spacer from '../../components/common/spacer';
import LiveStream from '../../components/telescope-details/live-stream/live-stream';
import LiveMission from '../../components/telescope-details/live-mission/live-mission';
import PromoMessageBanner from '../../components/common/headers/promo-message-band';
import CommunityPerspectives from '../../components/common/community-perspectives/community-perspectives';
import Neoview from '../../components/telescope-details/neoview/neoview';
import TelescopeOffline from '../../components/telescope-details/telescope-offline/telescope-offline';
import CurrentSelectionHeader from '../../components/telescopes/current-selection-header/header';
import TelescopeSelection from '../../components/telescopes/selection-widget/telescope-selection';

import TelescopeAllSky from '../../components/telescope-details/telescope-all-sky/TelescopeAllSky';
import TelescopeConditionSnapshot from '../../components/telescope-details/condition-snapshot/condition-snapshot';
import LiveWebcam from '../../components/telescope-details/live-webcam/live-webcam';
import StarShareCamera from '../../components/telescope-details/star-share-camera/star-share-camera';

/**
  * Getting the current telescope from the API response
  * @param {array} observatoryTelescopes - Array of all telescopes in the current observatory
  * @param {string} telescopeId - Id of the current telescope, which available in URL and/or props.params
  * @returns {Object} telescope - Current telescope object
  */
function getCurrentTelescope(observatoryTelescopes, telescopeId) {
  return observatoryTelescopes.find(telescope => telescope.teleUniqueId === telescopeId);
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      bootstrapTelescopeDetails,

      getObservatoryList,
      fetchObservatoryTelescopeStatus,
      fetchObservatoryWebcam,
      resetSnapshotList,
      fetchObjectContent,
    }, dispatch),
  };
}

// TODO: start peeling back the complexity of tracking down the telescope and observatory
function mapStateToProps({
  missions,
  telescopeOverview,
  activeTelescopeMissions,
  communityObjectContent,
}) {
  const { observatoryList, observatoryTelecopeStatus } = telescopeOverview;

  return {
    missions,
    observatoryList: observatoryList.observatoryList,
    observatoryTelecopeStatus,
    cardList: missions.cardList || [],
    activeTelescopeMissions,
    communityContent: communityObjectContent.communityContent.posts,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class TelescopeDetails extends Component {

  static propTypes = {
    params: PropTypes.shape({
      obsUniqueId: PropTypes.string.isRequired,
      teleUniqueId: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      bootstrapTelescopeDetails: PropTypes.func.isRequired,
      getObservatoryList: PropTypes.func.isRequired,
      resetSnapshotList: PropTypes.func.isRequired,
      fetchObservatoryWebcam: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    toggleNeoview: false,
    selectedTab: 0,
    missionPercentageRemaining: 0,
  };

  componentWillMount() {
    this.scaffoldObservatoryList();
    this.props.actions.resetSnapshotList();
  }

  componentWillUpdate(nextProps) {
    // TODO: refactor to use the params from the URL to determine when to rebootstrap the viewer
    // NOTE: that this component will receive new properties associated with mission data...

    const { selectedTab } = this.state;
    const { activeTelescopeMissions, observatoryList, params } = this.props;
    const { observatoryTelecopeStatus } = nextProps;
    const nextActiveTelescopeMissions = nextProps.activeTelescopeMissions;
    const { obsUniqueId, teleUniqueId } = params;
    const currentObservatory = getCurrentObservatory(observatoryList, obsUniqueId);
    const nextObservatory = getCurrentObservatory(observatoryList, nextProps.params.obsUniqueId);

    if (!currentObservatory) { return; }

    // check if we have a telescopeStatus
    // if we do, then scaffold the refresh timer
    if (observatoryTelecopeStatus) {
      const { statusExpires, statusTimestamp } = observatoryTelecopeStatus;
      const refreshTime = (statusExpires - statusTimestamp) * 1000;
      this.scaffoldRefreshTimer(refreshTime);
    }

    this.props.actions.fetchObservatoryWebcam(nextObservatory);

    // TODO: make sure that we are refreshing this list at the appropriate time!!!
    this.props.actions.resetSnapshotList();

    const currentTelescope = getCurrentTelescope(currentObservatory.obsTelescopes, teleUniqueId);
    const { teleInstrumentList } = currentTelescope;

    // reset the selected tab if it is outside of the bounds of available tabs
    if (selectedTab > teleInstrumentList.length - 1) {
      this.handleSelect(0);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshDetailsInterval);
    clearInterval(this.missionProgressInterval);
  }

  handleSelect = (index) => {
    this.setState({
      selectedTab: index,
    });
  };

  scaffoldObservatoryList() {
    const { obsUniqueId, teleUniqueId } = this.props.params;
    this.props.actions.bootstrapTelescopeDetails({
      obsUniqueId,
      teleUniqueId,
    });
  }

  refreshDetailsInterval = null;

  scaffoldRefreshTimer(increment = 6000) {
    clearInterval(this.refreshDetailsInterval);
    this.refreshDetailsInterval = setInterval(() => {
      this.scaffoldObservatoryList();
    }, increment);
  }

  render() {
    const { selectedTab } = this.state;
    const {
      observatoryList,
      params,
      activeTelescopeMissions,
      communityContent,
    } = this.props;

    const { obsUniqueId, teleUniqueId } = params;

    // TODO: Move this check into TelescopeSelection component
    if (observatoryList && observatoryList.length === 0) {
      return null;
    }

    const currentObservatory = getCurrentObservatory(observatoryList, obsUniqueId);

    // TODO: refactor how this page opperates so we can remove these checks
    if (!currentObservatory) {
      return null;
    }

    const { obsId } = currentObservatory;
    const currentTelescope = getCurrentTelescope(currentObservatory.obsTelescopes, teleUniqueId);
    const { teleInstrumentList, teleId, teleCanReserveMissions } = currentTelescope;

    // setup the current mission - setting defaults based on the original design of the API
    const currentMission = DEFAULT_FULL_MISSION_DATA;
    const currentTelescopeMissionData =
      activeTelescopeMissions.telescopes.find(telescope => telescope.telescopeId === teleId);

    if (currentTelescopeMissionData && currentTelescopeMissionData.activeMission.full.missionList) {
      Object.assign(currentMission, currentTelescopeMissionData.activeMission.full.missionList[0]);
    }

    const { missionAvailable } = currentMission;

    // TODO: refactor this patchwork to more appropriatly set default values for the selected
    // instrument.  Problem here is the index for the tab falls out of sync with the
    // array of available instruments and throws an error.
    if (selectedTab > teleInstrumentList.length - 1) {
      return null;
    }

    return (
      <div className="telescope-details-page-wrapper">

        <AnnouncementBanner obsId={obsId} />

        <TelescopeSelection
          observatoryList={observatoryList}
          params={params}
        />

        <div className="details-content-wrapper">

          <div className="telescope-details-header clearfix">
            <div className="col-md-10">
              <CurrentSelectionHeader
                telescopeIcon={currentObservatory.obsLogoURL}
                teleName={currentObservatory.obsName}
                teleSponsorLinkURL={currentTelescope.teleSponsorLinkURL}
                teleSponsorLogoURL={currentTelescope.teleSponsorLogoURL}
                instrTelescopeName={currentTelescope.teleName}
              />
            </div>

            <div className="col-md-2">
              {
                teleCanReserveMissions ?
                  <Link
                    className="pull-right btn-primary"
                    to={`/reservations/reserve-by-telescope/telescope/${obsUniqueId}/${teleUniqueId}`}
                  >
                    Reserve this telescope
                  </Link> : null
              }
            </div>
          </div>

          { /* begin left column */ }
          <div className="telescope-details clearfix">
            <div className="col-xs-8">
              <Tabs
                onSelect={this.handleSelect}
                selectedIndex={selectedTab}
              >
                <TabList>
                  {
                    teleInstrumentList.map(instrument => (
                      <Tab key={instrument.instrUniqueId}>{instrument.instrTelescopeName}</Tab>
                    ))
                  }
                </TabList>
                {
                  teleInstrumentList.map(instrument => (
                    <TabPanel key={instrument.instrPort}>
                      {
                        currentTelescope.teleOnlineStatus === 'online' ?
                        determineImageLoader(instrument) :
                        <TelescopeOffline imageSource={instrument.instrOfflineImgURL} />
                      }

                      {
                        currentTelescope.teleOnlineStatus === 'online' && currentTelescope.teleHasNeoView ?
                          <Neoview
                            port={currentTelescope.teleNeoPort}
                            teleSystem={currentTelescope.teleSystem}
                            showToggleOption={currentTelescope.teleOnlineStatus === 'online'}
                            percentageMissionTimeRemaining={100}
                          /> : null
                      }

                      {
                        currentTelescope.teleOnlineStatus === 'online' && instrument.instrStarShareCamera === true ?
                          <StarShareCamera /> : null
                      }
                    </TabPanel>
                  ))
                }
              </Tabs>

              {
                missionAvailable ?
                  <LiveStream
                    {...currentMission}
                  /> : null
              }

              <Spacer height="50px" />

              {
                (communityContent && communityContent.length > 0) ?
                  <div>
                    <PromoMessageBanner
                      title="Community Perspectives"
                      subtitle="Learn more about this object through the various lenses of science, culture, and spirituality."
                    />
                    <CommunityPerspectives
                      communityContent={communityContent}
                    />
                  </div> : null
              }

              <LiveWebcam />
            </div>

            <div className="col-md-4 telescope-details-sidebar">
              {
                currentMission.missionAvailable || currentMission.nextMissionAvailable ?
                  <div>
                    <LiveMission
                      {...currentMission}
                    />

                    <TelescopeAllSky
                      obsId={currentObservatory.obsId}
                      AllskyWidgetId={currentObservatory.SkyChartWidgetId}
                      scheduledMissionId={currentMission.scheduledMissionId}
                    />
                  </div>
                : null
              }

              {
                currentObservatory.obsId && currentObservatory.CurrentConditionsWidgetId ?
                  <TelescopeConditionSnapshot
                    obsId={currentObservatory.obsId}
                    CurrentConditionsWidgetId={currentObservatory.CurrentConditionsWidgetId}
                    DayNightBarWidgetId={currentObservatory.DayNightBarWidgetId}
                    DayNightMapWidgetId={currentObservatory.DayNightMapWidgetId}
                    AllskyWidgetId={currentObservatory.AllskyWidgetId}
                    DomecamWidgetId={currentObservatory.DomecamWidgetId}
                  /> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TelescopeDetails.defaultProps = {
  communityContent: [],
};

export default TelescopeDetails;
