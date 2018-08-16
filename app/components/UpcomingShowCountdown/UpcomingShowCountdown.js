import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CountdownCircleTimer from 'components/common/CountdownCircleTimer';

const { bool, number, string, shape, oneOfType } = PropTypes;

export default class UpcomingShowCountdown extends PureComponent {
  static propTypes = {
    eventId: number,
    serverTime: oneOfType([number, string]),
    eventStartTime: oneOfType([number, string]),
  };

  static defaultProps = {
    eventStartTime: '0',
  };

  state = {
    currentTime: this.props.serverTime,
    daysTo: 0,
    hoursTo: 0,
    minutesTo: 0,
    secondsTo: 0,
    millisecondsTo: 0,
  }

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

  scaffoldEventTimer = () => {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }

    this.updateIntervalId = setInterval(() => {
      const { serverTime, eventStartTime } = this.props;

      const { currentTime } = this.state;

      const currentTimeMoment = moment.unix(currentTime);
      const eventStartMoment = moment.unix(eventStartTime);
      //  USE THIS TO OVERRIDE AND FOR TESTING TIMES
      //  this website helps: https://www.epochconverter.com/
      // if (eventId == 421) {
      //   testEventStart = moment.unix(1493057127);
      //   testEventEnd = moment.unix(1493057187);
      // }

      this.tickTime({
        currentTime: currentTime < serverTime ? serverTime : currentTime, // use serverTime on initial load
        eventStartMoment,
        currentTimeMoment,
      });
    }, 1000);
  }

  tickTime = ({
    currentTime,
    eventStartMoment,
    currentTimeMoment,
  }) => {
    const startTimeDifference = eventStartMoment.diff(currentTimeMoment);
    const duration = moment.duration(startTimeDifference, 'milliseconds');

    if (startTimeDifference >= 0) {
      this.setState(() => ({
        currentTime: currentTime + 1,
        daysTo: Math.floor(duration.asDays()),
        hoursTo: duration.hours(),
        minutesTo: duration.minutes(),
        secondsTo: duration.seconds(),
        millisecondsTo: duration.milliseconds(),
      }));
    } else {
      this.setState(() => ({
        currentTime: currentTime + 1,
        daysTo: 0,
        hoursTo: 0,
        minutesTo: 0,
        secondsTo: 0,
        millisecondsTo: 0,
      }));
    }
  }

  render() {
    const {
      eventStartTime,
    } = this.props;

    if (eventStartTime) {
      return (
        <div className="countdown">
          <CountdownCircleTimer
            lineWidth={5}
            size={100}
            countdownEventTimer={this.state}
          />
        </div>
      );
    }

    return null;
  }
}
