/***********************************
 * V4 Community Group Overview Full Overview Layout
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { intlShape, injectIntl } from 'react-intl';
import { astronaut } from '../../../styles/variables/colors_tiles_v4';
import { screenLarge } from 'app/styles/variables/breakpoints';
import { createActivity } from '../../../modules/community-group-activity-list/actions';
import { fetchGroupMembers } from 'app/modules/community-group-overview/actions';
import ResponsiveTwoColumnContainer from 'app/components/ResponsiveTwoColumnContainer';
import TwoTabbedNav from 'app/components/TwoTabbedNav';
import { validateResponseAccess } from 'app/modules/authorization/actions';
import { TopThreads } from '../../../modules/clubs';

import MembersList from './members-list';
import DiscussionsBoard from 'app/components/common/DiscussionsBoard';
import DiscussionBoardInvitationsPanel from 'app/components/community-groups/overview/DiscussionBoardInvitationsPanel';
import DiscussionBoardGoogleClassroomStudentsPanel from 'app/components/community-groups/overview/DiscussionBoardGoogleClassroomStudentsPanel';
import messages from './activity-form.messages';

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
    intl: intlShape.isRequired,
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
  };

  render() {
    const {
      actions,
      description,
      descriptionHeading,
      detailsHeading,
      detailsList,
      discussionGroupId,
      context,
      heading,
      pageMeta,
      joinOrLeaveGroup,
      joinPrompt,
      membersCount,
      membersList,
      membersSort,
      leadersList,
      showJoinPrompt,
      refreshHeader,
      user,
      intl,
      isEditMode,
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

        {this.props.pageMeta.canSeeGroupContent && <ResponsiveTwoColumnContainer
          renderNavigationComponent={navProps => (
            <TwoTabbedNav
              firstTitle={intl.formatMessage(messages.NavTitle)}
              secondTitle={intl.formatMessage(messages.NavSecondTitle)}
              firstTabIsActive={navProps.showMainContainer}
              firstTabOnClick={navProps.onShowMainContainer}
              secondTabIsActive={navProps.showAsideContainer}
              secondTabOnClick={navProps.onShowAsideContainer}
            />
          )}
          renderAsideContent={() =>
            !isEditMode && this.props.pageMeta.canSeeGroupContent && (
              <div>
                <TopThreads
                  topicId={pageMeta.topicId}
                  isDesktop={context.isDesktop}
                />
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
          isScreenSize={context.isScreenLarge}
          renderMainContent={() =>
            !isEditMode && pageMeta.canSeeGroupContent === true && (
              <div className="discuss-container">
                <DiscussionsBoard
                  errorMessage={intl.formatMessage(messages.FetchingListError)}
                  topicId={pageMeta.topicId}
                  forumId={pageMeta.forumId}
                  callSource="groups"
                  createThread={actions.createActivity}
                  createThreadFormParams={createThreadFormParams}
                  user={user}
                  validateResponseAccess={actions.validateResponseAccess}
                  discussionGroupId={discussionGroupId}
		  canSeeGroupContent={pageMeta.canSeeGroupContent}
                  isClub
                />
              </div>
            )
          }
        />
      }

        <style jsx>
          {`
            .root {
            }

            .discuss-container {
              margin-top: 15px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default injectIntl(FullInformationOverview);
