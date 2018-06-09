import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PresentingTitle from './PresentingTitle';
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
        <PresentingTitle dimension={dimension} />
      </g>
    );
  }
}

export default HowBig;
