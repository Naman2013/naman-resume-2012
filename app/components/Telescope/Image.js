import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import Measure from 'react-measure';

class Image extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    onResize: PropTypes.func,
    x: PropTypes.number.isRequired,
  };

  static defaultProps = {
    onResize: noop,
  };

  handleResize = (contentBox) => {
    this.props.onResize(contentBox.bounds);
  };

  render() {
    const {
      source, height, width, x,
    } = this.props;

    return (
      <Measure
        bounds
        onResize={this.handleResize}
      >
        {
          ({ measureRef }) => (
            <image style={{ width: 'auto' }} x={x} ref={measureRef} xlinkHref={source} height={height} width="120%" />
          )
        }
      </Measure>
    );
  }
}

export default Image;
