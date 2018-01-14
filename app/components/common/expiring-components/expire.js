/**
  when the server timestamp and the expiration
  timestamps are known and we would like a callback
  to be called on expiration
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Expire extends Component {
  static propTypes = {
    expires: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
  };

  render() {
    return (

    );
  }
}
