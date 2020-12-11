import React from 'react';
import PropTypes from 'prop-types';
import Login from './partials/LogIn';
import LoggedIn from './partials/LoggedIn';
import PROFILE_CONFIGURATION from './profileConfiguration';

const Profile = ({ user, userMenu, mainMenu }) => {
  return (
    <div>
      {user.isAuthorized && (
        <LoggedIn
          {...user}
          {...userMenu.userInfo}
          menuItems={PROFILE_CONFIGURATION(userMenu.userLinks)}
        />
      )}

      {!user.isAuthorized && mainMenu && <Login loginMenuLinks={mainMenu.loginMenuLinks} avatarURL={user.avatarURL} />}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool.isRequired,
    apiError: PropTypes.bool,
    fname: PropTypes.string,
  }),
  userMenu: PropTypes.shape({
    userInfo: PropTypes.shape({
      displayName: PropTypes.string,
    }),
    userLinks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
      })
    ),
  }),
};

Profile.defaultProps = {
  user: {
    isAuthorized: false,
    apiError: false,
    fname: 'Guest',
  },
  userMenu: {
    userInfo: {},
    userLinks: [],
  },
};

export default Profile;
