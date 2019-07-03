import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

export const DataCollectionSlotCard = props => {
  const { slot } = props;
  const { slotSequence, thumbnailURL, slotButtonCaption } = slot;
  return (
    <div className="dc-slot-card">
      <div className="dc-slot-card-number">
        {slotSequence > 9 ? slotSequence : `0${slotSequence}`}
      </div>
      <div className="dc-slot-card-title">Title</div>
      <div className="dc-slot-card-thumbnail-box">
        <img src={thumbnailURL} />
      </div>
      <div className="dc-slot-card-actions">
        <Button>{slotButtonCaption}</Button>
      </div>
    </div>
  );
};
