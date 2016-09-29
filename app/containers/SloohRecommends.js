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
import {missionGetCards, missionConfirmOpen, missionConfirmClose, missionGetInfo, missionGetUpdates} from '../modules/Missions';

const { element, func, object } = PropTypes;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      missionGetCards,
      missionConfirmOpen,
      missionConfirmClose,
      missionGetInfo,
      missionGetUpdates
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

export default class SloohRecommends extends Component {

  static propTypes = {
    children: element,
    actions: object.isRequired
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.props.actions.missionGetCards();
    this.props.actions.missionGetUpdates();
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
    console.log(this);
    let today = moment().utc().format("MM/DD/YYYY");
    return (
      <div className="reserve-missions">
        <section className="container clearfix">

          <div className="col-md-8">
            {React.cloneElement(this.props.children, { openConfirmModal: this.openConfirmModal })}
          </div>

          <div className="col-md-4 mission-sidebar">
            <MissionAd />
            <MissionUpcoming />
            <MissionUpdates updates={this.props.missions.announcements} />
          </div>
        </section>
      </div>
    );
  }
}
