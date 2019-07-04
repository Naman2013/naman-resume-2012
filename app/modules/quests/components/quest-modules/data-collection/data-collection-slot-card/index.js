import React from 'react';
import { Button } from 'react-bootstrap';
import Dots from 'atoms/icons/Dots';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import './styles.scss';

export const DataCollectionSlotCard = props => {
  const { slot, showDataCollectionSlotModal } = props;
  const {
    slotSequence,
    thumbnailURL,
    slotButtonCaption,
    slotTitle,
    showSlotTitle,
    showSlotInfo,
    showDotMenu,
  } = slot;
  return (
    <div className="dc-slot-card">
      <div className="dc-slot-card-number">
        {slotSequence > 9 ? slotSequence : `0${slotSequence}`}
      </div>
      {showSlotTitle && <div className="dc-slot-card-title">{slotTitle}</div>}
      <div className="dc-slot-card-thumbnail-box">
        <img src={thumbnailURL} />
      </div>
      <div className="dc-slot-card-actions">
        <Button
          className="dc-slot-card-find-btn"
          onClick={showDataCollectionSlotModal}
        >
          {slotButtonCaption}
        </Button>
        {showSlotInfo && (
          <Button className="dc-slot-card-info-btn">
            <img
              alt=""
              src="https://vega.slooh.com/assets/v4/common/info_icon.svg"
            />
          </Button>
        )}
        {showDotMenu && (
          <Button
            onClick={() => toggleMenu(!isOpen)}
            className="dc-slot-card-dots-menu"
          >
            <Dots theme={{ circleColor: astronaut }} />
          </Button>
        )}
      </div>
    </div>
  );
};
