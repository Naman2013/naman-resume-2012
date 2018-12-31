/***********************************
* V4 Community Group Google Classroom Students Panel
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FormSectionHeader from 'components/common/form-sections/section-header';
import Request from 'components/common/network/Request';
import BarHeader from 'components/common/form-sections/bar-header';
import Button from 'components/common/style/buttons/Button';
import { faintShadow } from 'styles/variables/shadows';

import {
  GOOGLE_CLASSROOM_IMPORTSTUDENTS_PANEL_ENDPOINT_URL,
  GOOGLE_CLASSROOM_IMPORTSTUDENT_ENDPOINT_URL
} from 'services/classroom/classroom';

import {
  romance,
  astronaut,
} from '../../../styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';

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
class DiscussionBoardGoogleClassroomStudentsPanel extends Component {

  static propTypes = {
    pageMeta: shape({ }),
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    pageMeta: { },
  };

  state = {
    refreshModeStr: "false",
    importStudentErrorText: '',
    panelLoadingMessage: this.props.intl.formatMessage(messages.LoadingStudentsList),
  }

  addStudentToDiscussionGroup = (firstName, lastName, emailAddress, googleProfileId) => {
    //console.log(firstName + " : " + lastName + " : " + emailAddress + " : " + googleProfileId);

    const { user , discussionGroupId, refreshHeader } = this.props;

    const studentAccountDetails = {
      googleProfileId: googleProfileId,
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
    };

    //reset importStudentErrorText
    this.setState(() => ({
      importStudentErrorText: '',
    }));

    //make an axios call out to create the student account or assign the existing student customer to this Google Classroom.
    const googleClassroomImportStudentResult = axios.post(GOOGLE_CLASSROOM_IMPORTSTUDENT_ENDPOINT_URL, {
      cid: user.cid,
      at: user.at,
      token: user.token,
      studentAccountDetails: studentAccountDetails,
      groupId: discussionGroupId,
    })
      .then((response) => {
        const res = response.data;
        if (res.apiError == false) {
          const importResult = {
            status: res.status,
            statusMessage: res.statusMessage,
          }

          if (status !=="success") {
            this.setState(() => ({
              importStudentErrorText: importResult.statusMessage,
            }));
          }

          //force reload the Student List Panel.
          refreshHeader();
          this.setState(() => ({
            panelLoadingMessage: `${this.props.intl.formatMessage(messages.RefreshingStudentsList)}....`,
            refreshModeStr: "googleClassroomStudentListPanel_" + Math.floor((Math.random() * 500000) + 1),
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
                  <h3>{this.state.panelLoadingMessage}</h3>
                  <br/>
                  <br/>
                </div>
                }
                {
                  !fetchingContent &&
                    <div className="classroom-root">
                      <FormSectionHeader
                        title={serviceResponse.customerLinksData.sectionHeading1}
                        desc={serviceResponse.customerLinksData.sectionHeading2}
                      />
                      <BarHeader title={serviceResponse.customerLinksData.sectionHeading_LicenseInfo} />
                      {this.state.importStudentErrorText !== "" && <p style={{"color": "red", "fontSize": "1.0em", "fontStyle": "italic"}}>{this.state.importStudentErrorText}<br/><br/></p>}
                      {serviceResponse.customerLinksData.customerLinks.length > 0 ? (<div>
                        <br/>
                        <table className="classroom-table" style={{'cellPadding': '2', 'border': '1px', 'width': '100%', "borderCollapse": "collapse"}}>
                          <tbody>
                            <tr>
                            {serviceResponse.customerLinksData.columnHeadings.map((columnHeading, i) =>
                                <th className="table-header" key={`heading_` + i}>{columnHeading}</th>
                            )}
                            </tr>
                            {serviceResponse.customerLinksData.customerLinks.map((customerLink, i) =>
                                [
                                  <tr>
                                    <td colspan={serviceResponse.customerLinksData.columnHeadings.length}>&nbsp;</td>
                                  </tr>,
                                  <tr style={{"marginBottom": "20px"}} key={`data_` + i}>
                                  <td key={`data_name_` + i}>{customerLink.name}</td>
                                  <td key={`data_emailaddress_` + i}>{customerLink.emailaddress}</td>
                                  <td key={`data_accountstatus_` + i}>{customerLink.status}</td>
                                  <td key={`data_lastactivity_` + i}>{customerLink.lastactivity}</td>

                                  {/* only one of these conditions will apply */}
                                  {customerLink.alreadyAMemberOfThisGroup === false && customerLink.canBeInvitedToThisGroup === true && <td key={`data_clubstatus_` + i}><Button type="button" text={customerLink.invitationPrompt} onClickEvent={() => this.addStudentToDiscussionGroup(customerLink.firstname, customerLink.lastname, customerLink.emailaddress, customerLink.googleprofileid)} /></td>}
                                  {customerLink.alreadyAMemberOfThisGroup === true && customerLink.canBeInvitedToThisGroup === false && <td key={`data_clubstatus_` + i}><FormattedMessage {...messages.Active} /></td>}
                                  {customerLink.alreadyAMemberOfThisGroup === false && customerLink.canBeInvitedToThisGroup === false && <td key={`data_clubstatus_` + i}><FormattedMessage {...messages.Pending} /></td>}
                                </tr>
                              ]
                            )}
                          </tbody>
                        </table>
                        {serviceResponse.customerLinksData.hasStudentsToInvite && <p style={{"textAlign": "center", "color": "blue", "fontSize": "1.0em", "fontStyle": "italic"}}><br/>* <FormattedMessage {...messages.AddStudentNote} /> *<br/><br/></p>}
                      </div>
                      ) : <p><FormattedMessage {...messages.NoStudents} /></p>}
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

        .classroom-root {
          padding: 50px;
          margin: 25px 0;
          background-color:${romance};
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
    )
  }
}

export default injectIntl(DiscussionBoardGoogleClassroomStudentsPanel);
