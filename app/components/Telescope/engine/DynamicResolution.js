import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DynamicResolution extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    horizontalResolution: PropTypes.number,
    verticalResolution: PropTypes.number,
  };

  static defaultProps = {
    horizontalResolution: 75,
    verticalResolution: 75,
  };

  state = {
    horizontalResolution: this.props.horizontalResolution,
    verticalResolution: this.props.verticalResolution,
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return this.props.render();
  }
}

export default DynamicResolution;
