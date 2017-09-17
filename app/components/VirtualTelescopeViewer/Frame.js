import React, { Component } from 'react';
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

class Frame extends Component {
  state = {
    width: '100%',
    height: '600px',
  };

  handleDimensionUpdate = ({ width, height }) => {
    this.setState({
      width,
      height,
    });
  }

  render() {
    const { width, height } = this.state;

    const {
      clipped,
      framedContent,
      children,
    } = this.props;


    // TODO: animate width and height adjustments
    // TODO: pass handleUpdateDimension down to be changed by the content of the view
    // TODO: width of the content is always 100%, the bottom of the viewer needs to move down as far as the height of the photo

    return (
      <div className="root" style={{ width, height }}>
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
  }
}

Frame.propTypes = propTypes;
Frame.defaultProps = defaultProps;

export default Frame;
