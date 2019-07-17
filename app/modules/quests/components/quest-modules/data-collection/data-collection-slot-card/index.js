import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import Dots from 'atoms/icons/Dots';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import ImageClickHandler from 'app/components/common/ImageClickHandler';
import { QuestButtonsPopover } from '../../../quest-buttons-popover';
import './styles.scss';

export const DataCollectionSlotCard = props => {
  const { slot, showDataCollectionSlotModal, readOnly } = props;
  const {
    slotSequence,
    thumbnailURL,
    slotButtonCaption,
    slotTitle,
    showSlotTitle,
    showSlotInfo,
    showDotMenu,
    slotInfoTitle,
    slotInfo,
    imageURL,
    slotId,
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
        <ImageClickHandler imageUrl={imageURL} >
          <img src={thumbnailURL} />
        </ImageClickHandler>
      </div>
      <div className="dc-slot-card-actions">
        <Button
          className="dc-slot-card-find-btn"
          onClick={() => showDataCollectionSlotModal(slot)}
          disabled={readOnly}
        >
          {slotButtonCaption}
        </Button>
        {showSlotInfo && (
          <Button
            className={cn('dc-slot-card-info-btn', { open: isInfoMenuOpen })}
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
        )}
        {showDotMenu && (
          <Button
            onClick={() => toggleDotsMenu(!isDotsMenuOpen)}
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
          {isInfoMenuOpen && (
            <div className="dc-slot-info-popover">
              <div className="dc-slot-info-title">{slotInfoTitle}</div>
              <div className="dc-slot-info-text">{slotInfo}</div>
            </div>
          )}
        </QuestButtonsPopover>

        <QuestButtonsPopover isOpen={isDotsMenuOpen}>
          {isDotsMenuOpen && (
            <div className="dc-slot-dots-popover">
            </div>
          )}
        </QuestButtonsPopover>
      </div>
    </div>
  );
};
