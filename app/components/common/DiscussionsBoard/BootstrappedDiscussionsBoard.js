/***********************************
* V4 Discussions Board Thread List
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiscussionsItem from './DiscussionsItem';
import CREATE_THREAD_FORM from './DiscussionsThreadFormInterface';
import { submitReply } from 'services/discussions/submit-reply';
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

class BootstrappedDiscussionsBoard extends Component {
  static propTypes = {
    discussions: shape({
      threadsList: arrayOf(shape({})),
      displayedThreads: arrayOf(number),
      threadsCount: number,
    }),
    discussionsActions: shape({
      updateThreadsProps: func.isRequired,
      updateCommentsList: func.isRequired,
    }).isRequired,
    callSource: string,
    count: number,
    createThread: func.isRequired,
    createThreadFormParams: shape({}),
    apiError: bool,
    errorMessage: string,
    fetching: bool.isRequired,
    forumId: oneOfType([number, string]),
    isDesktop: bool,
    threadCount: number,
    threads: arrayOf(shape({})),
    topicId: oneOfType([number, string]),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  }

  static defaultProps = {
    discussions: {
      threadsList: [],
      displayedThreads: [],
      threadsCount: 0,
    },
    apiError: false,
    callSource: null,
    count: 10,
    createThreadFormParams: {},
    errorMessage: 'There was an error fetching list',
    forumId: null,
    isDesktop: true,
    threadCount: 0,
    threads: [],
    topicId: null,
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.discussions.threadsList.length !== nextProps.threads.length ||
      this.props.discussions.threadsCount !== nextProps.threadCount
    ) {
      this.props.discussionsActions.updateThreadsProps(nextProps.threads, nextProps.threadCount);
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
        updateThreadsProps([res.payload.thread].concat(threadsList), threadsCount + 1);
      }

      return res.payload;
    });
  }

  handleReply = (params, callback) => {
    submitReply(params).then((res) => {
      const { apiError, reply } = res.data;
      if (!apiError) {
        const {
          discussions: { threadsList },
          discussionsActions: { updateThreadsProps },
        } = this.props;
        const newThreadsList = [].concat(threadsList);

        newThreadsList.map((thread) => {
          if (thread.threadId === params.threadId) {
            thread.replyCount = thread.replyCount + 1;
          }
          return thread;
        });
        updateThreadsProps(newThreadsList)

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
      fetching,
      forumId,
      isDesktop,
      page,
      threadCount,
      topicId,
      user,
    } = this.props;

    return (<div className="root">
      {CREATE_THREAD_FORM[callSource].render({
        ...createThreadFormParams,
        createThread: this.createThread,
        isDesktop,
      })}
      {fetching && <div>Loading</div>}
      {!fetching ? <div className="comments-bar">
        Comments ({discussions.threadsCount})
      </div> : null}
      {(!fetching && apiError) && <div dangerouslySetInnerHTML={{ __html: errorMessage }} />}
      {(!fetching && !apiError && threadCount === 0) && <div>There is nothing to show here</div>}
      {(!fetching && !apiError && threadCount > 0) && <div>
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
            discussions={discussions}
            callSource={callSource}
            forumId={forumId}
            isDesktop={isDesktop}
            key={thread.threadId}
            likeParams={likeParams}
            topicId={topicId}
            count={count}
            submitReply={this.handleReply}
            page={page}
            user={user}
            replyTo={thread.threadId}
          />)
        })}
      </div>}
      <style jsx>{styles}</style>
    </div>);
  }
}

export default BootstrappedDiscussionsBoard;
