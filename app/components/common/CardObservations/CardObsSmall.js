import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import { injectIntl } from 'react-intl';
import messages from 'app/components/common/CardObservations/CardObsLarge.messages';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import style from './CardObservationsSmall.style';

const CardObsSmall = props => {
  const {
    title,
    subTitle,
    description,
    imageUrl,
    linkUrl,
    likesCount,
    commentsCount,
    intl,
    handleLike,
    customerImageId,
    likePrompt,
    showLikePrompt,
  } = props;
  const [isOpen, openModal] = useState(false);
  const [likesNumber, changeLikesNumber] = useState(likesCount);
  const onLikeClick = () => {
    if (!showLikePrompt) {
      handleLike(customerImageId);
      changeLikesNumber(likesNumber + 1);
    }
  };
  return (
    <Fragment>
      <div className="card-obs">
        <div className="obs-left">
          <div className="card-obs-title">{title}</div>
          <div className="card-obs-author">{subTitle}</div>
          <div className="card-obs-desc">{description}</div>
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
      </div>
      <style jsx>{style}</style>
    </Fragment>
  );
};

CardObsSmall.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  observationTimeDisplay: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  handleLike: PropTypes.func.isRequired,
  customerImageId: PropTypes.number.isRequired,
  showLikePrompt: PropTypes.bool.isRequired,
};

export default injectIntl(CardObsSmall);
