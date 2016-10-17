import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../../modules/User';
import classnames from 'classnames';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './telescope-details.scss';
import exampleUser from '../../example-api-data/example-user'


import {
  getObservatoryList,
  getCurrentObservatory,
  fetchObservatoryTelescopeStatus} from '../../modules/Telescope-Overview';

import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import HighMagnification from '../../components/common/high-magnification/high-magnification';
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
import CurrentSelectionHeader from '../../components/telescopes/current-selection-header/header';
import TelescopeSelection from '../../components/telescopes/selection-widget/telescope-selection';
// import MissionUpcoming from '../components/missions/mission-upcoming';
// import {missionGetCards, missionConfirmOpen, missionConfirmClose, missionGetInfo} from '../modules/Missions';

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
      toggleNeoview: false
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
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  /**
    * Handling toggle click of neo view (progress bar arrow)
    * by default the state of neo view is false (hidden)
    * when user clicks arrow the state is being updated which shows/hides neo view overlay
    */
  handleToggleNeoview() {
    this.setState({
      toggleNeoview: !this.state.toggleNeoview
    });
  }

  /**
    * Getting the current telescope from the API response
    * @param {array} observatoryTelescopes - Array of all telescopes in the current observatory
    * @param {string} telescopeId - Id of the current telescope, which available in URL and/or props.params
    * @returns {Object} telescope - Current telescope object
    */
  getCurrentTelescope(observatoryTelescopes, telescopeId) {
    return observatoryTelescopes.find(telescope => telescope.teleUniqueId === telescopeId);
  }

  render() {
    const { observatoryList, observatoryTelecopeStatus } = this.props;
    const { obsUniqueId, teleUniqueId } = this.props.params;

    if(observatoryList.length === 0) {
      return null;
    }

    const currentObservatory = getCurrentObservatory(observatoryList, obsUniqueId)
    const { obsId } = currentObservatory;
    const currentTelescope = this.getCurrentTelescope(currentObservatory.obsTelescopes, teleUniqueId);
    const { teleSystem, teleAccessMethod } = currentTelescope; // needed for SSE
    const obsStatus = observatoryTelecopeStatus && observatoryTelecopeStatus.statusList ? observatoryTelecopeStatus.statusList.statusTeleList[0] : null;
    console.log(teleSystem);
    console.log(teleAccessMethod);
    console.log(obsStatus);
    console.log(currentTelescope);

    /**
      when teleAccessMethod == 'missions' and obsStatus.onlineStatus == 'online'
      var source = new EventSource('/dev-sse:3105/sse/chile1highmag');
      function processMsg(msg) {
        // Event data is sent as a | separated string.  This breaks it into an array.
        // Full data is: DTG | message | serverTime
        var msgArray = msg.split("|");
        // Spit out the most recent log message
        console.log( msgArray[0] + " " + msgArray[1] );
      }
      source.addEventListener('message', function(e) { processMsg(e.data); }, false);

    **/

    return (
    <div className="telescope-details-page-wrapper">
      <AnnouncementBanner obsId={obsId} />
      <TelescopeSelection observatoryList={observatoryList} />

      <div>
        <div className="col-md-8">
          <CurrentSelectionHeader />
        </div>
        <div className="col-md-4">
          <button className="pull-right btn-primary">Reserve this telescope</button>
        </div>
      </div>

      <div className='telescope-details'>
        <div className='col-md-8'>
          <Tabs
            onSelect={this.handleSelect}
            selectedIndex={0}
          >
            <TabList>
              <Tab>High-Magnification</Tab>
              <Tab>Wid-Field</Tab>
            </TabList>
            <TabPanel>
              <HighMagnification className={this.state.toggleNeoview ? 'hidden' : 'visible'} />
              <Neoview className={this.state.toggleNeoview ? 'visible' : 'hidden'} />
            </TabPanel>
            <TabPanel>
            </TabPanel>
          </Tabs>

          <LiveStream
            handleToggle={this.handleToggleNeoview.bind(this)}
            toggleNeoview={this.state.toggleNeoview} />

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
        <div className='col-md-4'>
          {/* Live Mission Component */}
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
    );
  }
}
