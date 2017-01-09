import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CircleTimer from '../containers/CircleTimer';
import * as countDownEvents from '../modules/CountdownModule';
import {fetchActiveOrUpcomingEvent} from '../modules/CountdownModule';
import classes from '../styles/countdown.scss';

const { bool, number, string, object, func } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchActiveOrUpcomingEvent: fetchActiveOrUpcomingEvent,
    countDownEvents
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
    fetchActiveOrUpcomingEvent: func.isRequired,
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
            <div className={classes.countdown}>
              <div>
                <CircleTimer fetchActiveOrUpcomingEvent={fetchActiveOrUpcomingEvent} size={35} eventStartIn={eventStart} />
                <span>Next LIVE Event: </span>
                <span>
                  <strong><a target="_blank" href={eventDetailsDecodedURL}>{eventTitle}</a></strong>
                  <span>{duration}</span>
                </span>
              </div>
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
