import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGText from '../common/SVGText';
import ScaleUp from './ScaleUp';
import ScaleDown from './ScaleDown';
import domains from './domains';

class HowBig extends Component {
  static propTypes = {
    dimension: PropTypes.number.isRequired,
    referenceScale: PropTypes.number.isRequired,
    targetScale: PropTypes.number.isRequired,
  };

  state = {};

  render() {
    const { dimension, referenceScale, targetScale } = this.props;
    const isScaledUp = (targetScale > referenceScale);

    return (
      <g>
        <SVGText
          text="HOW BIG?"
          x={(dimension / 2)}
          y={(dimension - 100)}
          displayProperties={{
            fontSize: '20px',
          }}
        />

        {
          (isScaledUp)
            ? <ScaleUp />
            : <ScaleDown />
        }
      </g>
    );
  }
}

export default HowBig;
