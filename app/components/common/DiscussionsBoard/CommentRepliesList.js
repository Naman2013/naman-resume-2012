/***********************************
* V4 Common Discussions Board Comments
*
* we call for all replies and paginate on the front end.
*
***********************************/

import React from 'react';
import Request from 'components/common/network/Request';
import BootstrappedCommentRepliesList from './BootstrappedCommentRepliesList';
import { THREAD_REPLIES } from 'services/discussions';

const CommentRepliesList = ({
  callSource,
  count,
  forumId,
  page,
  replyId,
  threadId,
  topicId,
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
      replyTo: replyId,
    }}
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div>
        {<BootstrappedCommentRepliesList
          callSource={callSource}
          count={count}
          fetching={fetchingContent}
          forumId={forumId}
          replyId={replyId}
          threadId={threadId}
          topicId={topicId}
          user={user}
          {...serviceResponse}
        />}
      </div>
    )}
  />
);

export default CommentRepliesList;
