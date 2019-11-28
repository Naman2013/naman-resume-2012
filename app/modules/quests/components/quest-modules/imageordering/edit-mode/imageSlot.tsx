import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import { Tooltip } from 'react-tippy';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import Dots from 'app/atoms/icons/Dots';
import { QuestSlotInfoPopup } from 'app/modules/quests/components/quest-slot-info-popup';
import './style.scss';
import { IQuestDataCollectionSlot } from 'app/modules/quests/types';

type TImageSlotProps = {
  showMontageModuleSlotModal?: () => void;
  slot?: IQuestDataCollectionSlot;
};

export const ImageSlot: React.FC<TImageSlotProps> = props => {
  const { slot, showMontageModuleSlotModal } = props;
  const {
    imageURL,
    enableSlotButton,
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
    slotInfo,
    slotIdentifier,
  } = slot;

  const [isInfoMenuOpen, toggleInfoMenu] = useState(false);
  const [isDotsMenuOpen, toggleDotsMenu] = useState(false);

  return (
    <div>
      <div className="montage-slot">
        <div className="montage-slot__body slot-card">
          <div className="slot-card__left">
            <div className="slot-card__left__identifier">{slotIdentifier}</div>
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
              {showSlotButton && (
                <Tooltip
                  title={slotButtonTooltipText}
                  theme="light"
                  distance={10}
                  position="top"
                >
                  <Button
                    className="find-button"
                    onClick={() => showMontageModuleSlotModal()}
                    disabled={!enableSlotButton}
                  >
                    {slotButtonCaption}
                  </Button>
                </Tooltip>
              )}
              {showSlotInfo && (
                <Tooltip
                  theme="light"
                  title={slotInfoTooltipText}
                  position="top"
                >
                  <Button
                    className={cn('info-btn', { open: isInfoMenuOpen })}
                    onClick={() =>
                      !isDotsMenuOpen && toggleInfoMenu(!isInfoMenuOpen)
                    }
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
              <Button onClick={() => {}} className="dots-btn">
                <Dots theme={{ circleColor: astronaut }} />
              </Button>
              <QuestSlotInfoPopup
                slotInfo={slotInfo}
                slotInfoTitle={slotInfoTitle}
                isInfoMenuOpen={isInfoMenuOpen}
              />
            </div>
          </div>
        </div>
        <div className="montage-slot__footer">
          <div className="find-image-title" />
        </div>
      </div>
    </div>
  );
};
