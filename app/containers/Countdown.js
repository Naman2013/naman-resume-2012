import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import CircleTimer from '../containers/CircleTimer';
import * as countDownEvents from '../modules/CountdownModule';
import classes from '../styles/countdown.scss';

const { bool, number, string, shape } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    countDownEvents,
  }, dispatch);
}

function mapStateToProps({ countdown, upcomingEvents }) {
  return {
    countdown,
    nextEvent: upcomingEvents.nextEvent,
    fetchingEvents: upcomingEvents.fetchingEvents,
    serverTime: upcomingEvents.upcomingEvents.timestamp,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Countdown extends PureComponent {
  static propTypes = {
    serverTime: number,
    fetchingEvents: bool.isRequired,
    nextEvent: shape({
      eventDescription: string.isRequired,
      eventDetailsURL: string.isRequired,
      eventEnd: number.isRequired,
      eventIconURL: string.isRequired,
      eventId: number.isRequired,
      eventImageURL: string.isRequired,
      eventIsLive: bool.isRequired,
    }).isRequired,
    lineWidth: number,
    className: string,
    size: number,
  };

  static defaultProps = {
    size: 35,
    lineWidth: 3,
  };

  render() {
    const {
      size,
      lineWidth,
      className,
      nextEvent,
      fetchingEvents,
      serverTime,
    } = this.props;

    if (!fetchingEvents && nextEvent) {
      const {
        eventTitle,
        eventStart,
        eventEnd,
        eventId,
        eventIsLive,
      } = nextEvent;

      const currentTimeMoment = moment.unix(serverTime);
      const eventStartTime = moment.unix(eventStart);
      const eventEndTime = moment.unix(eventEnd);

      const eventHasStarted = eventStartTime.diff(currentTimeMoment) <= 0;
      const eventHasEnded = eventEndTime.diff(currentTimeMoment) <= 0;
      const link = ((eventHasStarted && !eventHasEnded) || eventIsLive) ? '/shows/situation-room' : `/shows/event-details/${eventId}`;

      let testEventIsLive = eventStart;
      let testEndTime = eventEnd;

      // USE THIS FOR TESTING TIMES
      // this website helps: https://www.epochconverter.com/
      // if (eventId == 404) {
      //   testEventIsLive = 1489065680;
      //   testEndTime = 1489065740;
      // }

      return (
        <div className={`${classes.countdown} ${className}`}>
          <CircleTimer
            lineWidth={lineWidth}
            size={size}
            eventStartIn={testEventIsLive}
            eventEndIn={testEndTime}
            serverTime={serverTime}
            eventIsLive={eventIsLive}
            eventId={eventId}
          />
          <span>
            {
              eventIsLive ?
                <span>Event is LIVE: </span> : null
            }
            {
              !eventIsLive ?
                <span>Next LIVE Event: </span> : null
            }
            <span>
              <strong><Link to={link}>{eventTitle}</Link></strong>
            </span>
          </span>
        </div>
      );
    }

    return null;
  }
}
