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

  const {
    theme,
    photo,
    name,
    accountType,
    city,
    state,
    country,
    memberSince } = this.props;

  render() {
    return(
      <div className="slooh-by-user-tag">
        <div className="profile-photo">
          <img src={photo} />
        </div>

        <div className="profile-name">
          <h4 className="username">
            {name} <span className="account-level">{accountType}</span>
            <br />
            <span className={`user-details ${theme}`}>{city}, {state}, {country}. Member since {memberSince}</span>
          </h4>
        </div>
      </div>
    );
  }
}

ByUserTag.defaultProps = {
  version: 'dark',
};

ByUserTag.propTypes = {
  theme: PropTypes.string,
  photo: PropTypes.string,
  name: PropTypes.string,
  accountType: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
  memberSince: PropTypes.string,
};

export default ByUserTag;
