/** *********************************
* V4 Join
********************************** */

import React, { Component , cloneElement } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Braintree, HostedField } from 'react-braintree-fields';

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

    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
        <header className="header">
          <div className="icon"></div>
        </header>
        <h1>Joining Slooh is Easy</h1>
        <h2>Join Slooh in three easy steps!  Simply select a plan, enter your details, make your payment, and youre in!</h2>
        <h3>Step 3: PAYMENT INFO</h3>
        <br/>
        <br/>
        <iframe style={{'width': '100%', 'minHeight': '400px'}} src="https://eris.slooh.com/getHostedPaymentForm.php"></iframe>
        <Link to="/join/complete">Submit to Join!</Link>

      </div>
    )
  }
}

export default JoinStep3;
