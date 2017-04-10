import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import style from './inline-countdown.scss';

const formatDoubleDigit = num => (num > 9 ? num : '0'.concat(num));
const getRemaining = (expires, currentTime) => {
  const diff = expires.diff(currentTime);
  const duration = moment.duration(diff);
  const daysRemaining = duration.days();
  const hoursRemaining = duration.hours();
  const minutesRemaining = duration.minutes();
  const secondsRemaining = duration.seconds();

  return {
    days: daysRemaining,
    hours: hoursRemaining,
    minutes: minutesRemaining,
    seconds: secondsRemaining,
  };
}
class InlineDaysCountdown extends Component {

  static defaultProps = {
    unixTimestamp: moment(),
  }

  constructor(props) {
    super(props);

    this.state = {
      countdown: '00:00:00',
    };
  }

  componentDidMount() {
    const { startTime, unixTimestamp } = this.props;
    this.bootstrapTimer(startTime, unixTimestamp);
  }

  componentWillReceiveProps(nextProps) {
    const nextStartTime = nextProps.startTime;
    const currentStartTime = this.props.startTime;
    if (nextStartTime > 0 && nextStartTime !== currentStartTime) {
      this.bootstrapTimer(nextStartTime);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  bootstrapTimer = (time, unixTimestamp) => {
    const expires = moment(time * 1000);
    let timestamp = moment(unixTimestamp);
    const remaining = getRemaining(expires, timestamp);

    // set initial countdown
    this.setState({
      countdown: `${formatDoubleDigit(remaining.days)}:${formatDoubleDigit(remaining.hours)}:${formatDoubleDigit(remaining.minutes)}`,
    });

    if (this.timer) {
      clearInterval(this.timer);
    }
    // update countdown in 1 second intervals to keep it percise
    this.timer = setInterval(() => {
      const { exitAction } = this.props;
      timestamp = moment(timestamp + 1000); // one second has elapsed
      if (
        expires.isSame(timestamp) ||
        expires.isBefore(timestamp)
      ) {
        if (typeof exitAction === 'function') {
          exitAction({});
        }
        clearInterval(this.timer);
      } else {
        const updatedRemaining = getRemaining(expires, timestamp);
        this.setState({
          countdown: `${formatDoubleDigit(updatedRemaining.days)}:${formatDoubleDigit(updatedRemaining.hours)}:${formatDoubleDigit(updatedRemaining.minutes)}`,
        });
      }
    }, 1000);
  }

  render() {
    const { countdown } = this.state;
    return (
      <div className="inline-countdown">
        {countdown}
      </div>
    );
  }
}

InlineDaysCountdown.propTypes = {
  unixTimestamp: PropTypes.number,
  startTime: PropTypes.number, // works with unix timestamp
  exitAction: PropTypes.func, // called for you when timer expires
};

export default InlineDaysCountdown;
