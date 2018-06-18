import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGText from '../common/SVGText';
import AutoFadeSVG from '../../../components/common/Fade/AutoFadeSVG';
import ScaleUp from './ScaleUp';
import ScaleDown from './ScaleDown';


class HowBig extends Component {
  static propTypes = {
    dimension: PropTypes.number.isRequired,
    referenceObjectScale: PropTypes.number.isRequired,
    referenceObject: PropTypes.oneOf([
      'SOLAR_SYSTEM',
      'STAR',
      'MILKY_WAY',
      'DEEP_SPACE',
    ]).isRequired,
    targetObjectScale: PropTypes.number.isRequired,
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
  };

  state = {};

  render() {
    const {
      dimension,
      referenceObjectScale,
      referenceObject,
      targetObjectScale,
      targetObjectName,
      targetObjectURL,
      onComplete,
    } = this.props;

    const isScaledUp = (targetObjectScale > referenceObjectScale);

    return (
      <g>
        {
          (isScaledUp)
            ? <ScaleUp />
            : <ScaleDown
              targetObjectURL={targetObjectURL}
              targetObjectScale={targetObjectScale}
              targetObjectName={targetObjectName}
              referenceObject={referenceObject}
              onComplete={onComplete}
            />
        }

        <AutoFadeSVG duration={0.5}>
          <SVGText
            text="HOW BIG?"
            x={(dimension / 2)}
            y={(50)}
            displayProperties={{
              fontSize: '20px',
            }}
          />
        </AutoFadeSVG>
      </g>
    );
  }
}

export default HowBig;
