/**
  uses render props
  calls an API when mounted
  expects the API to return an expiration time and server timestamp
  this also auto-reads the user information the API's need
  when expiration occurs will refetch from the API
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import isMatch from 'lodash/isMatch';
import axios from 'axios';

const { CancelToken } = axios;

const POST = 'POST';
const GET = 'GET';

const mapStateToProps = ({ user }) => ({
  user,
});

@connect(mapStateToProps, null)
class Request extends Component {
  static propTypes = {
    // provided by client
    serviceURL: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    serviceExpiresFieldName: PropTypes.string,
    method: PropTypes.string,
    model: PropTypes.shape({
      name: PropTypes.string.isRequired,
      model: PropTypes.func.isRequired,
    }),
    models: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      model: PropTypes.func.isRequired,
    })),
    requestBody: PropTypes.any, // any set due to disambiguity of the request

    // provided by global state
    user: PropTypes.shape({
      cid: PropTypes.string,
      token: PropTypes.string,
      at: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: {
      cid: '',
      token: '',
      at: '',
    },
    model: null,
    models: [],
    method: POST,
    serviceExpiresFieldName: 'expires',
  };

  state = {
    serviceResponse: {},
    modeledResponses: {},
    fetchingContent: true,
  };

  componentDidMount() {
    this.fetchServiceContent();
  }

  componentWillReceiveProps(nextProps) {
    if (!isMatch(this.props.requestBody, nextProps.requestBody)) {
      this.fetchServiceContent(nextProps.requestBody);
    }
  }

  componentWillUnmount() {
    this.tearDown();
  }

  timerPointer = undefined; // maintains a pointer to the running timer
  source = undefined;

  handleServiceResponse(result) {
    const {
      serviceExpiresFieldName,
      model,
      models,
    } = this.props;

    const consolidatedModels = [model, ...models];
    let modeledResponses = {};

    if (result[serviceExpiresFieldName]) {
      this.configureTimer({
        expires: result[serviceExpiresFieldName],
        timestamp: result.timestamp
      });
    }

    // build the models defined by the client
    consolidatedModels.forEach((_model) => {
      modeledResponses = Object.assign({}, modeledResponses, {
        [_model.name]: _model.model(result),
      });
    });

    this.setState(() => ({
      fetchingContent: false,
      serviceResponse: result,
      modeledResponses,
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

  fetchServiceContent(nextRequestBody) {
    const {
      serviceURL,
      method,
      requestBody,
      user,
    } = this.props;
    this.tearDown();
    this.setState({ fetchingContent: true, serviceResponse: {} });
    this.source = CancelToken.source();

    const validatedRequestBody = nextRequestBody || requestBody;

    if (method === POST) {
      axios.post(serviceURL, Object.assign({
        cancelToken: this.source.token,
      }, validatedRequestBody, { ...user }))
        .then(result => this.handleServiceResponse(result.data));
    }

    if (method === GET) {
      axios.get(serviceURL, {
        params: Object.assign({}, validatedRequestBody),
      }).then(result => this.handleServiceResponse(result.data));
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

export default Request;
