import React from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import './style.scss';
import { QuestDotMenu } from 'app/modules/quests/components/quest-dot-menu';
import { downloadFile } from 'app/utils/downloadFile';
import FollowObjectButton from 'app/components/object-details/FollowObjectButton';
import uniqueId from 'lodash/uniqueId';
import { IImageOrderingSlot } from 'app/modules/quests/types.ts';

type ImageSlotProps = {
  imageOrderingModule: any;
  getImageOrderingModule?: () => void;
  showMontageModuleSlotModal?: () => void;
  removeDataCollectionSlotImage?: (slotId: number, imageId: number) => void;
  slot?: IImageOrderingSlot;
  user?: User;
};

export const ImageSlot: React.FC<ImageSlotProps> = props => {
  const {
    imageOrderingModule,
    getImageOrderingModule,
    slot,
    showMontageModuleSlotModal,
    removeDataCollectionSlotImage,
    user,
  } = props;
  const { correctText } = imageOrderingModule;
  const {
    imageURL,
    enableSlotButton,
    slotButtonCaption,
    showSlotInfo,
    slotInfoTitle,
    showTextPrompt,
    textPrompt,
    showGraphicalPrompt,
    graphicalPromptURL,
    slotButtonTooltipText,
    showDotMenu,
    enableDotMenu,
    dotMenu,
    dotMenuTitle,
    slotId,
    customerImageId,
    objectId,
  } = slot;

  const {
    showRemoveImage,
    enableRemoveImage,
    removeImageText,
    showDownloadImage,
    enableDownloadImage,
    downloadImageText,
    showCheckForMissions,
    enableCheckForMissions,
    checkForMissionsText,
    checkForMissionsUrl,
    showObjectInfo,
    enableObjectInfo,
    objectInfo,
  } = dotMenu;

  const {
    learnAboutText,
    learnAboutUrl,
    followPrompt,
    followPromptIconUrl,
  } = objectInfo;

  const dotMenuItems = [
    {
      show: showRemoveImage,
      disabled: !enableRemoveImage,
      title: removeImageText,
      action: (): void =>
        removeDataCollectionSlotImage(slotId, customerImageId),
    },
    {
      show: showDownloadImage,
      disabled: !enableDownloadImage,
      title: downloadImageText,
      action: (): void =>
        downloadFile(
          imageURL,
          imageURL.substring(imageURL.lastIndexOf('/') + 1)
        ),
    },
    {
      show: showCheckForMissions,
      disabled: !enableCheckForMissions,
      title: checkForMissionsText,
      action: (): void => browserHistory.push(checkForMissionsUrl),
    },
    {
      show: showObjectInfo,
      disabled: !enableObjectInfo,
      title: learnAboutText,
      action: (): void => browserHistory.push(learnAboutUrl),
    },
    {
      show: showObjectInfo,
      disabled: !enableObjectInfo,
      title: Boolean(objectId) && (
        <FollowObjectButton
          key={`follow-object-button-${uniqueId()}`}
          objectId={objectId}
          user={user}
          followButtonText={followPrompt}
          followButtonIconURL={followPromptIconUrl}
          callBack={getImageOrderingModule}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="montage-slot">
        <div className="montage-slot__body slot-card">
          <div className="slot-card__left">
            <div className="slot-card__left__img">
              {showGraphicalPrompt ? (
                <img src={graphicalPromptURL} alt="" />
              ) : (
                ''
              )}
            </div>
            {showTextPrompt ? (
              <div className="slot-card__left__title">{textPrompt}</div>
            ) : (
              ''
            )}
          </div>
          <div className="slot-card__right">
            <div className="slot-card__right__img">
              <img src={imageURL} alt="" />
            </div>
            <div className="slot-card__right__action">
              <Tooltip
                title={slotButtonTooltipText}
                distance={10}
                position="top"
              >
                <Button
                  className="edit"
                  onClick={(): void => showMontageModuleSlotModal()}
                  disabled={!enableSlotButton}
                >
                  {slotButtonCaption}
                </Button>
              </Tooltip>

              <QuestDotMenu
                theme={{ circleColor: astronaut }}
                show={showDotMenu}
                enabled={enableDotMenu}
                menuTitle={dotMenuTitle}
                items={dotMenuItems}
              />
            </div>
          </div>
        </div>

        <div className="montage-slot__footer">
          {showSlotInfo ? (
            <div className="find-image-title">{slotInfoTitle}</div>
          ) : (
            <div className="notification-title">{correctText}</div>
          )}
        </div>
      </div>
    </div>
  );
};
