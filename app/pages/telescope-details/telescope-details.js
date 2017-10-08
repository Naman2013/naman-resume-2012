import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './telescope-details.scss';

import {
  bootstrapTelescopeDetails,
  setObservatory,
  setTelescope,
  updateTelescopeStatus,
  fetchAllTelescopeStatus,
} from '../../modules/telescope-details/actions';

import {
  resetSnapshotList,
} from '../../modules/starshare-camera/starshare-camera-actions';

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

import TelescopeDetailsTabs from '../../components/telescope-details/TelescopeDetailsTabs';

import TelescopeAllSky from '../../components/telescope-details/telescope-all-sky/TelescopeAllSky';
import UpcomingMissions from '../../components/telescope-details/UpcomingMissions/UpcomingMissions';
import StarShareCamera from '../../components/telescope-details/star-share-camera/star-share-camera';

import SunsetCountdown from '../../components/telescope-details/SunsetCountdown';
import MoonlightWidget from '../../components/telescope-details/MoonlightWidget';

// TODO: remove this once we finish implementing and testing
import MISSIONS from '../../components/telescope-details/UpcomingMissions/testData';
// =========================================================

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
  communityObjectContent,
  telescopeDetails,
  activeTelescopeMissions,
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
    observatoryListTimestamp: observatoryList.observatoryListTimestamp,

    activeTelescopeMission: activeTelescopeMissions.activeTelescopeMission,
    communityContent: communityObjectContent.communityContent.posts,

    activeDetailsSSE: telescopeDetails.activeSSE,
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
      observatoryListTimestamp,

      params,

      activeTelescopeMission,

      communityContent,

      activeDetailsSSE,
    } = this.props;

    if (fetchingObservatoryList) {
      return null;
    }

    const { obsUniqueId, teleUniqueId } = params;
    const { obsId } = currentObservatory;
    const { teleInstrumentList, teleCanReserveMissions } = currentTelescope;
    const telescopeOnline = currentTelescopeOnlineStatus && currentTelescopeOnlineStatus.onlineStatus === 'online';
    const selectedInstrument = teleInstrumentList[selectedTab];

    return (
      <div className="telescope-details-page-wrapper">

        <AnnouncementBanner obsId={obsId} />

        <TelescopeSelection
          rootRoute="/telescope-details"
          observatoryList={observatoryList}
          params={params}
        />

        <div className="details-content-wrapper">

          <div className="telescope-details-header clearfix">
            <div className="col-sm-8 col-md-10">
              <CurrentSelectionHeader
                telescopeIcon={currentObservatory.obsLogoURL}
                teleName={currentObservatory.obsName}
                teleSponsorLinkURL={currentTelescope.teleSponsorLinkURL}
                teleSponsorLogoURL={currentTelescope.teleSponsorLogoURL}
                instrTelescopeName={currentTelescope.teleName}
              />
            </div>

            <div className="col-sm-4 col-md-2">
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
            <div className="col-sm-8">
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
                        obsAlert={currentObservatory.obsAlert}
                        onlineStatus={
                          currentTelescopeOnlineStatus && currentTelescopeOnlineStatus.onlineStatus
                        }
                        instrument={instrument}
                        offlineImageSource={instrument.instrOfflineImgURL}
                      />

                      {
                        /** load the neoview */
                        (telescopeOnline && selectedInstrument.instrHasNeoView) ?
                          <Neoview
                            teleSystem={selectedInstrument.instrSystem}
                            showToggleOption={currentTelescope.teleOnlineStatus === 'online'}
                            percentageMissionTimeRemaining={100}
                          /> : null
                      }

                      {
                        telescopeOnline && instrument.instrStarShareCamera === true ?
                          <StarShareCamera /> : null
                      }
                    </TabPanel>
                  ))
                }
              </Tabs>

              {
                activeTelescopeMission.missionAvailable ?
                  <LiveStream
                    {...activeTelescopeMission}
                  /> : null
              }

              <Spacer height="50px" />

              {
                (displayCommunityContent && telescopeOnline && activeDetailsSSE.astroObjectID > 0) ?
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

              <TelescopeDetailsTabs
                obsId={currentObservatory.obsId}
                CurrentConditionsWidgetId={currentObservatory.CurrentConditionsWidgetId}
                DayNightBarWidgetId={currentObservatory.DayNightBarWidgetId}
                DayNightMapWidgetId={currentObservatory.DayNightMapWidgetId}
                AllskyWidgetId={currentObservatory.AllskyWidgetId}
                DomecamWidgetId={currentObservatory.DomecamWidgetId}
                facilityWebcamWidgetId={currentObservatory.FacilityWebcamWidgetId}
              />

            </div>

            { /** right side bar */ }
            <div className="col-sm-4 telescope-details-sidebar">
              {
                currentObservatory.showCountdown &&
                  <SunsetCountdown
                    label={currentObservatory.countdownLabel}
                    countdownTimestamp={currentObservatory.countdownTimestamp}
                  />
              }

              <MoonlightWidget
                obsId={currentObservatory.obsId}
                widgetID={currentObservatory.MoonlightBarWidgetId}
              />

              {
                activeTelescopeMission.missionAvailable || activeTelescopeMission.nextMissionAvailable ?
                  <div>
                    <LiveMission
                      {...activeTelescopeMission}
                    />

                    <TelescopeAllSky
                      obsId={currentObservatory.obsId}
                      AllskyWidgetId={currentObservatory.SkyChartWidgetId}
                      scheduledMissionId={activeTelescopeMission.scheduledMissionId}
                    />

                    <UpcomingMissions missions={activeTelescopeMission.upcomingMissionArray} />
                  </div>
                : null
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
