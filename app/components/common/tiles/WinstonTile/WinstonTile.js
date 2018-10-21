import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './WinstonTile.style';

const WinstonTile = ({ title, linkText, linkUrl, theme }) => (
  <div className="root" style={theme}>
    <div className="title-text" dangerouslySetInnerHTML={{ __html: title }} />
    <Link to={linkUrl}><span className="link-text" dangerouslySetInnerHTML={{ __html: linkText }} /></Link>
    <style jsx>{style}</style>
  </div>
);

WinstonTile.defaultProps = {
  title: '',
  theme: {},
};

WinstonTile.propTypes = {
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  linkText: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default WinstonTile;
