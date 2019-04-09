import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import style from './CardObservationsLarge.style';
import messages from './CardObsLarge.messages';

const CardObsLarge = ({
  title,
  subTitle,
  description,
  imageUrl,
  linkUrl,
  likesCount,
  commentsCount,
  observationTimeDisplay,
  intl,
}) => (
  <Fragment>
    <div className="card-obs-wrapper">
      <div className="card-obs">
        {title ? (
          <Fragment>
            <div className="top">
              <div className="info">
                <div className="main-info">
                  <div className="title">{title}</div>
                  <div className="author">{subTitle}</div>
                  <div className="i-text-box">{description}</div>
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
                  <img src={imageUrl} alt="Observation" />
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="buttons">
                <div className="button">
                  <img
                    className="icon"
                    src="https://vega.slooh.com/assets/v4/common/heart.svg"
                    alt="heart"
                  />
                  {!likesCount ? '0' : likesCount}
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

CardObsLarge.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  observationTimeDisplay: PropTypes.shape({}).isRequired,
};

export default injectIntl(CardObsLarge);
