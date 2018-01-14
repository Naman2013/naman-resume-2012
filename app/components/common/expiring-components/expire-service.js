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
import isMatch from 'lodash/isMatch';
import axios from 'axios';

const CancelToken = axios.CancelToken;

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

  componentWillReceiveProps(nextProps) {
    if (!isMatch(this.props.requestBody, nextProps.requestBody)) {
      this.fetchServiceContent();
    }
  }

  componentWillUnmount() {
    this.tearDown();
  }

  timerPointer = undefined; // maintains a pointer to the running timer
  source = undefined;

  handleServiceResponse(result) {
    if (result.expires) {
      this.configureTimer({ expires: result.expires, timestamp: result.timestamp });
    }

    this.setState(() => ({
      fetchingContent: false,
      serviceResponse: result,
    }));
  }

  tearDown() {
    clearTimeout(this.timerPointer);
    if (this.source && this.source.cancel) {
      this.source.cancel('cancel request');
    }
  }

  configureTimer({ expires, timestamp }) {
    clearTimeout(this.timerPointer);
    const milliExpires = expires * 1000;
    const milliTimestamp = timestamp * 1000;
    const remainingTime = milliExpires - milliTimestamp;
    if (remainingTime > 1000) {
      this.timerPointer = setTimeout(::this.fetchServiceContent, remainingTime);
    }
  }

  fetchServiceContent() {
    const { serviceURL, protocol, requestBody } = this.props;
    this.tearDown();
    this.setState({ fetchingContent: true, serviceResponse: {} });
    this.source = CancelToken.source();

    if (protocol === POST) {
      axios.post(serviceURL, Object.assign({
        cancelToken: this.source.token,
      }, requestBody))
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
