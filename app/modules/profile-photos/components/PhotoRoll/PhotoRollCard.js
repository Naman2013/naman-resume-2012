/* eslint-disable */
// @flow
/***********************************
 *  V4 PhotoRollCard
 *  Photoroll tile on the /profile/private/photos/phototoll
 ***********************************/
import React, { Component } from 'react';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import { browserHistory } from 'react-router';
import Button from 'app/components/common/style/buttons/Button';
import Dots from 'app/atoms/icons/Dots';
import { downloadFile } from 'app/utils/downloadFile';
import AsideToggleableMenu from '../AsideToggleableMenu';

import style from './PhotoRollCard.style';

type TPhotoRollCard = {
  index: number,
  isDesktop: boolean,
  isMobile: boolean,
  currentItem: Object,
  user: Object,
  count: number,
  isShareToken?: boolean,
  tagActions: Object,
  galleryId: string,
  typeGallery: boolean,
};

@withTranslation()
class PhotoRollCard extends Component<TPhotoRollCard> {
  state = { menuIsVisible: false };

  optionsList = [
    { label: 'Remove from This Gallery', action: 'removeFromGallery' },
    { label: 'Add to gallery', action: 'addToGallery' },
    { label: 'Delete image', action: 'remove' },
    { label: 'Write observation', action: 'redirect' },
    { label: 'Add Tags', action: 'tagging' },
    { label: 'Share Image' },
  ];

  blockWidth = null;

  componentDidMount() {
    this.setState({ width: this.blockWidth.clientWidth });
  }

  onDownloadFile = () => {
    const {
      currentItem: { imageDownloadURL, imageDownloadFilename },
    } = this.props;
    downloadFile(imageDownloadURL, imageDownloadFilename);
  };

  toggleMenuVisibility = () => {
    this.setState({ menuIsVisible: !this.state.menuIsVisible });
  };

  redirectToImage = () => () => {
    const { currentItem, user, isShareToken } = this.props;
    const token = isShareToken ? currentItem.shareToken : user.token;
    return browserHistory.push(
      `/my-pictures/show-image/${currentItem.customerImageId}/${token}`
    );
  };

  render() {
    const {
      index,
      isDesktop,
      isMobile,
      currentItem: observation,
      tagActions,
      typeGallery,
      t,
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
    } = observation;
    return (
      <div className={cn(['root', { inCenter: inCenter && isDesktop }])}>
        <div
          className="photoRollCard"
          role={isMobile ? 'button' : 'article'}
          ref={node => {
            this.blockWidth = node;
          }}
        >
          <div className="square-container">
            <div
              className="image"
              style={{ backgroundImage: `url(${imageURL})` }}
            >
              <div className="onhover-overlay">
                <AsideToggleableMenu
                  blockWidth={width}
                  visible={menuIsVisible}
                  tagActions={tagActions}
                  optionsList={this.optionsList}
                  redirectToImage={this.redirectToImage}
                  toggleMenuVisibility={this.toggleMenuVisibility}
                  typeGallery={typeGallery}
                  {...this.props}
                />
                <div className="overlay-top">
                  <div className="photoRoll-title" title={imageTitle}>
                    {imageTitle}
                  </div>
                  <div className="photoRoll-details">
                    <div className="photoRoll-details-tile photoRoll-details-date">
                      {displayDate}
                    </div>
                    <div className="photoRoll-details-tile photoRoll-details-images">
                      {displayTime}
                    </div>
                  </div>
                  <div className="photoRoll-telescope">{telescopeName}</div>
                  <div className="photoRoll-instrument">{instrumentName}</div>
                </div>
                <div className="overlay-bottom">
                  <Button
                    withIntl
                    onClickEvent={this.redirectToImage()}
                    text={t('Photos.Details')}
                    theme={{ borderColor: '#fff', color: '#fff' }}
                  />
                  <div style={{ display: 'flex' }}>
                    <Button
                      onClickEvent={this.onDownloadFile}
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
  }
}

export default PhotoRollCard;
