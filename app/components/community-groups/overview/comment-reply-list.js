/***********************************
* V4 Community Group Comment Reply List
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqueId from 'lodash/uniqueId'
import CommentRepliesListItem from './comment-reply-list-item';
import CommentForm from './comment-form';
import { updateCommentRepliesDisplayList, replyToComment } from '../../../modules/community-group-activity-comment-replies/actions';
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
  communityGroupActivityCommentReplies,
  user,
}) => ({
  ...communityGroupActivityCommentReplies,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateCommentRepliesDisplayList,
    replyToComment,
  }, dispatch),
});
@connect(mapStateToProps, mapDispatchToProps)
class CommentRepliesList extends Component {
  static propTypes = {
    displayedReplies: arrayOf(shape({})),
    replyId: number.isRequired,
    submitId: number,
    submitErrorId: number,
    replyId: number.isRequired,
    topicId: number.isRequired,
    submitted: shape({}),
  };
  static defaultProps = {
    displayedReplies: [],
    submitId: 0,
    submitErrorId: 0,
    submitted: {},
  }

  handlePageChange = (paginatedSet, page) => {
    const {
      actions,
      replyId,
    } = this.props;
    // make call to update page and displayed replies here
    actions.updateCommentRepliesDisplayList({
      page,
      replyId,
      displayedReplies: paginatedSet,
    });
  }

  render() {
    const {
      actions,
      forumId,
      commentReplies,
      displayedReplies,
      paginationCount,
      submitErrorId,
      submitId,
      submitted,
      topicId,
      threadId,
      replyId,
      user,
    } = this.props;
    const showSubmitLoader = submitId === replyId;
    const showSubmitError = submitErrorId === replyId;
    const disableReplyButton = !!(submitId && submitId !== replyId);

    return (
      <div className="comment" key={replyId}>
        <CommentForm
          avatarURL={user.avatarURL}
          disableButton={disableReplyButton}
          key={uniqueId()}
          replyId={replyId}
          showSubmitError={showSubmitError}
          showSubmitLoader={showSubmitLoader}
          submitReply={actions.replyToComment}
          submitted={submitted[replyId]}
          topicId={topicId}
          threadId={threadId}
          replyTo={replyId}
        />
        {displayedReplies.map((displayedComment) => {
          const likeParams = {
            callSource: 'groups',
            replyId: displayedComment.replyId,
            topicId,
            forumId,
          };
          return (<CommentRepliesListItem
            key={displayedComment.replyId}
            {...displayedComment}
            likeParams={likeParams}
          />)
        })}
        {displayedReplies.length > 0 && <PaginateSet
          handlePageChange={this.handlePageChange}
          fullDataSet={commentReplies.replies}
          count={paginationCount}
          totalCount={commentReplies.replies.length}
          page={commentReplies.page}
        />}
        <style jsx>{`
        `}</style>
      </div>
    );
  }
}


export default CommentRepliesList;
