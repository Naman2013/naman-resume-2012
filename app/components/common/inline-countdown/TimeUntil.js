import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import inlineCountdownStyle from './inline-countdown.style';

const pad = (number = 0) => {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
};

class TimeUntil extends Component {
  state = {
    remainingTime: null,
  };

  componentDidMount() {
    const { startTime } = this.props;
    this.bootstrapTimer(startTime);
  }

  componentWillReceiveProps(nextProps) {
    const nextStartTime = nextProps.startTime;
    const currentStartTime = this.props.startTime;
    if (nextStartTime !== currentStartTime) {
      this.bootstrapTimer(nextStartTime);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  bootstrapTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.setState({
        remainingTime: moment(),
      });
    }, 1000);
  };

  render() {
    const { remainingTime } = this.state;
    const { startTime } = this.props;

    const endTime = moment.unix(startTime);
    const duration = moment.duration(endTime.diff(remainingTime));

    if (!duration.isValid()) { return null; }

    let remainingHours = duration.hours();
    let remainingMinutes = duration.minutes();
    let remainingSeconds = duration.seconds();

    if (remainingHours <= 0) {
      remainingHours = 0;
    }

    if (remainingMinutes <= 0) {
      remainingMinutes = 0;
    }

    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
    }


    const hours = pad(remainingHours);
    const minutes = pad(remainingMinutes);
    const seconds = pad(remainingSeconds);

    return (
      <div className="inline-countdown">
        {hours}:{minutes}:{seconds}

        <style jsx>{`
          ${inlineCountdownStyle}
        `}</style>
      </div>
    );
  }
}

TimeUntil.propTypes = {
  startTime: PropTypes.number.isRequired, // works with unix timestamp in seconds
};

export default TimeUntil;
