import React, { Component } from 'react';
import Measure from 'react-measure';
import TickFrame from './TickFrame';
import Image from './Image';
import testImage from '../../../stories/assets/sample-telescope-images/Canary_Four_SS_Normal_1119x845.png';

class Telescope extends Component {
  state = {
    portalDimensions: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    imageDimensions: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  };

  handleImageResize = (imageBounds) => {
    this.setState({ imageDimensions: { ...imageBounds } })
  }

  handlePortalResize = (contentBox) => {
    this.setState({ portalDimensions: { ...contentBox.bounds } });
  }

  render() {
    const {
      portalDimensions: { width, height },
      imageDimensions,
    } = this.state;

    const imageX = (imageDimensions.width - width) / 2;

    return (
      <Measure
        bounds
        onResize={this.handlePortalResize}
      >
        {
          ({ measureRef }) => (
            <div
              ref={measureRef}
              className="portal"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <Image
                    x={-imageX}
                    source={testImage}
                    height={height}
                    onResize={this.handleImageResize}
                  />
                </g>

                <g>
                  <defs>
                    <mask id="hole">
                      <rect width="100%" height="100%" fill="white" />
                      <circle r="38%" cx="50%" cy="50%" fill="black" />
                    </mask>
                  </defs>

                  <rect id="portal" x="0" y="0" width="100%" height="100%" mask="url(#hole)" />
                </g>

                <TickFrame count={50} length={width} />

              </svg>


              <style jsx>{`
                .portal {
                  width: 100%;
                  overflow: hidden;
                  background: yellow;
                  position: relative;
                }

                .portal:before {
                  content: '';
                  padding-top: 100%;
                  float: left;
                }

                svg {
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                }
              `}
              </style>
            </div>
          )
        }
      </Measure>
    );
  }
}

export default Telescope;
