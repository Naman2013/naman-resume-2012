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
  number,
  shape,
  string,
} = PropTypes;

const DiscussionsBoardComments = ({
  callSource,
  count,
  forumId,
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

DiscussionsBoardComments.propTypes = {
  callSource: string,
  count: number,
  forumId: number,
  threadId: number,
  topicId: number,
  user: shape({
    at: number,
    token: string,
    cid: number,
  }).isRequired,
};
DiscussionsBoardComments.defaultProps = {
  callSource: null,
  count: 10,
  forumId: null,
  threadId: null,
  topicId: null,
};

export default DiscussionsBoardComments;
