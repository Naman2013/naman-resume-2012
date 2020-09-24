import createReducer from '../utils/createReducer';
// import MENU_INTERFACE from 'app/components/GlobalNavigation/Menus/MenuInterface';
import {
  CHANGE_VIEWERS_COUNT,
  FEED_MESSAGE_RECEIVED,
  DOCK_CHANGED,
  TAB_CHANGED,
  FEED_MEMBERS_CHANGED,
  SET_DISPLAY_NAME,
  UPDATE_PUBNUB_INIT,
} from './actions';

import { projectPubnubConf } from 'app/config/project-config';
// ACTIVITY_FEED_MEMBERS_API_URL = '/api/app/getActiveMembersOnline';
// MEMBER_CHAT_STATE_API_URL = '/api/app/setMemberChatState';

const initialState = {  
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
  activeTab: 'activeMembers',
  displayName: '',
  pubnubInitialize: false,
};

export default createReducer(initialState, {
  [UPDATE_PUBNUB_INIT](state,{flag}) { 
    state.pubnubInitialize=flag;
    return {
      ...state      
    };
  },  
  [CHANGE_VIEWERS_COUNT](state,{payload}) {
    return {
      ...state,
      totalViewersCount: payload
    };
  }, 
  [FEED_MESSAGE_RECEIVED](state,{newMessage}) { 
    const { activityFeedMessages } = state;
    const newActivityFeedMessages = [
      newMessage,
      ...activityFeedMessages,
    ];   
    state.activityFeedMessages=newActivityFeedMessages;
    return {
      ...state      
    };
  },  
  [DOCK_CHANGED](state,{flag}) {   
    state.docked=flag;
    return {
      ...state      
    };
  }, 
  [TAB_CHANGED](state,{tabName}) { 
    state.activeTab=tabName;
    return {
      ...state      
    };
  },
  [SET_DISPLAY_NAME](state,{name}) { 
    state.displayName=name;
    return {
      ...state      
    };
  },    
  [FEED_MEMBERS_CHANGED](state,{activityFeedMembers, activityFeedMembersExpireDate}) {
    state.activityFeedMembers=activityFeedMembers;
    state.activityFeedMembersExpireDate=activityFeedMembersExpireDate;
    return {
      ...state      
    };
  },  
});


