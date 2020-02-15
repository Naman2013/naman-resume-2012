import { Livecast } from 'app/components/GlobalNavigation/Menus/livecast';
import { LiveActivityLoadable } from 'app/modules/live-activity';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { browserHistory, Link } from 'react-router';
import ConnectUser from 'app/redux/components/ConnectUser';
import AlertsIcon from 'app/redux/components/AlertsIcon';
import { shadows, seashell, romance, astronaut } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';

import {
  screenMobile,
  screenSmallMobile,
} from 'app/styles/variables/breakpoints';
import MENU_INTERFACE from './Menus/MenuInterface';
import CenterBar from './CenterBar';
import Button from './Button';

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
  scrollActivityFeedToBottom,
  subscribeToPubnubActivityFeedChannel,
}) => {
  const mainIsActive = isActive(activeMenu, MENU_INTERFACE.MAIN.name);
  const telescopesIsActive = isActive(
    activeMenu,
    MENU_INTERFACE.TELESCOPES.name
  );
  const searchIsActive = isActive(activeMenu, MENU_INTERFACE.SEARCH.name);
  const alertsIsActive = isActive(activeMenu, MENU_INTERFACE.ALERTS.name);
  const userIsActive = isActive(activeMenu, MENU_INTERFACE.PROFILE.name);

  const main = () => handleMenuClick(MENU_INTERFACE.MAIN.name);
  const telescope = () => handleMenuClick(MENU_INTERFACE.TELESCOPES.name);
  const search = () => handleMenuClick(MENU_INTERFACE.SEARCH.name);
  const alerts = () => handleNotificationClick(MENU_INTERFACE.ALERTS.name);
  const profile = () => handleMenuClick(MENU_INTERFACE.PROFILE.name);
  const { t } = useTranslation();
  // const help = () => handleMenuClick(MENU_INTERFACE.HELP.name);

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
                      if (user.isAuthorized) {
                        browserHistory.push('/');
                      } else {
                        browserHistory.push('/guestDashboard');
                      }
                    }}
                    mod="no-border"
                  >
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

            {/*<div className="center-menu">*/}
            {/*  <CenterBar />*/}
            {/*</div>*/}

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
                        scrollActivityFeedToBottom={scrollActivityFeedToBottom}
                        subscribeToPubnubActivityFeedChannel={
                          subscribeToPubnubActivityFeedChannel
                        }
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
                        : { width: 'auto', padding: '0 5px 0 0' }
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
                          <div className="flex-row justify-content-center align-items-center">
                            <Link className="button text" to="/about/about-slooh-education">
                              <button className="btn foreducators-button">
                                <div>
                                  <span>Slooh Education</span>
				                          {/* <span>Education</span> */}
                                </div>
                              </button>
                            </Link>
			    {/* <div style={{marginRight: "10px"}}/> */}
                            <Link className="button text" to="/join/step1">
                              <button className="btn btn-submit free-trial-button">
                                <div>
                                  <span>Start Free Trial</span>
                                  {/* <span>Trial</span> */}
                                </div>
                              </button>
                            </Link>

                            <div className="buttons-separator" />

                            <span className="text">
                              {t('Navigation.SignIn')}
                            </span>
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

                .free-trial-button > div {
                  // min-width: 100px;
                  text-align: center;
                }

                .free-trial-button > div > span:first-child {
                  margin-right: 3px;
                }

		.foreducators-button {
		    background: none;
		    border: none;
		    margin: 0 10px 0 0;
		    padding: 0;
		    cursor: pointer;
		    transition: background-color 0.25s ease-in-out;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    cursor: pointer;
		    border-radius: 100px;
		    padding: 10px 20px;
		    color: ${romance};
		    background-color: ${astronaut};
		    text-align: left;
		    text-transform: uppercase;
		    font-size: 11px;
		    font-weight: bold;
		    font-family: ${primaryFont};
		}

                .foreducators-button > div {
                  // min-width: 100px;
                  text-align: center;
                }

                .foreducators-button > div > span:first-child {
                  margin-right: 3px;
                }

                @media ${screenMobile} {
                  .free-trial-button {
                    padding: 5px;
                  }
                }

                @media ${screenSmallMobile} {
                  .free-trial-button > div {
                    display: flex;
                    min-width: auto;
                    flex-direction: column;
                    align-items: center;
		    padding: 5px;
                  }
                }

                @media ${screenMobile} {
                  .foreducators-button {
                    padding: 5px;
                    margin-left: 5px;
                    margin-right: 5px;
                  }
                }

                @media ${screenSmallMobile} {
                  .foreducators-button > div {
                    display: flex;
                    min-width: auto;
                    flex-direction: column;
                    align-items: center;
                  }
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
