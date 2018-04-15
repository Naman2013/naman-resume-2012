import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import TelescopeFrame from './TelescopeFrame';
import Mask from './Mask';
import Image from './Image';
import Grid from './Grid';

const testImage = 'https://polaris.slooh.com/chile/1/highmag/2018/04/04/2340_m43/m43_20180404_234018_0_kx3vo6_l.png';

class Telescope extends Component {
  static propTypes = {
    resolution: PropTypes.number,
    increment: PropTypes.number,
  };

  static defaultProps = {
    resolution: 10,
    increment: 5,
  };

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
    this.setState({ imageDimensions: { ...imageBounds } });
  }

  handlePortalResize = (contentBox) => {
    this.setState({ portalDimensions: { ...contentBox.bounds } });
  }

  render() {
    const {
      portalDimensions: { width, height },
      imageDimensions,
    } = this.state;

    const { resolution, increment } = this.props;
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

                <Mask />

                <TelescopeFrame
                  resolution={resolution}
                  increment={increment}
                  length={width}
                />

                {
                  /*

                <Grid
                  resolution={resolution}
                  increment={increment}
                  dimension={width}
                />
                   */
                }
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
