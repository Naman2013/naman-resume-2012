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
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const DiscussionsBoardComments = ({
  discussionsActions,
  discussions,
  callSource,
  header,
  renderToggle,
  count,
  forumId,
  threadId,
  topicId,
  replyId,
  replyTo,
  isDesktop,
  canSubmitReplies,
  isSimple,
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
          discussions={discussions}
          discussionsActions={discussionsActions}
          fetching={fetchingContent}
          callSource={callSource}
          canSubmitReplies={canSubmitReplies}
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

DiscussionsBoardComments.propTypes = {
  callSource: string,
  count: number,
  isDesktop: bool.isRequired,
  discussions: shape({
    commentsList: shape({}).isRequired,
    displayedComments: shape({}).isRequired,
  }).isRequired,
  discussionsActions: shape({
    updateCommentsProps: func.isRequired,
  }).isRequired,
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
  callSource: null,
  count: 10,
  forumId: null,
  threadId: null,
  topicId: null,
};

export default DiscussionsBoardComments;
