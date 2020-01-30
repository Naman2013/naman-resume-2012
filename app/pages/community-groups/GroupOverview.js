/***********************************
 * V4 Community Group Overview Page
 *
 *
 *
 ***********************************/

import React, { Component, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { DeviceContext } from 'providers/DeviceProvider';
import Header from 'app/components/community-groups/overview/header';
import FullInformationOverview from 'app/components/community-groups/overview/full-information-container';
import CenterColumn from 'app/components/common/CenterColumn';
import {
  modalStyleFullPage,
  customModalStylesBlackOverlay,
} from 'app/styles/mixins/utilities';
import MembersList from 'app/components/community-groups/overview/members-list';
import BackBar from 'app/components/common/style/buttons/BackBar';
import PromptWithClose from 'app/components/community-groups/prompt-with-close';

import { joinOrLeaveGroup } from 'app/modules/community-groups/actions';
import { astronaut, seashell } from 'app/styles/variables/colors_tiles_v4';
import {
  SCREEN_SMALL,
  SCREEN_MEDIUM,
  SCREEN_LARGE,
  screenMedium,
  screenLarge,
} from 'app/styles/variables/breakpoints';
import {
  fetchGroupOverviewPageMeta,
  fetchGroupOverview,
} from 'app/modules/community-group-overview/actions';

const mapStateToProps = ({ communityGroupOverview }) => ({
  communityGroupOverview,
  pageMeta: communityGroupOverview.pageMeta,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchGroupOverviewPageMeta,
      fetchGroupOverview,
      joinOrLeaveGroup,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class CommunityGroupOverview extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    showPopup: false,
    showAskPrompt: false,
    promptText: '',
  };

  componentWillMount() {
    const {
      actions,
      routeParams: { groupId },
    } = this.props;

    actions.fetchGroupOverviewPageMeta({
      discussionGroupId: groupId,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.groupId !== nextProps.routeParams.groupId) {
      this.props.actions.fetchGroupOverviewPageMeta({
        discussionGroupId: nextProps.routeParams.groupId,
      });
    }
  }

  refreshHeader = () => {
    const {
      actions,
      routeParams: { groupId },
    } = this.props;

    actions.fetchGroupOverviewPageMeta({
      discussionGroupId: groupId,
    });
  };

  joinLeaveGroup = () => {
    const {
      routeParams: { groupId },
      actions,
    } = this.props;

    actions
      .joinOrLeaveGroup({
        discussionGroupId: groupId,
      })
      .then(() => {
        this.refreshHeader();
      });
  };

  showInformation = e => {
    this.setState({
      showPopup: true,
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
    this.refreshHeader();
  };

  closeModal = e => {
    this.setState({
      showPopup: false,
      showPrompt: false,
      promptText: '',
    });
  };

  render() {
    const {
      communityGroupOverview,
      pageMeta,
      params,
      router: { location },
      routeParams: { groupId, edit, threadId },
      actions,
    } = this.props;
    const { subMenus } = pageMeta;
    const { showPopup, showPrompt, promptText } = this.state;

    const modalStyles = modalStyleFullPage;

    modalStyles.content = Object.assign(modalStyleFullPage.content, {
      backgroundColor: seashell,
    });

    return (
      <div className="root">
        <DeviceContext.Consumer>
          {context => (
            <Fragment>
              <CenterColumn
                widths={['768px', '940px', '940px']}
                theme={{ paddingTop: '25px' }}
              >
                <Header
                  isEditMode={edit}
                  condensed={false}
                  showInformation={this.showInformation}
                  joinOrLeaveGroup={this.joinLeaveGroup}
                  discussionGroupId={groupId}
                  updatePrompt={this.updatePrompt}
                  {...context}
                  {...communityGroupOverview}
                  {...pageMeta}
                />

                <FullInformationOverview
                  refreshHeader={this.refreshHeader}
                  joinOrLeaveGroup={this.joinLeaveGroup}
                  context={context}
                  discussionGroupId={groupId}
                  isEditMode={edit}
                  jumpToThreadId={threadId}
                  subMenus={subMenus}
                  params={params}
                  location={location}
                  hideTitleSection
                  observationsTabCustomClass="groups-observations-container"
                />
              </CenterColumn>
              <Modal
                ariaHideApp={false}
                isOpen={showPopup}
                style={modalStyles}
                contentLabel="Group Info"
                onRequestClose={this.closeModal}
              >
                <BackBar onClickEvent={this.closeModal} />
                <Header
                  condensed
                  showInformation={this.showInformation}
                  joinOrLeaveGroup={this.joinLeaveGroup}
                  discussionGroupId={groupId}
                  isEditMode={edit}
                  {...context}
                  {...communityGroupOverview}
                  {...pageMeta}
                />

                <h2 className="groupmembers-contain">
                  <span className="groupmembers">Group members</span>
                  {` (${communityGroupOverview.membersCount})`}
                </h2>
                <MembersList
                  membersSort={communityGroupOverview.membersSort}
                  membersList={communityGroupOverview.membersList}
                  membersCount={communityGroupOverview.membersCount}
                  discussionGroupId={groupId}
                  fetchGroupMembers={actions.fetchGroupMembers}
                  isDesktop={context.isDesktop}
                  theme={{ marginLeft: 0 }}
                />
              </Modal>
            </Fragment>
          )}
        </DeviceContext.Consumer>

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

        <style jsx>{`
          .root {
            color: ${astronaut};
            background-color: ${seashell};
          }

          .groupmembers-contain {
            color: ${astronaut};
            font-size: 16px;
            text-transform: uppercase;
            margin: 25px 0;
            text-align: center;
          }

          .groupmembers {
            font-weight: normal;
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  }
}

export default CommunityGroupOverview;
