import { Component } from 'react';
import React from "react";
import './style.scss';
import PubNubReact from 'pubnub-react';
import { projectPubnubConf } from 'app/config/project-config';
import { setupLiveActivityTimer, stopLiveActivityTimer } from 'app/services/live-activity/timer';
import debounce from 'lodash/debounce';
import { getUserInfo } from 'app/modules/User';
import has from 'lodash/has';
import { API } from 'app/api';
import { LiveActivity } from '../../common/live-activity';

export class LiveChat extends Component{

ACTIVITY_FEED_MEMBERS_API_URL = '/api/app/getActiveMembersOnline';
MEMBER_CHAT_STATE_API_URL = '/api/app/setMemberChatState';

static defaultProps = {
    actions: {},
    activeLeft: '',
    activeMenu: '',
    activeRight: '',
    isLeftOpen: false,
    isNotificationMenuOpen: false,
    isRightOpen: false,
    showUpsellModal: false,
    isMobile: false,
    pubnubActivityFeedChannelName: `${projectPubnubConf.PUBNUB_CHANNEL_PREFIX}.system.activityfeed`,
    pubnubLiveEventsChannelName: `${projectPubnubConf.PUBNUB_CHANNEL_PREFIX}.system.liveevents`,
    docked: true,
  };

state = {
    totalViewersCount: 0,
    allLivecastsInProgress: {},
    activityFeedMessages: [],
    activityFeedMembers: [],
    customerUUIDsList: [],
    activityWindowHasBeenScrolledToBottom: false,
    activityFeedMembersExpireDate: null,
    docked: true,
};

  setMemberChatState = chatState => {
    if(chatState=='leave')
      stopLiveActivityTimer();    
      
    const { token, at, cid } = getUserInfo();
    
    return API.post(this.MEMBER_CHAT_STATE_API_URL, {
      token,
      at,
      cid,
      chatState,
    });
  };
  

     
    render() {
        const { 
          pubnubData, 
          sendMessage, 
          setDock, setTab, 
          unSubscribePubnub, 
          pubnubInit, 
          getActivityFeedMembers, 
          setMemberChatState,
           } = this.props;

        const {  
          docked, 
          activityFeedMessages, 
          activityFeedMembers, 
          allLivecastsInProgress,
          activeTab,
          displayName, } = pubnubData;
        
        // const userInfo= has(resp, 'mainMenu.userInfo') ? resp.mainMenu.userInfo : {};
        
        // let displayName =
        //   userMenu && userMenu.userInfo ? userMenu.userInfo.displayName : '';
        
        // if (userMenu && userMenu.userInfo) {
        //     const { userInfo } = userMenu;
        //     const {
        //       displayName: userInfoName,
        //       isChatEnabled: userInfoIsChatEnabled,
        //     } = userInfo;
        //     isChatEnabled = userInfoIsChatEnabled;
        //     displayName = userInfoName;
        // }
          
        return (
            <div className="">
              {docked && (
                  <LiveActivity
                    // totalViewersCount={totalViewersCount}
                    activityFeedMessages={activityFeedMessages}
                    activityFeedMembers={activityFeedMembers}
                    setMemberChatState={setMemberChatState}
                    getActivityFeedMembers={getActivityFeedMembers}
                    // pubnubConnection={this.pubnub}
                    // pubnubActivityFeedChannelName={
                    //   pubnubActivityFeedChannelName
                    // }
                    userDisplayName={displayName}
                    // userDisplayName={displayName}
                    isChatEnabled={true}
                    onClick={null}
                    // scrollActivityFeedToBottom={this.scrollActivityFeedToBottom}
                    // subscribeToPubnubActivityFeedChannel={
                    //   this.subscribeToPubnubActivityFeedChannel
                    // }
                    docked={docked}
                    setDock={setDock}
                    sendMessage={sendMessage}
                    selectedTab={activeTab}
                    setTab={setTab}
                  />
              )}
                
            </div>   
        );
    }

}