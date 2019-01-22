import React, { Component } from 'react'
import cn from 'classnames';
import style from './MissionCard.style';
import Button from 'components/common/style/buttons/Button.js';

export default ({ index, isDesktop, isMobile, mission }) => {
  const inCenter = (index + 2) % 3 === 0;
  const {
    imageTitle,
    displayDate,
    missionImageCount,
    telescopeName,
    imageURL,
  } = mission;
  return (
    <div className={cn(['root', { 'inCenter': inCenter && isDesktop }])}>
      <div className="missionCard">
        <div className="circle show-onhover" />
        <div className="card-top">
          <div className="mission-title" title={imageTitle}>{imageTitle}</div>
          <div className="mission-details">
            <div className="mission-details-tile mission-details-date">{displayDate}</div>
            <div className="mission-details-tile mission-details-images">{missionImageCount} Images</div>
          </div>
          <div className={cn('mission-telescope', { 'display-none': isMobile })}>{telescopeName}</div>
          <div className="onhover-field show-onhover">ULTRA-WIDE-FIELD</div>
          <div className="onhover-field show-onhover">CONTAINS FITS DATA</div>
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
          <Button theme={{ borderColor: '#fff', color: '#fff' }} text="OPEN MISSION" />
          <Button theme={{ borderColor: '#fff', color: '#fff', marginLeft: '10px' }} text=". . ." />
        </div>
      </div>
      <style jsx>{style}</style>
    </div>
  );
};
