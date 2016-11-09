import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../../modules/User';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './telescope-details.scss';
import exampleUser from '../../example-api-data/example-user'


import {
  getObservatoryList,
  getCurrentObservatory,
  fetchObservatoryTelescopeStatus} from '../../modules/Telescope-Overview';

import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import TelescopeImageViewer from '../../components/common/telescope-image-viewer/telescope-image-viewer';
import VideoImageLoader from '../../components/common/telescope-image-loader/video-image-loader';
import Spacer from '../../components/common/spacer';
import LiveStream from '../../components/telescope-details/live-stream/live-stream';
import LiveMission from '../../components/telescope-details/live-mission/live-mission';
import TelescopeWhereSky from '../../components/telescope-details/where-sky/where-sky';
import TelescopeConditionSnapshot from '../../components/telescope-details/condition-snapshot/condition-snapshot';
import PromoMessageBanner from '../../components/common/headers/promo-message-band';
import CommunityPerspectives from '../../components/common/community-perspectives/community-perspectives';
import LiveWebcam from '../../components/telescope-details/live-webcam/live-webcam';
import WeatherConditions from '../../components/telescope-details/weather-conditions/weather-conditions';
import TelescopeRecommendsWidget from '../../components/telescope-details/recommends-widget/recommends-widget';
import TelescopeGalleryWidget from '../../components/telescope-details/gallery-widget/gallery-widget';
import Neoview from '../../components/telescope-details/neoview/neoview.js';
import TelescopeOffline from '../../components/telescope-details/telescope-offline/telescope-offline';
import CurrentSelectionHeader from '../../components/telescopes/current-selection-header/header';
import TelescopeSelection from '../../components/telescopes/selection-widget/telescope-selection';

const { element, func, object } = PropTypes;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getObservatoryList,
      fetchObservatoryTelescopeStatus,
    }, dispatch),
  }
};

function mapStateToProps({ missions, telescopeOverview }) {
  const { observatoryList, observatoryTelecopeStatus } = telescopeOverview;
  return {
    missions,
    observatoryList,
    observatoryTelecopeStatus,
    user: exampleUser, // TODO: state.user
    cardList: missions.cardList || []
  };
}

@connect(mapStateToProps, mapDispatchToProps)

export default class TelescopeDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      toggleNeoview: false,
      selectedTab: 0,
    };
  }

  componentDidMount() {
    const { obsUniqueId } = this.props.params;
    this.props.actions.getObservatoryList(
      this.props.user,
      obsUniqueId,
    );
  }


  handleSelect(index, last) {
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

    const { instrImageSourceType } = currentInstrument;
    if(instrImageSourceType === 'SSE') {
      return(
        <TelescopeImageViewer
          telePort={currentInstrument.instrPort}
          teleSystem={currentInstrument.instrSystem}
          teleId={currentInstrument.instrId}
          teleFade={currentInstrument.instrFade} />
      );
    } else if(instrImageSourceType === 'video') {
      const {
        instrStreamCode,
        instrStreamURL,
        instrStreamThumbnailVideoWidth,
        instrStreamThumbnailVideoHeight,
        instrStreamThumbnailQuality } = currentInstrument;

      return(
        <VideoImageLoader
          teleStreamCode={instrStreamCode}
          teleStreamURL={instrStreamURL}
          teleStreamThumbnailVideoWidth="810"
          teleStreamThumbnailVideoHeight="600"
          teleStreamThumbnailQuality={instrStreamThumbnailQuality} />
      );
    }

  }

  render() {
    const { selectedTab } = this.state;
    const { observatoryList, observatoryTelecopeStatus } = this.props;
    const { obsUniqueId, teleUniqueId } = this.props.params;

    if(observatoryList.length === 0) {
      return null;
    }

    const currentObservatory = getCurrentObservatory(observatoryList, obsUniqueId);
    const { obsId } = currentObservatory;
    const currentTelescope = this.getCurrentTelescope(currentObservatory.obsTelescopes, teleUniqueId);
    const { teleInstrumentList } = currentTelescope;
    const currentInstrument = teleInstrumentList[selectedTab];

    return (
    <div className="telescope-details-page-wrapper">

      <AnnouncementBanner obsId={obsId} />

      <TelescopeSelection
        observatoryList={observatoryList}
        params={this.props.params} />


      <div className="details-content-wrapper">

        <div className="telescope-details-header clearfix">
          <div className="col-md-10">
            <CurrentSelectionHeader
              telescopeIcon={currentTelescope.teleLogoURL}
              teleName={currentTelescope.teleName}
              teleSponsorLinkURL={currentTelescope.teleSponsorLinkURL}
              teleSponsorLogoURL={currentTelescope.teleSponsorLogoURL}
              instrTelescopeName={currentInstrument.instrTelescopeName} />
          </div>
          <div className="col-md-2">
            <a className="pull-right btn-primary" href={`#${currentTelescope.teleResURL}`}>Reserve this telescope</a>
          </div>
        </div>

        { /* begin left column */ }
        <div className='telescope-details clearfix'>
          <div className='col-md-8'>
            <Tabs
              onSelect={this.handleSelect.bind(this)}
              selectedIndex={selectedTab}>

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
                      currentTelescope.teleOnlineStatus != 'offline' ?
                      this.determineImageLoaderType(instrument) :
                      <TelescopeOffline imageSource={instrument.instrOfflineImgURL} />
                    }

                    {
                      currentTelescope.teleOnlineStatus === 'online' && currentTelescope.teleHasNeoView ?
                      <Neoview
                        port={currentTelescope.teleNeoPort}
                        teleSystem={currentTelescope.teleSystem}
                        showToggleOption={currentTelescope.teleOnlineStatus === 'online'} /> : null
                    }

                  </TabPanel>
                ))
              }

            </Tabs>

            <Spacer height="50px" />

            <PromoMessageBanner
              title={`Community Perspectives`}
              subtitle={`Learn more about this object through the various lenses of science, culture, and spirituality.`} />
            <CommunityPerspectives />

            <LiveWebcam
              time={new Date()}
              tabs={[
                { title: 'West', src: '/assets/images/graphics/livecam-placeholder.jpg' },
                { title: 'East', src: '/assets/images/graphics/livecam-placeholder-2.jpeg' },
                { title: 'South', src: '/assets/images/graphics/livecam-placeholder-3.jpeg' },
                { title: 'North', src: '/assets/images/graphics/livecam-placeholder-4.jpeg' },
              ]}
            />

            <WeatherConditions
              tabs={[
                { title: 'Conditions', src: '/assets/images/graphics/weather-placeholder.jpg' },
                { title: 'Dust', src: '/assets/images/graphics/weather-placeholder-2.jpeg' },
                { title: 'Satellite Cloud', src: '/assets/images/graphics/weather-placeholder-3.jpeg' },
                { title: 'Wind', src: '/assets/images/graphics/weather-placeholder-4.jpeg' },
                { title: 'Sky Brightness', src: '/assets/images/graphics/weather-placeholder-5.jpeg' },
                { title: 'Historic Weather', src: '/assets/images/graphics/weather-placeholder-6.jpeg' },
              ]}
            />
          </div>

          <div className='col-md-4 telescope-details-sidebar'>

            <LiveMission />

            <Spacer height="100px" />
            {/* Telescope Where Sky Component*/}
            <TelescopeWhereSky />
            <Spacer height="50px" />
            <TelescopeConditionSnapshot />
            <TelescopeRecommendsWidget />
            <TelescopeGalleryWidget />
          </div>

        </div>

      </div>

    </div>
    );
  }
}
