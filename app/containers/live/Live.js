import React from 'react';
import SocialSidebar from '../../components/pulse/sidebar/social-sidebar';
import LiveHeader from '../../components/live/live-header';
import LiveSocial from '../../components/live/live-social';
import LiveClub from '../../components/live/live-club';
import LiveView from '../../components/live/live-view';
import MissionAd from '../../components/missions/mission-ad';

const Live = () =>
  <section className="clearfix live">

    <div className="col-md-12">
      <LiveHeader />
    </div>

    <div className="col-md-9 nopadding">
      {/* <LiveSocial /> */}
      {/* <LiveClub /> */}
      <LiveView />
    </div>

    <div className="col-md-3">
      <MissionAd />
      {/* <SocialSidebar /> */}
    </div>

  </section>;


export default Live;
