/***********************************
* V4 Community Group Invitations Panel
* for Classroom / Astronomy Clubs
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Request from 'components/common/network/Request';
import Button from 'components/common/style/buttons/Button';
import DiscussionBoardInviteNewMemberToSlooh from 'components/community-groups/overview/DiscussionBoardInviteNewMemberToSlooh';
import { CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL } from 'services/classroom/classroom';
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
  inInviteMode,
}) => ({
  user,
  inInviteMode,
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
  }

  toggleInviteMode = () => {
    this.setState(() => ({
      inInviteMode: !this.state.inInviteMode,
    }));

    //re-fire the Request object with exactly the same parameters....
  }

  newInvitationComplete = () => {
    this.toggleInviteMode();
  }

  render() {
    const {
      actions,
      pageMeta,
      user,
      discussionGroupId,
    } = this.props;

    return (
      <div className="root">
        <div className="invite-container">
          <Request
            serviceURL={CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL}
            requestBody={{ cid: user.cid, at: user.at, token: user.token, groupId: discussionGroupId }}
            render={({
              fetchingContent,
              serviceResponse,
            }) => (
              <Fragment>
                {
                  !fetchingContent &&
                    <div>
                      <h2>{serviceResponse.sectionHeading}</h2>
                      <h3>{serviceResponse.sectionHeading_LicenseInfo}</h3>
                      <br/>
                      {serviceResponse.customerLinksData.customerLinks.length > 0 ? (<table style={{'border': '1px', 'width': '100%'}}>
                        <tbody>
                          <tr>
                          {serviceResponse.customerLinksData.columnHeadings.map((columnHeading, i) =>
                              <th key={`heading_` + i}>{columnHeading}</th>
                          )}
                          </tr>

                          {serviceResponse.customerLinksData.customerLinks.map((customerLink, i) =>
                              <tr key={`data_` + i}>
                                <td key={`data_` + customerLink.firstname + `_` + i}>{customerLink.firstname}</td>
                                <td key={`data_` + customerLink.lastname + `_` + i}>{customerLink.lastname}</td>
                                <td key={`data_` + customerLink.emailaddress + `_` + i}>{customerLink.emailaddress}</td>
                                <td key={`data_` + customerLink.status + `_` + i}>{customerLink.status}</td>
                                <td key={`data_` + customerLink.lastactivity + `_` + i}>{customerLink.lastactivity}</td>
                              </tr>
                          )}
                        </tbody>
                      </table>) : <p>There are no invitations</p>}
                      <br/>
                      {this.state.inInviteMode === true && <div>
                        <DiscussionBoardInviteNewMemberToSlooh {...this.props} newInvitationComplete={() => this.newInvitationComplete()}/>
                      </div>
                      }
                      <div className="button-actions">
                        {this.state.inInviteMode === true && <div>
                          <Button
                            type="button"
                            text="Cancel"
                            onClickEvent={this.toggleInviteMode} />
                            <br/>
                          </div>
                        }
                        {this.state.inInviteMode === false && <div>
                          <Button
                            className="submit-button"
                            type="button"
                            onClickEvent={this.toggleInviteMode}
                            text={serviceResponse.formsubmitbutton.buttonText}/>
                            <br/>
                          </div>
                        }
                      </div>
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
