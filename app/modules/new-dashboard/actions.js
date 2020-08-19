import {fetchStartPartyList, getUserGravityStatus, 
        getMyPictures, getDashboardFeaturedObjects, getMyClubList, getBookmarksList, getPrivateProfile, getPrivateProfileMission, getUserActiveObject, getUserPouplarObservation, getMissionImages, getGalleryList, getRecentGravityActions, getWeatherActions, getSkyRating, getObservatoryList, getQuestMapControls, getNewDahObs, getObsStatus} from "./dashboardApi";

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
export const GET_NEW_DASH_OBS_START = "GET_NEW_DASH_OBS_START";
export const GET_NEW_DASH_OBS_SUCCESS = "GET_NEW_DASH_OBS_SUCCESS";
export const GET_OBS_STATUS_START = "GET_OBS_STATUS_START";
export const GET_OBS_STATUS_SUCCESS = "GET_OBS_STATUS_SUCCESS";

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

export const fetchStarPartyDataAction = () => (dispatch) => {
    dispatch(fetchStartPartyListStart());
    return fetchStartPartyList({}).then(
      result => {          
        dispatch(fetchStartPartyListSuccess(result.data));
      }
    );
  };

  export const getUserGravityDataAction = () => (dispatch, getState) => {
    dispatch(getUserGravityStatusStart());
    const { token, at, cid } = getState().user;
    return getUserGravityStatus({
      token,
      at,
      cid,
    }).then(
      result => {          
        dispatch(getUserGravityStatusSuccess(result.data));
      }
    );
  };

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
        dispatch(getMyPicturesSuccess(result.data));
      }
    );
  };

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
        dispatch(getDashboardFeaturedObjectsSuccess(result.data));
      }
    );
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
        dispatch(getMyClubListSuccess(result.data));
      }
    );
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
        dispatch(getBookmarkListSuccess(result.data));
      }
    );
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
        dispatch(getPrivateProfileSuccess(result.data));
      }
    );
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
        dispatch(getPrivateProfileMissionSuccess(result.data));
      }
    );
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
        dispatch(getUserActiveObjectSuccess(result.data));
      }
    );
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
        dispatch(getUserPopularObservationSuccess(result.data));
      }
    );
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
        dispatch(getMissionImagesSuccess(result.data));
      }
    );
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
        dispatch(getGalleryListSuccess(result.data));
      }
    );
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
        dispatch(getRecentGravityActionsSuccess(result.data));
      }
    );
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
        dispatch(getWeatherSuccess(result.data));
      }
    );
  };

  export const getSkyAction = (data) => (dispatch, getState) => {    
    dispatch(getSkyConditionsStart());
    const { token, at, cid } = getState().user;
    return getSkyRating({token, at, cid, ...data}).then(result=>{
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
        dispatch(getObservatoryListSuccess(result.data));
      }
    );
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
        dispatch(getQuestMapControlSuccess(result.data));
      }
    );
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
        dispatch(getNewDashObsSuccess(result.data));
      }
    );
  };

  export const getObsStatusAction = (data) => (dispatch, getState) => {
    dispatch(getObsStatusStart());   
        
    return getObsStatus(
     data,           
    ).then(
      result => {        
        dispatch(getObsStatusSuccess(result.data));
      }
    );
  };