import React, { useState } from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import uniqueId from 'lodash/uniqueId';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import ImageClickHandler from 'app/components/common/ImageClickHandler';
import FollowObjectButton from 'app/components/object-details/FollowObjectButton';
import { downloadFile } from 'app/utils/downloadFile';
import { QuestDotMenu } from 'app/modules/quests/components/quest-dot-menu';
import { QuestSlotInfoPopup } from 'app/modules/quests/components/quest-slot-info-popup';
import './styles.scss';

const onDownloadImage = url => {
  downloadFile(url, url.substring(url.lastIndexOf('/') + 1));
};

export const DataCollectionSlotCard = props => {
  const {
    slot,
    showDataCollectionSlotModal,
    removeDataCollectionSlotImage,
    user,
    refreshDataCollection,
  } = props;

  const {
    slotSequence,
    thumbnailURL,
    slotButtonCaption,
    slotTitle,
    showSlotButton,
    showSlotTitle,
    showSlotInfo,
    showDotMenu,
    slotInfoTitle,
    slotInfo,
    imageURL,
    objectId,
    slotId,
    slotHasImage,
    customerImageId,
    dotMenu,
    dotMenuTitle,
    enableDotMenu,
    enableSlotButton,
    slotButtonTooltipText,
    slotInfoTooltipText,
    dotMenuTooltipText,
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

  const {
    showSlotContentsDesc,
    slotContentsDesc,
    showObjectDetails,
    objectName,
    imageDate,
    imageTime,
    telescopeName,
    instrumentName,
  } = slotInfo;

  const [isInfoMenuOpen, toggleInfoMenu] = useState(false);

  const dotMenuItems = [
    {
      show: showRemoveImage,
      disabled: !enableRemoveImage,
      title: removeImageText,
      action: () => removeDataCollectionSlotImage(slotId, customerImageId),
    },
    {
      show: showDownloadImage,
      disabled: !enableDownloadImage,
      title: downloadImageText,
      action: () => onDownloadImage(imageURL),
    },
    {
      show: showCheckForMissions,
      disabled: !enableCheckForMissions,
      title: checkForMissionsText,
      action: () => browserHistory.push(checkForMissionsUrl),
    },
    {
      show: showObjectInfo,
      disabled: !enableObjectInfo,
      title: learnAboutText,
      action: () => browserHistory.push(learnAboutUrl),
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
          callBack={refreshDataCollection}
        />
      ),
    },
  ];

  return (
    <div className="dc-slot-card">
      <div className="dc-slot-card-number">
        {slotSequence > 9 ? slotSequence : `0${slotSequence}`}
      </div>
      {showSlotTitle && <div className="dc-slot-card-title">{slotTitle}</div>}
      <div className="dc-slot-card-thumbnail-box">
        {slotHasImage ? (
          <ImageClickHandler imageUrl={imageURL}>
            <img src={thumbnailURL} alt="slot" />
          </ImageClickHandler>
        ) : (
          <div className="dc-slot-card-empty-image">
            <img src={thumbnailURL} alt="slot" />
          </div>
        )}
      </div>
      <div className="dc-slot-card-actions">
        {showSlotButton && (
          <Tooltip theme="light" title={slotButtonTooltipText} position="top">
            <Button
              className="dc-slot-card-find-btn"
              onClick={() => showDataCollectionSlotModal(slot)}
              disabled={!enableSlotButton}
            >
              {slotButtonCaption}
            </Button>
          </Tooltip>
        )}
        {showSlotInfo && (
          <Tooltip theme="light" title={slotInfoTooltipText} position="top">
            <Button
              className={cx('dc-slot-card-info-btn', { open: isInfoMenuOpen })}
              onClick={() => toggleInfoMenu(!isInfoMenuOpen)}
            >
              {!isInfoMenuOpen ? (
                <img
                  alt=""
                  src="https://vega.slooh.com/assets/v4/common/info_icon.svg"
                />
              ) : (
                <i className="menu-icon-close icon-close" />
              )}
            </Button>
          </Tooltip>
        )}
        <QuestDotMenu
          theme={{ circleColor: astronaut }}
          show={showDotMenu}
          enabled={enableDotMenu}
          menuTitle={dotMenuTitle}
          items={dotMenuItems}
          dotMenuTooltipText={dotMenuTooltipText}
        />
        <QuestSlotInfoPopup
          slotInfo={slotInfo}
          slotInfoTitle={slotInfoTitle}
          isInfoMenuOpen={isInfoMenuOpen}
        />
      </div>
    </div>
  );
};
