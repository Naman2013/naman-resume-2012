import React, { Component } from 'react';
import { brightGreen } from '../../styles/variables/colors';

/**
  X/Y * 100 = Z
  X = elapsed time
  Y = duration
  Z = number in percentage completed
*/

class MissionProgressBar extends Component {
  render() {
    const inlineProgressBarStyle = {
      height: '90%',
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
            background-color: ${brightGreen}
          }
        `}</style>
      </div>
    );
  }
}

export default MissionProgressBar;
