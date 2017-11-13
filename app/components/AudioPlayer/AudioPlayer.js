import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Description from './Description';
import VolumeControls from './VolumeControls';

const propTypes = {
  description: PropTypes.string,
};

const defaultProps = {
  description: '',
};

const AudioPlayer = ({ description }) => (
  <div>
    <Header />
    <Description content={description} />
    <VolumeControls />

    <style jsx>{`

    `}</style>
  </div>
);

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer;
