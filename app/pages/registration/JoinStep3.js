/** ********************************************
* V4 Join - Step 3 - Collect Payment Details
********************************************** */

import React, { Component , cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Request from 'components/common/network/Request';
import { browserHistory } from 'react-router';
import { JOIN_PAGE_ENDPOINT_URL, SUBSCRIPTION_PLANS_ENDPOINT_URL } from 'services/registration/registration.js';
import Countdown from 'react-countdown-now';

const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

@connect(mapStateToProps, null)
class JoinStep3 extends Component  {

  state = {
    'paymentToken': '',
    'redirectInXSecondsOnExpiredSignupRequest': 0,
  };

  constructor(props) {
    super(props);

    this.handleJoinPageServiceResponse = this.handleJoinPageServiceResponse.bind(this);
    this.CountdownRenderer = this.CountdownRenderer.bind(this);
    this.CountdownExpiredRenderer = this.CountdownExpiredRenderer.bind(this);
    this.CountdownExpiredComplete = this.CountdownExpiredComplete.bind(this);
  }

  componentDidMount() {
    //Listen for a message from the Window/IFrames to capture the ECommerce Hosted Payment Form Messaging
    window.addEventListener('message', this.handleIframeTask);
  }

  handleIframeTask = (e) => {
    /* Verify there is data in this event) */
    if (e.data) {
      const paymentMessageData = e.data + '';

      /* make sure the data message we received is an ECommerce Payment Token */
      if (paymentMessageData.startsWith('__ECOMMERCE_PAYMENT_TOKEN__')) {
        const paymentNonceTokenData = String.prototype.replace.call(paymentMessageData, '__ECOMMERCE_PAYMENT_TOKEN__', '');
        this.setState( { 'paymentToken': paymentNonceTokenData });
        console.log('Payment Token!! ' + paymentNonceTokenData);
      }
    }
  }

  /* Obtain access to the join api service response and update the  redirectInX Seconds state */
  handleJoinPageServiceResponse(result) {
      /* update the account form details state so the correct hinText will show on each form field */
      this.setState({'redirectInXSecondsOnExpiredSignupRequest': result.redirectInXSecondsOnExpiredSignupRequest});
  }

  CountdownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      //console.log('The countdown has completed.....');
      return <Countdown date={Date.now() + this.state.redirectInXSecondsOnExpiredSignupRequest} renderer={this.CountdownExpiredRenderer} onComplete={this.CountdownExpiredComplete}/>;
    }
    else {
      // Render a countdown
      return <p style={{'fontSize': '1.3em', 'color': 'green'}}>This signup request will expire in {minutes}:{seconds}.</p>;
    }
  };

  CountdownExpiredRenderer = ({ hours, minutes, seconds, completed }) => {
    if (!completed) {
      // Render a countdown to redirect to the homepage
      return <p style={{'fontSize': '1.3em', 'fontWeight': 'bold', 'color': 'red'}}>Signup request expired...redirecting to the homepage in 00:{seconds}.</p>;
    }
  };

  CountdownExpiredComplete() {
    //console.log('Redirecting the user away from this page....');

    /* reset all browser localstorage data points for the Join flow */
    window.localStorage.removeItem('selectedPlanId');
    window.localStorage.removeItem('accountCreationType');
    window.localStorage.removeItem('join_accountFormDetails');
    window.localStorage.removeItem('googleProfileId');

    browserHistory.push('/');
  }

  render() {
    const joinPageModel = {
      name: 'JOIN_PAGE_MODEL',
      model: resp => ({
        pageHeading1: resp.pageHeading1,
        pageHeading2: resp.pageHeading2,
        sectionHeading: resp.sectionHeading,
        selectedSubscriptionPlan: resp.selectedSubscriptionPlan,
        hostedPaymentFormURL: resp.hostedPaymentFormURL,
        customerHasXSecondsToCompleteSignup: resp.customerHasXSecondsToCompleteSignup,
        redirectInXSecondsOnExpiredSignupRequest: resp.redirectInXSecondsOnExpiredSignupRequest,
      }),
    };

    const paymentTokenNonce = this.state.paymentToken;

    const selectedPlanId = window.localStorage.getItem('selectedPlanId');

    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
      <Request
        serviceURL={JOIN_PAGE_ENDPOINT_URL}
        model={joinPageModel}
        requestBody={{ 'callSource': 'providePaymentDetails', 'selectedPlanID': selectedPlanId }}
        serviceResponseHandler={this.handleJoinPageServiceResponse}
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
                  <Countdown date={Date.now() + JOIN_PAGE_MODEL.customerHasXSecondsToCompleteSignup} renderer={this.CountdownRenderer} onComplete={this.CountdownComplete}/>
                  <br/>
                  <br/>
                  <p style={{'fontSize': '1.2em'}}>Selected Plan: {JOIN_PAGE_MODEL.selectedSubscriptionPlan.planName} (Plan ID: {selectedPlanId})</p>
                  <br/>
                  <br/>
                  <p style={{'fontWeight': 'bold', 'fontSize': '1.3em'}}>Payment Token nonce:</p>
                  {paymentTokenNonce}<br/>
                  <br/>
                  <br/>
                  <iframe frameBorder="0" style={{'width': '100%', 'minHeight': '600px'}} src={JOIN_PAGE_MODEL.hostedPaymentFormURL}></iframe>
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
