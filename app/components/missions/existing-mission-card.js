import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import moment from 'moment-timezone';
import _ from 'lodash';

import ModalGeneric from '../common/modals/modal-generic';

import styles from './mission-card.scss';
import {
  getNextPiggybackSingle,
  missionGetCards,
  updatePiggyback } from '../../modules/Missions';
import { resetMissionAvailability } from '../../modules/Piggyback';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getNextPiggybackSingle,
      missionGetCards,
      resetMissionAvailability,
      updatePiggyback,
    }, dispatch),
  };
}

function mapStateToProps({ piggyback }, ownProps) {
  return {
    piggybackMissionAvailable: piggyback.missionAvailable,
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

    this.handlePiggybackClick = this.handlePiggybackClick.bind(this);
    this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
    this.resetMissionAvailability = this.resetMissionAvailability.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const { expires } = this.props.piggyback;
    const timer = moment.unix(expires).diff(moment());
    if (typeof timer === 'number') {
      this.updateReservationTimeout = setInterval(this.update, timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateReservationTimeout);
  }

  update() {
    const { uniqueId, objectId } = this.props.piggyback;
    const { updatePiggyback } = this.props.actions;
    updatePiggyback({uniqueId, objectId});
  }

  handleGrabPiggybackResponse(result) {
    const { apiError, errorCode, errorMsg, missionList } = result.data;
    const mission = missionList[0];
    const { card } = this.props;

    if(apiError) {
      this.setState({
        errorModalIsOpen: true,
        errorMessage: errorMsg,
      });
    } else {
      if( mission.missionAvailable ) {
        this.props.actions.missionGetInfo(card, 'piggyback');
      } else {
        // TODO: refresh the list of reservations
        // TODO: let the user know the mission is not available
        this.setState({
          errorModalIsOpen: true,
          errorMessage: errorMsg,
        });
      }
    }
  }

  handlePiggybackClick(event) {
    event.preventDefault();

    const { card } = this.props;
    this.props.actions.getNextPiggybackSingle(card);
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

  determineMissionStatusMessage() {
    const { piggyback } = this.props;

    if(piggyback.userHasReservation) {
      return(
        <div>
          <h5 className="mission-status">You have an upcoming { piggyback.userReservationType } reservation scheduled for</h5>
          <div className="join-mission-callout">
            {this.userHasReservation()}
          </div>
        </div>
      );
    }

    if(piggyback.missionAvailable) {
      return(
        <div>
          <h5 className="mission-status">Join an <i>existing</i> mission</h5>
          <div className="join-mission-callout">
            {this.missionAvailable()}
          </div>
        </div>
      );
    }

    if(!piggyback.missionAvailable) {
      return(
        <div>
          <h5 className="mission-status">No existing missions are available</h5>
          <div className="join-mission-callout">
            {this.missionNotAvailable()}
          </div>
        </div>
      );
    }
  }

  missionNotAvailable() {
    const { card, piggyback } = this.props;
    if(!piggyback.userHasReservation) {
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
    return(
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

  userHasReservation() {
    return(
      <div className="mission-available">
        { this.startMissionTime() }
      </div>
    );
  }

  handleCloseErrorModal() {
    // refresh the list of cards...
    this.props.actions.missionGetCards();

    // close the modal...
    this.setState({
      errorModalIsOpen: false,
    });
  }

  resetMissionAvailability(event) {
    event.preventDefault();
    this.props.actions.missionGetCards();
    this.props.actions.resetMissionAvailability();
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
      <div className={existingMissionCardClassnames}>

        <div className="card-content-container">
          {
            featured ?
              <span className="callOut"><span className="first-word">Don&apos;t</span> Miss</span> : null
          }

          <h2>{card.headline}</h2>

          <div className={styles.cardsubTitle}>
            {
              card.objectIconURL ? <img alt="Mission icon" className={styles.cardIcon} src={card.objectIconURL} /> : null
            }
            <h3>{card.title}</h3>
          </div>

          {
            featured ?
              <p className={styles.cardDescription}>{card.description}</p>
              :
              <p className={styles.cardDescription}>{_.truncate( card.description, {'length': 130, 'separator': ' '})}</p>
          }

          {
            this.determineMissionStatusMessage()
          }

        </div>

        <ModalGeneric
          closeModal={this.handleCloseErrorModal}
          open={this.state.errorModalIsOpen}
          title={`Oops...`}
          description={this.state.errorMessage}
        />

        <ModalGeneric
          closeModal={this.resetMissionAvailability}
          open={!this.props.piggybackMissionAvailable}
          title="Oops..."
          description={'The mission you requested is no longer available.'}
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
