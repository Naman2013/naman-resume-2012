import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { black } from '../../../styles/variables/colors';

const propTypes = {
  height: PropTypes.string.isRequired,
  handleOnEnded: PropTypes.func.isRequired,
};

const Transition = ({ height, handleOnEnded }) => {
  const transitionClassnames = classnames('transition-video', {});
  const dimensionStyle = {
    height: `${height}px`,
  };

  return (
    <div className="root" style={dimensionStyle}>
      <video
        onEnded={handleOnEnded}
        className={transitionClassnames}
        playsInline
        autoPlay
        muted
        loop
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

export default Transition;
