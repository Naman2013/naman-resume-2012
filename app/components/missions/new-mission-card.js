import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import styles from './mission-card.scss';
import moment from 'moment';
import _ from 'lodash';

import { updateSingleReservations } from '../../modules/Missions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateSingleReservations,
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
    const { updateSingleReservations } = this.props.actions;

    // first, update the reservation...
    updateSingleReservations(card.uniqueId, reservation.objectId);

    // now open the reservation modal
    openModal(card, 'reserve');
  }

  renderCallToAction() {
    const { missionAvailable, missionStart } = this.props.reservation;
    const { openModal, card, featured } = this.props;

    if(missionAvailable) {

      const EST_start = moment.unix(missionStart).utcOffset(-5, false).format('dddd, MMMM Do');
      const EST_start_time = moment.unix(missionStart).utcOffset(-5, false).format('h:mma');
      const PST_start_time = moment.unix(missionStart).utcOffset(-8, false).format('h:mma');
      const UTC_start_time = moment.unix(missionStart).format('HH:mm');

      return(
        <div>
          <div className="mission-available">
            <p className="start-time">
              <strong>{ EST_start }{ featured ? ':' : '' }</strong>
              { !featured ? <br /> : null} { EST_start_time } EST <span className="highlight">&middot;</span> { PST_start_time } PST <span className="highlight">&middot;</span> { UTC_start_time } UTC
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
