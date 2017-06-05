import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './telescope-details.scss';
import newMissionData from './default-full-mission-data';

import {
  bootstrapTelescopeDetails,
  setObservatory,
  setTelescope,
  updateTelescopeStatus,
  fetchAllTelescopeStatus,
} from '../../modules/telescope-details/actions';

import {
  resetSnapshotList,
} from '../../modules/Telescope-Overview';

import { fetchObjectContent } from '../../modules/community-content/community-object-content-actions';

import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import Spacer from '../../components/common/spacer';
import LiveStream from '../../components/telescope-details/live-stream/live-stream';
import LiveMission from '../../components/telescope-details/live-mission/live-mission';
import PromoMessageBanner from '../../components/common/headers/promo-message-band';
import CommunityPerspectives from '../../components/common/community-perspectives/community-perspectives';
import LiveFeed from '../../components/telescope-details/live-feed/LiveFeed';
import Neoview from '../../components/telescope-details/neoview/neoview';
import CurrentSelectionHeader from '../../components/telescopes/current-selection-header/header';
import TelescopeSelection from '../../components/telescopes/selection-widget/telescope-selection';

import TelescopeAllSky from '../../components/telescope-details/telescope-all-sky/TelescopeAllSky';
import TelescopeConditionSnapshot from '../../components/telescope-details/condition-snapshot/condition-snapshot';
import LiveWebcam from '../../components/telescope-details/live-webcam/live-webcam';
import StarShareCamera from '../../components/telescope-details/star-share-camera/star-share-camera';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      bootstrapTelescopeDetails,
      setObservatory,
      setTelescope,
      updateTelescopeStatus,
      fetchAllTelescopeStatus,

      resetSnapshotList,
      fetchObjectContent,
    }, dispatch),
  };
}

function mapStateToProps({
  telescopeOverview,
  activeTelescopeMissions,
  communityObjectContent,
  telescopeDetails,
}) {
  const { observatoryList } = telescopeOverview;

  return {
    fetchingObservatoryList: telescopeDetails.fetchingObservatoryList,
    fetchingObservatoryStatus: telescopeDetails.fetchingObservatoryStatus,

    currentObservatory: telescopeDetails.currentObservatory,
    currentTelescope: telescopeDetails.currentTelescope,
    currentTelescopeOnlineStatus: telescopeDetails.currentTelescopeOnlineStatus,

    displayCommunityContent: telescopeDetails.displayCommunityContent,

    observatoryList: observatoryList.observatoryList,
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
      resetSnapshotList: PropTypes.func.isRequired,
      setObservatory: PropTypes.func.isRequired,
      setTelescope: PropTypes.func.isRequired,
      updateTelescopeStatus: PropTypes.func.isRequired,
      fetchAllTelescopeStatus: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.scaffoldObservatoryList();
  }

  state = {
    toggleNeoview: false,
    selectedTab: 0,
    missionPercentageRemaining: 0,
  };

  componentDidMount() {
    this.scaffoldRefreshInterval();
  }

  componentWillUpdate(nextProps) {
    // NOTE: that this component will receive new properties associated with mission data...
    const isNewObservatory = this.props.params.obsUniqueId !== nextProps.params.obsUniqueId;
    const isNewTelescope = this.props.params.teleUniqueId !== nextProps.params.teleUniqueId;
    const { observatoryList } = this.props;

    if (isNewObservatory) {
      // set the selected observatory
      this.props.actions.setObservatory({
        obsUniqueId: nextProps.params.obsUniqueId,
        teleUniqueId: nextProps.params.teleUniqueId,
      });

      // fetch the observatories latest status
      this.props.actions.fetchAllTelescopeStatus({
        obsId: observatoryList.find(observatory => observatory.obsUniqueId === nextProps.params.obsUniqueId).obsId,
        teleUniqueId: nextProps.params.teleUniqueId,
      });

      // reset the timer to refetch the telescope status since we are calling it now anyhow
      this.scaffoldRefreshInterval();
    }

    if (isNewTelescope) {
      // whenever we change the telescope, default the selected tab to 0
      this.handleSelect(0);

      // set the selected telescope
      this.props.actions.setTelescope({
        obsUniqueId: nextProps.params.obsUniqueId,
        teleUniqueId: nextProps.params.teleUniqueId,
      });

      // if the observatory is the same, don't bother because on update
      // of the observatory status we will set the telescope status
      // this will prevent a potential race condition
      if (!isNewObservatory) {
        this.props.actions.updateTelescopeStatus({ teleUniqueId: nextProps.params.teleUniqueId });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshTelescopeStatusInterval);
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

  refreshTelescopeStatusInterval = null;

  // once per 10 minutes, fetch the latest telescope status
  scaffoldRefreshInterval(increment = 600000) {
    clearInterval(this.refreshTelescopeStatusInterval);
    this.refreshTelescopeStatusInterval = setInterval(() => {
      const { observatoryList, params: { obsUniqueId, teleUniqueId } } = this.props;
      this.props.actions.fetchAllTelescopeStatus({
        obsId: observatoryList.find(observatory => observatory.obsUniqueId === obsUniqueId).obsId,
        teleUniqueId,
        isRefresh: true,
      });
    }, increment);
  }

  render() {
    /**
      TODO: track down the observatory status and tie that into the display of the
      status of the telescope

      TODO: based on the type of community content we display the component
      so we need to discover the content needed and tie that into the field
      */
    const { selectedTab } = this.state;
    const {
      fetchingObservatoryList,
      fetchingObservatoryStatus,

      currentObservatory,
      currentTelescope,
      currentTelescopeOnlineStatus,

      displayCommunityContent,

      observatoryList,
      params,
      activeTelescopeMissions,
      communityContent,
    } = this.props;

    if (fetchingObservatoryList) {
      return null;
    }

    const { obsUniqueId, teleUniqueId } = params;
    const { obsId } = currentObservatory;
    const { teleInstrumentList, teleId, teleCanReserveMissions } = currentTelescope;

    // TODO: write new actions that will store the current mission information and get this out of the view
    // setup the current mission - setting defaults based on the original design of the API
    const currentMission = newMissionData();
    const currentTelescopeMissionData =
      activeTelescopeMissions.telescopes.find(telescope => telescope.telescopeId === teleId);

    if (currentTelescopeMissionData && currentTelescopeMissionData.activeMission.full.missionList) {
      Object.assign(
        currentMission,
        currentTelescopeMissionData.activeMission.full.missionList[0]);
    }

    const { missionAvailable } = currentMission;
    // ---- end the mission related work...
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

                      <LiveFeed
                        fetchingOnlineStatus={fetchingObservatoryStatus}
                        onlineStatus={
                          currentTelescopeOnlineStatus && currentTelescopeOnlineStatus.onlineStatus
                        }
                        instrument={instrument}
                        offlineImageSource={instrument.instrOfflineImgURL}
                      />

                      {
                        /** load the neoview */
                        (currentTelescopeOnlineStatus && currentTelescopeOnlineStatus.onlineStatus === 'online') && currentTelescope.teleHasNeoView ?
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
                displayCommunityContent ?
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

              <LiveWebcam
                obsId={obsId}
                facilityWebcamWidgetId={currentObservatory.FacilityWebcamWidgetId}
              />

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
