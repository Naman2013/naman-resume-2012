import { Livecast } from 'app/components/GlobalNavigation/Menus/livecast';
import { LiveActivityLoadable } from 'app/modules/live-activity';
import React, { Fragment } from 'react';
import {useTranslation} from 'react-i18next';
import { browserHistory, Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import ConnectUser from 'app/redux/components/ConnectUser';
import AlertsIcon from 'app/redux/components/AlertsIcon';
import { shadows, seashell } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';
import MENU_INTERFACE from './Menus/MenuInterface';
import CenterBar from './CenterBar';
import Button from './Button';
import messages from './TopBar.messages';

const SEARCH_LABEL = 'SEARCH';

function isActive(menuName, activeMenu) {
  if (menuName === SEARCH_LABEL) {
    document.body.classList.add('hide-overflow');
    document.documentElement.classList.add('hide-overflow');
  } else {
    document.body.classList.remove('hide-overflow');
    document.documentElement.classList.remove('hide-overflow');
  }
  return menuName === activeMenu;
}

const TopBar = ({
  handleMenuClick,
  activeMenu,
  handleNotificationClick,
  closeAllMenus,
  totalViewersCount,
  allLivecastsInProgress,
  activityFeedMessages,
  pubnubConnection,
  pubnubActivityFeedChannelName,
  userDisplayName,
  isChatEnabled,
}) => {
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
  const { t } = useTranslation();

  return (
    <Fragment>
      <ConnectUser
        render={user => (
          <div className="root">
            <div className="left-menu">
              <ul className="button-list">
                <li>
                  <Button handleClick={home} mod="no-border">
                    <i className="top-nav-icon i-logo_astronaut" />
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
                        mainIsActive
                          ? 'top-nav-icon icon-close'
                          : 'top-nav-icon icon-hamburger'
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
                          ? 'top-nav-icon icon-close'
                          : 'top-nav-icon icon-telescope'
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
                        searchIsActive
                          ? 'top-nav-icon icon-close'
                          : 'top-nav-icon icon-search'
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
                  <>
                    <li>
                      <LiveActivityLoadable
                        totalViewersCount={totalViewersCount}
                        activityFeedMessages={activityFeedMessages}
                        pubnubConnection={pubnubConnection}
                        pubnubActivityFeedChannelName={
                          pubnubActivityFeedChannelName
                        }
                        userDisplayName={userDisplayName}
                        isChatEnabled={isChatEnabled}
                        onClick={closeAllMenus}
                      />
                    </li>
                    <li>
                      <Livecast
                        user={user}
                        allLivecastsInProgress={allLivecastsInProgress}
                        onClick={closeAllMenus}
                      />
                    </li>
                    <li>
                      <Button
                        mod="no-border"
                        isActive={alertsIsActive}
                        handleClick={alerts}
                      >
                        <AlertsIcon isActive={alertsIsActive} />
                      </Button>
                    </li>
                  </>
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
                          <i className="top-nav-icon icon-close" />
                        ) : (
                          <i className="top-nav-icon i-user-astronaut" />
                        )}
                      </Fragment>
                    )}

                    {!user.isAuthorized && (
                      <Fragment>
                        {userIsActive ? (
                          <i className="top-nav-icon icon-close" />
                        ) : (
                          <div className="flex-row justify-content-center">
                            <div style={{ marginTop: '-3px' }}>
                              <Link
                                className="button text"
                                to="/about/memberships"
                              >
                                <span
                                  style={{ color: '#415671' }}
                                  className="text"
                                >
                                  Join now for FREE!
                                </span>
                              </Link>
                              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            </div>
                            <span className="text">{t('.SignIn')}</span>
                            <i className="top-nav-icon i-user-astronaut" />
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

                .top-nav-icon {
                  font-size: 20px;
                  line-height: 20px;
                  height: 20px;
                  display: inline-block;
                }

                .i-logo_astronaut,
                .i-user-astronaut {
                  /* todo make global configs for icons */
                  width: 20px;
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
