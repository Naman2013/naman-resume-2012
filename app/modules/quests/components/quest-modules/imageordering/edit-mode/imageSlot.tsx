import React from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import Dots from 'app/atoms/icons/Dots';
import './style.scss';

type ImageSlotProps = {
  imageOrderingModule: any;
  showMontageModuleSlotModal?: () => void;
  slot?: any;
};

export const ImageSlot: React.FC<ImageSlotProps> = props => {
  const { imageOrderingModule, slot, showMontageModuleSlotModal } = props;
  const { correctText, outputDownloadURL } = imageOrderingModule;
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
  } = slot;

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
                  onClick={() => showMontageModuleSlotModal()}
                  disabled={!enableSlotButton}
                >
                  {slotButtonCaption}
                </Button>
              </Tooltip>
              <Button onClick={() => {}} className="dots-btn">
                <Dots theme={{ circleColor: astronaut }} />
              </Button>
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
