import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Logout from 'redux/components/Logout';

const LoggedIn = ({ userName }) => (
  <div>
    <h1>Welcome, {userName}</h1>
    <div><Link to="/profile/private">My Profile</Link></div>
    <Logout />
  </div>
);

LoggedIn.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default LoggedIn;
