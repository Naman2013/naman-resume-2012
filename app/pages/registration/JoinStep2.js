/** *********************************
* V4 Join
********************************** */

import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class JoinStep2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="icon"></div>
        </header>
        <h1>Joining Slooh is Easy</h1>
        <h2>Join Slooh in three easy steps!  Simply select a plan, enter your details, make your payment, and youre in!</h2>
        <h3>Step 2: ACCOUNT DETAILS</h3>
        <br/>
        <br/>
        <Link to="/join/step1">Go Back</Link><br/>
        <br/>
        <Link to="/join/step3">Goto Payment</Link>
      </div>
    )
  }
}

export default JoinStep2;
