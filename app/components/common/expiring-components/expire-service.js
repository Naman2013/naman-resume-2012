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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const POST = 'POST';
const GET = 'GET';

class Expires extends Component {
  static propTypes = {
    serviceURL: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    protocol: PropTypes.string,
    requestBody: PropTypes.any, // any set due to disambiguity of the request
  };

  static defaultProps = {
    protocol: POST,
  };

  state = {
    serviceResponse: {},
    fetchingContent: false,
  };

  componentDidMount() {
    this.fetchServiceContent();
  }

  componentWillUnmount() {
    this.tearDown();
  }

  timerPointer: undefined; // maintains a pointer to the running timer

  handleServiceResponse(result) {
    this.setState(() => ({
      fetchingContent: false,
      serviceResponse: result,
    }));
  }

  tearDown() {
    clearTimeout(this.timerPointer);
  }

  resetServiceResponse() {
    this.setState({ serviceResponse: {} });
    this.tearDown();
  }

  fetchServiceContent() {
    const { serviceURL, protocol, requestBody } = this.props;
    this.setState({ fetchingContent: true });
    if (protocol === POST) {
      axios.post(serviceURL, requestBody)
        .then(result => this.handleServiceResponse(result.data));
    }

    if (protocol === GET) {
      axios.get(serviceURL, {
        params: Object.assign({}, requestBody),
      })
      .then(result => this.handleServiceResponse(result.data));
    }
  }

  render() {
    return (
      <div>
        {
          this.props.render(this.state)
        }
      </div>
    );
  }
}

export default Expires;
