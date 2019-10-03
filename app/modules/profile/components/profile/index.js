import React, { cloneElement, Component } from 'react';

class Profile extends Component {
  componentDidMount = () => {
    this.getProfileData();
  };

  componentDidUpdate = () => {
    this.getProfileData();
  };

  getProfileData = () => {
    const { params, getPrivateProfile, getPublicProfile } = this.props;
    if (params.private) getPrivateProfile();
    if (params.public) getPublicProfile(params.customerUUID);
  };

  render() {
    const { params, children } = this.props;
    return cloneElement(children, { params });
  }
}

export default Profile;
