import React from 'react';
import PropTypes from 'prop-types';
import byUserTagStyle from './by-user-tag.style';

/**
  THEMES
  By default 'dark' is the default theme
  provide any of the following theme strings to control the style for your needs

  dark ( good for sitting on top of light colored things )
  light ( good for sitting on top of dark colored things )
*/

function ByUserTag({
  theme,
  photo,
  name,
  accountType,
  location,
  memberSince,
}) {
  const profilePhotoStyle = {
    backgroundImage: `url(${photo})`,
  };

  return (
    <div className="root">
      <div className="profile-photo" style={profilePhotoStyle} />

      <div className="profile-name">
        <h4 className="username">
          {name} <span className="account-level">{accountType}</span>
          <br />
          <span className={`user-details ${theme}`}>{location} Member since {memberSince}</span>
        </h4>
      </div>

      <style jsx>{byUserTagStyle}</style>
    </div>
  );
}

ByUserTag.defaultProps = {
  theme: 'dark',
};

ByUserTag.propTypes = {
  theme: PropTypes.string,
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  memberSince: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default ByUserTag;
