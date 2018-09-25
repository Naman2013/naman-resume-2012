/***********************************
* V4 Common Discussions Board Replies
*
* we call for all replies and paginate on the front end.
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedDiscussionReplies from './BootstrappedDiscussionReplies';
import { THREAD_REPLIES } from 'services/discussions';

const {
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const DiscussionsBoardReplies = ({
  callSource,
  commentsCount,
  header,
  renderToggle,
  count,
  forumId,
  threadId,
  topicId,
  replyId,
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
        {<BootstrappedDiscussionReplies
          fetching={fetchingContent}
          callSource={callSource}
          count={count}
          header={header}
          topicId={topicId}
          forumId={forumId}
          threadId={threadId}
          user={user}
          isDesktop={isDesktop}
          renderToggle={renderToggle}
          replyId={replyId}
          replyTo={replyTo}
          {...serviceResponse}
        />}
      </div>
    )}
  />
);

DiscussionsBoardReplies.propTypes = {
  allowReplies: bool,
  callSource: string,
  count: number,
  commentsCount: number,
  isDesktop: bool.isRequired,
  isSimple: bool,
  forumId: oneOfType([number, string]),
  threadId: oneOfType([number, string]),
  topicId: oneOfType([number, string]),
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
};
DiscussionsBoardReplies.defaultProps = {
  allowReplies: true,
  callSource: null,
  commentsCount: null,
  count: 10,
  isSimple: false,
  forumId: null,
  threadId: null,
  topicId: null,
};

export default DiscussionsBoardReplies;
