import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

class ScaleUp extends Component {
  static defaultProps = {
    dimension: PropTypes.number,
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectScale: PropTypes.number.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    referenceObject: PropTypes.string.isRequired,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    dimension: 500,
    onComplete: noop,
  };

  state = {};

  render() {
    return (
      <g></g>
    );
  }
}

export default ScaleUp;
