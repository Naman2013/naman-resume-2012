/***********************************
* V4 Discussion Comments List Bootstrapped
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import isMatch from 'lodash/isMatch';
import take from 'lodash/take';
import { submitReply } from 'services/discussions/submit-reply';
import CommentListItem from './CommentListItem';
import Form from './ReplyForm';
import ShowMoreFullSet from '../../common/ShowMoreFullSet';
import Button from 'components/common/style/buttons/Button';
import styles from './DiscussionsBoard.style';


const {
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class CommentList extends Component {
  static propTypes = {
    callSource: string,
    canSubmitReplies: bool,
    count: number,
    discussions: shape({
      threadsList: shape({}).isRequired,
      commentsList: shape({}).isRequired,
      displayedComments: shape({}).isRequired,
    }).isRequired,
    discussionsActions: shape({
      updateThreadsProps: func.isRequired,
      updateCommentsProps: func.isRequired,
    }).isRequired,
    header: string,
    resultsCount: number,
    isDesktop: bool.isRequired,
    fetching: bool,
    forumId: oneOfType([number, string]),
    replies: arrayOf(shape({})),
    threadId: oneOfType([number, string]),
    topicId: oneOfType([number, string]),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };
  static defaultProps = {
    callSource: null,
    canSubmitReplies: true,
    count: 10,
    header: 'Replies',
    resultsCount: 0,
    fetching: false,
    forumId: null,
    replies: [],
    threadId: null,
    topicId: null,
  }

  componentWillReceiveProps(nextProps) {
    const {
      replies,
      discussionsActions,
      threadId,
    } = this.props;
    if (!isMatch(replies, nextProps.replies)) { // fresh set of replies from API
      const displayedComments = take([].concat(nextProps.replies), nextProps.count)
        .map(reply => reply.replyId);
      const commentsList = nextProps.replies.map((rep) => {
        const newRep = Object.assign({}, rep);
        newRep.page = 1;
        newRep.showAllReplies = false;
        return newRep;
      });
        discussionsActions.updateCommentsProps(threadId, commentsList, displayedComments);
    }
  }

  get displayedCommentsObjs() {
    const {
      threadId,
      discussions: {
        commentsList,
        displayedComments,
      },
    } = this.props;
    const comments = commentsList[threadId] || [];
    const displayed = displayedComments[threadId] || [];
    return [].concat(comments).filter(reply => displayed.indexOf(reply.replyId) > -1);
  }

  handleShowMore = (paginatedSet, page) => {
    const {
      threadId,
      discussionsActions: { updateCommentsProps },
      discussions: { commentsList },
    } = this.props;

    let newCommentsList = Object.assign({}, commentsList[threadId]);
    newCommentsList = newCommentsList.map((comment) => {
      const newComment = Object.assign({}, comment);
      newComment.page = page;
      return newComment;
    });
    updateCommentsProps(threadId, newCommentsList, paginatedSet)
  }

  handleReply = (params, callback) => {
    submitReply(params).then((res) => {
      const { apiError, reply } = res.data;
      if (!apiError) {
        const {
          count,
          threadId,
          discussions: { commentsList, displayedComments, threadsList },
          discussionsActions: { updateCommentsProps, updateThreadsProps },
        } = this.props;
        if (commentsList[threadId]) {
          let newThreadsList = Object.assign({}, threadsList);
          const comments = commentsList[threadId];
          const { page } = comments;
          const displayed = displayedComments[threadId] || [];
          const lastPage = (Math.ceil(comments.length / count)) || 1;
          let newDisplayedComments = [].concat(displayed);

          // add new comment to the thread's list of commments in state
          const newCommentsList = [].concat(comments, Object.assign({ likesCount: 0 }, reply));
          // update comment count on the thread
          newThreadsList = newThreadsList.map((thread) => {
            const newThread = Object.assign({}, thread);
            newThread.replyCount += 1;
            return newThread;
          });

          if (page === lastPage) { // if there's only one page of comments, append the new comment to the displayed comments
            newDisplayedComments = [].concat(newDisplayedComments, reply.replyId);
          }

          // set state in parent component
          updateCommentsProps(threadId, newCommentsList, newDisplayedComments);
          updateThreadsProps(newThreadsList);
        }
      }
      callback(res.data);
    });
  }

  render() {
    const {
      callSource,
      canSubmitReplies,
      count,
      fetching,
      discussions: { commentsList },
      forumId,
      isDesktop,
      renderToggle,
      replyTo,
      threadId,
      topicId,
      user,
    } = this.props;

    const comments = commentsList[threadId] || {};
    const { page, replyCount } = comments;

    const { displayedCommentsObjs } = this;
    return (
      <div className="comment" key={uniqueId()}>
        <div className="bordered-container">
          {canSubmitReplies ? <Form
            avatarURL={user.avatarURL}
            callSource={callSource}
            forumId={forumId}
            key={uniqueId()}
            replyTo={replyTo}
            submitReply={this.handleReply}
            threadId={threadId}
            topicId={topicId}
            user={user}
            isDesktop={isDesktop}
          /> : null}
        </div>
        {replyCount > 0 ? <div className="replies-list-contanier">
          <div className="num-replies">
            <span className="replies-number">Replies: {replyCount}</span>
          </div>
          <div className="replies-list">
            {displayedCommentsObjs.map((displayedComment) => {
              const likeParams = {
                callSource,
                replyId: displayedComment.replyId,
                topicId,
                forumId,
              };
              return (<CommentListItem
                key={displayedComment.replyId}
                allowReplies={canSubmitReplies}
                {...displayedComment}
                likeParams={likeParams}
                isDesktop={isDesktop}
                threadId={threadId}
                topicId={topicId}
                replyTo={displayedComment.replyId}
                forumId={forumId}
                submitReply={this.handleReply}
                count={count}
                callSource={callSource}
                user={user}
                openModal={this.openModal}
              />)
           })}
           </div>
        </div> : null}

        <div className="flex toggle-container">
          {displayedCommentsObjs.length > 0 && <ShowMoreFullSet
            handleShowMore={this.handleShowMore}
            fullDataSet={comments}
            count={count}
            totalCount={comments.length}
            page={page}
          />}
          {renderToggle ? renderToggle() : null}
        </div>
        <style jsx>{styles}</style>

      </div>
    );
  }
}


export default CommentList;
