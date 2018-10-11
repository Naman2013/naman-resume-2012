/** *********************************
* V4 Join - Step 1 - Select a Plan
********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
class JoinStep1SchoolSelection extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
        <p><b>Classroom (Teacher) account has been selected......</b></p>
        <p>School / District Lookup and Selection</p>
        <br/>
        <br/>
        <br/>
        <Link to="/join/step1"><Button theme={{ margin: '0 auto'}} type="button" text="Go Back"/></Link><br/>
        <br/>
        <br/>
        <Link to="/join/step2"><Button theme={{ margin: '0 auto'}} type="button" text="Continue"/></Link><br/>
      </div>
    )
  }
}

const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

export default connect(mapStateToProps, null)(JoinStep1SchoolSelection);
