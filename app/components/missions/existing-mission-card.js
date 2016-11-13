import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import moment from 'moment';

import styles from './mission-card.scss';
import { grabPiggyback } from '../../modules/Piggyback';
import { missionGetInfo } from '../../modules/Missions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      missionGetInfo,
    }, dispatch),
  };
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.user,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class ExistingMissionCard extends Component {

  constructor(props) {
    super(props);

    this.handlePiggybackClick = this.handlePiggybackClick.bind(this);
  }

  handleGrabPiggybackResponse(result) {
    const { data } = result;
    const mission = data.missionList[0];
    const { card } = this.props;

    if(mission.missionAvailable) {
      this.props.actions.missionGetInfo(card, 'piggyback');
    } else {
      // TODO: Mission is not available... do something else...
    }
  }

  grabPiggybackResponseError(error) {
    console.group('Grab piggyback ERROR');
    console.log(error);
    console.groupEnd();
  }

  handlePiggybackClick(event) {
    event.preventDefault();

    const { openModal, card, piggyback, user } = this.props;
    const theMission = {
      ...user,
      scheduledMissionId: piggyback.scheduledMissionId,
      uniqueId: card.uniqueId,
      callSource: 'recommends',
      objectTitle: card.title,
      lookaheadPiggyback: card.lookaheadDaysPiggyback,
    };

    const grabPiggybackHandle = grabPiggyback(theMission)
      .then(this.handleGrabPiggybackResponse.bind(this))
      .catch(this.grabPiggybackResponseError.bind(this));
  }

  render() {
    const { card, piggyback, openModal } = this.props;

    const startTime = piggyback.missionStart;
    const featured = card.cardType == 2;

    /**
      starttime is provided in UTC format
    */
    const EST_start = moment.unix(startTime).utcOffset(-5, false).format('dddd, MMMM Do');
    const EST_start_time = moment.unix(startTime).utcOffset(-5, false).format('h:mma');
    const PST_start_time = moment.unix(startTime).utcOffset(-8, false).format('h:mma');
    const UTC_start_time = moment.unix(startTime).format('HH:mm');

    const startMissionTime = () => {
      return(
        <p className="start-time">
          <strong>{EST_start}</strong>
          { !featured ? <br /> : null} { EST_start_time } EST <span className="highlight">&middot;</span> { PST_start_time } PST <span className="highlight">&middot;</span> { UTC_start_time } UTC
        </p>
      );
    }

    const missionAvailable = () => {
      return (
        <div className="mission-available">
          <h5 className="title">Join an <i>existing</i> mission</h5>
          { startMissionTime() }
          <a
            className={ styles.piggybackCta }
            href="#"
            onClick={ this.handlePiggybackClick }>
            Piggyback on Mission
          </a>
        </div>
      )
    }

    const missionNotAvailable = () => {
      if(piggyback.userHasReservation) {
        return (
          <div>
            { startMissionTime() }
            <p>You have an upcoming { piggyback.userReservationType } reservation scheduled for { startMissionTime() }</p>
          </div>
        )
      } else {
        return (
          <div>
            <h5>No existing missions are available</h5>
            <Link
              className={styles.piggybackCta}
              to="/reservations/slooh-recommends/new">
              Make Reservation
            </Link>
          </div>
        )
      }
    }

    const existingMissionCardClassnames = classnames({
      [styles.missionCard]: 1,
      'featured col-md-12': featured,
      'secondary col-md-6': !featured,
    });

    return (
      <div className={ existingMissionCardClassnames }>

        <div className="card-content-container">
          {
            featured ?
            <span className="callOut"><span className="first-word">Don't</span> Miss</span> : null
          }

          <h2>{ card.headline }</h2>

          <div className={ styles.cardsubTitle }>
            <img className={ styles.cardIcon } src="assets/icons/Jupiter.svg" />
            <h3>{ card.title }</h3>
          </div>

          <p className={ styles.cardDescription }>{ card.description }</p>

          <div className="join-mission-callout">
            { piggyback.missionAvailable ? missionAvailable() : missionNotAvailable() }
          </div>
        </div>

      </div>
    );
  }
}

ExistingMissionCard.propTypes = {
  piggyback: PropTypes.shape({
    uniqueId: PropTypes.string,
    missionAvailable: PropTypes.bool,
  }),
};

export default ExistingMissionCard;
