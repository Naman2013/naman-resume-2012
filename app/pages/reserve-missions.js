import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../modules/User';
import classnames from 'classnames';

import MissionCard from '../components/missions/mission-card';
import AnnouncementBanner from '../components/common/announcement-banner';
import ReserveBanner from '../components/missions/reserve-banner';
import MissionNav from '../components/missions/mission-nav';
import MissionUpdates from '../components/missions/mission-updates';
import MissionAd from '../components/missions/mission-ad';
import MissionUpcoming from '../components/missions/mission-upcoming';
import MissionConfirmModal from '../components/missions/mission-confirm-modal';

const { element, func, object } = PropTypes;

export default class ReserveMissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayBanner: true
    };
  }

  static propTypes = {
    children: element
  };

  closeBanner() {
    this.setState({
      displayBanner: false
    });
  }

  render() {
    let cardClassName = classnames({
      'mission-card': true,
      'featured': true
    });

    return (
      <div className="reserve-missions">
        <AnnouncementBanner
          display={this.state.displayBanner}
          closeBanner={this.closeBanner.bind(this)} />

        <ReserveBanner />
        <MissionNav />

        <section className="container clearfix">
          <div className="col-md-8">
            <MissionCard featured={true} />
            <MissionCard className="col-md-6" />
            <MissionCard className="col-md-6" />
            <MissionCard className="col-md-6" />
            <MissionCard className="col-md-6" />
          </div>
          <div className="col-md-4 mission-sidebar">
            <MissionAd />
            <MissionUpcoming />
            <MissionUpdates />
          </div>
        </section>
      </div>
    );
  }
}
