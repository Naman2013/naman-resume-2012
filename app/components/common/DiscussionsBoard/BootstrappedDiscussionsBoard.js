/***********************************
* V4 Discussions Board Thread List
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import DiscussionsItem from './DiscussionsItem';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

const BootstrappedDiscussionsBoard = ({
  count,
  page,
  forumId,
  callSource,
  threads,
  threadCount,
  topicId,
  fetching,
  user,
  error,
  errorMessage,
}) => (<div className="root">
  {fetching && <div>Loading</div>}
  {(!fetching && error) && <div dangerouslySetInnerHTML={{ __html: errorMessage }} />}
  {(!fetching && !error && threadCount === 0) && <div>There is nothing to show here</div>}
  {(!fetching && !error && threadCount > 0) && <div>
    {threads.map((thread) => {
      const likeParams = {
        forumId,
        callSource,
        threadId: thread.threadId,
        topicId,
      };

      return (<DiscussionsItem
        {...thread}
        callSource={callSource}
        forumId={forumId}
        key={thread.threadId}
        likeParams={likeParams}
        topicId={topicId}
        count={count}
        page={page}
        user={user}
      />)
    })}
  </div>}
  <style jsx>{`

  `}</style>
</div>)

BootstrappedDiscussionsBoard.propTypes = {
  callSource: string,
  count: number,
  error: bool.isRequired,
  errorMessage: string,
  fetching: bool.isRequired,
  forumId: number,
  threadCount: number,
  threads: arrayOf(shape({})),
  topicId: number,
  user: shape({
    at: number,
    token: string,
    cid: number,
  }).isRequired,
}

BootstrappedDiscussionsBoard.defaultProps = {
  callSource: null,
  count: 10,
  errorMessage: 'There was an error fetching list',
  forumId: null,
  threadCount: 0,
  threads: [],
  topicId: null,
};

export default BootstrappedDiscussionsBoard;
