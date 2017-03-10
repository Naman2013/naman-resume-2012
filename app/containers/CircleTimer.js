import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { eventGoLive, endEvent } from '../modules/upcoming-events/upcoming-events-actions';
import CircleCounter from '../components/circle-counter';
import classes from '../styles/circle-timer.scss';

const { number, bool } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    eventGoLive,
    endEvent,
  }, dispatch);
}

@connect(null, mapDispatchToProps)
export default class CircleTimer extends Component {
  static propTypes = {
    serverTime: number.isRequired,
    eventStartIn: number.isRequired,
    eventEndIn: number.isRequired,
    eventIsLive: bool.isRequired,
    eventId: number.isRequired,
    size: number,
    lineWidth: number,
  };

  constructor(props) {
    super(props);
    this.scaffoldEventTimer();
  }

  state = {
    currentTime: this.props.serverTime,
    daysTo: 0,
    hoursTo: 0,
    minutesTo: 0,
    secondsWithMillisecondsTo: 0,
    secondsTo: 0,
  };

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

  getDaysInMonth() {
    return (new Date(new Date().setMonth(new Date().getMonth() + 1, 0))).getDate();
  }

  getDoubleNumber(number) {
    return number.toString().length === 1 ? `0${number}` : number;
  }

  scaffoldEventTimer() {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }

    this.updateIntervalId = setInterval(() => {
      const { eventStartIn, eventEndIn, eventIsLive } = this.props;
      const { currentTime } = this.state;
      const convertedEventStartTime = moment.unix(currentTime);
      const startTimeDifference = moment.unix(eventStartIn).diff(convertedEventStartTime);
      const endTimeDifference = moment.unix(eventEndIn).diff(convertedEventStartTime);

      if (startTimeDifference >= 0) {
        const duration = moment.duration(startTimeDifference, 'milliseconds');

        this.setState(prevState => ({
          currentTime: prevState.currentTime + 1,
          daysTo: duration.days(),
          hoursTo: duration.hours(),
          minutesTo: duration.minutes(),
          secondsTo: duration.seconds(),
          millisecondsTo: duration.milliseconds(),
        }));
      } else {
        this.setState(prevState => ({
          currentTime: prevState.currentTime + 1,
        }));
      }

      // the event is not live
      // the event start time has past the current time
      // the event end time has not past the current time
      if (!eventIsLive && startTimeDifference <= 0 && endTimeDifference >= 0) {
        this.props.eventGoLive();
      }

      // the event is live
      // the end time has not past the current time by 1 second
      // delaying the ending by 1 second...
      if (endTimeDifference < -1000) {
        this.props.endEvent();
      }
    }, 1000);
  }

  render() {
    const {
      props: { size, lineWidth },
      state: {
        daysTo,
        hoursTo,
        minutesTo,
        secondsTo,
        millisecondsTo,
      },
      getDaysInMonth,
      getDoubleNumber,
    } = this;

    return (
      <div className={classes.circleTimer}>
        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={getDaysInMonth()}
          progress={getDaysInMonth() - daysTo}
          progressColor="rgb(239, 34, 166)"
        >
          <span>{getDoubleNumber(daysTo)}</span>
        </CircleCounter>

        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={24}
          progress={24 - hoursTo}
          progressColor="rgb(241, 210, 54)"
        >
          <span>{getDoubleNumber(hoursTo)}</span>
        </CircleCounter>

        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={60}
          progress={60 - (minutesTo + (secondsTo / 60))}
          progressColor="rgb(143, 144, 145)"
        >
          <span>{getDoubleNumber(minutesTo)}</span>
        </CircleCounter>

        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={60}
          progress={60 - (secondsTo + (millisecondsTo / 1000))}
          progressColor="rgb(187, 219, 219)"
        >
          <span>{getDoubleNumber(secondsTo)}</span>
        </CircleCounter>

        {
          /**
            TODO: reminder features
            <img alt="Reminder icon" className="hand" src="../assets/images/header/reminder.png" />
          */
        }
      </div>
    );
  }
}
