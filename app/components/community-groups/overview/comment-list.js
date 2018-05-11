/***********************************
* V4 Community Group Comment List
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqueId from 'lodash/uniqueId'
import CommentListItem from './comment-list-item';
import CommentForm from './comment-form';
import { updateCommentsDisplayList, replyToActivity } from '../../../modules/community-group-activity-comments/actions';
import PaginateSet from '../../common/paginate-full-set/PaginateSet';

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
  communityGroupActivityComments,
  user,
}) => ({
  ...communityGroupActivityComments,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateCommentsDisplayList,
    replyToActivity,
  }, dispatch),
});
@connect(mapStateToProps, mapDispatchToProps)
class CommentList extends Component {
  static propTypes = {
    displayedComments: arrayOf(shape({})),
    threadId: number.isRequired,
    submitId: number,
    submitErrorId: number,
    replyId: number.isRequired,
    topicId: number.isRequired,
    submitted: shape({}),
  };
  static defaultProps = {
    displayedComments: [],
    submitId: 0,
    submitErrorId: 0,
    submitted: {},
  }

  handlePageChange = (paginatedSet, page) => {
    const {
      actions,
      threadId,
    } = this.props;
    // make call to update page and displayed replies here
    actions.updateCommentsDisplayList({
      page,
      threadId,
      displayedComments: paginatedSet,
    });
  }

  render() {
    const {
      actions,
      forumId,
      comments,
      displayedComments,
      paginationCount,
      threadId,
      submitErrorId,
      submitId,
      submitted,
      topicId,
      user,
    } = this.props;
    const showSubmitLoader = submitId === threadId;
    const showSubmitError = submitErrorId === threadId;
    const disableReplyButton = !!(submitId && submitId !== threadId);
    return (
      <div className="comment" key={threadId}>
        <CommentForm
          avatarURL={user.avatarURL}
          disableButton={disableReplyButton}
          key={uniqueId()}
          threadId={threadId}
          showSubmitError={showSubmitError}
          showSubmitLoader={showSubmitLoader}
          submitReply={actions.replyToActivity}
          submitted={submitted[threadId]}
          topicId={topicId}
        />
        {displayedComments.map((displayedComment) => {
          const likeParams = {
            callSource: 'groups',
            replyId: displayedComment.replyId,
            topicId,
            forumId,
          };
          return <CommentListItem {...displayedComment} likeParams={likeParams} />
        })}
        {displayedComments.length > 0 && <PaginateSet
          handlePageChange={this.handlePageChange}
          fullDataSet={comments.replies}
          count={paginationCount}
          totalCount={comments.replies.length}
          page={comments.page}
        />}
        <style jsx>{`
        `}</style>
      </div>
    );
  }
}


export default CommentList;
