import { cloneDeep } from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_FILTERS_LISTS_START,
  FETCH_FILTERS_LISTS_SUCCESS,
  UPDATE_ALL_FILTERS,
  SET_SELECTED_TAGS_TAB_INDEX,
  TOGGLE_FILTER_MENU,
  RESET_ALL_FILTERS,
} from './actions';

const initialState = {
  fetching: false,
  filterMenuIsOpen: false,
  selectedTagsTabIndex: 0,
  dates: {
    datesList: []
  },
  pictureUserTags: {
    tagsList: [],
  },
  pictureSystemTags: {},
  missionUserTags: {
    tagsList: []
  },
  missionSystemTags: {
    tagsList: []
  },
  times: {
    timesList: []
  },
  telescopes: {
    telescopesList: [],
  },
  error: false,
  errorBody: {},
  selectedFilters: {
    dateFilter: '',
    pierNumber: null,
    observatoryId: null,
    filterType: '',
    timeFilter: null,
    pictureUserTags: [],
    missionUserTags: [],
    missionSystemTags: []
  },
};

export default createReducer(initialState, {
  [UPDATE_ALL_FILTERS](state, { payload }) {
    return {
      ...state,
      selectedFilters: Object.assign(cloneDeep(state.selectedFilters), payload),
    };
  },
  [FETCH_FILTERS_LISTS_START](state) {
    return {
      ...state,
      fetching: true,
      error: false,
      errorBody: {},
    };
  },
  [FETCH_FILTERS_LISTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      ...payload,
      error: false,
      errorBody: {},
    };
  },
  [SET_SELECTED_TAGS_TAB_INDEX](state, { payload }) {
    return {
      ...state,
      selectedTagsTabIndex: payload.index,
    };
  },
  [TOGGLE_FILTER_MENU](state, { payload }) {
    return {
      ...state,
      filterMenuIsOpen: payload.filterMenuIsOpen,
    };
  },
});
