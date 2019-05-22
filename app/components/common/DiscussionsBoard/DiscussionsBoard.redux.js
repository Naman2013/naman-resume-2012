/***********************************
 * V4 Common Discussions Board
 *
 *
 *
 ***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import take from 'lodash/take';
import ConnectUserAndResponseAccess from 'redux/components/ConnectUserAndResponseAccess';
import { DeviceContext } from 'providers/DeviceProvider';
import DiscussionsThreads from './DiscussionsThreads';
import DiscussionComments from './DiscussionComments';
import { THREAD_REPLIES } from 'app/services/discussions';

const { any, bool, func, number, shape, string } = PropTypes;

class DiscussionsBoard extends Component {
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
  };

  state = {
    threadsList: [],
    displayedThreads: [],
    threadsCount: 0,
    commentsList: {},
    displayedComments: {},
    discussionKey: Date.now(),
  };

  updateThreadsProps = (threadsList, threadsCount, displayed) => {
    const newThreadsList = threadsList || this.state.threadsList;
    const newThreadsCount = threadsCount || this.state.threadsCount;
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
      discussionKey: Date.now(),
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
    const { commentsList } = this.state;

    axios
      .post(THREAD_REPLIES, {
        callSource,
        topicId,
        threadId,
        forumId,
        replyTo: replyTo || threadId,
        page: 1,
        at: user.at,
        token: user.token,
        cid: user.cid,
      })
      .then(res => {
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
          console.log(newReplies, displayedComments);
          this.updateCommentsProps(
            replyTo || threadId,
            newReplies,
            displayedComments
          );
        }
      });
  };

  updateCommentsProps = (id, comments, displayed) => {
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
      page,
      topicId,
      threadId,
      topLevelThread,
      createThread,
      createThreadFormParams,
      validateResponseAccess,
      user,
    } = props;

    const discussionsActions = {
      updateThreadsProps,
      updateCommentsProps,
      toggleThreadComments,
      toggleCommentsReplies,
    };

    return (
      <div>
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
                  formPlaceholder="Write a public comment"
                  page={page}
                  topicId={topicId}
                  forumId={forumId}
                  user={user}
                  getReplies={this.getReplies}
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
