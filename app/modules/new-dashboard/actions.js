import {fetchStartPartyList, getUserGravityStatus, 
        getMyPictures, getDashboardFeaturedObjects, getMyClubList, getBookmarksList, getPrivateProfile} from "./dashboardApi";

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
      cid: 183054
    }).then(
      result => {          
        dispatch(getUserGravityStatusSuccess(result.data));
      }
    );
  };

  export const getMyPicturesDataAction = (data) => (dispatch, getState) => {
    dispatch(getMyPicturesStart());
    const { token, at, cid } = getState().user;
    return getMyPictures({
      token,
      at,
      cid,
      ...data
    }).then(
      result => {
        dispatch(getMyPicturesSuccess(result.data));
      }
    );
  };

  export const getDashboardFeaturedObjectsDataAction = () => (dispatch, getState) => {
    dispatch(getDashboardFeaturedObjectsStart());
    const { token, at, cid } = getState().user;
    return getDashboardFeaturedObjects({
      token,
      at,
      cid,      
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