/** *********************************
* V4 Join
********************************** */

import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class JoinStep1 extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h1>Joining Slooh is Easy</h1>
        <h2>Join Slooh in three easy steps!  Simply select a plan, enter your details, make your payment, and youre in!</h2>
        <h3>Step 1: Select your Membership</h3>
        <br/>
        <br/>
        <Link to="/join/step2">Select Plan</Link><br/>
      </div>
    )
  }
}

const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

export default connect(mapStateToProps, null)(JoinStep1);
