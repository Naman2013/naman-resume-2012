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
import { CLASSROOM_CREATENEWGROUP_PAGE_ENDPOINT_URL, CLASSROOM_CREATENEWGROUP_ENDPOINT_URL } from 'services/classroom/classroom';

import { Field, reduxForm } from 'redux-form';
import InputField from 'components/form/InputField';
import Button from 'components/common/style/buttons/Button';

import style from '../../containers/groups-hub/groups-hub.style';
import style2 from 'pages/registration/partials/JoinHeader.style';
import style3 from './GroupCreate.style';

import messages from './Groups.messages'
import { intlShape, injectIntl } from 'react-intl';


const COUNT = 9;
const DEFAULT_PAGE = 1;


const groupsHubModel = {
  name: 'GROUP_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};

class GroupCreate extends Component {
  static propTypes = {
    validateResponseAccess: PropTypes.func,
    params: PropTypes.shape({
      filterType: PropTypes.string,
    }),
    isCreateMode: PropTypes.bool,
    intl: intlShape.isRequired
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
    createClubLinkUrl: '',
    newGroupFormDetails: {
      groupName: {
        label: '',
        value: '',
        hintText: '',
        errorText: '',
      },
      groupDescription: {
        label: '',
        value: '',
        hintText: '',
        errorText: '',
      },
    }
  }

  /* Save the Create Club Link Url */
  handlePageServiceResponse = (result) => {
    this.setState(() => ({
      createClubLinkUrl: result.createNewClubLinkUrl,
    }));

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

  createClub = () => {
    browserHistory.push( this.state.createClubLinkUrl );
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


  // Obtain access to the create new group api service response and update the newGroupFormDetails state to reflect the Page response (set form labels)
  handleCreateNewGroupPageServiceResponse = (result) => {
    const newGroupFormData = cloneDeep(this.state.newGroupFormDetails);

    newGroupFormData.groupName.label = result.formFieldLabels.groupname.label;
    newGroupFormData.groupDescription.label = result.formFieldLabels.groupdescription.label;

    newGroupFormData.groupName.hintText = result.formFieldLabels.groupname.hintText;
    newGroupFormData.groupDescription.hintText = result.formFieldLabels.groupdescription.hintText;

    /* update the new group form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      newGroupFormDetails: newGroupFormData,
    }));
  }

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ field, value }) => {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const newGroupFormData = cloneDeep(this.state.newGroupFormDetails);
    newGroupFormData[field].value = value;

    this.setState(() => ({
      newGroupFormDetails: newGroupFormData,
    }));
  }

  /* Submit the New Group Form and perform any validations as needed */
  handleSubmit = (formValues) => {
    formValues.preventDefault();

    //assume the form is ready to submit unless validation issues occur.
    let formIsComplete = true;
    const {
      newGroupFormDetails,
    } = this.state;

    const {
      user
    } = this.props;

    const newGroupFormDetailsData = cloneDeep(newGroupFormDetails);

    /* reset the error conditions */
    newGroupFormDetailsData.groupName.errorText = '';
    newGroupFormDetailsData.groupDescription.errorText = '';

    if (newGroupFormDetails.groupName.value === "") {
      newGroupFormDetailsData.groupName.errorText = "Please enter in a name for your classroom.";
      formIsComplete = false;
    }

    if (newGroupFormDetails.groupDescription.value === "") {
      newGroupFormDetailsData.groupDescription.errorText = "Please enter in a message or description for your classroom.";
      formIsComplete = false;
    }

    this.setState(() => ({
      newGroupFormDetails: newGroupFormDetailsData,
    }));

    if (formIsComplete) {
      //console.log('submit the new group form and redirect to the new group page');

      const createNewGroupResults = axios.post(CLASSROOM_CREATENEWGROUP_ENDPOINT_URL, {
        groupName: this.state.newGroupFormDetails.groupName.value,
        groupDescription: this.state.newGroupFormDetails.groupDescription.value,
        cid: user.cid,
        at: user.at,
        token: user.token,
      })
        .then((response) => {
          const res = response.data;
          if (res.apiError == false) {
            const createGroupResult = {
              status: res.status,
              discussionGroupLinkUrl: res.discussionGroupLinkUrl,
            }

            /* need to force evaulation of "true"/"false" vs. true/false. */
            if (createGroupResult.status === "success") {
              browserHistory.push(createGroupResult.discussionGroupLinkUrl);
            } else {
              //error occured
            }
          }
        })
        .catch((err) => {
          throw ('Error: ', err);
        });
      //status = success
      //discussionGroupLinkUrl - the url to redirect the user to.

    }

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
        serviceResponseHandler={this.handlePageServiceResponse}
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
                              serviceURL={CLASSROOM_CREATENEWGROUP_PAGE_ENDPOINT_URL}
                              requestBody={{ }}
                              serviceResponseHandler={this.handleCreateNewGroupPageServiceResponse}
                              render={({
                                fetchingContent,
                                serviceResponse: createNewGroupRes,
                              }) => (
                                <Fragment>
                                  {
                                    !fetchingContent &&
                                      <Fragment>

                                        <div className="header">
                                          <div className="inner-header-container">
                                            <div className="inner-header-text">
                                              <div className="big">{createNewGroupRes.pageHeading1}</div>
                                              <div className="little">{createNewGroupRes.pageHeading2}</div>
                                            </div>
                                          </div>
                                        </div>
                                        <CenterColumn widths={['620px']}>
                                          <div className="wrapper">
                                          <div className="section-heading">{createNewGroupRes.sectionHeading}</div>
                                          <form className="form" onSubmit={this.handleSubmit}>
                                            <div className="form-section">
                                              <div className="form-field-container">
                                                <span className="form-label" dangerouslySetInnerHTML={{ __html: newGroupFormDetails.groupName.label }} />:
                                                <span className="form-error" dangerouslySetInnerHTML={{ __html: newGroupFormDetails.groupName.errorText }} />
                                                <Field
                                                  name="groupName"
                                                  type="name"
                                                  className="form-field"
                                                  label={newGroupFormDetails.groupName.hintText}
                                                  component={InputField}
                                                  onChange={(event) => { this.handleFieldChange({ field: 'groupName', value: event.target.value }); }}
                                                  value={newGroupFormDetails.groupName.value}
                                                />
                                              </div>

                                              <div className="form-field-container">
                                                <span className="form-label" dangerouslySetInnerHTML={{ __html: newGroupFormDetails.groupDescription.label }} />:
                                                <span className="form-error" dangerouslySetInnerHTML={{ __html: newGroupFormDetails.groupDescription.errorText }} />
                                                <Field
                                                  name="groupDescription"
                                                  type="name"
                                                  className="form-field"
                                                  label={newGroupFormDetails.groupDescription.hintText}
                                                  component={InputField}
                                                  onChange={(event) => { this.handleFieldChange({ field: 'groupDescription', value: event.target.value }); }}
                                                  value={newGroupFormDetails.groupDescription.value}
                                                />
                                              </div>

                                            </div>
                                            <div className="button-container">
                                              <button
                                                className="submit-button"
                                                type="submit"
                                              >Create New Group
                                              </button>
                                            </div>
                                          </form>
                                          </div>
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



const mapStateToProps = ({ user, newGroupAccountForm }) => ({
  user,
  newGroupAccountForm,
}) => ({
  user,
  newGroupAccountForm,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    validateResponseAccess,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'newGroupAccountForm', enableReinitialize: true })(injectIntl(GroupCreate)));
