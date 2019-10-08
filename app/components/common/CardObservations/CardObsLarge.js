import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import { ReturnObservationIcon } from 'app/components/common/RecommendedObservationsSlider/partials/GetObservationIcon';
import './CardObsLarge.scss';

const CardObsLarge = props => {
  const {
    title,
    subTitle,
    description,
    imageUrl,
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
  const { t } = useTranslation();
  const [isOpen, openModal] = useState(false);
  const [likesNumber, changeLikesNumber] = useState(likesCount);
  const onLikeClick = () => {
    return new Promise((resolve, reject) => {
      if (!showLikePrompt) {
        const response = handleLike(customerImageId);
        resolve(response);
      }
      reject();
    });
  };
  return (
    <Fragment>
      <div className="card-obs-wrapper">
        <div className="card-obs">
          {title ? (
            <Fragment>
              <div className="top">
                <div className="info">
                  <div className="main-info">
                    <h2 className="title h-2 h-2-bold">{title}</h2>
                    <Link to={iconFileData?.Member?.linkUrl}>
                      <h5 className="author h-5 h-5-normal">{subTitle}</h5>
                    </Link>
                    {description && (
                      <div
                        className="i-text-box"
                        dangerouslySetInnerHTML={{ __html: description }}
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
                      src={imageUrl}
                      style={{ cursor: 'pointer' }}
                      onClick={() => openModal(!isOpen)}
                      alt="Observation"
                    />
                    <ModalImg
                      isOpen={isOpen}
                      imageURL={imageUrl}
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
                      likesCount={likesNumber}
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
                      {t('Objects.Details')}
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
                    : `${t('Objects.Loading')}...`}
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="loading">{t('Objects.Loading')}...</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

CardObsLarge.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  likePrompt: PropTypes.string.isRequired,
  observationTimeDisplay: PropTypes.shape({}).isRequired,
  showLikePrompt: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default CardObsLarge;
