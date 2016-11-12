import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../modules/User';
import classnames from 'classnames';
import moment from 'moment';

import MissionUpdates from '../components/missions/mission-updates';
import MissionAd from '../components/missions/mission-ad';
import MissionUpcoming from '../components/missions/mission-upcoming';
import {
  missionGetCards,
  missionConfirmOpen,
  missionConfirmClose,
  missionGetInfo,
  missionGetUpdates } from '../modules/Missions';

const { element, func, object } = PropTypes;

@connect(({ missions }) => ({
  announcements: missions.announcements,
}), (dispatch) => ({
  actions: bindActionCreators({
    missionGetCards,
    missionConfirmOpen,
    missionConfirmClose,
    missionGetInfo,
    missionGetUpdates
  }, dispatch)
}))
export default class SloohRecommends extends Component {
  static propTypes = {
    children: element,
    actions: object.isRequired
  };

  componentDidMount() {
    this.props.actions.missionGetCards();
    this.props.actions.missionGetUpdates();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  /**
    * @todo Before the modal window is open we need to call /callpiggyback API
    * @todo And based on the response build modal window content
    * @todo If the response is negative
    * We call /getNextPiggyback and refresh only this card content with new data (done.)
    * @param {object} card - current card in which modal window is called from
    * @param {string} type - type of mission reservation, either piggyBack or reserve (new reservation)
    * @param {object} event - current event, provided by default from React JSX
    */
  openConfirmModal(card, type) {
    if (type == 'piggyBack') {
      this.props.actions.missionGetInfo(card, type);
    } else {
      // TODO: replace empty object with mission object from API
      this.props.actions.missionConfirmOpen(card, type);
    }
  }

  /**
    * Render JSX and content on the slooh recommends page
    * This is a container for 2 pages:
    * 1) Existing Missions
    * 2) New Missions
  */
  render() {
    const { announcements, children } = this.props;

    return (
      <div className="reserve-missions">

        <section className="container clearfix">
          <div className="col-md-8">
            {
              React.cloneElement(children, {
                openConfirmModal: ::this.openConfirmModal,
              })
            }
          </div>

          <div className="col-md-4 mission-sidebar">
            <MissionAd />
            <MissionUpcoming />
            <MissionUpdates updates={announcements} />
          </div>
        </section>
      </div>
    );
  }
}
