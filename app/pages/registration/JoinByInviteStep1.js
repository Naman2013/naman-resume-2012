/** *********************************
* V4 Join
********************************** */

import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class JoinByInviteStep1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const myData = this.props.params;

    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
        <table style={{'marginLeft': 'auto', 'marginRight': 'auto'}} width="300px">
        {Object.keys(myData).map(function (key) {
            if ( typeof myData[key] != 'object') {
              var val = new String(myData[key]);

              return( <tr key={'row_' + key}>
                  <td style={{'width': '30%'}} key={'k_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                  <td key={'v_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
                    {myData[key]}
                  </td>
                </tr>
              );
            }
          })
        }
        </table>
        <h1>Welcome: treisel@gmail.com</h1>
        <br/>
        <br/>
        <p>You have been invited by your Teacher: todd@slooh.com</p>
        <br/>
        <br/>
        <p>First Name:</p>
        <p>Last Name:</p>
        <p>Display Name:</p>
        <p>Login Email Address:</p>
        <p>Confirm Email Address:</p>
        <p>Password:</p>
        <p>Confirm Password:</p>
        <p>Are you under the Age of 13?</p>

        <Link to="/join/step2">Submit to Join!</Link>
      </div>
    )
  }
}

export default JoinByInviteStep1;
