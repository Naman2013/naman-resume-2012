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
    now: PropTypes.number.isRequired,
    missionStart: PropTypes.number.isRequired,
    missionEnd: PropTypes.number.isRequired,
  };

  render() {
    const { now, missionStart, missionEnd } = this.props;

    const duration = missionEnd - missionStart;
    const elapsedTime = missionEnd - now;
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
