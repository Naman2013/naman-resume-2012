/***********************************
 * V4 Community Group Overview Full Overview Layout
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroupMembers } from 'app/modules/community-group-overview/actions';
import ResponsiveTwoColumnContainer from 'app/components/ResponsiveTwoColumnContainer';
import TwoTabbedNav from 'app/components/TwoTabbedNav';
import { validateResponseAccess } from 'app/modules/authorization/actions';

import DiscussionsBoard from 'app/components/common/DiscussionsBoard';
import DiscussionBoardInvitationsPanel from 'app/components/community-groups/overview/DiscussionBoardInvitationsPanel';
import DiscussionBoardGoogleClassroomStudentsPanel from 'app/components/community-groups/overview/DiscussionBoardGoogleClassroomStudentsPanel';
import { GroupsNavigation } from 'app/pages/community-groups/groups-navigation';
import ObjectDetailsObservations from 'app/containers/object-details/ObjectDetailsObservations';
import MembersList from './members-list';
import { TopThreads } from '../../../modules/clubs';
import { createActivity } from '../../../modules/community-group-activity-list/actions';
import './full-information-style.scss';

const { arrayOf, bool, func, number, shape, string } = PropTypes;
const mapStateToProps = ({ communityGroupOverview, user }) => ({
  ...communityGroupOverview,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      createActivity,
      fetchGroupMembers,
      validateResponseAccess,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation()
class FullInformationOverview extends Component {
  static propTypes = {
    description: string,
    descriptionHeading: string,
    detailsHeading: string,
    detailsList: shape({}),
    context: shape({
      isDesktop: bool,
      isTablet: bool,
      isMobile: bool,
    }),
    heading: string,
    pageMeta: shape({
      canPost: bool,
      canSeeGroupContent: bool,
      topicId: number,
    }),
    joinOrLeaveGroup: func.isRequired,
    joinPrompt: string,
    membersCount: number,
    membersSort: string.isRequired,
    membersList: arrayOf(shape({})),
    showJoinPrompt: bool,

    jumpToThreadId: number,
  };

  static defaultProps = {
    detailsList: {},
    description: '',
    descriptionHeading: '',
    detailsHeading: '',
    context: {},
    heading: '',
    pageMeta: {
      canPost: false,
      canSeeGroupContent: false,
      topicId: null,
    },
    joinPrompt: '',
    showJoinPrompt: false,
    membersCount: 0,
    membersList: [],
    jumpToThreadId: null,
    subMenus: [],
  };

  render() {
    const {
      actions,
      discussionGroupId,
      context,
      pageMeta,
      joinOrLeaveGroup,
      membersCount,
      membersList,
      membersSort,
      leadersList,
      showJoinPrompt,
      refreshHeader,
      user,
      t,
      isEditMode,
      jumpToThreadId,
      subMenus,
      routeParams: { groupId },
      params,
      hideTitleSection,
    } = this.props;

    const createThreadFormParams = {
      canPost: pageMeta.canPost,
      forumId: pageMeta.forumId,
      joinOrLeaveGroup,
      showJoinPrompt,
      topicId: pageMeta.topicId,
      canSeeGroupContent: pageMeta.canSeeGroupContent,
      user,
    };

    const currentTab = window.location.pathname.split('/').pop();

    return (
      <div className="root">
        {pageMeta.canEditGroup &&
          isEditMode &&
          pageMeta.isGoogleClassroom === false && (
            <DiscussionBoardInvitationsPanel
              {...this.props}
              refreshHeader={refreshHeader}
            />
          )}
        {pageMeta.canEditGroup &&
          isEditMode &&
          pageMeta.isGoogleClassroom === true && (
            <DiscussionBoardGoogleClassroomStudentsPanel
              {...this.props}
              refreshHeader={refreshHeader}
            />
          )}

        <GroupsNavigation
          subMenus={subMenus}
          currentTab={currentTab}
          discussions={
            this.props.pageMeta.canSeeGroupContent && (
              <ResponsiveTwoColumnContainer
                // mobile view header start
                renderNavigationComponent={navProps => (
                  <TwoTabbedNav
                    firstTitle={t('Clubs.NavTitle')}
                    secondTitle={t('Clubs.NavSecondTitle')}
                    firstTabIsActive={navProps.showMainContainer}
                    firstTabOnClick={navProps.onShowMainContainer}
                    secondTabIsActive={navProps.showAsideContainer}
                    secondTabOnClick={navProps.onShowAsideContainer}
                  />
                )}
                // mobile view header end

                // right aside for desktop start
                renderAsideContent={() =>
                  !isEditMode &&
                  this.props.pageMeta.canSeeGroupContent && (
                    <div>
                      <div className="popular-discussion-wrapper">
                        <TopThreads
                          topicId={pageMeta.topicId}
                          isDesktop={context.isDesktop}
                          discussionGroupId={discussionGroupId}
                        />
                      </div>
                      <MembersList
                        membersSort={membersSort}
                        membersList={membersList}
                        membersCount={membersCount}
                        leadersList={leadersList}
                        discussionGroupId={discussionGroupId}
                        fetchGroupMembers={actions.fetchGroupMembers}
                        isDesktop={context.isDesktop}
                      />
                    </div>
                  )
                }
                // right aside for desktop end

                // discussions dashboard for mobile & desktop
                isScreenSize={context.isScreenLarge}
                renderMainContent={() =>
                  !isEditMode &&
                  pageMeta.canSeeGroupContent === true && (
                    <div className="discuss-container">
                      <DiscussionsBoard
                        errorMessage={t('Clubs.FetchingListError')}
                        topicId={pageMeta.topicId}
                        forumId={pageMeta.forumId}
                        callSource="groups"
                        createThread={actions.createActivity}
                        createThreadFormParams={createThreadFormParams}
                        user={user}
                        validateResponseAccess={actions.validateResponseAccess}
                        discussionGroupId={discussionGroupId}
                        jumpToThreadId={jumpToThreadId}
                        canSeeGroupContent={pageMeta.canSeeGroupContent}
                        isClub
                      />
                    </div>
                  )
                }
              />
            )
          }
          observations={
            <ObjectDetailsObservations
              groupId={groupId}
              params={params}
              hideTitleSection={hideTitleSection}
            />
          }
        />
      </div>
    );
  }
}

export default FullInformationOverview;
