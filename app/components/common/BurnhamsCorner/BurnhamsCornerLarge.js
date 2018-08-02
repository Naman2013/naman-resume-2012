import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './BurnhamsCornerLarge.style';

const BurnhamsCornerLarge = ({ title, author, descContent, imageSrcUrl, capturedDate, likesCount, commentsCount, detailsLinkUrl }) => (
  <Fragment>
    <div className="bc">
      <div className="bc-img-right"><img src={imageSrcUrl} alt="Burnhams Corner" /></div>
      <div className="bc-left">
        <div className="bc-title">{title}</div>
        <div className="bc-author">Added BY {author}</div>
        <div className="bc-desc">{descContent}</div>
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

BurnhamsCornerLarge.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  descContent: PropTypes.string.isRequired,
  imageSrcUrl: PropTypes.string.isRequired,
};

export default BurnhamsCornerLarge;
