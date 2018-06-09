import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGText from '../common/SVGText';
import domains from './domains';

class HowBig extends Component {
  static propTypes = {
    dimension: PropTypes.number.isRequired,
  };

  state = {};

  render() {
    const { dimension } = this.props;

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
      </g>
    );
  }
}

export default HowBig;
