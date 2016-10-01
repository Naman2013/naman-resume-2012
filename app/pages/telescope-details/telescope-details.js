import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../../modules/User';
import classnames from 'classnames';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './telescope-details.scss';

import HighMagnification from '../../components/common/high-magnification/high-magnification';
import Spacer from '../../components/common/spacer';
import LiveStream from '../../components/telescope-details/live-stream/live-stream';
import LiveMission from '../../components/telescope-details/live-mission/live-mission';
import TelescopeWhereSky from '../../components/telescope-details/where-sky/where-sky';
import TelescopeConditionSnapshot from '../../components/telescope-details/condition-snapshot/condition-snapshot';
import TelescopeCommunityPerspectives from '../../components/telescope-details/community-perspectives/community-perspectives';
import LiveWebcam from '../../components/telescope-details/live-webcam/live-webcam';
// import MissionUpcoming from '../components/missions/mission-upcoming';
// import {missionGetCards, missionConfirmOpen, missionConfirmClose, missionGetInfo} from '../modules/Missions';

const { element, func, object } = PropTypes;

function mapDispatchToProps(dispatch) {
  return {

  };
}

function mapStateToProps({ missions }) {
  return {
    missions,
    cardList: missions.cardList || []
  };
}

@connect(mapStateToProps, mapDispatchToProps)

export default class TelescopeDetails extends Component {

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    return (
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
              <HighMagnification />
            </TabPanel>
            <TabPanel>
            </TabPanel>
          </Tabs>
          {/* Live Stream Component */}
          <LiveStream />
          <Spacer height="50px" />
          <TelescopeCommunityPerspectives />
          <LiveWebcam />
        </div>
        <div className='col-md-4'>
          {/* Live Mission Component */}
          <LiveMission />
          <Spacer height="100px" />
          {/* Telescope Where Sky Component*/}
          <TelescopeWhereSky />
          <Spacer height="50px" />
          <TelescopeConditionSnapshot />
        </div>

      </div>
    );
  }
}
