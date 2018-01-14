/**
  uses render props
  calls an API when mounted
  expects the API to return an expiration time and server timestamp
  when expiration occurs will refetch from the API

  TODO: use axios to make service call
  TODO: set timeout based on timestamp and expires
  TODO: refetch API data on expires
  TODO: tear down the timeout when the component unmounts
*/

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Expires extends Component {
  static propTypes = {
    serviceURL: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    serviceResponse: undefined,
  };

  componentDidMount() {

  }

  render() {
    const { serviceResponse } = this.state;
    return (
      <div>
        {
          serviceResponse &&
            cloneElement(this.props.children, ...serviceResponse)
        }
      </div>
    );
  }
}

export default Expires;
