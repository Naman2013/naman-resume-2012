import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

const defaultProps = {
  width: '100%',
  height: '100%',
};

function SVGClipView({ width, height }) {
  return (
    <div className="root">
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id="hole">
            <rect width={width} height={height} fill="white" />
            <circle r="38%" cx="50%" cy="50%" fill="black" />
          </mask>
        </defs>

        <rect id="portal" x="0" y="0" width={width} height={height} mask="url(#hole)" />
      </svg>

      <style jsx>{`
        .root {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

SVGClipView.propTypes = propTypes;
SVGClipView.defaultProps = defaultProps;

export default SVGClipView;
