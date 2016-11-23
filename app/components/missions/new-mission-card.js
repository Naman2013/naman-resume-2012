import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import styles from './mission-card.scss';
import moment from 'moment-timezone';
import _ from 'lodash';

import { updateSingleReservations, grabMissionSlot } from '../../modules/Missions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateSingleReservations,
      grabMissionSlot,
    }, dispatch)
  };
}

@connect(null, mapDispatchToProps)
class NewMissionCard extends Component {

  constructor(props) {
    super(props);

    this.handleMakeReservationClick = this.handleMakeReservationClick.bind(this);
  }

  componentDidMount() {
    const { uniqueId } = this.props.card;
    const { objectId, missionAvailable, expires } = this.props.reservation;
    const { updateSingleReservations } = this.props.actions;

    if(!missionAvailable) {
      const interval = moment(expires * 1000).diff(moment());
      updateSingleReservations(uniqueId, objectId);

      this.updateReservationTimeout = setInterval(
        updateSingleReservations(uniqueId, objectId), interval);
    }
  }

  componentWillUnmount() {
    if(this.updateReservationTimeout) {
      clearInterval(this.updateReservationTimeout);
    }
  }

  handleMakeReservationClick(event) {
    event.preventDefault();
    const { openModal, card, reservation } = this.props;
    const { grabMissionSlot } = this.props.actions;

    const mission = {
      ...reservation,
      callSource: 'recommends',
      objectTitle: card.title,
      objectType: card.objectType,
    };

    grabMissionSlot(mission);

    // now open the reservation modal
    openModal(card, 'reserve');
  }

  renderCallToAction() {
    const { missionAvailable, missionStart } = this.props.reservation;
    const { openModal, card, featured } = this.props;

    if(missionAvailable) {

      const formattedUTCDate = new Date(missionStart * 1000);

      const EST_start = moment.tz(formattedUTCDate, 'America/New_York').format('dddd, MMMM Do');
      const EST_start_time = moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z');
      const PST_start_time = moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z');
      const UTC_start_time = moment.utc(formattedUTCDate).format('HH:mm z');

      return(
        <div>
          <div className="mission-available">
            <p className="start-time">
              <strong>{ EST_start }{ featured ? ':' : '' }</strong>
              { !featured ? <br /> : null} { EST_start_time } <span className="highlight">&middot;</span> { PST_start_time } <span className="highlight">&middot;</span> { UTC_start_time }
            </p>
          </div>
          <Link
            className={ styles.piggybackCta }
            to="#"
            onClick={ this.handleMakeReservationClick }>
            Make Reservation
          </Link>
        </div>
      );
    }

    return null;
  }

  render() {
    const { openModal, reservation, card, featured } = this.props;
    const { headline, title, description } = card;
    const { missionStart, missionAvailable } = reservation;

    /**
      NOTE:
      The resolution of these classnames will determine the shape
      of the painted element.  When the element is non-featured, notice
      how col-md-6 is applied.
    */
    const newMissionCardContainerClasses = classnames({
      [styles.missionCard]: 1,
      'featured col-md-12': featured,
      'secondary col-md-6': !featured,
    });

    return (
      <div className={ newMissionCardContainerClasses }>

        <div className="card-content-container">
          {
            featured ?
            <span className="callOut"><span className="first-word">Don't</span> Miss</span> : null
          }

          <h2>{ headline }</h2>

          <div className={ styles.cardsubTitle }>
            <img className={ styles.cardIcon } src="assets/icons/Jupiter.svg" />
            <h3>{ title }</h3>
          </div>

          {
            featured ?
              <p className={ styles.cardDescription }>{ description }</p>
              :
              <p className={ styles.cardDescription }>{ _.truncate(description, { 'length': 130, 'separator': ' ' }) }</p>
          }

          {
            missionAvailable ?
              <h5 className="mission-status">Set up a new mission</h5>
              :
              <h5 className="mission-status">No mission is available at this time.</h5>
          }

          <div className="join-mission-callout">
            { this.renderCallToAction() }
          </div>
        </div>

      </div>
    );
  }
}

NewMissionCard.propTypes = {
  openModal: PropTypes.func,
  card: PropTypes.object,
  featured:  PropTypes.bool,
  reservation: PropTypes.shape({
    missionAvailable: PropTypes.bool,
    missionStart: PropTypes.number,
    objectId: PropTypes.number,
  }),
};

export default NewMissionCard;
