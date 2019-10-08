/***********************************
 * V4 MissionCard
 *  Mission tile on the /profile/private/photos/missions
 ***********************************/

import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';
import messages from '../Missions/MissionCard.messages';
import style from './GalleryCard.style';

export default ({ index, isDesktop, currentItem: gallery }) => {
  const inCenter = index % 3 === 1;
  const {
    displayDate,
    title,
    imageURL,
    galleryPictureCount,
    galleryLinkLabel,
    galleryLinkURL,
  } = gallery;
  const bg = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.85)), url(${imageURL})`;
  const { t } = useTranslation();
  return (
    <div className={cn(['root', { inCenter: inCenter && isDesktop }])}>
      <div className="galleryCardWrapper">
        <div className="galleryCard" style={{ backgroundImage: bg }}>
          <div className="cardContent">
            <div className="gallery-name">{title}</div>
            <div className="info">
              <div className={cn('text', 'date')}>{displayDate}</div>
              <div className={cn('text', 'images-count')}>
                {galleryPictureCount} {t('.Images')}
              </div>
            </div>
            <div className="galleryCard-actions">
              <Btn
                mod="white"
                onClick={() => browserHistory.push(galleryLinkURL)}
              >
                {galleryLinkLabel}
              </Btn>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{style}</style>
    </div>
  );
};
