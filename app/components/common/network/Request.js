/**
  uses render props
  calls an API when mounted
  expects the API to return an expiration time and server timestamp
  this also auto-reads the user information the API's need
  when expiration occurs will refetch from the API
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compact from 'lodash/compact';
import isMatch from 'lodash/isMatch';
import axios from 'axios';
import { API } from 'app/api';
import { CancelToken } from 'axios';
import { validateResponseAccess } from 'app/modules/authorization/actions';

function getFieldsFromObj(obj, fields) {
  let result;
  try {
    result = Object.keys(obj)
      .filter(key => fields.includes(key))
      .reduce((resultedObj, key) => {
        resultedObj[key] = obj[key];
        return resultedObj;
      }, {});
  } catch (err) {
    console.error(
      'Error occured while computing list of user params, message: ',
      err.message
    );
    result = {};
  }
  return result;
}

const POST = 'POST';
const GET = 'GET';

const mapStateToProps = ({ user }) => ({
  user,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      validateResponseAccess,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Request extends Component {
  static propTypes = {
    // provided by client
    authorizationRedirect: PropTypes.bool,

    // service URL the requester is asking
    serviceURL: PropTypes.string.isRequired,

    // see render props on the internet for more information
    render: PropTypes.func.isRequired,

    // informs this component on a timestamp that may have
    // been provided as part of the RAW API response and will
    // recall the API with the original parameters and call the render prop
    serviceExpiresFieldName: PropTypes.string,

    // provided by caller, default is 'POST'
    method: PropTypes.oneOf([POST, GET]),

    // convience prop that takes a single model
    model: PropTypes.shape({
      name: PropTypes.string.isRequired,
      model: PropTypes.func.isRequired,
    }),

    // array of models focused on doing work against RAW API DATA
    // and will provide these generated responses as a MAP under `modeledResponses`
    models: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        model: PropTypes.func.isRequired,
      })
    ),

    // will be called with the RAW API DATA as an argument
    // TODO: should we also provide error?
    serviceResponseHandler: PropTypes.func,
    serviceFetchStartHandler: PropTypes.func,

    // object with the request body to be sent to the target API
    requestBody: PropTypes.shape({}),

    // provided by global state
    user: PropTypes.shape({
      cid: PropTypes.string,
      token: PropTypes.string,
      at: PropTypes.string,
    }),

    // possibility to paste or not info about user to request body
    withoutUser: PropTypes.bool,

    // list of fields that should be added as params to the request
    userParams: PropTypes.arrayOf(PropTypes.string),

    //call even the props value is not matched for telecscope call
    callLink: PropTypes.bool,
    leaveClub:PropTypes.string
  };

  static defaultProps = {
    authorizationRedirect: false,
    user: {
      cid: '',
      token: '',
      at: '',
    },
    model: null,
    models: [],
    method: POST,
    serviceExpiresFieldName: 'expires',
    serviceResponseHandler: null,
    serviceFetchStartHandler: null,
    requestBody: {},
    withoutUser: false,
    userParams: [],  
    leaveClub:''  
  };

  state = {
    serviceResponse: {},
    modeledResponses: {},
    fetchingContent: true,
  };

  componentDidMount() {
    const { serviceURL } = this.props;
    if (serviceURL) {
      
      this.fetchServiceContent();
    }
  }

  componentWillReceiveProps(nextProps) {
    
    const { user, requestBody, serviceURL,leaveClub } = this.props;
   
    if (
      (!isMatch(requestBody, nextProps.requestBody) ||
        !isMatch(user, nextProps.user) || nextProps.callLink || !isMatch(leaveClub,nextProps.leaveClub)) 
      
    ) {
      this.fetchServiceContent(nextProps.requestBody, nextProps.user);
    }
    
  }

  componentWillUnmount() {
    this.tearDown();
  }

  // maintains a pointer to the running timer
  timerPointer = undefined;

  source = undefined;

  // TODO: need to design validation to prevent client
  // challenges with debugging

  // TODO: how do we validate the response prior to running models?
  handleServiceResponse(result) {
    const {
      // actions should be removed
      actions,
      // this should be removed
      authorizationRedirect,
      serviceExpiresFieldName,
      serviceResponseHandler,
      model,
      models,
    } = this.props;

    const consolidatedModels = compact([model, ...models]);

    // refactor into reduce
    let modeledResponses = {};

    // brittle...
    if (result[serviceExpiresFieldName]) {
      this.configureTimer({
        expires: result[serviceExpiresFieldName],
        timestamp: result.timestamp,
      });
    }

    // TODO: this should go...
    //if (authorizationRedirect) {
    actions.validateResponseAccess(result);
    //}

    // this is part of the reduce refactor suggested from earlier
    // build the models defined by the client
    consolidatedModels.forEach(_model => {
      modeledResponses = Object.assign({}, modeledResponses, {
        [_model.name]: _model.model(result),
      });
    });

    if (serviceResponseHandler) {
      serviceResponseHandler(result);
    }

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

  fetchServiceContent(nextRequestBody, nextUser) {
    const {
      serviceURL,
      method,
      requestBody,
      user,
      withoutUser,
      userParams,
      serviceFetchStartHandler,
    } = this.props;

    // handle fetch start
    if (serviceFetchStartHandler) {
      serviceFetchStartHandler();
    }
    
    this.tearDown();
    this.setState({ fetchingContent: true, serviceResponse: {} });
    this.source = CancelToken.source();

    const validatedRequestBody = nextRequestBody || requestBody;

    const { cid, at, token } = nextUser || user;
    let resultedUserParams = nextUser || user;

    if (userParams.length > 0)
      resultedUserParams = getFieldsFromObj(nextUser || user, userParams);

    if (method === POST) {
      API.post(
        serviceURL,
        Object.assign(
          {
            cancelToken: this.source.token,
          },
          validatedRequestBody,
          withoutUser ? { cid, at, token } : resultedUserParams
        )
      ).then(result => this.handleServiceResponse(result.data));
    }

    if (method === GET) {
      API.get(serviceURL, {
        params: Object.assign({}, validatedRequestBody),
      }).then(result => this.handleServiceResponse(result.data));
    }
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}

export default Request;
