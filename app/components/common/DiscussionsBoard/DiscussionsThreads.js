/***********************************
 * V4 Discussions Board Thread List
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import take from 'lodash/take';
import { submitReply } from 'app/services/discussions/submit-reply';
import { THREAD_LIST, THREAD_REPLIES } from 'app/services/discussions';
import DiscussionsItem from './DiscussionsItem';
import CREATE_THREAD_FORM from './DiscussionsThreadFormInterface';
import styles from './DiscussionsBoard.style';
import messages from './DiscussionsThreads.messages';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class DiscussionsThreads extends Component {
  static propTypes = {
    discussions: shape({
      threadsList: arrayOf(shape({})).isRequired,
      displayedThreads: arrayOf(number).isRequired,
      threadsCount: number.isRequired,
    }).isRequired,
    discussionsActions: shape({
      updateThreadsProps: func.isRequired,
    }).isRequired,
    callSource: string,
    count: number,
    createThread: func.isRequired,
    createThreadFormParams: shape({}),
    errorMessage: string,
    forumId: oneOfType([number, string]),
    isDesktop: bool,
    topicId: oneOfType([number, string]),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    callSource: null,
    count: 10,
    createThreadFormParams: {},
    errorMessage: 'There was an error fetching list',
    forumId: null,
    isDesktop: true,
    topicId: null,
  };

  state = {
    fetching: true,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.topicId !== nextProps.topicId) {
      this.getThreads(nextProps);
    }
  }

  getThreads = (parms = this.props) => {
    const {
      callSource,
      count,
      topicId,
      validateResponseAccess,
      user,
      discussionsActions: { updateThreadsProps },
    } = parms;

    this.setState({
      fetching: true,
    });

    axios
      .post(THREAD_LIST, {
        callSource,
        count,
        page: 1,
        topicId,
        at: user.at,
        token: user.token,
        cid: user.cid,
      })
      .then(res => {
        validateResponseAccess(res);
        if (!res.data.apiError) {
          const { threads, threadCount } = res.data;
          let newThreads = [].concat(threads);
          newThreads = newThreads.map(thread => {
            const currentThread = Object.assign({}, thread);
            currentThread.showComments = false;
            currentThread.page = 1;
            currentThread.key = currentThread.threadId;
            return currentThread;
          });
          updateThreadsProps(newThreads, threadCount);
        }

        this.setState({
          fetching: false,
        });
      });
  };

  getReplies = (threadId, replyTo) => {
    const {
      callSource,
      count,
      topicId,
      forumId,
      //threadId,
      validateResponseAccess,
      user,
      discussions: { commentsList },
      discussionsActions: { updateCommentsProps },
    } = this.props;

    axios
      .post(THREAD_REPLIES, {
        callSource,
        topicId,
        threadId,
        forumId,
        replyTo: replyTo || threadId, // should be threadId
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
          updateCommentsProps(
            replyTo || threadId,
            newReplies,
            displayedComments
          );
        }
      });
  };

  createThread = params => {
    const { createThread } = this.props;
    return createThread(params).then(res => {
      if (!res.payload.apiError) {
        this.getThreads(this.props);
      }

      return res.payload;
    });
  };

  handleReply = (params, callback) => {
    submitReply(params).then(res => {
      const { apiError, reply } = res.data;
      const { count } = this.props;
      if (!apiError) {
        const {
          discussions: { threadsList, commentsList, displayedComments },
          discussionsActions: { updateThreadsProps, updateCommentsProps },
        } = this.props;
        let newThreadsList = [].concat(threadsList);
        let page = 1;
        newThreadsList = newThreadsList.map(thread => {
          const newThread = Object.assign({}, thread);
          if (newThread.threadId === params.threadId) {
            newThread.replyToponlyCount += 1;
            if (!newThread.showComments) {
              newThread.showComments = true;
            }
            page = newThread.page;
          }
          return newThread;
        });
        updateThreadsProps(newThreadsList);

        const comments = Object.assign({}, commentsList);
        const displayed = displayedComments[params.threadId] || [];

        let newDisplayedComments = [].concat(displayed);
        let currentCommentsList = comments[params.threadId] || [];
        currentCommentsList = [].concat(
          currentCommentsList,
          Object.assign(
            {
              likesCount: 0,
              replyToponlyCount: 0,
              showComments: false,
              page: 1,
            },
            reply
          )
        );
        const lastPage = Math.ceil(currentCommentsList.length / count) || 1;
        if (page === lastPage) {
          // if there's only one page of comments, append the new comment to the displayed comments
          newDisplayedComments = [].concat(newDisplayedComments, reply.replyId);
        }
        updateCommentsProps(
          params.threadId,
          currentCommentsList,
          newDisplayedComments
        );

        this.getThreads(this.props);
        this.getReplies(params.threadId);
      }
      callback(res.data);
    });
  };

  render() {
    const {
      callSource,
      count,
      createThreadFormParams,
      discussions,
      discussionsActions,
      errorMessage,
      forumId,
      isDesktop,
      topicId,
      user,
      validateResponseAccess,
      discussionGroupId,
    } = this.props;
    const { fetching } = this.state;
    return (
      <div className="root">
        {CREATE_THREAD_FORM[callSource].render({
          ...createThreadFormParams,
          createThread: this.createThread,
          isDesktop,
        })}
        <div className="comments-bar">
          <FormattedMessage {...messages.Comments} /> (
          {discussions.threadsCount})
        </div>
        {fetching && (
          <div>
            <FormattedMessage {...messages.Loading} />
          </div>
        )}
        {!fetching && discussions.threadsCount === 0 ? (
          <div>
            <FormattedMessage {...messages.NoThreads} />
          </div>
        ) : null}
        {!fetching && discussions.threadsCount > 0 && (
          <div>
            {discussions.threadsList.map(thread => {
              const likeParams = {
                forumId,
                callSource,
                threadId: thread.threadId,
                topicId,
              };
              const flagParams = {
                forumId,
                type: callSource === 'groups' ? 'group' : callSource,
                itemId: thread.threadId,
                topicId,
                discussionGroupId,
              };
              return (
                <DiscussionsItem
                  {...thread}
                  key={discussions.discussionKey}
                  validateResponseAccess={validateResponseAccess}
                  discussionsActions={discussionsActions}
                  toggleComments={() =>
                    discussionsActions.toggleThreadComments(thread.threadId)
                  }
                  discussions={discussions}
                  callSource={callSource}
                  forumId={forumId}
                  isDesktop={isDesktop}
                  key={thread.threadId}
                  likeParams={likeParams}
                  flagParams={flagParams}
                  topicId={topicId}
                  count={count}
                  submitReply={this.handleReply}
                  page={thread.page}
                  user={user}
                  getThreads={this.getThreads}
                  getReplies={this.getReplies}
                />
              );
            })}
          </div>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DiscussionsThreads;
