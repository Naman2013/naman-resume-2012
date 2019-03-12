import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { intlShape, injectIntl } from 'react-intl';
import GroupTiles from 'components/groups-hub/group-tiles';
import Request from 'components/common/network/Request';
import RequestGroupForm from 'components/community-groups/request-group-form';
import PromptWithClose from 'components/community-groups/prompt-with-close';
import RequestGroupFormFeedback from 'components/community-groups/request-group-form-feedback';
import HubContainer from 'components/common/HubContainer';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import ShowMoreWithNetwork from 'components/common/show-more-with-network';
import { GROUPS_PAGE_ENDPOINT_URL, GET_GROUPS } from 'services/community-groups';
import { DeviceContext } from 'providers/DeviceProvider';
import Button from 'components/common/style/buttons/Button';
import { validateResponseAccess } from 'modules/authorization/actions'
import { customModalStylesBlackOverlay } from 'styles/mixins/utilities';
import { requestGroup } from 'services/community-groups/request-group';
import { browserHistory } from 'react-router';
import { ACTION as clubsActions } from '../../modules/clubs/reducer';
import { GOOGLE_CLASSROOM_GET_CLASSROOM_LIST_ENDPOINT_URL } from 'services/classroom/classroom.js';
import style from './groups-hub.style';
import messages from './GroupsHub.messages';

const COUNT = 9;
const DEFAULT_PAGE = 1;


const groupsHubModel = {
  name: 'GROUP_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};

const googleClassroomModel = {
  name: 'GOOGLE_CLASSROOM_MODEL',
  model: resp => ({
    googleClassrooms: resp.googleClassrooms,
    hasGoogleClassroomEnabled: resp.hasGoogleClassroomEnabled,
  }),
};

class Groups extends Component {
  static propTypes = {
    validateResponseAccess: PropTypes.func,
    params: PropTypes.shape({
      filterType: PropTypes.string,
    }),
    intl: intlShape.isRequired,
    isFetching: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    validateResponseAccess: noop,
    params: {
      filterType: 'all'
    },
  };

  state = {
    groups: [],
    showPrompt: false,
    promptText: '',
  };

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


    if (resData.removeGroupFlag) {
      newGroupsList = newGroupsList.filter(group => group.discussionGroupId !== id);
    }

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

  clearGroups = () => {
    this.setState({
      groups: [],
    });
  }

  render() {
    const {
      user,
      actions,
      intl,
      isFetching,
    } = this.props;

    const {
      groups,
      showPrompt,
      promptText,
    } = this.state;

    return (<div>
      <Request
        serviceURL={GROUPS_PAGE_ENDPOINT_URL}
        model={groupsHubModel}
        requestBody={{ currentGroupSet: this.props.params.filterType }}
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
                      renderRightMenu={() => (
                        <div className="flex">
                          {serviceResponse.canRequestGroup ? <Button text={intl.formatMessage(messages.requestGroup)} onClickEvent={this.requestGroup} /> : null}
                        </div>
                      )}
                      updateList={this.updateGroupsList}
                      appendToList={this.appendToGroupsList}
                      iconURL={serviceResponse.pageIconURL}
                      pageTitle={serviceResponse.pageTitle}
                      filterType={this.props.params.filterType}
                      clearTiles={this.clearGroups}
                      hubActions={{
                        hubGetRequestStart: actions.getClubs,
                        hubGetRequestSuccess: actions.getClubsSuccess,
                        hubGetRequestError: actions.getClubsError,
                      }}
                      render={() => (
                        <Fragment>
                          {isFetching ? <div>{intl.formatMessage(messages.loading)}</div> : null}
                          {!isFetching &&
                            <GroupTiles
                              filterType={this.props.params.filterType}
                              closeModal={this.closeModal}
                              updateGroupItemInfo={this.updateGroupItemInfo}
                              updatePrompt={this.updatePrompt}
                              groups={groups}
                              isMobile={context.isMobile}
                            />}
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
    </div>)
  }
}

const mapStateToProps = ({
  user,
  clubs,
}) => ({
  user,
  isFetching: clubs.isFetching,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    validateResponseAccess,
    ...clubsActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Groups));
