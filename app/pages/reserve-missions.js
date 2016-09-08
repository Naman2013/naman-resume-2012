import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../modules/User';
import MissionCard from '../components/missions/mission-card';
import AnnouncementBanner from '../components/common/announcement-banner';
import ReserveBanner from '../components/missions/reserve-banner';

const { element, func } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkUser }, dispatch);
}

@connect(null, mapDispatchToProps)

export default class ReserveMissions extends Component {
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


  static propTypes = {
    children: element,
    checkUser: func.isRequired,
  };

  componentDidMount() {
    this.props.checkUser();
  }

  render() {
    return (
      <div>
        <AnnouncementBanner
          display={this.state.displayBanner}
          closeBanner={this.closeBanner.bind(this)} />

        <ReserveBanner />

        <div className="row missions-sub-nav">
          <ul>
            <li className=""><a href="/reserve/missions">Slooh Recommends</a></li>
            <li className="#"><a href="/">By List</a></li>
            <li className="#"><a href="/">By Catalog</a></li>
            <li className="#"><a href="/">By Coordinates</a></li>
            <li className="#"><a href="/">By Telescope</a></li>
            <li className="#"><a href="/">Advanced Scheduling</a></li>
          </ul>
        </div>

        <section className="app-content-container clearfix">
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard />
        </section>
      </div>
    );
  }
}
