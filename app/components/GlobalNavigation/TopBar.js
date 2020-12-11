import { Livecast } from 'app/components/GlobalNavigation/Menus/livecast';
import { LiveActivityLoadable } from 'app/modules/live-activity';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { browserHistory, Link } from 'react-router';
import ConnectUser from 'app/redux/components/ConnectUser';
import AlertsIcon from 'app/redux/components/AlertsIcon';
import {
  shadows,
  seashell,
  romance,
  astronaut,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';

import {
  screenMobile,
  screenSmallMobile,
} from 'app/styles/variables/breakpoints';
import MENU_INTERFACE from './Menus/MenuInterface';
import CenterBar from './CenterBar';
import Button from './Button';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import { twoDigitsTimeFormatting } from 'app/utils/time-formatting';
import Clock from './Clock';
import { guestDashboardUrl } from 'app/config/project-config';

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
  // totalViewersCount,
  allLivecastsInProgress,
  activityFeedMessages,
  activityFeedMembers,
  getActivityFeedMembers,
  // pubnubConnection,
  // pubnubActivityFeedChannelName,
  userDisplayName,
  isChatEnabled,
  scrollActivityFeedToBottom,
  // subscribeToPubnubActivityFeedChannel,
  setMemberChatState,
  upcomingStarPartyList,
  signIn,
  fetchEvents,
  docked,  
  sendMessage,            
  setDock, 
  setTab, 
  unSubscribePubnub,
  pubnubInit,
  activeTab,
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
  // const [now, setTimeNow]= useState(moment(Date.now()).unix());        
  let countdown = null;      
  let nextShow = null;
  let difference= null;
  // let timerId=null;
  if(signIn && upcomingStarPartyList !== null && upcomingStarPartyList.eventList.length > 0){    
    const now=moment(Date.now()).unix();
    difference=20000;
    nextShow = upcomingStarPartyList.eventList[0];         
    countdown = nextShow.eventStart-now;
    // const { timestamp, expires } = upcomingStarPartyList;
    // const duration=(expires-timestamp)*1000; 
    // console.log("Upcoming Star Parties Duration"+duration);      
    // if (timerId !== null )
    //   clearTimeout(timerId);
    // timerId=setTimeout(()=>fetchEvents(),duration );
  }
  
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
                        // browserHistory.push('/');
                        browserHistory.push('/NewDashboard');
                      } else {
                        browserHistory.push(guestDashboardUrl);
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
                {user.isAuthorized && (
                  <li>
                    <Clock
                      interval={1000}
                    />
                  </li>
                )}                
              </ul>
            </div>
         
               <div className="center-menu">
                {/* <CenterBar /> */}                
               
              </div>
           
           

            <div className="right-menu">
            
              <ul className="button-list">
              {upcomingStarPartyList && countdown && nextShow && (
                <li>
               <div className="counter-div" onClick={()=>browserHistory.push(nextShow.linkUrl)}>
                {/* <CenterBar /> */}
                {countdown > 0 ? 
                    <Countdown
                        date={nextShow.eventStart*1000}
                        // date={Date.now() + 10000}
                        onComplete={null}                   
                        renderer={props => ( 
                                props.days < 1 && !props.completed ? 
                                <div>
                                  <span className="counter-text">
                                    {nextShow.eventTitle} <br/> 
                                  </span>
                                  <span className="counter-text">
                                    Starts in {twoDigitsTimeFormatting(props.hours)} : {twoDigitsTimeFormatting(props.minutes)} : {twoDigitsTimeFormatting(props.seconds)}
                                  </span>
                                </div>
                                
                                    :
                                    <div>
                                      <h6 className="counter-text">
                                        {nextShow.eventTitle} 
                                      </h6>
                                      <h6 className="counter-text">
                                      {props.days+"d : " + twoDigitsTimeFormatting(props.hours) + "h : " + twoDigitsTimeFormatting(props.minutes) + "m"}
                                      </h6>
                                    </div>
                                // <span className="counter-text">
                                //     {nextShow.eventTitle} <br/> {twoDigitsTimeFormatting(props.days)}d : {twoDigitsTimeFormatting(props.hours)}h : {twoDigitsTimeFormatting(props.minutes)}m
                                // </span>                        
                        )}
                    />
                :
                <Countdown
                        date={((nextShow.eventEnd*1000)+difference)}
                        // date={Date.now() + 10000}
                        onComplete={()=>fetchEvents()}                   
                        renderer={props => ( 
                          <span className="counter-text live">LIVE - {nextShow.eventTitle}</span>                       
                        )}
                    />                
                }    
                
                {/* <span className="counter-text">
                  {nextShow.eventTitle}<br/>
                  {nextShow.displayDate}
                </span>  */}
              </div>
              </li>
            )}
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
                  {!docked && (
                    <li>
                      <LiveActivityLoadable
                        // totalViewersCount={totalViewersCount}
                        activityFeedMessages={activityFeedMessages}
                        activityFeedMembers={activityFeedMembers}
                        setMemberChatState={setMemberChatState}
                        getActivityFeedMembers={getActivityFeedMembers}
                        // pubnubConnection={pubnubConnection}
                        // pubnubActivityFeedChannelName={
                        //   pubnubActivityFeedChannelName
                        // }
                        userDisplayName={userDisplayName}
                        isChatEnabled={isChatEnabled}
                        // onClick={closeAllMenus}
                        scrollActivityFeedToBottom={scrollActivityFeedToBottom}
                        // subscribeToPubnubActivityFeedChannel={
                        //   subscribeToPubnubActivityFeedChannel
                        // }
                        docked={docked}
                        sendMessage={sendMessage}            
                        setDock={setDock} 
                        setTab={setTab} 
                        unSubscribePubnub={unSubscribePubnub} 
                        pubnubInit={pubnubInit}
                        selectedTab={activeTab}
                      />
                    </li>
                  )}
                    
                    {upcomingStarPartyList && (
                      <li>
                        <Livecast
                          user={user}
                          allLivecastsInProgress={allLivecastsInProgress}
                          onClick={closeAllMenus}
                          upcomingStarPartyList={upcomingStarPartyList.eventList}
                        />
                      </li>
                    )}                    
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
                            {/* <Link
                              className="button text"
                              to="/about/about-slooh-education"
                            >
                              <button className="btn btn-submit foreducators-button">
                                <div>
                                  <span>Slooh Education</span>
                                </div>
                              </button>
                            </Link> */}
                            {/*<div style={{ marginRight: '10px' }} />*/}
                            {/* <Link className="button text" to="/join/step1">
                              <button className="btn btn-submit free-trial-button">
                                <div>
                                  <span>Join Today!</span>
                                  <span>Trial</span>
                                </div>
                              </button>
                            </Link> */}

                            {/* <div className="buttons-separator" /> */}

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
                  // flex-grow: 1;
                  display: flex;
                  align-self: center;
                  cursor: pointer;
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
                  margin: 0 10px 0 0 !important;
                  padding: 0;
                  cursor: pointer;
                  transition: background-color 0.25s ease-in-out;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  border-radius: 100px;
                  padding: 10px 20px !important;
                  color: ${romance};
                  background-color: ${astronaut} !important;
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

                .counter-div{
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }

                .counter-text{                 
                  // padding: 8px 12px;                 
                  // background: rgba(14,43,86,.6);
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  color: rgb(37, 52, 70);                  
                  text-align: right;                  
                  min-width: 130px;
                  cursor: pointer;                  
                }

                @media ${screenMobile} {
                  .free-trial-button {
                    padding: 5px !important;
                  }

                  .counter-text{
                    font-size: 10px;
                    line-height: 14px;
                    width: 140px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }

                @media ${screenSmallMobile} {
                  .free-trial-button {
                    padding: 5px !important;
                  }

                  .free-trial-button > div {
                    display: flex;
                    min-width: auto;
                    flex-direction: column;
                    align-items: center;
		    padding: 0px;
                  }
                }

                @media ${screenMobile} {
                  .foreducators-button {
                    padding: 5px !important;
                    margin-left: 5px !important;
                    margin-right: 5px !important;
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
