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

function forceDownload(url, fileName) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(this.response);
    const tag = document.createElement('a');
    tag.href = imageUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
}

class PhotoRollCard extends Component {
  state = {
    menuIsVisible: false,
  };

  get optionsList() {
    return [
      { label: 'Add to gallery', action: 'addToGallery' },
      { label: 'Delete image', action: 'remove' },
      { label: 'Test', },
      { label: 'Test', },
      { label: 'Test', },
    ];
  }

  toggleMenuVisibility = () => {
    this.setState({ menuIsVisible: !this.state.menuIsVisible });
  };

  componentDidMount() {
    this.setState({ width: this.blockWidth.clientWidth });
  }

  render() {
    const {
      index,
      isDesktop,
      isMobile,
      currentItem: observation, user
    } = this.props;
    const { menuIsVisible, width } = this.state;
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
          ref={(node) => { this.blockWidth = node; }}
          onClick={isMobile
            ? () => browserHistory.push(`/my-pictures/show-image/${customerImageId}/${token}`)
            : noop
          }
        >
          <div className="square-container">
            <div className="image" style={{ backgroundImage: `url(${imageURL})` }}>
              <div className="onhover-overlay">
                <AsideToggleableMenu
                  blockWidth={width}
                  visible={menuIsVisible}
                  optionsList={this.optionsList}
                  toggleMenuVisibility={this.toggleMenuVisibility}
                  {...this.props}
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
                      onClickEvent={forceDownload}
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
  count: number.isRequired,
};

export default PhotoRollCard;
