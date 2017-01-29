import React, { Component } from 'react';

import MissionConfirmModal from '../components/missions/mission-confirm-modal';
import AnnouncementBanner from '../components/common/announcement-banner/announcement-banner';
import ReserveBanner from '../components/missions/reserve-banner';
import MissionNav from '../components/missions/mission-nav';

class Reservations extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="clearfix reservations">
          <MissionConfirmModal />
          <AnnouncementBanner level="general" />
          <ReserveBanner />
          <MissionNav route={this.props.route} location={this.props.location} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Reservations;
