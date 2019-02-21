import { ProfileWrapper } from 'app/modules/profile/components/profile-wrapper';
import React, { Component } from 'react';

export class PublicProfile extends Component {
  componentWillMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { getPublicProfile, params } = this.props;
    const { customerUUID } = params;
    getPublicProfile(customerUUID);
  };

  render() {
    const { publicProfileData, params } = this.props;
    return (
      <div>
        {publicProfileData && (
          <ProfileWrapper
            privateProfileData={publicProfileData}
            params={params}
          />
        )}
      </div>
    );
  }
}
