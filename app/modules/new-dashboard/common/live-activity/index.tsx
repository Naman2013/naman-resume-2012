import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import { Tooltip } from 'react-tippy';
import { browserHistory } from 'react-router';
import { Rnd } from 'react-rnd';
import Button from 'app/components/common/style/buttons/Button';
import {
  isMobileScreen,
  isTabletScreen,
  isTabletDevice,
} from 'app/services.ts';
import cx from 'classnames';
import { getUserInfo } from 'app/modules/User';
import { isEnter } from 'app/modules/utils/keyIdentifier';
import { Nav, Tab } from 'react-bootstrap';
import { FeedItem } from '../feed-item';
import { MemberItem } from '../member-item';
import { API } from 'app/api';
import { Spinner } from 'app/components/spinner/index';

const enableResizing = {
  top: true,
  left: true,
  right: true,
  bottom: true,
};

const disableResizing = {
  top: false,
  left: false,
  right: false,
  bottom: false,
};


const setMessageIdToLocalStorage = (id: string): void => {
  window.localStorage.setItem('newMessageId', id);
};

const calculateFeedMenuSize = (
  isTablet: boolean,
  setFeedMenuSize: Function
): void => {
  const width = isTablet ? window.screen.availWidth : 500;
  const height = isTablet ? window.screen.availHeight - 53 : 450;
  const left = -340;
  const top = 55;
  setFeedMenuSize({ width, height, left, top });
};

const submitMessage = (
  event: any,
  pubnubConnection: any,
  pubnubActivityFeedChannelName: string,
  userDisplayName: string,
  myTextInputField: any,
  setMemberChatState: Function,
  props: any
): void => {
  event.preventDefault();

  if (event.keyCode === 13) {
    let tmpUserDisplayName = userDisplayName;

    if (userDisplayName === '') {
      tmpUserDisplayName = '...';
    }

    let message = {
      id: -1,
      messageType: 'user-generated',
      currentUser: true,
      displayName: userDisplayName,
      customerUUID: getUserInfo().customerUUID,
      date: '',
      // message_by_locale: {
      //   en: `<a href="/profile/public/${
      //     getUserInfo().customerUUID
      //   }/activity">${tmpUserDisplayName}</a> - ${event.target.value}`,
      // },
      message_by_locale: {
        en: `<a id="${getUserInfo().customerUUID}" href="">${tmpUserDisplayName}</a> - ${event.target.value}`,
      },
    };
    setMessageIdToLocalStorage(null);
    props.sendMessage(message);
    //publish the message
    // pubnubConnection.publish({
    //   message,
    //   channel: pubnubActivityFeedChannelName,
    //   sendByPost: false, // true to send via post
    //   storeInHistory: true, //override default storage options
    // });
    
    setMemberChatState('sentMessage');    
    const { token, at, cid } = getUserInfo();  
    const { activityFeedMembers } = props;
    API.post("/api/app/postChatMessage", {      
      at,
      token,
      cid,
      message: event.target.value,
      localUserTimestampInMilliseconds: new Date().getTime(),
      numUsersWithChatOpen: activityFeedMembers.length, 
    }).then(result => {     
          //success
    })
    .catch(error => {
        //error
    });  
    myTextInputField.value = '';
  }
};

type TLiveActivity = {
  activityFeedMessages: Array<any>;
  activityFeedMembers: Array<any>;
  setMemberChatState: Function;
  getActivityFeedMembers: Function;
  pubnubConnection: Record<string, any>;
  pubnubActivityFeedChannelName: string;
  userDisplayName: string;
  isChatEnabled: boolean;
  scrollActivityFeedToBottom: any;
  subscribeToPubnubActivityFeedChannel: Function;  
  docked: boolean;
  setDock: Function;
  sendMessage: Function;
  selectedTab: string;
  setTab: Function;
  onClickItem: Function;
  NoHistroyMessage: boolean;
};

export const LiveActivity = (props: TLiveActivity) => {
  const LIVE_FEEDS_TAB = 'liveFeeds';
  const MEMBERS_TAB = 'activeMembers';
  const MEMBER_CHAT_STATE_API_URL = '/api/app/setMemberChatState';
  
  const {
    scrollActivityFeedToBottom,
    isChatEnabled,
    activityFeedMessages,
    activityFeedMembers,
    getActivityFeedMembers,
    setMemberChatState,
    subscribeToPubnubActivityFeedChannel,  
    docked,
    setDock,  
    sendMessage,
    selectedTab,
    setTab,
    onClickItem,
    NoHistroyMessage,
  } = props;
  
  const rnd = useRef(null);

  const [activeTab, setActiveTab] = React.useState(selectedTab);

  const [isOpen, setOpen] = React.useState(docked);

  const [isSubscribed, pubNubFeedChannelSubscribingStatus] = useState(false);

  const [isFullscreen, setFullscreen] = useState(false);

  const [boxSize, setFeedMenuSize] = useState({
    width: 500,
    height: 450,
    left: -300,
    top: 30,
  });

  const isTablet = isTabletDevice();
  const isTabletscreen = isTabletScreen();
  const isMobileDevice = isMobileScreen();
  const lastStorageMessageId = window.localStorage.getItem('newMessageId');
  const activityFeedMessage =
    activityFeedMessages[activityFeedMessages.length - 1] || {};

  const lastMessageId = activityFeedMessage.id ? activityFeedMessage.id : null;
  const lastMessageFromCurrentUser = activityFeedMessage.currentUser;

  useEffect(() => {
   
    if (isOpen) {
      getActivityFeedMembers()
    }
  }, [isOpen]);

  // useEffect(() => {
  //   const handleOrientationChangeEvent = (): void => {
  //     calculateFeedMenuSize(isTablet, setFeedMenuSize);
  //     if(rnd.current !== null)
  //       rnd.current.updatePosition({ x: -300, y: 80 });
  //   };

  //   window.addEventListener('orientationchange', handleOrientationChangeEvent);
  //   return (): void => {
  //     handleOrientationChangeEvent();
  //     window.removeEventListener(
  //       'orientationchange',
  //       handleOrientationChangeEvent
  //     );
  //   };
  // }, [isTablet]);

  //This effect used to hide global scroll when live activity opened in full screen mode
  useEffect(() => {
    // if (isOpen && (isFullscreen || isTablet)) {
    //   document.body.classList.add('disable-overflow');
    //   document.documentElement.classList.add('disable-overflow');
    // } else {
    //   document.body.classList.remove('disable-overflow');
    //   document.documentElement.classList.remove('disable-overflow');
    // }
    if (isOpen) setMessageIdToLocalStorage(lastMessageId);
  }, [isFullscreen, isTablet, isOpen, lastMessageId]);

  useEffect(() => {
    if (!isOpen) sendMemberChatStateBeforeUnOnload();
  }, []);

  const toggleActivityFeedMenu = (): void => {
    // if (!isSubscribed) {
    //   subscribeToPubnubActivityFeedChannel();
    // }
    // setOpen(!isOpen);
    // setActiveTab(MEMBERS_TAB);

    // setMessageIdToLocalStorage(lastMessageId);
    // pubNubFeedChannelSubscribingStatus(true);

    // if (!isOpen) {
      setMemberChatState('enter');
    // } else {
    //   setMemberChatState('leave');
    // }
  };

  const onTabChange = (): void => {
    // if (!isSubscribed) {
    //   subscribeToPubnubActivityFeedChannel();     
    // }
    // setOpen(!isOpen);
    // setActiveTab(MEMBERS_TAB);

    setMessageIdToLocalStorage(lastMessageId);
    // pubNubFeedChannelSubscribingStatus(true);

    // if (!isOpen) {
    //   setMemberChatState('enter');
    // } else {
    //   setMemberChatState('leave');
    // }
  };

  const sendMemberChatStateBeforeUnOnload = () => {
    const { token, at, cid } = getUserInfo();
    const sendData = { token, at, cid, chatState: 'leave' };

    window.addEventListener('unload', function() {
      navigator.sendBeacon(MEMBER_CHAT_STATE_API_URL, JSON.stringify(sendData));
    });
  };

  const contentClickHandler = (e: any): void => {
    // detect click on Link
    if (e.target instanceof window.HTMLAnchorElement) {
      // const targetLink = e.target.closest('a');
      // e.preventDefault();
      // browserHistory.push(targetLink.href);
      e.preventDefault();
      const el = e.target.closest("a");
      if (el && e.currentTarget.contains(el) && el.id !== "") {
        // e.preventDefault();
        props.onClickItem(el.id, true);
      }
      else{
        const targetLink = e.target.closest('a');
        browserHistory.push(targetLink.href);
      } 
      // if Mobile then close modal
      // const isMobile = isMobileScreen() || isTabletScreen();

      // if (isMobile) {
      //   setOpen(false);
      //   // setActiveTab(LIVE_FEEDS_TAB);
      //   setTab(LIVE_FEEDS_TAB);
      // }
    }
  };

  const onKeyPressed = (e: any): void => {
    if (isEnter(e)) {
      contentClickHandler(e);
    }
  };
  
  useEffect(() => {  
    if(!isMobileDevice){
      // if (!isSubscribed) {
      //   subscribeToPubnubActivityFeedChannel();
      // }
      // setOpen(!isOpen);
      // setActiveTab(MEMBERS_TAB);
      // setTab(MEMBERS_TAB);
      // setMessageIdToLocalStorage(lastMessageId);
      // pubNubFeedChannelSubscribingStatus(true);
  
      // if (!isOpen) {
        setMemberChatState('enter');
      // } else {
      //   setMemberChatState('leave');
      // }
    }
      
  }, []);

  const isFetching = !(selectedTab === MEMBERS_TAB ? activityFeedMembers.length > 0 : (NoHistroyMessage ||activityFeedMessages.length > 0));

  return (
    <div
      className={cx('live-activity-wrapper', { 'full-screen': isFullscreen }, {'docked': docked}, {'wrapper-not-docked' : !docked})}
    >
      {/* BTN */}
      {/* {props.isChatEnabled?(
      <div
        role="presentation"
        className="icon-bubble-comment-streamline-talk"
        onClick={toggleActivityFeedMenu}
      >
        <span
          className={cx('message-identifier', {
            'has-new-messages':
              lastMessageId &&
              lastMessageId !== lastStorageMessageId &&
              !lastMessageFromCurrentUser &&
              !isOpen,
          })}
        />
      </div>
      ):null} */}
      {/* WINDOW */}
      {isOpen && (
        <div
          className={cx('live-activity-window-wrapper', {
            'live-activity-window-wrapper-mobile': isTablet,
          }, {'wrapper-docked' : docked}, {'wrapper-not-docked' : !docked})}
        >         
          {docked ? (
              <div className="live-activity-window">
              <div className="live-activity-window-header d-flex justify-content-between align-items-center">
                <Tab.Container
                  defaultActiveKey={selectedTab}
                  id="tabs"
                  unmountOnExit
                  mountOnEnter
                  onSelect={(key: string): void => {
                  
                    // if (key === MEMBERS_TAB) {
                    //   getActivityFeedMembers();
                    // }
                    if( key === LIVE_FEEDS_TAB)
                    {
                      onTabChange();
                    }
                    // setActiveTab(key);
                    setTab(key)
                  }}
                >
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey={LIVE_FEEDS_TAB} className="chat-nav">Chat</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey={MEMBERS_TAB} className="chat-nav">Roll Call</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Tab.Container>

                <div className="live-activity-window-header-right chat-tab-div">
                  {/* <div className="desktop-container">
                    <Tooltip title="Fullscreen">
                      <Button
                        mod="full-screen-button"
                        renderIcon={() => <i className="fa fa-arrows-alt" />}
                        onClickEvent={() => setFullscreen(!isFullscreen)}
                      />
                    </Tooltip>
                  </div> */}
                  <Tooltip title="Undock">
                    <div className="close-window">
                      <img
                        src="https://vega.slooh.com/assets/v4/dashboard-new/dock_undock.svg"
                        className="icon-close"
                        // onClick={() => {
                        //   setOpen(false);
                        //   setActiveTab(MEMBERS_TAB);
                        //   setMemberChatState('leave');
                        // }}
                        onClick={()=>setDock(false)}
                        role="presentation"
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>

              {selectedTab === MEMBERS_TAB && (
                <div className="live-activity-members-list">
                  {activityFeedMembers.map(memberItem => (
                    <MemberItem
                      key={memberItem.customerId}
                      member={memberItem}
                      contentClickHandler={contentClickHandler}
                      onKeyPressed={onKeyPressed}
                      onClickItem={onClickItem}
                    />
                    
                  ))}
                 
                     <Spinner
                        loading={isFetching}
                        text="Loading..."
                   />
                  
                </div>
              )}

              {selectedTab === LIVE_FEEDS_TAB && isChatEnabled === true && (
                <div className="live-activity-window-footer">
                  <input
                    type="text"
                    placeholder="Please type a message"
                    onKeyUp={e =>
                      submitMessage(
                        e,
                        props.pubnubConnection,
                        props.pubnubActivityFeedChannelName,
                        props.userDisplayName,
                        e.target,
                        setMemberChatState,
                        props
                      )
                    }
                    onMouseDown={e => e.stopPropagation()}
                  />
                </div>
              )}

              {selectedTab === LIVE_FEEDS_TAB && (
                <div className="live-activity-window-body">
                  <div
                    id="live-activity-window-body-feed"
                    className="live-activity-window-body-feed"
                  >
                    {activityFeedMessages.map(feedItem => (
                      <FeedItem
                        key={feedItem.id}
                        item={feedItem}
                        contentClickHandler={contentClickHandler}
                        onKeyPressed={onKeyPressed}                        
                      />
                    ))}
                    <Spinner
                        loading={isFetching}
                        text="Loading..."
                   />
                  </div>
                </div>
              )}
            </div>
          ):(
            null
          )}               

        </div>
      )}
    </div>
  );
};
