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
    const hours = pad(duration.hours());
    const minutes = pad(duration.minutes());
    const seconds = pad(duration.seconds());

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
