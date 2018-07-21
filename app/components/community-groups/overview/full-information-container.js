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
  darkBlueGray,
  white,
} from '../../../styles/variables/colors';
import { createActivity } from '../../../modules/community-group-activity-list/actions';
import MembersList from './members-list';
import FullInformation from './full-information';
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
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class FullInformationOverview extends Component {

  static propTypes = {
    description: string,
    descriptionHeading: string,
    detailsHeading: string,
    detailsList: shape({}),
    heading: string,
    pageMeta: shape({
      headingList: arrayOf(string),
      canPost: bool,
    }),
    joinOrLeaveGroup: func.isRequired,
    joinPrompt: string,
    membersCount: number,
    membersList: arrayOf(shape({})),
    showJoinPrompt: bool,
  };

  static defaultProps = {
    detailsList: {},
    description: '',
    descriptionHeading: '',
    detailsHeading: '',
    heading: '',
    pageMeta: {
      headingList: [],
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
      heading,
      pageMeta,
      joinOrLeaveGroup,
      joinPrompt,
      membersCount,
      membersList,
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
      <div>
        <div className="full-info">
          <div className="flex-child">
            <FullInformation
              description={description}
              descriptionHeading={descriptionHeading}
              detailsHeading={detailsHeading}
              detailsList={detailsList}
              heading={heading}
              joinPrompt={joinPrompt}
              showJoinPrompt={showJoinPrompt}
              joinOrLeaveGroup={joinOrLeaveGroup}
            />
          </div>
          <div className="flex-child left-container">
            {pageMeta.headingList && pageMeta.headingList.length > 0 && pageMeta.headingList.join(' ')}
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
              membersList={membersList}
              membersCount={membersCount}
            />
          </aside>
        </div>
        <style jsx>{`
          .full-info {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .flex-child:first-child {
            width: 100%;
          }

          .left-container {
            flex: 3;
          }

          .right-container {
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}

export default FullInformationOverview;
