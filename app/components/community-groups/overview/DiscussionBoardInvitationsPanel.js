/***********************************
* V4 Community Group Invitations Panel
* for Classroom / Astronomy Clubs
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CardDeck, Card, CardColumns, Container, Row, ListGroup, ListGroupItem, } from 'react-bootstrap';
import Request from 'app/components/common/network/Request';
import axios from 'axios';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Button from 'app/components/common/style/buttons/Button';
import DiscussionBoardInviteNewMemberToSlooh from 'app/components/community-groups/overview/DiscussionBoardInviteNewMemberToSlooh';
import { CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL } from 'app/services/classroom/classroom';
import { CREATE_CUSTOMER_LINK_INVITATION_ENDPOINT_URL } from 'app/services/registration/registration';
import _get from 'lodash/get';

import {
  astronaut,
} from '../../../styles/variables/colors_tiles_v4';
import { screenLarge } from 'app/styles/variables/breakpoints';
import style from './DiscussionBoardInvitationsPanel.style';
import messages from './DiscussionBoard.messages';
import { faintShadow } from '../../../styles/variables/shadows';

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
    pageMeta: shape({}),
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    pageMeta: {},
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
                    <h3><FormattedMessage {...messages.LoadingClubInvitations} /></h3>
                    <br />
                  </div>
                  }
                  {
                    !fetchingContent &&
                    <div className="customer-links">
                      <br />
                      <h2>{serviceResponse.customerLinksData.sectionHeading}</h2>
                      <p>{serviceResponse.customerLinksData.sectionHeading_LicenseInfo}</p>
                      <p style={{ "color": "red", "fontSize": "1.3em" }}>{this.state.inviteStatusMessage}</p>
                      {inInviteMode === true && <div>
                        <DiscussionBoardInviteNewMemberToSlooh {...this.props} newInvitationComplete={(invitationCode, firstName, lastName, emailAddress, statusMessage) => this.newInvitationComplete(invitationCode, firstName, lastName, emailAddress, statusMessage)} />
                      </div>
                      }
                      {inInviteMode === true && <div className="button-cancel">
                        <Button
                          type="button"
                          text={intl.formatMessage(messages.Cancel)}
                          onClickEvent={this.toggleInviteMode} />
                        <br />
                      </div>
                      }
                      {inInviteMode === false && <div className="button-invite">
                        <Button
                          className="submit-button"
                          type="button"
                          onClickEvent={this.toggleInviteMode}
                          text={_get(serviceResponse, 'formsubmitbutton.buttonText')} />
                        <br />
                      </div>
                      }

                      <Container fluid>
                        <Row noGutters>
                          {
                            serviceResponse.customerLinksData.customerLinks.length > 0 ? (
                              serviceResponse.customerLinksData.customerLinks.map(x => (
                                <Card className="list-card">
                                  <Card.Body>
                                    <Card.Title className="list-card-title">
                                      {x.name}
                                    </Card.Title>
                                    <Card.Subtitle className="list-card-subtitle">
                                      {x.emailaddress}
                                    </Card.Subtitle>
                                  </Card.Body>
                                  <ListGroup >
                                    <ListGroupItem className="list-card-item">
                                      <b>Invitation Code: </b>
                                      {x.invitationcode}
                                    </ListGroupItem>

                                    <ListGroupItem className="list-card-item">
                                      <b>Account status: </b>
                                      {x.status}
                                    </ListGroupItem>
                                    <ListGroupItem className="listy-card-item">
                                      <b>Club status: </b>
                                      {x.alreadyAMemberOfThisGroup === false && x.canBeInvitedToThisGroup === true && <div className="but"><Button type="button" text={x.invitationPrompt} onClickEvent={() => this.addExistingMemberToDiscussionGroup(x.firstname, x.lastname, x.emailaddress)} /></div>}
                                      {x.alreadyAMemberOfThisGroup === true && x.canBeInvitedToThisGroup === false && <FormattedMessage {...messages.Active} />}
                                      {x.alreadyAMemberOfThisGroup === false && x.canBeInvitedToThisGroup === false && <FormattedMessage {...messages.Pending} />}
                                    </ListGroupItem>
                                  </ListGroup>

                                  <Card.Footer>
                                    <small className="text-muted"><b>Last activity: </b>{x.lastactivity}</small>
                                  </Card.Footer>
                                </Card>
                              ))
                            ) : <p><FormattedMessage {...messages.NoInvitations} /></p>
                          }
                        </Row>
                      </Container>
                      <br />

                      
                    </div>
                  }
                </Fragment>
              )}
          />
        </div>

        <style jsx>{style}</style>
        <style jsx>{`
          .list-card{
            margin-right:25px !important;
            margin-bottom:10px !important;
            border:none;
            ${faintShadow}
          }
          .list-card-item{
            border-top-left-radius:0 !important;
            border-top-right-radius:0 !important;
            border-bottom-right-radius:0 !important;
            border-bottom-left-radius:0 !important;
            border-left:0px;
            border-right:0px;
          }

          .list-card-title{
            font-size:2rem;
          }

.list-card-subtitle{
  font-size:10px;
}

          `}</style>
      </div>
    )
  }
}

export default injectIntl(DiscussionBoardInvitationsPanel);
