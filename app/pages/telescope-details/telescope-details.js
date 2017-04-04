import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './telescope-details.scss';
import DEFAULT_FULL_MISSION_DATA from './default-full-mission-data';

import {
  getObservatoryList,
  getCurrentObservatory,
  fetchObservatoryTelescopeStatus,
  fetchObservatoryWebcam,
  resetSnapshotList } from '../../modules/Telescope-Overview';

import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import TelescopeImageViewer from '../../components/common/telescope-image-viewer/telescope-image-viewer';
import VideoImageLoader from '../../components/common/telescope-image-loader/video-image-loader';
import Spacer from '../../components/common/spacer';
import LiveStream from '../../components/telescope-details/live-stream/live-stream';
import LiveMission from '../../components/telescope-details/live-mission/live-mission';
import PromoMessageBanner from '../../components/common/headers/promo-message-band';
import CommunityPerspectives from '../../components/common/community-perspectives/community-perspectives';
import Neoview from '../../components/telescope-details/neoview/neoview';
import TelescopeOffline from '../../components/telescope-details/telescope-offline/telescope-offline';
import CurrentSelectionHeader from '../../components/telescopes/current-selection-header/header';
import TelescopeSelection from '../../components/telescopes/selection-widget/telescope-selection';

// TODO: need api's to implement these widgets...
import TelescopeAllSky from '../../components/telescope-details/telescope-all-sky/TelescopeAllSky';
import TelescopeConditionSnapshot from '../../components/telescope-details/condition-snapshot/condition-snapshot';
import LiveWebcam from '../../components/telescope-details/live-webcam/live-webcam';
import WeatherConditions from '../../components/telescope-details/weather-conditions/weather-conditions';
import TelescopeRecommendsWidget from '../../components/telescope-details/recommends-widget/recommends-widget';
import TelescopeGalleryWidget from '../../components/telescope-details/gallery-widget/gallery-widget';
import StarShareCamera from '../../components/telescope-details/star-share-camera/star-share-camera';

const { element, func, object } = PropTypes;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getObservatoryList,
      fetchObservatoryTelescopeStatus,
      fetchObservatoryWebcam,
      resetSnapshotList,
    }, dispatch),
  };
}

function mapStateToProps({ missions, telescopeOverview, activeTelescopeMissions, communityObjectContent }) {
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

  constructor(props) {
    super(props);

    this.state = {
      toggleNeoview: false,
      selectedTab: 0,
    };
  }

  componentWillMount() {
    const { obsUniqueId } = this.props.params;
    this.props.actions.getObservatoryList(
      obsUniqueId,
      'details',
    );
    this.props.actions.resetSnapshotList();
  }

  componentWillUpdate(nextProps) {
    const { selectedTab } = this.state;
    const { observatoryList, observatoryTelecopeStatus, params } = this.props;
    const { obsUniqueId, teleUniqueId } = params;
    const currentObservatory = getCurrentObservatory(observatoryList, obsUniqueId);
    const nextObservatory = getCurrentObservatory(observatoryList, nextProps.params.obsUniqueId);

    if (!currentObservatory) { return; }

    this.props.actions.fetchObservatoryWebcam(nextObservatory);

    const currentTelescope = this.getCurrentTelescope(currentObservatory.obsTelescopes, teleUniqueId);
    const { teleInstrumentList } = currentTelescope;

    if (selectedTab > teleInstrumentList.length - 1) {
      this.handleSelect(0);
    }
  }

  handleSelect(index) {
    this.setState({
      selectedTab: index,
    });
  }

  /**
    * Getting the current telescope from the API response
    * @param {array} observatoryTelescopes - Array of all telescopes in the current observatory
    * @param {string} telescopeId - Id of the current telescope, which available in URL and/or props.params
    * @returns {Object} telescope - Current telescope object
    * TODO: migrate this into the telescope details actions...
    */
  getCurrentTelescope(observatoryTelescopes, telescopeId) {
    return observatoryTelescopes.find(telescope => telescope.teleUniqueId === telescopeId);
  }

  determineImageLoaderType(currentInstrument) {
    const {
      instrImageSourceType,
      instrPort,
      instrSystem,
      instrDomeId,
      instrObsId,
      instrTelescopeId } = currentInstrument;

    if (instrImageSourceType === 'SSE') {
      return (
        <TelescopeImageViewer
          telePort={currentInstrument.instrPort}
          teleSystem={currentInstrument.instrSystem}
          teleId={currentInstrument.instrTelescopeId}
          teleFade={currentInstrument.instrFade}
        />
      );
    } else if (instrImageSourceType === 'video') {
      const {
        instrStreamCode,
        instrStreamURL,
        instrStreamThumbnailVideoWidth,
        instrStreamThumbnailVideoHeight,
        instrStreamThumbnailQuality } = currentInstrument;

      return (
        <VideoImageLoader
          teleStreamCode={instrStreamCode}
          teleStreamURL={instrStreamURL}
          teleStreamThumbnailVideoWidth="810"
          teleStreamThumbnailVideoHeight="600"
          teleStreamThumbnailQuality={instrStreamThumbnailQuality}
        />
      );
    }

    return null;
  }

  render() {
    const { selectedTab } = this.state;
    const {
      observatoryList,
      observatoryTelecopeStatus,
      params,
      activeTelescopeMissions,
      communityContent,
    } = this.props;
    const { obsUniqueId, teleUniqueId } = params;

    // TODO: Move this check into TelescopeSelection component
    if (observatoryList.length === 0) {
      return null;
    }

    const currentObservatory = getCurrentObservatory(observatoryList, obsUniqueId);
    const { obsId } = currentObservatory;
    const currentTelescope = this.getCurrentTelescope(currentObservatory.obsTelescopes, teleUniqueId);
    const { teleInstrumentList, teleId } = currentTelescope;

    // setup the current mission - setting defaults based on the original design of the API
    const currentMission = DEFAULT_FULL_MISSION_DATA;
    const currentTelescopeMissionData = activeTelescopeMissions.telescopes.find(telescope => telescope.telescopeId === teleId);

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

    const currentInstrument = teleInstrumentList[selectedTab];

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
                telescopeIcon={currentTelescope.teleLogoURL}
                teleName={currentTelescope.teleName}
                teleSponsorLinkURL={currentTelescope.teleSponsorLinkURL}
                teleSponsorLogoURL={currentTelescope.teleSponsorLogoURL}
                instrTelescopeName={currentInstrument.instrTelescopeName}
              />
            </div>

            <div className="col-md-2">
              <Link
                className="pull-right btn-primary"
                to={`/reservations/reserve-by-telescope/telescope/${obsUniqueId}/${teleUniqueId}`}
              >
                Reserve this telescope
              </Link>
            </div>
          </div>

          { /* begin left column */ }
          <div className="telescope-details clearfix">
            <div className="col-xs-8">
              <Tabs
                onSelect={this.handleSelect.bind(this)}
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
                        currentTelescope.teleOnlineStatus !== 'offline' ?
                        this.determineImageLoaderType(instrument) :
                        <TelescopeOffline imageSource={instrument.instrOfflineImgURL} />
                      }

                      {
                        currentTelescope.teleOnlineStatus === 'online' && currentTelescope.teleHasNeoView ?
                          <Neoview
                            port={currentTelescope.teleNeoPort}
                            teleSystem={currentTelescope.teleSystem}
                            showToggleOption={currentTelescope.teleOnlineStatus === 'online'}
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
                communityContent.length > 0 ?
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

              {
                /**
                coming soon...

                <WeatherConditions
                  tabs={[
                    { title: 'Conditions', src: 'assets/images/graphics/weather-placeholder.jpg' },
                    { title: 'Dust', src: 'assets/images/graphics/weather-placeholder-2.jpeg' },
                    { title: 'Satellite Cloud', src: 'assets/images/graphics/weather-placeholder-3.jpeg' },
                    { title: 'Wind', src: 'assets/images/graphics/weather-placeholder-4.jpeg' },
                    { title: 'Sky Brightness', src: 'assets/images/graphics/weather-placeholder-5.jpeg' },
                    { title: 'Historic Weather', src: 'assets/images/graphics/weather-placeholder-6.jpeg' },
                  ]}
                />
                */
              }
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
                      AllskyWidgetId={currentObservatory.AllskyWidgetId}
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

              {
                /**
                  coming soon...
                  <Spacer height="100px" />
                  <Spacer height="50px" />

                  <TelescopeRecommendsWidget />
                  <TelescopeGalleryWidget />
                */
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
