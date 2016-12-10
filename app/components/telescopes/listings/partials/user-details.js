import React, { Component, PropTypes } from 'react';
import ByUserTag from '../../../common/by-user-tag/by-user-tag';

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
      ownerFirstName,
      ownerMembershipType,
      ownerLocation,
      ownerMemberSince } = this.props;

    if(showUserDetails) {
      if(showSloohUser) {
        return(
          <UserDetailsContainer>
            <Logo />
          </UserDetailsContainer>
        );
      }

      return(
        <UserDetailsContainer>
          <ByUserTag
            theme="light"
            photo={ownerAvatarURL}
            name={ownerFirstName}
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
  ownerFirstName: string.isRequired,
  ownerMembershipType: string.isRequired,
  ownerLocation: string.isRequired,
  ownerMemberSince: string.isRequired,
};

export default UserDetails;
