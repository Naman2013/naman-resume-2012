import React from 'react';
import Profile from './Profile';
import ConnectUser from 'redux/components/ConnectUser';

const ProfileRedux = () => (
  <ConnectUser
    render={user => (<Profile user={user} />)}
  />
);

export default ProfileRedux;
