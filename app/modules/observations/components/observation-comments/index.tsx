import React from 'react';
import DiscussionsBoard from 'app/components/common/DiscussionsBoard';

type ObservationCommentsProps = {
  topLevelThread: string;
  callSource: string;
  count: number;
  commentsCount: string | number;
  commentsThreadId: string | number;
  forumId: string | number;
  topicId: string | number;
  threadId: string | number;
  user: User;
  validateResponseAccess: Function;
  canSubmitReplies: boolean;
  toggleComment: Function;
};

export const ObservationComments: React.FC<
  ObservationCommentsProps
> = React.memo(props => {
  const {
    topLevelThread,
    callSource,
    count,
    commentsCount,
    commentsThreadId,
    forumId,
    topicId,
    threadId,
    user,
    validateResponseAccess,
    toggleComment,
  } = props;
  
  return (
    <div className="obs-card-comments">
      <DiscussionsBoard
        topLevelThread={topLevelThread}
        callSource={callSource}
        count={count}
        commentsCount={commentsCount}
        commentsThreadId={commentsThreadId}
        forumId={forumId}
        topicId={topicId}
        threadId={threadId}
        user={user}
        validateResponseAccess={validateResponseAccess}
        canSubmitReplies={props.canSubmitReplies}
        toggleComment={toggleComment}
      />
    </div>
  );
});
