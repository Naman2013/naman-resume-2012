import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ByUserTag from '../../../common/by-user-tag/by-user-tag';
import Logo from '../../../common/logo/logo';

const UserDetailsContainer = ({ children }) => (
  <div className="col-xs-4 reserved-by-user-content">
    <h3 className="title">Reserved by:</h3>
    {children}
  </div>
);

class UserDetails extends Component {
  render() {
    const {
      showUserDetails,
      showSloohUser,
      ownerAvatarURL,
      ownerDisplayName,
      ownerMembershipType,
      ownerLocation,
      ownerMemberSince,
    } = this.props;

    if (showSloohUser) {
      return (
        <UserDetailsContainer>
          <Logo />
        </UserDetailsContainer>
      );
    }

    if (showUserDetails) {
      return (
        <UserDetailsContainer>
          <ByUserTag
            theme="light"
            photo={ownerAvatarURL}
            name={ownerDisplayName}
            accountType={ownerMembershipType}
            location={ownerLocation}
            memberSince={ownerMemberSince}
          />
        </UserDetailsContainer>
      );
    }

    return null;
  }
}

const { string, number, bool } = PropTypes;
UserDetails.propTypes = {
  showUserDetails: bool.isRequired,
  showSloohUser: bool.isRequired,
  ownerAvatarURL: string.isRequired,
  ownerDisplayName: string.isRequired,
  ownerMembershipType: string.isRequired,
  ownerLocation: string.isRequired,
  ownerMemberSince: string.isRequired,
};

export default UserDetails;
