import React, { Component, PropTypes } from 'react';
import SocialSidebar from '../../components/pulse/sidebar/social-sidebar';
import LiveHeader from '../../components/live/live-header';
import LiveSocial from '../../components/live/live-social';
import LiveClub from '../../components/live/live-club';
import MissionAd from '../../components/missions/mission-ad';


const Live = ({ children }) =>
  <section className="clearfix live">

      <div className="col-md-12">
        <LiveHeader />
      </div>

      <div className="col-md-9">
        <LiveSocial />
        <LiveClub />
      </div>

      <div className="col-md-3">
        <MissionAd />
        <SocialSidebar />
      </div>

  </section>;


export default Live;
