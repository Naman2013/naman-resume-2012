import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './CardObservationsSmall.style';

const CardObsSmall = ({ title, author, descContent, imageSrcUrl }) => (
  <Fragment>
    <div className="card-obs">
      <div className="obs-left">
        <div className="card-obs-title">{title}</div>
        <div className="card-obs-author">BY {author}</div>
        <div className="card-obs-desc">{descContent}</div>
        <img src={imageSrcUrl} alt="Observation" />
      </div>
      <div className="card-bottom">
        <ul>
          <li><img src="https://vega.slooh.com/assets/v4/common/heart.svg" alt="" /> 22</li>
          <li><img src="https://vega.slooh.com/assets/v4/common/comment.svg" alt="" /> 04</li>
          <li>DETAILS <img src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg" alt="" /></li>
        </ul>
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

CardObsSmall.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  descContent: PropTypes.string.isRequired,
  imageSrcUrl: PropTypes.string.isRequired,
};

export default CardObsSmall;
