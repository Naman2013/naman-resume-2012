import React from 'react';
import PropTypes from 'prop-types';
import Login from 'containers/Login';
import LoggedIn from './partials/LoggedIn';

const propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool.isRequired,
    apiError: PropTypes.bool,
  }),
};

const defaultProps = {
  user: {
    isAuthorized: false,
    apiError: false,
  },
};

const Profile = ({ user }) => {
  return (
    <div>
      {
        user.isAuthorized &&
          <LoggedIn />
      }

      {
        !user.isAuthorized &&
          <Login />
      }
    </div>
  );
};

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default Profile;
