import React, { cloneElement, Component, Fragment } from 'react';

class Profile extends Component {
  componentDidMount = () => {
    const { params, getPrivateProfile, getPublicProfile } = this.props;
    if (params.private) getPrivateProfile();
    if (params.public) getPublicProfile(params.customerUUID);
  };

  render() {
    const { params, children } = this.props;
    return <Fragment>{cloneElement(children, { params })}</Fragment>;
  }
}

export default Profile;
