import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import Dots from 'atoms/icons/Dots';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import ImageClickHandler from 'app/components/common/ImageClickHandler';
import FollowObjectButton from 'app/components/object-details/FollowObjectButton';
import { Link } from 'react-router';
import { downloadFile } from 'app/utils/downloadFile';
import { QuestButtonsPopover } from '../../../quest-buttons-popover';
import './styles.scss';

const onDownloadImage = url => {
  downloadFile(url, url.substring(url.lastIndexOf('/') + 1));
};

export const DataCollectionSlotCard = props => {
  const {
    slot,
    showDataCollectionSlotModal,
    readOnly,
    removeDataCollectionSlotImage,
    user,
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
    slotId,
    slotHasImage,
    //dotMenu,
  } = slot;

  const dotMenu = {
    showCheckForMissions: true,
    enableCheckForMissions: true,
    checkForMissionsText: 'CHECK FOR MISSIONS',
    checkForMissionsUrl: '/object-details/4/missions',
    showObjectInfo: true,
    enableObjectInfo: true,
    showRemoveImage: true,
    enableRemoveImage: true,
    removeImageText: 'REMOVE THIS IMAGE',
    showDownloadImage: true,
    enableDownloadImage: true,
    downloadImageText: 'DOWNLOAD THIS IMAGE',
    objectInfo: {
      learnAboutText: 'LEARN ABOUT MARS',
      learnAboutUrl: '/object-details/4',
      showFollowPromptFlag: true,
      followPrompt: 'FOLLOW MARS',
      followPromptIconUrl:
        'https://vega.slooh.com/assets/v4/common/plus_icon.svg',
      followActionIconUrl:
        'https://vega.slooh.com/assets/v4/common/plus_icon.svg',
      toggleFollowConfirmationFlag: false,
      toggleFollowConfirmationPrompt: false,
    },
  };

  const [isInfoMenuOpen, toggleInfoMenu] = useState(false);
  const [isDotsMenuOpen, toggleDotsMenu] = useState(false);
  return (
    <div className="dc-slot-card">
      <div className="dc-slot-card-number">
        {slotSequence > 9 ? slotSequence : `0${slotSequence}`}
      </div>
      {showSlotTitle && <div className="dc-slot-card-title">{slotTitle}</div>}
      <div className="dc-slot-card-thumbnail-box">
        <ImageClickHandler imageUrl={imageURL}>
          <img src={thumbnailURL} />
        </ImageClickHandler>
      </div>
      <div className="dc-slot-card-actions">
        {showSlotButton &&
          <Button
            className="dc-slot-card-find-btn"
            onClick={() => showDataCollectionSlotModal(slot)}
            disabled={readOnly}
          >
            {slotButtonCaption}
          </Button>
        }
        {showSlotInfo && (
          <Button
            className={cn('dc-slot-card-info-btn', { open: isInfoMenuOpen })}
            onClick={() => !isDotsMenuOpen && toggleInfoMenu(!isInfoMenuOpen)}
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
        )}
        {showDotMenu && (
          <Button
            onClick={() => !isInfoMenuOpen && toggleDotsMenu(!isDotsMenuOpen)}
            className={cn('dc-slot-card-dots-menu', { open: isDotsMenuOpen })}
          >
            {!isDotsMenuOpen ? (
              <Dots theme={{ circleColor: astronaut }} />
            ) : (
              <i className="menu-icon-close icon-close" />
            )}
          </Button>
        )}

        <QuestButtonsPopover isOpen={isInfoMenuOpen}>
          {isInfoMenuOpen && slotInfo.showSlotContentsDesc && (
            <div className="dc-slot-info-popover">
              <div className="dc-slot-info-title">{slotInfoTitle}</div>
              <div className="dc-slot-info-text">
                {slotInfo?.slotContentsDesc}
              </div>
            </div>
          )}
          {isInfoMenuOpen && slotInfo.showObjectDetails && (
            <div className="data-collection-image-info">
              <div className="dc-slot-info-popover">
                <div className="dc-slot-info-title">{slotInfoTitle}</div>
                <div className="dc-slot-info-text">
                  <div className="slot-info-title">{slotInfo?.objectName}</div>
                  <div className="slot-info-date">
                    <div>{slotInfo?.imageDate}</div>
                    <div>{slotInfo?.imageTime}</div>
                  </div>
                  <div className="slot-info-telescope">
                    {slotInfo?.telescopeName}
                  </div>
                  <div className="slot-info-subtitle">
                    {slotInfo?.instrumentName}
                  </div>
                </div>
              </div>
            </div>
          )}
        </QuestButtonsPopover>

        <div className="data-collection-menu">
          <QuestButtonsPopover isOpen={isDotsMenuOpen}>
            {isDotsMenuOpen && (
              <div className="dc-slot-dots-popover">
                <div className="title">MORE OPTIONS:</div>
                <div onClick={() => toggleDotsMenu(false)} className="content">
                  {slotHasImage && (
                    <div
                      onClick={() =>
                        removeDataCollectionSlotImage(slotId, 5430270)
                      }
                    >
                      {dotMenu?.removeImageText}
                    </div>
                  )}
                  {slotHasImage && (
                    <div onClick={() => onDownloadImage(imageURL)}>
                      {dotMenu?.downloadImageText}
                    </div>
                  )}
                  {!slotHasImage && (
                    <Link to={dotMenu?.checkForMissionsUrl}>
                      <div>{dotMenu?.checkForMissionsText}</div>
                    </Link>
                  )}
                  <Link to={dotMenu?.objectInfo?.learnAboutUrl}>
                    <div>{dotMenu?.objectInfo?.learnAboutText}</div>
                  </Link>
                  <Link>
                    <div>
                      <FollowObjectButton
                        objectId={6}
                        user={user}
                        followButtonText={dotMenu?.objectInfo?.followPrompt}
                        followButtonIconURL={
                          dotMenu?.objectInfo?.followPromptIconUrl
                        }
                      />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </QuestButtonsPopover>
        </div>
      </div>
    </div>
  );
};
