/***********************************
* V4 Common Discussions Board
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import ConnectUser from 'redux/components/ConnectUser';
import { DeviceContext } from 'providers/DeviceProvider';
import { THREAD_LIST } from 'services/discussions';
import BootstrappedDiscussionsBoard from './BootstrappedDiscussionsBoard';

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
    commentsCount: {},
    repliesList: {},
    displayedReplies: {},
    repliesCount: {},
  };

  updateThreadsProps = (threadsList, threadsCount) => {
    const newThreadsList = threadsList || this.state.threadsList;
    const newThreadsCount = threadsCount || this.state.threadsCount;
    this.setState({
      threadsList: newThreadsList,
      threadsCount: newThreadsCount,
    });
  }

  updateCommentsList = (threadId, comments) => {
    const { commentsList } = this.state;
    const newCommentsList = Object.assign({}, commentsList);
    if (typeof newCommentsList[threadId] !== 'undefined') {
      newCommentsList[threadId] = comments;
    }
    this.setState({
      commentsList: newCommentsList,
    });
  }

  render() {
    const {
      props,
      updateThreadsProps,
      updateCommentsList,
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
      updateCommentsList,
    };

    return (
      <Request
        authorizationRedirect={true}
        serviceURL={THREAD_LIST}
        method="POST"
        serviceExpiresFieldName="expires"
        // model={modelNotificationsFromApiRes}
        // serviceResponseHandler={(result) => {
        //   updateNotificationsCount({ count: result.notificationsCount })
        // }}
        requestBody={{
          callSource,
          count,
          page,
          topicId,
        }}
        render={({
          fetchingContent,
          // modeledResponses: { ALERTS_ONLY },
          serviceResponse,
        }) => (
          <div>
            <ConnectUser
              render={user => (
                  <DeviceContext.Consumer>
                    {context => (
                      <BootstrappedDiscussionsBoard
                        discussions={this.state}
                        discussionsActions={discussionsActions}
                        errorMessage={errorMessage}
                        fetching={fetchingContent}
                        callSource={callSource}
                        count={count}
                        page={page}
                        topicId={topicId}
                        forumId={forumId}
                        user={user}
                        createThread={createThread}
                        createThreadFormParams={createThreadFormParams}
                        {...context}
                        {...serviceResponse}
                      />
                    )}
                  </DeviceContext.Consumer>
                )}
            />
          </div>
        )}
      />
    );
  }
}



export default DiscussionsBoard;
