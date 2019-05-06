import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import convertToDecimal from 'utils/convertToDecimal';
import calculatePercentage from 'utils/calculatePercentage';
import FadeSVG from '../../common/Fade/FadeSVG';
import SVGText from '../common/SVGText';
import ObjectFrame from './ReferenceObjects/ObjectFrame';
import domains from './domains';
import easingFunctions, { animateValues } from '../../../utils/easingFunctions';

class ScaleUp extends PureComponent {
  static PAUSE_BEFORE_MOVING_REFERENCE = 1000;

  static DURATION_TO_MOVE_REFERENCE = 500;

  static PAUSE_BEFORE_INTRODUCING_TARGET_OBJECT = 1500;

  static ANIMATE_TARGET_DURATION = 500;

  static PAUSE_BEFORE_COMPLETE = 2000;

  static ARTWORK_VS_CANVAS_SIZE_PERCENTAGE = 0.8;

  static propTypes = {
    dimension: PropTypes.number,
    targetImageURL: PropTypes.string.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
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
    bottomTitle: '',
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
  };

  handleTargetObjectLoaded = () => {
    this.setState({ targetObjectLoaded: true });
  };

  beginDelayToShowReference() {
    setTimeout(() => {
      this.presentReference();
    }, this.props.startDelaySec * 1000);
  }

  presentReference() {
    const { changeTitle, phase1TopTitle, phase1BottomTitle } = this.props;

    this.setState({ showReference: true, bottomTitle: phase1BottomTitle });
    changeTitle(phase1TopTitle);
    this.timerDelayScaleReference = setTimeout(() => {
      this.scaleReference();
    }, this.props.phase1Sec * 1000);
  }

  scaleReference() {
    const { changeTitle, phase2TopTitle, phase2BottomTitle } = this.props;
    changeTitle(phase2TopTitle);
    this.animateScaleOfReference = animateValues(
      {
        referenceScale: this.state.referenceScale,
      },
      this.props.phase2Sec * 1000,
      {
        referenceScale: this.props.referenceObjectScale * 100,
        onUpdate: ({ referenceScale }) => {
          this.setState(() => ({
            referenceScale,
            bottomTitle: phase2BottomTitle,
          }));
        },
        onComplete: () => {
          this.prepareToAnimateReferenceLocation();
        },
        ease: easingFunctions.easeInOutQuad,
      }
    );
  }

  prepareToAnimateReferenceLocation() {
    this.timerDelayToAnimateReference = setTimeout(() => {
      this.animateMoveReference();
    }, ScaleUp.PAUSE_BEFORE_MOVING_REFERENCE);
  }

  animateMoveReference() {
    const { changeTitle, phase3TopTitle, phase3BottomTitle } = this.props;
    changeTitle(phase3TopTitle);
    this.animateReferenceMoveHandle = animateValues(
      {
        referencePositionModifier: this.state.referencePositionModifier,
      },
      this.props.phase3Sec * 1000,
      {
        referencePositionModifier: 17,
        onUpdate: ({ referencePositionModifier }) => {
          this.setState(() => ({
            referencePositionModifier,
            bottomTitle: phase3BottomTitle,
          }));
        },
        onComplete: () => {
          this.prepareToIntroduceTargetObject();
        },
        ease: easingFunctions.easeInOutQuad,
      }
    );
  }

  prepareToIntroduceTargetObject() {
    this.timerDelayPresentReference = setTimeout(() => {
      this.setState(() => ({ showReferenceText: false }));
      this.animateIntroduceTargetObject();
    }, ScaleUp.PAUSE_BEFORE_INTRODUCING_TARGET_OBJECT);
  }

  animateIntroduceTargetObject() {
    const { changeTitle, phase4TopTitle, phase4BottomTitle } = this.props;
    changeTitle(phase4TopTitle);
    this.animateTargetObjectOpacity = animateValues(
      {
        targetObjectOpacity: this.state.targetObjectOpacity,
      },
      this.props.phase4Sec * 1000,
      {
        targetObjectOpacity: 1,
        onUpdate: ({ targetObjectOpacity }) => {
          this.setState(() => ({
            targetObjectOpacity,
            bottomTitle: phase4BottomTitle,
          }));
        },
        onComplete: () => {
          this.complete();
        },
        ease: easingFunctions.easeInOutQuad,
      }
    );
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
    const { domain, targetImageURL, targetObjectName, dimension } = this.props;

    const {
      referenceObjectLoaded,
      showReference,
      referenceScale,
      referencePositionModifier,
      showReferenceText,
      bottomTitle,
    } = this.state;

    const displayReferenceObject = showReference && referenceObjectLoaded;
    const artworkDimension = dimension * 0.8;
    const midPoint = dimension / 2;
    const staticArtworkPosition = midPoint - artworkDimension / 2;
    const textLabelFontSize = dimension * 0.03;
    const showTargetObject = showReferenceText;

    const referenceSize = calculatePercentage(dimension, referenceScale);

    const referencePosition =
      (midPoint - referenceSize / 2) * (referencePositionModifier / 100);

    const domainValues = domains.enumValueOf(domain);

    return (
      <g>
        <FadeSVG isHidden={!displayReferenceObject}>
          <g
            style={{
              transformOrigin: 'center',
            }}
          >
            {domainValues.render({
              width: referenceSize,
              height: referenceSize,
              x: referencePosition,
              y: referencePosition,
              onLoadCallback: this.handleReferenceObjectLoaded,
            })}
          </g>
          <FadeSVG isHidden={!showReferenceText}>
            <SVGText
              text={bottomTitle}
              x={midPoint}
              y={dimension - dimension * 0.05}
              displayProperties={{
                fontSize: `${textLabelFontSize}px`,
              }}
            />
          </FadeSVG>
        </FadeSVG>

        <FadeSVG isHidden={showTargetObject}>
          <g>
            <ObjectFrame
              svgURL={targetImageURL}
              width={artworkDimension}
              height={artworkDimension}
              x={staticArtworkPosition}
              y={staticArtworkPosition}
              onLoadCallback={this.handleTargetObjectLoaded}
            />

            <SVGText
              text={bottomTitle}
              x={midPoint}
              y={dimension - dimension * 0.05}
              displayProperties={{ fontSize: `${textLabelFontSize}px` }}
            />
          </g>
        </FadeSVG>
      </g>
    );
  }
}

export default ScaleUp;
