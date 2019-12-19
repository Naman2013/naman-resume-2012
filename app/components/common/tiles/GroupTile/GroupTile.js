import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import style from './Group.style';

const GroupTile = ({
  iconURL,
  title,
  accessDescription,
  theme,
  linkUrl,
  readOnly,
}) => (
  <div className="root" style={theme}>
    <div
      className="card-groups-img"
      style={{ backgroundImage: `url(${iconURL})` }}
    />
    {readOnly ? (
      <a>
        <div className="card-title">{title}</div>
      </a>
    ) : (
      <Link to={linkUrl} href={linkUrl}>
        <div className="card-title">{title}</div>
      </Link>
    )}
    <span
      className="card-desc"
      dangerouslySetInnerHTML={{ __html: accessDescription }}
    />
    <style jsx>{style}</style>
  </div>
);

GroupTile.propTypes = {
  iconURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  accessDescription: PropTypes.string.isRequired,
  theme: PropTypes.shape({}),
  linkUrl: PropTypes.string,
};

GroupTile.defaultProps = {
  iconURL: '',
  theme: {},
  linkUrl: '',
};

export default GroupTile;
