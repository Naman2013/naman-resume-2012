import createReducer from '../utils/createReducer';
import { FETCH_STAR_PARTY_LIST_START,
         FETCH_STAR_PARTY_LIST_SUCCESS,
         GET_USER_GRAVITY_STATUS_START,
         GET_USER_GRAVITY_STATUS_SUCCESS,
         GET_MY_PICTURES_START,
         GET_MY_PICTURES_SUCCESS,
         GET_DASHBOARD_FEATURED_OBJECTS_START,
         GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS,
         GET_MY_CLUB_LIST_START,
         GET_MY_CLUB_LIST_SUCCESS,
         GET_BOOKMARK_LIST_START,
         GET_BOOKMARK_LIST_SUCCESS,
         GET_PRIVATE_PROFILE_START,
         GET_PRIVATE_PROFILE_SUCCESS,
         GET_PRIVATE_PROFILE_MISSION_START,
         GET_PRIVATE_PROFILE_MISSION_SUCCESS,
         GET_USER_ACTIVE_OBJECT_START,
         GET_USER_ACTIVE_OBJECT_SUCCESS,
         GET_USER_POPULAR_OBSERVATIONS_START,
         GET_USER_POPULAR_OBSERVATIONS_SUCCESS,
         GET_MISSION_IMAGES_START,
         GET_MISSION_IMAGES_SUCCESS,
         GET_GALLERY_LIST_START,
         GET_GALLERY_LIST_SUCCESS,
         GET_RECENT_GRAVITY_ACTION_START,
         GET_RECENT_GRAVITY_ACTION_SUCCESS,
         GET_WEATHER_ACTION_START,
         GET_WEATHER_ACTION_SUCCESS,
         GET_SKY_CONDITIONS_START,
         GET_SKY_CONDITIONS_SUCCESS,
         GET_OBSERVATORY_LIST_START,
         GET_OBSERVATORY_LIST_SUCCESS,
         GET_QUEST_MAP_CONTROL_START,
         GET_QUEST_MAP_CONTROL_SUCCESS,
         GET_NEW_DASH_OBS_START,
         GET_NEW_DASH_OBS_SUCCESS,
         GET_OBS_STATUS_START,
         GET_OBS_STATUS_SUCCESS,
         GET_OBJECT_MAP_CONTROL_START,
         GET_OBJECT_MAP_CONTROL_SUCCESS,
         GET_COMMUNITY_EXPLORATION_START,
         GET_COMMUNITY_EXPLORATION_SUCCESS,
         GET_COMMUNITY_FAME_START,
         GET_COMMUNITY_FAME_SUCCESS,
         GET_MY_RANK_START,
         GET_MY_RANK_SUCCESS,
         GET_TOP_MEMBERS_START,
         GET_TOP_MEMBERS_SUCCESS,
         GET_TOP_STUDENTS_START,
         GET_TOP_STUDENTS_SUCCESS,
         GET_MOST_ACTIVE_CLUBS_START,
         GET_MOST_ACTIVE_CLUBS_SUCCESS,
         GET_TOP_SCHOOL_CLUBS_START,
         GET_TOP_SCHOOL_CLUBS_SUCCESS,
         GET_GRAVITY_BY_DOMAIN_START,
         GET_GRAVITY_BY_DOMAIN_SUCCESS,
         GET_DASHBOARD_MISSION_LIST_START,
         GET_DASHBOARD_MISSION_LIST_SUCCESS,
         GET_PHOTO_HUB_HEADING_START,
         GET_PHOTO_HUB_HEADING_SUCCESS,
         STORE_TOP_NAV_RESPONSE,
        } from './actions';

const initialState = {
    isFetching: true,    
}

export default createReducer(initialState, {
    [FETCH_STAR_PARTY_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          upcomingStarPartyList: payload,
          isFetching: false,
        };
      },
      [FETCH_STAR_PARTY_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_USER_GRAVITY_STATUS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          userGravityStatus: payload,
          isFetching: false,
        };
      },
      [GET_USER_GRAVITY_STATUS_START](state) {
        return {
          ...state,
          // isFetching: true,
        };
      },
      [GET_MY_PICTURES_SUCCESS](state, { payload }) {  
        return {
          ...state,
          photoHub: payload,
          isFetching: false,
        };
      },
      [GET_MY_PICTURES_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          dashboardFeaturedObjects: payload,
          isFetching: false,
        };
      },
      [GET_DASHBOARD_FEATURED_OBJECTS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_MY_CLUB_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          myClubList: payload,
          isFetching: false,
        };
      },
      [GET_MY_CLUB_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_BOOKMARK_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          bookmarkList: payload,
          isFetching: false,
        };
      },
      [GET_BOOKMARK_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_PRIVATE_PROFILE_SUCCESS](state, { payload }) {               
        return {
          ...state,
          privteProfile: payload,
          isFetching: false,
        };
      },
      [GET_PRIVATE_PROFILE_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_PRIVATE_PROFILE_MISSION_SUCCESS](state, { payload }) {               
        return {
          ...state,
          privateProfileMission: payload,
          isFetching: false,
        };
      },
      [GET_PRIVATE_PROFILE_MISSION_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_USER_ACTIVE_OBJECT_SUCCESS](state, { payload }) {               
        return {
          ...state,
          userActiveObject: payload,
          isFetching: false,
        };
      },
      [GET_USER_ACTIVE_OBJECT_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_USER_POPULAR_OBSERVATIONS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          userPopularObservation: payload,
          isFetching: false,
        };
      },
      [GET_USER_POPULAR_OBSERVATIONS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_MISSION_IMAGES_SUCCESS](state, { payload }) {               
        return {
          ...state,
          photoHub: payload,
          isFetching: false,
        };
      },
      [GET_MISSION_IMAGES_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_GALLERY_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          photoHub: payload,
          isFetching: false,
        };
      },
      [GET_GALLERY_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_RECENT_GRAVITY_ACTION_SUCCESS](state, { payload }) {               
        return {
          ...state,
          recentGravityAction: payload,
          isFetching: false,
        };
      },
      [GET_RECENT_GRAVITY_ACTION_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_WEATHER_ACTION_SUCCESS](state, { payload }) {               
        return {
          ...state,
          weatherStatus: payload.wxList,
          isFetching: false,
        };
      },
      [GET_WEATHER_ACTION_START](state) {
        return {
          ...state,
          isFetching: true,
          weatherStatus: undefined,
        };
      },
      [GET_SKY_CONDITIONS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          skyConditions: payload,
          isFetching: false,
        };
      },
      [GET_SKY_CONDITIONS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_OBSERVATORY_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          observatoryList: payload,
          isFetching: false,
        };
      },
      [GET_OBSERVATORY_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_QUEST_MAP_CONTROL_SUCCESS](state, { payload }) {               
        return {
          ...state,
          questMapControls: payload,
          isFetching: false,
        };
      },
      [GET_QUEST_MAP_CONTROL_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_OBJECT_MAP_CONTROL_SUCCESS](state, { payload }) {               
        return {
          ...state,
          objectMapControls: payload,
          isFetching: false,
        };
      },
      [GET_OBJECT_MAP_CONTROL_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_NEW_DASH_OBS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          obsWidgetData: payload,
          isFetching: false,
        };
      },
      [GET_NEW_DASH_OBS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_OBS_STATUS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          obsStatus: payload,
          isFetching: false,
        };
      },
      [GET_OBS_STATUS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_COMMUNITY_EXPLORATION_SUCCESS](state, { payload }) {               
        return {
          ...state,
          communityExploration: payload,
          isFetching: false,
        };
      },
      [GET_COMMUNITY_EXPLORATION_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_COMMUNITY_FAME_SUCCESS](state, { payload }) {               
        return {
          ...state,
          communityFame: payload,
          isFetching: false,
        };
      },
      [GET_COMMUNITY_FAME_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_MY_RANK_SUCCESS](state, { payload }) {               
        return {
          ...state,
          myRank: payload,
          isFetching: false,
        };
      },
      [GET_MY_RANK_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_TOP_MEMBERS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          topMembers: payload,
          isFetching: false,
        };
      },
      [GET_TOP_MEMBERS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_TOP_STUDENTS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          topStudents: payload,
          isFetching: false,
        };
      },
      [GET_TOP_STUDENTS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_MOST_ACTIVE_CLUBS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          mostActiveClubs: payload,
          isFetching: false,
        };
      },
      [GET_MOST_ACTIVE_CLUBS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_TOP_SCHOOL_CLUBS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          topSchoolClubs: payload,
          isFetching: false,
        };
      },
      [GET_TOP_SCHOOL_CLUBS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_GRAVITY_BY_DOMAIN_SUCCESS](state, { payload }) {               
        return {
          ...state,
          gravityByDomain: payload,
          isFetching: false,
        };
      },
      [GET_GRAVITY_BY_DOMAIN_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_DASHBOARD_MISSION_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          dashboardMissionList: payload,
          isFetching: false,
        };
      },
      [GET_DASHBOARD_MISSION_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_PHOTO_HUB_HEADING_SUCCESS](state, { payload }) {               
        return {
          ...state,
          photoHubHeadings: payload,
          isFetching: false,
        };
      },
      [GET_PHOTO_HUB_HEADING_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [STORE_TOP_NAV_RESPONSE](state, { data }) {    
        return {
          ...state,
          topNav: data,
        };
      },
});


