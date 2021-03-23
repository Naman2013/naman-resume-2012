import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import GroupTiles from 'app/components/groups-hub/group-tiles';
import RequestGroupForm from 'app/components/community-groups/request-group-form';
import PromptWithClose from 'app/components/community-groups/prompt-with-close';
import RequestGroupFormFeedback from 'app/components/community-groups/request-group-form-feedback';
import HubContainer from 'app/components/common/HubContainer';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import CenterColumn from 'app/components/common/CenterColumn';
import { DeviceContext } from 'providers/DeviceProvider';
import BarHeader from 'app/components/common/form-sections/bar-header';

import { validateResponseAccess } from 'app/modules/authorization/actions';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import { requestGroup } from 'app/services/community-groups/request-group';
import { browserHistory, Link } from 'react-router';

import { API } from 'app/api';
import Request from 'app/components/common/network/Request';
import {
  GROUPS_PAGE_ENDPOINT_URL,
  GET_GROUPS,
} from 'app/services/community-groups';
import {
  GOOGLE_CLASSROOM_IMPORT_PAGE_ENDPOINT_URL,
  GOOGLE_CLASSROOM_GET_CLASSROOM_LIST_ENDPOINT_URL,
  GOOGLE_CLASSROOM_IMPORT_CLASSROOMS_ENDPOINT_URL,
} from 'app/services/classroom/classroom';

import { Field, reduxForm } from 'redux-form';
import InputField from 'app/components/form/InputField';
import Button from 'app/components/common/style/buttons/Button';

import { faintShadow } from 'app/styles/variables/shadows';
import { romance, astronaut } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import style2 from 'pages/registration/partials/JoinHeader.style';
import style from '../../containers/groups-hub/groups-hub.style';
import style3 from './GroupCreate.style';
import './group-import-google-classrooms.scss';
import { cancellablePromise } from 'app/utils/cancellablePromise';
import { delay } from 'app/utils/utils';

const COUNT = 9;
const DEFAULT_PAGE = 1;

const groupsHubModel = {
  name: 'GROUP_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};
@withTranslation()
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
      filterType: 'owner',
    },
    isCreateMode: true,
  };

  state = {
    groups: [],
    showPrompt: false,
    promptText: '',
    selectedGoogleClassroomIds: {},
    googleClassrooms: {},
    forceReloadStr: '',
  };

  updateGroupsList = resData => {
    this.setState(() => ({
      groups: resData.groups,
    }));
  };

  updateGroupItemInfo = (id, resData) => {
    let newGroupsList = [].concat(this.state.groups);
    newGroupsList = newGroupsList.map(group => {
      if (group.discussionGroupId === id) {
        return Object.assign(group, resData);
      }
      return group;
    });

    this.setState(() => ({
      groups: newGroupsList,
    }));
  };

  appendToGroupsList = resData => {
    this.setState(state => {
      const groups = [].concat(state.groups, resData.groups);
      return {
        groups,
      };
    });
  };

  pendingPromises = [];

  appendPendingPromise = promise =>
    (this.pendingPromises = [...this.pendingPromises, promise]);

  removePendingPromise = promise =>
    (this.pendingPromises = this.pendingPromises.filter(p => p !== promise));

  clearPendingPromises = () => this.pendingPromises.map(p => p.cancel());

  submitRequestForm = ({
    requestFormTitle,
    requestFormText,
    requestFormPrivacy,
  }) => {
    const { actions, user, t } = this.props;
    requestGroup({
      at: user.at,
      token: user.token,
      cid: user.cid,
      title: requestFormTitle,
      access: requestFormPrivacy,
      definition: requestFormText,
    }).then(res => {
      if (!res.data.apiError) {
        this.setState({
          showPrompt: res.data.showResponse,
          promptText: (
            <RequestGroupFormFeedback
              promptText={res.data.response}
              closeForm={this.closeModal}
              requestNew={this.requestGroup}
            />
          ),
        });
      } else {
        this.setState({
          showPrompt: true,
          promptText: (
            <RequestGroupFormFeedback
              promptText={t('Alerts.errorSubmitting')}
              closeForm={this.closeModal}
              requestNew={this.requestGroup}
            />
          ),
        });
      }
      actions.validateResponseAccess(res);
    });
  };

  requestGroup = () => {
    this.setState({
      showPrompt: true,
      promptText: (
        <RequestGroupForm
          submitForm={this.submitRequestForm}
          closeForm={this.closeModal}
        />
      ),
    });
  };

  updatePrompt = data => {
    this.setState({
      showPrompt: data.showPrompt,
      promptText: (
        <PromptWithClose
          promptText={data.promptText}
          closeForm={this.closeModal}
        />
      ),
    });
  };

  closeModal = () => {
    this.setState({
      showPrompt: false,
      promptText: '',
    });
  };

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({
    googleClassroomName,
    googleClassroomId,
    selectedFlag,
  }) => {
    const googleClassroomsData = cloneDeep(this.state.googleClassrooms);
    let selectedFlagValue = false;

    if (selectedFlag === 'true') {
      selectedFlagValue = false;
    } else {
      selectedFlagValue = true;
    }

    const myGoogleClassroom = {
      googleClassroomId,
      googleClassroomName,
      googleClassroomDescription: '',
      googleClassroomSelected: selectedFlagValue,
    };

    googleClassroomsData[googleClassroomId] = myGoogleClassroom;

    this.setState(() => ({
      googleClassrooms: googleClassroomsData,
    }));
  };

  componentWillUnmount(){
    this.clearPendingPromises();
  }

  progress = false;

  handleSubmit = formValues => {
    formValues.preventDefault();
    if(!this.progress){
      this.progress=true;
      const { user } = this.props;

      let forceReloadStrData = cloneDeep(this.state.forceReloadStr);
      forceReloadStrData = Math.floor(Math.random() * 100000);

      const importGoogleClassroomsResult = API.post(
        GOOGLE_CLASSROOM_IMPORT_CLASSROOMS_ENDPOINT_URL,
        {
          googleClassrooms: this.state.googleClassrooms,
          cid: user.cid,
          at: user.at,
          token: user.token,
        }
      ).then(response => {
          const res = response.data;
          if (res.apiError == false) {
            const importResult = {
              status: res.status,
              statusMessage: res.statusMessage,
            };

            if (importResult.status === 'success') {
              //force reload the import google classes list....
              this.setState(() => ({
                forceReloadStr: forceReloadStrData,
              }));
            } else {
              //display an error message on the screen....
            }
            this.progress=false;
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });
    }
    // const waitForClick = cancellablePromise(delay(1000));
    // this.appendPendingPromise(waitForClick);

    // return waitForClick.promise
    // .then(() => {

    //   const { user } = this.props;

    //   let forceReloadStrData = cloneDeep(this.state.forceReloadStr);
    //   forceReloadStrData = Math.floor(Math.random() * 100000);

    //   const importGoogleClassroomsResult = API.post(
    //     GOOGLE_CLASSROOM_IMPORT_CLASSROOMS_ENDPOINT_URL,
    //     {
    //       googleClassrooms: this.state.googleClassrooms,
    //       cid: user.cid,
    //       at: user.at,
    //       token: user.token,
    //     }
    //   ).then(response => {
    //       const res = response.data;
    //       if (res.apiError == false) {
    //         const importResult = {
    //           status: res.status,
    //           statusMessage: res.statusMessage,
    //         };

    //         if (importResult.status === 'success') {
    //           //force reload the import google classes list....
    //           this.setState(() => ({
    //             forceReloadStr: forceReloadStrData,
    //           }));
    //         } else {
    //           //display an error message on the screen....
    //         }
    //       }
    //     })
    //     .catch(err => {
    //       throw ('Error: ', err);
    //     });

    // }).catch(errorInfo => {
    //   this.removePendingPromise(waitForClick);
    //   if (!errorInfo.isCanceled) {
    //     throw errorInfo.error;
    //   }
    // });
  };

  render() {
    const { user, actions } = this.props;
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
          render={({ fetchingContent, serviceResponse }) => (
            <Fragment>
              {!fetchingContent && (
                <Fragment>
                  <div className="inner-header-container">
                    <div className="inner-header-text">
                      <div className="big">{serviceResponse.pageHeading1}</div>
                      <div className="little">
                        {serviceResponse.pageHeading2}
                      </div>
                    </div>
                  </div>
                  <CenterColumn widths={['620px']}>
                    <div className="form-area">
                      <BarHeader title={serviceResponse.sectionHeading} />
                      <Request
                        serviceURL={
                          GOOGLE_CLASSROOM_GET_CLASSROOM_LIST_ENDPOINT_URL
                        }
                        requestBody={{}}
                        render={({ fetchingContent, serviceResponse }) => (
                          <Fragment>
                            {!fetchingContent && (
                              <Fragment>
                                <div>
                                  {serviceResponse.classroomList.length ===
                                    0 && (
                                    <p>
                                      You do not currently have any Google
                                      Classrooms available in your Google
                                      Classroom Account.
                                    </p>
                                  )}
                                  {serviceResponse.classroomList.length > 0 && (
                                    <form className="form">
                                      <div className="form-section form-section-area">
                                        <div className="form-field-container">
                                          {serviceResponse.classroomList.map(
                                            (item, index) => {
                                              return (
                                                <div
                                                  className="classroom-item"
                                                  key={`googleClassroomRow_${item.googleClassroomId}`}
                                                >
                                                  <div
                                                    className="classroom-title"
                                                    key={`importName_${item.googleClassroomId}`}
                                                  >
                                                    {item.hasDiscussionGroup ? (
                                                      <Link
                                                        to={
                                                          item.discussionGroupLinkUrl
                                                        }
                                                      >
                                                        {item.name}
                                                      </Link>
                                                    ) : (
                                                      <p>{item.name}</p>
                                                    )}
                                                  </div>
                                                  <div className="classroom-item-actions">
                                                    <div>
                                                      {!item.hasDiscussionGroup ? (
                                                        <Field
                                                          style={{
                                                            marginLeft: '0px',
                                                          }}
                                                          key={`importAction_${item.googleClassroomId}`}
                                                          name={`importAction_${item.googleClassroomId}`}
                                                          type="checkbox"
                                                          className="form-field"
                                                          component={InputField}
                                                          label=""
                                                          onChange={event => {
                                                            this.handleFieldChange(
                                                              {
                                                                googleClassroomName:
                                                                  item.name,
                                                                googleClassroomId:
                                                                  item.googleClassroomId,
                                                                selectedFlag:
                                                                  event.target
                                                                    .value,
                                                              }
                                                            );
                                                          }}
                                                        />
                                                      ) : (
                                                        <input
                                                          type="checkbox"
                                                          disabled
                                                          checked
                                                          className="form-field"
                                                        />
                                                      )}
                                                    </div>
                                                    <div
                                                      className="classroom-status"
                                                      key={`importStatus_${item.googleClassroomId}`}
                                                    >
                                                      {item.hasDiscussionGroup
                                                        ? 'Active'
                                                        : 'Please Import'}
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                      <div className="button-container">
                                        <button
                                          className="submit-button"
                                          onClick={this.handleSubmit}
                                        >
                                          Import Selected Google Classrooms as
                                          Clubs
                                        </button>
                                      </div>
                                    </form>
                                  )}
                                </div>
                              </Fragment>
                            )}
                          </Fragment>
                        )}
                      />
                    </div>
                  </CenterColumn>
                </Fragment>
              )}
            </Fragment>
          )}
        />

        <style jsx>{style}</style>
        <style jsx>{style2}</style>
        <style jsx>{style3}</style>
      </div>
    );
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
  actions: bindActionCreators(
    {
      validateResponseAccess,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: 'importGoogleClassroomsForm', enableReinitialize: true })(
    GroupImportGoogleClassrooms
  )
);
