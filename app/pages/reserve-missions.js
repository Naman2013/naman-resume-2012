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
import {missionGetCards, missionConfirmOpen, missionConfirmClose} from '../modules/Missions';

const { element, func, object } = PropTypes;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      missionGetCards,
      missionConfirmOpen,
      missionConfirmClose
    }, dispatch)
  };
}

function mapStateToProps({ missions }) {
  return {
    missions,
    cardList: missions.cardList || []
  };
}

@connect(mapStateToProps, mapDispatchToProps)

export default class ReserveMissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayBanner: true
    };
  }

  static propTypes = {
    children: element,
    actions: object.isRequired
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.props.actions.missionGetCards()
  }

  openConfirmModal(type, event) {
    event.preventDefault();
    this.props.actions.missionConfirmOpen({}, type); //TODO: replace empty object with mission object from API
  }

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

        <MissionConfirmModal />

        <AnnouncementBanner
          display={this.state.displayBanner}
          closeBanner={this.closeBanner.bind(this)} />

        <ReserveBanner />
        <MissionNav />

        <section className="container clearfix">
          <div className="col-md-8">
            {console.log(this.props)}
            {this.props.cardList ? this.props.cardList.map(card =>
              <MissionCard
                key={card.uniqueId}
                className={`${card.cardType == 2 ? 'featured col-md-12' : 'secondary col-md-6'}`}
                card={card}
                openModal = {this.openConfirmModal.bind(this)}
                featured={card.cardType == 2} />
            ) : 'waiting...'}
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
