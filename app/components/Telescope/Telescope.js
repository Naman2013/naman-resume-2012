import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import TelescopeFrame from './TelescopeFrame';
import Mask from './Mask';
import Image from './Image';
// import

import TELESCOPES_ENUM from './TelescopesEnum';

const testImage = 'https://polaris.slooh.com/chile/1/highmag/2018/04/04/2340_m43/m43_20180404_234018_0_kx3vo6_l.png';

class Telescope extends Component {
  static propTypes = {
    verticalResolution: PropTypes.number,
    horizontalResolution: PropTypes.number,
    increment: PropTypes.number,
  };

  static defaultProps = {
    verticalResolution: 75,
    horizontalResolution: 75,
    increment: 5,
  };

  state = {
    isTransitioningTelescope: false,
    horizontalResolution: this.props.horizontalResolution,
    verticalResolution: this.props.verticalResolution,
    increment: this.props.increment,
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

  componentWillReceiveProps({ horizontalResolution, verticalResolution }) {
    // TODO: are we switching telescopes?
    this.transitionTelescope();
    this.setState(() => ({ horizontalResolution, verticalResolution }));
  }

  transitionTelescopeInterval = null;

  transitionTelescope() {
    this.doTearDown();

    this.transitionTelescopeInterval = setInterval(() => {
      this.setState((prevState) => {
        return ({
          horizontalResolution: (prevState.horizontalResolution += 1),
          verticalResolution: (prevState.verticalResolution += 1),
        });
      });
    }, 500);
  }

  doTearDown() {
    if (this.transitionTelescopeInterval) {
      clearInterval(this.transitionTelescopeInterval)
    }
  }

  handleImageResize = (imageBounds) => {
    this.setState({ imageDimensions: { ...imageBounds } });
  }

  handlePortalResize = (contentBox) => {
    this.setState({ portalDimensions: { ...contentBox.bounds } });
  }

  handleTelescopeChange(targetTelescope) {
    this.setState(prevState => ({
      resolution: (prevState.resolution * 2),
    }));
  }

  render() {
    const {
      portalDimensions: { width, height },
      imageDimensions,
      increment,
      horizontalResolution,
      verticalResolution,
    } = this.state;

    const imageX = (imageDimensions.width - width) / 2;

    return (
      <Measure
        bounds
        onResize={this.handlePortalResize}
      >
        {
          ({ measureRef }) => (
            <div>
              <div className="faux-navigation">
                <button onClick={() => {
                  this.handleTelescopeChange(TELESCOPES_ENUM.TELESCOPE_ONE);
                }}
                >
                  Telescope One
                </button>

                <button onClick={() => {
                  this.handleTelescopeChange(TELESCOPES_ENUM.TELESCOPE_TWO);
                }}
                >
                  Telescope Two
                </button>
              </div>

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
                    horizontalResolution={horizontalResolution}
                    verticalResolution={verticalResolution}
                    increment={increment}
                    length={width}
                  />
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
            </div>
          )
        }
      </Measure>
    );
  }
}

export default Telescope;
