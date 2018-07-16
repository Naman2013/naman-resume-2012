/***********************************
* V4 Common Discussions Board Comments
*
* we call for all replies and paginate on the front end.
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedDiscussionComments from './BootstrappedDiscussionComments';
import { THREAD_REPLIES } from 'services/discussions';

const {
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const DiscussionsBoardComments = ({
  allowReplies,
  callSource,
  commentsCount,
  count,
  forumId,
  threadId,
  topicId,
  replyTo,
  isDesktop,
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
      replyTo,
    }}
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div>
        {<BootstrappedDiscussionComments
          allowReplies={allowReplies}
          fetching={fetchingContent}
          callSource={callSource}
          count={count}
          topicId={topicId}
          forumId={forumId}
          threadId={threadId}
          user={user}
          isDesktop={isDesktop}
          {...serviceResponse}
        />}
      </div>
    )}
  />
);

DiscussionsBoardComments.propTypes = {
  allowReplies: bool,
  callSource: string,
  count: number,
  commentsCount: number,
  isDesktop: bool.isRequired,
  forumId: oneOfType([number, string]),
  threadId: oneOfType([number, string]),
  topicId: oneOfType([number, string]),
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
};
DiscussionsBoardComments.defaultProps = {
  allowReplies: true,
  callSource: null,
  commentsCount: null,
  count: 10,
  forumId: null,
  threadId: null,
  topicId: null,
};

export default DiscussionsBoardComments;
