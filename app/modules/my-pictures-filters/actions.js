import axios from 'axios';
import {
  fetchMissionCount,
  fetchMyPicturesCount,
  fetchPhotoRoll,
  fetchMissions,
  fetchMissionPhotos,
} from '../my-pictures/actions';
import {
  fetchGalleriesCount,
  fetchGalleries
} from '../my-pictures-galleries/actions';
import {
  fetchGalleryPictures
} from '../my-pictures-gallery-pictures/actions';

export const FETCH_FILTERS_LISTS_START = 'FETCH_FILTERS_LISTS_START';
export const FETCH_FILTERS_LISTS_SUCCESS = 'FETCH_FILTERS_LISTS_SUCCESS';
export const FETCH_FILTERS_LISTS_FAIL = 'FETCH_FILTERS_LISTS_FAIL';
export const UPDATE_ALL_FILTERS = 'UPDATE_ALL_FILTERS';
export const UPDATE_BY_OBJECT_FILTER = 'UPDATE_BY_OBJECT_FILTER';
export const RESET_OBJECT_TYPE_FILTER = 'RESET_OBJECT_TYPE_FILTER';
export const SET_SELECTED_TAGS_TAB_INDEX = 'SET_SELECTED_TAGS_TAB_INDEX';
export const TOGGLE_FILTER_MENU = 'TOGGLE_FILTER_MENU';
export const SET_CAL_MONTH = 'SET_CAL_MONTH';

export const updateAllFilters = payload => ({
  type: UPDATE_ALL_FILTERS,
  payload,
});

const fetchFiltersListsStart = () => ({
  type: FETCH_FILTERS_LISTS_START,
});

const fetchFiltersListsSuccess = payload => ({
  type: FETCH_FILTERS_LISTS_SUCCESS,
  payload,
});

const fetchFiltersListsFail = payload => ({
  type: FETCH_FILTERS_LISTS_FAIL,
  payload,
});

export const fetchFiltersLists = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchFiltersListsStart());

  return axios.post('/api/images/getFiltersLists', {
    at,
    token,
    cid,
  })
  .then(result => dispatch(fetchFiltersListsSuccess(result.data)))
  .catch(error => dispatch(fetchFiltersListsFail(error)));
};

export const setFilters = (payload, { page, galleryId, scheduledMissionId }) => (dispatch) => {
  dispatch(updateAllFilters(payload));
  dispatch(fetchMissionCount());
  dispatch(fetchMyPicturesCount());
  dispatch(fetchGalleriesCount());// for deeplinking

  if (page === 'photoRoll') {
    dispatch(fetchPhotoRoll({}));
  } else if (page === 'missions') {
    dispatch(fetchMissions({}));
  } else if (page === 'missionImages') {
    dispatch(fetchMissionPhotos({
      scheduledMissionId,
    }));
  } else if (page === 'galleries') {
    dispatch(fetchGalleries({}));
  } else if (page === 'galleryImages') {
    dispatch(fetchGalleryPictures({
      galleryId,
    }));
  }
};

export const setSelectedTagsTabIndex = payload => dispatch => (dispatch({
  type: SET_SELECTED_TAGS_TAB_INDEX,
  payload,
}));

export const toggleFilterMenuDisplay = payload => dispatch => (dispatch({
  type: TOGGLE_FILTER_MENU,
  payload,
}));

export const setCurrentVisibleCalMonth = payload => dispatch => (dispatch({
  type: SET_CAL_MONTH,
  payload,
}));
