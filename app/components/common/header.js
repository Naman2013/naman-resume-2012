import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';

import { tickEvent } from '../../modules/upcoming-events/upcoming-events-actions';
import Countdown from '../../containers/Countdown';
import Member from '../../containers/Member';
import AudioPlayer, { AudioPlayerProvider } from '../../components/AudioPlayer';

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

function mapStateToProps({ countdown, upcomingEvents, audioPlayer }) {
  return {
    showAudioPlayerBeforeLive: audioPlayer.showAudioPlayerBeforeLive,
    showAudioPlayerWhenLive: audioPlayer.showAudioPlayerWhenLive,
    showAudioPlayerAfterEnd: audioPlayer.showAudioPlayerAfterEnd,
    audioPlayerEventEnd: audioPlayer.eventEnd,
    audioPlayerEventStart: audioPlayer.eventStart,
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
    showAudioPlayerBeforeLive: PropTypes.bool,
    showAudioPlayerWhenLive: PropTypes.bool,
    showAudioPlayerAfterEnd: PropTypes.bool,
    serverTime: PropTypes.number,
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
    showAudioPlayerBeforeLive: false,
    showAudioPlayerWhenLive: false,
    showAudioPlayerAfterEnd: false,
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

      //  USE THIS TO OVERRIDE AND FOR TESTING TIMES
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
    const {
      nextEvent: { eventIsLive },
      showAudioPlayerBeforeLive,
      showAudioPlayerWhenLive,
      showAudioPlayerAfterEnd,
      countdownEventTimer,
      audioPlayerEventStart,
      audioPlayerEventEnd,
    } = this.props;

    /* re we before the event start time? */
    const isBeforeEvent = (countdownEventTimer.currentTime < audioPlayerEventStart)

    /* has the event passed? */
    const isAfterEvent = (countdownEventTimer.currentTime > audioPlayerEventEnd);

    const showAudioPlayer =
      (!eventIsLive && showAudioPlayerBeforeLive && isBeforeEvent) ||   /* NOT LIVE & SHOW BEFORE & AND EVENT IS COMING UP, HASNT STARTED YET */
      (!eventIsLive && showAudioPlayerAfterEnd && isAfterEvent) ||      /* NOT LIVE & SHOW AFTER & EVENT HAS PASSED */
      (eventIsLive && showAudioPlayerWhenLive);                         /* EVENT IS LIVE AND SHOW WHEN LIVE */

    //console.log("Event End: " + audioPlayerEventEnd);
    //console.log("Show Audio Player: " + showAudioPlayer);
    //console.log("---------------------");
    //console.log("Is Before Event?: " + isBeforeEvent);
    //console.log("Is After Event?: " + isAfterEvent);
    //console.log("Before Show Flag: " + (!eventIsLive && showAudioPlayerBeforeLive && isBeforeEvent) );
    //console.log("After Show Flag: " + (!eventIsLive && showAudioPlayerAfterEnd && isAfterEvent) );
    //console.log("During Show Flag: " + (eventIsLive && showAudioPlayerWhenLive) );
    //console.log("---------------------");

    return (
      <header className="mainHeader" id="mainHeader">
        <Link to="/">
          <div className="mainHeaderLogo" />
          <p className="beta">beta</p>
        </Link>

        <Member />
        <Countdown />

        {showAudioPlayer && (
          <div className="player-container">
            <AudioPlayerProvider>
              <AudioPlayer isLiveEvent={eventIsLive} streamCode="" />
            </AudioPlayerProvider>
          </div>
        )}

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
            background-image: url(https://vega.slooh.com/assets/icons/header/Slooh_Logo_White_5.svg);
            background-repeat: no-repeat;
            background-position: left center;
            display: inline-block;
            width: 218px;
            height: 65px;
            margin-left: 10px;
            float: left;
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

          @media (max-width: 1170px) {
            .player-container {
              position: absolute;
              top: 70px;
              right: 0;
              margin-right: 0;
            }
          }
        `}</style>
      </header>
    );
  }
}
