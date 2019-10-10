import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import style from './CardObservationsSmall.style';

const CardObsSmall = props => {
  const {
    observationTitle,
    imageTitle,
    subTitle,
    description,
    imageUrl,
    linkUrl,
    likesCount,
    likedByMe,
    likeTooltip,
    commentsCount,
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
  const title = observationTitle || imageTitle;
  const onLikeClick = () => {
    if (!showLikePrompt) {
      changeLikesNumber(likesNumber + 1);
      return handleLike(customerImageId);
    }
  };
  return (
    <Fragment>
      <div className="card-obs">
        <div className="obs-left">
          <h2 className="card-obs-title h-2 h-2-bold">{title}</h2>
          <Link to={iconFileData?.Member?.linkUrl}>
            <h5 className="card-obs-author h-5 h-5-normal">{subTitle}</h5>
          </Link>
          {description && (
            <div
              className="i-text-box"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
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
          <div className="media-card-img-container">
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-bottom">
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
      </div>
      <style jsx>{style}</style>
    </Fragment>
  );
};

CardObsSmall.propTypes = {
  observationTitle: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  observationTimeDisplay: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  handleLike: PropTypes.func.isRequired,
  showLikePrompt: PropTypes.bool.isRequired,
};

export default CardObsSmall;
