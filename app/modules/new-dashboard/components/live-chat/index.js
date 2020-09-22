import { Component } from 'react';
import React from "react";
import './style.scss';
import PubNubReact from 'pubnub-react';
import { projectPubnubConf } from 'app/config/project-config';
import { setupLiveActivityTimer, stopLiveActivityTimer } from 'app/services/live-activity/timer';
import debounce from 'lodash/debounce';
import { getUserInfo } from 'app/modules/User';

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

componentDidMount() {    

    const {
      pubnubActivityFeedChannelName,
      pubnubLiveEventsChannelName,
    } = this.props;

    // this.debouncedCloseAll = debounce(this.closeAll, 500, {
    //   leading: true,
    //   trailing: false,
    // });

    //get a connection to pubnub feeds
    this.pubnub = new PubNubReact({
      ssl: true,
      uuid: getUserInfo().cid,
      publishKey: projectPubnubConf.PUBNUB_FEEDS_PUBKEY,
      subscribeKey: projectPubnubConf.PUBNUB_FEEDS_SUBKEY,
      secretKey: projectPubnubConf.PUBNUB_FEEDS_SECRETKEY,
    });

    this.pubnub.addListener({
      status: statusEvent => {
        if (statusEvent.category === 'PNConnectedCategory') {
          this.pubnub.history(
            {
              channel: pubnubActivityFeedChannelName,
              count: 20,
              stringifiedTimeToken: false,
              reverse: false,
            },
            (status, response) => {
              let historyMessages = response.messages;
            }
          );
          this.pubnub.history(
            {
              channel: pubnubActivityFeedChannelName,
              count: 20,
              stringifiedTimeToken: false,
              reverse: false,
            },
            (status, response) => {
              let historyMessages = response.messages;
              historyMessages.forEach(historyMessage => {
                this.buildFeedMessage(historyMessage.entry, true);
              });

              //setInterval(() => this.checkActivityWindowScroll(), 5000);
            }
          );
        } //end of if connected
      },
      message: msg => {
        //what channel did this message come from???
        const { channel } = msg;

        //what is the message??
        const { message } = msg;

        if (channel === pubnubLiveEventsChannelName) {
          if (message.messageType) {
            if (message.messageType === 'livecast') {
              if (message.action === 'broadcastUpdate') {
                //update the livecasts in progress
                this.setState({ allLivecastsInProgress: message.livecasts });
              }
            }
          }
        } else if (channel === pubnubActivityFeedChannelName) {
          this.buildFeedMessage(message, true);
        }
      },
      presence: presenceEvent => {
        // handle presence (users that have joined or left the channel)

        if (presenceEvent.channel === pubnubActivityFeedChannelName) {
          //update the list of Customer UUIDs online

          //update the total count of members online
          this.setState({ totalViewersCount: presenceEvent.occupancy });
        }
      },
    });

    this.pubnub.init(this);
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.debouncedCloseAll);
    // if(this.timerId !== null)
    //     clearTimeout(this.timerId);
    const {
      pubnubActivityFeedChannelName,
      pubnubLiveEventsChannelName,
    } = this.props;

    //unmount pubnub
    this.pubnub.unsubscribe({
      channels: [
        pubnubActivityFeedChannelName,
        pubnubLiveEventsChannelName,
        `${process.env.PUBNUB_CHANNEL_PREFIX}.customer.${getUserInfo().cid}`,
      ],
    });
  }

  getActivityFeedMembers = () => {
    const { activityFeedMembersExpireDate } = this.state;
    const { token, at, cid } = getUserInfo();
    stopLiveActivityTimer();   
    return API.post(this.ACTIVITY_FEED_MEMBERS_API_URL, {
      token,
      at,
      cid,
    }).then(({ data: { membersOnlineList, expires, timestamp } }) => {
      const milliExpires = expires * 1000;
      const milliTimestamp = timestamp * 1000;      
      const remainingTime = milliExpires - milliTimestamp;
      if (remainingTime > 1000) {
        setupLiveActivityTimer(remainingTime, () => {        
          this.getActivityFeedMembers();
        });
      }
      this.setState({
        activityFeedMembers: membersOnlineList,
        activityFeedMembersExpireDate: expires,
      });
    });
    
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

  subscribeToPubnubActivityFeedChannel = () => {
    const {
      pubnubActivityFeedChannelName,
      pubnubLiveEventsChannelName,
    } = this.props;

    this.pubnub.subscribe({
      channels: [
        pubnubActivityFeedChannelName,
        pubnubLiveEventsChannelName,
        `${process.env.PUBNUB_CHANNEL_PREFIX}.customer.${getUserInfo().cid}`,
      ],
      withPresence: true,
    });
  };

  buildFeedMessage = (message, appendFlag) => {
    const { activityFeedMessages: activityFeedMessagesState } = this.state;
    try {
      //messages are in JSON format
      let messageJSONObj = message;

      let isMessageFromCurrentUser = false;
      if (messageJSONObj.customerUUID === getUserInfo().customerUUID) {
        isMessageFromCurrentUser = true;
      }

      let newMessage = {
        id: messageJSONObj.messageID,
        user: messageJSONObj.displayName,
        currentUser: isMessageFromCurrentUser,
        date: messageJSONObj.displayTimestamp,
        text: messageJSONObj.message_by_locale.en,
      };
      if (appendFlag === true) {
        this.setState(() => {
          const activityFeedMessages = [
            newMessage,
            ...activityFeedMessagesState,
          ];
          return {
            activityFeedMessages,
          };
        });
      } else {
        this.setState(() => {
          const activityFeedMessages = [
            newMessage,
            ...activityFeedMessagesState,
          ];
          return {
            activityFeedMessages,
          };
        });
      }
    } catch (e) {
      //do nothing, ignore this message....
    }
  };

    
    render() {
        const { pubnubActivityFeedChannelName, userMenu, subHeading } = this.props;
        const {
            totalViewersCount,
            allLivecastsInProgress,
            activityFeedMessages,
            activityFeedMembers,
            docked,            
          } = this.state;
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
                <LiveActivity
                        totalViewersCount={totalViewersCount}
                        activityFeedMessages={activityFeedMessages}
                        activityFeedMembers={activityFeedMembers}
                        setMemberChatState={this.setMemberChatState}
                        getActivityFeedMembers={this.getActivityFeedMembers}
                        pubnubConnection={this.pubnub}
                        pubnubActivityFeedChannelName={
                          pubnubActivityFeedChannelName
                        }
                        userDisplayName={""}
                        // userDisplayName={displayName}
                        isChatEnabled={true}
                        onClick={null}
                        // scrollActivityFeedToBottom={this.scrollActivityFeedToBottom}
                        subscribeToPubnubActivityFeedChannel={
                          this.subscribeToPubnubActivityFeedChannel
                        }
                        docked={docked}
                        setDock={()=>this.setState({docked: !docked})}
                />
            </div>   
        );
    }

}