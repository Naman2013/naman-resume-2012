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
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Button from 'components/common/style/buttons/Button';
import DiscussionBoardInviteNewMemberToSlooh from 'components/community-groups/overview/DiscussionBoardInviteNewMemberToSlooh';
import { CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL } from 'services/classroom/classroom';
import { CREATE_CUSTOMER_LINK_INVITATION_ENDPOINT_URL } from 'services/registration/registration';

import {
  astronaut,
} from '../../../styles/variables/colors_tiles_v4';
import { screenLarge } from 'styles/variables/breakpoints';
import style from './DiscussionBoardInvitationsPanel.style';
import messages from './DiscussionBoard.messages';

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
    intl: intlShape.isRequired,
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
      refreshHeader,
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
        refreshHeader();
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
      intl,
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
                  <h3><FormattedMessage {...messages.LoadingClubInvitations} /></h3>
                  <br/>
                  <br/>
                </div>
                }
                {
                  !fetchingContent &&
                    <div className="customer-links">
                      <br/>
                      <h2>{serviceResponse.customerLinksData.sectionHeading}</h2>
                      <p>{serviceResponse.customerLinksData.sectionHeading_LicenseInfo}</p>
                      <br/>
                      <br/>
                      <p style={{"color": "red", "fontSize": "1.3em"}}>{this.state.inviteStatusMessage}</p>
                      {serviceResponse.customerLinksData.customerLinks.length > 0 ? (
                        <div>
                          <div className="Rtable Rtable--6cols Rtable--collapse header">
                          {serviceResponse.customerLinksData.columnHeadings.map((columnHeading, i) =>
                            <div className="Rtable-cell" key={`heading_` + i}>{columnHeading}</div>
                          )}
                          </div>
                          {serviceResponse.customerLinksData.customerLinks.map((customerLink, i) =>
                            <div className="Rtable Rtable--6cols Rtable--collapse" key={`row_` + i}>
                              <div className="Rtable-cell" key={`data_name_` + i}>{customerLink.name}</div>
                              <div className="Rtable-cell" key={`data_emailaddress_` + i}>{customerLink.emailaddress}</div>
                              <div className="Rtable-cell" key={`data_invitationcode_` + i}>{customerLink.invitationcode}</div>
                              <div className="Rtable-cell" key={`data_accountstatus_` + i}>{customerLink.status}</div>
                              <div className="Rtable-cell" key={`data_lastactivity_` + i}>{customerLink.lastactivity}</div>

                              {customerLink.alreadyAMemberOfThisGroup === false && customerLink.canBeInvitedToThisGroup === true && <div className="Rtable-cell lastCell" key={`data_clubstatus_` + i}><div className="but"><Button type="button" text={customerLink.invitationPrompt} onClickEvent={() => this.addExistingMemberToDiscussionGroup(customerLink.firstname, customerLink.lastname, customerLink.emailaddress)} /></div></div>}
                              {customerLink.alreadyAMemberOfThisGroup === true && customerLink.canBeInvitedToThisGroup === false && <div className="Rtable-cell lastCell" key={`data_clubstatus_` + i}><FormattedMessage {...messages.Active} /></div>}
                              {customerLink.alreadyAMemberOfThisGroup === false && customerLink.canBeInvitedToThisGroup === false && <div className="Rtable-cell lastCell" key={`data_clubstatus_` + i}><FormattedMessage {...messages.Pending} /></div>}
                            </div>
                          )}
                          </div>
                          ) : <p><FormattedMessage {...messages.NoInvitations} /></p>}
                      <br/>
                      {inInviteMode === true && <div>
                        <DiscussionBoardInviteNewMemberToSlooh {...this.props} newInvitationComplete={(invitationCode, firstName, lastName, emailAddress, statusMessage) => this.newInvitationComplete(invitationCode, firstName, lastName, emailAddress, statusMessage)}/>
                      </div>
                      }
                      
                      {inInviteMode === true && <div className="button-cancel">
                        <Button
                          type="button"
                          text={intl.formatMessage(messages.Cancel)}
                          onClickEvent={this.toggleInviteMode} />
                          <br/>
                        </div>
                      }
                      {inInviteMode === false && <div className="button-invite">
                        <Button
                          className="submit-button"
                          type="button"
                          onClickEvent={this.toggleInviteMode}
                          text={serviceResponse.formsubmitbutton.buttonText}/>
                          <br/>
                        </div>
                      }
                    </div>
                    }
                  </Fragment>
                )}
              />
        </div>

        <style>{style}</style>
    </div>
    )
  }
}

export default injectIntl(DiscussionBoardInvitationsPanel);
