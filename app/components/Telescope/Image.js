import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import Measure from 'react-measure';

class Image extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    onResize: PropTypes.func,
  }

  static defaultProps = {
    onResize: noop,
  };

  state = {};

  handleResize = () => {}

  render() {
    const { source, height } = this.props;

    return (
      <image href={source} height={height} />
    );
  }
}

export default Image;
