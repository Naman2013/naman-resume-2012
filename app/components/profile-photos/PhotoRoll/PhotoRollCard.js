/***********************************
* V4 MissionCard
*  Mission tile on the /profile/private/photos/missions
***********************************/

import React from 'react';
import cn from 'classnames';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import noop from 'lodash/noop';
import Button from '../../../components/common/style/buttons/Button';
import Dots from '../../../atoms/icons/Dots';

import messages from './PhotoRollCard.messages';
import style from './PhotoRollCard.style';

export default ({ index, isDesktop, isMobile, currentItem: observation, user }) => {
  const inCenter = index % 3 === 1;
  const {
    imageTitle,
    imageURL,
    displayDate,
    displayTime,
    telescopeName,
    instrumentName,
    customerImageId,
  } = observation;

  const { token } = user;
  return (
    <div className={cn(['root', { 'inCenter': inCenter && isDesktop }])}>
      <div 
        className="photoRollCard"
        role={isMobile ? 'button' : 'article'}
        onClick={isMobile
          ? () => browserHistory.push(`/my-pictures/show-image/${customerImageId}/${token}`)
          : noop 
        }
      >
        <div className="square-container">
          <div className="image" style={{ backgroundImage: `url(${imageURL})` }}>
            <div className="onhover-overlay">
              <div className="circle" />
              <div className="overlay-top">
                <div className="photoRoll-title" title={imageTitle}>{imageTitle}</div>
                <div className="photoRoll-details">
                  <div className="photoRoll-details-tile photoRoll-details-date">{displayDate}</div>
                  <div className="photoRoll-details-tile photoRoll-details-images">{displayTime}</div>
                </div>
                <div className="photoRoll-telescope">{telescopeName}</div>
                <div className="photoRoll-instrument">{instrumentName}</div>
              </div>
              <div className="overlay-bottom">
                <Button
                  withIntl
                  text={<FormattedMessage {...messages.Details} />}
                  onClickEvent={() => browserHistory.push(`/my-pictures/show-image/${customerImageId}/${token}`)}
                  theme={{ borderColor: '#fff', color: '#fff' }}
                />
                <div style={{ display: 'flex' }}>
                  <Button
                    theme={{ borderColor: '#fff', marginRight: 10 }}
                    icon="https://vega.slooh.com/assets/v4/icons/download.svg"
                  />
                  <Button
                    theme={{ borderColor: '#fff' }}
                    renderIcon={() => <Dots />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{style}</style>
    </div>
  );
};
