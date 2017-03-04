import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import CircleTimer from '../containers/CircleTimer';
import * as countDownEvents from '../modules/CountdownModule';
import { fetchActiveOrUpcomingEvent } from '../modules/CountdownModule';
import classes from '../styles/countdown.scss';

const { bool, number, string, object, func } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchActiveOrUpcomingEvent,
    countDownEvents,
  }, dispatch);
}

function mapStateToProps({ countdown }) {
  return countdown;
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Countdown extends PureComponent {
  static propTypes = {
    isFetching: bool.isRequired,
    updateEventsInterval: number.isRequired,
    updateDurationInterval: number.isRequired,
    responseError: object,
    activeOrUpcomingEvent: object,
    duration: string,
    seconds: number,
    lineWidth: number,
    className: string,
    size: number,
  };

  static defaultProps = {
    size: 35,
    lineWidth: 3,
  };

  componentDidMount() {
    const {
      props: {
        updateEventsInterval,
      },
    } = this;
    this.props.fetchActiveOrUpcomingEvent();
    this.updateEventsIntervalId = setInterval(fetchActiveOrUpcomingEvent, updateEventsInterval);
  }

  componentWillUnmount() {
    const { updateEventsIntervalId } = this;
    clearInterval(updateEventsIntervalId);
  }

  render() {
    const {
      isFetching,
      activeOrUpcomingEvent,
      duration,
      size,
      lineWidth,
      className,
    } = this.props;

    if (!isFetching && activeOrUpcomingEvent) {
      const {
        eventTitle,
        eventStart,
        eventEnd,
        eventId,
        eventIsLive,
      } = activeOrUpcomingEvent;

      const currentTimeMoment = moment.utc();
      const eventStartTime = moment.unix(eventStart);
      const eventEndTime = moment.unix(eventEnd);

      const eventHasStarted = eventStartTime.diff(currentTimeMoment) <= 0;
      const eventHasEnded = eventEndTime.diff(currentTimeMoment) <= 0;
      const link = eventHasStarted && !eventHasEnded ? '/shows/situation-room' : `/shows/event-details/${eventId}`;

      return (
        <div className={`${classes.countdown} ${className}`}>
          <CircleTimer
            fetchActiveOrUpcomingEvent={this.props.fetchActiveOrUpcomingEvent}
            lineWidth={lineWidth}
            size={size}
            eventStartIn={eventStart}
          />
          <span>
            {
              eventHasStarted && !eventHasEnded ?
                <span>Event is LIVE: </span> : null
            }
            {
              !eventHasStarted && !eventHasEnded ?
                <span>Next LIVE Event: </span> : null
            }
            <span>
              <strong><Link to={link}>{eventTitle}</Link></strong>
              <span>{duration}</span>
            </span>
          </span>
        </div>
      );
    }

    return null;
  }
}
