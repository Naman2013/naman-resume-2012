import React, { Component } from 'react';
import PropTypes from 'prop-types';
import domains from './domains';
import { primaryFont } from 'styles/variables/fonts';

class HowBig extends Component {
  static propTypes = {
    targetDomain: PropTypes.string,
    previousDomain: PropTypes.string,
  };

  state = {};

  render() {
    return (
      <g>
        <text
          x={0}
          y={0}
          className="text"
        >
          How Big?
        </text>

        <style jsx>
          {`
            .text {
              font-family: ${primaryFont};
              fill: aqua;
              font-size: 200px;
            }
          `}
        </style>
      </g>
    );
  }
}

export default HowBig;
