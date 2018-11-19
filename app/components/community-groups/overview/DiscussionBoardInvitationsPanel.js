/***********************************
* V4 Community Group Invitations Panel
* for Classroom / Astronomy Clubs
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Request from 'components/common/network/Request';
import axios from 'axios';
import Button from 'components/common/style/buttons/Button';
import DiscussionBoardInviteNewMemberToSlooh from 'components/community-groups/overview/DiscussionBoardInviteNewMemberToSlooh';
import { CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL } from 'services/classroom/classroom';
import { CREATE_CUSTOMER_LINK_INVITATION_ENDPOINT_URL } from 'services/registration/registration';

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

  state = {
      inInviteMode: false,
      refreshModeStr: "false",
      inviteStatusMessage: '',
  }

  toggleInviteMode = () => {
    this.setState(() => ({
      inInviteMode: !this.state.inInviteMode,
      refreshModeStr: (!this.state.inInviteMode === true ? "yes" : "no"),
    }));

    /* As a result of the toggle, the component Request object will re-fire.
       This IS expected behavior as once an invitation is created in the backend, we want the invitation list/status to refresh!
    */
  }

  newInvitationComplete = (invitationCode, firstName, lastName, emailAddress, inviteStatusMessage) => {
    this.setState(() => ({
      inviteStatusMessage: inviteStatusMessage,
    }));

    this.toggleInviteMode();
  }

  addExistingMemberToDiscussionGroup = (firstName, lastName, emailAddress) => {
    const {
      discussionGroupId,
      user,
    } = this.props;

    const setInviteCompleteResult = axios.post(CREATE_CUSTOMER_LINK_INVITATION_ENDPOINT_URL, {
      cid: user.cid,
      at: user.at,
      token: user.token,
      groupId: discussionGroupId,
      inviteeDetails: {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
      }
    })
      .then((response) => {
        const serviceResponse = response.data;
        if (serviceResponse.apiError == false) {
          //the invitation was successful, reset/reload the form....(need to make this unique to the action)
          this.setState(() => ({
            refreshModeStr: "invitedDiscussionGroupMember" + discussionGroupId + emailAddress + "addToClub",
          }));
        }
      })
      .catch((err) => {
        throw ('Error: ', err);
      });
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
      inInviteMode,
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
            serviceURL={CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL}
            requestBody={{ forceRequestToUpdate: refreshModeStr, cid: user.cid, at: user.at, token: user.token, groupId: discussionGroupId }}
            render={({
              fetchingContent,
              serviceResponse,
            }) => (
              <Fragment>
                {fetchingContent && <div>
                  <br/>
                  <br/>
                  <h3>Loading Club Invitations</h3>
                  <br/>
                  <br/>
                </div>
                }
                {
                  !fetchingContent &&
                    <div>
                      <br/>
                      <h2>{serviceResponse.customerLinksData.sectionHeading}</h2>
                      <h3>{serviceResponse.customerLinksData.sectionHeading_LicenseInfo}</h3>
                      <br/>
                      <p style={{"color": "red", "fontSize": "1.3em"}}>{this.state.inviteStatusMessage}<br/><br/></p>
                      {serviceResponse.customerLinksData.customerLinks.length > 0 ? (<table style={{'border': '1px', 'width': '100%'}}>
                        <tbody>
                          <tr>
                          {serviceResponse.customerLinksData.columnHeadings.map((columnHeading, i) =>
                              <th key={`heading_` + i}>{columnHeading}</th>
                          )}
                          </tr>
                          {serviceResponse.customerLinksData.customerLinks.map((customerLink, i) =>
                              [
                              <tr>
                                <td colspan={serviceResponse.customerLinksData.columnHeadings.length}>&nbsp;</td>
                              </tr>,
                              <tr key={`data_` + i}>
                                <td key={`data_name_` + i}>{customerLink.name}</td>
                                <td key={`data_emailaddress_` + i}>{customerLink.emailaddress}</td>
                                <td key={`data_invitationcode_` + i}>{customerLink.invitationcode}</td>
                                <td key={`data_accountstatus_` + i}>{customerLink.status}</td>
                                <td key={`data_lastactivity_` + i}>{customerLink.lastactivity}</td>

                                {/* only one of these conditions will apply */}
                                {customerLink.alreadyAMemberOfThisGroup === false && customerLink.canBeInvitedToThisGroup === true && <td key={`data_clubstatus_` + i}><Button type="button" text={customerLink.invitationPrompt} onClickEvent={() => this.addExistingMemberToDiscussionGroup(customerLink.firstname, customerLink.lastname, customerLink.emailaddress)} /></td>}
                                {customerLink.alreadyAMemberOfThisGroup === true && customerLink.canBeInvitedToThisGroup === false && <td key={`data_clubstatus_` + i}>Active</td>}
                                {customerLink.alreadyAMemberOfThisGroup === false && customerLink.canBeInvitedToThisGroup === false && <td key={`data_clubstatus_` + i}>Pending</td>}
                              </tr>
                            ]
                          )}
                        </tbody>
                      </table>) : <p>There are no invitations</p>}
                      <br/>
                      {inInviteMode === true && <div>
                        <DiscussionBoardInviteNewMemberToSlooh {...this.props} newInvitationComplete={(invitationCode, firstName, lastName, emailAddress, statusMessage) => this.newInvitationComplete(invitationCode, firstName, lastName, emailAddress, statusMessage)}/>
                      </div>
                      }
                      <div className="button-actions">
                        {inInviteMode === true && <div>
                          <Button
                            type="button"
                            text="Cancel"
                            onClickEvent={this.toggleInviteMode} />
                            <br/>
                          </div>
                        }
                        {inInviteMode === false && <div>
                          <Button
                            className="submit-button"
                            type="button"
                            onClickEvent={this.toggleInviteMode}
                            text={serviceResponse.formsubmitbutton.buttonText}/>
                            <br/>
                          </div>
                        }
                      </div>
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

export default DiscussionBoardInvitationsPanel;
