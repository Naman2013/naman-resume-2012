import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './CardObservationsLarge.style';

const CardObsLarge = ({ title, author, descContent, imageSrcUrl, capturedDate }) => (
  <Fragment>
    <div className="card-obs">
      <div className="media-card-img-right"><img src={imageSrcUrl} alt="Observation" /></div>
      <div className="obs-left">
        <div className="card-obs-title">{title}</div>
        <div className="card-obs-author">BY {author}</div>
        <div className="card-obs-desc">{descContent}</div>
      </div>
      <div className="card-bottom">
        <ul>
          <li><img src="https://vega.slooh.com/assets/v4/common/heart.svg" /> 22</li>
          <li><img src="https://vega.slooh.com/assets/v4/common/comment.svg" /> 04</li>
          <li>DETAILS <img src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg" /></li>
          <li>Captured: {capturedDate}</li>
        </ul>
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

CardObsLarge.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  descContent: PropTypes.string.isRequired,
  imageSrcUrl: PropTypes.string.isRequired,
  capturedDate: PropTypes.string.isRequired,
};

export default CardObsLarge;
