import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Header from './Header';
import Description from './Description';
import VolumeControls from './VolumeControls';

import { darkBlueGray } from '../../styles/variables/colors';

/*
  TODO: refactor how the initial setting of the volume is done
  right now it is a couple of hard coded default values

  TODO: clean up the functions
*/

let PLAYER = null;
const PLAYER_OPTIONS = {
  height: '0',
  width: '0',
  playerVars: {
    autoplay: 1,
  },
};

const INITIAL_VOLUME = 25;

function updateVolume(volume) {
  if (PLAYER) {
    PLAYER.setVolume(volume);
  }
}

function onPlayerReady(event) {
  event.target.setVolume(INITIAL_VOLUME);
  PLAYER = event.target;
}

const propTypes = {
  description: PropTypes.string,
  YTVideoID: PropTypes.string.isRequired,
};

const defaultProps = {
  description: '',
};

const AudioPlayer = ({ description, YTVideoID }) => (
  <div className="root">
    <div className="missing-player">
      <YouTube onReady={onPlayerReady} videoId={YTVideoID} opts={PLAYER_OPTIONS} />
    </div>

    <div className="controls">
      <VolumeControls onVolumeChange={updateVolume} />
    </div>

    <div className="content">
      <Header />
      <Description content={description} />
    </div>

    <style jsx>{`
      .root {
        display: flex;
        width: 260px;
        height: 70px;
        overflow: hidden;
        padding: 10px 0;
        background-color: ${darkBlueGray};
      }

      .controls {
        align-self: center;
      }

      .content {
        align-self: flex-start;
        width: 80%;
      }
    `}</style>
  </div>
);

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer;
