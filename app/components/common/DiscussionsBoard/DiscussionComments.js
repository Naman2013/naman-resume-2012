/***********************************
* V4 Common Discussions Board Comments
*
* we call for all replies and paginate on the front end.
*
***********************************/

import React from 'react';
import Request from 'components/common/network/Request';
import BootstrappedDiscussionComments from './BootstrappedDiscussionComments';
import { THREAD_REPLIES } from 'services/discussions';

const DiscussionsBoardComments = ({
  errorMessage,
  forumId,
  topicId,
  threadId,
  count,
  page,
  callSource,
  user,
}) => (
  <Request
    authorizationRedirect={true}
    serviceURL={THREAD_REPLIES}
    method="POST"
    serviceExpiresFieldName="expires"
    requestBody={{
      callSource,
      topicId,
      threadId,
      forumId,
      replyTo: threadId,
    }}
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div>
        {<BootstrappedDiscussionComments
          fetching={fetchingContent}
          callSource={callSource}
          count={count}
          topicId={topicId}
          forumId={forumId}
          threadId={threadId}
          user={user}
          {...serviceResponse}
        />}
      </div>
    )}
  />
);

export default DiscussionsBoardComments;
