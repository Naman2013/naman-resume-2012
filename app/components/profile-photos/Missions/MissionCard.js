/***********************************
* V4 MissionCard
*  Mission tile on the /profile/private/photos/missions
***********************************/

import React from 'react';
import cn from 'classnames';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Button from '../../../components/common/style/buttons/Button';
import messages from './MissionCard.messages';
import style from './MissionCard.style';

export default ({ index, isDesktop, isMobile, currentItem: mission }) => {
  const inCenter = (index + 2) % 3 === 0;
  const {
    imageTitle,
    displayDate,
    missionImageCount,
    missionIconURL,
    telescopeName,
    imageURL,
    scheduledMissionId,
  } = mission;
  return (
    <div className={cn(['root', { 'inCenter': inCenter && isDesktop }])}>
      <div className="missionCard">
        <div className="circle show-onhover" />
        <div className="card-top">
          <div className="mission-title" title={imageTitle}>{imageTitle}</div>
          <div className="mission-details">
            <div className="mission-details-tile mission-details-date">{displayDate}</div>
            <div className="mission-details-tile mission-details-images">{missionImageCount} <FormattedMessage {...messages.Images} /></div>
          </div>
          <div className={cn('mission-telescope', { 'display-none': isMobile })}>{telescopeName}</div>

          {/* Un comment this lines and css selectors for hover effect */}

          {/* <div className="onhover-field show-onhover">ULTRA-WIDE-FIELD</div>
          <div className="onhover-field show-onhover">CONTAINS FITS DATA</div> */}

          <div className="mission-image-wrapper">
            <div className="mission-image-border">
              <img
                className="mission-image"
                src={imageURL}
                alt="Mission"
              />
            </div>
          </div>
        </div>
        <div className="show-onhover card-bottom">
          <Button
            onClickEvent={() => browserHistory.push(`/missions-details/${scheduledMissionId}`)}
            theme={{ borderColor: '#fff', color: '#fff' }}
            text={<FormattedMessage {...messages.OpenMission} />}
          />
          <Button
            onClickEvent={() => {}}
            theme={{ borderColor: '#fff', color: '#fff', marginLeft: '10px' }}
            text=". . ."
          />
        </div>
      </div>
      <style jsx>{style}</style>
    </div>
  );
};
