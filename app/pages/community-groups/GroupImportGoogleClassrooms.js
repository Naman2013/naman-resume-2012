import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import GroupTiles from 'components/groups-hub/group-tiles';
import RequestGroupForm from 'components/community-groups/request-group-form';
import PromptWithClose from 'components/community-groups/prompt-with-close';
import RequestGroupFormFeedback from 'components/community-groups/request-group-form-feedback';
import HubContainer from 'components/common/HubContainer';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import CenterColumn from 'components/common/CenterColumn';
import { DeviceContext } from 'providers/DeviceProvider';
import { validateResponseAccess } from 'modules/authorization/actions'
import { customModalStylesBlackOverlay } from 'styles/mixins/utilities';
import { requestGroup } from 'services/community-groups/request-group';
import { browserHistory } from 'react-router';

import axios from 'axios';
import Request from 'components/common/network/Request';
import { GROUPS_PAGE_ENDPOINT_URL, GET_GROUPS } from 'services/community-groups';
import { GOOGLE_CLASSROOM_IMPORT_PAGE_ENDPOINT_URL , GOOGLE_CLASSROOM_GET_CLASSROOM_LIST_ENDPOINT_URL} from 'services/classroom/classroom';

import { Field, reduxForm } from 'redux-form';
import InputField from 'components/form/InputField';
import Button from 'components/common/style/buttons/Button';
import { Link } from 'react-router';

import style from '../../containers/groups-hub/groups-hub.style';
import style2 from 'pages/registration/partials/JoinHeader.style';
import style3 from './GroupCreate.style';


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
    const { actions, user } = this.props;
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
              promptText="There was an error submitting your form."
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
  handleFieldChange = ({ field, value }) => {
    this.setState(() => ({
      [field]: !value,
    }));
  }

  handleSubmit = (formValues) => {
    formValues.preventDefault();

    console.log(this.state);
    //GOOGLE_CLASSROOM_IMPORT_CLASSROOMS_ENDPOINT_URL
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
    } = this.state;

    return (<div>
      <Request
        serviceURL={GROUPS_PAGE_ENDPOINT_URL}
        model={groupsHubModel}
        requestBody={{ currentGroupSet: 'owner' }}
        render={({
          fetchingContent,
          modeledResponses: { GROUP_HUB_MODEL },
          serviceResponse = {},
        }) => (
          <Fragment>
            {
              !fetchingContent &&
                <DeviceContext.Consumer>
                  {context => (
                    <HubContainer
                      {...this.props}
                      {...GROUP_HUB_MODEL}
                      {...context}
                      hubName="groups"
                      paginateURL={GET_GROUPS}
                      page={DEFAULT_PAGE}
                      count={COUNT}
                      user={user}
                      filterTypeFieldName="groupSet"
                      validateResponseAccess={actions.validateResponseAccess}
                      responseFieldNames={{
                        currentCount: 'groupsCount',
                        totalCount: 'totalGroupsCount',
                      }}
                      renderRightMenu={serviceResponse.canRequestGroup ? () => (<Button text="Request Group" onClickEvent={this.requestGroup} />) : null}
                      updateList={this.updateGroupsList}
                      appendToList={this.appendToGroupsList}
                      iconURL={serviceResponse.pageIconURL}
                      pageTitle={serviceResponse.pageTitle}
                      filterType='owner'
                      render={() => (
                        <Fragment>
                          {!fetchingContent && <div>

                            <Request
                              serviceURL={GOOGLE_CLASSROOM_IMPORT_PAGE_ENDPOINT_URL}
                              requestBody={{ }}
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
                                          <div className="section-heading">{serviceResponse.sectionHeading}</div>
                                          <Request
                                            serviceURL={GOOGLE_CLASSROOM_GET_CLASSROOM_LIST_ENDPOINT_URL}
                                            requestBody={{ }}
                                            render={({
                                              fetchingContent,
                                              serviceResponse,
                                            }) => (
                                              <Fragment>
                                                {
                                                  !fetchingContent &&
                                                    <Fragment>
                                                      <div>
                                                        {serviceResponse.classroomList.length === 0 && <p>You do not currently have any Google Classrooms available in your Google Classroom Account.</p>}
                                                        {serviceResponse.classroomList.length > 0 && <form className="form" onSubmit={this.handleSubmit}>
                                                            <div className="form-section">
                                                              <div className="form-field-container">
                                                                <table style={{'width': '100%'}}>
                                                                  <tbody>
                                                                    <tr>
                                                                      <th>Import?</th>
                                                                      <th>Google Classroom</th>
                                                                      <th>Club Status</th>
                                                                    </tr>
                                                                    {serviceResponse.classroomList.map( (classroomListItem) => {
                                                                        return (
                                                                          <tr key={`googleClassroomRow_` + classroomListItem.googleClassroomId}>
                                                                            <td>
                                                                              {!classroomListItem.hasDiscussionGroup ? <Field style={{'marginLeft': '0px'}}
                                                                                key={`importAction_` + classroomListItem.googleClassroomId}
                                                                                name={`importAction_` + classroomListItem.googleClassroomId}
                                                                                type="checkbox"
                                                                                className="form-field"
                                                                                component={InputField}
                                                                                label=""
                                                                                onChange={(event) => { this.handleFieldChange({ field: classroomListItem.googleClassroomId, value: event.target.value }); }}
                                                                              />: <p></p>}

                                                                            </td>
                                                                            <td key={`importName_` + classroomListItem.googleClassroomId}>{classroomListItem.hasDiscussionGroup ? <Link to={classroomListItem.discussionGroupLinkUrl}>{classroomListItem.name}</Link>: <p>{classroomListItem.name}</p>}</td>
                                                                            <td key={`importStatus_` + classroomListItem.googleClassroomId}>{classroomListItem.hasDiscussionGroup ? <p>Active</p>: <p>Please Import</p>}</td>
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
                                                                type="submit"
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
                                        </CenterColumn>
                                      </Fragment>
                                    }
                                  </Fragment>
                                )}
                              />
                            </div>}
                        </Fragment>
                      )}
                    />
                  )}
                </DeviceContext.Consumer>
            }
          </Fragment>
        )}
      />
      <Modal
        ariaHideApp={false}
        isOpen={showPrompt}
        style={customModalStylesBlackOverlay}
        contentLabel="Groups"
        shouldCloseOnOverlayClick={false}
        onRequestClose={this.closeModal}
      >
        {promptText}
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'importGoogleClassroomsForm', enableReinitialize: true })(GroupImportGoogleClassrooms));
