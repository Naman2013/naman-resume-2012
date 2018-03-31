import React, { Component } from 'react';
import Measure from 'react-measure';
import { generateRow } from './generateRow';
import ROW_CONFIGURATION_ENUM from './rowConfigurationEnum';

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
  };

  handlePortalResize = (contentBox) => {
    this.setState({ portalDimensions: { ...contentBox.bounds } });
  }

  render() {
    const { portalDimensions: { width, height } } = this.state;

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
                <g className="tick-marks">
                  <g>
                    {generateRow(width, 100, ROW_CONFIGURATION_ENUM.TOP)}
                  </g>

                  <g>
                    {generateRow(width, 100, ROW_CONFIGURATION_ENUM.BOTTOM)}
                  </g>

                  <g>
                    {generateRow(width, 100, ROW_CONFIGURATION_ENUM.LEFT)}
                  </g>

                  <g>
                    {generateRow(width, 100, ROW_CONFIGURATION_ENUM.RIGHT)}
                  </g>
                </g>

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
