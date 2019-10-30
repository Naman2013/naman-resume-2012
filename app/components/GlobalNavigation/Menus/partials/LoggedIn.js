import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import Logout from 'redux/components/Logout';
import {
  userAstronaut,
  horizontalArrowRightAstronaut,
} from 'app/styles/variables/iconURLs';
import PrimaryButton from './buttons/PrimaryButton';
import MenuTitleBar from './MenuTitleBar';
import MenuList from './MenuList';

const getIconStyle = url => ({
  backgroundImage: `url(${url})`,
});

const LoggedIn = ({ displayName, avatarURL, menuItems }) => {
  const { t } = useTranslation();
  return (
    <div className="root">
      <Link to="/profile/private">
        <MenuTitleBar title="">
          <div className="nav-icon avatar-container">
            <div
              className="nav-icon avatar"
              style={getIconStyle(avatarURL || userAstronaut)}
            />
          </div>
          <div className="username-container">
            <div
              className="username"
              dangerouslySetInnerHTML={{ __html: displayName }}
            />
            <div
              className="nav-icon"
              style={getIconStyle(horizontalArrowRightAstronaut)}
            />
          </div>
        </MenuTitleBar>
      </Link>
      <MenuList items={menuItems} />
      <Logout
        render={() => (
          <PrimaryButton
            indent={false}
            isExternalLink={false}
            text={t('Dashboard.LogOut')}
            anchor="#"
          />
        )}
      />
      <style jsx>
        {`
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
          .avatar-container {
            margin: 15px;
            height: 50px;
            width: 50px;
            padding: 4px;
            background-image: url('https://vega.slooh.com/assets/v4/common/Level_Image_Container_Blue_Normal.png');
            background-size: cover;
            border-radius: 100%;
          }
          .avatar {
            margin-top: 4px;
            height: 100%;
            width: 100%;
            background-size: cover;
            border-radius: 100%;
          }
        `}
      </style>
    </div>
  );
};

LoggedIn.propTypes = {
  displayName: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    displayName: PropTypes.string,
  }),
  menuLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    })
  ),
};

LoggedIn.defaultProps = {};

export default LoggedIn;
