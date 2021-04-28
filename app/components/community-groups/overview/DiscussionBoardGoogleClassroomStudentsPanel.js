/***********************************
 * V4 Community Group Google Classroom Students Panel
 ***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API } from 'app/api';
import FormSectionHeader from 'app/components/common/form-sections/section-header';
import Request from 'app/components/common/network/Request';
import BarHeader from 'app/components/common/form-sections/bar-header';
import Button from 'app/components/common/style/buttons/Button';
import { faintShadow } from 'app/styles/variables/shadows';

import {
  GOOGLE_CLASSROOM_IMPORTSTUDENTS_PANEL_ENDPOINT_URL,
  GOOGLE_CLASSROOM_IMPORTSTUDENT_ENDPOINT_URL,
} from 'app/services/classroom/classroom';

import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenLarge } from 'app/styles/variables/breakpoints';

import {
  Container,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { romance, astronaut } from '../../../styles/variables/colors_tiles_v4';

const { arrayOf, bool, func, number, shape, string } = PropTypes;
const mapStateToProps = ({ user }) => ({
  user,
});

@connect(
  mapStateToProps,
  null
)
@withTranslation()
class DiscussionBoardGoogleClassroomStudentsPanel extends Component {
  static propTypes = {
    pageMeta: shape({}),
  };

  static defaultProps = {
    pageMeta: {},
  };

  state = {
    refreshModeStr: 'false',
    importStudentErrorText: '',
    panelLoadingMessage: '',
  };

  addStudentToDiscussionGroup = (
    firstName,
    lastName,
    emailAddress,
    googleProfileId
  ) => {
  
    const { user, discussionGroupId, refreshHeader, t } = this.props;

    const studentAccountDetails = {
      googleProfileId,
      firstName,
      lastName,
      emailAddress,
    };

    //reset importStudentErrorText
    this.setState(() => ({
      importStudentErrorText: '',
    }));

    //make an axios call out to create the student account or assign the existing student customer to this Google Classroom.
    const googleClassroomImportStudentResult = API.post(
      GOOGLE_CLASSROOM_IMPORTSTUDENT_ENDPOINT_URL,
      {
        cid: user.cid,
        at: user.at,
        token: user.token,
        studentAccountDetails,
        groupId: discussionGroupId,
      }
    )
      .then(response => {
        const res = response.data;
        if (res.apiError == false) {
          const importResult = {
            status: res.status,
            statusMessage: res.statusMessage,
          };

          if (status !== 'success') {
            this.setState(() => ({
              importStudentErrorText: importResult.statusMessage,
            }));
          }

          //force reload the Student List Panel.
          refreshHeader();
          this.setState(() => ({
            panelLoadingMessage: `${t('Clubs.RefreshingStudentsList')}....`,
            refreshModeStr: `googleClassroomStudentListPanel_${Math.floor(
              Math.random() * 500000 + 1
            )}`,
          }));
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  };

  render() {
    const { actions, pageMeta, user, discussionGroupId, t } = this.props;

    const { refreshModeStr } = this.state;

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
            requestBody={{
              forceRequestToUpdate: refreshModeStr,
              cid: user.cid,
              at: user.at,
              token: user.token,
              groupId: discussionGroupId,
            }}
            render={({ fetchingContent, serviceResponse }) => (
              <Fragment>
                {fetchingContent && (
                  <div>
                    <br />
                    <br />
                    <h3>{this.state.panelLoadingMessage}</h3>
                    <br />
                    <br />
                  </div>
                )}
                {!fetchingContent && (
                  <div className="classroom-root">
                    <FormSectionHeader
                      title={serviceResponse.customerLinksData.sectionHeading1}
                      desc={serviceResponse.customerLinksData.sectionHeading2}
                    />
                    <BarHeader
                      title={
                        serviceResponse.customerLinksData
                          .sectionHeading_LicenseInfo
                      }
                    />
                    {this.state.importStudentErrorText !== '' && (
                      <p
                        style={{
                          color: 'red',
                          fontSize: '1.0em',
                          fontStyle: 'italic',
                        }}
                      >
                        {this.state.importStudentErrorText}
                        <br />
                        <br />
                      </p>
                    )}
                    <Container fluid>
                      <Row noGutters>
                        {serviceResponse.customerLinksData.customerLinks
                          .length > 0 ? (
                          serviceResponse.customerLinksData.customerLinks.map(
                            x => (
                              <Card className="list-card">
                                <Card.Body>
                                  <Card.Title className="list-card-title">
                                    {x.name}
                                  </Card.Title>
                                  <Card.Subtitle className="list-card-subtitle">
                                    {x.emailaddress}
                                  </Card.Subtitle>
                                </Card.Body>
                                <ListGroup>
                                  {x.showInvitationCode == true && (
                                    <ListGroupItem className="list-card-item">
                                      <b>Invitation Code: </b>
                                      {x.invitationcode}
                                    </ListGroupItem>
                                  )}
                                  <ListGroupItem className="list-card-item">
                                    <b>Account status: </b>
                                    {x.status}
                                  </ListGroupItem>
                                  <ListGroupItem className="listy-card-item">
                                    {x.showAddButton == true && (
                                      <Button
                                        type="button"
                                        text={x.invitationPrompt}
                                        onClickEvent={() =>
                                          this.addStudentToDiscussionGroup(
                                            x.firstname,
                                            x.lastname,
                                            x.emailaddress,
                                            x.googleprofileid
                                          )
                                        }
                                      />
                                    )}
                                    {x.showClubStatus == true && (
                                      <span>
                                        <b>Club status: </b>
                                        {x.clubStatus}
                                      </span>
                                    )}
                                  </ListGroupItem>
                                </ListGroup>

                                <Card.Footer>
                                  <small className="text-muted">
                                    <b>Last activity: </b>
                                    {x.lastactivity}
                                  </small>
                                </Card.Footer>
                              </Card>
                            )
                          )
                        ) : (
                          <p>{t('Clubs.NoInvitations')}</p>
                        )}
                        {serviceResponse.customerLinksData
                          .hasStudentsToInvite && (
                          <p
                            style={{
                              textAlign: 'center',
                              color: 'blue',
                              fontSize: '1.0em',
                              fontStyle: 'italic',
                            }}
                          >
                            <br />* {t('Clubs.AddStudentNote')} *
                            <br />
                            <br />
                          </p>
                        )}
                      </Row>
                    </Container>
                    <br />
                  </div>
                )}
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

          .classroom-root {
            padding: 50px;
            margin: 25px 0;
            background-color: ${romance};
            ${faintShadow}
          }

          .classroom-table {
            font-family: ${secondaryFont};
            color: ${astronaut};
          }

          .table-header {
            font-family: ${primaryFont};
            font-weight: bold;
            text-transform: uppercase;
            color: ${astronaut};
            font-size: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default DiscussionBoardGoogleClassroomStudentsPanel;
