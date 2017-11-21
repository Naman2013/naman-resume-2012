import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Draggable from 'react-draggable';
import { blueBlack } from '../../styles/variables/colors';

/*
  TODO: refactor how the initial setting of the volume is done
  right now it is a couple of hard coded default values
*/

const MAX_BOUNDARY = 25;
const TRACK_BOUNDARY = {
  bottom: 0,
  top: -MAX_BOUNDARY, // draggable API uses negative values
};

const propTypes = {
  onVolumeChange: PropTypes.func,
  handleMute: PropTypes.func,
  handleUnMute: PropTypes.func,
};

const defaultProps = {
  onVolumeChange: noop,
  handleMute: noop,
  handleUnMute: noop,
};

class VolumeControls extends Component {
  state = {
    volume: 0,
    controlledPosition: {
      x: 0,
      y: 0,
    },
    isMuted: false,
  };

  onControlledDrag = (event, position) => {
    const { y } = position;
    const volume = Math.abs(y) / (MAX_BOUNDARY * 100);
    this.props.onVolumeChange(volume);
    this.setState({
      volume,
      controlledPosition: { y },
    });
  };

  handleMuteClick = () => {
    const { isMuted } = this.state;
    if (isMuted) {
      this.props.handleMute();
      this.setState({ isMuted: true });
    } else {
      this.props.handleUnMute();
      this.setState({ isMuted: false });
    }
  };

  render() {
    return (
      <div className="root">
        <div className="controls">
          <div className="track" />
          <Draggable
            defaultPosition={{ x: 0, y: -6.25 }}
            axis="y"
            bounds={TRACK_BOUNDARY}
            onDrag={this.onControlledDrag}
          >
            <button onDrag={this.handleTabDrag} className="tab" />
          </Draggable>

          <button onClick={this.handleMuteClick} className="mute-button">
            <span className="fa fa-volume-down" />
          </button>
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

          .tab:focus {
            outline: none;
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
            width: 14px;
            height: 5px;
            left: 13px;
            bottom: 0;
            border-radius: 1px;
            cursor: move;
          }

          .mute-button {
            background: none;
            border: none;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

VolumeControls.propTypes = propTypes;
VolumeControls.defaultProps = defaultProps;

export default VolumeControls;
