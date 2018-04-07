import React from 'react';
import PropTypes from 'prop-types';
import Login from 'containers/Login';

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
    <div>`
      <Login />
      {
        user.isAuthorized &&
          <Login />
      }

      {
        !user.isAuthorized &&
          <Logout />
      }
    </div>
  );
};

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default Profile;
