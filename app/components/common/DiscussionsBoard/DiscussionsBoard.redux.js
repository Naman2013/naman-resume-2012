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
import { THREAD_LIST } from 'services/discussions';
import BootstrappedDiscussionsBoard from './BootstrappedDiscussionsBoard';

const {
  string,
  number,
} = PropTypes;

const DiscussionsBoard = ({
  callSource,
  count,
  errorMessage,
  forumId,
  page,
  topicId,
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

DiscussionsBoard.propTypes = {
  callSource: string,
  count: number,
  errorMessage: string,
  forumId: number,
  page: number,
  topicId: number,
};
DiscussionsBoard.defaultProps = {
  callSource: null,
  count: 10,
  errorMessage: 'There was an error.',
  forumId: null,
  page: 1,
  topicId: null,
};

export default DiscussionsBoard;
