import React, { Component, PropTypes } from 'react';
import style from './by-user-tag.scss';

class ByUserTag extends Component {
  render() {
    return(
      <div className="slooh-by-user-tag">
        <div className="profile-photo">
          <img src={user.photo} />
        </div>

        <div className="profile-name">
          <h4 className="username">
            {user.name} <span className="account-level">{user.accountType}</span>
            <br />
            <span className="user-details">{user.city}, {user.state}, {user.country}. Member since {user.memberSince}</span>
          </h4>
        </div>
      </div>
    );
  }
}

ByUserTag.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
  accountType: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
  memberSince: PropTypes.string,
};

export default ByUserTag;
