import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { tickEvent } from '../../modules/upcoming-events/upcoming-events-actions';
import Countdown from '../../containers/Countdown';
import Member from '../../containers/Member';
import styles from '../../styles/header.scss';

const { bool, number, string, shape, instanceOf } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    tickEvent,
  }, dispatch);
}

function mapStateToProps({ countdown, upcomingEvents }) {
  return {
    countdown,
    nextEvent: upcomingEvents.nextEvent,
    serverTime: upcomingEvents.upcomingEvents.timestamp,
    calculatedEventValues: upcomingEvents.calculatedEventValues,
    countdownEventTimer: upcomingEvents.eventTimer,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends Component {
  static propTypes = {
    serverTime: number,
    nextEvent: shape({
      eventDescription: string.isRequired,
      eventDetailsURL: string.isRequired,
      eventEnd: number.isRequired,
      eventIconURL: string.isRequired,
      eventId: number.isRequired,
      eventImageURL: string.isRequired,
      eventIsLive: bool.isRequired,
    }).isRequired,
    calculatedEventValues: shape({
      currentTimeMoment: instanceOf(moment).isRequired,
      eventStartMomentDiff: number.isRequired,
      eventEndMomentDiff: number.isRequired,
      eventStartMoment: instanceOf(moment).isRequired,
      eventEndMoment: instanceOf(moment).isRequired,
      eventLink: string.isRequired,
    }).isRequired,
    countdownEventTimer: shape({
      currentTime: number.isRequired,
      daysTo: number.isRequired,
      hoursTo: number.isRequired,
      minutesTo: number.isRequired,
      secondsTo: number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.scaffoldEventTimer();
  }

  componentWillReceiveProps(nextProps) {
    const nextEventId = nextProps.eventId;
    const currentEventId = this.props.eventId;
    if (nextEventId !== currentEventId) {
      this.scaffoldEventTimer();
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.updateIntervalId);
  }

  scaffoldEventTimer() {
    // Header prepares the Countdown timer for the entire app-content-container
    // so there is only one instance of the interval in the app.
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }


    this.updateIntervalId = setInterval(() => {
      const { serverTime, countdownEventTimer, calculatedEventValues, nextEvent } = this.props;
      const { eventStartMoment, eventEndMoment } = calculatedEventValues;
      const { currentTime } = countdownEventTimer;
      const { eventIsLive, eventId } = nextEvent;

      let testEventStart = eventStartMoment;
      let testEventEnd = eventEndMoment;

    //  USE THIS FOR TESTING TIMES
    //  this website helps: https://www.epochconverter.com/
      // if (eventId == 421) {
      //   testEventStart = moment.unix(1492944968);
      //   testEventEnd = moment.unix(1492945028);
      // }

      this.props.tickEvent({
        currentTime: currentTime < serverTime ? serverTime : currentTime, // use serverTime on initial load
        eventStartMoment: testEventStart,
        eventEndMoment: testEventEnd,
        eventIsLive,
      });
    }, 1000);
  }

  render() {
    return (
      <header className={styles.mainHeader} id="mainHeader">
        <div className={styles.mainHeaderLogo} />
        <div className={styles.mainHeaderLogoText}>
          Slooh <span className="beta">beta</span>
        </div>
        <Member />
        <Countdown />
      </header>
    );
  }
}
