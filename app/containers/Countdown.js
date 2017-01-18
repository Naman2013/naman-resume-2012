import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CircleTimer from '../containers/CircleTimer';
import * as countDownEvents from '../modules/CountdownModule';
import { fetchActiveOrUpcomingEvent } from '../modules/CountdownModule';
import classes from '../styles/countdown.scss';

const { bool, number, string, object, func } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchActiveOrUpcomingEvent: fetchActiveOrUpcomingEvent,
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
    fetchActiveOrUpcomingEvent: func.isRequired,
  };

  static defaultProps = {
    size: 35,
    lineWidth: 3,
  };

  componentDidMount() {
    const {
      props: {
        updateEventsInterval,
        fetchActiveOrUpcomingEvent,
      },
    } = this;

    fetchActiveOrUpcomingEvent();

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
      fetchActiveOrUpcomingEvent,
      size,
      lineWidth,
      className,
    } = this.props;

    if (!isFetching) {
      if (activeOrUpcomingEvent) {
        const {
          eventTitle,
          eventStart,
          eventEnd,
          eventDetailsURL,
          eventLiveURL,
        } = activeOrUpcomingEvent;

        const currentTime = Math.round(Date.now() / 1000);
        const eventDetailsDecodedURL = decodeURIComponent(eventDetailsURL);
        const eventLiveDecodedURL = decodeURIComponent(eventLiveURL);

        if (eventStart > currentTime && currentTime < eventEnd) {
          return (
            <div className={`${classes.countdown} ${className}`}>
              <CircleTimer
                fetchActiveOrUpcomingEvent={fetchActiveOrUpcomingEvent}
                lineWidth={lineWidth}
                size={size}
                eventStartIn={eventStart}
              />
              <span>
                <span>Next LIVE Event: </span>
                <span>
                  <strong><a target="_blank" href={eventDetailsDecodedURL}>{eventTitle}</a></strong>
                  <span>{duration}</span>
                </span>
              </span>
            </div>
          );
        } else if (eventStart <= currentTime && currentTime <= eventEnd) {
          return (
            <a href={eventLiveDecodedURL}>{eventTitle} is LIVE!</a>
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return (
        <div>Loading</div>
      );
    }
  }
}
