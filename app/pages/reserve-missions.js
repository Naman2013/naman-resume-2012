import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../modules/User';
import MissionCard from '../components/missions/mission-card';
import AnnouncementBanner from '../components/common/announcement-banner';
import ReserveBanner from '../components/missions/reserve-banner';
import MissionNav from '../components/missions/mission-nav';

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
        <MissionNav />

        <section className="container clearfix">
          <div className="col-md-8">
            <MissionCard featured={true} />
            <MissionCard />
            <MissionCard />
            <MissionCard />
          </div>
          <div className="col-md-4">
            Sidebar
          </div>
        </section>
      </div>
    );
  }
}
