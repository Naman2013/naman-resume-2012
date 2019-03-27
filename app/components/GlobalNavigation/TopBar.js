import React, { Fragment } from 'react';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import ConnectUser from 'app/redux/components/ConnectUser';
import AlertsIcon from 'app/redux/components/AlertsIcon';
import { shadows, seashell } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';
import MENU_INTERFACE from './Menus/MenuInterface';
import CenterBar from './CenterBar';
import Button from './Button';
import messages from './TopBar.messages';

function isActive(menuName, activeMenu) {
  return menuName === activeMenu;
}

const TopBar = ({ handleMenuClick, activeMenu, handleNotificationClick }) => {
  const mainIsActive = isActive(activeMenu, MENU_INTERFACE.MAIN.name);
  const telescopesIsActive = isActive(
    activeMenu,
    MENU_INTERFACE.TELESCOPES.name
  );
  const searchIsActive = isActive(activeMenu, MENU_INTERFACE.SEARCH.name);
  const alertsIsActive = isActive(activeMenu, MENU_INTERFACE.ALERTS.name);
  const userIsActive = isActive(activeMenu, MENU_INTERFACE.PROFILE.name);

  const home = () => browserHistory.push('/');
  const main = () => handleMenuClick(MENU_INTERFACE.MAIN.name);
  const telescope = () => handleMenuClick(MENU_INTERFACE.TELESCOPES.name);
  const search = () => handleMenuClick(MENU_INTERFACE.SEARCH.name);
  const alerts = () => handleNotificationClick(MENU_INTERFACE.ALERTS.name);
  const profile = () => handleMenuClick(MENU_INTERFACE.PROFILE.name);
  const help = () => handleMenuClick(MENU_INTERFACE.HELP.name);

  return (
    <Fragment>
      <ConnectUser
        render={user => (
          <div className="root">
            <div className="left-menu">
              <ul className="button-list">
                <li>
                  <Button handleClick={home} mod="no-border">
                    <i className="icon icon-logo_astronaut">
                      <i className="path1" />
                      <i className="path2" />
                      <i className="path3" />
                      <i className="path4" />
                      <i className="path5" />
                      <i className="path6" />
                    </i>
                  </Button>
                </li>
                <li>
                  <Button
                    isActive={mainIsActive}
                    handleClick={main}
                    mod="no-border"
                  >
                    <i
                      className={
                        mainIsActive ? 'icon icon-cross' : 'icon icon-bars'
                      }
                    />
                  </Button>
                </li>
                <li>
                  <Button
                    isActive={telescopesIsActive}
                    handleClick={telescope}
                    mod="no-border"
                  >
                    <i
                      className={
                        telescopesIsActive
                          ? 'icon icon-cross'
                          : 'icon icon-telescope_astronaut'
                      }
                    />
                  </Button>
                </li>
                <li>
                  <Button
                    isActive={searchIsActive}
                    handleClick={search}
                    mod="no-border"
                  >
                    <i
                      className={
                        searchIsActive ? 'icon icon-cross' : 'icon icon-search'
                      }
                    />
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
                    mod="no-border"
                    isActive={isActive(activeMenu, MENU_INTERFACE.HELP.name)}
                    handleClick={help}>
                    ?
                  </Button>
                </li> */}
                {user.isAuthorized ? (
                  <li>
                    <Button
                      mod="no-border"
                      isActive={alertsIsActive}
                      handleClick={alerts}
                    >
                      <AlertsIcon isActive={alertsIsActive} />
                    </Button>
                  </li>
                ) : null}
                <li>
                  <Button
                    mod="no-border"
                    isActive={userIsActive}
                    handleClick={profile}
                    theme={
                      user.isAuthorized
                        ? {}
                        : { width: 'auto', padding: '0 20px' }
                    }
                  >
                    {user.isAuthorized && (
                      <Fragment>
                        {userIsActive ? (
                          <i className="icon icon-cross" />
                        ) : (
                          <i className="icon icon-user_astronaut">
                            <i className="path1" />
                            <i className="path2" />
                            <i className="path3" />
                          </i>
                        )}
                      </Fragment>
                    )}

                    {!user.isAuthorized && (
                      <Fragment>
                        {userIsActive ? (
                          <i className="icon icon-cross" />
                        ) : (
                          <div className="flex-row justify-content-center">
                            <span className="text">
                              <FormattedMessage {...messages.SignIn} />
                            </span>
                            <i className="icon icon-user_astronaut">
                              <i className="path1" />
                              <i className="path2" />
                              <i className="path3" />
                            </i>
                          </div>
                        )}
                      </Fragment>
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
                  height: 60px;
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

                .button-list.icon {
                  font-size: 24px;
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

                .icon {
                  font-size: 18px;
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
