/**
  when the server timestamp and the expiration
  timestamps are known and we would like a callback
  to be called on expiration

  TODO: use expires and timestamp to create timer
  TODO: on timer expiration, call the callback
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Expire extends Component {
  static propTypes = {
    expires: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    onExpires: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      this.props.children
    );
  }
}
