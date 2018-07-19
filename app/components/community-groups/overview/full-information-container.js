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
import {
  astronaut,
} from '../../../styles/variables/colors_tiles_v4';
import { screenLarge } from 'styles/variables/breakpoints';
import { createActivity } from '../../../modules/community-group-activity-list/actions';
import { fetchGroupMembers } from 'modules/community-group-overview/actions';

import MembersList from './members-list';
import DiscussionsBoard from 'components/common/DiscussionsBoard';

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
      user,
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
          <div className="flex-child left-container">
            <DiscussionsBoard
              errorMessage="There was an error fetching list"
              topicId={pageMeta.topicId}
              forumId={pageMeta.forumId}
              callSource="groups"
              createThread={actions.createActivity}
              createThreadFormParams={createThreadFormParams}
            />
          </div>
          <aside className="flex-child right-container">
            <MembersList
              membersSort={membersSort}
              membersList={membersList}
              membersCount={membersCount}
              discussionGroupId={discussionGroupId}
              fetchGroupMembers={actions.fetchGroupMembers}
              isDesktop={context.isDesktop}
            />
          </aside>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .left-container {
          width: 100%;
        }

        .right-container {
          display: none;
        }

        @media ${screenLarge} {
          .left-container {
            width: 674px;
            padding: 15px 0;
          }

          .right-container {
            display: block;
            width: 350px;
          }

        }


      `}</style>
    </div>
    )
  }
}

export default FullInformationOverview;
