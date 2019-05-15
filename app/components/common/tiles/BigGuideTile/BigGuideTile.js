import React from 'react';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import style from './BigGuide.style';

const GuideTile = ({ title, heading, theme, linkUrl }) => (
  <div key={uniqueId()} className="card-guides" theme={theme}>
    <div className="card-guides-head">{heading}</div>
    <Link to={linkUrl} href={linkUrl}>
      <div className="card-guides-title">{title}</div>
    </Link>
    <style jsx>{style}</style>
  </div>
);

GuideTile.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  theme: PropTypes.shape({}),
  linkUrl: PropTypes.string,
};

GuideTile.defaultProps = {
  theme: {},
  linkUrl: '',
};

export default GuideTile;
