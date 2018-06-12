import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ObjectFrame from './ReferenceObjects/ObjectFrame';
import FadeSVG from 'components/common/Fade/FadeSVG';
import domains from './domains';

class ScaleDown extends Component {
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
  };

  handleTargetObjectLoaded = () => {
    this.setState({ targetObjectLoaded: true });
  }

  handleReferenceObjectLoaded = () => {
    this.setState({ referenceObjectLoaded: true });
  }

  render() {
    const {
      referenceObject,
      targetObjectURL,
    } = this.props;

    const {
      targetCurrentScale,
      referenceOpacity,
    } = this.state;

    return (
      <g style={{ transformOrigin: 'center', transform: 'scale(0.85)' }}>
        <g style={{
          transform: 'translate(0, 0) scale(1)',
          opacity: referenceOpacity,
        }}
        >
          {
            domains
              .enumValueOf(referenceObject)
              .render({ onLoad: this.handleReferenceObjectLoaded })
          }
        </g>

        <g style={{
            transform: `translate(0, 0) scale(${targetCurrentScale})`,
          }}
        >
          <ObjectFrame
            onLoad={this.handleTargetObjectLoaded}
            svgURL={targetObjectURL}
          />
        </g>
      </g>
    );
  }
}

export default ScaleDown;
