import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './BurnhamsCornerSmall.style';

const BurnhamsCornerSmall = ({ title, author, descContent, imageSrcUrl }) => (
  <Fragment>
    <div className="bc">
      <div className="bc-left">
        <div className="bc-title">{title}</div>
        <div className="bc-author">Added BY {author}</div>
        <div className="bc-desc">{descContent}</div>
        <img src={imageSrcUrl} alt="Burnhams Corner" />
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

BurnhamsCornerSmall.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  descContent: PropTypes.string.isRequired,
  imageSrcUrl: PropTypes.string.isRequired,
};

export default BurnhamsCornerSmall;
