import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import FadeSVG from '../../../components/common/Fade/FadeSVG';
import SVGText from '../common/SVGText';
import ObjectFrame from './ReferenceObjects/ObjectFrame';
import easingFunctions, { animateValues } from '../../../utils/easingFunctions';

class ScaleUp extends Component {
  static BEFORE_START = 1000;
  static PAUSE_BEFORE_SCALING_REFERENCE = 2000;
  static DURATION_OF_SCALE_DOWN_REFERENCE = 500;
  static PAUSE_BEFORE_MOVING_REFERENCE = 1000;
  static DURATION_TO_MOVE_REFERENCE = 500;
  static PAUSE_BEFORE_INTRODUCING_TARGET_OBJECT = 1500;
  static ANIMATE_TARGET_DURATION = 500;
  static PAUSE_BEFORE_COMPLETE = 2000;

  static ARTWORK_VS_CANVAS_SIZE_PERCENTAGE = 0.8;

  static propTypes = {
    dimension: PropTypes.number,
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    referenceObjectURL: PropTypes.string.isRequired,
    referenceObjectName: PropTypes.string.isRequired,
    referenceObjectScale: PropTypes.number.isRequired,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    dimension: 500,
    onComplete: noop,
  };

  state = {
    referenceObjectLoaded: false,
    targetObjectLoaded: false,
    showReference: false,
    referenceScale: 80,
    showReferenceText: true,
    referencePositionModifier: 100,
    targetObjectOpacity: 0,
  };

  componentDidMount() {
    this.beginDelayToShowReference();
  }

  componentWillUnmount() {
    clearTimeout(this.timerDelayPresentReference);
    clearTimeout(this.timerDelayScaleReference);
    clearTimeout(this.timerDelayToAnimateReference);
    clearTimeout(this.timerDelayToPresentTarget);
    clearTimeout(this.timerPauseBeforeComplete);
  }

  handleReferenceObjectLoaded = () => {
    this.setState({ referenceObjectLoaded: true });
  }

  handleTargetObjectLoaded = () => {
    this.setState({ targetObjectLoaded: true });
  }

  beginDelayToShowReference() {
    setTimeout(() => {
      this.presentReference();
    }, ScaleUp.BEFORE_START);
  }

  presentReference() {
    this.setState({ showReference: true });
    this.timerDelayScaleReference = setTimeout(() => {
      this.scaleReference();
    }, ScaleUp.PAUSE_BEFORE_SCALING_REFERENCE);
  }

  scaleReference() {
    this.animateScaleOfReference = animateValues({
      referenceScale: this.state.referenceScale,
    }, ScaleUp.DURATION_OF_SCALE_DOWN_REFERENCE, {
      referenceScale: (this.props.referenceObjectScale * 100),
      onUpdate: ({ referenceScale }) => {
        this.setState(() => ({
          referenceScale,
        }));
      },
      onComplete: () => {
        this.prepareToAnimateReferenceLocation();
      },
      ease: easingFunctions.easeInOutQuad,
    });
  }

  prepareToAnimateReferenceLocation() {
    this.timerDelayToAnimateReference = setTimeout(() => {
      this.animateMoveReference();
    }, ScaleUp.PAUSE_BEFORE_MOVING_REFERENCE);
  }

  animateMoveReference() {
    this.animateReferenceMoveHandle = animateValues({
      referencePositionModifier: this.state.referencePositionModifier,
    }, ScaleUp.DURATION_TO_MOVE_REFERENCE, {
      referencePositionModifier: 17,
      onUpdate: ({ referencePositionModifier }) => {
        this.setState(() => ({ referencePositionModifier }));
      },
      onComplete: () => { this.prepareToIntroduceTargetObject(); },
      ease: easingFunctions.easeInOutQuad,
    });
  }

  prepareToIntroduceTargetObject() {
    this.timerDelayPresentReference = setTimeout(() => {
      this.setState(() => ({ showReferenceText: false }));
      this.animateIntroduceTargetObject();
    }, ScaleUp.PAUSE_BEFORE_INTRODUCING_TARGET_OBJECT);
  }

  animateIntroduceTargetObject() {
    this.animateTargetObjectOpacity = animateValues({
      targetObjectOpacity: this.state.targetObjectOpacity,
    }, ScaleUp.ANIMATE_TARGET_DURATION, {
      targetObjectOpacity: 1,
      onUpdate: ({ targetObjectOpacity }) => {
        this.setState(() => ({ targetObjectOpacity }));
      },
      onComplete: () => { this.complete(); },
      ease: easingFunctions.easeInOutQuad,
    });
  }

  complete() {
    this.timerPauseBeforeComplete = setTimeout(() => {
      this.props.onComplete();
    }, ScaleUp.PAUSE_BEFORE_COMPLETE);
  }

  timerDelayPresentReference = undefined;
  timerDelayScaleReference = undefined;
  timerDelayToAnimateReference = undefined;
  timerDelayToPresentTarget = undefined;
  timerPauseBeforeComplete = undefined;

  animateScaleOfReference = undefined;
  animateReferenceMoveHandle = undefined;

  render() {
    const {
      referenceObjectURL,
      referenceObjectName,
      targetObjectURL,
      targetObjectName,
      dimension,
    } = this.props;

    const {
      referenceObjectLoaded,
      showReference,
      referenceScale,
      referencePositionModifier,
      showReferenceText,
    } = this.state;

    const displayReferenceObject = (showReference && referenceObjectLoaded);
    const artworkDimension = (dimension * 0.8);
    const midPoint = (dimension / 2);
    const staticArtworkPosition = (midPoint - (artworkDimension / 2));
    const textLabelFontSize = (dimension * 0.03);
    const showTargetObject = showReferenceText;

    const referenceScalePercentage = (referenceScale / 100);
    const referenceSize = (dimension * referenceScalePercentage);
    const referencePosition = (midPoint - (referenceSize / 2)) * (referencePositionModifier / 100);
    // dimension 550 (200) modifier = 0
    // console.log(referencePosition);

    return (
      <g>
        <FadeSVG isHidden={!(displayReferenceObject)}>
          <g style={{
              // transform: `translate(${(referencePosition.x)}px, ${referencePosition.y}px) scale(${referenceScale})`,
              transformOrigin: 'center',
            }}
          >
            <ObjectFrame
              svgURL={referenceObjectURL}
              width={referenceSize}
              height={referenceSize}
              x={referencePosition}
              y={referencePosition}
              onLoadCallback={this.handleReferenceObjectLoaded}
            />
          </g>
          <FadeSVG isHidden={!showReferenceText}>
            <SVGText
              text={`Reference object = ${referenceObjectName}`}
              x={midPoint}
              y={(dimension - (dimension * 0.05))}
              displayProperties={{
                fontSize: `${textLabelFontSize}px`,
              }}
            />
          </FadeSVG>
        </FadeSVG>

        <FadeSVG isHidden={showTargetObject}>
          <g>
            <ObjectFrame
              svgURL={targetObjectURL}
              width={artworkDimension}
              height={artworkDimension}
              x={staticArtworkPosition}
              y={staticArtworkPosition}
              onLoadCallback={this.handleTargetObjectLoaded}
            />

            <SVGText
              text={`Target object = ${targetObjectName}`}
              x={midPoint}
              y={(dimension - (dimension * 0.05))}
              displayProperties={{ fontSize: `${textLabelFontSize}px` }}
            />
          </g>
        </FadeSVG>
      </g>
    );
  }
}

export default ScaleUp;
