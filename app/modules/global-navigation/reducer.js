import createReducer from '../utils/createReducer';
import MENU_INTERFACE from 'components/GlobalNavigation/Menus/MenuInterface';
import {
  CLOSE_ALL_GLOBAL_NAV_MENUS,
  TOGGLE_GLOBAL_NAV_MENU,
  TOGGLE_GLOBAL_NAV_NOTIFICATION_MENU,
} from './actions';

const initialState = {
  isLeftOpen: false,
  isRightOpen: false,
  isNotificationMenuOpen: false,
  activeMenu: MENU_INTERFACE.DEFAULT.name,
  activeLeft: MENU_INTERFACE.DEFAULT.name,
  activeRight: MENU_INTERFACE.DEFAULT.name,
};

export default createReducer(initialState, {
  [CLOSE_ALL_GLOBAL_NAV_MENUS](state) {
    return {
      ...state,
      activeMenu: MENU_INTERFACE.DEFAULT.name,
      isLeftOpen: false,
      isRightOpen: false,
      isNotificationMenuOpen: false,
    };
  },

  [TOGGLE_GLOBAL_NAV_MENU](state, { payload }) {
    return {
      ...state,
      activeMenu: payload.activeMenu,
      isLeftOpen: payload.isLeftOpen,
      isRightOpen: payload.isRightOpen,
      activeLeft: payload.activeLeft,
      activeRight: payload.activeRight,
      isNotificationMenuOpen: false,
    };
  },
  [TOGGLE_GLOBAL_NAV_NOTIFICATION_MENU](state, { payload }) {
    return {
      ...state,
      activeMenu: payload.activeMenu,
      isNotificationMenuOpen: payload.isNotificationMenuOpen,
    };
  },
});
