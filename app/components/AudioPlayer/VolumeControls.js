import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Draggable from 'react-draggable';
import { Mute } from '../../design-system/icons/mute';
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
  volumeControlsColor: PropTypes.string,
  muteButtonColor: PropTypes.string,
  showMuteButton: PropTypes.bool,
  volume: PropTypes.number,
  muted: PropTypes.bool,
};

const defaultProps = {
  onVolumeChange: noop,
  handleMute: noop,
  handleUnMute: noop,
  volumeControlsColor: blueBlack,
  muteButtonColor: blueBlack,
  showMuteButton: true,
  volume: 25,
  muted: false,
};

function convertVolumeToPosition(volume, maxBoundary) {
  return -(volume / 100 * maxBoundary);
}

class VolumeControls extends Component {
  state = {
    isMuted: this.props.muted,
  };

  onControlledDrag = (event, position) => {
    const { y } = position;
    const volume = Math.abs(y) / MAX_BOUNDARY * 100;

    this.props.onVolumeChange(volume);
    this.setState({
      volume,
    });
  };

  handleMuteClick = () => {
    const { isMuted } = this.state;
    if (!isMuted) {
      this.props.handleMute();
      this.setState({ isMuted: true });
    } else {
      this.props.handleUnMute();
      this.setState({ isMuted: false });
    }
  };

  render() {
    const { isMuted } = this.state;
    const { volumeControlsColor, muteButtonColor, showMuteButton, volume } = this.props;

    const inlineControlStyle = { background: volumeControlsColor };
    const muteButtonInlineStyle = { color: muteButtonColor };

    return (
      <div className="root">
        <div className="controls">
          <div style={inlineControlStyle} className="track" />
          <Draggable
            defaultPosition={{ x: 0, y: convertVolumeToPosition(volume, MAX_BOUNDARY) }}
            axis="y"
            bounds={TRACK_BOUNDARY}
            onDrag={this.onControlledDrag}
          >
            <button style={inlineControlStyle} onDrag={this.handleTabDrag} className="tab" />
          </Draggable>

          {showMuteButton && (
            <button
              style={muteButtonInlineStyle}
              onClick={this.handleMuteClick}
              className="mute-button"
            >
              {isMuted ? <Mute /> : <span className="fa fa-volume-down" />}
            </button>
          )}
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

          .mute-button:active,
          .mute-button:focus {
            outline: none;
          }
        `}</style>
      </div>
    );
  }
}

VolumeControls.propTypes = propTypes;
VolumeControls.defaultProps = defaultProps;

export default VolumeControls;
