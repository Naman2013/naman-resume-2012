import React from 'react';
import PropTypes from 'prop-types';
import Logout from 'redux/components/Logout';

const LoggedIn = ({ userName }) => (
  <div>
    <h1>Welcome, {userName}</h1>
    <Logout />
  </div>
);

LoggedIn.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default LoggedIn;
