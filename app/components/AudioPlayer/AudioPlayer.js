import React, { Component } from 'react';
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

const EXAMPLE_TITLE = 'Paul discusses Hubble\'s Variable Nebula (NGC 2261).';
let PLAYER = null;

const PLAYER_OPTIONS = {
  height: '0',
  width: '0',
  playerVars: {
    autoplay: 1,
  },
};

function updateVolume(volume) {
  PLAYER.setVolume(volume);
}

function onPlayerReady(event) {
  event.target.setVolume(5);
  PLAYER = event.target;
}

const propTypes = {
  description: PropTypes.string,
};

const defaultProps = {
  description: EXAMPLE_TITLE,
};

const AudioPlayer = ({ description }) => (
  <div className="root">
    <div className="missing-player">
      <YouTube
        onReady={onPlayerReady}
        videoId="zOH0XN4smgM"
        opts={PLAYER_OPTIONS}
      />
    </div>

    <div className="controls">
      <VolumeControls
        onVolumeChange={updateVolume}
      />
    </div>

    <div className="content">
      <Header />
      <Description content={description} />
    </div>

    <style jsx>{`
      .root {
        display: flex;
        align-items: center;
        width: 260px;
        min-height: 70px;
        padding: 10px 0;
        background-color: ${darkBlueGray};
      }

      .content {
        width: 80%;
      }
    `}</style>
  </div>
);

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer;
