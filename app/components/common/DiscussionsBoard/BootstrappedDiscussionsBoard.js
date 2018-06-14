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
  func,
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
  threads: arrayOf(shape({})),
  threadCount: number,
  fetching: bool.isRequired,
  error: bool.isRequired,
  errorMessage: string,
  callSource: string,
}

BootstrappedDiscussionsBoard.defaultProps = {
  threads: [],
  threadCount: 0,
  errorMessage: 'There was an error fetching list',
};

export default BootstrappedDiscussionsBoard;
