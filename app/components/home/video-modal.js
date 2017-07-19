import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

const VideoModal = ({ videoUrl }) => (
  <div className="">
    <iframe
      className="home-youtube-video"
      width="100%"
      height="400"
      src={`${videoUrl}?autoplay=1&modestbranding=1&controls=1`}
      seamless
      allowFullScreen
      autoPlay="1"
      frameBorder="0"
    />
  </div>
);

VideoModal.propTypes = propTypes;

export default VideoModal;
