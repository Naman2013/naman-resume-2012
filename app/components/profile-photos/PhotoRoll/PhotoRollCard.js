/***********************************
* V4 PhotoRollCard
*  Photoroll tile on the /profile/private/photos/phototoll
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import noop from 'lodash/noop';
import Button from '../../../components/common/style/buttons/Button';
import Dots from '../../../atoms/icons/Dots';
import AsideToggleableMenu from '../AsideToggleableMenu';

import messages from './PhotoRollCard.messages';
import style from './PhotoRollCard.style';

const optionsList = [
  { label: 'Add to gallery',  },
  { label: 'Delete image',  },
  { label: 'Test',  },
  { label: 'Test',  },
  { label: 'Test',  },
];

class PhotoRollCard extends Component {
  state = {
    menuIsVisible: false,
  }

  downloadFile = () => {
    const { currentItem: { imageURL } } = this.props;
  }

  toggleMenuVisibility = () =>
    this.setState(prevState => ({ menuIsVisible: !prevState.menuIsVisible }));

  render() {
    const { index, isDesktop, isMobile, currentItem: observation, user } = this.props;
    const { menuIsVisible } = this.state;

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
                <AsideToggleableMenu
                  visible={menuIsVisible}
                  optionsList={optionsList}
                  toggleMenuVisibility={this.toggleMenuVisibility}
                />
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
                      onClickEvent={this.downloadFile}
                      theme={{ borderColor: '#fff', marginRight: 10 }}
                      icon="https://vega.slooh.com/assets/v4/icons/download.svg"
                    />
                    <Button
                      onClickEvent={this.toggleMenuVisibility}
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
}

const {
  bool,
  number,
  shape,
} = PropTypes;

PhotoRollCard.propTypes = {
  index: number.isRequired,
  isDesktop: bool.isRequired,
  isMobile: bool.isRequired,
  currentItem: shape({}).isRequired,
  user: shape({}).isRequired,
};

export default PhotoRollCard;
