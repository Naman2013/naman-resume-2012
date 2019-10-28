import React, { Fragment, useState } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Tooltip } from 'react-tippy';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import { ReturnObservationIcon } from 'app/components/common/RecommendedObservationsSlider/partials/GetObservationIcon';

import style from './BootstrappedSliderItem.style';
import messages from './BootstrappedSliderItem.messages';

const BootstrappedObservationSliderItem = props => {
  const {
    observationTitle,
    imageTitle,
    displayName,
    observationLog,
    imageDownloadURL,
    linkUrl,
    likesCount,
    likedByMe,
    likeTooltip,
    commentsCount,
    observationTimeDisplay,
    intl,
    handleLike,
    customerImageId,
    likePrompt,
    showLikePrompt,
    socialShareDescription,
    iconFileData,
  } = props;
  const [isOpen, openModal] = useState(false);
  const [likesNumber, changeLikesNumber] = useState(likesCount);
  const title = observationTitle || imageTitle;
  const onLikeClick = () => {
    if (!showLikePrompt) {
      changeLikesNumber(likesNumber + 1);
      return handleLike(customerImageId);
    }
  };
  return (
    <Fragment>
      <div className="card-obs-wrapper">
        <div className="card-obs">
          {imageDownloadURL ? (
            <Fragment>
              <div className="top">
                <div className="info">
                  <div className="main-info">
                    <h2 className="title">{title}</h2>
                    <Link to={iconFileData?.Member?.linkUrl}>
                      <h5 className="author">{displayName}</h5>
                    </Link>
                    {observationLog && (
                      <p
                        className="dashboardObservationText i-text-box"
                        dangerouslySetInnerHTML={{ __html: observationLog }}
                      />
                    )}
                  </div>
                  <div className="links">
                    {Object.keys(iconFileData).map(item => (
                      <Tooltip title={iconFileData[item].text}>
                        {iconFileData[item].hasLink ? (
                          <Link to={iconFileData[item].linkUrl} target="_blank">
                            <ReturnObservationIcon item={iconFileData[item]} />
                          </Link>
                        ) : (
                          <ReturnObservationIcon item={iconFileData[item]} />
                        )}
                      </Tooltip>
                    ))}
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
                      customClassName="obs-image-wrapper"
                      magnifierClassName="obs-image-magnifier"
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
                      likedByMe={likedByMe}
                      likeTooltip={likeTooltip}
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
                    <Link to={linkUrl} className="button details">
                      {intl.formatMessage(messages.Details)}
                      <img
                        src="https://vega.slooh.com/assets/v4/icons/horz_arrow_right_astronaut.svg"
                        alt="arrow-right"
                      />
                    </Link>
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
