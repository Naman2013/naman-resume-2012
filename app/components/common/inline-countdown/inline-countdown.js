import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import style from './inline-countdown.scss';

class InlineCountdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      remainingTime: null,
    };

    this.bootstrapTimer = this.bootstrapTimer.bind(this);
  }

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

  bootstrapTimer(time) {
    const expires = moment(time * 1000);
    const duration = expires.diff(moment());

    this.setState({
      remainingTime: duration,
    });

    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      const { remainingTime } = this.state;
      const { exitAction } = this.props;
      const updatedTime = moment(remainingTime).subtract(1, 'seconds');
      const hoursRemaining = updatedTime.hours();
      const minutesRemaining = updatedTime.minutes();
      const secondsRemaining = updatedTime.seconds();

      if (hoursRemaining <= 0 && minutesRemaining <= 0 && secondsRemaining <= 0) {
        if (typeof exitAction === 'function') {
          exitAction({});
        }
        clearInterval(this.timer);
      }

      this.setState({
        remainingTime: updatedTime,
      });
    }, 1000);
  }

  render() {
    const { remainingTime } = this.state;
    const { format } = this.props;
    const formattedTime = moment(remainingTime).format(format);
    return (
      <div className="inline-countdown">
        { formattedTime }
      </div>
    );
  }
}
InlineCountdown.defaultProps = {
  format: 'm:ss',
};

InlineCountdown.propTypes = {
  startTime: PropTypes.number, // works with unix timestamp
  exitAction: PropTypes.func, // called for you when timer expires
  format: PropTypes.string,
};

export default InlineCountdown;
