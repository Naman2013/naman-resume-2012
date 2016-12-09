import React, { Component, PropTypes } from 'react';
import style from './by-user-tag.scss';

/**
  THEMES
  By default 'dark' is the default theme
  provide any of the following theme strings to control the style for your needs

  dark ( good for sitting on top of light colored things )
  light ( good for sitting on top of dark colored things )
*/

class ByUserTag extends Component {

  render() {
    const {
      theme,
      photo,
      name,
      accountType,
      location,
      memberSince } = this.props;

    return(
      <div className="slooh-by-user-tag">
        <div className="profile-photo">
          <img height="45" src={photo} />
        </div>

        <div className="profile-name">
          <h4 className="username">
            {name} <span className="account-level">{accountType}</span>
            <br />
            <span className={`user-details ${theme}`}>{location} Member since {memberSince}</span>
          </h4>
        </div>
      </div>
    );
  }
}

ByUserTag.defaultProps = {
  theme: 'dark',
};

ByUserTag.propTypes = {
  theme: PropTypes.string,
  photo: PropTypes.string,
  name: PropTypes.string,
  accountType: PropTypes.string,
  memberSince: PropTypes.string,
  location: PropTypes.string,
};

export default ByUserTag;
