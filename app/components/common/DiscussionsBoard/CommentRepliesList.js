/***********************************
* V4 Common Discussions Board Comments
*
* we call for all replies and paginate on the front end.
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedCommentRepliesList from './BootstrappedCommentRepliesList';
import { THREAD_REPLIES } from 'services/discussions';

const {
  number,
  shape,
  string,
} = PropTypes;

const CommentRepliesList = ({
  callSource,
  count,
  forumId,
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

CommentRepliesList.propTypes = {
  callSource: string,
  count: number,
  forumId: number,
  replyId: number,
  threadId: number,
  topicId: number,
  user: shape({
    at: number,
    token: string,
    cid: number,
  }).isRequired,
};
CommentRepliesList.defaultProps = {
  callSource: null,
  count: 10,
  forumId: null,
  replyId: null,
  threadId: null,
  topicId: null,
};

export default CommentRepliesList;
