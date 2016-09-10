import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class CountdownTimer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      time: moment(this.props.missionStartTime)
    };
  }

  componentDidMount() {
    this.countDownInterval = setInterval(this.tick.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.countDownInterval);
  }

  tick() {
    const currentTime = this.state.time;
    this.setState({
      time: currentTime.subtract(60, 'seconds')
    });
  }

  render() {
    return(
      <div className="count-down">
        <h4 className="counter-text">{this.state.time.format('h:mm')}</h4>
      </div>
    );
  }
}

CountdownTimer.propTypes = {
  missionStartTime: PropTypes.number
};

export default CountdownTimer;
