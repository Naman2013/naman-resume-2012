import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../modules/User';
import classnames from 'classnames';
import moment from 'moment';

import MissionCard from '../components/missions/mission-card';
import MissionUpdates from '../components/missions/mission-updates';
import MissionAd from '../components/missions/mission-ad';
import MissionUpcoming from '../components/missions/mission-upcoming';
import {missionGetCards, missionConfirmOpen, missionConfirmClose, missionGetInfo} from '../modules/Missions';

const { element, func, object } = PropTypes;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      missionGetCards,
      missionConfirmOpen,
      missionConfirmClose,
      missionGetInfo
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

  static propTypes = {
    children: element,
    actions: object.isRequired
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.props.actions.missionGetCards()
  }

  openConfirmModal(card, type, event) {
    event.preventDefault();

    if (type == 'piggyBack') {
      this.props.actions.missionGetInfo(card, type, event);
    } else {
      this.props.actions.missionConfirmOpen(type); //TODO: replace empty object with mission object from API
    }
  }

  render() {
    let cardClassName = classnames({
      'mission-card': true,
      'featured': true
    });
    console.log(this.props.cardList);
    let today = moment().utc().format("MM/DD/YYYY");
    return (
      <div className="reserve-missions">
        <section className="container clearfix">
          <div className="col-md-8">
            {this.props.cardList ? this.props.cardList.map(card =>  {
              let end_date = moment.unix(card.end).format("MM/DD/YYYY");
              if (!moment(today).isAfter(end_date, 'days')) {
                return (<MissionCard
                  key={card.uniqueId}
                  className={`${card.cardType == 2 ? 'featured col-md-12' : 'secondary col-md-6'}`}
                  card={card}
                  openModal = {this.openConfirmModal.bind(this)}
                  featured={card.cardType == 2} />);
                }
            }) : 'waiting...'}
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
