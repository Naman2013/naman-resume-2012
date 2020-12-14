/***********************************
 * V4 Common Discussions Board
 *
 *
 *
 ***********************************/

import React, { Component, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import take from 'lodash/take';
import ConnectUserAndResponseAccess from 'redux/components/ConnectUserAndResponseAccess';
import { DeviceContext } from 'providers/DeviceProvider';
import { THREAD_REPLIES } from 'app/services/discussions';
import DiscussionsThreads from './DiscussionsThreads';
import DiscussionComments from './DiscussionComments';

const { any, bool, func, number, shape, string } = PropTypes;

class DiscussionsBoard extends PureComponent {
  static propTypes = {
    callSource: string,
    count: number,
    errorMessage: string,
    forumId: number,
    page: number,
    topicId: number,
    topLevelThread: bool,
    createThread: func.isRequired,
    createThreadFormParams: shape({}),
    isClub: bool,
    jumpToThreadId: number,
  };

  static defaultProps = {
    callSource: null,
    count: 10,
    errorMessage: 'There was an error.',
    forumId: null,
    page: 1,
    topicId: null,
    topLevelThread: true,
    createThreadFormParams: {},
    isClub: false,
    jumpToThreadId: null,
  };

  state = {
    threadsList: [],
    displayedThreads: [],
    threadsCount: 0,
    commentsList: {},
    displayedComments: {},
    page: this.props.page,
  };

  updateThreadsProps = (threadsList, threadsCount, displayed) => {
    const newThreadsList = threadsList || this.state.threadsList;
    const newThreadsCount = Number(threadsCount) || this.state.threadsCount;
    const displayedThreads = displayed || this.state.displayedThreads;
    const displayedComments = Object.keys(this.state.displayedComments);
    const commentsList = Object.keys(this.state.commentsList);
    const newCommentsList = { ...this.state.commentsList };

    newThreadsList.map(item => {
      if (displayedComments.includes(item.threadId.toString())) {
        item.showComments = true;
      }
      return item;
    });

    commentsList.map(item => {
      if (displayedComments.includes(item)) {
        newCommentsList[item].showComments = true;
      }
      return item;
    });

    this.setState({
      threadsList: newThreadsList,
      threadsCount: newThreadsCount,
      displayedThreads,
      commentsList: newCommentsList,
    });
  };

  getReplies = (threadId, replyTo) => {
    const {
      callSource,
      count,
      topicId,
      forumId,
      validateResponseAccess,
      user,
    } = this.props;
    const { commentsList, page } = this.state;

    API.post(THREAD_REPLIES, {
      callSource,
      topicId,
      threadId,
      forumId,
      replyTo: replyTo || threadId,
      page: 1,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then(res => {
      validateResponseAccess(res);
      if (!res.data.apiError) {
        const { replies } = res.data;
        const newReplies = replies.map((reply, index) => {
          const currentReply = Object.assign({}, reply);
          currentReply.page = 1;
          if (
            commentsList[threadId] &&
            commentsList[threadId][index]?.replyId === currentReply.replyId
          ) {
            currentReply.showComments =
              commentsList[threadId][index].showComments;
          }
          if (
            replyTo === currentReply.replyId ||
            threadId === currentReply.replyId
          ) {
            currentReply.showComments = true;
          }
          currentReply.key = currentReply.replyId;
          return currentReply;
        });
        const displayedComments = take([].concat(replies), count).map(
          reply => reply.replyId
        );

        this.updateCommentsProps(
          replyTo || threadId,
          newReplies,
          displayedComments,
          page
        );
      }
    });
  };

  updateCommentsProps = (id, comments, displayed, newPage) => {
    this.setState(state => {
      const { commentsList, displayedComments } = state;
      const newCommentsList = Object.assign({}, commentsList);
      const newDisplayedComments = Object.assign({}, displayedComments);
      if (id) {
        if (comments) {
          newCommentsList[id] = comments;
        }

        if (displayed) {
          newDisplayedComments[id] = displayed;
        }
      }
      return {
        commentsList: newCommentsList,
        displayedComments: newDisplayedComments,
        page: newPage,
      };
    });
  };

  toggleThreadComments = threadId => {
    const { threadsList } = this.state;
    let newThreadsList = [].concat(threadsList);
    newThreadsList = newThreadsList.map(thread => {
      const newThread = Object.assign({}, thread);
      if (newThread.threadId === threadId) {
        newThread.showComments = !newThread.showComments;
      }
      return newThread;
    });
    this.setState({
      threadsList: newThreadsList,
    });
  };

  toggleCommentsReplies = (threadId, replyId) => {
    const { commentsList } = this.state;
    const newCommentsList = Object.assign({}, commentsList);
    let comments = newCommentsList[threadId] || [];
    comments = comments.map(reply => {
      const newReply = Object.assign({}, reply);
      if (newReply.replyId === replyId) {
        newReply.showComments = !newReply.showComments;
      }
      return newReply;
    });

    newCommentsList[threadId] = comments;

    this.setState({
      commentsList: newCommentsList,
    });
  };

  render() {
    const {
      props,
      updateThreadsProps,
      updateCommentsProps,
      toggleThreadComments,
      toggleCommentsReplies,
    } = this;

    const {
      callSource,
      count,
      errorMessage,
      forumId,
      topicId,
      threadId,
      jumpToThreadId,
      topLevelThread,
      createThread,
      createThreadFormParams,
      validateResponseAccess,
      user,
      discussionGroupId,
      showId,
      isClub,
      toggleComment,
    } = props;

    const { page } = this.state;

    const discussionsActions = {
      updateThreadsProps,
      updateCommentsProps,
      toggleThreadComments,
      toggleCommentsReplies,
    };

    const flagParams = {
      forumId,
      type: callSource === 'shows' ? 'show' : callSource,
      itemId: threadId,
      topicId,
      itemType: 'thread',
      discussionGroupId: showId,
    };
    
    return (
      <div key={`discussions-${topicId}`}>
        <DeviceContext.Consumer>
          {context => (
            <Fragment>
              {topLevelThread ? (
                <DiscussionsThreads
                  validateResponseAccess={validateResponseAccess}
                  discussions={this.state}
                  discussionsActions={discussionsActions}
                  errorMessage={errorMessage}
                  callSource={callSource}
                  count={count}
                  page={page}
                  topicId={topicId}
                  forumId={forumId}
                  user={user}
                  createThread={createThread}
                  createThreadFormParams={createThreadFormParams}
                  {...context}
                  discussionGroupId={discussionGroupId}
                  isClub={isClub}
                  jumpToThreadId={jumpToThreadId}
                  canSubmitReplies={this.props.canSubmitReplies}
                />
              ) : (
                <DiscussionComments
                  validateResponseAccess={validateResponseAccess}
                  discussions={this.state}
                  discussionsActions={discussionsActions}
                  errorMessage={errorMessage}
                  callSource={callSource}
                  count={count}
                  threadId={threadId}
                  // formPlaceholder="Write a public comment"
                  formPlaceholder="Write a comment"
                  page={page}
                  topicId={topicId}
                  forumId={forumId}
                  user={user}
                  getReplies={this.getReplies}
                  updateComments
                  flagParams={flagParams}
                  canSubmitReplies={this.props.canSubmitReplies}
                  toggleComment={toggleComment}
                />
              )}
            </Fragment>
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}

export default DiscussionsBoard;
