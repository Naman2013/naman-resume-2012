import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import easingFunctions, { animateValues } from 'utils/easingFunctions';
import TelescopeFrame from './TelescopeFrame';
import Mask from './Mask';
import Image from './Image';
import Fade from 'components/common/Fade';

import { getTelescope } from './telescopeConfig';
import FieldOfView from './FieldOfView/FieldOfView';

const testImage = 'https://polaris.slooh.com/chile/1/highmag/2018/04/04/2340_m43/m43_20180404_234018_0_kx3vo6_l.png';

const MAX_RESOLUTION = 120;
const MAX_DURATION = 5000;
const ZOOM_OUT_DURATION = MAX_DURATION / 2;

class Telescope extends Component {
  static propTypes = {
    activeInstrumentID: PropTypes.string.isRequired,
    previousInstrumentID: PropTypes.string.isRequired,
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

  componentWillReceiveProps({ activeInstrumentID, horizontalResolution, verticalResolution }) {
    if (activeInstrumentID !== this.props.activeInstrumentID) {
      this.transitionZoomOut();
    }
  }

  currentZoomInTransition = null;
  currentZoomOutTransition = null;

  transitionZoomOut() {
    let remainingDuration = 0;

    this.setState(() => ({ isTransitioningTelescope: true }));

    if (this.currentZoomOutTransition) {
      remainingDuration = this.currentZoomOutTransition.cancel().getRemainingTime();
    }

    if (this.currentZoomInTransition) {
      remainingDuration =
        ZOOM_OUT_DURATION - this.currentZoomInTransition.cancel().getRemainingTime();
    }

    this.currentZoomInTransition = null;
    this.currentZoomOutTransition = null;

    this.currentZoomOutTransition = this.transitionTo(
      this.transitionZoomIn,
      {
        horizontal: MAX_RESOLUTION,
        vertical: MAX_RESOLUTION,
      },
      (remainingDuration > 0) ? remainingDuration : ZOOM_OUT_DURATION,
    );
  }

  transitionZoomIn() {
    const targetTelescope = getTelescope(this.props.activeInstrumentID);
    this.currentZoomInTransition = this.transitionTo(
      this.telescopeTransitionComplete,
      {
        horizontal: targetTelescope.PORTAL.horizontal,
        vertical: targetTelescope.PORTAL.vertical,
      },
    );
  }

  telescopeTransitionComplete() {
    this.setState(() => ({ isTransitioningTelescope: false }));
  }

  transitionTo(
    onCompleteCallback,
    { horizontal, vertical },
    duration = ZOOM_OUT_DURATION,
  ) {
    const { horizontalResolution, verticalResolution } = this.state;

    // returns a control interface that will allow us to control an animation that is already running
    return animateValues(
      { hr: horizontalResolution, vr: verticalResolution },
      duration,
      {
        hr: horizontal,
        vr: vertical,
        onUpdate: (values) => {
          this.setState(() => ({
            horizontalResolution: values.hr,
            verticalResolution: values.vr,
          }));
        },
        onComplete: onCompleteCallback.bind(this),
        ease: easingFunctions.easeInOutQuad,
      },
    );
  }

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
      increment,
      horizontalResolution,
      verticalResolution,
      isTransitioningTelescope,
    } = this.state;

    const imageX = (imageDimensions.width - width) / 2;
    const tickSpacing = (width / horizontalResolution);

    return (
      <Measure
        bounds
        onResize={this.handlePortalResize}
      >
        {
          ({ measureRef }) => (
            <div>
              <div
                ref={measureRef}
                className="portal"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <Fade isHidden={isTransitioningTelescope}>
                    <g>
                      <Image
                        x={-imageX}
                        source={testImage}
                        height={height}
                        onResize={this.handleImageResize}
                      />
                    </g>

                    <Mask />
                  </Fade>

                  <Fade isHidden={!isTransitioningTelescope}>
                    <FieldOfView
                      activeInstrumentID={this.props.activeInstrumentID}
                      previousInstrumentID={this.props.previousInstrumentID}
                      tickSpacing={tickSpacing}
                      canvasWidth={width}
                    />
                  </Fade>

                  <TelescopeFrame
                    isGridVisible={isTransitioningTelescope}
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
                    background: black;
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
