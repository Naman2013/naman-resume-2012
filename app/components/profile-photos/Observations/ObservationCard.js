/***********************************
* V4 MissionCard
*  Mission tile on the /profile/private/photos/missions
***********************************/

import React from 'react';
import cn from 'classnames';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';

import messages from './ObservationCard.messages';
import style from './ObservationCard.style';

export default ({ index, isDesktop, isMobile, currentItem: observation }) => {
  const inCenter = (index + 2) % 3 === 0;
  const {
    imageTitle,
    imageURL,
    likesCount,
    commentsCount,
  } = observation;
  return (
    <div className={cn(['root', { 'inCenter': inCenter && isDesktop }])}>
      <div className="observationCard">
        <div className="padding">
          <div>
            <div className="observation-title" title={imageTitle}>{imageTitle}</div>
            <div className="observation-image-wrapper">
              <div className="image-border">
                <div className="image" style={{ backgroundImage: `url(${imageURL})` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="likes"><img className="icon" src="https://vega.slooh.com/assets/v4/common/heart.svg" alt="heart" />{likesCount}</div>
          <div className="comments"><img className="icon" src="https://vega.slooh.com/assets/v4/common/comment.svg" alt="comment" />{commentsCount}</div>
          <div className="details">
            <span><FormattedMessage {...messages.Details} /></span>
            <img src="https://vega.slooh.com/assets/v4/icons/horz_arrow_right_astronaut.svg" alt="arrow-right" />
          </div>
        </div>
        {/* Observation */}
      </div>
      <style jsx>{style}</style>
    </div>
  );
};
