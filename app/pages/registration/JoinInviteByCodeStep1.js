/** *********************************
* V4 Join by Invitation Code
********************************** */

import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class JoinByInviteCodeStep1 extends Component {
  constructor(props) {
    super(props);

    /* reset all browser localstorage data points for the Join flow */
    window.localStorage.removeItem('pending_cid');
    window.localStorage.removeItem('selectedPlanId');
    window.localStorage.removeItem('selectedSchoolId');
    window.localStorage.removeItem('accountCreationType');
    window.localStorage.removeItem('googleProfileId');
    window.localStorage.removeItem('googleProfileEmail');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
  }

  render() {
    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
        <h1>Welcome.....</h1>
        <br/>
        <br/>
        <p>Please enter in your email address and your invitiation code to continue:</p>
        <br/>
        <br/>
        <p>Your Email Address:</p>
        <p>Invitation Code:</p>
        <br/>
        <p>First Name:</p>
        <p>Last Name:</p>
        <p>Display Name:</p>
        <p>Password:</p>
        <p>Confirm Password:</p>
        <p>Are you under the Age of 13?</p>
        <br/>
        <br/>
        <Link to="/join/step2">Submit to Join!</Link>
      </div>
    )
  }
}

export default JoinByInviteCodeStep1;
