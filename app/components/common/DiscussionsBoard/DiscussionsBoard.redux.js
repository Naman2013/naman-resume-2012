/***********************************
* V4 Common Discussions Board
*
*
*
***********************************/

import React from 'react';
import Request from 'components/common/network/Request';
import ConnectUser from 'redux/components/ConnectUser';
import BootstrappedDiscussionsBoard from './BootstrappedDiscussionsBoard';
import { THREAD_LIST } from 'services/discussions';

const DiscussionsBoard = ({
  errorMessage,
  forumId,
  topicId,
  count,
  page,
  callSource,
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
          render={user => (<BootstrappedDiscussionsBoard
            errorMessage={errorMessage}
            fetching={fetchingContent}
            callSource={callSource}
            count={count}
            page={page}
            topicId={topicId}
            forumId={forumId}
            user={user}
            {...serviceResponse}
          />)}
        />
      </div>
    )}
  />
);

export default DiscussionsBoard;
