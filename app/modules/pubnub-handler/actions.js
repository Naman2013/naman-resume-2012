import PubNubReact from 'pubnub-react';
import { getUserInfo } from 'app/modules/User';
import { projectPubnubConf } from 'app/config/project-config';
import { API } from 'app/api';
import { setupLiveActivityTimer, stopLiveActivityTimer } from 'app/services/live-activity/timer';

let pubnub; 

export const PUBNUB_INIT = 'PUBNUB_INIT';
export const CHANGE_VIEWERS_COUNT = 'CHANGE_VIEWERS_COUNT';
export const FEED_MESSAGE_RECEIVED = 'FEED_MESSAGE_RECEIVED';
export const DOCK_CHANGED = 'DOCK_CHANGED';
export const TAB_CHANGED = 'TAB_CHANGED';
export const FEED_MEMBERS_CHANGED = 'FEED_MEMBERS_CHANGED';
export const SET_DISPLAY_NAME = 'SET_DISPLAY_NAME';
export const UPDATE_PUBNUB_INIT = 'UPDATE_PUBNUB_INIT';
export const NO_MESSAGE_HISTORY = 'NO_MESSAGE_HISTORY';

let initialState = {
  pubnubActivityFeedChannelName: `${projectPubnubConf.PUBNUB_CHANNEL_PREFIX}.system.activityfeed`,
  pubnubLiveEventsChannelName: `${projectPubnubConf.PUBNUB_CHANNEL_PREFIX}.system.liveevents`,
  docked: true,
  totalViewersCount: 0,
  allLivecastsInProgress: {},
  activityFeedMessages: [],
  activityFeedMembers: [],
  customerUUIDsList: [],
  activityWindowHasBeenScrolledToBottom: false,
  activityFeedMembersExpireDate: null,
};

let ACTIVITY_FEED_MEMBERS_API_URL = '/api/app/getActiveMembersOnline';
let MEMBER_CHAT_STATE_API_URL = '/api/app/setMemberChatState';

export const pubnubInit = () => (dispatch, getState) => {  
  pubnub= new PubNubReact({
    ssl: true,
    uuid: getUserInfo().cid,
    publishKey: projectPubnubConf.PUBNUB_FEEDS_PUBKEY,
    subscribeKey: projectPubnubConf.PUBNUB_FEEDS_SUBKEY,
    secretKey: projectPubnubConf.PUBNUB_FEEDS_SECRETKEY,
  });   
  addPubnubListener(dispatch);  
  pubnub.init(initialState);
  subscribeToPubnubActivityFeedChannel();
  dispatch(updatePubnubInitialized(true));
};

const updateViewersCount = (count) => ({
  type: CHANGE_VIEWERS_COUNT,
  count
})

const feedMessageReceived = (newMessage) => ({
  type: FEED_MESSAGE_RECEIVED,
  newMessage
})

const setNoHistoryMessage = (flag) => ({
  type: NO_MESSAGE_HISTORY,
  flag
})

const changeDock = (flag) => ({
  type: DOCK_CHANGED,
  flag
})

const changeTab = (tabName) => ({
  type: TAB_CHANGED,
  tabName
})

const changeDisplayName = (name, isChatEnabled) => ({
  type: SET_DISPLAY_NAME,
  name,
  isChatEnabled,
})

const updateFeedMembers = (activityFeedMembers, activityFeedMembersExpireDate) => ({
  type: FEED_MEMBERS_CHANGED,
  activityFeedMembers,
  activityFeedMembersExpireDate
})

const updatePubnubInitialized = (flag) => ({
  type: UPDATE_PUBNUB_INIT,
  flag
})

const addPubnubListener = (dispatch) => {  
  pubnub.addListener({
    status: statusEvent => {
      if (statusEvent.category === 'PNConnectedCategory') {        
        pubnub.history(
          {
            channel: initialState.pubnubActivityFeedChannelName,
            count: 20,
            stringifiedTimeToken: false,
            reverse: false,
          },
          (status, response) => {            
            let historyMessages = response.messages;
           
            if(historyMessages.length===0)
              dispatch(setNoHistoryMessage(true));
            else
              dispatch(setNoHistoryMessage(false));
            historyMessages.forEach(historyMessage => {
              
              buildFeedMessage(historyMessage.entry, true, dispatch);
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
      if (channel === initialState.pubnubLiveEventsChannelName) {
        if (message.messageType) {
          if (message.messageType === 'livecast') {
            if (message.action === 'broadcastUpdate') {
              //update the livecasts in progress
              // this.setState({ allLivecastsInProgress: message.livecasts });
            }
          }
        }
      } else if (channel === initialState.pubnubActivityFeedChannelName) {
          buildFeedMessage(message, true, dispatch);
      }
    },
    presence: presenceEvent => {
      // handle presence (users that have joined or left the channel)
  
      if (presenceEvent.channel === initialState.pubnubActivityFeedChannelName) {
        //update the list of Customer UUIDs online
  
        //update the total count of members online
       
        dispatch(updateViewersCount(presenceEvent.occupancy));
        // this.setState({ totalViewersCount: presenceEvent.occupancy });
      }
    },
  });
};

const subscribeToPubnubActivityFeedChannel = () => {
  const {
    pubnubActivityFeedChannelName,
    pubnubLiveEventsChannelName,
  } = initialState;

  pubnub.subscribe({
    channels: [
      pubnubActivityFeedChannelName,
      pubnubLiveEventsChannelName,
      `${process.env.PUBNUB_CHANNEL_PREFIX}.customer.${getUserInfo().cid}`,
    ],
    withPresence: true,
  });
};

export const buildFeedMessage = (message, appendFlag, dispatch) => {  
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
      // this.setState(() => {
      //   const activityFeedMessages = [
      //     newMessage,
      //     ...activityFeedMessagesState,
      //   ];
      //   return {
      //     activityFeedMessages,
      //   };
      // });
      // const activityFeedMessages = [
      //   newMessage,
      //   ...activityFeedMessagesState,        
      // ];
      dispatch(feedMessageReceived(newMessage));
    } else {
      // this.setState(() => {
      //   const activityFeedMessages = [
      //     newMessage,
      //     ...activityFeedMessagesState,
      //   ];
      //   return {
      //     activityFeedMessages,
      //   };
      // });
    }
  } catch (e) {
    //do nothing, ignore this message....
  }
};

export const sendMessage = (message) => (dispatch, getState) =>{ 
  pubnub.publish({
    message,
    channel: initialState.pubnubActivityFeedChannelName,
    sendByPost: false, // true to send via post
    storeInHistory: true, //override default storage options
  });
}

export const setDock = (flag) => (dispatch, getState) =>{
  dispatch(changeDock(flag));
}

export const setTab = (tabName) => (dispatch, getState) =>{
  const { pubnubChat } = getState();
  if(!pubnubChat.pubnubInitialize && tabName === "liveFeeds")
    dispatch(pubnubInit());
  dispatch(changeTab(tabName));
}

export const unSubscribePubnub = () => {
  const {
    pubnubActivityFeedChannelName,
    pubnubLiveEventsChannelName,
  } = initialState;

  //unmount pubnub
  pubnub.unsubscribe({
    channels: [
      pubnubActivityFeedChannelName,
      pubnubLiveEventsChannelName,
      `${process.env.PUBNUB_CHANNEL_PREFIX}.customer.${getUserInfo().cid}`,
    ],
  });
  dispatch(updatePubnubInitialized(false));
}

export const getActivityFeedMembers = () => (dispatch, getState) => {
  const { token, at, cid } = getUserInfo();
    stopLiveActivityTimer();   
    return API.post(ACTIVITY_FEED_MEMBERS_API_URL, {
      token,
      at,
      cid,
    }).then(({ data: { membersOnlineList, expires, timestamp } }) => {
      const milliExpires = expires * 1000;
      const milliTimestamp = timestamp * 1000;      
      const remainingTime = milliExpires - milliTimestamp;
      if (remainingTime > 1000) {        
        setupLiveActivityTimer(remainingTime, () => { 
          dispatch(getActivityFeedMembers());
        });
      }
      dispatch(updateFeedMembers(membersOnlineList, expires ));     
    });
}

export const setMemberChatState = (state) => (dispatch, getState) => {
  if(state=='leave')
      stopLiveActivityTimer();    
      
    const { token, at, cid } = getUserInfo();
    
    return API.post(MEMBER_CHAT_STATE_API_URL, {
      token,
      at,
      cid,
      state,
    });
}

export const setDisplayName = (name, isChatEnabled) => (dispatch, getState) => {
  dispatch(changeDisplayName(name, isChatEnabled));
}


