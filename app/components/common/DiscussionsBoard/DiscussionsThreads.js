/***********************************
* V4 Discussions Board Thread List
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DiscussionsItem from './DiscussionsItem';
import CREATE_THREAD_FORM from './DiscussionsThreadFormInterface';
import { submitReply } from 'services/discussions/submit-reply';
import { THREAD_LIST } from 'services/discussions';
import styles from './DiscussionsBoard.style';

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
  }

  static defaultProps = {
    apiError: false,
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
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.topicId !== nextProps.topicId) {
      const {
        callSource,
        count,
        topicId,
        validateResponseAccess,
        user,
        discussionsActions: { updateThreadsProps },
      } = nextProps;

      axios.post(THREAD_LIST, {
        callSource,
        count,
        page: 1,
        topicId,
        at: user.at,
        token: user.token,
        cid: user.cid,
      }).then((res) => {
        validateResponseAccess(res);
        if (!res.data.apiError) {
          const { threads, threadCount } = res.data;
          let newThreads = [].concat(threads);
          newThreads = newThreads.map((thread) => {
            const newThread = Object.assign({}, thread);
            newThread.showComments = false;
            newThread.page = 1;
            return newThread;
          });
          updateThreadsProps(newThreads, threadCount);
        }

        this.setState({
          fetching: false,
        });
      });
    }
  }

  createThread = (params) => {
    const {
      createThread,
      discussionsActions: { updateThreadsProps },
      discussions: { threadsList, threadsCount },
    } = this.props;
    return createThread(params).then((res) => {
      if (!res.payload.apiError) {
        const newThread = Object.assign({
          showComments: false,
          page: 1,
        }, res.payload.thread)
        updateThreadsProps([newThread].concat(threadsList), threadsCount + 1);
      }

      return res.payload;
    });
  }

  handleReply = (params, callback) => {
    submitReply(params).then((res) => {
      const { apiError, reply } = res.data;
      const { count } = this.props;
      if (!apiError) {
        const {
          discussions: { threadsList, commentsList, displayedComments },
          discussionsActions: { updateThreadsProps, updateCommentsProps },
        } = this.props;
        const newThreadsList = [].concat(threadsList);

        newThreadsList.map((thread) => {
          const newThread = Object.assign({}, thread);
          if (newThread.threadId === params.threadId) {
            newThread.replyCount += 1;
          }
          return newThread;
        });
        updateThreadsProps(newThreadsList);

        const comments = Object.assign({}, commentsList);
        const { page } = comments;
        const displayed = displayedComments[params.threadId] || [];
        const lastPage = (Math.ceil(comments.length / count)) || 1;
        let newDisplayedComments = [].concat(displayed);
        let currentCommentsList = comments[params.threadId] || [];
        currentCommentsList = [].concat(
          currentCommentsList,
          Object.assign({ likesCount: 0 }, reply)
        );
        if (page === lastPage) { // if there's only one page of comments, append the new comment to the displayed comments
          newDisplayedComments = [].concat(newDisplayedComments, reply.replyId);
        }
        updateCommentsProps(params.threadId, currentCommentsList, newDisplayedComments);
      }
      callback(res.data);
    });
  }

  render() {
    const {
      apiError,
      callSource,
      count,
      discussionsActions,
      discussions,
      createThreadFormParams,
      errorMessage,
      forumId,
      isDesktop,
      topicId,
      user,
    } = this.props;
    const { fetching } = this.state;

    return (<div className="root">
      {CREATE_THREAD_FORM[callSource].render({
        ...createThreadFormParams,
        createThread: this.createThread,
        isDesktop,
      })}
      <div className="comments-bar">
        Comments ({discussions.threadsCount})
      </div>
      {fetching && <div>Loading</div>}
      {!fetching && discussions.threadsCount === 0 ? <div>There is nothing to show here</div> : null}
      {!fetching && discussions.threadsCount > 0 && <div>
        {discussions.threadsList.map((thread) => {
          const likeParams = {
            forumId,
            callSource,
            threadId: thread.threadId,
            topicId,
          };

          return (<DiscussionsItem
            {...thread}
            discussionsActions={discussionsActions}
            toggleComments={() => discussionsActions.toggleThreadComments(thread.threadId)}
            discussions={discussions}
            callSource={callSource}
            forumId={forumId}
            isDesktop={isDesktop}
            key={thread.threadId}
            likeParams={likeParams}
            topicId={topicId}
            count={count}
            submitReply={this.handleReply}
            page={thread.page}
            user={user}
            replyTo={thread.threadId}
          />)
        })}
      </div>}
      <style jsx>{styles}</style>
    </div>);
  }
}

export default DiscussionsThreads;
