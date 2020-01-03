import React, { useState } from 'react';
import { IMissionPhotoListItem } from 'app/modules/profile-photos/types';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import './styles.scss';

type TMissionPhotosCardProps = {
  mission: IMissionPhotoListItem;
};

export const MissionPhotosCard: React.FC<TMissionPhotosCardProps> = props => {
  const { mission } = props;

  const { imageTitle, displayDate, telescopeName, imageURL } = mission;

  const [isOpen, openModal] = useState(false);

  return (
    <div className="mission-photos-card">
      <div className="mission-title" title={imageTitle}>
        {imageTitle}
      </div>
      <div className="mission-details">
        <div className="mission-details-date">{displayDate}</div>
        <div className="mission-details-telescope">{telescopeName}</div>
      </div>
      <div className="mission-image-wrapper">
        <div className="mission-image-border">
          <img
            className="mission-image"
            src={imageURL}
            alt="Mission"
            onClick={() => openModal(!isOpen)}
          />
          <ModalImg
            isOpen={isOpen}
            imageURL={imageURL}
            onHide={() => openModal(!isOpen)}
            customClassName="mission-photos-card-image-wrapper"
            magnifierClassName="mission-photos-card-image-magnifier"
          />
        </div>
      </div>
    </div>
  );
};
