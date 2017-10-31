import React, { Component } from 'react';
import PropTypes from 'prop-types';
import asPercentage from '../../utils/asPercentage';
import { brightGreen } from '../../styles/variables/colors';

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
    missionStart: PropTypes.number.isRequired,
    missionEnd: PropTypes.number.isRequired,
  };

  state = {
    progress: 80,
  };

  componentDidMount() {
    this.bootstrapTimer();
  }

  componentWillReceiveProps() {}

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer() {
    if (this.timer) { clearInterval(this.timer); }
  }

  bootstrapTimer() {
    this.clearTimer();

    this.timer = setInterval(() => {
      console.log('tick...');
    }, 1000);
  }

  render() {
    const { progress } = this.state;

    const inlineProgressBarStyle = {
      height: asPercentage(progress),
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
          }

          .progress-bar {
            width: 100%;
            background-color: ${brightGreen};
            transition: 'height 0.1s ease-out';
          }
        `}</style>
      </div>
    );
  }
}

export default MissionProgressBar;
