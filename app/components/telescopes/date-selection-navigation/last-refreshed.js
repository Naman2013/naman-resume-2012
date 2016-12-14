import React, { Component, PropTypes } from 'react';
import moment from 'moment';

// get the current time
// display the current time in minutes
// if less than 1 minute, say so

const DEFAULT_TIME_TEXT = 'within the last minute';

class LastRefreshed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: null,
    };
  }

  componentWillMount() {
    this.startTimer();
  }

  componentWillReceiveProps() {
    this.startTimer();
  }

  startTimer() {
    const { startCounter } = this.props;
    this.setState({
      currentCounter: startCounter,
    });

    if(this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      this.setState({
        remainingTime: this.state.currentCounter++,
      });
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { currentCounter } = this.state;
    let timeText = DEFAULT_TIME_TEXT;

    if(currentCounter >= 1) {
      const minuteText = (currentCounter > 1) ? 'minutes' : 'minute';
      timeText = `${currentCounter} ${minuteText} ago`;
    }

    return(
      <span>{timeText}</span>
    );
  }
}

LastRefreshed.propTypes = {
  startCounter: PropTypes.number, // UTC timestamp
};

export default LastRefreshed;
