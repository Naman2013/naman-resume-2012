import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import domains from './domains';
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

  static ARTWORK_VS_CANVAS_SIZE_PERCENTAGE = 0.8;

  static propTypes = {
    dimension: PropTypes.number,
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    referenceObject: PropTypes.string.isRequired,
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
    referenceScale: 1,
    showReferenceText: true,
    referencePosition: {
      x: ((this.props.dimension / 2) - ((this.props.dimension * ScaleUp.ARTWORK_VS_CANVAS_SIZE_PERCENTAGE) / 2)),
      y: ((this.props.dimension / 2) - ((this.props.dimension * ScaleUp.ARTWORK_VS_CANVAS_SIZE_PERCENTAGE) / 2)),
    },
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
      x: this.state.referencePosition.x,
      y: this.state.referencePosition.y,
    }, ScaleUp.DURATION_OF_SCALE_DOWN_REFERENCE, {
      referenceScale: this.props.referenceObjectScale,
      x: (this.state.referencePosition.x / 2),
      y: (this.state.referencePosition.y / 2),
      onUpdate: ({ referenceScale, x, y }) => {
        this.setState(() => ({
          referenceScale,
          referencePosition: { x, y },
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
      x: this.state.referencePosition.x,
      y: this.state.referencePosition.y,
    }, ScaleUp.DURATION_TO_MOVE_REFERENCE, {
      x: -140,
      y: -140,
      onUpdate: ({ x, y }) => {
        this.setState(() => ({ referencePosition: { x, y } }));
      },
      onComplete: () => { this.prepareToIntroduceTargetObject() },
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
      ease: easingFunctions.easeInOutQuad,
    });
  }

  timerDelayPresentReference = undefined;
  timerDelayScaleReference = undefined;
  timerDelayToAnimateReference = undefined;
  timerDelayToPresentTarget = undefined;

  animateScaleOfReference = undefined;
  animateReferenceMoveHandle = undefined;

  render() {
    const {
      referenceObject,
      targetObjectURL,
      targetObjectName,
      dimension,
    } = this.props;

    const {
      referenceObjectLoaded,
      targetObjectLoaded,
      showReference,
      referenceScale,
      referencePosition,
      showReferenceText,
    } = this.state;

    const displayReferenceObject = (showReference && referenceObjectLoaded);
    const artworkDimension = (dimension * 0.8);
    const midPoint = (dimension / 2);
    const staticArtworkPosition = (midPoint - (artworkDimension / 2));
    const textLabelFontSize = (dimension * 0.03);

    return (
      <g>
        <FadeSVG isHidden={!(displayReferenceObject)}>
          <g style={{
              transform: `translate(${(referencePosition.x)}px, ${referencePosition.y}px) scale(${referenceScale})`,
              transformOrigin: 'center',
            }}
          >
            {
              domains
                .enumValueOf(referenceObject)
                .render({
                  width: artworkDimension,
                  height: artworkDimension,
                  onLoadCallback: this.handleReferenceObjectLoaded,
                })
            }
          </g>
          <FadeSVG isHidden={!(showReferenceText)}>
            <SVGText
              text={`Reference object = ${domains.enumValueOf(referenceObject).titleText}`}
              x={midPoint}
              y={(dimension - (dimension * 0.05))}
              displayProperties={{
                fontSize: `${textLabelFontSize}px`,
              }}
            />
          </FadeSVG>
        </FadeSVG>

        <FadeSVG isHidden={!(targetObjectLoaded)}>
          <g style={{ opacity: '0' }}>
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
