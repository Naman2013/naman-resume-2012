import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import Measure from 'react-measure';

class Image extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
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
    const { source, height, x } = this.props;

    return (
      <Measure
        bounds
        onResize={this.handleResize}
      >
        {
          ({ measureRef }) => (
            <image x={x} ref={measureRef} href={source} height={height} />
          )
        }
      </Measure>
    );
  }
}

export default Image;
