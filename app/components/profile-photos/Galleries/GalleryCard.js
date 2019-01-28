/***********************************
* V4 MissionCard
*  Mission tile on the /profile/private/photos/missions
***********************************/

import React from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';
import Dots from '../../../atoms/icons/Dots';
import messages from '../Missions/MissionCard.messages';
import style from './GalleryCard.style';

export default ({ index, isDesktop, isMobile, currentItem: gallery }) => {
  const inCenter = index % 3 === 1;
  const {
    displayDate,
    title,
    imageURL,
    galleryPictureCount,
  } = gallery;
  return (
    <div className={cn(['root', { 'inCenter': inCenter && isDesktop }])}>
      <div className="galleryCardWrapper">
        <div className="galleryCard" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.85)), url(${imageURL})` }}>
          <div className="more"><Dots /></div>
          <div className="cardContent">
            <div className="gallery-name">{title}</div>
            <div className="info">
              <div className={cn('text', 'date')}>{displayDate}</div>
              <div className={cn('text', 'images-count')}>{galleryPictureCount} <FormattedMessage {...messages.Images} /></div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{style}</style>
    </div>
  );
};
