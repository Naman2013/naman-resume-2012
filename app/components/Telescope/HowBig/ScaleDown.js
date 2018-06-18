import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ObjectFrame from './ReferenceObjects/ObjectFrame';
import FadeSVG from '../../../components/common/Fade/FadeSVG';
import SVGText from '../common/SVGText';
import domains from './domains';
import { animateValues } from '../../../utils/easingFunctions';

class ScaleDown extends Component {
  static BEFORE_START = 1000;
  static FADE_OUT_DURATION = 500;
  static SCALE_DOWN_DURATION = 1000;

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
    targetCurrentScale: 1,
    targetObjectLoaded: false,
    referenceObjectLoaded: false,
    referenceOpacity: 1,

    beginReference: false,
  };

  componentDidMount() {
    this.beginDelayToShowReference();
  }

  componentWillUnmount() {
    clearTimeout(this.timerBeforeShowReference);
  }

  beginDelayToShowReference() {
    this.timerBeforeShowReference = setTimeout(() => {
      this.setState(() => ({ beginReference: true }));
    }, ScaleDown.BEFORE_START);
  }

  timerBeforeShowReference = undefined;

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
      targetCurrentScale,
      referenceOpacity,
      targetObjectLoaded,
      referenceObjectLoaded,
      beginReference,
    } = this.state;

    const beginAnimation = !(referenceObjectLoaded && beginReference);
    const midPoint = (dimension / 2);
    const subjectDimensionSquare = (dimension * 0.8);

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
                  x: (midPoint - (subjectDimensionSquare / 2)),
                  y: (midPoint - (subjectDimensionSquare / 2)),
                  onLoadCallback: this.handleReferenceObjectLoaded,
                })
            }
          </g>

          <g>
            <SVGText
              x={midPoint}
              y={(dimension - (dimension * 0.05))}
              text={`Reference object = ${domains.enumValueOf(referenceObject).titleText}`}
            />
          </g>
        </FadeSVG>

        <FadeSVG isHidden>
          <g style={{
              transform: `translate(0, 0) scale(${targetCurrentScale})`,
            }}
          >
            <ObjectFrame
              onLoadCallback={this.handleTargetObjectLoaded}
              svgURL={targetObjectURL}
              width={subjectDimensionSquare}
              height={subjectDimensionSquare}
            />
          </g>
          <g>
            <SVGText text={domains.enumValueOf(referenceObject).titleText} />
          </g>
        </FadeSVG>
      </g>
    );
  }
}

export default ScaleDown;
