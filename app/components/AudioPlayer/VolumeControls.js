import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { blueBlack } from '../../styles/variables/colors';

/*
  volume control math stuff..
  0 == 0% (mute)
  -25 == 100%
*/

class VolumeControls extends Component {
  state = {
    volume: 0,
    controlledPosition: {
      x: 0,
      y: 0,
    },
  };

  onControlledDrag = (event, position) => {
    const { x, y } = position;
    console.log(y);
    this.setState({ controlledPosition: { x, y } });
  };

  render() {
    const { volume } = this.state;

    const inlineTabStyle = {
      bottom: `${volume}%`,
    };

    return (
      <div className="root">
        <div className="controls">
          <div className="track" />
          <Draggable
            axis="y"
            bounds={{ bottom: 0, top: -25 }}
            onDrag={this.onControlledDrag}
          >
            <button
              onDrag={this.handleTabDrag}
              style={inlineTabStyle}
              className="tab"
            />
          </Draggable>
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

          .tab:focus { outline: none; }


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
            width: 14px;
            height: 5px;
            left: 13px;
            border-radius: 1px;
            cursor: move;
          }
        `}</style>
      </div>
    );
  }
}

export default VolumeControls;
