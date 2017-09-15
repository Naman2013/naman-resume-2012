import React from 'react';
import PropTypes from 'prop-types';
import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';

import railBorderPattern from '../../../assets/images/borders/rail-pattern.png';
import runBorderPattern from '../../../assets/images/borders/run-pattern.png';

function getFrameContentStyle(clipped = false) {
  if (!clipped) return {};

  return {
    WebkitClipPath: 'circle(32% at center)',
    MozClipPath: 'circle(32% at center)',
    clipPath: 'circle(32% at center)',
  };
}

const propTypes = {
  clipped: PropTypes.bool,
  zoomLevel: PropTypes.number,
};

const defaultProps = {
  clipped: false,
  zoomLevel: 1,
};

const Frame = ({ framedContent, clipped, children }) => (
  <div className="root">
    <div className="frame-content" style={getFrameContentStyle(clipped)}>
      { framedContent }
    </div>

    <div className="frame">
      <div className="top-rail" />
      <div className="left-rail" />
      <div className="right-rail" />
      <div className="bottom-rail" />
    </div>

    <div className="content">
      { children }
    </div>

    <style jsx>{`
      .root {
        font-family: ${monoFont};
        color: ${brightGreen};
        background-color: ${black};
        position: relative;
        min-width: 100%;
        min-height: 100%;
        margin: 0;
        padding: 0;
      }

      .frame-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      .frame {
        position: relative;
        border: 1px solid ${brightGreen};
      }

      .top-rail, .bottom-rail {
        background-image: url(${runBorderPattern});
        background-repeat: repeat-x;
        background-position: 1px;
        height: 13px;
        width: 100%;
      }

      .top-rail {
        transform: rotate(180deg);
      }

      .bottom-rail {
        clear: left;
      }

      .left-rail, .right-rail {
        background-image: url(${railBorderPattern});
        background-repeat: repeat-y;
        width: 13px;
        height: 100%;
        min-height: 600px;
      }

      .left-rail {
        float: left;
      }

      .right-rail {
        float: right;
        transform: rotate(180deg);
      }

      .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `}</style>
  </div>
);

Frame.propTypes = propTypes;
Frame.defaultProps = defaultProps;

export default Frame;
