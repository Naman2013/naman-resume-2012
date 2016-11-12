import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import styles from './mission-card.scss';
import moment from 'moment';

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

    if(!missionAvailable) {
      const interval = moment(expires * 1000).diff(moment());
      this.props.actions.updateSingleReservations(uniqueId, objectId);

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
    const { openModal, card } = this.props;
    openModal(card, 'reserve');
  }

  renderCallToAction() {
    const { missionAvailable, missionStart } = this.props.reservation;
    const { openModal, card, featured } = this.props;

    if(missionAvailable) {

      const EST_start = moment.unix(missionStart).utcOffset(-5, false).format('dddd, MMMM Do');
      const EST_start_time = moment.unix(missionStart).utcOffset(-5, false).format('hh:mm a');
      const PST_start_time = moment.unix(missionStart).utcOffset(-8, false).format('hh:mm a');
      const UTC_start_time = moment.unix(missionStart).format('hh:mm a');

      return(
        <div>
          <h5>Set up a new mission</h5>
          <p>
            <strong>{ EST_start }</strong>:
              {
                !featured ? <br /> : null
              }
              { EST_start_time } EST · { PST_start_time } PST · { UTC_start_time } UTC
          </p>
          <Link
              className={ styles.piggybackCta }
              to="#"
              onClick={ this.handleMakeReservationClick }>
              Make Reservation
          </Link>
        </div>
      );
    }

    return(
      <p className="no-mission-available">No mission is available at this time.</p>
    );
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
      <div className={newMissionCardContainerClasses}>
        { featured ? <span className="callOut">Don't Miss</span> : null }

        <h2>{ headline }</h2>

        <div className={ styles.cardsubTitle }>
          <img className={ styles.cardIcon } src="assets/icons/Jupiter.svg" />
          <h3>{ title }</h3>
        </div>

        <p>{ description }</p>

        <div className="join-mission-callout">
          { this.renderCallToAction() }
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
