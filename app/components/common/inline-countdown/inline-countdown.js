import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import noop from 'lodash/noop';
import inlineCountdownStyle from './inline-countdown.style';

class InlineCountdown extends Component {
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

  bootstrapTimer = (time) => {
    const { serverTimestamp } = this.props;
    const expires = (serverTimestamp)
      ? moment(serverTimestamp)
      : moment.utc(time * 1000);
    console.log(expires);
    const duration = expires.diff(moment.utc());

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
      const minutesRemaining = updatedTime.minutes();
      const secondsRemaining = updatedTime.seconds();

      if (minutesRemaining <= 0 && secondsRemaining <= 0) {
        exitAction({});
        clearInterval(this.timer);
        return;
      }

      this.setState({
        remainingTime: updatedTime,
      });
    }, 1000);
  };

  render() {
    const { remainingTime } = this.state;
    const { format } = this.props;
    const formattedTime = moment(remainingTime).format(format);
    return (
      <div className="inline-countdown">
        { formattedTime }

        <style jsx>{`
          ${inlineCountdownStyle}
        `}</style>
      </div>
    );
  }
}

InlineCountdown.defaultProps = {
  format: 'm:ss',
  exitAction: noop,
  diffAgainstNow: false,
  serverTimestamp: 0,
};

InlineCountdown.propTypes = {
  startTime: PropTypes.number.isRequired, // works with unix timestamp
  serverTimestamp: PropTypes.number,
  exitAction: PropTypes.func, // called for you when timer expires
  format: PropTypes.string,
};

export default InlineCountdown;
