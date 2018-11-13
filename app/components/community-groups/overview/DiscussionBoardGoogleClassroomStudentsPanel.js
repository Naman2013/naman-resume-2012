/***********************************
* V4 Community Group Google Classroom Students Panel
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Request from 'components/common/network/Request';
import axios from 'axios';
import Button from 'components/common/style/buttons/Button';
import { GOOGLE_CLASSROOM_IMPORTSTUDENTS_PANEL_ENDPOINT_URL } from 'services/classroom/classroom';

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
class DiscussionBoardGoogleClassroomStudentsPanel extends Component {

  static propTypes = {
    pageMeta: shape({ }),
  };

  static defaultProps = {
    pageMeta: { },
  };

  state = {
      refreshModeStr: "false",
  }

  addStudentToDiscussionGroup = (firstName, lastName, emailAddress, googleProfileId) => {
    //do nothing yet....
    console.log(firstName + " : " + lastName + " : " + emailAddress + " : " + googleProfileId);
  }

  render() {
    const {
      actions,
      pageMeta,
      user,
      discussionGroupId,
    } = this.props;

    const {
      refreshModeStr,
    } = this.state;

    return (
      <div className="root">
        <div className="invite-container">
          {/*
            Passing the forceRequestToUpdate parameter to the API so that a state
            change will force the request object to re-call the API.
          */}

          <Request
            id="getGroupInvitationPanel"
            serviceURL={GOOGLE_CLASSROOM_IMPORTSTUDENTS_PANEL_ENDPOINT_URL}
            requestBody={{ forceRequestToUpdate: refreshModeStr, cid: user.cid, at: user.at, token: user.token, groupId: discussionGroupId }}
            render={({
              fetchingContent,
              serviceResponse,
            }) => (
              <Fragment>
                {fetchingContent && <div>
                  <br/>
                  <br/>
                  <h3>Loading Google Classroom Students</h3>
                  <br/>
                  <br/>
                </div>
                }
                {
                  !fetchingContent &&
                    <div>
                      <br/>
                      <h3>{serviceResponse.customerLinksData.sectionHeading1}</h3>
                      <br/>
                      <h3>{serviceResponse.customerLinksData.sectionHeading2}</h3>
                      <br/>
                      <h4>{serviceResponse.customerLinksData.sectionHeading_LicenseInfo}</h4>
                      <br/>
                      {serviceResponse.customerLinksData.hasStudentsToInvite && <p style={{"color": "blue", "fontSize": "1.0em", "fontStyle": "italic"}}><br/>* - Please note, clicking "Add Student" will add this student to your club and consume one of your available licenses.<br/><br/></p>}
                      {serviceResponse.customerLinksData.customerLinks.length > 0 ? (<table style={{'border': '1px', 'width': '100%'}}>
                        <tbody>
                          <tr>
                          {serviceResponse.customerLinksData.columnHeadings.map((columnHeading, i) =>
                              <th key={`heading_` + i}>{columnHeading}</th>
                          )}
                          </tr>
                          {serviceResponse.customerLinksData.customerLinks.map((customerLink, i) =>
                              <tr key={`data_` + i}>
                                <td key={`data_name_` + i}>{customerLink.name}</td>
                                <td key={`data_emailaddress_` + i}>{customerLink.emailaddress}</td>
                                <td key={`data_accountstatus_` + i}>{customerLink.status}</td>
                                <td key={`data_lastactivity_` + i}>{customerLink.lastactivity}</td>

                                {/* only one of these conditions will apply */}
                                {customerLink.alreadyAMemberOfThisGroup === false && customerLink.canBeInvitedToThisGroup === true && <td key={`data_clubstatus_` + i}><Button type="button" text={customerLink.invitationPrompt} onClickEvent={() => this.addStudentToDiscussionGroup(customerLink.firstname, customerLink.lastname, customerLink.emailaddress, customerLink.googleprofileid)} /></td>}
                                {customerLink.alreadyAMemberOfThisGroup === true && customerLink.canBeInvitedToThisGroup === false && <td key={`data_clubstatus_` + i}>Active</td>}
                                {customerLink.alreadyAMemberOfThisGroup === false && customerLink.canBeInvitedToThisGroup === false && <td key={`data_clubstatus_` + i}>Pending</td>}
                              </tr>
                          )}
                        </tbody>
                      </table>) : <p>There are no students in this Google Classroom, please update your Google Classroom first.</p>}
                      <br/>
                      <br/>
                    </div>
                    }
                  </Fragment>
                )}
              />
        </div>

      <style jsx>{`
        .root {
        }

        .discuss-container {
          margin-top: 15px;
        }

        .button-actions {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .submit-button {

        }

      `}</style>
    </div>
    )
  }
}

export default DiscussionBoardGoogleClassroomStudentsPanel;
