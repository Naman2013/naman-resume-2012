import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import messages from 'app/components/common/CardObservations/CardObsLarge.messages';
import style from './CardObservationsSmall.style';

const CardObsSmall = ({
  title,
  subTitle,
  description,
  imageUrl,
  hasLink,
  linkLabel,
  linkUrl,
  likesCount,
  commentsCount,
  observationTimeDisplay,
  intl,
}) => (
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
              <img src={imageUrl} alt="Observation" />
            </div>
          </div>
        </div>
      </div>
      <div className="card-bottom">
        <div className="button">
          <img
            className="icon"
            src="https://vega.slooh.com/assets/v4/common/heart.svg"
            alt="heart"
          />
          {likesCount}
        </div>
        <div className="button">
          <img
            className="icon"
            src="https://vega.slooh.com/assets/v4/common/comment.svg"
            alt="comment"
          />
          {commentsCount}
        </div>
        {hasLink && (
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

CardObsSmall.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  hasLink: PropTypes.bool.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default injectIntl(CardObsSmall);
