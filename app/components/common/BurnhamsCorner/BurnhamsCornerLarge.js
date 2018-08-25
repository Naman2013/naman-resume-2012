import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './BurnhamsCornerLarge.style';

const BurnhamsCornerLarge = ({
  objectTitle,
  content,
  imageURL,
  linkLabel,
  linkURL,
}) => (
  <Fragment>
    <div className="bc">
      <div className="bc-img-right">
        <img src={imageURL} alt="Burnhams Corner" />
      </div>
      <div className="bc-left">
        <div className="bc-title">{objectTitle}</div>
        <div className="bc-author">Burnham&#39;s Corner</div>
        <div className="bc-desc">{content}</div>
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

BurnhamsCornerLarge.propTypes = {
  objectTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
};

export default BurnhamsCornerLarge;
