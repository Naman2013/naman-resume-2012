/***********************************
* V4 Community Group Activity List
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActivityListItem from './activity-list-item';
import { toggleAllCommentsAndDisplay } from '../../../modules/community-group-activity-comments/actions';
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
  communityGroupActivity,
  communityGroupActivityComments,
  user,
}) => ({
  ...communityGroupActivity,
  communityGroupActivityComments,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toggleAllCommentsAndDisplay,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ActivityList extends Component {
  static propTypes = {
    threadList: arrayOf(shape({})),
    threadCount: number,
    fetching: bool.isRequired,
    error: bool.isRequired,
  }

  static defaultProps = {
    threadList: [],
    threadCount: 0,
  }


  render() {
    const {
      actions,
      threadList,
      threadCount,
      topicId,
      fetching,
      error,
      communityGroupActivityComments: { allDisplayedComments, allComments },
    } = this.props;
    return (
      <div className="short-info">
        {fetching && <div>Loading</div>}
        {(!fetching && error) && <div>There was an error getting group activity</div>}
        {(!fetching && !error && threadCount === 0) && <div>There is no activity</div>}
        {(!fetching && !error && threadCount > 0) && <div>
          {threadList.map((thread) => {
            const likeParams = {
              callSource: 'groups',
              replyId: thread.replyId,
              topicId,
            };
            const threadComments = allComments[thread.threadId] || { replies: [] };
            const allDisplayedCommentsObj = threadComments
              .replies
              .filter(item => allDisplayedComments[thread.threadId] && allDisplayedComments[thread.threadId].indexOf(item.replyId) > -1);

            return (<ActivityListItem
              {...thread}
              comments={allComments[thread.threadId]}
              likeParams={likeParams}
              key={thread.threadId}
              topicId={topicId}
              toggleAllCommentsAndDisplay={actions.toggleAllCommentsAndDisplay}
              displayedComments={allDisplayedCommentsObj}
            />)
          })}
        </div>}
        <style jsx>{`

        `}</style>
      </div>
    )
  }
}

export default ActivityList;
