import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ObjectFrame from './ReferenceObjects/ObjectFrame';
import FadeSVG from '../../../components/common/Fade/FadeSVG';
import domains from './domains';
import { animateValues } from '../../../utils/easingFunctions';

class ScaleDown extends Component {
  static BEFORE_START = 2000;
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
    onComplete: PropTypes.func.isRequired,
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
    } = this.props;

    const {
      targetCurrentScale,
      referenceOpacity,
      targetObjectLoaded,
      referenceObjectLoaded,
      beginReference,
    } = this.state;

    return (
      <g style={{ transformOrigin: 'center', transform: 'scale(0.80)' }}>
        <FadeSVG isHidden={!(referenceObjectLoaded && beginReference)}>
          <g style={{
            transform: 'translate(0, 0) scale(1)',
            opacity: referenceOpacity,
          }}
          >
            {
              domains
                .enumValueOf(referenceObject)
                .render({ onLoadCallback: this.handleReferenceObjectLoaded })
            }
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
            />
          </g>
        </FadeSVG>
      </g>
    );
  }
}

export default ScaleDown;
