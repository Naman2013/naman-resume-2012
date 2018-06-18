import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ObjectFrame from './ReferenceObjects/ObjectFrame';
import FadeSVG from '../../../components/common/Fade/FadeSVG';
import SVGText from '../common/SVGText';
import domains from './domains';
import easingFunctions, { animateValues } from '../../../utils/easingFunctions';

class ScaleDown extends Component {
  static BEFORE_START = 1000;
  static FADE_OUT_DURATION = 500;
  static SCALE_DOWN_DURATION = 1000;
  static TIME_BEFORE_FADING_REFERENCE = 2000;
  static TIME_TO_FADE_REFERENCE = 1000;
  static TIME_TO_FADE_IN_TARGET = 1000;
  static TIME_BEFORE_SCALING_TARGET = 2000;
  static TIME_TO_SCALE_TARGET = 3000;
  static TIME_BEFORE_COMPLETE = 3000;

  static propTypes = {
    referenceObject: PropTypes.oneOf([
      'SOLAR_SYSTEM',
      'STAR',
      'MILKY_WAY',
      'DEEP_SPACE',
    ]).isRequired,
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectScale: PropTypes.number.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    dimension: PropTypes.number,
    onComplete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    dimension: 500,
  };

  state = {
    targetObjectLoaded: false,
    referenceObjectLoaded: false,
    referenceOpacity: 1,
    referenceNameOpacity: 1,

    targetObjectOpacity: 0,
    targetScale: 1,

    beginReference: false,
  };

  componentDidMount() {
    this.beginDelayToShowReference();
  }

  componentWillUnmount() {
    clearTimeout(this.timerBeforeShowReference);
    clearTimeout(this.timerToFadeReference);
    clearTimeout(this.timerBeforeBeginScaling);
    clearTimeout(this.timerBeforeComplete);
  }

  setTimerToBeginScalingTarget() {
    this.timerBeforeBeginScaling = setTimeout(() => {
      this.scaleTarget();
    }, ScaleDown.TIME_BEFORE_SCALING_TARGET);
  }

  beginDelayToShowReference() {
    this.timerBeforeShowReference = setTimeout(() => {
      this.setState(() => ({ beginReference: true }));
      this.beginFadeReferenceTimer();
    }, ScaleDown.BEFORE_START);
  }

  beginFadeReferenceTimer() {
    clearTimeout(this.timerToFadeReference);
    this.timerToFadeReference = setTimeout(() => {
      this.fadeReferenceAnimationHandle = this.fadeReference();
    }, ScaleDown.TIME_BEFORE_FADING_REFERENCE);
  }

  fadeReference() {
    return animateValues({
      referenceOpacity: this.state.referenceOpacity,
      referenceNameOpacity: this.state.referenceNameOpacity,
    }, ScaleDown.TIME_TO_FADE_REFERENCE, {
      referenceOpacity: 0.25,
      referenceNameOpacity: 0,
      onUpdate: ({ referenceOpacity, referenceNameOpacity }) => {
        this.setState(() => ({ referenceOpacity, referenceNameOpacity }));
      },
      onComplete: this.presentTargetObject.bind(this),
      ease: easingFunctions.easeInOutQuad,
    });
  }

  presentTargetObject() {
    this.presentTargetObjectAnimationHandle = animateValues({
      targetObjectOpacity: this.state.targetObjectOpacity,
    }, ScaleDown.TIME_TO_FADE_IN_TARGET, {
      targetObjectOpacity: 1,
      onUpdate: ({ targetObjectOpacity }) => {
        this.setState(() => ({ targetObjectOpacity }));
      },
      onComplete: this.setTimerToBeginScalingTarget.bind(this),
      ease: easingFunctions.easeInOutQuad,
    });
  }

  scaleTarget() {
    this.scaleTargetAnimationHandle = animateValues({
      targetScale: this.state.targetScale,
    }, ScaleDown.TIME_TO_SCALE_TARGET, {
      targetScale: this.props.targetObjectScale,
      onUpdate: ({ targetScale }) => {
        this.setState(() => ({ targetScale }));
      },
      onComplete: this.prepareTearDown.bind(this),
      ease: easingFunctions.easeInOutQuad,
    });
  }

  prepareTearDown() {
    this.timerBeforeComplete = setTimeout(() => {
      this.props.onComplete();
    }, ScaleDown.TIME_BEFORE_COMPLETE);
  }

  timerBeforeShowReference = undefined;
  timerToFadeReference = undefined;
  timerBeforeBeginScaling = undefined;
  timerBeforeComplete = undefined;
  fadeReferenceAnimationHandle = undefined;
  presentTargetObjectAnimationHandle = undefined;
  scaleTargetAnimationHandle = undefined;

  handleTargetObjectLoaded = () => {
    this.setState({ targetObjectLoaded: true });
  }

  handleReferenceObjectLoaded = () => {
    this.setState({ referenceObjectLoaded: true });
  }

  completeScaleDown() {
    this.props.onComplete();
  }

  render() {
    const {
      referenceObject,
      targetObjectURL,
      dimension,
    } = this.props;

    const {
      targetScale,
      referenceOpacity,
      referenceNameOpacity,
      targetObjectLoaded,
      referenceObjectLoaded,
      beginReference,
      targetObjectOpacity,
    } = this.state;

    const beginAnimation = !(referenceObjectLoaded && beginReference);
    const midPoint = (dimension / 2);
    const subjectDimensionSquare = (dimension * 0.8);
    const objectFrameLocation = (midPoint - (subjectDimensionSquare / 2));
    const textLabelFontSize = (dimension * 0.03);

    return (
      <g>
        <FadeSVG isHidden={beginAnimation}>
          <g style={{
            transform: 'scale(1)',
            opacity: referenceOpacity,
          }}
          >
            {
              domains
                .enumValueOf(referenceObject)
                .render({
                  width: subjectDimensionSquare,
                  height: subjectDimensionSquare,
                  x: objectFrameLocation,
                  y: objectFrameLocation,
                  onLoadCallback: this.handleReferenceObjectLoaded,
                })
            }
          </g>

          <g style={{ opacity: referenceNameOpacity }}>
            <SVGText
              x={midPoint}
              y={(dimension - (dimension * 0.05))}
              displayProperties={{ fontSize: `${textLabelFontSize}px` }}
              text={`Reference object = ${domains.enumValueOf(referenceObject).titleText}`}
            />
          </g>
        </FadeSVG>

        <g style={{
            opacity: targetObjectOpacity,
          }}
        >
          <g style={{
            transform: `scale(${targetScale})`,
            transformOrigin: 'center',
            }}
          >
            <ObjectFrame
              svgURL={targetObjectURL}
              width={subjectDimensionSquare}
              height={subjectDimensionSquare}
              x={objectFrameLocation}
              y={objectFrameLocation}
              onLoadCallback={this.handleTargetObjectLoaded}
            />
          </g>

          <SVGText
            x={midPoint}
            y={(dimension - (dimension * 0.05))}
            displayProperties={{ fontSize: `${textLabelFontSize}px` }}
            text={`Target object = ${this.props.targetObjectName}`}
          />
        </g>
      </g>
    );
  }
}

export default ScaleDown;
