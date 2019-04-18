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
import {
  astronaut,
} from '../../../styles/variables/colors_tiles_v4';
import { screenLarge } from 'app/styles/variables/breakpoints';
import { createActivity } from '../../../modules/community-group-activity-list/actions';
import { fetchGroupMembers } from 'app/modules/community-group-overview/actions';
import ResponsiveTwoColumnContainer from 'app/components/ResponsiveTwoColumnContainer';
import TwoTabbedNav from 'app/components/TwoTabbedNav';
import  {TopThreads }  from '../../../modules/clubs';

import MembersList from './members-list';
import DiscussionsBoard from 'app/components/common/DiscussionsBoard';
import DiscussionBoardInvitationsPanel from 'app/components/community-groups/overview/DiscussionBoardInvitationsPanel';
import DiscussionBoardGoogleClassroomStudentsPanel from 'app/components/community-groups/overview/DiscussionBoardGoogleClassroomStudentsPanel';
import messages from './activity-form.messages';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;
const mapStateToProps = ({
  communityGroupOverview,
  user,
}) => ({
  ...communityGroupOverview,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createActivity,
    fetchGroupMembers,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
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
      user,
    };

    return (
      <div className="root">
        {pageMeta.canEditGroup && isEditMode && pageMeta.isGoogleClassroom === false && <DiscussionBoardInvitationsPanel {...this.props} refreshHeader={refreshHeader} />}
        {pageMeta.canEditGroup && isEditMode && pageMeta.isGoogleClassroom === true && <DiscussionBoardGoogleClassroomStudentsPanel {...this.props} refreshHeader={refreshHeader} />}

        <ResponsiveTwoColumnContainer
          renderNavigationComponent={navProps =>
            (<TwoTabbedNav
              firstTitle={intl.formatMessage(messages.NavTitle)}
              secondTitle={intl.formatMessage(messages.NavSecondTitle)}
              firstTabIsActive={navProps.showMainContainer}
              firstTabOnClick={navProps.onShowMainContainer}
              secondTabIsActive={navProps.showAsideContainer}
              secondTabOnClick={navProps.onShowAsideContainer}
            />)
          }
          renderAsideContent={() => (
            
              !isEditMode && <div>
              <TopThreads 
                topicId={pageMeta.topicId}
                isDesktop={context.isDesktop} />
              <MembersList
                membersSort={membersSort}
                membersList={membersList}
                membersCount={membersCount}
                discussionGroupId={discussionGroupId}
                fetchGroupMembers={actions.fetchGroupMembers}
                isDesktop={context.isDesktop}
              />
            </div>)
          
        }
          isScreenSize={context.isScreenLarge}
          renderMainContent={() => (
            !isEditMode && <div className="discuss-container">
              <DiscussionsBoard
                errorMessage={intl.formatMessage(messages.FetchingListError)}
                topicId={pageMeta.topicId}
                forumId={pageMeta.forumId}
                callSource="groups"
                createThread={actions.createActivity}
                createThreadFormParams={createThreadFormParams}
              />
            </div>
          )}
        />

        <style jsx>{`
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
