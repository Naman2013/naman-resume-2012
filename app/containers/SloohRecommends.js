import React, { Component } from 'react';
// todo remove me
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MissionUpdates from '../components/missions/mission-updates';
import GoogleAd from '../components/common/google-ads/GoogleAd';
import MissionUpcoming from '../components/missions/mission-upcoming';

import {
  missionGetCards,
  missionConfirmOpen,
  missionConfirmClose,
  // missionGetInfo,
  missionGetUpdates,
} from '../modules/missions-old';

const { element, func, object } = PropTypes;

@connect(
  ({ missions }) => ({
    announcements: missions.announcements,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        missionGetCards,
        missionConfirmOpen,
        missionConfirmClose,
        // missionGetInfo,
        missionGetUpdates,
      },
      dispatch
    ),
  })
)
export default class SloohRecommends extends Component {
  static propTypes = {
    children: element,
    actions: object.isRequired,
  };

  componentDidMount() {
    this.props.actions.missionGetCards();
    this.props.actions.missionGetUpdates();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  /**
   * @param {object} card - current card in which modal window is called from
   * @param {string} type - type of mission reservation, either piggyBack or reserve (new reservation)
   * @param {object} event - current event, provided by default from React JSX
   */
  openConfirmModal(type, card) {
    if (type == 'piggyBack') {
      // this.props.actions.missionGetInfo(type, card);
    } else {
      // TODO: replace empty object with mission object from API
      this.props.actions.missionConfirmOpen(type, card);
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
            {React.cloneElement(children, {
              openConfirmModal: ::this.openConfirmModal,
            })}
          </div>

          <div className="col-md-4 mission-sidebar">
            <GoogleAd
              adURL={'/5626790/Recommends'}
              adWidth={300}
              adHeight={250}
              targetDivID={'div-gpt-ad-1495111021281-0'}
            />
            <MissionUpcoming />
            <MissionUpdates updates={announcements} />
          </div>
        </section>
      </div>
    );
  }
}
