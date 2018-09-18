import React from 'react';
import PropTypes from 'prop-types';
import DiscussionComments from 'components/common/DiscussionsBoard/DiscussionComments';
import ObservationsForm from 'components/ObservationsForm';
import ObservationInformation from './ObservationInformation';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const MainContainer = ({
  actions,
  callSource,
  canEditFlag,
  canLikeFlag,
  commentsCount,
  commentsForumId,
  commentsThreadId,
  commentsTopicId,
  customerImageId,
  fileData,
  likePrompt,
  likesCount,
  observationLog,
  observationTimeDisplay,
  observationTitle,
  saveLabel,
  scheduledMissionId,
  showCommentsLink,
  user,
}) => (<div>
  {!canEditFlag && <ObservationInformation
    canLikeFlag={canLikeFlag}
    customerImageId={customerImageId}
    fileData={fileData}
    likesCount={likesCount}
    likePrompt={likePrompt}
    observationLog={observationLog}
    observationTime={observationTimeDisplay}
    observationTitle={observationTitle}
    user={user}
  />}
  {canEditFlag && <ObservationsForm
    actions={actions}
    customerImageId={customerImageId}
    observationLog={observationLog}
    observationTitle={observationTitle}
    saveLabel={saveLabel}
    scheduledMissionId={scheduledMissionId}
    user={user}
  />}
  {showCommentsLink ? <DiscussionComments
    callSource={callSource}
    count={10}
    commentsCount={commentsCount}
    commentsThreadId={commentsThreadId}
    forumId={commentsForumId}
    topicId={commentsTopicId}
    threadId={commentsThreadId}
    user={user}
  /> : null}
</div>);

MainContainer.propTypes = {
  callSource: string,
  canEditFlag: bool,
  canLikeFlag: bool,
  commentsCount: number,
  commentsForumId: oneOfType([number, string]),
  commentsThreadId: oneOfType([number, string]),
  commentsTopicId: oneOfType([number, string]),
  customerImageId: string,
  fileData: shape({
    'Photo By': string,
  }),
  likePrompt: string,
  likesCount: number,
  observationLog: string,
  observationTimeDisplay: arrayOf(string),
  observationTitle: string,
  saveLabel: string,
  scheduledMissionId: string,
  showCommentsLink: bool,
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
};

MainContainer.defaultProps = {
  callSource: null,
  canEditFlag: false,
  canLikeFlag: true,
  commentsCount: 0,
  commentsForumId: 0,
  commentsThreadId: 0,
  commentsTopicId: 0,
  customerImageId: null,
  fileData: {
    'Photo By': '',
  },
  likesCount: 0,
  likePrompt: '',
  observationLog: '',
  observationTimeDisplay: [],
  observationTitle: '',
  saveLabel: '',
  scheduledMissionId: null,
  showCommentsLink: false,
};

export default MainContainer;
