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
    objectId,
    slotId,
    slotHasImage,
    customerImageId,
    dotMenu,
    dotMenuTitle,
    enableDotMenu,
    enableSlotButton,
  } = slot;

  const [isInfoMenuOpen, toggleInfoMenu] = useState(false);
  const [isDotsMenuOpen, toggleDotsMenu] = useState(false);
  return (
    <div className="dc-slot-card">
      <div className="dc-slot-card-number">
        {slotSequence > 9 ? slotSequence : `0${slotSequence}`}
      </div>
      {showSlotTitle && <div className="dc-slot-card-title">{slotTitle}</div>}
      <div className="dc-slot-card-thumbnail-box">
        {slotHasImage ? (
          <ImageClickHandler imageUrl={imageURL}>
            <img src={thumbnailURL} />
          </ImageClickHandler>
        ) : (
          <div className="dc-slot-card-empty-image">
            <img src={thumbnailURL} />
          </div>
        )}
      </div>
      <div className="dc-slot-card-actions">
        {showSlotButton &&
          <Button
            className="dc-slot-card-find-btn"
            onClick={() => showDataCollectionSlotModal(slot)}
            disabled={!enableSlotButton}
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
            disabled={!enableDotMenu}
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
              <div 
                className="dc-slot-info-text" 
                dangerouslySetInnerHTML={{ __html: slotInfo?.slotContentsDesc }}
              />
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
                <div className="title">{dotMenuTitle}:</div>
                <div className="content">
                  {dotMenu?.showRemoveImage && (
                    <div
                      onClick={() => {
                        toggleDotsMenu(false);
                        removeDataCollectionSlotImage(slotId, customerImageId);
                      }}
                      disabled={!dotMenu?.enableRemoveImage}
                    >
                      {dotMenu?.removeImageText}
                    </div>
                  )}
                  {dotMenu?.showDownloadImage && (
                    <div
                      onClick={() => {
                        toggleDotsMenu(false); 
                        onDownloadImage(imageURL);
                      }}
                      disabled={!dotMenu?.enableDownloadImage}
                    >
                      {dotMenu?.downloadImageText}
                    </div>
                  )}
                  {dotMenu?.showCheckForMissions && (
                    <Link 
                      to={dotMenu?.checkForMissionsUrl}
                      disabled={!dotMenu?.enableCheckForMissions}
                    >
                      <div>{dotMenu?.checkForMissionsText}</div>
                    </Link>
                  )}
                  {dotMenu?.showObjectInfo && (
                    <>
                      <Link 
                        to={dotMenu?.objectInfo?.learnAboutUrl} 
                        disabled={!dotMenu?.enableObjectInfo}
                      >
                        <div>{dotMenu?.objectInfo?.learnAboutText}</div>
                      </Link>
                      <div className="follow-object-button" disabled={!dotMenu?.enableObjectInfo}>
                        <FollowObjectButton
                          objectId={objectId}
                          user={user}
                          followButtonText={dotMenu?.objectInfo?.followPrompt}
                          followButtonIconURL={
                            dotMenu?.objectInfo?.followPromptIconUrl
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </QuestButtonsPopover>
        </div>
      </div>
    </div>
  );
};
