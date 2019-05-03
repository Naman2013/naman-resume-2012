import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import calculatePercentage from 'utils/calculatePercentage';
import ObjectFrame from './ReferenceObjects/ObjectFrame';
import FadeSVG from '../../common/Fade/FadeSVG';
import SVGText from '../common/SVGText';
import domains from './domains';
import easingFunctions, { animateValues } from '../../../utils/easingFunctions';

class ScaleDown extends PureComponent {
  static TIME_BEFORE_FADING_REFERENCE = 2000;

  static TIME_TO_FADE_REFERENCE = 1000;

  static TIME_TO_FADE_IN_TARGET = 1000;

  static TIME_BEFORE_SCALING_TARGET = 2000;

  static TIME_TO_SCALE_TARGET = 1000;

  static TIME_BEFORE_COMPLETE = 3000;

  static propTypes = {
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectScale: PropTypes.number.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
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
    targetScale: 80,
    bottomTitle: '',

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
      const { changeTitle, phase4TopTitle, phase4BottomTitle } = this.props;
      changeTitle(phase4TopTitle);
      this.setState({ bottomTitle: phase4BottomTitle });
      this.scaleTarget();
    }, this.props.phase4Sec * 1000);
  }

  beginDelayToShowReference() {
    this.timerBeforeShowReference = setTimeout(() => {
      this.setState(() => ({ beginReference: true }));
      this.beginFadeReferenceTimer();
    }, this.props.startDelaySec * 1000);
  }

  beginFadeReferenceTimer() {
    clearTimeout(this.timerToFadeReference);
    this.timerToFadeReference = setTimeout(() => {
      const { changeTitle, phase2TopTitle, phase2BottomTitle } = this.props;
      changeTitle(phase2TopTitle);
      this.setState({ bottomTitle: phase2BottomTitle });
      this.fadeReferenceAnimationHandle = this.fadeReference();
    }, this.props.phase2Sec * 1000);
  }

  fadeReference() {
    const { changeTitle, phase3TopTitle, phase3BottomTitle } = this.props;
    changeTitle(phase3TopTitle);
    this.setState({ bottomTitle: phase3BottomTitle });
    return animateValues(
      {
        referenceOpacity: this.state.referenceOpacity,
        referenceNameOpacity: this.state.referenceNameOpacity,
      },
      this.props.phase3Sec * 1000,
      {
        referenceOpacity: 0.5,
        referenceNameOpacity: 0,
        onUpdate: ({ referenceOpacity, referenceNameOpacity }) => {
          this.setState(() => ({ referenceOpacity, referenceNameOpacity }));
        },
        onComplete: this.presentTargetObject.bind(this),
        ease: easingFunctions.easeInOutQuad,
      }
    );
  }

  presentTargetObject() {
    this.presentTargetObjectAnimationHandle = animateValues(
      {
        targetObjectOpacity: this.state.targetObjectOpacity,
      },
      ScaleDown.TIME_TO_FADE_IN_TARGET,
      {
        targetObjectOpacity: 1,
        onUpdate: ({ targetObjectOpacity }) => {
          this.setState(() => ({ targetObjectOpacity }));
        },
        onComplete: this.setTimerToBeginScalingTarget.bind(this),
        ease: easingFunctions.easeInOutQuad,
      }
    );
  }

  scaleTarget() {
    this.scaleTargetAnimationHandle = animateValues(
      {
        targetScale: this.state.targetScale,
      },
      ScaleDown.TIME_TO_SCALE_TARGET,
      {
        targetScale: this.props.targetObjectScale * 100,
        onUpdate: ({ targetScale }) => {
          this.setState(() => ({ targetScale }));
        },
        onComplete: this.prepareTearDown.bind(this),
        ease: easingFunctions.easeInOutQuad,
      }
    );
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
  };

  handleReferenceObjectLoaded = () => {
    this.setState({ referenceObjectLoaded: true });
  };

  completeScaleDown() {
    this.props.onComplete();
  }

  render() {
    const { domain, targetObjectURL, dimension } = this.props;

    const {
      targetScale,
      referenceOpacity,
      referenceNameOpacity,
      referenceObjectLoaded,
      beginReference,
      targetObjectOpacity,
    } = this.state;

    const beginAnimation = !(referenceObjectLoaded && beginReference);
    const midPoint = dimension / 2;
    const subjectDimensionSquare = dimension * 0.8;
    const objectFrameLocation = midPoint - subjectDimensionSquare / 2;
    const textLabelFontSize = dimension * 0.03;
    const targetSize = calculatePercentage(dimension, targetScale);
    const targetPosition = midPoint - targetSize / 2;

    const domainValues = domains.enumValueOf(domain);

    return (
      <g>
        <FadeSVG isHidden={beginAnimation}>
          <g
            style={{
              transform: 'scale(1)',
              opacity: referenceOpacity,
            }}
          >
            {domainValues.render({
              width: subjectDimensionSquare,
              height: subjectDimensionSquare,
              x: objectFrameLocation,
              y: objectFrameLocation,
              onLoadCallback: this.handleReferenceObjectLoaded,
            })}
          </g>

          <g style={{ opacity: referenceNameOpacity }}>
            <SVGText
              x={midPoint}
              y={dimension - dimension * 0.05}
              displayProperties={{ fontSize: `${textLabelFontSize}px` }}
              text={`Reference object = ${domainValues.titleText}`}
            />
          </g>
        </FadeSVG>

        <g
          style={{
            opacity: targetObjectOpacity,
          }}
        >
          <g>
            <ObjectFrame
              svgURL={targetObjectURL}
              width={targetSize}
              height={targetSize}
              x={targetPosition}
              y={targetPosition}
              onLoadCallback={this.handleTargetObjectLoaded}
            />
          </g>

          <SVGText
            x={midPoint}
            y={dimension - dimension * 0.05}
            displayProperties={{ fontSize: `${textLabelFontSize}px` }}
            text={`Target object = ${this.props.targetObjectName}`}
          />
        </g>
      </g>
    );
  }
}

export default ScaleDown;
