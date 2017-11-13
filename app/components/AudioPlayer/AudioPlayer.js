import React from 'react';
import PropTypes from 'prop-types';
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

const AudioPlayer = ({ description }) => (
  <div className="root">
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

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer;
