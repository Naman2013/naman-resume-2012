import React from 'react';
import PropTypes from 'prop-types';
import Login from 'containers/Login';
import LoggedIn from './partials/LoggedIn';

const Profile = ({ user }) => {
  return (
    <div>
      {
        user.isAuthorized &&
          <LoggedIn userName={user.fname} />
      }

      {
        !user.isAuthorized &&
          <Login />
      }
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool.isRequired,
    apiError: PropTypes.bool,
    fname: PropTypes.string,
  }),
};

Profile.defaultProps = {
  user: {
    isAuthorized: false,
    apiError: false,
    fname: 'Guest',
  },
};

export default Profile;
