import { validateResponseAccess } from "../authorization/actions";
import { logout } from "../User";
import {fetchStartPartyList, getUserGravityStatus, 
        getMyPictures, getDashboardFeaturedObjects, getMyClubList, getBookmarksList, getPrivateProfile, getPrivateProfileMission, getUserActiveObject, getUserPouplarObservation, getMissionImages, getGalleryList, getRecentGravityActions, getWeatherActions, getSkyRating, getObservatoryList, getQuestMapControls, getNewDahObs, getObsStatus, getObjectMapControls, getCommunityExploration, getCommunityFame, getMyRank, getTopMembers, getTopSchoolClubs, getMostActiveClubs, getGravityByDomain, getTopStudents, getDashboardMissionList, getPhotoHubHeadings} from "./dashboardApi";

export const FETCH_STAR_PARTY_LIST_START = "FETCH_START_PARTY_LIST_START";
export const FETCH_STAR_PARTY_LIST_SUCCESS = "FETCH_START_PARTY_LIST_SUCCESS";
export const GET_USER_GRAVITY_STATUS_START = "GET_USER_GRAVITY_STATUS_START";
export const GET_USER_GRAVITY_STATUS_SUCCESS = "GET_USER_GRAVITY_STATUS_SUCCESS";
export const GET_MY_PICTURES_START = "GET_MY_PICTURES_START";
export const GET_MY_PICTURES_SUCCESS = "GET_MY_PICTURES_SUCCESS";
export const GET_DASHBOARD_FEATURED_OBJECTS_START = "GET_DASHBOARD_FEATURED_OBJECTS_START";
export const GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS = "GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS";
export const GET_MY_CLUB_LIST_START = "GET_MY_CLUB_LIST_START";
export const GET_MY_CLUB_LIST_SUCCESS = "GET_MY_CLUB_LIST_SUCCESS";
export const GET_BOOKMARK_LIST_START = "GET_BOOKMARK_LIST_START";
export const GET_BOOKMARK_LIST_SUCCESS = "GET_BOOKMARK_LIST_SUCCESS";
export const GET_PRIVATE_PROFILE_START = "GET_PRIVATE_PROFILE_START";
export const GET_PRIVATE_PROFILE_SUCCESS = "GET_PRIVATE_PROFILE_SUCCESS";
export const GET_PRIVATE_PROFILE_MISSION_START = "GET_PRIVATE_PROFILE_MISSION_START";
export const GET_PRIVATE_PROFILE_MISSION_SUCCESS = "GET_PRIVATE_PROFILE_MISSION_SUCCESS";
export const GET_USER_ACTIVE_OBJECT_START = "GET_USER_ACTIVE_OBJECT_START";
export const GET_USER_ACTIVE_OBJECT_SUCCESS = "GET_USER_ACTIVE_OBJECT_SUCCESS";
export const GET_USER_POPULAR_OBSERVATIONS_START = "GET_USER_POPULAR_OBSERVATIONS_START";
export const GET_USER_POPULAR_OBSERVATIONS_SUCCESS = "GET_USER_POPULAR_OBSERVATIONS_SUCCESS";
export const GET_MISSION_IMAGES_START = "GET_MISSION_IMAGES_START";
export const GET_MISSION_IMAGES_SUCCESS = "GET_MISSION_IMAGES_SUCCESS";
export const GET_GALLERY_LIST_START = "GET_GALLERY_LIST_START";
export const GET_GALLERY_LIST_SUCCESS = "GET_GALLERY_LIST_SUCCESS";
export const GET_RECENT_GRAVITY_ACTION_START = "GET_RECENT_GRAVITY_ACTION_START";
export const GET_RECENT_GRAVITY_ACTION_SUCCESS = "GET_RECENT_GRAVITY_ACTION_SUCCESS";
export const GET_WEATHER_ACTION_START = "GET_WEATHER_ACTION_START";
export const GET_WEATHER_ACTION_SUCCESS = "GET_WEATHER_ACTION_SUCCESS";
export const GET_SKY_CONDITIONS_START = "GET_SKY_CONDITIONS_START";
export const GET_SKY_CONDITIONS_SUCCESS = "GET_SKY_CONDITIONS_SUCCESS";
export const GET_OBSERVATORY_LIST_START = "GET_OBSERVATORY_LIST_START";
export const GET_OBSERVATORY_LIST_SUCCESS = "GET_OBSERVATORY_LIST_SUCCESS";
export const GET_QUEST_MAP_CONTROL_START = "GET_QUEST_MAP_CONTROL_START";
export const GET_QUEST_MAP_CONTROL_SUCCESS = "GET_QUEST_MAP_CONTROL_SUCCESS";
export const GET_OBJECT_MAP_CONTROL_START = "GET_OBJECT_MAP_CONTROL_START";
export const GET_OBJECT_MAP_CONTROL_SUCCESS = "GET_OBJECT_MAP_CONTROL_SUCCESS";
export const GET_NEW_DASH_OBS_START = "GET_NEW_DASH_OBS_START";
export const GET_NEW_DASH_OBS_SUCCESS = "GET_NEW_DASH_OBS_SUCCESS";
export const GET_OBS_STATUS_START = "GET_OBS_STATUS_START";
export const GET_OBS_STATUS_SUCCESS = "GET_OBS_STATUS_SUCCESS";
export const GET_COMMUNITY_EXPLORATION_START = "GET_COMMUNITY_EXPLORATION_START";
export const GET_COMMUNITY_EXPLORATION_SUCCESS = "GET_COMMUNITY_EXPLORATION_SUCCESS";
export const GET_COMMUNITY_FAME_START = "GET_COMMUNITY_FAME_START";
export const GET_COMMUNITY_FAME_SUCCESS = "GET_COMMUNITY_FAME_SUCCESS";
export const GET_MY_RANK_START = "GET_MY_RANK_START";
export const GET_MY_RANK_SUCCESS = "GET_MY_RANK_SUCCESS";
export const GET_TOP_MEMBERS_START = "GET_TOP_MEMBERS_START";
export const GET_TOP_MEMBERS_SUCCESS = "GET_TOP_MEMBERS_SUCCESS";
export const GET_TOP_STUDENTS_START = "GET_TOP_STUDENTS_START";
export const GET_TOP_STUDENTS_SUCCESS = "GET_TOP_STUDENTS_SUCCESS";
export const GET_MOST_ACTIVE_CLUBS_START = "GET_MOST_ACTIVE_CLUBS_START";
export const GET_MOST_ACTIVE_CLUBS_SUCCESS = "GET_MOST_ACTIVE_CLUBS_SUCCESS";
export const GET_TOP_SCHOOL_CLUBS_START = "GET_TOP_SCHOOL_CLUBS_START";
export const GET_TOP_SCHOOL_CLUBS_SUCCESS = "GET_TOP_SCHOOL_CLUBS_SUCCESS";
export const GET_GRAVITY_BY_DOMAIN_START = "GET_GRAVITY_BY_DOMAIN_START";
export const GET_GRAVITY_BY_DOMAIN_SUCCESS = "GET_GRAVITY_BY_DOMAIN_SUCCESS";
export const GET_DASHBOARD_MISSION_LIST_START = "GET_DASHBOARD_MISSION_LIST_START";
export const GET_DASHBOARD_MISSION_LIST_SUCCESS = "GET_DASHBOARD_MISSION_LIST_SUCCESS";
export const GET_PHOTO_HUB_HEADING_START = "GET_PHOTO_HUB_HEADING_START";
export const GET_PHOTO_HUB_HEADING_SUCCESS = "GET_PHOTO_HUB_HEADING_SUCCESS";
export const STORE_TOP_NAV_RESPONSE = "STORE_TOP_NAV_RESPONSE";

let profileTimer = null;

const fetchStartPartyListStart = () => ({
    type: FETCH_STAR_PARTY_LIST_START    
});

const fetchStartPartyListSuccess = (payload) => ({
    type: FETCH_STAR_PARTY_LIST_SUCCESS,
    payload    
});

const getUserGravityStatusStart = () => ({
  type: GET_USER_GRAVITY_STATUS_START    
});

const getUserGravityStatusSuccess = (payload) => ({
  type: GET_USER_GRAVITY_STATUS_SUCCESS,
  payload    
});

const getMyPicturesStart = () => ({
  type: GET_MY_PICTURES_START    
});

const getMyPicturesSuccess = (payload) => ({
  type: GET_MY_PICTURES_SUCCESS,
  payload    
});

const getDashboardFeaturedObjectsStart = () => ({
  type: GET_DASHBOARD_FEATURED_OBJECTS_START    
});

const getDashboardFeaturedObjectsSuccess = (payload) => ({
  type: GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS,
  payload    
});

const getMyClubListStart = () => ({
  type: GET_MY_CLUB_LIST_START    
});

const getMyClubListSuccess = (payload) => ({
  type: GET_MY_CLUB_LIST_SUCCESS,
  payload    
});

const getBookmarkListStart = () => ({
  type: GET_BOOKMARK_LIST_START    
});

const getBookmarkListSuccess = (payload) => ({
  type: GET_BOOKMARK_LIST_SUCCESS,
  payload    
});

const getPrivateProfileStart = () => ({
  type: GET_PRIVATE_PROFILE_START    
});

const getPrivateProfileSuccess = (payload) => ({
  type: GET_PRIVATE_PROFILE_SUCCESS,
  payload    
});

const getPrivateProfileMissionStart = () => ({
  type: GET_PRIVATE_PROFILE_MISSION_START    
});

const getPrivateProfileMissionSuccess = (payload) => ({
  type: GET_PRIVATE_PROFILE_MISSION_SUCCESS,
  payload    
});

const getUserActiveObjectStart = () => ({
  type: GET_USER_ACTIVE_OBJECT_START    
});

const getUserActiveObjectSuccess = (payload) => ({
  type: GET_USER_ACTIVE_OBJECT_SUCCESS,
  payload    
});

const getUserPopularObservationStart = () => ({
  type: GET_USER_POPULAR_OBSERVATIONS_START    
});

const getUserPopularObservationSuccess = (payload) => ({
  type: GET_USER_POPULAR_OBSERVATIONS_SUCCESS,
  payload    
});

const getMissionImagesStart = () => ({
  type: GET_MISSION_IMAGES_START    
});

const getMissionImagesSuccess = (payload) => ({
  type: GET_MISSION_IMAGES_SUCCESS,
  payload    
});

const getGalleryListStart = () => ({
  type: GET_GALLERY_LIST_START    
});

const getGalleryListSuccess = (payload) => ({
  type: GET_GALLERY_LIST_SUCCESS,
  payload    
});

const getRecentGravityActionsStart = () => ({
  type: GET_RECENT_GRAVITY_ACTION_START    
});

const getRecentGravityActionsSuccess = (payload) => ({
  type: GET_RECENT_GRAVITY_ACTION_SUCCESS,
  payload    
});

const getWeatherSuccess = (payload) => ({
  type: GET_WEATHER_ACTION_SUCCESS,
  payload    
});

const getWeatherStart = () => ({
  type: GET_WEATHER_ACTION_START    
});

const getSkyConditionsStart = () => ({
  type: GET_SKY_CONDITIONS_START    
});

const getSkyConditionsSuccess = (payload) => ({
  type: GET_SKY_CONDITIONS_SUCCESS,
  payload    
});

const getObservatoryListStart = () => ({
  type: GET_OBSERVATORY_LIST_START    
});

const getObservatoryListSuccess = (payload) => ({
  type: GET_OBSERVATORY_LIST_SUCCESS,
  payload    
});

const getQuestMapControlStart = () => ({
  type: GET_QUEST_MAP_CONTROL_START    
});

const getQuestMapControlSuccess = (payload) => ({
  type: GET_QUEST_MAP_CONTROL_SUCCESS,
  payload    
});

const getObjectMapControlStart = () => ({
  type: GET_OBJECT_MAP_CONTROL_START    
});

const getObjectMapControlSuccess = (payload) => ({
  type: GET_OBJECT_MAP_CONTROL_SUCCESS,
  payload    
});

const getNewDashObsStart = () => ({
  type: GET_NEW_DASH_OBS_START    
});

const getNewDashObsSuccess = (payload) => ({
  type: GET_NEW_DASH_OBS_SUCCESS,
  payload    
});

const getObsStatusStart = () => ({
  type: GET_OBS_STATUS_START    
});

const getObsStatusSuccess = (payload) => ({
  type: GET_OBS_STATUS_SUCCESS,
  payload    
});

const getCommunityObservationStart = () => ({
  type: GET_COMMUNITY_EXPLORATION_START    
});

const getCommunityExplorationSuccess = (payload) => ({
  type: GET_COMMUNITY_EXPLORATION_SUCCESS,
  payload    
});

const getCommunityFameStart = () => ({
  type: GET_COMMUNITY_FAME_START    
});

const getCommunityFameSuccess = (payload) => ({
  type: GET_COMMUNITY_FAME_SUCCESS,
  payload    
});

const getMyRankStart = () => ({
  type: GET_MY_RANK_START    
});

const getMyRankSuccess = (payload) => ({
  type: GET_MY_RANK_SUCCESS,
  payload    
});

const getTopMembersStart = () => ({
  type: GET_TOP_MEMBERS_START    
});

const getTopMembersSuccess = (payload) => ({
  type: GET_TOP_MEMBERS_SUCCESS,
  payload    
});

const getTopStudentsStart = () => ({
  type: GET_TOP_STUDENTS_START    
});

const getTopStudentsSuccess = (payload) => ({
  type: GET_TOP_STUDENTS_SUCCESS,
  payload    
});

const getMostActiveClubsStart = () => ({
  type: GET_MOST_ACTIVE_CLUBS_START    
});

const getMostActiveClubsSuccess = (payload) => ({
  type: GET_MOST_ACTIVE_CLUBS_SUCCESS,
  payload    
});

const getTopSchoolClubsStart = () => ({
  type: GET_TOP_SCHOOL_CLUBS_START    
});

const getTopSchoolClubsSuccess = (payload) => ({
  type: GET_TOP_SCHOOL_CLUBS_SUCCESS,
  payload    
});

const getGravityByDomainStart = () => ({
  type: GET_GRAVITY_BY_DOMAIN_START    
});

const getGravityByDomainSuccess = (payload) => ({
  type: GET_GRAVITY_BY_DOMAIN_SUCCESS,
  payload    
});

const getDashboardMissionListStart = () => ({
  type: GET_DASHBOARD_MISSION_LIST_START    
});

const getDashboardMissionListSuccess = (payload) => ({
  type: GET_DASHBOARD_MISSION_LIST_SUCCESS,
  payload    
});

const getPhotoHubHeadingStart = () => ({
  type: GET_PHOTO_HUB_HEADING_START    
});

const getPhotoHubHeadingSuccess = (payload) => ({
  type: GET_PHOTO_HUB_HEADING_SUCCESS,
  payload    
});

var error = false;

export const errorHandling = (data) => (dispatch) => {
  if(!error){
    error=true;
    dispatch(validateResponseAccess(data));
  }
}

export const fetchStarPartyDataAction = () => (dispatch) => {
    dispatch(fetchStartPartyListStart());
    return fetchStartPartyList({}).then(
      result => {          
        dispatch(fetchStartPartyListSuccess(result.data));
      }
    );
  }

  export const getUserGravityDataAction = () => (dispatch, getState) => {
    dispatch(getUserGravityStatusStart());
    const { token, at, cid } = getState().user;
    return getUserGravityStatus({
      token,
      at,
      cid,
    }).then(
      result => { 
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else{
          const duration = (res.expires - res.timestamp) * 1000;
          if(profileTimer !== null)
            clearTimeout(profileTimer);
          if(duration>1000)
            profileTimer=setTimeout(()=>dispatch(getUserGravityDataAction()), duration);
          dispatch(getUserGravityStatusSuccess(result.data));
        }        
      }
    )
  }

  export const getMyPicturesDataAction = (data) => (dispatch, getState) => {
    dispatch(getMyPicturesStart());
    const { token, at, cid } = getState().user;
    const { selectedFilters } = getState().myPicturesFilters;
    return getMyPictures({
      token,
      at,
      cid,
      ...selectedFilters,
      ...data
    }).then(
      result => { 
        const res= result.data;        
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getMyPicturesSuccess(result.data));
      }
    )
  }

  export const getDashboardFeaturedObjectsDataAction = (data) => (dispatch, getState) => {
    dispatch(getDashboardFeaturedObjectsStart());
    const { token, at, cid } = getState().user;
    return getDashboardFeaturedObjects({
      token,
      at,
      cid,
      ...data,      
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getDashboardFeaturedObjectsSuccess(result.data));
      }
    )
  };

  export const getMyClubListDataAction = (data) => (dispatch, getState) => {
    dispatch(getMyClubListStart());
    const { token, at, cid } = getState().user;
    return getMyClubList({
      token,
      at,
      cid, 
      ...data,     
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getMyClubListSuccess(result.data));
      }
    )
  };

  export const getBookmarkListDataAction = (data) => (dispatch, getState) => {
    dispatch(getBookmarkListStart());
    const { token, at, cid } = getState().user;
    return getBookmarksList({
      token,
      at,
      cid, 
      ...data,     
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getBookmarkListSuccess(result.data));
      }
    )
  };

  export const getPrivateProfileDataAction = () => (dispatch, getState) => {
    dispatch(getPrivateProfileStart());
    const { token, at, cid } = getState().user;
    return getPrivateProfile({
      token,
      at,
      cid,           
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getPrivateProfileSuccess(result.data));
      }
    )
  };

  export const getPrivateProfileMissionDataAction = () => (dispatch, getState) => {
    dispatch(getPrivateProfileMissionStart());
    const { token, at, cid } = getState().user;
    return getPrivateProfileMission({
      token,
      at,
      cid,           
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getPrivateProfileMissionSuccess(result.data));
      }
    )
  };

  export const getUserActiveObjectDataAction = () => (dispatch, getState) => {
    dispatch(getUserActiveObjectStart());
    const { token, at, cid } = getState().user;
    return getUserActiveObject({
      token,
      at,
      cid,           
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getUserActiveObjectSuccess(result.data));
      }
    )
  };

  export const getUserPopularObservationDataAction = () => (dispatch, getState) => {
    dispatch(getUserPopularObservationStart());
    const { token, at, cid } = getState().user;
    return getUserPouplarObservation({
      token,
      at,
      cid,           
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getUserPopularObservationSuccess(result.data));
      }
    )
  };

  export const getMissionImagesDataAction = (data) => (dispatch, getState) => {
    dispatch(getMissionImagesStart());
    const { token, at, cid } = getState().user;
    const { selectedFilters } = getState().myPicturesFilters;
    return getMissionImages({
      token,
      at,
      cid,
      ...selectedFilters,
      ...data,           
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getMissionImagesSuccess(result.data));
      }
    )
  };

  export const getGalleryListDataAction = (data) => (dispatch, getState) => {
    dispatch(getGalleryListStart());
    const { token, at, cid } = getState().user;
    const { selectedFilters } = getState().myPicturesFilters;
    return getGalleryList({
      token,
      at,
      cid,
      ...selectedFilters,
      ...data,           
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getGalleryListSuccess(result.data));
      }
    )
  };

  export const getRecentGravityDataAction = (data) => (dispatch, getState) => {
    dispatch(getRecentGravityActionsStart());
    const { token, at, cid } = getState().user;
    return getRecentGravityActions({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getRecentGravityActionsSuccess(result.data));
      }
    )
  };

  export const getWeatherDataAction = (data) => (dispatch, getState) => {
    dispatch(getWeatherStart());    
    const { token, at, cid } = getState().user;    
    return getWeatherActions({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getWeatherSuccess(result.data));
      }
    )
  };

  export const getSkyAction = (data) => (dispatch, getState) => {    
    dispatch(getSkyConditionsStart());
    const { token, at, cid } = getState().user;
    return getSkyRating({token, at, cid, ...data}).then(result=>{
      const res= result.data;
      if(res.apiError)
          dispatch(errorHandling(res));
        else  
        dispatch(getSkyConditionsSuccess(result.data));
    })    
  };

  export const getObservatoryListAction = (data) => (dispatch, getState) => {
    dispatch(getObservatoryListStart());    
    const { token, at, cid } = getState().user;    
    return getObservatoryList({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {        
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getObservatoryListSuccess(result.data));
      }
    )
  };

  export const getQuestMapControlAction = (data) => (dispatch, getState) => {
    dispatch(getQuestMapControlStart());    
    const { token, at, cid } = getState().user;    
    return getQuestMapControls({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {  
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else      
          dispatch(getQuestMapControlSuccess(result.data));
      }
    )
  };

  export const getObjectMapControlAction = (data) => (dispatch, getState) => {
    dispatch(getObjectMapControlStart());    
    const { token, at, cid } = getState().user;    
    return getObjectMapControls({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {        
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getObjectMapControlSuccess(result.data));
      }
    )
  };

  export const getNewDashObsAction = (data) => (dispatch, getState) => {
    dispatch(getNewDashObsStart());    
    const { token, at, cid } = getState().user;    
    return getNewDahObs({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {     
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getNewDashObsSuccess(result.data));
      }
    )
  };

  export const getObsStatusAction = (data) => (dispatch, getState) => {
    dispatch(getObsStatusStart());   
        
    return getObsStatus(data).then(
      result => {        
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getObsStatusSuccess(result.data));
      }
    )
  };

  export const getCommunityExplorationAction = (data) => (dispatch, getState) => {
    dispatch(getCommunityObservationStart());    
    const { token, at, cid } = getState().user;    
    return getCommunityExploration({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {      
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getCommunityExplorationSuccess(result.data));
      }
    )
  };

  export const getCommunityFameAction = (data) => (dispatch, getState) => {
    dispatch(getCommunityFameStart());    
    const { token, at, cid } = getState().user;    
    return getCommunityFame({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {      
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getCommunityFameSuccess(result.data));
      }
    )
  };

  export const getMyRankAction = (data) => (dispatch, getState) => {
    dispatch(getMyRankStart());    
    const { token, at, cid } = getState().user;    
    return getMyRank({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {      
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getMyRankSuccess(result.data));        
      }
    )
  };

  export const getTopMembersAction = (data) => (dispatch, getState) => {
    dispatch(getTopMembersStart());    
    const { token, at, cid } = getState().user;    
    return getTopMembers({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {   
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getTopMembersSuccess(result.data));        
      }
    )
  };

  export const getTopStudentsAction = (data) => (dispatch, getState) => {
    dispatch(getTopStudentsStart());    
    const { token, at, cid } = getState().user;    
    return getTopStudents({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {       
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getTopStudentsSuccess(result.data));        
      }
    )
  };

  export const getMostActiveClubsAction = (data) => (dispatch, getState) => {
    dispatch(getMostActiveClubsStart());    
    const { token, at, cid } = getState().user;    
    return getMostActiveClubs({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {        
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getMostActiveClubsSuccess(result.data));        
      }
    )
  };

  export const getTopSchoolClubsAction = (data) => (dispatch, getState) => {
    dispatch(getTopSchoolClubsStart());    
    const { token, at, cid } = getState().user;    
    return getTopSchoolClubs({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {    
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getTopSchoolClubsSuccess(result.data));        
      }
    )
  };

  export const getGravityByDomainAction = (data) => (dispatch, getState) => {
    dispatch(getGravityByDomainStart());    
    const { token, at, cid } = getState().user;    
    return getGravityByDomain({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {       
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else  
          dispatch(getGravityByDomainSuccess(result.data));
      }
    )
  };

  export const getDashboardMissionListAction = (data) => (dispatch, getState) => {
    dispatch(getDashboardMissionListStart());    
    const { token, at, cid } = getState().user;    
    return getDashboardMissionList({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {        
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else        
          dispatch(getDashboardMissionListSuccess(result.data));
      }
    )
  };

  export const getPhotoHubHeadingAction = (data) => (dispatch, getState) => {
    dispatch(getPhotoHubHeadingStart());    
    const { token, at, cid } = getState().user;      
    return getPhotoHubHeadings({
      token,
      at,
      cid,
      ...data,           
    }).then(
      result => {     
        const res= result.data;
        if(res.apiError)
          dispatch(errorHandling(res));
        else         
          dispatch(getPhotoHubHeadingSuccess(result.data));
      }
    )
  };

  export const storeTopNavResponse = (data) => (dispatch) => {
    dispatch({
      type: STORE_TOP_NAV_RESPONSE,
      data    
    });
  }