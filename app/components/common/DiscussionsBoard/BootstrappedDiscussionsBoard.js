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
    showAllComments: false,
  };

  state = {
    threadsList: [],
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.threads.length !== nextProps.threads.length) {
      this.setState({
        threadsList: nextProps.threads,
      });
    }
  }

  createThread = (params) => {
    const { createThread } = this.props;
    return createThread(params).then((res) => {
      if (!res.payload.apiError) {
        this.setState(state => ({
          threadsList: [res.payload.thread].concat(state.threadsList),
        }));
      }

      return res.payload;
    });
  }

  toggleAllComments = () => {
    const { showAllComments } = this.state;

    this.setState({
      showAllComments: !showAllComments,
    });
  }

  handleReply = (params, callback) => {
    submitReply(params).then((res) => {
      const { apiError, reply } = res.data;
      if (!apiError) {
        const { threadsList } = this.state;
        const newThreadsList = [].concat(threadsList);

        newThreadsList.map((thread) => {
          if (thread.threadId === params.threadId) {
            thread.replyCount = thread.replyCount + 1;
          }
          return thread;
        });
        this.setState({
          threadsList: newThreadsList
        });

      }
      callback(res.data);
    });
  }

  render() {
    const {
      callSource,
      count,
      createThreadFormParams,
      apiError,
      errorMessage,
      fetching,
      forumId,
      isDesktop,
      page,
      threadCount,
      topicId,
      user,
    } = this.props;

    const { threadsList } = this.state;

    return (<div className="root">
      {CREATE_THREAD_FORM[callSource].render({
        ...createThreadFormParams,
        createThread: this.createThread,
        isDesktop,
      })}
      {fetching && <div>Loading</div>}
      {!fetching ? <div className="comments-bar">
        Comments ({threadCount})
      </div> : null}
      {(!fetching && apiError) && <div dangerouslySetInnerHTML={{ __html: errorMessage }} />}
      {(!fetching && !apiError && threadCount === 0) && <div>There is nothing to show here</div>}
      {(!fetching && !apiError && threadCount > 0) && <div>
        {threadsList.map((thread) => {
          const likeParams = {
            forumId,
            callSource,
            threadId: thread.threadId,
            topicId,
          };

          return (<DiscussionsItem
            {...thread}
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
