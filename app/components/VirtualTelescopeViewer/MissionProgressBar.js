import React, { Component } from 'react';
import PropTypes from 'prop-types';
import asPercentage from '../../utils/asPercentage';
import { brightGreen } from '../../styles/variables/colors';

const TICK_DURATION_MILLIS = 1000;
const INCREMENT_NOW_SECONDS = 1;

/**
  X/Y * 100 = Z
  X = elapsed time (current-time - start-time)
  Y = duration (end-time - start-time)
  Z = number in percentage completed

  start time
  end time
  current time (should this come from SSE events?)
*/

class MissionProgressBar extends Component {
  static propTypes = {
    now: PropTypes.number.isRequired,
    missionStart: PropTypes.number.isRequired,
    missionEnd: PropTypes.number.isRequired,
  };

  state = {
    now: this.props.now,
  };

  componentDidMount() {
    this.bootstrapTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.now !== this.props.now) {
      this.setState({
        now: nextProps.now,
      });
    }
  }

  componentWillUnmount() {
    this.doTearDown();
  }

  interval = null;

  bootstrapTimer() {
    if (this.interval) {
      this.doTearDown();
    }

    this.interval = setInterval(() => {
      this.setState(prevState => ({
        now: prevState.now + INCREMENT_NOW_SECONDS,
      }));
    }, TICK_DURATION_MILLIS);
  }

  doTearDown() {
    clearInterval(this.interval);
  }

  render() {
    const { missionStart, missionEnd } = this.props;
    const { now } = this.state;

    const duration = missionEnd - missionStart;
    const elapsedTime = now - missionStart;
    const remainingPercentage = Math.floor((elapsedTime / duration) * 100);

    const inlineProgressBarStyle = {
      height: asPercentage(remainingPercentage),
    };

    return (
      <div className="root">
        <div
          className="progress-bar"
          style={inlineProgressBarStyle}
        />

        <style jsx>{`
          .root {
            border: 1px solid ${brightGreen};
            height: 100px;
            width: 5px;
            transform: rotate(180deg);
            overflow: hidden;
          }

          .progress-bar {
            width: 100%;
            background-color: ${brightGreen};
            transition: height 0.1s ease-out;
          }
        `}</style>
      </div>
    );
  }
}

export default MissionProgressBar;
