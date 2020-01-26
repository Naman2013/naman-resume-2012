import React, { useState } from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import Dots from 'app/atoms/icons/Dots';
import { QuestSlotInfoPopup } from 'app/modules/quests/components/quest-slot-info-popup';
import './style.scss';
import { QuestDotMenu } from 'app/modules/quests/components/quest-dot-menu';
import { downloadFile } from 'app/utils/downloadFile';
import FollowObjectButton from 'app/components/object-details/FollowObjectButton';
import uniqueId from 'lodash/uniqueId';
import { IQuestDataCollectionSlot } from 'app/modules/quests/types';
import ImageClickHandler from 'app/components/common/ImageClickHandler';

type TImageSlotProps = {
  imageOrderingModule: any;
  getImageOrderingModule?: () => void;
  showMontageModuleSlotModal?: () => void;
  slot?: IQuestDataCollectionSlot;
  removeDataCollectionSlotImage?: (slotId: number, imageId: number) => void;
  user?: User;
  readOnly: boolean;
  mmSlotModalVisible: boolean;
};

export const ImageSlot: React.FC<TImageSlotProps> = props => {
  const {
    imageOrderingModule,
    getImageOrderingModule,
    slot,
    showMontageModuleSlotModal,
    removeDataCollectionSlotImage,
    user,
    readOnly,
    mmSlotModalVisible,
  } = props;
  const { correctText } = imageOrderingModule;
  const {
    imageURL,
    enableSlotButton,
    enableSlotInfo,
    showSlotButton,
    slotButtonCaption,
    showSlotInfo,
    slotInfoTitle,
    showTextPrompt,
    textPrompt,
    showGraphicalPrompt,
    graphicalPromptURL,
    slotButtonTooltipText,
    slotInfoTooltipText,
    dotMenuTooltipText,
    slotInfo,
    slotIdentifier,
    showDotMenu,
    enableDotMenu,
    dotMenu,
    dotMenuTitle,
    slotId,
    customerImageId,
    objectId,
    slotHasImage,
    scoringText,
    scoringTextBold,
    explanation,
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
          width="auto"
        />
      ),
    },
  ];

  const [isInfoMenuOpen, toggleInfoMenu] = useState(false);
  const [isDotsMenuOpen, toggleDotsMenu] = useState(false);

  return (
    <div>
      <div className="montage-slot">
        <div className="montage-slot__body slot-card">
          <div className="slot-card__left">
            <div className="slot-card__left__identifier">{slotIdentifier}</div>
            {showGraphicalPrompt && (
              <div className="slot-card__left__img">
                <img src={graphicalPromptURL} alt="" />
              </div>
            )}

            {showTextPrompt && (
              <div className="slot-card__left__title">{textPrompt}</div>
            )}
          </div>

          <div className="slot-card__right">
            <div className="slot-card__right__img">
              {slotHasImage ? (
                <ImageClickHandler imageUrl={imageURL}>
                  <img src={imageURL} alt="slot" />
                </ImageClickHandler>
              ) : (
                <img src={imageURL} alt="slot" />
              )}
            </div>

            <div className="slot-card__right__action">
              {showSlotButton && (
                <Tooltip
                  title={slotButtonTooltipText}
                  theme="light"
                  distance={10}
                  position="top"
                  disabled={mmSlotModalVisible}
                >
                  <Button
                    className="find-button"
                    onClick={(): void => showMontageModuleSlotModal()}
                    disabled={!enableSlotButton || readOnly}
                  >
                    {slotButtonCaption}
                  </Button>
                </Tooltip>
              )}

              {showSlotInfo && (
                <div className="slot-info-container">
                  <Tooltip
                    theme="light"
                    title={slotInfoTooltipText}
                    position="top"
                    disabled={isInfoMenuOpen}
                  >
                    <Button
                      className={cx('info-btn', { open: isInfoMenuOpen })}
                      onClick={(): void =>
                        !isDotsMenuOpen && toggleInfoMenu(!isInfoMenuOpen)
                      }
                      disabled={!enableSlotInfo || readOnly}
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

                  <QuestSlotInfoPopup
                    slotInfo={slotInfo}
                    slotInfoTitle={slotInfoTitle}
                    isInfoMenuOpen={isInfoMenuOpen}
                  />
                </div>
              )}

              {showDotMenu && (
                <div className="dot-menu-wrapper">
                  <Tooltip
                    title={dotMenuTooltipText}
                    theme="light"
                    distance={10}
                    position="top"
                    disabled={isDotsMenuOpen}
                  >
                    <Button
                      className={cx('quest-dot-menu-btn', {
                        open: isDotsMenuOpen,
                      })}
                      onClick={(): void =>
                        !isInfoMenuOpen && toggleDotsMenu(!isDotsMenuOpen)
                      }
                      disabled={!enableDotMenu || readOnly}
                    >
                      {!isDotsMenuOpen ? (
                        <Dots theme={{ circleColor: astronaut }} />
                      ) : (
                        <i className="menu-icon-close icon-close" />
                      )}
                    </Button>
                  </Tooltip>

                  <QuestDotMenu
                    show={isDotsMenuOpen}
                    menuTitle={dotMenuTitle}
                    items={dotMenuItems}
                    toggle={toggleDotsMenu}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="montage-slot__footer">
          <div className="explanation-text">{explanation}</div>

          <div className={cx('scoring-text', { bold: scoringTextBold })}>
            {scoringText}
          </div>
        </div>
      </div>
    </div>
  );
};
