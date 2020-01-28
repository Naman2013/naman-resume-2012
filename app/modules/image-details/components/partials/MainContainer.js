import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DiscussionsBoard from 'app/components/common/DiscussionsBoard';
import ObservationsForm from 'app/modules/image-details/components/ObservationsForm';
import ObservationInformation from './ObservationInformation';

const { arrayOf, bool, number, oneOfType, shape, string } = PropTypes;

const MainContainer = ({
  actions,
  canShareFlag,
  callSource,
  canEditFlag,
  canLikeFlag,
  commentsCount,
  commentsForumId,
  commentsThreadId,
  commentsTopicId,
  customerImageId,
  fileData,
  showLikePrompt,
  likePrompt,
  likedByMe,
  likeTooltip,
  likesCount,
  observationLog,
  observationTimeDisplay,
  observationTitle,
  imageTitle,
  saveLabel,
  scheduledMissionId,
  showCommentsLink,
  user,
  validateResponseAccess,
  refetchData,
  shareMemberPhotoData,
  iconFileData,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [observation, setObservation] = useState('');

  const isFormVisible = () =>
    (canEditFlag && isEditMode) || (!isEditMode && !observationLog);

  const isLogVisible = () => !isEditMode && observationLog;

  return (
    <div className="image-main-container">
      {isLogVisible() && (
        <>
          <ObservationInformation
            canLikeFlag={canLikeFlag}
            customerImageId={customerImageId}
            fileData={fileData}
            iconFileData={iconFileData}
            likesCount={likesCount}
            likedByMe={likedByMe}
            likePrompt={likePrompt}
            likeTooltip={likeTooltip}
            showLikePrompt={showLikePrompt}
            observationLog={observationLog}
            observationTimeDisplay={observationTimeDisplay}
            observationTitle={observationTitle}
            imageTitle={imageTitle}
            user={user}
            actions={actions}
            canShareFlag={canShareFlag}
            canEditFlag={canEditFlag}
            onEdit={(observationLog, observationTitle) => {
              setEditMode(true);
              setTitle(observationTitle);
              setObservation(observationLog);
            }}
            refetchData={refetchData}
            shareMemberPhotoData={shareMemberPhotoData}
          />
          <br />
        </>
      )}
      {isFormVisible() && (
        <>
          <ObservationsForm
            actions={actions}
            customerImageId={customerImageId}
            saveLabel={saveLabel}
            scheduledMissionId={scheduledMissionId}
            user={user}
            validateResponseAccess={validateResponseAccess}
            refetchData={refetchData}
            onSave={() => setEditMode(false)}
            title={title}
            observation={observation}
            onTitleChange={setTitle}
            onObservationChange={setObservation}
            // onTitleChange={setTitle}
          />
          <br />
        </>
      )}
      {showCommentsLink ? (
        <DiscussionsBoard
          topLevelThread={false}
          callSource={callSource}
          count={10}
          commentsCount={commentsCount}
          commentsThreadId={commentsThreadId}
          forumId={commentsForumId}
          topicId={commentsTopicId}
          threadId={commentsThreadId}
          user={user}
          validateResponseAccess={validateResponseAccess}
        />
      ) : null}
    </div>
  );
};

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
