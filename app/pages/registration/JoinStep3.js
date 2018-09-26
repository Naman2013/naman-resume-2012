/** *********************************
* V4 Join
********************************** */

import React, { Component , cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Request from 'components/common/network/Request';

const mapStateToProps = ({ appConfig, isBraintreeReady }) => ({
  appConfig,
  isBraintreeReady,
});

@connect(mapStateToProps, null)
class JoinStep3 extends Component  {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleIframeTask);
  }

  handleIframeTask = (e) => {
    if (e.data) {
      const paymentNonceTokenData = e.data + '';
      if (paymentNonceTokenData.startsWith('token')) {
        console.log('Payment Token!! ' + paymentNonceTokenData);
      }
    }
  }

  render() {
    const JOIN_PAGE_ENDPOINT_URL = '/api/page/join';

    const joinPageModel = {
      name: 'JOIN_PAGE_MODEL',
      model: resp => ({
        pageHeading1: resp.pageHeading1,
        pageHeading2: resp.pageHeading2,
        sectionHeading: resp.sectionHeading,
        hostedPaymentFormURL: resp.hostedPaymentFormURL,
      }),
    };

    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
      <Request
        serviceURL={JOIN_PAGE_ENDPOINT_URL}
        model={joinPageModel}
        requestBody={{ 'callSource': 'selectSubscriptionPlan' }}
        render={({
          fetchingContent,
          modeledResponses: { JOIN_PAGE_MODEL },
        }) => (
          <Fragment>
            {
              !fetchingContent &&
                <Fragment>


                  <header className="header">
                    <div className="icon"></div>
                  </header>
                  <h1>{JOIN_PAGE_MODEL.pageHeading1}</h1>
                  <h2>{JOIN_PAGE_MODEL.pageHeading2}</h2>
                  <h3>Step 3: {JOIN_PAGE_MODEL.sectionHeading}</h3>
                  <br/>
                  <br/>
                  <iframe style={{'width': '100%', 'minHeight': '400px'}} src="{JOIN_PAGE_MODEL.hostedPaymentFormURL}"></iframe>
                  <Link to="/join/complete">Submit to Join!</Link>
                </Fragment>
              }
              </Fragment>
            )}
          />
      </div>
    )
  }
}

export default JoinStep3;
