import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import PrimaryButton from './buttons/PrimaryButton';
import Logout from 'redux/components/Logout';
import MenuTitleBar from './MenuTitleBar';
import MenuList from './MenuList';


import {
  userAstronaut,
  horizontalArrowRightAstronaut
} from 'styles/variables/iconURLs';
const getIconStyle = (url) => ({
  backgroundImage: `url(${url})`,
});

const LoggedIn = ({ displayName, avatarURL, menuItems }) => (
  <div className="root">
    <MenuTitleBar
      title=""
    >
      <div className="nav-icon avatar" style={getIconStyle(avatarURL || userAstronaut)} />
      <div className="username-container">
        <div className="username" dangerouslySetInnerHTML={{ __html: displayName }} />
        <div className="nav-icon" style={getIconStyle(horizontalArrowRightAstronaut)} />
      </div>
    </MenuTitleBar>
    <MenuList items={menuItems} />
    <Logout
      render={() => <PrimaryButton text="Log Out" anchor="#" />}
    />
    <style jsx>{`
      .root {
        width: 100%;
      }

      .username-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 15px;
        margin-bottom: 15px;
      }
      .nav-icon {
        height: 15px;
        width: 15px;
        background-position: center;
        background-repeat: no-repeat;

      }
      .avatar {
        margin: 15px;
        height: 25px;
        width: 25px;
        background-size: cover;
        border-radius: 100%;
      }
    `}</style>
  </div>
);

LoggedIn.propTypes = {
  displayName: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    displayName: PropTypes.string,
  }),
  menuLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  })),
};

LoggedIn.defaultProps = {

}

export default LoggedIn;
