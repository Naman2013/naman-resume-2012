/***********************************
* V4 Common Discussions Board
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ConnectUserAndResponseAccess from 'redux/components/ConnectUserAndResponseAccess';
import { DeviceContext } from 'providers/DeviceProvider';
import DiscussionsThreads from './DiscussionsThreads';

const {
  any,
  func,
  number,
  shape,
  string,
} = PropTypes;

class DiscussionsBoard extends Component {
  static propTypes = {
    callSource: string,
    count: number,
    errorMessage: string,
    forumId: number,
    page: number,
    topicId: number,
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
    createThreadFormParams: {},
  };

  state = {
    threadsList: [],
    displayedThreads: [],
    threadsCount: 0,
    commentsList: {},
    displayedComments: {},
  };

  updateThreadsProps = (threadsList, threadsCount, displayed) => {
    const newThreadsList = threadsList || this.state.threadsList;
    const newThreadsCount = threadsCount || this.state.threadsCount;
    const displayedThreads = displayed || this.state.displayedThreads;

    this.setState({
      threadsList: newThreadsList,
      threadsCount: newThreadsCount,
      displayedThreads,
    });
  }

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
      return ({
        commentsList: newCommentsList,
        displayedComments: newDisplayedComments,
      })
    });
  }

  toggleThreadComments = (threadId) => {
    const { threadsList } = this.state;
    let newThreadsList = [].concat(threadsList);
    newThreadsList = newThreadsList.map((thread) => {
      const newThread = Object.assign({}, thread);
      if (newThread.threadId === threadId) {
        newThread.showComments = !newThread.showComments;
      }
      return newThread;
    });
    this.setState({
      threadsList: newThreadsList,
    });
  }

  toggleCommentsReplies = (threadId, replyId) => {
    const { commentsList } = this.state;
    const newCommentsList = Object.assign({}, commentsList);
    let comments = newCommentsList[threadId] || [];
    comments = comments.map((reply) => {
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
  }

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
      createThread,
      createThreadFormParams,
    } = props;

    const discussionsActions = {
      updateThreadsProps,
      updateCommentsProps,
      toggleThreadComments,
      toggleCommentsReplies,
    };

    return (
      <div>
        <ConnectUserAndResponseAccess
          render={({ user, validateResponseAccess }) => (
            <DeviceContext.Consumer>
              {context => (
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
              )}
            </DeviceContext.Consumer>
          )}
        />
      </div>
    );
  }
}



export default DiscussionsBoard;
