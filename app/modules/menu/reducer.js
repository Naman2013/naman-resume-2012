import createReducer from '../utils/createReducer';
import {
  MENU_SUBMENU_ACTIVATE,
  MENU_SUBMENU_DEACTIVATE,
  MENU_LOAD_NAV,
  MENU_LOAD_NAV_SUCCESS,
  MENU_LOAD_NAV_FAILURE,
} from './actions';

const initialState = {
  isActive: false,
  activeMenuIndex: null,
  menuList: [],
  menuListIsFetched: false,
  menuListFetchError: null,
};

export default createReducer(initialState, {
  [MENU_SUBMENU_ACTIVATE](state, { index }) {
    /**
      TODO: rebuild the left menu to handle all use cases
      index 0 === home, there are no child navigation elements
    */
    return {
      ...state,
      isActive: true,
      activeMenuIndex: index,
    };
  },
  [MENU_SUBMENU_DEACTIVATE](state) {
    return {
      ...state,
      isActive: false,
      activeMenuIndex: null,
    };
  },
  [MENU_LOAD_NAV](state) {
    return {
      ...state,
      menuListIsFetched: true,
      menuListFetchError: null,
    };
  },
  [MENU_LOAD_NAV_SUCCESS](state, { payload }) {
    const { menuList } = payload;
    return {
      ...state,
      menuListIsFetched: false,
      menuList,
    };
  },
  [MENU_LOAD_NAV_FAILURE](state, { error }) {
    return {
      ...state,
      menuListIsFetched: false,
      menuListFetchError: error,
    };
  },
});
