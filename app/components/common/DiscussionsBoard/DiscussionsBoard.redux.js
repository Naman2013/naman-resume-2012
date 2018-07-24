/***********************************
* V4 Common Discussions Board
*
*
*
***********************************/

import React from 'react';
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

const DiscussionsBoard = ({
  callSource,
  count,
  errorMessage,
  forumId,
  page,
  topicId,
  createThread,
  createThreadFormParams,
}) => (
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

DiscussionsBoard.propTypes = {
  callSource: string,
  count: number,
  errorMessage: string,
  forumId: number,
  page: number,
  topicId: number,
  createThread: func.isRequired,
  createThreadFormParams: shape({}),
};
DiscussionsBoard.defaultProps = {
  callSource: null,
  count: 10,
  errorMessage: 'There was an error.',
  forumId: null,
  page: 1,
  topicId: null,
  createThreadFormParams: {},
};

export default DiscussionsBoard;
