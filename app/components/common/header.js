import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';

import { tickEvent } from '../../modules/upcoming-events/upcoming-events-actions';
import Countdown from '../../containers/Countdown';
import Member from '../../containers/Member';
import AudioPlayer from '../../components/AudioPlayer';

// import styles from '../../styles/header.scss';
import { primaryFont } from '../../styles/variables/fonts';
import { lightTurqoise, white } from '../../styles/variables/colors';

const { bool, number, string, shape, instanceOf } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      tickEvent,
    },
    dispatch,
  );
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

  static defaultProps = {
    nextEvent: {
      eventDescription: '',
      eventEnd: 0,
      eventIconURL: '',
      eventId: 0,
      eventImageURL: '',
      eventIsLive: false,
    },
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

      const testEventStart = eventStartMoment;
      const testEventEnd = eventEndMoment;

      //  USE THIS FOR TESTING TIMES
      //  this website helps: https://www.epochconverter.com/
      // if (eventId == 421) {
      //   testEventStart = moment.unix(1493057127);
      //   testEventEnd = moment.unix(1493057187);
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
    const { nextEvent: { eventIsLive, eventDescription } } = this.props;

    return (
      <header className="mainHeader" id="mainHeader">
        <Link to="/">
          <div className="mainHeaderLogo" />
          <p className="beta">beta</p>
        </Link>
        <Member />
        <Countdown />

        {/*
          eventIsLive &&
            <div className="player-container">
              <AudioPlayer
                description={eventDescription}
              />
            </div>
            */}

        <div className="player-container">
          <AudioPlayer description={eventDescription} />
        </div>

        <style jsx>{`
          .player-container {
            float: right;
            margin-right: 20px;
          }

          .mainHeader {
            height: 70px;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            position: fixed;
          }

          .mainHeaderLogo {
            position: absolute;
            background-image: url(https://vega.slooh.com/assets/icons/header/Slooh_Logo_White_5.svg);
            background-repeat: no-repeat;
            background-position: left center;
            display: inline-block;
            width: 218px;
            height: 65px;
            margin-left: 10px;
          }

          .mainHeaderLogoText {
            font-family: ${primaryFont};
            position: absolute;
            left: 90px;
            top: 5px;
            display: inline-block;
            color: ${white};
            font-size: 50px;
          }

          .beta {
            font-family: ${primaryFont};
            font-size: 10px;
            text-transform: uppercase;
            color: ${lightTurqoise};
            position: absolute;
            left: 165px;
            top: 52px;
          }
        `}</style>
      </header>
    );
  }
}
