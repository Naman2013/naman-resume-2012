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
    referenceObjectName: PropTypes.string.isRequired,
    referenceObjectURL: PropTypes.string.isRequired,
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
      referenceObjectName,
      referenceObjectURL,
      targetObjectScale,
      targetObjectName,
      targetObjectURL,
      onComplete,
    } = this.props;

    const isScaledUp = (targetObjectScale > referenceObjectScale);
    const titleFontSize = (dimension * 0.05);

    return (
      <g>
        {
          (isScaledUp)
            ? <ScaleUp
              dimension={dimension}
              targetObjectURL={targetObjectURL}
              targetObjectName={targetObjectName}
              referenceObjectScale={referenceObjectScale}
              referenceObjectName={referenceObjectName}
              referenceObjectURL={referenceObjectURL}
              onComplete={onComplete}
            />
            : <ScaleDown
              dimension={dimension}
              targetObjectURL={targetObjectURL}
              targetObjectScale={targetObjectScale}
              targetObjectName={targetObjectName}
              referenceObjectName={referenceObjectName}
              referenceObjectURL={referenceObjectURL}
              onComplete={onComplete}
            />
        }

        <AutoFadeSVG duration={0.5}>
          <SVGText
            text="HOW BIG?"
            x={(dimension / 2)}
            y={(dimension * 0.07)}
            displayProperties={{
              fontSize: `${titleFontSize}px`,
            }}
          />
        </AutoFadeSVG>
      </g>
    );
  }
}

export default HowBig;
