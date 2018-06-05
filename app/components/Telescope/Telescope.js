import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import noop from 'lodash/noop';
import Fade from 'components/common/Fade';
import FadeSVG from 'components/common/Fade/FadeSVG';
import easingFunctions, { animateValues } from 'utils/easingFunctions';
import { black } from 'styles/variables/colors';

import TelescopeFrame from './TelescopeFrame';
import Mask from './Mask';
import Scale from './Scale';
import UnitText from './TelescopeFrame/UnitText';
import HowBig from './HowBig';

import { getTelescope } from './telescopeConfig';
import FieldOfView from './FieldOfView/FieldOfView';

const MAX_RESOLUTION = 250;
const MAX_DURATION = 10000;
const ZOOM_OUT_DURATION = MAX_DURATION / 2;
const MAX_FOV_FLIPS = 5;

class Telescope extends Component {
  static propTypes = {
    activeInstrumentID: PropTypes.string.isRequired,
    previousInstrumentID: PropTypes.string.isRequired,
    render: PropTypes.func,
    verticalResolution: PropTypes.number,
    horizontalResolution: PropTypes.number,
    increment: PropTypes.number,
  };

  static defaultProps = {
    verticalResolution: 75,
    horizontalResolution: 75,
    increment: 5,
    render: noop,
  };

  state = {
    activeInstrumentID: this.props.activeInstrumentID,
    previousInstrumentID: this.props.previousInstrumentID,
    timesFlippedInstrumentBorder: 0,
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

  componentWillReceiveProps({
    activeInstrumentID,
    previousInstrumentID,
    horizontalResolution,
    verticalResolution,
  }) {
    if (activeInstrumentID !== this.props.activeInstrumentID) {
      this.setState(() => ({ activeInstrumentID, previousInstrumentID }));
      this.transitionZoomOut();
    }
  }

  currentZoomInTransition = null;
  currentZoomOutTransition = null;
  doFOVTransitionInterval = null;

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
      this.transitionPOV,
      {
        horizontal: MAX_RESOLUTION,
        vertical: MAX_RESOLUTION,
      },
      (remainingDuration > 0) ? remainingDuration : ZOOM_OUT_DURATION,
    );
  }

  transitionPOV() {
    this.doFOVTransitionInterval = setInterval(() => {
      this.setState((prevState) => {
        const {
          activeInstrumentID,
          previousInstrumentID,
          timesFlippedInstrumentBorder,
        } = prevState;

        if (timesFlippedInstrumentBorder >= MAX_FOV_FLIPS) {
          this.tearDownTransitionPOV();
          this.transitionZoomIn();
          return {};
        }

        const updatedFOVFlipState = {
          timesFlippedInstrumentBorder: (timesFlippedInstrumentBorder + 1),
          activeInstrumentID:
            (activeInstrumentID === this.state.activeInstrumentID)
              ? previousInstrumentID
              : activeInstrumentID,
          previousInstrumentID:
            (previousInstrumentID === this.state.previousInstrumentID)
              ? activeInstrumentID
              : previousInstrumentID,
        };

        return updatedFOVFlipState;
      });
    }, 500);
  }

  tearDownTransitionPOV() {
    if (this.doFOVTransitionInterval) {
      clearInterval(this.doFOVTransitionInterval);
      this.setState(() => ({ timesFlippedInstrumentBorder: 0 }));
    }
  }

  transitionZoomIn() {
    const targetTelescope = getTelescope(this.state.activeInstrumentID);
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
      portalDimensions: { width },
      imageDimensions,
      increment,
      horizontalResolution,
      verticalResolution,
      isTransitioningTelescope,
      activeInstrumentID,
    } = this.state;

    const activeInstrument = getTelescope(activeInstrumentID);
    const tickSpacing = (width / horizontalResolution);
    const midPoint = (width / 2);
    const arcMinuteLabelLetterSpacing = (width * 0.03);

    return (
      <Measure
        bounds
        onResize={this.handlePortalResize}
      >
        {
          ({ measureRef }) => (
            <div className="telescope">
              <div
                ref={measureRef}
                className="portal"
              >
                <Fade isHidden={isTransitioningTelescope}>
                  <div>
                    {this.props.render({ viewportHeight: width })}
                  </div>
                </Fade>

                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <FadeSVG isHidden={isTransitioningTelescope}>
                    <Mask />
                  </FadeSVG>

                  <FadeSVG isHidden={!isTransitioningTelescope}>
                    <FieldOfView
                      activeInstrumentID={this.state.activeInstrumentID}
                      previousInstrumentID={this.state.previousInstrumentID}
                      tickSpacing={tickSpacing}
                      canvasWidth={width}
                    />
                  </FadeSVG>

                  <TelescopeFrame
                    isGridVisible={isTransitioningTelescope}
                    isScaleVisible={!isTransitioningTelescope}
                    horizontalResolution={horizontalResolution}
                    verticalResolution={verticalResolution}
                    increment={increment}
                    length={width}
                  />

                  <FadeSVG isHidden={isTransitioningTelescope}>
                    <Scale
                      dimension={width}
                      scale={(tickSpacing * activeInstrument.directionMarkerLengthArcMinutes)}
                      scaleText={activeInstrument.directionMarkerLengthArcMinutes}
                      style={{ stroke: 'aqua' }}
                    />

                    <UnitText
                      text="arcminutes"
                      x={midPoint}
                      y={40}
                      style={{ letterSpacing: arcMinuteLabelLetterSpacing }}
                    />

                    <UnitText
                      text="arcminutes"
                      x={-midPoint}
                      y={(width - 40)}
                      style={{
                        letterSpacing: arcMinuteLabelLetterSpacing,
                        transform: 'rotate(-90)',
                      }}
                    />
                  </FadeSVG>

                  <HowBig />
                </svg>

                <style jsx>{`
                  .portal {
                    width: 100%;
                    overflow: hidden;
                    background: none;
                    position: relative;
                    background-color: ${black};
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
