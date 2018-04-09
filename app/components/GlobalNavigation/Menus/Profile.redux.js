import React from 'react';
import Profile from './Profile';
import ConnectUser from 'redux/components/ConnectUser';

const ProfileRedux = props => (
  <ConnectUser
    render={user => (<Profile user={user} {...props} />)}
  />
);

export default ProfileRedux;
