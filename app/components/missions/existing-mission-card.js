import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import moment from 'moment-timezone';
import _ from 'lodash';

import ModalGeneric from '../common/modals/modal-generic';

import styles from './mission-card.scss';
import { grabPiggyback } from '../../modules/Piggyback';
import { missionGetInfo, missionGetCards } from '../../modules/Missions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      missionGetInfo,
      missionGetCards,
    }, dispatch),
  };
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.user,
  };
}

@connect( mapStateToProps, mapDispatchToProps )
class ExistingMissionCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      errorModalIsOpen: false,
    };

    this.handlePiggybackClick = this.handlePiggybackClick.bind( this );
    this.handleCloseErrorModal = this.handleCloseErrorModal.bind( this );
  }

  handleGrabPiggybackResponse( result ) {
    const { apiError, errorCode, errorMsg, missionList } = result.data;
    const mission = missionList[0];
    const { card } = this.props;

    if( apiError ) {
      this.setState({
        errorModalIsOpen: true,
        errorMessage: errorMsg,
      });
    } else {
      if( mission.missionAvailable ) {
        this.props.actions.missionGetInfo(card, 'piggyback');
      } else {
        console.log( 'mission is no longer available...' );
      }
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

  startMissionTime() {
    const { card, piggyback } = this.props;
    const featured = card.cardType == 2;

    const formattedUTCDate = new Date(piggyback.missionStart * 1000);

    const EST_start = moment.tz(formattedUTCDate, 'America/New_York').format('dddd, MMMM Do');
    const EST_start_time = moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z');
    const PST_start_time = moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z');
    const UTC_start_time = moment.utc(formattedUTCDate).format('HH:mm z');

    return(
      <p className="start-time">
        <strong>{EST_start}</strong>
        {!featured ? <br /> : null} {EST_start_time} <span className="highlight">&middot;</span> {PST_start_time} <span className="highlight">&middot;</span> {UTC_start_time}
      </p>
    );
  }

  missionNotAvailable() {
    const { card, piggyback } = this.props;

    if(piggyback.userHasReservation) {
      return (
        <div>
          { this.startMissionTime() }
          <p>You have an upcoming { piggyback.userReservationType } reservation scheduled for { this.startMissionTime() }</p>
        </div>
      )
    } else {
      return (
        <div className="mission-unavailable">
          <Link
            className={styles.piggybackCta}
            to="/reservations/slooh-recommends/new">
            Make Reservation
          </Link>
        </div>
      )
    }
  }

  missionAvailable() {
    return (
      <div className="mission-available">
        { this.startMissionTime() }
        <a
          className={ styles.piggybackCta }
          href="#"
          onClick={ this.handlePiggybackClick }>
          Piggyback on Mission
        </a>
      </div>
    )
  }

  handleCloseErrorModal() {
    // refresh the list of cards...
    this.props.actions.missionGetCards();

    // close the modal...
    this.setState({
      errorModalIsOpen: false,
    });
  }

  render() {
    const { card, piggyback, openModal } = this.props;
    const featured = card.cardType == 2;

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
            <span className="callOut"><span className="first-word">Don&apos;t</span> Miss</span> : null
          }

          <h2>{card.headline}</h2>

          <div className={styles.cardsubTitle}>
            <img className={styles.cardIcon} src="assets/icons/Jupiter.svg" />
            <h3>{card.title}</h3>
          </div>

          {
            featured ?
              <p className={ styles.cardDescription }>{ card.description }</p>
              :
              <p className={ styles.cardDescription }>{ _.truncate( card.description, { 'length': 130, 'separator': ' ' } ) }</p>
          }

          {
            piggyback.missionAvailable ?
              <h5 className="mission-status">Join an <i>existing</i> mission</h5>
              :
              <h5 className="mission-status">No existing missions are available</h5>
          }

          <div className="join-mission-callout">
            { piggyback.missionAvailable ? this.missionAvailable() : this.missionNotAvailable() }
          </div>
        </div>

        <ModalGeneric
          closeModal={this.handleCloseErrorModal}
          open={this.state.errorModalIsOpen}
          title={`Oops...`}
          description={this.state.errorMessage}
        />

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
