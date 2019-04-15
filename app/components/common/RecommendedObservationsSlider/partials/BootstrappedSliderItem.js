import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';

import style from './BootstrappedSliderItem.style';
import messages from './BootstrappedSliderItem.messages';

const BootstrappedObservationSliderItem = props => {
  const {
    imageTitle,
    displayName,
    observationLog,
    imageDownloadURL,
    linkUrl,
    likesCount,
    commentsCount,
    observationTimeDisplay,
    intl,
    handleLike,
    onLike,
    customerImageId,
    likePrompt,
    showLikePrompt,
  } = props;
  const [isOpen, openModal] = useState(false);
  const [likesNumber, changeLikesNumber] = useState(likesCount);
  const onLikeClick = () => {
    if (!showLikePrompt) {
      if (handleLike) handleLike(customerImageId);
      if (onLike) onLike(customerImageId);
      changeLikesNumber(likesNumber + 1);
    }
  };
  return (
    <Fragment>
      <div className="card-obs-wrapper">
        <div className="card-obs">
          {imageTitle ? (
            <Fragment>
              <div className="top">
                <div className="info">
                  <div className="main-info">
                    <div className="title">{imageTitle}</div>
                    <div className="author">{displayName}</div>
                    <div className="i-text-box">{observationLog}</div>
                  </div>
                  <div className="links">
                    <div className="link">
                      <img
                        src="https://vega.slooh.com/assets/v4/icons/user_astronaut.svg"
                        alt="user"
                      />
                    </div>
                    <div className="link">
                      <img
                        className="linkIcon"
                        src="https://vega.slooh.com/assets/v4/icons/solar_system/Jupiter.png"
                        alt="system"
                      />
                    </div>
                    <div className="link">
                      <img
                        src="https://vega.slooh.com/assets/v4/common/icon_observatory.svg"
                        alt="observatory"
                      />
                    </div>
                    <div className="link">
                      <img
                        src="https://vega.slooh.com/assets/v4/icons/location_marker.png"
                        alt="location"
                      />
                    </div>
                  </div>
                </div>
                <div className="picture">
                  <div className="image-wrapper">
                    <img
                      src={imageDownloadURL}
                      style={{ cursor: 'pointer' }}
                      onClick={() => openModal(!isOpen)}
                      alt="Observation"
                    />
                    <ModalImg
                      isOpen={isOpen}
                      imageURL={imageDownloadURL}
                      onHide={() => openModal(!isOpen)}
                    />
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="buttons">
                  <div className="button">
                    <LikeSomethingButton
                      mod="no-border"
                      likePrompt={likePrompt}
                      likesCount={likesNumber || likesCount}
                      likeHandler={onLikeClick}
                      customerId={customerImageId}
                      showLikePrompt={showLikePrompt}
                    >
                      <img
                        className="icon"
                        src="https://vega.slooh.com/assets/v4/common/heart.svg"
                        alt="heart"
                      />
                      {!likesCount ? '0' : likesCount}
                    </LikeSomethingButton>
                  </div>
                  <div className="button">
                    <img
                      className="icon"
                      src="https://vega.slooh.com/assets/v4/common/comment.svg"
                      alt="comment"
                    />
                    {!commentsCount ? '0' : commentsCount}
                  </div>
                  {linkUrl && (
                    <a href={linkUrl} className="button details">
                      {intl.formatMessage(messages.Details)}
                      <img
                        src="https://vega.slooh.com/assets/v4/icons/horz_arrow_right_astronaut.svg"
                        alt="arrow-right"
                      />
                    </a>
                  )}
                </div>
                <div className="capture-date">
                  {observationTimeDisplay
                    ? observationTimeDisplay[0]
                    : `${intl.formatMessage(messages.Loading)}...`}
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="loading">
              {intl.formatMessage(messages.Loading)}...
            </div>
          )}
        </div>
      </div>
      <style jsx>{style}</style>
    </Fragment>
  );
};

BootstrappedObservationSliderItem.propTypes = {
  imageTitle: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  observationLog: PropTypes.string.isRequired,
  imageDownloadURL: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  likePrompt: PropTypes.string.isRequired,
  observationTimeDisplay: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  customerImageId: PropTypes.number.isRequired,
  showLikePrompt: PropTypes.bool.isRequired,
};

export default injectIntl(BootstrappedObservationSliderItem);
