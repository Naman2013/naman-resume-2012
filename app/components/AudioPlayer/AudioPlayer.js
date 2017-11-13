import React from 'react';
import PropTypes from 'prop-types';
import Description from './Description';
import VolumeControls from './VolumeControls';

const propTypes = {
  description: PropTypes.string,
};

const defaultProps = {
  description: '',
};

// volume controls
// LIVE header
// title

const AudioPlayer = ({ description }) => (
  <div>
    <h2>LIVE</h2>
    <Description content={description} />
    <VolumeControls />

    <style jsx>{`

    `}</style>
  </div>
);

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer;
