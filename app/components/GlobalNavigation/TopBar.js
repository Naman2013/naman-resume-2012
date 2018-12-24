import React, { Fragment } from 'react';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Button from './Button';
import CenterBar from './CenterBar';
import MENU_INTERFACE from './Menus/MenuInterface';
import Notifications from './Menus/Notifications';
import ConnectUser from 'redux/components/ConnectUser';
import AlertsIcon from 'redux/components/AlertsIcon';
import {
  sloohLogoAstronaut,
  threeLinesAstronaut,
  telescopeAstronaut,
  searchAstronaut,
  userAstronaut,
  closeWhite,
} from 'styles/variables/iconURLs';
import { shadows, seashell } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import messages from './TopBar.messages';

function isActive(menuName, activeMenu) {
  return menuName === activeMenu;
}

const getIconStyle = url => ({
  backgroundImage: `url(${url})`,
});

const TopBar = ({ handleMenuClick, activeMenu, handleNotificationClick }) => {
  const mainIsActive = isActive(activeMenu, MENU_INTERFACE.MAIN.name);
  const telescopesIsActive = isActive(activeMenu, MENU_INTERFACE.TELESCOPES.name);
  const searchIsActive = isActive(activeMenu, MENU_INTERFACE.SEARCH.name);
  const alertsIsActive = isActive(activeMenu, MENU_INTERFACE.ALERTS.name);
  const userIsActive = isActive(activeMenu, MENU_INTERFACE.PROFILE.name);
  return (
    <Fragment>
      <ConnectUser
        render={user => (
          <div className="root">
            <div className="left-menu">
              <ul className="button-list">
                <li>
                  <Button
                    handleClick={() => {
                      browserHistory.push('/');
                    }}
                  >
                    <div className="nav-icon" style={getIconStyle(sloohLogoAstronaut)} />
                  </Button>
                </li>
                <li>
                  <Button
                    isActive={mainIsActive}
                    handleClick={() => {
                      handleMenuClick(MENU_INTERFACE.MAIN.name);
                    }}
                  >
                    {mainIsActive ? (
                      <div className="nav-icon fa fa-close" />
                    ) : (
                      <div className="nav-icon" style={getIconStyle(threeLinesAstronaut)} />
                    )}
                  </Button>
                </li>
                <li>
                  <Button
                    isActive={telescopesIsActive}
                    handleClick={() => {
                      handleMenuClick(MENU_INTERFACE.TELESCOPES.name);
                    }}
                  >
                    {telescopesIsActive ? (
                      <div className="nav-icon fa fa-close" />
                    ) : (
                      <div className="nav-icon" style={getIconStyle(telescopeAstronaut)} />
                    )}
                  </Button>
                </li>
                <li>
                  <Button
                    isActive={searchIsActive}
                    handleClick={() => {
                      handleMenuClick(MENU_INTERFACE.SEARCH.name);
                    }}
                  >
                    {searchIsActive ? (
                      <div className="nav-icon fa fa-close" />
                    ) : (
                      <div className="nav-icon" style={getIconStyle(searchAstronaut)} />
                    )}
                  </Button>
                </li>
              </ul>
            </div>

            <div className="center-menu">
              <CenterBar />
            </div>

            <div className="right-menu">
              <ul className="button-list">
                {/* <li>
                  <Button
                    isActive={isActive(activeMenu, MENU_INTERFACE.HELP.name)}
                    handleClick={() => { handleMenuClick(MENU_INTERFACE.HELP.name); }}
                  >
                    <span className="fa fa-question-circle" />
                  </Button>
                </li> */}
                {user.isAuthorized ? (
                  <li>
                    <Button
                      isActive={alertsIsActive}
                      handleClick={() => {
                        handleNotificationClick(MENU_INTERFACE.ALERTS.name);
                      }}
                    >
                      <AlertsIcon isActive={alertsIsActive} />
                    </Button>
                  </li>
                ) : null}
                <li>
                  <Button
                    isActive={userIsActive}
                    handleClick={() => {
                      handleMenuClick(MENU_INTERFACE.PROFILE.name);
                    }}
                    theme={user.isAuthorized ? {} : { width: 'auto', padding: '0 20px' }}
                  >
                    {user.isAuthorized && (
                      <div>
                        {userIsActive ? (
                          <div className="nav-icon fa fa-close" />
                        ) : (
                          <div className="nav-icon" style={getIconStyle(userAstronaut)} />
                        )}
                      </div>
                    )}
                    {!user.isAuthorized && (
                      <div>
                        {userIsActive ? (
                          <div className="nav-icon fa fa-close" />
                        ) : (
                          <div>
                            <span className="text">
                              <FormattedMessage {...messages.SignIn} />
                            </span>
                            <div
                              className="nav-icon text-icon"
                              style={getIconStyle(userAstronaut)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </Button>
                </li>
              </ul>
            </div>

            <style jsx>
              {`
                .root {
                  position: fixed;
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
                  background: ${seashell};
                  border-bottom: 2px solid ${shadows};
                }

                .center-menu {
                  flex-grow: 1;
                }

                .button-list {
                  display: flex;
                  list-style-type: none;
                  margin: 0;
                  padding: 0;
                }
                .nav-icon {
                  height: 15px;
                  width: 15px;
                  background-size: cover;
                  background-position: center;
                  background-repeat: no-repeat;
                  margin: 0 auto;
                }

                .text {
                  display: inline-block;
                  font-weight: bold;
                  font-size: 11px;
                  font-family: ${primaryFont};
                  text-transform: uppercase;
                  vertical-align: middle;
                  margin-right: 10px;
                }

                .text-icon {
                  vertical-align: middle;
                  display: inline-block;
                }
              `}
            </style>
          </div>
        )}
      />
    </Fragment>
  );
};

export default TopBar;
