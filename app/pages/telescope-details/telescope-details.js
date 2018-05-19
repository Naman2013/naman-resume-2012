import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import first from 'lodash/first';
import some from 'lodash/some';

import {
  bootstrapTelescopeDetails,
  setObservatory,
  setTelescope,
  updateTelescopeStatus,
  fetchAllTelescopeStatus,
} from 'modules/telescope-details/actions';

import { fetchObjectDataAction, resetObjectData } from 'modules/object-details/actions';

import { resetSnapshotList } from 'modules/starshare-camera/starshare-camera-actions';
import { fetchObjectContent } from 'modules/community-content/community-object-content-actions';

import AnnouncementBanner from 'components/common/announcement-banner/announcement-banner';
import CommunityPerspectives from 'components/common/community-perspectives/community-perspectives';
import CurrentSelectionHeader from 'components/telescopes/current-selection-header/header';
import GoogleAd from 'components/common/google-ads/GoogleAd';
import LiveFeed from 'components/telescope-details/live-feed-v3';
import LiveMission from 'components/telescope-details/live-mission/live-mission';
import MoonlightWidget from 'components/telescope-details/MoonlightWidget';
import SeeingConditionsWidget from 'components/telescope-details/SeeingConditionsWidget';
import Neoview from 'components/telescope-details/neoview/neoview';
import PromoMessageBanner from 'components/common/headers/promo-message-band';
import Spacer from 'components/common/spacer';
import StarShareCamera from 'components/telescope-details/star-share-camera/star-share-camera';
import SunsetCountdown from 'components/telescope-details/SunsetCountdown';
import TelescopeAllSky from 'components/telescope-details/telescope-all-sky/TelescopeAllSky';
import TelescopeDetailsTabs from 'components/telescope-details/TelescopeDetailsTabs';
import TelescopeSelection from 'components/telescopes/selection-widget/telescope-selection';
import MissionAudio from 'components/telescope-details/MissionAudio';

import InstrumentNavigation from 'components/telescope-details/InstrumentNavigation';
import TelescopeImageViewerController from 'components/telescope-details/TelescopeImageViewerController';

import './telescope-details.scss';

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
        fetchObjectDataAction,
        resetObjectData,
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
  objectDetails,
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
    objectDetails: objectDetails.objectData,
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
      fetchObjectDataAction: PropTypes.func.isRequired,
      resetObjectData: PropTypes.func.isRequired,
    }),
    countdownList: PropTypes.arrayOf(PropTypes.shape({
      telescopeId: PropTypes.string.isRequired,
      // TODO: finish validating fields from the API here...
    })),
    objectDetails: PropTypes.shape({
      objectAudioURL: PropTypes.string,
    }),
    isImageViewerClipped: PropTypes.bool,
  };

  static defaultProps = {
    isImageViewerClipped: true,
    objectDetails: {
      objectAudioURL: '',
    },
  };

  constructor(props) {
    super(props);
    this.scaffoldObservatoryList();
  }

  state = {
    neoviewOpen: false,
    activeInstrumentID: null,
  };

  componentWillReceiveProps(nextProps) {
    const {
      allObservatoryTelescopeStatus,
      params: { obsUniqueId, teleUniqueId },
      activeDetailsSSE: { astroObjectID },
    } = nextProps;

    const { neoviewOpen, activeInstrumentID } = this.state;
    const firstAvailableInstrument = first(nextProps.currentTelescope.teleInstrumentList);
    const isTelescopeUpdate = teleUniqueId !== this.props.params.teleUniqueId;
    const isObservatoryUpdate = obsUniqueId !== this.props.params.obsUniqueId;

    if (allObservatoryTelescopeStatus && allObservatoryTelescopeStatus.statusExpires) {
      this.scaffoldRefreshInterval(allObservatoryTelescopeStatus.statusExpires);
    }

    if (teleUniqueId) {
      if (isTelescopeUpdate) {
        this.props.actions.updateTelescopeStatus({ teleUniqueId });
      }
    }

    if (firstAvailableInstrument
        && !some(nextProps.currentTelescope.teleInstrumentList, ['instrUniqueId', activeInstrumentID])) {
      this.setState({
        activeInstrumentID: firstAvailableInstrument.instrUniqueId,
      });
    }

    if (isObservatoryUpdate || isTelescopeUpdate) {
      if (neoviewOpen) {
        this.toggleNeoview();
      }
    }

    if (astroObjectID && this.props.activeDetailsSSE.astroObjectID !== astroObjectID) {
      this.props.actions.fetchObjectDataAction(astroObjectID);
    }

    if (this.props.activeDetailsSSE.astroObjectID > 0 && astroObjectID === 0) {
      this.props.actions.resetObjectData();
    }

    if (this.props.currentObservatory) {
      const isNewCurrentObservatory =
        this.props.currentObservatory.obsId !== nextProps.currentObservatory.obsId;

      if (isNewCurrentObservatory) {
        this.props.actions.fetchAllTelescopeStatus({
          obsId: nextProps.currentObservatory.obsId,
          teleUniqueId: nextProps.params.teleUniqueId,
          isRefresh: true,
        });
      }
    }

    if (isObservatoryUpdate) {
      // set the selected observatory
      this.props.actions.setObservatory({
        obsUniqueId: nextProps.params.obsUniqueId,
        teleUniqueId: nextProps.params.teleUniqueId,
      });

      // reset the timer to refetch the telescope status since we are calling it now anyhow
      this.scaffoldRefreshInterval();
    }

    if (isTelescopeUpdate) {
      // set the selected telescope
      this.props.actions.setTelescope({
        obsUniqueId: nextProps.params.obsUniqueId,
        teleUniqueId: nextProps.params.teleUniqueId,
      });
    }

    if (isObservatoryUpdate || isTelescopeUpdate) {
      this.setState({
        activeInstrumentID: firstAvailableInstrument.instrUniqueId,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTelescopeStatusTimeout);
  }

  fetchAllTelescopeStatus(obsUniqueId = 0) {
    const { observatoryList, params } = this.props;

    this.props.actions.fetchAllTelescopeStatus({
      obsId: observatoryList.find(observatory => observatory.obsUniqueId === (obsUniqueId || params.obsUniqueId)).obsId,
      teleUniqueId: params.teleUniqueId,
    });
  }

  toggleNeoview = () => {
    this.setState(prevState => ({
      neoviewOpen: !prevState.neoviewOpen,
    }));
  };

  scaffoldObservatoryList() {
    const {
      params: { obsUniqueId, teleUniqueId },
      activeDetailsSSE: { astroObjectID },
      currentTelescope,
    } = this.props;

    this.props.actions.bootstrapTelescopeDetails({
      obsUniqueId,
      teleUniqueId,
    });

    if (astroObjectID) {
      this.props.actions.fetchObjectDataAction(astroObjectID);
    } else {
      this.props.actions.resetObjectData();
    }
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

  handleInstrumentNavigationClick = (instrumentID) => {
    this.setState(() => ({ activeInstrumentID: instrumentID }));
  };

  render() {
    const { neoviewOpen, activeInstrumentID } = this.state;

    const {
      fetchingObservatoryList,
      fetchingObservatoryStatus,
      currentObservatory,
      currentTelescope,
      currentTelescopeOnlineStatus,
      countdownList,
      displayCommunityContent,
      observatoryList,
      params,
      activeTelescopeMission,
      communityContent,
      activeDetailsSSE,
      isImageViewerClipped,
      objectDetails,
    } = this.props;

    if (fetchingObservatoryList) {
      return null;
    }

    const { obsUniqueId, teleUniqueId } = params;
    const { obsId } = currentObservatory;
    const {
      teleInstrumentList,
      teleCanReserveMissions,
    } = currentTelescope;

    const telescopeOnline =
      currentTelescopeOnlineStatus && currentTelescopeOnlineStatus.onlineStatus === 'online';

    const currentMissionCountdown = countdownList
      .find(countdown => countdown.teleUniqueId === teleUniqueId);

    const { objectAudioURL } = objectDetails;
    const isSubjectMatterAnObject = activeDetailsSSE.astroObjectID > 0;
    const audioEnabled = !!objectAudioURL;
    const isTelescopeOnline = currentTelescopeOnlineStatus && (currentTelescopeOnlineStatus.onlineStatus === 'online');

    const activeInstrument = first(teleInstrumentList
      .filter(instrument => instrument.instrUniqueId === activeInstrumentID));

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
                  Schedule this Telescope
                </Link>
              ) : null}
            </div>
          </div>


          {/* begin left column */}
          <div className="telescope-details clearfix">
            <div className="col-sm-8">

              <InstrumentNavigation
                instruments={teleInstrumentList}
                activeInstrumentID={activeInstrumentID}
                handleInstrumentClick={this.handleInstrumentNavigationClick}
              />

              <TelescopeImageViewerController
                activeInstrumentID={activeInstrumentID}
                render={({ viewportHeight }) => (
                  <LiveFeed
                    viewportHeight={viewportHeight}
                    fetchingOnlineStatus={fetchingObservatoryStatus}
                    obsAlert={currentObservatory.obsAlert}
                    onlineStatus={
                      currentTelescopeOnlineStatus && currentTelescopeOnlineStatus.onlineStatus
                    }
                    instrument={activeInstrument}
                    offlineImageSource={activeInstrument.instrOfflineImgURL}
                    activeMission={activeTelescopeMission.maskDataArray}
                    timestamp={activeTelescopeMission.timestamp}
                    missionStart={activeTelescopeMission.missionStart}
                    missionEnd={activeTelescopeMission.expires}
                    activeNeoview={activeInstrument.instrHasNeoView}
                    handleInfoClick={this.toggleNeoview}
                    isImageViewerClipped={isImageViewerClipped}
                  />
                )}
              />


              {/** load the neoview */
                telescopeOnline && activeInstrument.instrHasNeoView ? (
                  <Neoview
                    toggleNeoview={this.toggleNeoview}
                    neoviewOpen={neoviewOpen}
                    teleSystem={activeInstrument.instrSystem}
                    showToggleOption={currentTelescope.teleOnlineStatus === 'online'}
                    percentageMissionTimeRemaining={100}
                  />
                ) : null}

              {telescopeOnline && activeInstrument.instrStarShareCamera === true ? (
                <StarShareCamera />
              ) : null}


              <Spacer height="50px" />

              {displayCommunityContent && telescopeOnline && activeDetailsSSE.astroObjectID > 0 ? (
                <div>
                  <PromoMessageBanner
                    title="Illuminations"
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
                DayNightBarPanelWidgetId={currentObservatory.DayNightBarPanelWidgetId}
                DayNightMapWidgetId={currentObservatory.DayNightMapWidgetId}
                AllskyWidgetId={currentObservatory.AllskyWidgetId}
                AllskyTimelapseWidgetId={currentObservatory.AllskyTimelapseWidgetId}
                DomecamWidgetId={currentObservatory.DomecamWidgetId}
                DomecamTimelapseWidgetId={currentObservatory.DomecamTimelapseWidgetId}
                FacilityWebcamWidgetId={currentObservatory.FacilityWebcamWidgetId}
                MiniWeatherPanelWidgetId={currentObservatory.MiniWeatherPanelWidgetId}
                SatelliteWidgetId={currentObservatory.SatelliteWidgetId}
                WeatherConditionsWidgetId={currentObservatory.WeatherConditionsWidgetId}
                MissionControlStatusWidgetId={currentObservatory.MissionControlStatusWidgetId}
              />
            </div>

            {/** begin right column */}
            <div className="col-sm-4 telescope-details-sidebar">
              {currentObservatory.showCountdown &&
                currentMissionCountdown && currentMissionCountdown.showCountdown && (
                  <SunsetCountdown
                    label={currentMissionCountdown.countdownLabel}
                    countdownTimestamp={currentMissionCountdown.countdownTimestamp}
                    onExpired={::this.fetchAllTelescopeStatus}
                  />
                )}

              {
                activeTelescopeMission.missionAvailable ||
                  activeTelescopeMission.nextMissionAvailable ? (
                    <div>
                      <LiveMission {...activeTelescopeMission} />
                    </div>
                  ) : null
              }

              {
                isTelescopeOnline &&
                  <MissionAudio
                    missionAudioURL={objectAudioURL}
                    audioEnabled={isSubjectMatterAnObject && audioEnabled}
                  />
              }

              {/*
                teleHasMissions &&
                  <UpcomingMissions obsId={obsId} domeId={domeId} />
              */}

              {
                activeTelescopeMission.missionAvailable ||
                  activeTelescopeMission.nextMissionAvailable ? (
                    <div>
                      <TelescopeAllSky
                        obsId={currentObservatory.obsId}
                        AllskyWidgetId={currentObservatory.SkyChartWidgetId}
                        scheduledMissionId={activeTelescopeMission.scheduledMissionId}
                      />
                    </div>
                  ) : null
              }

              {
                activeTelescopeMission.missionAvailable ||
                  activeTelescopeMission.nextMissionAvailable ? (
                    <div>
                      <SeeingConditionsWidget
                        obsId={currentObservatory.obsId}
                        widgetID={currentObservatory.SeeingConditionsWidgetId}
                      />
                    </div>
                  ) : null
              }

              <MoonlightWidget
                obsId={currentObservatory.obsId}
                widgetID={currentObservatory.MoonlightBarWidgetId}
              />

              <GoogleAd
                adURL="/5626790/Recommends"
                adWidth={300}
                adHeight={250}
                targetDivID="div-gpt-ad-1495111021281-0"
              />
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
