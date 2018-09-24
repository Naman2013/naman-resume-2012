/** *********************************
* V4 Join
********************************** */

import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class JoinStep3 extends Component {
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
        <h3>Step 3: PAYMENT INFO</h3>
        <br/>
        <br/>
        <Link to="/join/complete">Submit to Join!</Link>
      </div>
    )
  }
}

export default JoinStep3;
