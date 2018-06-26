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
    createThreadFormParams: shape(any).isRequired,
    error: bool.isRequired,
    errorMessage: string,
    fetching: bool.isRequired,
    forumId: oneOfType([number, string]),
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
    callSource: null,
    count: 10,
    errorMessage: 'There was an error fetching list',
    forumId: null,
    threadCount: 0,
    threads: [],
    topicId: null,
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

  render() {
    const {
      callSource,
      count,
      error,
      errorMessage,
      fetching,
      createThreadFormParams,
      forumId,
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
      })}
      {fetching && <div>Loading</div>}
      {(!fetching && error) && <div dangerouslySetInnerHTML={{ __html: errorMessage }} />}
      {(!fetching && !error && threadCount === 0) && <div>There is nothing to show here</div>}
      {(!fetching && !error && threadCount > 0) && <div>
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
            key={thread.threadId}
            likeParams={likeParams}
            topicId={topicId}
            count={count}
            page={page}
            user={user}
          />)
        })}
      </div>}
      <style jsx>{`

      `}</style>
    </div>);
  }
}

export default BootstrappedDiscussionsBoard;
