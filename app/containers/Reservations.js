import React, { Component } from 'react';

import MissionConfirmModal from '../components/missions/mission-confirm-modal';
import AnnouncementBanner from '../components/common/announcement-banner/announcement-banner';
import ReserveBanner from '../components/missions/reserve-banner';
import MissionNav from '../components/missions/mission-nav';

export default class Reservations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayBanner: true
    };
  }

  closeBanner() {
    this.setState({
      displayBanner: false
    });
  }

  render() {
    return (
      <div>
        <div className="clearfix reservations">
          <MissionConfirmModal />

          <AnnouncementBanner
            display={this.state.displayBanner}
            closeBanner={this.closeBanner.bind(this)} />

          <ReserveBanner />
          <MissionNav />

          {this.props.children}
        </div>
      </div>
    );
  }
}
