// @flow
/***********************************
 *  V4 PhotoRollCard
 *  Photoroll tile on the /profile/private/photos/phototoll
 ***********************************/
import React, { Component } from 'react';
import cn from 'classnames';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Button from 'app/components/common/style/buttons/Button';
import Dots from 'app/atoms/icons/Dots';
import { downloadFile } from 'app/utils/downloadFile';
import AsideToggleableMenu from '../AsideToggleableMenu';
import messages from './PhotoRollCard.messages';
import style from './PhotoRollCard.style';


type TPhotoRollCard = {
  index: number,
  isDesktop: boolean,
  isMobile: boolean,
  currentItem: Object,
  user: Object,
  count: number,
};

class PhotoRollCard extends Component<TPhotoRollCard> {
  state = { menuIsVisible: false };

  optionsList = [
    { label: 'Add to gallery', action: 'addToGallery' },
    { label: 'Delete image', action: 'remove' },
    { label: 'Write observation', action: 'redirect' },
    { label: 'Add Tags' },
    { label: 'Share Image' },
  ];

  blockWidth = null;

  componentDidMount() {
    this.setState({ width: this.blockWidth.clientWidth });
  }

  onDownloadFile = () => {
    const { currentItem: { imageURL } } = this.props;
    downloadFile(imageURL, 'my-photo-hub-image.png');
  };

  toggleMenuVisibility = () => {
    this.setState({ menuIsVisible: !this.state.menuIsVisible });
  };

  redirectToImage = () => () => {
    const { currentItem, user } = this.props;

    return browserHistory.push(
      `/my-pictures/show-image/${currentItem.customerImageId}/${user.token}`
    );
  };

  render() {
    const {
      index,
      isDesktop,
      isMobile,
      currentItem: observation,
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
          ref={node => { this.blockWidth = node; }}
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
                  optionsList={this.optionsList}
                  redirectToImage={this.redirectToImage}
                  toggleMenuVisibility={this.toggleMenuVisibility}
                  {...this.props}
                />
                <div className="circle" />
                <div className="overlay-top">
                  <div className="photoRoll-title" title={imageTitle}>
                    {imageTitle}
                  </div>
                  <div className="photoRoll-details">
                    <div
                      className="photoRoll-details-tile photoRoll-details-date"
                    >
                      {displayDate}
                    </div>
                    <div
                      className="photoRoll-details-tile photoRoll-details-images">
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
                    text={<FormattedMessage {...messages.Details} />}
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
