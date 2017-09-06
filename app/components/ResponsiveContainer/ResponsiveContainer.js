/**
  ResponsiveContainer will report its current size back to its host
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
  - component mounts and binds an event listener
  - component records its own width and height and provides it to the child
*/

class ResponsiveContainer extends Component {
  static defaultProps = {
    width: 300,
    height: 200,
  };

  componentDidMount() {
    window.addEventListener('resize', this.props.onResizeHandler);
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.props.onResizeHandler);
  }

  render() {
    const { width, height } = this.props;

    const containerStyle = {
      width,
      height,
    };

    return (
      <div style={containerStyle}>
        { this.props.children }
      </div>
    );
  }
}

ResponsiveContainer.propTypes = {
  onResizeHandler: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ResponsiveContainer;
