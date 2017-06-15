import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import CircleTimer from '../containers/CircleTimer';
import * as countDownEvents from '../modules/CountdownModule';
import classes from '../styles/countdown.scss';

const { bool, number, string, shape, instanceOf } = PropTypes;

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
    calculatedEventValues: upcomingEvents.calculatedEventValues,
    countdownEventTimer: upcomingEvents.eventTimer,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Countdown extends PureComponent {
  static propTypes = {
    fetchingEvents: bool.isRequired,
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
    lineWidth: number,
    className: string,
    size: number,
  };

  static defaultProps = {
    size: 35,
    lineWidth: 3,
    nextEvent: {
      eventDescription: '',
      eventEnd: 0,
      eventIconURL: '',
      eventId: 0,
      eventImageURL: '',
      eventIsLive: false,
    },
  };

  render() {
    const {
      size,
      lineWidth,
      className,
      nextEvent,
      fetchingEvents,
      countdownEventTimer,
      calculatedEventValues,
    } = this.props;

    if (!fetchingEvents && nextEvent) {
      const {
        eventLink,
      } = calculatedEventValues;

      const {
        eventIsLive,
        eventTitle,
      } = nextEvent;


      return (
        <div className={`${classes.countdown} ${className}`}>
          <CircleTimer
            lineWidth={lineWidth}
            size={size}
            countdownEventTimer={countdownEventTimer}
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
              <strong><Link to={eventLink}>{eventTitle}</Link></strong>
            </span>
          </span>
        </div>
      );
    }

    return null;
  }
}
