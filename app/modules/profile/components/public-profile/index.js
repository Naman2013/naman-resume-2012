/* eslint-disable */
import {ProfileWrapper} from 'app/modules/profile/components/profile-wrapper';
import React, {Component} from 'react';

export class PublicProfile extends Component {

  fetchData = () => {
    const {getPublicProfile} = this.props;
    const {customerUUID} = this.props.params;
    getPublicProfile(customerUUID);
  };

  componentWillMount = () => {
    this.fetchData();
  };

  render() {
    const {publicProfileData, params} = this.props;
    return <div>
      {publicProfileData && <ProfileWrapper
        privateProfileData={publicProfileData}
        params={params}
      />}
    </div>;
  }
}
