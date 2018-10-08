/** *********************************
* V4 Join
********************************** */

import React, { Component , cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Request from 'components/common/network/Request';
import { JOIN_PAGE_ENDPOINT_URL, SUBSCRIPTION_PLANS_ENDPOINT_URL } from 'services/registration/registration.js';
import Countdown from 'react-countdown-now';

const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

@connect(mapStateToProps, null)
class JoinStep3 extends Component  {

  state = {
    'paymentToken': '',
  };

  constructor(props) {
    super(props);

    this.CountdownRenderer = this.CountdownRenderer.bind(this);
    this.CountdownExpiredRenderer = this.CountdownExpiredRenderer.bind(this);
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

  CountdownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      console.log('The countdown has completed.....');
      return <Countdown date={Date.now() + 15000} renderer={this.CountdownExpiredRenderer}/>;
    }
    else {
      // Render a countdown
      return <p>Please complete signup: {minutes}:{seconds} before this request expires.</p>;
    }
  };

  CountdownExpiredRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      console.log('Redirecting the user away from this page....');
      window.localStorage.removeItem('selectedPlanId');
      this.props.navigation.navigate('/');
    }
    else {
      // Render a countdown
      return <p>Signup was not completed in the allotted time.....Resetting join flow in: {seconds} seconds.</p>;
    }
  };

  render() {
    const joinPageModel = {
      name: 'JOIN_PAGE_MODEL',
      model: resp => ({
        pageHeading1: resp.pageHeading1,
        pageHeading2: resp.pageHeading2,
        sectionHeading: resp.sectionHeading,
        selectedSubscriptionPlan: resp.selectedSubscriptionPlan,
        hostedPaymentFormURL: resp.hostedPaymentFormURL,
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
                  <Countdown date={Date.now() + 3000} renderer={this.CountdownRenderer}/>
                  <br/>
                  <br/>
                  <p>Selected Plan: {JOIN_PAGE_MODEL.selectedSubscriptionPlan.planName} (Plan ID: {selectedPlanId})</p>
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
