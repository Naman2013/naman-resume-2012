import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';
import './telescope-details.scss';

import {
  bootstrapTelescopeDetails,
  setObservatory,
  setTelescope,
  updateTelescopeStatus,
  fetchAllTelescopeStatus,
} from '../../modules/telescope-details/actions';

import { resetSnapshotList } from '../../modules/starshare-camera/starshare-camera-actions';

import { fetchObjectContent } from '../../modules/community-content/community-object-content-actions';

import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import CommunityPerspectives from '../../components/common/community-perspectives/community-perspectives';
import CurrentSelectionHeader from '../../components/telescopes/current-selection-header/header';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import LiveFeed from '../../components/telescope-details/live-feed/LiveFeed';
import LiveMission from '../../components/telescope-details/live-mission/live-mission';
import LiveStream from '../../components/telescope-details/live-stream/live-stream';
import MoonlightWidget from '../../components/telescope-details/MoonlightWidget';
import Neoview from '../../components/telescope-details/neoview/neoview';
import PromoMessageBanner from '../../components/common/headers/promo-message-band';
import Spacer from '../../components/common/spacer';
import StarShareCamera from '../../components/telescope-details/star-share-camera/star-share-camera';
import SunsetCountdown from '../../components/telescope-details/SunsetCountdown';
import TelescopeAllSky from '../../components/telescope-details/telescope-all-sky/TelescopeAllSky';
import TelescopeDetailsTabs from '../../components/telescope-details/TelescopeDetailsTabs';
import TelescopeSelection from '../../components/telescopes/selection-widget/telescope-selection';
import UpcomingMissions from '../../components/telescope-details/UpcomingMissions/UpcomingMissions';

// TODO: for testing mission data
// import MISSIONS from '../../components/telescope-details/UpcomingMissions/testData';
import TEST_COMMUNITY_CONTENT from '../../content/get-object-content';
// =========================================================

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        bootstrapTelescopeDetails,
        setObservatory,
        setTelescope,
        updateTelescopeStatus,
        fetchAllTelescopeStatus,

        resetSnapshotList,
        fetchObjectContent,
      },
      dispatch,
    ),
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
    allObservatoryTelescopeStatus: telescopeDetails.allObservatoryTelescopeStatus,

    currentObservatory: telescopeDetails.currentObservatory,
    currentTelescope: telescopeDetails.currentTelescope,
    currentTelescopeOnlineStatus: telescopeDetails.currentTelescopeOnlineStatus,

    countdownList: telescopeDetails.allObservatoryTelescopeStatus.countdownList.countdownTeleList,

    displayCommunityContent: telescopeDetails.displayCommunityContent,

    isImageViewerClipped: telescopeDetails.isImageViewerClipped,

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
    countdownList: PropTypes.arrayOf(
      PropTypes.shape({
        telescopeId: PropTypes.string.isRequired,
        // TODO: finish validating fields from the API here...
      }),
    ),
    isImageViewerClipped: PropTypes.bool,
  };

  static defaultProps = {
    isImageViewerClipped: true,
  };

  constructor(props) {
    super(props);
    this.scaffoldObservatoryList();
  }

  state = {
    neoviewOpen: false,
    selectedTab: 0,
    missionPercentageRemaining: 0,
  };

  componentWillReceiveProps(nextProps) {
    const { allObservatoryTelescopeStatus } = nextProps;
    const { teleUniqueId } = nextProps.routeParams;
    if (allObservatoryTelescopeStatus && allObservatoryTelescopeStatus.statusExpires) {
      this.scaffoldRefreshInterval(allObservatoryTelescopeStatus.statusExpires);
    }

    if (teleUniqueId) {
      if (teleUniqueId !== this.props.routeParams.teleUniqueId) {
        this.props.actions.updateTelescopeStatus({ teleUniqueId });
      }
    }
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

      // fetch the observatories latest status
      this.props.actions.fetchAllTelescopeStatus({
        obsId: nextProps.params.obsUniqueId,
        teleUniqueId: nextProps.params.teleUniqueId,
        isRefresh: true,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTelescopeStatusTimeout);
  }

  fetchAllTelescopeStatus(obsUniqueId = 0) {
    const { observatoryList, params } = this.props;

    this.props.actions.fetchAllTelescopeStatus({
      obsId: observatoryList.find(
        observatory => observatory.obsUniqueId === (obsUniqueId || params.obsUniqueId),
      ).obsId,
      teleUniqueId: params.teleUniqueId,
    });
  }

  handleSelect = (index) => {
    this.setState({
      selectedTab: index,
    });
  };

  toggleNeoview = () => {
    this.setState(prevState => ({
      neoviewOpen: !prevState.neoviewOpen,
    }));
  };

  scaffoldObservatoryList() {
    const { obsUniqueId, teleUniqueId } = this.props.params;
    this.props.actions.bootstrapTelescopeDetails({
      obsUniqueId,
      teleUniqueId,
    });
  }

  refreshTelescopeStatusTimeout = null;

  workingRefreshTimestamp = 0;

  scaffoldRefreshInterval(expirationTimestamp = 0) {
    if (this.workingRefreshTimestamp !== expirationTimestamp) {
      this.workingRefreshTimestamp = expirationTimestamp;
      clearTimeout(this.refreshTelescopeStatusTimeout);

      // diff in milliseconds from now and the expires time...
      const convertedExpirestamp = expirationTimestamp * 1000;
      const nowStamp = moment.utc().valueOf();
      const refreshInterval = convertedExpirestamp - nowStamp;

      // validation of the refreshInterval to prevent bad timeout values
      if (refreshInterval <= 0) {
        return;
      }

      this.refreshTelescopeStatusTimeout = setTimeout(() => {
        const { observatoryList, params: { obsUniqueId, teleUniqueId } } = this.props;
        this.props.actions.fetchAllTelescopeStatus({
          obsId: observatoryList.find(observatory => observatory.obsUniqueId === obsUniqueId).obsId,
          teleUniqueId,
          isRefresh: true,
        });
      }, refreshInterval);
    }
  }

  render() {
    const { selectedTab, neoviewOpen } = this.state;
    const {
      fetchingObservatoryList,
      fetchingObservatoryStatus,

      currentObservatory,
      currentTelescope,
      currentTelescopeOnlineStatus,

      countdownList,

      displayCommunityContent,

      observatoryList,
      observatoryListTimestamp,

      params,

      activeTelescopeMission,

      communityContent,

      activeDetailsSSE,
      isImageViewerClipped,
    } = this.props;

    if (fetchingObservatoryList) {
      return null;
    }

    const { obsUniqueId, teleUniqueId } = params;
    const { obsId } = currentObservatory;
    const { teleInstrumentList, teleCanReserveMissions } = currentTelescope;
    const telescopeOnline =
      currentTelescopeOnlineStatus && currentTelescopeOnlineStatus.onlineStatus === 'online';
    const selectedInstrument = teleInstrumentList[selectedTab];
    const currentMissionCountdown = countdownList.find(
      countdown => countdown.teleUniqueId === teleUniqueId,
    );

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
              {teleCanReserveMissions ? (
                <Link
                  className="pull-right btn-primary"
                  to={`/reservations/reserve-by-telescope/telescope/${obsUniqueId}/${teleUniqueId}`}
                >
                  Reserve this telescope
                </Link>
              ) : null}
            </div>
          </div>

          {/* begin left column */}
          <div className="telescope-details clearfix">
            <div className="col-sm-8">
              <Tabs onSelect={this.handleSelect} selectedIndex={selectedTab}>
                <TabList>
                  {teleInstrumentList.map(instrument => (
                    <Tab key={instrument.instrUniqueId}>{instrument.instrTelescopeName}</Tab>
                  ))}
                </TabList>
                {teleInstrumentList.map(instrument => (
                  <TabPanel key={instrument.instrPort}>
                    <LiveFeed
                      fetchingOnlineStatus={fetchingObservatoryStatus}
                      obsAlert={currentObservatory.obsAlert}
                      onlineStatus={
                        currentTelescopeOnlineStatus && currentTelescopeOnlineStatus.onlineStatus
                      }
                      instrument={instrument}
                      offlineImageSource={instrument.instrOfflineImgURL}
                      activeMission={activeTelescopeMission.maskDataArray}
                      timestamp={activeTelescopeMission.timestamp}
                      activeNeoview={selectedInstrument.instrHasNeoView}
                      handleInfoClick={this.toggleNeoview}
                      isImageViewerClipped={isImageViewerClipped}
                    />

                    {/** load the neoview */
                    telescopeOnline && selectedInstrument.instrHasNeoView ? (
                      <Neoview
                        toggleNeoview={this.toggleNeoview}
                        neoviewOpen={neoviewOpen}
                        teleSystem={selectedInstrument.instrSystem}
                        showToggleOption={currentTelescope.teleOnlineStatus === 'online'}
                        percentageMissionTimeRemaining={100}
                      />
                    ) : null}

                    {telescopeOnline && instrument.instrStarShareCamera === true ? (
                      <StarShareCamera />
                    ) : null}
                  </TabPanel>
                ))}
              </Tabs>

              {activeTelescopeMission.missionAvailable ? (
                <LiveStream {...activeTelescopeMission} />
              ) : null}

              <Spacer height="50px" />

              {displayCommunityContent && telescopeOnline && activeDetailsSSE.astroObjectID > 0 ? (
                <div>
                  <PromoMessageBanner
                    title="Community Perspectives"
                    subtitle="Learn more about this object through the various lenses of science, culture, and spirituality."
                  />
                  <CommunityPerspectives
                    communityContent={communityContent}
                    sortType="randomized"
                  />
                </div>
              ) : null}

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

            {/** right side bar */}
            <div className="col-sm-4 telescope-details-sidebar">
              <GoogleAd
                adURL={'/5626790/Recommends'}
                adWidth={300}
                adHeight={250}
                targetDivID={'div-gpt-ad-1495111021281-0'}
              />

              {currentObservatory.showCountdown &&
                currentMissionCountdown && (
                  <SunsetCountdown
                    label={currentMissionCountdown.countdownLabel}
                    countdownTimestamp={currentMissionCountdown.countdownTimestamp}
                    onExpired={::this.fetchAllTelescopeStatus}
                  />
                )}

              <MoonlightWidget
                obsId={currentObservatory.obsId}
                widgetID={currentObservatory.MoonlightBarWidgetId}
              />

              {activeTelescopeMission.missionAvailable ||
              activeTelescopeMission.nextMissionAvailable ? (
                <div>
                  <LiveMission {...activeTelescopeMission} />

                  <TelescopeAllSky
                    obsId={currentObservatory.obsId}
                    AllskyWidgetId={currentObservatory.SkyChartWidgetId}
                    scheduledMissionId={activeTelescopeMission.scheduledMissionId}
                  />

                  <UpcomingMissions missions={activeTelescopeMission.upcomingMissionArray} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TelescopeDetails.defaultProps = {
  communityContent: [],
  countdownList: [],
};

export default TelescopeDetails;
