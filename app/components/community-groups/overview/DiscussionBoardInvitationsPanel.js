/***********************************
* V4 Community Group Invitations Panel
* for Classroom / Astronomy Clubs
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  astronaut,
} from '../../../styles/variables/colors_tiles_v4';
import { screenLarge } from 'styles/variables/breakpoints';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;
const mapStateToProps = ({
  user,
}) => ({
  user,
});

@connect(mapStateToProps, null)
class DiscussionBoardInvitationsPanel extends Component {

  static propTypes = {
    pageMeta: shape({ }),
  };

  static defaultProps = {
    pageMeta: { },
  };

  render() {
    const {
      actions,
      pageMeta,
      user,
    } = this.props;

    return (
      <div className="root">
        <div className="invite-container">
          <h2>Manage Classroom Students / Astronomy Club Members</h2>
          <h3>2 / 30 student licenses in use.</h3>
          <br/>
          <p>Mock Data:</p>
          <table style={{'border': '1px', 'width': '100%'}}>
            <thead>
              <th>Student First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Status</th>
              <th>Last Activity</th>
            </thead>

            <tbody>
              <tr>
                <td>Todd</td>
                <td>Reisel</td>
                <td>todd@slooh.com</td>
                <td>Invitation Sent</td>
                <td>n/a</td>
              </tr>
              <tr>
                <td>Christine</td>
                <td>Reisel</td>
                <td>creiselct@gmail.com</td>
                <td>Active</td>
                <td>10/29/2018 18:17 UTC</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <br/>
          <br/>
          Invite New Student
        </div>

      <style jsx>{`
        .root {
        }

        .discuss-container {
          margin-top: 15px;
        }




      `}</style>
    </div>
    )
  }
}

export default DiscussionBoardInvitationsPanel;
