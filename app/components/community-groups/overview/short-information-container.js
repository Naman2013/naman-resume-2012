/***********************************
* V4 Community Group Short Overview Layout
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createActivity } from '../../../modules/community-group-activity-list/actions';
import ShortInformation from './short-information';
import MembersList from './members-list';
import DiscussionsBoard from 'components/common/DiscussionsBoard';
import {
  darkBlueGray,
  white,
} from '../../../styles/variables/colors';

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
class ShortInformationOverview extends Component {
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
  }

  static defaultProps = {
    description: '',
    descriptionHeading: '',
    detailsHeading: '',
    detailsList: {},
    heading: '',
    pageMeta: {
      headingList: [],
      canPost: false,
    },
    joinPrompt: '',
    membersCount: 0,
    membersList: [],
    showJoinPrompt: false,
  }

  constructor(props) {
    super(props);
  }

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
      <div className="short-info">
        <div className="left-container">
          {pageMeta.headingList.length > 0 && pageMeta.headingList.join(' ')}
          <DiscussionsBoard
            errorMessage="There was an error fetching list"
            topicId={pageMeta.topicId}
            forumId={pageMeta.forumId}
            callSource="groups"
            createThread={actions.createActivity}
            createThreadFormParams={createThreadFormParams}
          />
        </div>
        <aside className="right-container">
          <ShortInformation
            description={description}
            descriptionHeading={descriptionHeading}
            detailsHeading={detailsHeading}
            detailsList={detailsList}
            heading={heading}
            joinPrompt={joinPrompt}
            showJoinPrompt={showJoinPrompt}
            joinOrLeaveGroup={joinOrLeaveGroup}
          />
          <MembersList
            membersList={membersList}
            membersCount={membersCount}
          />
        </aside>
        <style jsx>{`
          .short-info {
            display: flex;
            flex-direction: row;
            padding: 25px;
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

export default ShortInformationOverview;
