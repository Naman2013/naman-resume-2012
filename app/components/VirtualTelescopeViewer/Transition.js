import React from 'react';
import classnames from 'classnames';
import { black } from '../../styles/variables/colors';

// TODO: render letterboxed video
// TODO: vertically/horizontally align the video element...

const Transition = ({ width, height }) => {
  const transitionClassnames = classnames('transition-video', {});
  const dimensionStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <div className="root" style={dimensionStyle}>
      <video className={transitionClassnames} playsInline autoPlay muted loop>
        <source src="https://vega.slooh.com/video/home/stars-high-720.webm" type="video/webm" />
        <source src="https://vega.slooh.com/video/home/stars-high-720.mp4" type="video/mp4" />
      </video>

      <style jsx>{`
        .root {
          background: ${black};
        }

        .video-transition: {

        }
      `}</style>
    </div>
  );
}

export default Transition;
