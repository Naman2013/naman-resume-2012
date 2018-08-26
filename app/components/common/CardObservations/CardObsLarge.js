import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './CardObservationsLarge.style';

const CardObsLarge = ({
  title,
  subTitle,
  description,
  imageUrl,
  hasLink,
  linkLabel,
  linkUrl,
}) => (
  <Fragment>
    <div className="card-obs">
      <div className="media-card-img-right">
        <img src={imageUrl} alt="Observation" />
      </div>
      <div className="obs-left">
        <div className="card-obs-title">{title}</div>
        <div className="card-obs-author">{subTitle}</div>
        <div className="card-obs-desc">{description}</div>
      </div>
      <div className="card-bottom">
        {
          hasLink &&
            <ul>
              <li>
                <a href={linkUrl}>
                  {linkLabel} <img src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg" alt="" />
                </a>
              </li>
            </ul>
        }
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
  hasLink: PropTypes.bool.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default CardObsLarge;
