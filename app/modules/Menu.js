import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import superagent from '../utils/superagent';


/**
  TODO:
  temporarily pull in the nav.json locally
  once the API is available, replace the static
  file with the call to the service
*/
import temporaryNavJSON from '../nav.js';

const MENU_SUBMENU_ACTIVATE = 'MENU_SUBMENU_ACTIVATE';
const MENU_SUBMENU_DEACTIVATE = 'MENU_SUBMENU_DEACTIVATE';
const MENU_LOAD_NAV = 'MENU_LOAD_NAV';
const MENU_LOAD_NAV_SUCCESS = 'MENU_LOAD_NAV_SUCCESS';
const MENU_LOAD_NAV_SUCCESS_FAILURE = 'MENU_LOAD_NAV_SUCCESS_FAILURE';

const initialState = {
  isActive: false,
  activeMenuIndex: null,
  menuItems: [],
  menuItemsIsFetched: false,
  menuItemsFetchError: null,
};

export default createReducer(initialState, {
  [MENU_SUBMENU_ACTIVATE](state, { index }) {
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
      menuItemsIsFetched: true,
      menuItemsFetchError: null,
    };
  },
  [MENU_LOAD_NAV_SUCCESS](state, { response }) {
    return {
      ...state,
      menuItemsIsFetched: false,
      menuItems: response,
    };
  },
  [MENU_LOAD_NAV_SUCCESS_FAILURE](state, { error }) {
    return {
      ...state,
      menuItemsIsFetched: false,
      menuItemsFetchError: error,
    };
  },
});

export const activateMenu = createAction(MENU_SUBMENU_ACTIVATE, 'index');
export const deactivateMenu = createAction(MENU_SUBMENU_DEACTIVATE);

export function fetchMenuItems() {
  return {
    types: [MENU_LOAD_NAV, MENU_LOAD_NAV_SUCCESS, MENU_LOAD_NAV_SUCCESS_FAILURE],
    callAPI: async () => {
      // const { status, body, text } = await superagent.get('dist/nav.json');
      //
      // if (status >= 400) {
      //   throw new Error(body || text);
      // }
      //
      // return body;
      return temporaryNavJSON;
    },
  };
}
