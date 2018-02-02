import React from 'react';
import PropTypes from 'prop-types';
import { black } from '../../../styles/variables/colors';

const propTypes = {
  height: PropTypes.string.isRequired,
  minHeight: PropTypes.number,
  handleOnEnded: PropTypes.func.isRequired,
};

const defaultProps = {
  minHeight: 500,
};

const Transition = ({ height, minHeight, handleOnEnded }) => {
  const dimensionStyle = {
    height: (height) ? `${height}px` : `${minHeight}px`,
  };

  return (
    <div className="root" style={dimensionStyle}>
      <video
        onEnded={handleOnEnded}
        className="transition-video"
        playsInline
        autoPlay
        muted
      >
        <source src="https://vega.slooh.com/video/home/stars-high-720.webm" type="video/webm" />
        <source src="https://vega.slooh.com/video/home/stars-high-720.mp4" type="video/mp4" />
      </video>

      <style jsx>{`
        .root {
          width: 100%;
          background: ${black};
          position: absolute;
          overflow: hidden;
        }

        .transition-video {
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

Transition.propTypes = propTypes;
Transition.defaultProps = defaultProps;

export default Transition;
