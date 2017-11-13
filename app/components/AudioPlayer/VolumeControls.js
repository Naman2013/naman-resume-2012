import React, { Component } from 'react';
import { blueBlack } from '../../styles/variables/colors';

/*
  - handle keydown on the button
  - handle drag on the button
  - set floor and ceiling limits to drag
  - call call provided CB to communicate volume adjustment
*/

class VolumeControls extends Component {
  state = {
    volume: 0,
  };

  handleTabKeyDown(event) {
    console.log();
  }

  render() {
    const { volume } = this.state;

    const inlineTabStyle = {
      bottom: `${volume}%`,
    };

    return (
      <div className="root">
        <div className="controls">
          <div className="track" />
          <button
            style={inlineTabStyle}
            className="tab"
          />
        </div>

        <style jsx>{`
          .root {
            width: 40px;
            text-align: center;
          }

          .controls {
            position: relative;
            height: 30px;
          }

          .track {
            width: 4px;
            height: 30px;
            margin: 0 auto;
            background: ${blueBlack};
            border-radius: 1px;
          }

          .tab {
            border: none;
            background: ${blueBlack};
            position: absolute;
            left: 14px;
            border-radius: 1px;
            cursor: move;
          }
        `}</style>
      </div>
    );
  }
}

export default VolumeControls;
