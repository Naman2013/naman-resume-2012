import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Header from './Header';
import Description from './Description';
import VolumeControls from './VolumeControls';

import { darkBlueGray } from '../../styles/variables/colors';

const EXAMPLE_TITLE = 'Paul discusses Hubble\'s Variable Nebula (NGC 2261).';

const propTypes = {
  description: PropTypes.string,
};

const defaultProps = {
  description: EXAMPLE_TITLE,
};

class AudioPlayer extends Component {
  render() {
    const { description } = this.props;

    const playerOptions = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1,
      },
    };

    return (
      <div className="root">
        <div className="missing-player">
          <YouTube
            videoId="zOH0XN4smgM"
            opts={playerOptions}
          />
        </div>

        <div className="controls">
          <VolumeControls />
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
  }
}

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer;
