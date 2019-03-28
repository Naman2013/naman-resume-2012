import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { intlShape, injectIntl } from 'react-intl';
import GroupTiles from 'components/groups-hub/group-tiles';
import RequestGroupForm from 'components/community-groups/request-group-form';
import PromptWithClose from 'components/community-groups/prompt-with-close';
import RequestGroupFormFeedback from 'components/community-groups/request-group-form-feedback';
import HubContainer from 'components/common/HubContainer';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import CenterColumn from 'components/common/CenterColumn';
import { DeviceContext } from 'providers/DeviceProvider';
import BarHeader from 'components/common/form-sections/bar-header';

import { validateResponseAccess } from 'modules/authorization/actions'
import { customModalStylesBlackOverlay } from 'styles/mixins/utilities';
import { requestGroup } from 'services/community-groups/request-group';
import { browserHistory } from 'react-router';

import axios from 'axios';
import Request from 'components/common/network/Request';
import { GROUPS_PAGE_ENDPOINT_URL, GET_GROUPS } from 'services/community-groups';
import {
  GOOGLE_CLASSROOM_IMPORT_PAGE_ENDPOINT_URL,
  GOOGLE_CLASSROOM_GET_CLASSROOM_LIST_ENDPOINT_URL,
  GOOGLE_CLASSROOM_IMPORT_CLASSROOMS_ENDPOINT_URL
} from 'services/classroom/classroom';

import { Field, reduxForm } from 'redux-form';
import InputField from 'components/form/InputField';
import Button from 'components/common/style/buttons/Button';
import { Link } from 'react-router';
import { faintShadow } from 'styles/variables/shadows';
import {
  romance,
  astronaut,
} from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import style from '../../containers/groups-hub/groups-hub.style';
import style2 from 'pages/registration/partials/JoinHeader.style';
import style3 from './GroupCreate.style';
import messages from './Groups.messages';
import './group-import-google-classrooms.scss';

const COUNT = 9;
const DEFAULT_PAGE = 1;


const groupsHubModel = {
  name: 'GROUP_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};

class GroupImportGoogleClassrooms extends Component {
  static propTypes = {
    validateResponseAccess: PropTypes.func,
    params: PropTypes.shape({
      filterType: PropTypes.string,
    }),
    isCreateMode: PropTypes.bool,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    validateResponseAccess: noop,
    params: {
      filterType: 'owner'
    },
    isCreateMode: true,
  };

  state = {
    groups: [],
    showPrompt: false,
    promptText: '',
    selectedGoogleClassroomIds: { },
    googleClassrooms: { },
    forceReloadStr: '',
  }

  updateGroupsList = (resData) => {
    this.setState(() => ({
      groups: resData.groups,
    }));
  }

  updateGroupItemInfo = (id, resData) => {
    let newGroupsList = [].concat(this.state.groups);
    newGroupsList = newGroupsList.map((group) => {
      if (group.discussionGroupId === id) {
        return Object.assign(group, resData);
      }
      return group;
    });

    this.setState(() => ({
      groups: newGroupsList,
    }));
  }

  appendToGroupsList = (resData) => {
    this.setState((state) => {
      const groups = [].concat(state.groups, resData.groups)
      return {
        groups
      };
    });
  }

  submitRequestForm = ({
    requestFormTitle,
    requestFormText,
    requestFormPrivacy,
  }) => {
    const { actions, user, intl } = this.props;
    requestGroup({
      at: user.at,
      token: user.token,
      cid: user.cid,
      title: requestFormTitle,
      access: requestFormPrivacy,
      definition: requestFormText,
    })
      .then((res) => {
        if (!res.data.apiError) {
          this.setState({
            showPrompt: res.data.showResponse,
            promptText: (<RequestGroupFormFeedback
              promptText={res.data.response}
              closeForm={this.closeModal}
              requestNew={this.requestGroup}
            />),
          });
        } else {
          this.setState({
            showPrompt: true,
            promptText: (<RequestGroupFormFeedback
              promptText={intl.formatMessage(messages.errorSubmitting)}
              closeForm={this.closeModal}
              requestNew={this.requestGroup}
            />),
          });
        }
        actions.validateResponseAccess(res);
      });
  }

  requestGroup = () => {
    this.setState({
      showPrompt: true,
      promptText: <RequestGroupForm
        submitForm={this.submitRequestForm}
        closeForm={this.closeModal}
      />
    });
  }

  updatePrompt = (data) => {
    this.setState({
      showPrompt: data.showPrompt,
      promptText: <PromptWithClose
        promptText={data.promptText}
        closeForm={this.closeModal}
      />,
    })
  }

  closeModal = () => {
    this.setState({
      showPrompt: false,
      promptText: '',
    });
  }

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ googleClassroomName, googleClassroomId, selectedFlag }) => {
    const googleClassroomsData = cloneDeep(this.state.googleClassrooms);
    let selectedFlagValue = false;

    if (selectedFlag === "true") {
      selectedFlagValue = false;
    }
    else {
      selectedFlagValue = true;
    }

    const myGoogleClassroom = {
      googleClassroomId: googleClassroomId,
      googleClassroomName: googleClassroomName,
      googleClassroomDescription: '',
      googleClassroomSelected: selectedFlagValue,
    }

    googleClassroomsData[googleClassroomId] = myGoogleClassroom;

    this.setState(() => ({
      googleClassrooms: googleClassroomsData,
    }));
  }

  handleSubmit = (formValues) => {
    formValues.preventDefault();

    const { user } = this.props;

    let forceReloadStrData = cloneDeep(this.state.forceReloadStr);
    forceReloadStrData = Math.floor(Math.random() * 100000);

    const importGoogleClassroomsResult = axios.post(GOOGLE_CLASSROOM_IMPORT_CLASSROOMS_ENDPOINT_URL, {
      googleClassrooms: this.state.googleClassrooms,
      cid: user.cid,
      at: user.at,
      token: user.token,
    })
      .then((response) => {
        const res = response.data;
        if (res.apiError == false) {
          const importResult = {
            status: res.status,
            statusMessage: res.statusMessage,
          }

          if (importResult.status === "success") {
            //force reload the import google classes list....
            this.setState(() => ({
              forceReloadStr: forceReloadStrData,
            }));
          }
          else {
            //display an error message on the screen....
          }
        }
      })
      .catch((err) => {
        throw ('Error: ', err);
      });
  }

  render() {
    const {
      user,
      actions,
    } = this.props;
    const {
      groups,
      showPrompt,
      promptText,
      newGroupFormDetails,
      forceReloadStr,
    } = this.state;

    return (
      <div className="import-google-classrooms">
        <Request
          serviceURL={GOOGLE_CLASSROOM_IMPORT_PAGE_ENDPOINT_URL}
          requestBody={{
            cid: user.cid,
            at: user.at,
            token: user.token,
            forceReload: forceReloadStr,
          }}
          render={({
                     fetchingContent,
                     serviceResponse,
                   }) => (
            <Fragment>
              {
                !fetchingContent &&
                <Fragment>
                  <div className="header">
                    <div className="inner-header-container">
                      <div className="inner-header-text">
                        <div className="big">{serviceResponse.pageHeading1}</div>
                        <div className="little">{serviceResponse.pageHeading2}</div>
                      </div>
                    </div>
                  </div>
                  <CenterColumn widths={['620px']}>
                    <div className="form-area">
                      <BarHeader title={serviceResponse.sectionHeading}/>
                      <Request
                        serviceURL={GOOGLE_CLASSROOM_GET_CLASSROOM_LIST_ENDPOINT_URL}
                        requestBody={{}}
                        render={({
                                   fetchingContent,
                                   serviceResponse,
                                 }) => (
                          <Fragment>
                            {
                              !fetchingContent &&
                              <Fragment>
                                <div>
                                  {serviceResponse.classroomList.length === 0 &&
                                  <p>You do not currently have any Google Classrooms available in your Google Classroom
                                    Account.</p>}
                                  {serviceResponse.classroomList.length > 0 &&
                                  <form className="form">
                                    <div className="form-section form-section-area">
                                      <div className="form-field-container">
                                        <table style={{'width': '100%'}}>
                                          <tbody>
                                          <tr>
                                            <th className="table-header">Import?</th>
                                            <th className="table-header">Google Classroom</th>
                                            <th className="table-header">Club Status</th>
                                          </tr>
                                          {serviceResponse.classroomList.map((classroomListItem, index) => {
                                            return (
                                              <tr className="table-item"
                                                  key={`googleClassroomRow_` + classroomListItem.googleClassroomId}>
                                                <td>
                                                  {!classroomListItem.hasDiscussionGroup ?
                                                    <Field style={{'marginLeft': '0px'}}
                                                           key={`importAction_` + index}
                                                           name={`importAction_` + index}
                                                           type="checkbox"
                                                           className="form-field"
                                                           component={InputField}
                                                           label=""
                                                           onChange={(event) => {
                                                             this.handleFieldChange({
                                                               googleClassroomName: classroomListItem.name,
                                                               googleClassroomId: classroomListItem.googleClassroomId,
                                                               selectedFlag: event.target.value
                                                             });
                                                           }}
                                                    /> : <input type="checkbox" disabled checked className="form-field"
                                                                style={{marginLeft: '20px'}}/>}
                                                </td>
                                                <td
                                                  key={`importName_` + classroomListItem.googleClassroomId}>{classroomListItem.hasDiscussionGroup ?
                                                  <Link
                                                    to={classroomListItem.discussionGroupLinkUrl}>{classroomListItem.name}</Link> :
                                                  <p>{classroomListItem.name}</p>}</td>
                                                <td
                                                  key={`importStatus_` + classroomListItem.googleClassroomId}>{classroomListItem.hasDiscussionGroup ?
                                                  <p>Active</p> : <p>Please Import</p>}</td>
                                              </tr>
                                            )
                                          })
                                          }
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div className="button-container">
                                      <button
                                        className="submit-button"
                                        onClick={this.handleSubmit}
                                      >Import Selected Google Classrooms as Clubs
                                      </button>
                                    </div>
                                  </form>
                                  }
                                </div>
                              </Fragment>
                            }
                          </Fragment>
                        )}
                      />
                    </div>
                  </CenterColumn>
                </Fragment>
              }
            </Fragment>
          )}
        />

      <style jsx>{style}</style>
      <style jsx>{style2}</style>
      <style jsx>{style3}</style>
    </div>)
  }
}



const mapStateToProps = ({ user, importGoogleClassroomsForm }) => ({
  user,
  importGoogleClassroomsForm,
}) => ({
  user,
  importGoogleClassroomsForm,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    validateResponseAccess,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'importGoogleClassroomsForm', enableReinitialize: true })(injectIntl(GroupImportGoogleClassrooms)));
